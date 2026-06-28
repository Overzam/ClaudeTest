import { supabase, isSupabaseConfigured } from './supabase';
import { cacheExercises, getCachedExercises } from './offlineCache';
import { getLocalExercises } from '@/constants/exercisesData';
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
  const cached = await getCachedExercises(lessonId);
  if (cached && cached.length > 0) return cached;

  // Try Supabase first if configured
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
    } catch (_) {}
  }

  // Fall back to local static exercises using the lessonId as a title key
  const local = getLocalExercises(lessonId);
  if (local) return local;

  // Generic fallback — works for any lesson
  return generateGenericExercises(lessonId);
}

function generateGenericExercises(lessonId: string): Exercise[] {
  return [
    {
      id: `gen-${lessonId}-1`, lessonId, orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quel est le principe fondamental de toute bonne cuisson ?',
      data: {
        options: [
          'Ajouter beaucoup d\'épices',
          'Maîtriser la chaleur et les temps de cuisson',
          'Utiliser des ingrédients chers',
          'Suivre exactement une recette sans improviser',
        ],
        correctIndex: 1,
      },
    },
    {
      id: `gen-${lessonId}-2`, lessonId, orderIndex: 1, xpReward: 10,
      type: 'multiple_choice',
      question: 'La réaction chimique qui crée la croûte dorée sur les aliments s\'appelle…',
      data: {
        options: ['La caramélisation', 'La réaction de Maillard', 'La saponification', 'La pasteurisation'],
        correctIndex: 1,
      },
    },
    {
      id: `gen-${lessonId}-3`, lessonId, orderIndex: 2, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La 5e saveur fondamentale, présente dans le parmesan et le miso, s\'appelle l\'___.',
      data: { answer: 'umami', hint: 'Découverte en 1908 par Kikunae Ikeda' },
    },
    {
      id: `gen-${lessonId}-4`, lessonId, orderIndex: 3, xpReward: 10,
      type: 'association',
      question: 'Associe chaque technique à son effet :',
      data: {
        pairs: [
          { left: 'Saisir à feu vif', right: 'Créer une croûte dorée (Maillard)' },
          { left: 'Mijoter doucement', right: 'Attendrir les fibres et fondre le collagène' },
          { left: 'Blanchir à l\'eau', right: 'Fixer la couleur et pré-cuire' },
          { left: 'Flamber', right: 'Brûler l\'alcool et caraméliser en surface' },
        ],
      },
    },
  ];
}

export async function fetchLessonById(lessonId: string) {
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
