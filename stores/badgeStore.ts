import { create } from 'zustand';
import type { Badge, UserBadge } from '@/types/database.types';
import { fetchUserBadges, checkAndAwardBadges } from '@/services/badgeService';
import { fetchUserStats } from '@/services/statsService';
import { supabase } from '@/services/supabase';

interface BadgeState {
  userBadges: UserBadge[];
  newlyEarned: Badge[];
  isLoading: boolean;
  loadBadges: (userId: string) => Promise<void>;
  checkBadges: (userId: string) => Promise<void>;
  clearNewlyEarned: () => void;
}

export const useBadgeStore = create<BadgeState>((set) => ({
  userBadges: [],
  newlyEarned: [],
  isLoading: false,

  loadBadges: async (userId) => {
    set({ isLoading: true });
    const badges = await fetchUserBadges(userId);
    set({ userBadges: badges, isLoading: false });
  },

  checkBadges: async (userId) => {
    const stats = await fetchUserStats(userId);
    if (!stats) return;

    // Get completed path slugs
    const { data: completedPaths } = await supabase
      .from('user_progress')
      .select('path_id, paths(slug)')
      .eq('user_id', userId)
      .eq('status', 'completed');

    const pathSlugs = (completedPaths ?? [])
      .map((p) => (Array.isArray(p.paths) ? p.paths[0] : p.paths) as { slug: string } | null)
      .filter(Boolean)
      .map((p) => p!.slug);

    const uniqueSlugs = [...new Set(pathSlugs)];
    const earned = await checkAndAwardBadges(userId, stats, uniqueSlugs);

    if (earned.length > 0) {
      const updatedBadges = await fetchUserBadges(userId);
      set((state) => ({ userBadges: updatedBadges, newlyEarned: [...state.newlyEarned, ...earned] }));
    }
  },

  clearNewlyEarned: () => set({ newlyEarned: [] }),
}));
