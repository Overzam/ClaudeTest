export interface UserProfile {
  id: string;
  username: string;
  avatar_url: string | null;
  created_at: string;
}

export interface UserStats {
  id: string;
  user_id: string;
  xp: number;
  level: number;
  streak_days: number;
  last_activity_date: string | null;
  hearts: number;
  hearts_last_refill: string;
  lessons_completed: number;
  updated_at: string;
}

export interface Path {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  emoji: string;
  color: string;
  order_index: number;
  is_active: boolean;
}

export interface Lesson {
  id: string;
  path_id: string;
  title: string;
  description: string | null;
  order_index: number;
  xp_reward: number;
  thumbnail_url: string | null;
}

export interface ExerciseRow {
  id: string;
  lesson_id: string;
  type: string;
  order_index: number;
  question: string;
  image_url: string | null;
  data: Record<string, unknown>;
  xp_reward: number;
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  path_id: string;
  status: 'locked' | 'available' | 'completed';
  score: number | null;
  completed_at: string | null;
  attempts: number;
}
