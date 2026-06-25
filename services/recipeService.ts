import { supabase, isSupabaseConfigured } from './supabase';

export interface Recipe {
  id: string;
  lesson_id: string;
  title: string;
  description: string;
  emoji: string;
  prep_time_min: number;
  cook_time_min: number;
  servings: number;
  difficulty: 'facile' | 'moyen' | 'difficile' | 'expert';
  avg_price_eur: string;
  ingredients: Array<{ qty: string; item: string; tip?: string }>;
  instructions: string[];
  chef_tip: string;
  cultural_note: string;
}

export async function fetchRecipe(lessonId: string): Promise<Recipe | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('lesson_id', lessonId)
      .single();
    if (error || !data) return null;
    return data as Recipe;
  } catch {
    return null;
  }
}
