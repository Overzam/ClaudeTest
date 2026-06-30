import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator, Animated, Dimensions, ScrollView,
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';
import { fetchRecipe, type Recipe } from '@/services/recipeService';

const { width: SCREEN_W } = Dimensions.get('window');
const HERO_H = 300;

const DIFFICULTY_COLOR: Record<string, string> = {
  facile: '#22c55e',
  moyen: '#f59e0b',
  difficile: '#ef4444',
  expert: '#8b5cf6',
};

export default function RecipeScreen() {
  const { lessonId, lessonTitle, xpEarned, score, mistakes } = useLocalSearchParams<{
    lessonId: string; lessonTitle?: string; xpEarned?: string; score?: string; mistakes?: string;
  }>();
  const { theme } = useThemeStore();
  const c = theme.colors;
  const insets = useSafeAreaInsets();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (lessonId) {
      fetchRecipe(lessonId, lessonTitle).then((r) => { setRecipe(r); setLoading(false); });
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

  if (!recipe) { goToComplete(); return null; }

  const totalTime = recipe.prep_time_min + recipe.cook_time_min;
  const diffColor = DIFFICULTY_COLOR[recipe.difficulty] ?? c.primary;

  // Parallax: photo moves at 0.5x scroll speed
  const photoTranslate = scrollY.interpolate({
    inputRange: [-HERO_H, 0, HERO_H],
    outputRange: [HERO_H / 2, 0, -HERO_H / 2],
    extrapolate: 'clamp',
  });

  // Header bar fades in as user scrolls
  const headerOpacity = scrollY.interpolate({
    inputRange: [HERO_H - 80, HERO_H - 20],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.root, { backgroundColor: c.background }]}>

      {/* ── Sticky transparent→opaque header ── */}
      <Animated.View
        style={[styles.stickyHeader, { paddingTop: insets.top, backgroundColor: c.background, opacity: headerOpacity }]}
        pointerEvents="none"
      >
        <Text style={[styles.stickyTitle, { color: c.text }]} numberOfLines={1}>{recipe.title}</Text>
      </Animated.View>

      {/* ── Back button (always visible) ── */}
      <View style={[styles.backBtnWrap, { top: insets.top + 8 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.8}>
          <Text style={styles.backBtnText}>‹</Text>
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
      >
        {/* ── HERO ── */}
        <View style={styles.heroContainer}>
          {recipe.hero_image_url ? (
            <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ translateY: photoTranslate }] }]}>
              <Image
                source={{ uri: recipe.hero_image_url }}
                style={{ width: SCREEN_W, height: HERO_H + 60 }}
                contentFit="cover"
                transition={400}
              />
            </Animated.View>
          ) : (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: c.primary + '30' }]} />
          )}

          {/* Gradient overlay layers (simulated) */}
          <View style={styles.gradientTop} />
          <View style={styles.gradientBottom} />

          {/* Content overlaid on hero */}
          <View style={styles.heroContent}>
            <Text style={styles.heroEmoji}>{recipe.emoji}</Text>
            <Text style={styles.heroTitle}>{recipe.title}</Text>
            <Text style={styles.heroDesc} numberOfLines={2}>{recipe.description}</Text>

            <View style={styles.heroPills}>
              <View style={[styles.pill, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <Text style={styles.pillText}>⏰ {totalTime} min</Text>
              </View>
              <View style={[styles.pill, { backgroundColor: diffColor + 'CC' }]}>
                <Text style={styles.pillText}>
                  {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
                </Text>
              </View>
              <View style={[styles.pill, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <Text style={styles.pillText}>👥 {recipe.servings} pers.</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── SHEET ── */}
        <View style={[styles.sheet, { backgroundColor: c.background }]}>
          {/* Stats bar */}
          <View style={[styles.statsBar, { backgroundColor: c.surface, borderColor: c.border }]}>
            <StatItem icon="⏱️" label="Prépa" value={`${recipe.prep_time_min} min`} c={c} />
            <View style={[styles.statDivider, { backgroundColor: c.border }]} />
            <StatItem icon="🔥" label="Cuisson" value={`${recipe.cook_time_min} min`} c={c} />
            <View style={[styles.statDivider, { backgroundColor: c.border }]} />
            <StatItem icon="💶" label="Prix" value={recipe.avg_price_eur} c={c} />
          </View>

          {/* Ingrédients */}
          <Section title={`🛒 Ingrédients`} badge={`${checkedIngredients.size}/${recipe.ingredients.length}`} c={c}>
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
                  activeOpacity={0.7}
                  style={[styles.ingRow, { borderBottomColor: c.border, opacity: checked ? 0.4 : 1 }]}
                >
                  <View style={[styles.checkbox, {
                    borderColor: checked ? c.primary : c.border,
                    backgroundColor: checked ? c.primary : 'transparent',
                  }]}>
                    {checked && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={[styles.ingQty, { color: c.primary, textDecorationLine: checked ? 'line-through' : 'none' }]}>{ing.qty}</Text>
                  <Text style={[styles.ingItem, { color: c.text, textDecorationLine: checked ? 'line-through' : 'none' }]}>{ing.item}</Text>
                  {ing.tip ? <Text style={[styles.ingTip, { color: c.textMuted }]}>{ing.tip}</Text> : null}
                </TouchableOpacity>
              );
            })}
            {checkedIngredients.size === recipe.ingredients.length && recipe.ingredients.length > 0 && (
              <View style={[styles.allCheckedBanner, { backgroundColor: '#22c55e20' }]}>
                <Text style={[styles.allCheckedText, { color: '#22c55e' }]}>✅ Tous les ingrédients prêts !</Text>
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
            <View style={[styles.tipBox, { backgroundColor: c.primary + '10', borderColor: c.primary + '25' }]}>
              <View style={styles.tipHeader}>
                <Text style={styles.tipIcon}>👨‍🍳</Text>
                <Text style={[styles.tipTitle, { color: c.primary }]}>Conseil du Chef</Text>
              </View>
              <Text style={[styles.tipText, { color: c.text }]}>{recipe.chef_tip}</Text>
            </View>
          ) : null}

          {/* Cultural note */}
          {recipe.cultural_note ? (
            <View style={[styles.cultureBox, { backgroundColor: c.surface, borderColor: c.border }]}>
              <View style={styles.tipHeader}>
                <Text style={styles.tipIcon}>🌍</Text>
                <Text style={[styles.tipTitle, { color: c.textSecondary ?? c.text }]}>Note Culturelle</Text>
              </View>
              <Text style={[styles.tipText, { color: c.text }]}>{recipe.cultural_note}</Text>
            </View>
          ) : null}
        </View>
      </Animated.ScrollView>

      {/* CTA flottant */}
      <View style={[styles.cta, { backgroundColor: c.background, paddingBottom: insets.bottom + 12, borderTopColor: c.border }]}>
        <TouchableOpacity style={[styles.ctaBtn, { backgroundColor: c.primary }]} onPress={goToComplete} activeOpacity={0.85}>
          <Text style={styles.ctaBtnText}>🎉 Voir mes résultats</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function StatItem({ icon, label, value, c }: { icon: string; label: string; value: string; c: any }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={[styles.statValue, { color: c.text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: c.textMuted }]}>{label}</Text>
    </View>
  );
}

function Section({ title, badge, children, c }: { title: string; badge?: string; children: React.ReactNode; c: any }) {
  return (
    <View style={[styles.section, { backgroundColor: c.surface, borderColor: c.border }]}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: c.text }]}>{title}</Text>
        {badge ? (
          <View style={[styles.sectionBadge, { backgroundColor: c.primary + '20' }]}>
            <Text style={[styles.sectionBadgeText, { color: c.primary }]}>{badge}</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  // Sticky header
  stickyHeader: {
    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
    paddingHorizontal: 60, paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  stickyTitle: { fontSize: 16, fontWeight: '700', textAlign: 'center' },

  backBtnWrap: { position: 'absolute', left: 16, zIndex: 20 },
  backBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center', justifyContent: 'center',
  },
  backBtnText: { color: '#fff', fontSize: 24, fontWeight: '300', lineHeight: 30, marginTop: -2 },

  scroll: { paddingTop: 0, gap: 0 },

  // Hero
  heroContainer: { height: HERO_H, overflow: 'hidden' },
  gradientTop: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 80,
    backgroundColor: 'rgba(0,0,0,0.3)',
    // simulate gradient: fade from black to transparent
  },
  gradientBottom: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 160,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  heroContent: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 20, paddingBottom: 24, gap: 6,
  },
  heroEmoji: { fontSize: 40 },
  heroTitle: { fontSize: 26, fontWeight: '900', color: '#fff', lineHeight: 30 },
  heroDesc: { fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 18 },
  heroPills: { flexDirection: 'row', gap: 8, marginTop: 6, flexWrap: 'wrap' },
  pill: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  pillText: { color: '#fff', fontSize: 12, fontWeight: '700' },

  // Sheet
  sheet: {
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    marginTop: -24,
    gap: Layout.spacing.lg,
    padding: Layout.spacing.lg,
    paddingTop: Layout.spacing.xl,
  },

  // Stats bar
  statsBar: {
    flexDirection: 'row', borderRadius: Layout.radius.xl,
    borderWidth: 1, overflow: 'hidden',
  },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: 14, gap: 3 },
  statDivider: { width: StyleSheet.hairlineWidth },
  statIcon: { fontSize: 18 },
  statValue: { fontSize: 13, fontWeight: '800' },
  statLabel: { fontSize: 10, fontWeight: '500' },

  // Section
  section: {
    borderRadius: Layout.radius.xl, padding: Layout.spacing.lg,
    borderWidth: 1, gap: Layout.spacing.md,
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionTitle: { fontSize: Layout.fontSize.lg, fontWeight: '800', flex: 1 },
  sectionBadge: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 3 },
  sectionBadgeText: { fontSize: 12, fontWeight: '700' },
  sectionContent: { gap: Layout.spacing.sm },

  // Ingredients
  ingRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth, gap: 8, flexWrap: 'wrap',
  },
  checkbox: {
    width: 24, height: 24, borderRadius: 12, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  checkmark: { color: '#fff', fontSize: 13, fontWeight: '900' },
  ingQty: { fontSize: 13, fontWeight: '800', minWidth: 65 },
  ingItem: { fontSize: 14, fontWeight: '600', flex: 1 },
  ingTip: { fontSize: 11, fontStyle: 'italic', width: '100%', paddingLeft: 32 },
  allCheckedBanner: {
    borderRadius: Layout.radius.md, padding: Layout.spacing.md,
    alignItems: 'center', marginTop: 4,
  },
  allCheckedText: { fontSize: 13, fontWeight: '700' },

  // Steps
  stepRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  stepNum: {
    width: 30, height: 30, borderRadius: 15,
    alignItems: 'center', justifyContent: 'center', marginTop: 1, flexShrink: 0,
  },
  stepNumText: { color: '#fff', fontWeight: '900', fontSize: 13 },
  stepText: { flex: 1, fontSize: 14, lineHeight: 22 },

  // Tip / culture
  tipBox: { borderRadius: Layout.radius.xl, padding: Layout.spacing.lg, borderWidth: 1, gap: 8 },
  cultureBox: { borderRadius: Layout.radius.xl, padding: Layout.spacing.lg, borderWidth: 1, gap: 8 },
  tipHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  tipIcon: { fontSize: 22 },
  tipTitle: { fontSize: 15, fontWeight: '800' },
  tipText: { fontSize: 14, lineHeight: 22 },

  // CTA
  cta: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: Layout.spacing.lg, paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  ctaBtn: { borderRadius: Layout.radius.full, paddingVertical: 16, alignItems: 'center' },
  ctaBtnText: { color: '#fff', fontWeight: '900', fontSize: 16 },
});
