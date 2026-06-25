import { supabase, isSupabaseConfigured } from './supabase';

export interface GlobalLeaderboardEntry {
  user_id: string;
  username: string;
  xp: number;
  level: number;
  streak: number;
}

export async function fetchGlobalLeaderboard(): Promise<GlobalLeaderboardEntry[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const { data, error } = await supabase
      .from('user_stats')
      .select('user_id, xp, level, streak, users(username)')
      .order('xp', { ascending: false })
      .limit(50);
    if (error || !data) return [];
    return data.map((row: any) => ({
      user_id: row.user_id,
      username: row.users?.username ?? 'Anonyme',
      xp: row.xp ?? 0,
      level: row.level ?? 1,
      streak: row.streak ?? 0,
    }));
  } catch {
    return [];
  }
}
