import { supabase } from './supabase';
import type { Lesson, Path } from '@/types/database.types';

export async function fetchPaths(): Promise<Path[]> {
  const { data, error } = await supabase
    .from('paths')
    .select('*')
    .eq('is_active', true)
    .order('order_index');
  if (error) throw error;
  return data ?? [];
}

export async function fetchLessons(pathId: string): Promise<Lesson[]> {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('path_id', pathId)
    .order('order_index');
  if (error) throw error;
  return data ?? [];
}
