import { supabase } from './supabase';
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

export async function fetchExercises(lessonId: string): Promise<Exercise[]> {
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .eq('lesson_id', lessonId)
    .order('order_index');
  if (error) throw error;
  return (data ?? []).map(rowToExercise);
}

export async function submitLessonProgress(
  userId: string,
  lessonId: string,
  pathId: string,
  score: number
) {
  const { error } = await supabase.from('user_progress').upsert({
    user_id: userId,
    lesson_id: lessonId,
    path_id: pathId,
    status: 'completed',
    score,
    completed_at: new Date().toISOString(),
  });
  if (error) throw error;
}

export async function unlockNextLesson(
  userId: string,
  currentLessonOrderIndex: number,
  pathId: string
) {
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
}
