import { supabase } from './supabase';
import type { Badge, UserBadge, UserStats } from '@/types/database.types';

export async function fetchAllBadges(): Promise<Badge[]> {
  const { data } = await supabase.from('badges').select('*').order('condition_value');
  return data ?? [];
}

export async function fetchUserBadges(userId: string): Promise<UserBadge[]> {
  const { data } = await supabase
    .from('user_badges')
    .select('*, badge:badges(*)')
    .eq('user_id', userId)
    .order('earned_at', { ascending: false });
  return data ?? [];
}

export async function checkAndAwardBadges(
  userId: string,
  stats: UserStats,
  completedPathSlugs: string[]
): Promise<Badge[]> {
  const [allBadges, userBadges] = await Promise.all([
    fetchAllBadges(),
    fetchUserBadges(userId),
  ]);

  const earnedIds = new Set(userBadges.map((ub) => ub.badge_id));
  const newlyEarned: Badge[] = [];

  for (const badge of allBadges) {
    if (earnedIds.has(badge.id)) continue;

    let earned = false;
    switch (badge.condition_type) {
      case 'first_lesson':
        earned = stats.lessons_completed >= 1;
        break;
      case 'lessons_completed':
        earned = stats.lessons_completed >= badge.condition_value;
        break;
      case 'streak_days':
        earned = stats.streak_days >= badge.condition_value;
        break;
      case 'xp_total':
        earned = stats.xp >= badge.condition_value;
        break;
      case 'path_completed':
        earned = completedPathSlugs.length >= badge.condition_value;
        break;
    }

    if (earned) {
      await supabase.from('user_badges').insert({ user_id: userId, badge_id: badge.id });
      newlyEarned.push(badge);
    }
  }

  return newlyEarned;
}
