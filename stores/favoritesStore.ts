import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesState {
  favorites: Set<string>;
  toggleFavorite: (lessonTitle: string) => void;
  isFavorite: (lessonTitle: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: new Set<string>(),
      toggleFavorite: (lessonTitle) => {
        const next = new Set(get().favorites);
        if (next.has(lessonTitle)) next.delete(lessonTitle);
        else next.add(lessonTitle);
        set({ favorites: next });
      },
      isFavorite: (lessonTitle) => get().favorites.has(lessonTitle),
    }),
    {
      name: 'recipe-favorites',
      storage: createJSONStorage(() => AsyncStorage, {
        replacer: (_, value) => value instanceof Set ? [...value] : value,
        reviver: (key, value) => key === 'favorites' && Array.isArray(value) ? new Set(value) : value,
      }),
    }
  )
);
