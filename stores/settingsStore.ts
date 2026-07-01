import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SupportedLanguage } from '@/i18n';
import { saveLanguage } from '@/i18n';

interface SettingsState {
  language: SupportedLanguage;
  streakNotifEnabled: boolean;
  soundsEnabled: boolean;
  setLanguage: (lang: SupportedLanguage) => Promise<void>;
  toggleStreakNotif: () => void;
  toggleSounds: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      language: 'fr',
      streakNotifEnabled: true,
      soundsEnabled: true,

      setLanguage: async (lang) => {
        await saveLanguage(lang);
        set({ language: lang });
      },

      toggleSounds: () => set((s) => ({ soundsEnabled: !s.soundsEnabled })),

      toggleStreakNotif: () => {
        const { streakNotifEnabled } = get();
        set({ streakNotifEnabled: !streakNotifEnabled });
        if (streakNotifEnabled) {
          import('@/services/notificationService').then((m) => m.cancelStreakReminder());
        } else {
          import('@/services/notificationService').then((m) => m.scheduleStreakReminder());
        }
      },
    }),
    { name: 'recipequest-settings', storage: createJSONStorage(() => AsyncStorage) }
  )
);
