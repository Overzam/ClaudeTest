import { supabase, isSupabaseConfigured } from './supabase';
import { RECIPE_IMAGE_MAP } from '@/constants/recipeImages';

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
  hero_image_url?: string;
}

function attachHeroImage(recipe: Recipe): Recipe {
  if (recipe.hero_image_url) return recipe;
  const img = RECIPE_IMAGE_MAP[recipe.title];
  return img ? { ...recipe, hero_image_url: img } : recipe;
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
    return attachHeroImage(data as Recipe);
  } catch {
    return null;
  }
}
