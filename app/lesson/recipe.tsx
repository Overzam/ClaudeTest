import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';
import { fetchRecipe, type Recipe } from '@/services/recipeService';

const DIFFICULTY_COLOR: Record<string, string> = {
  facile: '#22c55e',
  moyen: '#f59e0b',
  difficile: '#ef4444',
  expert: '#8b5cf6',
};

export default function RecipeScreen() {
  const { lessonId, xpEarned, score, mistakes } = useLocalSearchParams<{
    lessonId: string;
    xpEarned?: string;
    score?: string;
    mistakes?: string;
  }>();
  const { theme } = useThemeStore();
  const c = theme.colors;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (lessonId) {
      fetchRecipe(lessonId).then((r) => {
        setRecipe(r);
        setLoading(false);
      });
    }
  }, [lessonId]);

  function goToComplete() {
    router.replace({
      pathname: '/lesson/complete',
      params: { xpEarned: xpEarned ?? '0', score: score ?? '100', mistakes: mistakes ?? '0' },
    });
  }

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: c.background }]}>
        <ActivityIndicator size="large" color={c.primary} />
      </View>
    );
  }

  if (!recipe) {
    goToComplete();
    return null;
  }

  const totalTime = recipe.prep_time_min + recipe.cook_time_min;
  const diffColor = DIFFICULTY_COLOR[recipe.difficulty] ?? c.primary;

  return (
    <View style={[styles.root, { backgroundColor: c.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: c.primary + '12' }]}>
          {recipe.hero_image_url ? (
            <Image
              source={{ uri: recipe.hero_image_url }}
              style={styles.heroPhoto}
              contentFit="cover"
              transition={300}
            />
          ) : null}
          <Text style={styles.heroEmoji}>{recipe.emoji}</Text>
          <Text style={[styles.heroTitle, { color: c.text }]}>{recipe.title}</Text>
          <Text style={[styles.heroDesc, { color: c.textMuted }]}>{recipe.description}</Text>

          {/* Total time pill */}
          <View style={[styles.totalTimePill, { backgroundColor: c.primary + '20' }]}>
            <Text style={[styles.totalTimeText, { color: c.primary }]}>⏰ {totalTime} min au total</Text>
          </View>

          {/* Stats row */}
          <View style={styles.statsRow}>
            <Stat icon="⏱️" label="Prépa" value={`${recipe.prep_time_min} min`} c={c} />
            <Stat icon="🔥" label="Cuisson" value={`${recipe.cook_time_min} min`} c={c} />
            <Stat icon="👥" label="Portions" value={`${recipe.servings} pers.`} c={c} />
            <Stat icon="💶" label="Prix moy." value={recipe.avg_price_eur} c={c} />
          </View>

          <View style={[styles.diffBadge, { backgroundColor: diffColor + '20' }]}>
            <Text style={[styles.diffText, { color: diffColor }]}>
              {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
            </Text>
          </View>
        </View>

        {/* Ingrédients */}
        <Section title={`🛒 Ingrédients (${checkedIngredients.size}/${recipe.ingredients.length})`} c={c}>
          {recipe.ingredients.map((ing, i) => {
            const checked = checkedIngredients.has(i);
            return (
              <TouchableOpacity
                key={i}
                onPress={() => setCheckedIngredients((prev) => {
                  const next = new Set(prev);
                  if (next.has(i)) next.delete(i); else next.add(i);
                  return next;
                })}
                activeOpacity={0.75}
                style={[styles.ingRow, { borderBottomColor: c.border, opacity: checked ? 0.45 : 1 }]}
              >
                <View style={[styles.checkbox, { borderColor: checked ? c.primary : c.border, backgroundColor: checked ? c.primary : 'transparent' }]}>
                  {checked && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={[styles.ingQty, { color: c.primary, textDecorationLine: checked ? 'line-through' : 'none' }]}>{ing.qty}</Text>
                <Text style={[styles.ingItem, { color: c.text, textDecorationLine: checked ? 'line-through' : 'none' }]}>{ing.item}</Text>
                {ing.tip && <Text style={[styles.ingTip, { color: c.textMuted }]}> · {ing.tip}</Text>}
              </TouchableOpacity>
            );
          })}
          {checkedIngredients.size === recipe.ingredients.length && recipe.ingredients.length > 0 && (
            <View style={[styles.allCheckedBanner, { backgroundColor: c.success + '20' }]}>
              <Text style={[styles.allCheckedText, { color: c.success ?? '#22c55e' }]}>✅ Tous les ingrédients prêts !</Text>
            </View>
          )}
        </Section>

        {/* Instructions */}
        <Section title="📋 Instructions" c={c}>
          {recipe.instructions.map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={[styles.stepNum, { backgroundColor: c.primary }]}>
                <Text style={styles.stepNumText}>{i + 1}</Text>
              </View>
              <Text style={[styles.stepText, { color: c.text }]}>{step}</Text>
            </View>
          ))}
        </Section>

        {/* Chef tip */}
        {recipe.chef_tip ? (
          <View style={[styles.tipBox, { backgroundColor: c.primary + '12', borderColor: c.primary + '30' }]}>
            <Text style={[styles.tipTitle, { color: c.primary }]}>👨‍🍳 Conseil du Chef</Text>
            <Text style={[styles.tipText, { color: c.text }]}>{recipe.chef_tip}</Text>
          </View>
        ) : null}

        {/* Cultural note */}
        {recipe.cultural_note ? (
          <View style={[styles.cultureBox, { backgroundColor: c.secondary + '15', borderColor: c.secondary + '30' }]}>
            <Text style={[styles.cultureTitle, { color: c.textSecondary }]}>🌍 Note Culturelle</Text>
            <Text style={[styles.cultureText, { color: c.text }]}>{recipe.cultural_note}</Text>
          </View>
        ) : null}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* CTA flottant */}
      <View style={[styles.cta, { backgroundColor: c.background, borderTopColor: c.border }]}>
        <TouchableOpacity style={[styles.ctaBtn, { backgroundColor: c.primary }]} onPress={goToComplete}>
          <Text style={styles.ctaBtnText}>🎉 Voir mes résultats</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Stat({ icon, label, value, c }: { icon: string; label: string; value: string; c: any }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={[styles.statValue, { color: c.text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: c.textMuted }]}>{label}</Text>
    </View>
  );
}

function Section({ title, children, c }: { title: string; children: React.ReactNode; c: any }) {
  return (
    <View style={[styles.section, { backgroundColor: c.surface, borderColor: c.border }]}>
      <Text style={[styles.sectionTitle, { color: c.text }]}>{title}</Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scroll: { padding: Layout.spacing.lg, gap: Layout.spacing.lg },

  hero: {
    borderRadius: Layout.radius.xl,
    overflow: 'hidden',
    alignItems: 'center',
    gap: Layout.spacing.sm,
    paddingBottom: Layout.spacing.xl,
  },
  heroPhoto: { width: '100%', height: 200, borderRadius: 0 },
  heroEmoji: { fontSize: 48, marginTop: Layout.spacing.md },
  heroTitle: { fontSize: Layout.fontSize.xxl, fontWeight: '900', textAlign: 'center' },
  heroDesc: { fontSize: Layout.fontSize.sm, textAlign: 'center', lineHeight: 20 },
  statsRow: { flexDirection: 'row', gap: Layout.spacing.sm, marginTop: Layout.spacing.sm, flexWrap: 'wrap', justifyContent: 'center' },
  stat: { alignItems: 'center', minWidth: 72 },
  statIcon: { fontSize: 20 },
  statValue: { fontSize: Layout.fontSize.sm, fontWeight: '800', marginTop: 2 },
  statLabel: { fontSize: 10, fontWeight: '500' },
  totalTimePill: { borderRadius: Layout.radius.full, paddingHorizontal: Layout.spacing.md, paddingVertical: 6, marginTop: Layout.spacing.xs },
  totalTimeText: { fontSize: Layout.fontSize.sm, fontWeight: '700' },
  diffBadge: { paddingHorizontal: Layout.spacing.md, paddingVertical: 4, borderRadius: Layout.radius.full, marginTop: Layout.spacing.xs },
  diffText: { fontSize: Layout.fontSize.sm, fontWeight: '700' },

  section: {
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.lg,
    borderWidth: 1,
    gap: Layout.spacing.md,
  },
  sectionTitle: { fontSize: Layout.fontSize.lg, fontWeight: '800' },
  sectionContent: { gap: Layout.spacing.sm },

  ingRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth, flexWrap: 'wrap', gap: 4 },
  checkbox: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, alignItems: 'center', justifyContent: 'center', marginRight: 4, flexShrink: 0 },
  checkmark: { color: '#fff', fontSize: 13, fontWeight: '800' },
  ingQty: { fontSize: Layout.fontSize.sm, fontWeight: '800', minWidth: 70 },
  ingItem: { fontSize: Layout.fontSize.sm, fontWeight: '600', flex: 1 },
  ingTip: { fontSize: 11, fontStyle: 'italic' },
  allCheckedBanner: { borderRadius: Layout.radius.md, padding: Layout.spacing.md, alignItems: 'center', marginTop: Layout.spacing.sm },
  allCheckedText: { fontSize: Layout.fontSize.sm, fontWeight: '700' },

  stepRow: { flexDirection: 'row', gap: Layout.spacing.md, alignItems: 'flex-start' },
  stepNum: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 2, flexShrink: 0 },
  stepNumText: { color: '#fff', fontWeight: '800', fontSize: 13 },
  stepText: { flex: 1, fontSize: Layout.fontSize.sm, lineHeight: 22 },

  tipBox: { borderRadius: Layout.radius.xl, padding: Layout.spacing.lg, gap: Layout.spacing.sm, borderWidth: 1 },
  tipTitle: { fontSize: Layout.fontSize.md, fontWeight: '800' },
  tipText: { fontSize: Layout.fontSize.sm, lineHeight: 20 },

  cultureBox: { borderRadius: Layout.radius.xl, padding: Layout.spacing.lg, gap: Layout.spacing.sm, borderWidth: 1 },
  cultureTitle: { fontSize: Layout.fontSize.md, fontWeight: '800' },
  cultureText: { fontSize: Layout.fontSize.sm, lineHeight: 20 },

  cta: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: Layout.spacing.lg, borderTopWidth: 1 },
  ctaBtn: { borderRadius: Layout.radius.full, padding: Layout.spacing.md, alignItems: 'center' },
  ctaBtnText: { color: '#fff', fontWeight: '800', fontSize: Layout.fontSize.md },
});
