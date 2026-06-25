import { create } from 'zustand';
import type { Exercise } from '@/types/lesson.types';
import { fetchExercises } from '@/services/lessonService';
import { XP_PER_EXERCISE, XP_LESSON_COMPLETION_BONUS } from '@/constants/Config';

export type LessonPhase = 'loading' | 'exercise' | 'feedback' | 'complete';

interface LessonState {
  lessonId: string | null;
  exercises: Exercise[];
  currentIndex: number;
  phase: LessonPhase;
  lastAnswerCorrect: boolean | null;
  xpEarned: number;
  mistakesCount: number;
  score: number;

  loadLesson: (lessonId: string, lessonTitle?: string) => Promise<void>;
  submitAnswer: (correct: boolean) => void;
  nextExercise: () => void;
  reset: () => void;
}

export const useLessonStore = create<LessonState>((set, get) => ({
  lessonId: null,
  exercises: [],
  currentIndex: 0,
  phase: 'loading',
  lastAnswerCorrect: null,
  xpEarned: 0,
  mistakesCount: 0,
  score: 0,

  loadLesson: async (lessonId, lessonTitle?: string) => {
    set({ lessonId, phase: 'loading', currentIndex: 0, xpEarned: 0, mistakesCount: 0 });
    const exercises = await fetchExercises(lessonTitle ?? lessonId);
    set({ exercises, phase: exercises.length > 0 ? 'exercise' : 'complete' });
  },

  submitAnswer: (correct) => {
    const { xpEarned, mistakesCount, exercises, currentIndex } = get();
    const xpGain = correct ? exercises[currentIndex]?.xpReward ?? XP_PER_EXERCISE : 0;
    set({
      phase: 'feedback',
      lastAnswerCorrect: correct,
      xpEarned: xpEarned + xpGain,
      mistakesCount: correct ? mistakesCount : mistakesCount + 1,
    });
  },

  nextExercise: () => {
    const { currentIndex, exercises, xpEarned, mistakesCount } = get();
    const isLast = currentIndex >= exercises.length - 1;
    if (isLast) {
      const totalAnswered = exercises.length;
      const correctAnswers = totalAnswered - mistakesCount;
      const score = Math.round((correctAnswers / totalAnswered) * 100);
      const bonusXP = mistakesCount === 0 ? XP_LESSON_COMPLETION_BONUS : 0;
      set({ phase: 'complete', score, xpEarned: xpEarned + bonusXP });
    } else {
      set({ currentIndex: currentIndex + 1, phase: 'exercise', lastAnswerCorrect: null });
    }
  },

  reset: () =>
    set({
      lessonId: null,
      exercises: [],
      currentIndex: 0,
      phase: 'loading',
      lastAnswerCorrect: null,
      xpEarned: 0,
      mistakesCount: 0,
      score: 0,
    }),
}));
