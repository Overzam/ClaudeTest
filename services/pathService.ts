import { supabase } from './supabase';
import { cachePaths, getCachedPaths, cacheLessons, getCachedLessons } from './offlineCache';
import type { Lesson, Path } from '@/types/database.types';

export async function fetchPaths(): Promise<Path[]> {
  const cached = await getCachedPaths();
  if (cached) return cached;

  const { data, error } = await supabase
    .from('paths')
    .select('*')
    .eq('is_active', true)
    .order('order_index');
  if (error) throw error;
  const paths = data ?? [];
  await cachePaths(paths);
  return paths;
}

export async function fetchLessons(pathId: string): Promise<Lesson[]> {
  const cached = await getCachedLessons(pathId);
  if (cached) return cached;

  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('path_id', pathId)
    .order('order_index');
  if (error) throw error;
  const lessons = data ?? [];
  await cacheLessons(pathId, lessons);
  return lessons;
}
