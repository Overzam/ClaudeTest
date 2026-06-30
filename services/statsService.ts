import { supabase, isSupabaseConfigured } from './supabase';
import { GUEST_USER_ID } from '@/stores/authStore';
import type { UserStats } from '@/types/database.types';

export async function fetchUserStats(userId: string): Promise<UserStats | null> {
  if (userId === GUEST_USER_ID || !isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error) return null;
  return data;
}

export async function updateXP(userId: string, xpToAdd: number) {
  if (userId === GUEST_USER_ID || !isSupabaseConfigured) return xpToAdd;
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
  if (userId === GUEST_USER_ID || !isSupabaseConfigured) return;
  await supabase.rpc('update_streak', { p_user_id: userId });
}

export async function updateHearts(userId: string, hearts: number) {
  if (userId === GUEST_USER_ID || !isSupabaseConfigured) return;
  const { error } = await supabase
    .from('user_stats')
    .update({ hearts, hearts_last_refill: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq('user_id', userId);
  if (error) throw error;
}

// Returns the ISO date strings (YYYY-MM-DD) of days the user completed at least one lesson
// in the last 7 days, used to render the weekly activity calendar accurately.
export async function fetchWeeklyActivity(userId: string): Promise<string[]> {
  if (userId === GUEST_USER_ID || !isSupabaseConfigured) return [];
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const { data } = await supabase
    .from('user_progress')
    .select('completed_at')
    .eq('user_id', userId)
    .eq('status', 'completed')
    .gte('completed_at', sevenDaysAgo.toISOString())
    .not('completed_at', 'is', null);

  if (!data) return [];
  return [...new Set(data.map((r) => r.completed_at!.split('T')[0]))];
}

export async function incrementLessonsCompleted(userId: string) {
  if (userId === GUEST_USER_ID || !isSupabaseConfigured) return;
  const { error } = await supabase.rpc('increment_lessons_completed', { p_user_id: userId });
  if (error) {
    const { data } = await supabase.from('user_stats').select('lessons_completed').eq('user_id', userId).single();
    await supabase.from('user_stats').update({ lessons_completed: (data?.lessons_completed ?? 0) + 1 }).eq('user_id', userId);
  }
}
