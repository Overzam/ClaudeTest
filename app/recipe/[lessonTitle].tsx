import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { useThemeStore } from '@/stores/themeStore';
import { RECIPES } from '@/constants/recipesData';
import { LESSON_DETAILS } from '@/constants/pathsData';
import { Layout } from '@/constants/Layout';
import { fetchRecipeByTitle, type Recipe as SupabaseRecipe } from '@/services/recipeService';
import type { RecipeDetail } from '@/types/database.types';

function SectionHeader({ icon, label, color }: { icon: any; label: string; color: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 }}>
      <Ionicons name={icon} size={18} color={color} />
      <Text style={[sectionHeaderStyle, { color }]}>{label}</Text>
    </View>
  );
}
const sectionHeaderStyle = { fontSize: 15, fontWeight: '800' as const };

// Convert Supabase recipe format → RecipeDetail format for display
function supabaseToRecipeDetail(r: SupabaseRecipe): RecipeDetail {
  const diffMap: Record<string, 'easy' | 'medium' | 'hard'> = {
    facile: 'easy', moyen: 'medium', difficile: 'hard', expert: 'hard',
  };
  return {
    id: r.id,
    path_id: '',
    title: r.title,
    description: r.description,
    emoji: r.emoji,
    order_index: 0,
    xp_reward: 0,
    thumbnail_url: r.hero_image_url ?? null,
    difficulty: diffMap[r.difficulty] ?? 'easy',
    ingredients: r.ingredients.map((ing) => ({
      name: ing.item,
      quantity: ing.qty,
      emoji: '🥄',
      note: ing.tip,
    })),
    anecdote: '',
    chef_tip: r.chef_tip,
    cultural_note: r.cultural_note,
    // Steps stored under "steps" key for display, mirrored from instructions
    steps: r.instructions,
  } as any;
}

export default function RecipeDetailScreen() {
  const { lessonTitle } = useLocalSearchParams<{ lessonTitle: string }>();
  const { theme } = useThemeStore();
  const c = theme.colors;

  const title = decodeURIComponent(lessonTitle ?? '');
  const [loading, setLoading] = useState(true);
  const [supabaseRecipe, setSupabaseRecipe] = useState<SupabaseRecipe | null>(null);

  useEffect(() => {
    fetchRecipeByTitle(title).then((r) => {
      setSupabaseRecipe(r);
      setLoading(false);
    });
  }, [title]);

  // Priority: Supabase > local RECIPES constant > LESSON_DETAILS fallback
  const recipe = RECIPES[title] ?? null;
  const lessonDetail = LESSON_DETAILS[title];

  // When Supabase has data, override the local recipe
  const displayRecipe = supabaseRecipe ? supabaseToRecipeDetail(supabaseRecipe) : recipe;

  const totalTime = displayRecipe ? displayRecipe.prep_time_min + displayRecipe.cook_time_min : null;

  const difficultyColor = (d?: string) => {
    if (d === 'Facile' || d === 'easy' || d === 'facile') return '#22c55e';
    if (d === 'Moyen' || d === 'medium' || d === 'moyen') return '#f59e0b';
    return '#ef4444';
  };

  if (loading) {
    return (
      <ScreenWrapper>
        <View style={[styles.header, { borderBottomColor: c.border }]}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
            <Ionicons name="arrow-back" size={24} color={c.primary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text }]} numberOfLines={1}>{title}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={c.primary} />
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color={c.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]} numberOfLines={1}>{title}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <LinearGradient
          colors={[c.primary + '30', c.secondary + '15']}
          style={styles.hero}
        >
          <Text style={styles.heroEmoji}>{displayRecipe?.emoji ?? lessonDetail?.emoji ?? '🍽️'}</Text>
          <Text style={[styles.heroTitle, { color: c.text }]}>{displayRecipe?.title ?? title}</Text>
          {displayRecipe?.description && (
            <Text style={[styles.heroDesc, { color: c.textMuted }]}>{displayRecipe.description}</Text>
          )}
          {displayRecipe && (
            <View style={[styles.diffBadge, { backgroundColor: difficultyColor(displayRecipe.difficulty as string) + '20' }]}>
              <Text style={[styles.diffText, { color: difficultyColor(displayRecipe.difficulty as string) }]}>
                {(displayRecipe.difficulty as string) === 'easy' || (displayRecipe.difficulty as string) === 'facile' ? 'Facile'
                  : (displayRecipe.difficulty as string) === 'medium' || (displayRecipe.difficulty as string) === 'moyen' ? 'Moyen'
                  : 'Expert'}
              </Text>
            </View>
          )}
        </LinearGradient>

        {/* Time + servings cards */}
        {displayRecipe && (
          <View style={styles.metaRow}>
            <View style={[styles.metaCard, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
              <Text style={styles.metaEmoji}>🔪</Text>
              <Text style={[styles.metaValue, { color: c.text }]}>{displayRecipe.prep_time_min} min</Text>
              <Text style={[styles.metaLabel, { color: c.textMuted }]}>Préparation</Text>
            </View>
            <View style={[styles.metaCard, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
              <Text style={styles.metaEmoji}>🔥</Text>
              <Text style={[styles.metaValue, { color: c.text }]}>{displayRecipe.cook_time_min} min</Text>
              <Text style={[styles.metaLabel, { color: c.textMuted }]}>Cuisson</Text>
            </View>
            <View style={[styles.metaCard, { backgroundColor: c.primary + '15', borderColor: c.primary + '30' }]}>
              <Text style={styles.metaEmoji}>⏱️</Text>
              <Text style={[styles.metaValue, { color: c.primary }]}>{totalTime} min</Text>
              <Text style={[styles.metaLabel, { color: c.primary + 'aa' }]}>Total</Text>
            </View>
            <View style={[styles.metaCard, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
              <Text style={styles.metaEmoji}>🍽️</Text>
              <Text style={[styles.metaValue, { color: c.text }]}>{displayRecipe.servings}</Text>
              <Text style={[styles.metaLabel, { color: c.textMuted }]}>Portions</Text>
            </View>
          </View>
        )}

        {/* Ingredients */}
        {displayRecipe && displayRecipe.ingredients.length > 0 && (
          <View style={[styles.section, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
            <SectionHeader icon="nutrition" label="Ingrédients" color={c.text} />
            <Text style={[styles.sectionSub, { color: c.textMuted }]}>Pour {displayRecipe.servings} personne{displayRecipe.servings > 1 ? 's' : ''}</Text>
            {displayRecipe.ingredients.map((ing, i) => (
              <View key={i} style={[styles.ingRow, i < displayRecipe.ingredients.length - 1 && { borderBottomColor: c.border, borderBottomWidth: 1 }]}>
                <Text style={styles.ingEmoji}>{ing.emoji}</Text>
                <View style={styles.ingInfo}>
                  <Text style={[styles.ingName, { color: c.text }]}>{ing.name}</Text>
                  {ing.note && <Text style={[styles.ingNote, { color: c.textMuted }]}>{ing.note}</Text>}
                </View>
                <Text style={[styles.ingQty, { color: c.primary }]}>{ing.quantity}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Steps — Supabase uses "steps" key injected by supabaseToRecipeDetail */}
        {displayRecipe && (displayRecipe as any).steps?.length > 0 && (
          <View style={[styles.section, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
            <SectionHeader icon="list" label="Étapes" color={c.text} />
            {((displayRecipe as any).steps as string[]).map((step, i) => (
              <View key={i} style={styles.stepRow}>
                <LinearGradient
                  colors={[c.primary, c.secondary ?? c.primary]}
                  style={styles.stepNum}
                >
                  <Text style={styles.stepNumText}>{i + 1}</Text>
                </LinearGradient>
                <Text style={[styles.stepText, { color: c.text }]}>{step}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Chef tip */}
        {(displayRecipe?.chef_tip || lessonDetail?.chef_tip) && (
          <View style={[styles.section, { backgroundColor: c.primary + '10', borderColor: c.primary + '30' }]}>
            <SectionHeader icon="bulb" label="Conseil du Chef" color={c.primary} />
            <Text style={[styles.sectionText, { color: c.text }]}>{displayRecipe?.chef_tip ?? lessonDetail?.chef_tip}</Text>
          </View>
        )}

        {/* Anecdote */}
        {(displayRecipe?.anecdote || lessonDetail?.anecdote) && (
          <View style={[styles.section, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
            <SectionHeader icon="book-outline" label="Anecdote" color={c.text} />
            <Text style={[styles.sectionText, { color: c.textMuted }]}>{displayRecipe?.anecdote ?? lessonDetail?.anecdote}</Text>
          </View>
        )}

        {/* Cultural note fallback */}
        {!displayRecipe && lessonDetail && (
          <>
            {lessonDetail.cultural_note && (
              <View style={[styles.section, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
                <SectionHeader icon="globe-outline" label="Note Culturelle" color={c.text} />
                <Text style={[styles.sectionText, { color: c.textMuted }]}>{lessonDetail.cultural_note}</Text>
              </View>
            )}
            {lessonDetail.ingredients.length > 0 && (
              <View style={[styles.section, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
                <SectionHeader icon="nutrition" label="Ingrédients clés" color={c.text} />
                {lessonDetail.ingredients.map((ing, i) => (
                  <View key={i} style={[styles.ingRow, i < lessonDetail.ingredients.length - 1 && { borderBottomColor: c.border, borderBottomWidth: 1 }]}>
                    <Text style={styles.ingEmoji}>{ing.emoji}</Text>
                    <View style={styles.ingInfo}>
                      <Text style={[styles.ingName, { color: c.text }]}>{ing.name}</Text>
                      {ing.tip && <Text style={[styles.ingNote, { color: c.textMuted }]}>{ing.tip}</Text>}
                    </View>
                    {ing.quantity && <Text style={[styles.ingQty, { color: c.primary }]}>{ing.quantity}{ing.unit ? ` ${ing.unit}` : ''}</Text>}
                  </View>
                ))}
              </View>
            )}
            <View style={[styles.comingSoon, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
              <Text style={styles.comingSoonEmoji}>🔜</Text>
              <Text style={[styles.comingSoonText, { color: c.textMuted }]}>Recette complète bientôt disponible !</Text>
            </View>
          </>
        )}

        {!displayRecipe && !lessonDetail && (
          <View style={[styles.comingSoon, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
            <Text style={styles.comingSoonEmoji}>🔜</Text>
            <Text style={[styles.comingSoonText, { color: c.textMuted }]}>Recette bientôt disponible !</Text>
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.md,
    padding: Layout.spacing.lg,
    borderBottomWidth: 1,
  },
  headerTitle: { flex: 1, fontSize: Layout.fontSize.lg, fontWeight: '800' },
  content: { padding: Layout.spacing.lg, gap: Layout.spacing.md, paddingBottom: 48 },
  hero: {
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.xl,
    alignItems: 'center',
    gap: Layout.spacing.sm,
  },
  heroEmoji: { fontSize: 64 },
  heroTitle: { fontSize: Layout.fontSize.xl, fontWeight: '900', textAlign: 'center' },
  heroDesc: { fontSize: Layout.fontSize.sm, textAlign: 'center', lineHeight: 20 },
  diffBadge: { paddingHorizontal: Layout.spacing.md, paddingVertical: 4, borderRadius: 20, marginTop: 4 },
  diffText: { fontSize: Layout.fontSize.sm, fontWeight: '800' },
  metaRow: { flexDirection: 'row', gap: Layout.spacing.sm },
  metaCard: {
    flex: 1,
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.sm,
    alignItems: 'center',
    gap: 2,
    borderWidth: 1,
  },
  metaEmoji: { fontSize: 20 },
  metaValue: { fontSize: Layout.fontSize.md, fontWeight: '800' },
  metaLabel: { fontSize: Layout.fontSize.xs, fontWeight: '600' },
  section: {
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.md,
    gap: Layout.spacing.sm,
    borderWidth: 1,
  },
  sectionTitle: { fontSize: Layout.fontSize.md, fontWeight: '800', marginBottom: 2 },
  sectionSub: { fontSize: Layout.fontSize.xs, marginBottom: 4 },
  sectionText: { fontSize: Layout.fontSize.sm, lineHeight: 22 },
  ingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
    paddingVertical: Layout.spacing.sm,
  },
  ingEmoji: { fontSize: 22, width: 30 },
  ingInfo: { flex: 1 },
  ingName: { fontSize: Layout.fontSize.sm, fontWeight: '700' },
  ingNote: { fontSize: Layout.fontSize.xs, marginTop: 1 },
  ingQty: { fontSize: Layout.fontSize.sm, fontWeight: '800', textAlign: 'right' },
  stepRow: { flexDirection: 'row', gap: Layout.spacing.sm, alignItems: 'flex-start', marginBottom: Layout.spacing.sm },
  stepNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  stepNumText: { color: '#fff', fontSize: Layout.fontSize.xs, fontWeight: '900' },
  stepText: { flex: 1, fontSize: Layout.fontSize.sm, lineHeight: 22 },
  comingSoon: {
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.xl,
    alignItems: 'center',
    gap: Layout.spacing.sm,
    borderWidth: 1,
  },
  comingSoonEmoji: { fontSize: 40 },
  comingSoonText: { fontSize: Layout.fontSize.md, textAlign: 'center', fontWeight: '600' },
});
