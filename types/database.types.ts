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

export interface Badge {
  id: string;
  slug: string;
  title: string;
  description: string;
  emoji: string;
  condition_type: string;
  condition_value: number;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  badge?: Badge;
}

export interface Friendship {
  id: string;
  requester_id: string;
  addressee_id: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
}

export interface Ingredient {
  name: string;
  quantity?: string;
  unit?: string;
  emoji: string;
  tip?: string;
}

export interface LessonDetail {
  id: string;
  path_id: string;
  title: string;
  description: string | null;
  emoji?: string;
  order_index: number;
  xp_reward: number;
  thumbnail_url: string | null;
  duration_minutes?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  ingredients: Ingredient[];
  anecdote: string;
  chef_tip: string;
  cultural_note: string;
}

export interface PathDetail {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  emoji: string;
  color: string;
  order_index: number;
  is_active: boolean;
  country: string;
  history: string;
  key_ingredients: string[];
  famous_chefs: string[];
}

export interface LeaderboardEntry {
  user_id: string;
  username: string;
  avatar_url: string | null;
  xp: number;
  level: number;
  streak_days: number;
  rank: number;
  isMe?: boolean;
}
