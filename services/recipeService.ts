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

export async function fetchRecipe(lessonId: string, lessonTitle?: string): Promise<Recipe | null> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('lesson_id', lessonId)
        .single();
      if (!error && data) return attachHeroImage(data as Recipe);
    } catch {}
  }

  // Local fallback: minimal recipe card so user always sees something
  if (lessonTitle) return makeLocalRecipe(lessonId, lessonTitle);
  return null;
}

function makeLocalRecipe(lessonId: string, lessonTitle: string): Recipe {
  return {
    id: `local-${lessonId}`,
    lesson_id: lessonId,
    title: lessonTitle,
    description: 'Recette à découvrir après avoir complété plus de leçons.',
    emoji: '🍽️',
    prep_time_min: 0,
    cook_time_min: 0,
    servings: 0,
    difficulty: 'facile',
    avg_price_eur: '—',
    ingredients: [],
    instructions: ['Contenu de la recette bientôt disponible.'],
    chef_tip: '',
    cultural_note: '',
    hero_image_url: RECIPE_IMAGE_MAP[lessonTitle],
  };
}

// Fetch by lesson title (for the recipe book screen which navigates by title, not ID)
export async function fetchRecipeByTitle(lessonTitle: string): Promise<Recipe | null> {
  if (isSupabaseConfigured) {
    try {
      const { data: lesson } = await supabase
        .from('lessons')
        .select('id')
        .eq('title', lessonTitle)
        .limit(1)
        .single();

      if (lesson?.id) {
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .eq('lesson_id', lesson.id)
          .single();
        if (!error && data) return attachHeroImage(data as Recipe);
      }
    } catch {}
  }
  // No Supabase record — return null so the caller can show local RECIPES fallback
  return null;
}
