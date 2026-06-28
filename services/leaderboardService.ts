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
    const { data: stats, error } = await supabase
      .from('user_stats')
      .select('user_id, xp, level, streak_days')
      .order('xp', { ascending: false })
      .limit(50);
    if (error || !stats) return [];

    const userIds = stats.map((s) => s.user_id);
    const { data: profiles } = await supabase
      .from('users')
      .select('id, username')
      .in('id', userIds);
    const profileMap = Object.fromEntries((profiles ?? []).map((p) => [p.id, p.username]));

    return stats.map((row) => ({
      user_id: row.user_id,
      username: profileMap[row.user_id] ?? 'Anonyme',
      xp: row.xp ?? 0,
      level: row.level ?? 1,
      streak: row.streak_days ?? 0,
    }));
  } catch {
    return [];
  }
}
