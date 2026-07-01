import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type PlanType = 'free' | 'monthly' | 'yearly';

interface ShopItem {
  id: string;
  type: 'hearts' | 'xp_boost';
  amount: number;
  coinCost: number;
  label: string;
  emoji: string;
}

export const SHOP_ITEMS: ShopItem[] = [
  { id: 'hearts_5', type: 'hearts', amount: 5, coinCost: 50, label: '5 Cœurs', emoji: '❤️' },
  { id: 'hearts_10', type: 'hearts', amount: 10, coinCost: 90, label: '10 Cœurs', emoji: '❤️' },
  { id: 'xp_boost_2x', type: 'xp_boost', amount: 2, coinCost: 100, label: 'Boost XP ×2 (1h)', emoji: '⚡' },
  { id: 'xp_boost_3x', type: 'xp_boost', amount: 3, coinCost: 200, label: 'Boost XP ×3 (1h)', emoji: '🚀' },
];

export const AD_COOLDOWN_MINUTES = 20;

interface PremiumState {
  plan: PlanType;
  planExpiresAt: string | null;
  coins: number;
  xpBoostMultiplier: number;
  xpBoostExpiresAt: string | null;
  lastAdWatchAt: string | null;

  // Computed
  isPremium: () => boolean;
  getXPMultiplier: () => number;
  canWatchAd: () => boolean;
  adCooldownSecondsLeft: () => number;

  // Actions
  setPlan: (plan: PlanType, expiresAt: string) => void;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  watchAd: () => boolean;
  activateXPBoost: (multiplier: number, durationHours?: number) => void;
  checkExpiry: () => void;
  reset: () => void;
}

export const usePremiumStore = create<PremiumState>()(
  persist(
    (set, get) => ({
      plan: 'free',
      planExpiresAt: null,
      coins: 0,
      xpBoostMultiplier: 1,
      xpBoostExpiresAt: null,
      lastAdWatchAt: null,

      canWatchAd: () => get().adCooldownSecondsLeft() <= 0,

      adCooldownSecondsLeft: () => {
        const { lastAdWatchAt } = get();
        if (!lastAdWatchAt) return 0;
        const elapsedMs = Date.now() - new Date(lastAdWatchAt).getTime();
        const remainingMs = AD_COOLDOWN_MINUTES * 60000 - elapsedMs;
        return Math.max(0, Math.ceil(remainingMs / 1000));
      },

      watchAd: () => {
        if (!get().canWatchAd()) return false;
        set((s) => ({ coins: s.coins + 25, lastAdWatchAt: new Date().toISOString() }));
        return true;
      },

      isPremium: () => {
        const { plan, planExpiresAt } = get();
        if (plan === 'free') return false;
        if (!planExpiresAt) return false;
        return new Date(planExpiresAt) > new Date();
      },

      getXPMultiplier: () => {
        const { xpBoostMultiplier, xpBoostExpiresAt, isPremium } = get();
        const boostActive = xpBoostExpiresAt && new Date(xpBoostExpiresAt) > new Date();
        const base = isPremium() ? 2 : 1;
        return boostActive ? Math.max(base, xpBoostMultiplier) : base;
      },

      setPlan: (plan, expiresAt) => set({ plan, planExpiresAt: expiresAt }),

      addCoins: (amount) => set((s) => ({ coins: s.coins + amount })),

      spendCoins: (amount) => {
        const { coins } = get();
        if (coins < amount) return false;
        set({ coins: coins - amount });
        return true;
      },

      activateXPBoost: (multiplier, durationHours = 1) => {
        const expiresAt = new Date(Date.now() + durationHours * 3600000).toISOString();
        set({ xpBoostMultiplier: multiplier, xpBoostExpiresAt: expiresAt });
      },

      checkExpiry: () => {
        const { planExpiresAt, xpBoostExpiresAt } = get();
        const now = new Date();
        if (planExpiresAt && new Date(planExpiresAt) <= now) {
          set({ plan: 'free', planExpiresAt: null });
        }
        if (xpBoostExpiresAt && new Date(xpBoostExpiresAt) <= now) {
          set({ xpBoostMultiplier: 1, xpBoostExpiresAt: null });
        }
      },

      reset: () =>
        set({ plan: 'free', planExpiresAt: null, coins: 0, xpBoostMultiplier: 1, xpBoostExpiresAt: null, lastAdWatchAt: null }),
    }),
    { name: 'recipequest-premium', storage: createJSONStorage(() => AsyncStorage) }
  )
);
