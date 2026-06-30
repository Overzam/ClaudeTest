import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Modal, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { useThemeStore } from '@/stores/themeStore';
import { useFavoritesStore } from '@/stores/favoritesStore';
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
    steps: r.instructions,
  } as any;
}

// ──────────────────────────────────────────────────────────────
// Cooking Timer Modal
// ──────────────────────────────────────────────────────────────
interface TimerModalProps {
  visible: boolean;
  onClose: () => void;
  color: string;
  bgColor: string;
  textColor: string;
  mutedColor: string;
  borderColor: string;
  surfaceColor: string;
}

function CookingTimerModal({ visible, onClose, color, bgColor, textColor, mutedColor, borderColor, surfaceColor }: TimerModalProps) {
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [preset, setPreset] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current!);
            setRunning(false);
            setDone(true);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  // Reset done state when a new preset is applied or timer is restarted
  useEffect(() => { if (running) setDone(false); }, [running]);

  const PRESETS = [
    { label: '1 min', value: 60 },
    { label: '5 min', value: 300 },
    { label: '10 min', value: 600 },
    { label: '15 min', value: 900 },
    { label: '30 min', value: 1800 },
  ];

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  const progress = totalSeconds > 0 ? seconds / totalSeconds : 0;

  function applyPreset(val: number) {
    setRunning(false);
    setDone(false);
    setSeconds(val);
    setTotalSeconds(val);
    setPreset(val);
    Haptics.selectionAsync();
  }

  function adjust(delta: number) {
    if (running) return;
    const next = Math.max(0, seconds + delta);
    setSeconds(next);
    setTotalSeconds(next);
    setPreset(next);
    setDone(false);
    Haptics.selectionAsync();
  }

  function reset() {
    setRunning(false);
    setDone(false);
    setSeconds(preset ?? 0);
  }

  function stop() {
    setRunning(false);
    setDone(false);
    setSeconds(0);
    setTotalSeconds(0);
    setPreset(null);
  }

  const accentColor = done ? '#ef4444' : color;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={timerStyles.backdrop}>
        <View style={[timerStyles.sheet, { backgroundColor: bgColor }]}>
          <View style={[timerStyles.handle, { backgroundColor: borderColor }]} />

          <View style={timerStyles.timerHeader}>
            <Text style={[timerStyles.timerTitle, { color: textColor }]}>⏱️ Minuteur de cuisine</Text>
            <TouchableOpacity onPress={onClose} hitSlop={8}>
              <Ionicons name="close" size={22} color={mutedColor} />
            </TouchableOpacity>
          </View>

          {/* Presets */}
          <View style={timerStyles.presets}>
            {PRESETS.map((p) => (
              <TouchableOpacity
                key={p.value}
                style={[timerStyles.presetBtn, { backgroundColor: surfaceColor, borderColor }, preset === p.value && { backgroundColor: color + '25', borderColor: color }]}
                onPress={() => applyPreset(p.value)}
              >
                <Text style={[timerStyles.presetText, { color: mutedColor }, preset === p.value && { color }]}>{p.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Adjust row */}
          <View style={timerStyles.adjustRow}>
            <TouchableOpacity
              style={[timerStyles.adjustBtn, { backgroundColor: surfaceColor, borderColor }]}
              onPress={() => adjust(-60)}
              disabled={running}
            >
              <Text style={[timerStyles.adjustText, { color: running ? mutedColor : textColor }]}>−1 min</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[timerStyles.adjustBtn, { backgroundColor: surfaceColor, borderColor }]}
              onPress={() => adjust(60)}
              disabled={running}
            >
              <Text style={[timerStyles.adjustText, { color: running ? mutedColor : textColor }]}>+1 min</Text>
            </TouchableOpacity>
          </View>

          {/* Display */}
          <View style={[timerStyles.display, { backgroundColor: accentColor + '10', borderColor: accentColor }]}>
            <Text style={[timerStyles.displayText, { color: accentColor }]}>
              {mm}:{ss}
            </Text>
            {done && (
              <Text style={timerStyles.doneText}>Temps écoulé ! 🔔</Text>
            )}
          </View>

          {/* Progress bar */}
          {totalSeconds > 0 && (
            <View style={[timerStyles.progressTrack, { backgroundColor: borderColor }]}>
              <View style={[timerStyles.progressFill, { width: `${progress * 100}%`, backgroundColor: accentColor }]} />
            </View>
          )}

          {/* Controls */}
          <View style={timerStyles.controls}>
            <TouchableOpacity style={[timerStyles.ctrlBtn, { backgroundColor: surfaceColor }]} onPress={reset}>
              <Ionicons name="refresh" size={22} color={mutedColor} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[timerStyles.playBtn, { backgroundColor: seconds === 0 ? mutedColor + '40' : accentColor }]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setRunning((r) => !r);
              }}
              disabled={seconds === 0}
            >
              <Ionicons name={running ? 'pause' : 'play'} size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={[timerStyles.ctrlBtn, { backgroundColor: surfaceColor }]} onPress={stop}>
              <Ionicons name="stop" size={22} color={mutedColor} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const timerStyles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  sheet: { borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, gap: 16 },
  handle: { width: 40, height: 4, borderRadius: 2, alignSelf: 'center', marginBottom: -4 },
  timerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timerTitle: { fontSize: 17, fontWeight: '800' },
  presets: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  presetBtn: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1 },
  presetText: { fontSize: 13, fontWeight: '700' },
  adjustRow: { flexDirection: 'row', gap: 8 },
  adjustBtn: { flex: 1, paddingVertical: 8, borderRadius: 12, borderWidth: 1, alignItems: 'center' },
  adjustText: { fontSize: 14, fontWeight: '700' },
  display: { alignItems: 'center', borderWidth: 2, borderRadius: 20, paddingVertical: 20, gap: 4 },
  displayText: { fontSize: 56, fontWeight: '900', letterSpacing: 4 },
  doneText: { fontSize: 14, fontWeight: '700', color: '#ef4444' },
  progressTrack: { height: 6, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 24 },
  ctrlBtn: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  playBtn: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
});

// ──────────────────────────────────────────────────────────────
// Main screen
// ──────────────────────────────────────────────────────────────
export default function RecipeDetailScreen() {
  const { lessonTitle } = useLocalSearchParams<{ lessonTitle: string }>();
  const { theme } = useThemeStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const c = theme.colors;

  const title = decodeURIComponent(lessonTitle ?? '');
  const [loading, setLoading] = useState(true);
  const [supabaseRecipe, setSupabaseRecipe] = useState<SupabaseRecipe | null>(null);
  const [timerVisible, setTimerVisible] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());

  const fav = isFavorite(title);

  function toggleIngredient(i: number) {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
    Haptics.selectionAsync();
  }

  function toggleStep(i: number) {
    setCheckedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
    Haptics.selectionAsync();
  }

  useEffect(() => {
    fetchRecipeByTitle(title).then((r) => {
      setSupabaseRecipe(r);
      setLoading(false);
    });
    setCheckedIngredients(new Set());
    setCheckedSteps(new Set());
  }, [title]);

  const recipe = RECIPES[title] ?? null;
  const lessonDetail = LESSON_DETAILS[title];
  const displayRecipe = supabaseRecipe ? supabaseToRecipeDetail(supabaseRecipe) : recipe;
  const totalTime = displayRecipe ? displayRecipe.prep_time_min + displayRecipe.cook_time_min : null;
  const steps: string[] = (displayRecipe as any)?.steps ?? [];

  async function shareRecipe() {
    const ingredientsText = displayRecipe?.ingredients.length
      ? displayRecipe.ingredients.map((ing) => `• ${ing.name}${ing.quantity ? ` — ${ing.quantity}` : ''}`).join('\n')
      : '';
    const stepsText = steps.length
      ? steps.map((s, i) => `${i + 1}. ${s}`).join('\n')
      : '';
    const message = [
      `${displayRecipe?.emoji ?? lessonDetail?.emoji ?? '🍽️'} ${displayRecipe?.title ?? title}`,
      ingredientsText && `\nIngrédients:\n${ingredientsText}`,
      stepsText && `\nÉtapes:\n${stepsText}`,
    ].filter(Boolean).join('\n');
    try {
      await Share.share({ message, title: displayRecipe?.title ?? title });
    } catch {}
  }

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
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={shareRecipe} hitSlop={8}>
            <Ionicons name="share-outline" size={24} color={c.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTimerVisible(true)} hitSlop={8}>
            <Ionicons name="timer-outline" size={24} color={c.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleFavorite(title);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            hitSlop={8}
          >
            <Ionicons name={fav ? 'heart' : 'heart-outline'} size={24} color={fav ? '#ef4444' : c.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <CookingTimerModal
        visible={timerVisible}
        onClose={() => setTimerVisible(false)}
        color={c.primary}
        bgColor={c.surface}
        textColor={c.text}
        mutedColor={c.textMuted}
        borderColor={c.border}
        surfaceColor={c.surfaceElevated}
      />

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
            <TouchableOpacity
              style={[styles.metaCard, { backgroundColor: c.primary + '15', borderColor: c.primary + '30' }]}
              onPress={() => setTimerVisible(true)}
            >
              <Text style={styles.metaEmoji}>⏱️</Text>
              <Text style={[styles.metaValue, { color: c.primary }]}>{totalTime} min</Text>
              <Text style={[styles.metaLabel, { color: c.primary + 'aa' }]}>Minuteur</Text>
            </TouchableOpacity>
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
            <View style={styles.sectionHeaderRow}>
              <SectionHeader icon="nutrition" label="Ingrédients" color={c.text} />
              {checkedIngredients.size > 0 && (
                <Text style={[styles.checklistCount, { color: c.primary }]}>
                  {checkedIngredients.size}/{displayRecipe.ingredients.length}
                </Text>
              )}
            </View>
            <Text style={[styles.sectionSub, { color: c.textMuted }]}>Pour {displayRecipe.servings} personne{displayRecipe.servings > 1 ? 's' : ''} · Touche un ingrédient pour le cocher</Text>
            {displayRecipe.ingredients.map((ing, i) => {
              const checked = checkedIngredients.has(i);
              return (
                <TouchableOpacity
                  key={i}
                  style={[styles.ingRow, i < displayRecipe.ingredients.length - 1 && { borderBottomColor: c.border, borderBottomWidth: 1 }]}
                  onPress={() => toggleIngredient(i)}
                  activeOpacity={0.6}
                >
                  <Ionicons
                    name={checked ? 'checkbox' : 'square-outline'}
                    size={20}
                    color={checked ? c.primary : c.textMuted}
                  />
                  <Text style={styles.ingEmoji}>{ing.emoji}</Text>
                  <View style={styles.ingInfo}>
                    <Text style={[styles.ingName, { color: c.text }, checked && styles.struckThrough]}>{ing.name}</Text>
                    {ing.note && <Text style={[styles.ingNote, { color: c.textMuted }]}>{ing.note}</Text>}
                  </View>
                  <Text style={[styles.ingQty, { color: c.primary }, checked && styles.struckThrough]}>{ing.quantity}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Steps */}
        {displayRecipe && steps.length > 0 && (
          <View style={[styles.section, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
            <View style={styles.sectionHeaderRow}>
              <SectionHeader icon="list" label="Étapes" color={c.text} />
              {checkedSteps.size > 0 && (
                <Text style={[styles.checklistCount, { color: c.primary }]}>
                  {checkedSteps.size}/{steps.length}
                </Text>
              )}
            </View>
            {checkedSteps.size > 0 && (
              <View style={[styles.progressTrackSlim, { backgroundColor: c.border }]}>
                <View style={[styles.progressFillSlim, { width: `${(checkedSteps.size / steps.length) * 100}%`, backgroundColor: c.primary }]} />
              </View>
            )}
            {steps.map((step, i) => {
              const checked = checkedSteps.has(i);
              return (
                <TouchableOpacity key={i} style={styles.stepRow} onPress={() => toggleStep(i)} activeOpacity={0.6}>
                  {checked ? (
                    <View style={[styles.stepNum, { backgroundColor: c.primary }]}>
                      <Ionicons name="checkmark" size={16} color="#fff" />
                    </View>
                  ) : (
                    <LinearGradient
                      colors={[c.primary, c.secondary ?? c.primary]}
                      style={styles.stepNum}
                    >
                      <Text style={styles.stepNumText}>{i + 1}</Text>
                    </LinearGradient>
                  )}
                  <Text style={[styles.stepText, { color: checked ? c.textMuted : c.text }, checked && styles.struckThrough]}>{step}</Text>
                </TouchableOpacity>
              );
            })}
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
  headerActions: { flexDirection: 'row', gap: Layout.spacing.md, alignItems: 'center' },
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
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  checklistCount: { fontSize: Layout.fontSize.xs, fontWeight: '800' },
  struckThrough: { textDecorationLine: 'line-through', opacity: 0.5 },
  progressTrackSlim: { height: 4, borderRadius: 2, overflow: 'hidden', marginBottom: 4 },
  progressFillSlim: { height: '100%', borderRadius: 2 },
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
