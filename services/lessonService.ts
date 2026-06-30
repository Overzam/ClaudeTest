import { supabase, isSupabaseConfigured } from './supabase';
import { cacheExercises, getCachedExercises } from './offlineCache';
import { getLocalExercises } from '@/constants/exercisesData';
import { LOCAL_LESSONS } from '@/constants/localData';
import { GUEST_USER_ID } from '@/stores/authStore';
import { useProgressStore } from '@/stores/progressStore';
import type { Exercise } from '@/types/lesson.types';
import type { ExerciseRow } from '@/types/database.types';

function rowToExercise(row: ExerciseRow): Exercise {
  return {
    id: row.id,
    lessonId: row.lesson_id,
    orderIndex: row.order_index,
    question: row.question,
    imageUrl: row.image_url ?? undefined,
    xpReward: row.xp_reward,
    type: row.type as Exercise['type'],
    data: row.data as Exercise['data'],
  };
}

export async function fetchExercises(lessonId: string, lessonTitle?: string): Promise<Exercise[]> {
  const cached = await getCachedExercises(lessonId);
  if (cached && cached.length > 0) return cached;

  // Try Supabase first — always use the real lessonId (UUID), never the title
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .eq('lesson_id', lessonId)
        .order('order_index');
      if (!error && data && data.length > 0) {
        const exercises = data.map(rowToExercise);
        await cacheExercises(lessonId, exercises);
        return exercises;
      }
    } catch (e) { console.warn('[lessonService] fetchExercises Supabase error:', e); }
  }

  // Fall back to local static exercises keyed by title, then by id
  const local = getLocalExercises(lessonTitle ?? lessonId);
  if (local) return local;

  // No exercises available for this lesson yet
  return [];
}

export async function fetchLessonById(lessonId: string) {
  // For guests or offline: search local data
  for (const [, lessons] of Object.entries(LOCAL_LESSONS)) {
    const found = lessons.find((l) => l.id === lessonId);
    if (found) return { id: found.id, path_id: found.path_id, order_index: found.order_index };
  }

  if (!isSupabaseConfigured) return null;
  const { data } = await supabase
    .from('lessons')
    .select('id, path_id, order_index')
    .eq('id', lessonId)
    .single();
  return data ?? null;
}

export async function submitLessonProgress(
  userId: string,
  lessonId: string,
  _pathId: string,
  _score: number
) {
  if (userId === GUEST_USER_ID) {
    useProgressStore.getState().markComplete(lessonId);
    return;
  }
  if (!isSupabaseConfigured) return;
  const { error } = await supabase.from('user_progress').upsert({
    user_id: userId,
    lesson_id: lessonId,
    path_id: _pathId,
    status: 'completed',
    score: _score,
    completed_at: new Date().toISOString(),
  });
  if (error) throw error;
}

export async function unlockNextLesson(
  userId: string,
  currentLessonOrderIndex: number,
  pathId: string
) {
  if (userId === GUEST_USER_ID) {
    const lessons = LOCAL_LESSONS[pathId] ?? [];
    const next = lessons.find((l) => l.order_index === currentLessonOrderIndex + 1);
    if (next) useProgressStore.getState().unlockLesson(next.id);
    return;
  }

  if (!isSupabaseConfigured) return;
  const { data: nextLesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('path_id', pathId)
    .eq('order_index', currentLessonOrderIndex + 1)
    .single();

  if (!nextLesson) return;

  await supabase.from('user_progress').upsert({
    user_id: userId,
    lesson_id: nextLesson.id,
    path_id: pathId,
    status: 'available',
  });

  // Update local state immediately so UI reflects unlock without waiting for next loadProgress
  useProgressStore.getState().unlockLesson(nextLesson.id);
}
