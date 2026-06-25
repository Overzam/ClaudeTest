import { supabase, isSupabaseConfigured } from './supabase';
import { cachePaths, getCachedPaths, cacheLessons, getCachedLessons } from './offlineCache';
import type { Lesson, Path } from '@/types/database.types';
import { LOCAL_PATHS, LOCAL_LESSONS } from '@/constants/localData';

export async function fetchPaths(): Promise<Path[]> {
  const cached = await getCachedPaths();
  if (cached && cached.length > 0) return cached;

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('paths')
        .select('*')
        .eq('is_active', true)
        .order('order_index');
      if (!error && data && data.length > 0) {
        await cachePaths(data);
        return data;
      }
    } catch (_) {}
  }

  return LOCAL_PATHS;
}

export async function fetchLessons(pathId: string): Promise<Lesson[]> {
  const cached = await getCachedLessons(pathId);
  if (cached && cached.length > 0) return cached;

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('path_id', pathId)
        .order('order_index');
      if (!error && data && data.length > 0) {
        await cacheLessons(pathId, data);
        return data;
      }
    } catch (_) {}
  }

  return LOCAL_LESSONS[pathId] ?? [];
}
