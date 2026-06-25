import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes, type Theme, type ThemeName } from '@/constants/themes';

interface ThemeState {
  themeName: ThemeName;
  theme: Theme;
  setTheme: (name: ThemeName) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      themeName: 'light',
      theme: themes.light,
      setTheme: (name) => set({ themeName: name, theme: themes[name] }),
    }),
    { name: 'recipequest-theme', storage: createJSONStorage(() => AsyncStorage) }
  )
);
