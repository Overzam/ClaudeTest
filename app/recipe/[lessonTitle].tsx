import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { useThemeStore } from '@/stores/themeStore';
import { RECIPES } from '@/constants/recipesData';
import { LESSON_DETAILS } from '@/constants/pathsData';
import { Layout } from '@/constants/Layout';

export default function RecipeDetailScreen() {
  const { lessonTitle } = useLocalSearchParams<{ lessonTitle: string }>();
  const { theme } = useThemeStore();
  const c = theme.colors;

  const title = decodeURIComponent(lessonTitle ?? '');
  const recipe = RECIPES[title];
  const lessonDetail = LESSON_DETAILS[title];

  const totalTime = recipe ? recipe.prep_time_min + recipe.cook_time_min : null;

  const difficultyColor = (d?: string) => {
    if (d === 'Facile') return '#22c55e';
    if (d === 'Moyen') return '#f59e0b';
    return '#ef4444';
  };

  return (
    <ScreenWrapper>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.back, { color: c.primary }]}>← Retour</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]} numberOfLines={1}>{title}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <LinearGradient
          colors={[c.primary + '30', c.secondary + '15']}
          style={styles.hero}
        >
          <Text style={styles.heroEmoji}>{recipe?.emoji ?? lessonDetail?.emoji ?? '🍽️'}</Text>
          <Text style={[styles.heroTitle, { color: c.text }]}>{recipe?.title ?? title}</Text>
          {recipe?.description && (
            <Text style={[styles.heroDesc, { color: c.textMuted }]}>{recipe.description}</Text>
          )}
          {recipe && (
            <View style={[styles.diffBadge, { backgroundColor: difficultyColor(recipe.difficulty) + '20' }]}>
              <Text style={[styles.diffText, { color: difficultyColor(recipe.difficulty) }]}>
                {recipe.difficulty}
              </Text>
            </View>
          )}
        </LinearGradient>

        {/* Time + servings cards */}
        {recipe && (
          <View style={styles.metaRow}>
            <View style={[styles.metaCard, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
              <Text style={styles.metaEmoji}>🔪</Text>
              <Text style={[styles.metaValue, { color: c.text }]}>{recipe.prep_time_min} min</Text>
              <Text style={[styles.metaLabel, { color: c.textMuted }]}>Préparation</Text>
            </View>
            <View style={[styles.metaCard, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
              <Text style={styles.metaEmoji}>🔥</Text>
              <Text style={[styles.metaValue, { color: c.text }]}>{recipe.cook_time_min} min</Text>
              <Text style={[styles.metaLabel, { color: c.textMuted }]}>Cuisson</Text>
            </View>
            <View style={[styles.metaCard, { backgroundColor: c.primary + '15', borderColor: c.primary + '30' }]}>
              <Text style={styles.metaEmoji}>⏱️</Text>
              <Text style={[styles.metaValue, { color: c.primary }]}>{totalTime} min</Text>
              <Text style={[styles.metaLabel, { color: c.primary + 'aa' }]}>Total</Text>
            </View>
            <View style={[styles.metaCard, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
              <Text style={styles.metaEmoji}>🍽️</Text>
              <Text style={[styles.metaValue, { color: c.text }]}>{recipe.servings}</Text>
              <Text style={[styles.metaLabel, { color: c.textMuted }]}>Portions</Text>
            </View>
          </View>
        )}

        {/* Ingredients */}
        {recipe && recipe.ingredients.length > 0 && (
          <View style={[styles.section, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
            <Text style={[styles.sectionTitle, { color: c.text }]}>🧄 Ingrédients</Text>
            <Text style={[styles.sectionSub, { color: c.textMuted }]}>Pour {recipe.servings} personne{recipe.servings > 1 ? 's' : ''}</Text>
            {recipe.ingredients.map((ing, i) => (
              <View key={i} style={[styles.ingRow, i < recipe.ingredients.length - 1 && { borderBottomColor: c.border, borderBottomWidth: 1 }]}>
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

        {/* Steps */}
        {recipe && recipe.steps.length > 0 && (
          <View style={[styles.section, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
            <Text style={[styles.sectionTitle, { color: c.text }]}>👨‍🍳 Étapes</Text>
            {recipe.steps.map((step, i) => (
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
        {(recipe?.chef_tip || lessonDetail?.chef_tip) && (
          <View style={[styles.section, { backgroundColor: c.primary + '10', borderColor: c.primary + '30' }]}>
            <Text style={[styles.sectionTitle, { color: c.primary }]}>💡 Conseil du Chef</Text>
            <Text style={[styles.sectionText, { color: c.text }]}>{recipe?.chef_tip ?? lessonDetail?.chef_tip}</Text>
          </View>
        )}

        {/* Anecdote */}
        {(recipe?.anecdote || lessonDetail?.anecdote) && (
          <View style={[styles.section, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
            <Text style={[styles.sectionTitle, { color: c.text }]}>📖 Anecdote</Text>
            <Text style={[styles.sectionText, { color: c.textMuted }]}>{recipe?.anecdote ?? lessonDetail?.anecdote}</Text>
          </View>
        )}

        {/* Cultural note fallback */}
        {!recipe && lessonDetail && (
          <>
            {lessonDetail.cultural_note && (
              <View style={[styles.section, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
                <Text style={[styles.sectionTitle, { color: c.text }]}>🌍 Note Culturelle</Text>
                <Text style={[styles.sectionText, { color: c.textMuted }]}>{lessonDetail.cultural_note}</Text>
              </View>
            )}
            {lessonDetail.ingredients.length > 0 && (
              <View style={[styles.section, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
                <Text style={[styles.sectionTitle, { color: c.text }]}>🧄 Ingrédients clés</Text>
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

        {!recipe && !lessonDetail && (
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
  back: { fontSize: Layout.fontSize.md, fontWeight: '600' },
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
