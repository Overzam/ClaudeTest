import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { UserStats } from '@/types/database.types';
import { MAX_HEARTS, HEARTS_REGEN_HOURS, calculateLevel, xpForNextLevel } from '@/constants/Config';
import { updateXP, updateHearts } from '@/services/statsService';
import { usePremiumStore } from './premiumStore';

interface GameState {
  hearts: number;
  xp: number;
  level: number;
  streakDays: number;
  lastActivityDate: string | null;
  heartsLastRefill: string | null;
  lessonsCompleted: number;
  userId: string | null;
  xpForNextLevel: number;

  setStats: (stats: UserStats, userId: string) => void;
  loseHeart: () => Promise<void>;
  gainXP: (amount: number) => Promise<void>;
  regenHearts: () => Promise<void>;
  reset: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      hearts: MAX_HEARTS,
      xp: 0,
      level: 1,
      streakDays: 0,
      lastActivityDate: null,
      heartsLastRefill: null,
      lessonsCompleted: 0,
      userId: null,
      xpForNextLevel: 50,

      setStats: (stats, userId) => {
        const level = calculateLevel(stats.xp);
        set({
          hearts: stats.hearts,
          xp: stats.xp,
          level,
          streakDays: stats.streak_days,
          lastActivityDate: stats.last_activity_date,
          heartsLastRefill: stats.hearts_last_refill,
          lessonsCompleted: stats.lessons_completed,
          userId,
          xpForNextLevel: xpForNextLevel(stats.xp),
        });
      },

      loseHeart: async () => {
        // Premium users have unlimited hearts
        if (usePremiumStore.getState().isPremium()) return;
        const { hearts, heartsLastRefill, userId } = get();
        const newHearts = Math.max(0, hearts - 1);
        const now = new Date().toISOString();
        set({ hearts: newHearts, heartsLastRefill: heartsLastRefill ?? now });
        if (userId) await updateHearts(userId, newHearts);
      },

      gainXP: async (amount) => {
        const { xp, userId } = get();
        const multiplier = usePremiumStore.getState().getXPMultiplier();
        const boostedAmount = Math.round(amount * multiplier);
        const newXP = xp + boostedAmount;
        const newLevel = calculateLevel(newXP);
        set({ xp: newXP, level: newLevel, xpForNextLevel: xpForNextLevel(newXP) });
        if (userId) await updateXP(userId, boostedAmount);
      },

      regenHearts: async () => {
        const { hearts, heartsLastRefill, userId } = get();
        if (hearts >= MAX_HEARTS || !heartsLastRefill) return;
        const hoursElapsed = (Date.now() - new Date(heartsLastRefill).getTime()) / 3600000;
        const heartsToAdd = Math.floor(hoursElapsed / HEARTS_REGEN_HOURS);
        if (heartsToAdd <= 0) return;
        const newHearts = Math.min(MAX_HEARTS, hearts + heartsToAdd);
        set({ hearts: newHearts, heartsLastRefill: new Date().toISOString() });
        if (userId) await updateHearts(userId, newHearts);
      },

      reset: () =>
        set({
          hearts: MAX_HEARTS,
          xp: 0,
          level: 1,
          streakDays: 0,
          lastActivityDate: null,
          heartsLastRefill: null,
          lessonsCompleted: 0,
          userId: null,
        }),
    }),
    {
      name: 'recipequest-game',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
