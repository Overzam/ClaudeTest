import { create } from 'zustand';
import { supabase } from '@/services/supabase';
import type { UserProgress } from '@/types/database.types';

interface ProgressState {
  lessonProgress: Record<string, 'locked' | 'available' | 'completed'>;
  isLoading: boolean;
  loadProgress: (userId: string) => Promise<void>;
  markComplete: (lessonId: string) => void;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  lessonProgress: {},
  isLoading: false,

  loadProgress: async (userId) => {
    set({ isLoading: true });
    const { data } = await supabase
      .from('user_progress')
      .select('lesson_id, status')
      .eq('user_id', userId);
    const map: Record<string, 'locked' | 'available' | 'completed'> = {};
    (data ?? []).forEach((row: Pick<UserProgress, 'lesson_id' | 'status'>) => {
      map[row.lesson_id] = row.status;
    });
    set({ lessonProgress: map, isLoading: false });
  },

  markComplete: (lessonId) => {
    set((state) => ({
      lessonProgress: { ...state.lessonProgress, [lessonId]: 'completed' },
    }));
  },
}));
