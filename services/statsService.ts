import { supabase } from './supabase';
import type { UserStats } from '@/types/database.types';

export async function fetchUserStats(userId: string): Promise<UserStats | null> {
  const { data, error } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error) return null;
  return data;
}

export async function updateXP(userId: string, xpToAdd: number) {
  const { data: current } = await supabase
    .from('user_stats')
    .select('xp')
    .eq('user_id', userId)
    .single();

  const newXP = (current?.xp ?? 0) + xpToAdd;

  const { error } = await supabase
    .from('user_stats')
    .update({ xp: newXP, updated_at: new Date().toISOString() })
    .eq('user_id', userId);
  if (error) throw error;
  return newXP;
}

export async function updateStreak(userId: string) {
  await supabase.rpc('update_streak', { p_user_id: userId });
}

export async function updateHearts(userId: string, hearts: number) {
  const { error } = await supabase
    .from('user_stats')
    .update({ hearts, hearts_last_refill: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq('user_id', userId);
  if (error) throw error;
}

export async function incrementLessonsCompleted(userId: string) {
  const { error } = await supabase.rpc('increment_lessons_completed', { p_user_id: userId });
  if (error) {
    // Fallback if RPC not set up
    const { data } = await supabase.from('user_stats').select('lessons_completed').eq('user_id', userId).single();
    await supabase.from('user_stats').update({ lessons_completed: (data?.lessons_completed ?? 0) + 1 }).eq('user_id', userId);
  }
}
