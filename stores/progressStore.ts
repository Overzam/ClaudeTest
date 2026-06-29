import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/services/supabase';
import { GUEST_USER_ID } from './authStore';
import type { UserProgress } from '@/types/database.types';

const GUEST_PROGRESS_KEY = 'guest_lesson_progress';

interface ProgressState {
  lessonProgress: Record<string, 'locked' | 'available' | 'completed'>;
  isLoading: boolean;
  loadProgress: (userId: string) => Promise<void>;
  markComplete: (lessonId: string) => void;
  unlockLesson: (lessonId: string) => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
  lessonProgress: {},
  isLoading: false,

  loadProgress: async (userId) => {
    set({ isLoading: true });

    if (userId === GUEST_USER_ID) {
      try {
        const raw = await AsyncStorage.getItem(GUEST_PROGRESS_KEY);
        const map = raw ? JSON.parse(raw) : {};
        set({ lessonProgress: map, isLoading: false });
      } catch {
        set({ isLoading: false });
      }
      return;
    }

    try {
      const { data } = await supabase
        .from('user_progress')
        .select('lesson_id, status')
        .eq('user_id', userId);
      const map: Record<string, 'locked' | 'available' | 'completed'> = {};
      (data ?? []).forEach((row: Pick<UserProgress, 'lesson_id' | 'status'>) => {
        map[row.lesson_id] = row.status;
      });
      set({ lessonProgress: map, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  markComplete: (lessonId) => {
    set((state) => {
      const updated = { ...state.lessonProgress, [lessonId]: 'completed' as const };
      AsyncStorage.setItem(GUEST_PROGRESS_KEY, JSON.stringify(updated)).catch(() => {});
      return { lessonProgress: updated };
    });
  },

  unlockLesson: (lessonId) => {
    set((state) => {
      if (state.lessonProgress[lessonId] === 'completed') return state;
      const updated = { ...state.lessonProgress, [lessonId]: 'available' as const };
      AsyncStorage.setItem(GUEST_PROGRESS_KEY, JSON.stringify(updated)).catch(() => {});
      return { lessonProgress: updated };
    });
  },
}));
