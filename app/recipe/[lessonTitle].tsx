import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
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

function CookingTimerModal({ visible, onClose, color }: { visible: boolean; onClose: () => void; color: string }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [preset, setPreset] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current!);
            setRunning(false);
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

  const PRESETS = [
    { label: '1 min', value: 60 },
    { label: '5 min', value: 300 },
    { label: '10 min', value: 600 },
    { label: '15 min', value: 900 },
    { label: '30 min', value: 1800 },
  ];

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  function applyPreset(val: number) {
    setRunning(false);
    setSeconds(val);
    setPreset(val);
  }

  function reset() {
    setRunning(false);
    setSeconds(preset ?? 0);
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={timerStyles.backdrop}>
        <View style={timerStyles.sheet}>
          <View style={timerStyles.handle} />
          <View style={timerStyles.timerHeader}>
            <Text style={timerStyles.timerTitle}>{String.fromCharCode(0x23F1)} Minuteur de cuisine</Text>
            <TouchableOpacity onPress={onClose} hitSlop={8}>
              <Ionicons name="close" size={22} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={timerStyles.presets}>
            {PRESETS.map((p) => (
              <TouchableOpacity
                key={p.value}
                style={[timerStyles.presetBtn, preset === p.value && { backgroundColor: color + '25', borderColor: color }]}
                onPress={() => applyPreset(p.value)}
              >
                <Text style={[timerStyles.presetText, preset === p.value && { color }]}>{p.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={[timerStyles.display, { borderColor: seconds === 0 && preset ? '#ef4444' : color }]}>
            <Text style={[timerStyles.displayText, { color: seconds === 0 && preset ? '#ef4444' : color }]}>
              {mm}:{ss}
            </Text>
            {seconds === 0 && preset && (
              <Text style={timerStyles.doneText}>Temps écoulé ! 🔔</Text>
            )}
          </View>

          <View style={timerStyles.controls}>
            <TouchableOpacity style={timerStyles.ctrlBtn} onPress={reset}>
              <Ionicons name="refresh" size={22} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[timerStyles.playBtn, { backgroundColor: color }]}
              onPress={() => setRunning((r) => !r)}
              disabled={seconds === 0}
            >
              <Ionicons name={running ? 'pause' : 'play'} size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={timerStyles.ctrlBtn} onPress={() => { setRunning(false); setSeconds(0); setPreset(null); }}>
              <Ionicons name="stop" size={22} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const timerStyles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, gap: 20 },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: '#ddd', alignSelf: 'center', marginBottom: -8 },
  timerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timerTitle: { fontSize: 17, fontWeight: '800', color: '#1a1a1a' },
  presets: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  presetBtn: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1, borderColor: '#ddd', backgroundColor: '#f5f5f5' },
  presetText: { fontSize: 13, fontWeight: '700', color: '#555' },
  display: { alignItems: 'center', borderWidth: 3, borderRadius: 20, paddingVertical: 20, gap: 6 },
  displayText: { fontSize: 56, fontWeight: '900', letterSpacing: 4 },
  doneText: { fontSize: 14, fontWeight: '700', color: '#ef4444' },
  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 24 },
  ctrlBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center' },
  playBtn: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
});

export default function RecipeDetailScreen() {
  const { lessonTitle } = useLocalSearchParams<{ lessonTitle: string }>();
  const { theme } = useThemeStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const c = theme.colors;

  const title = decodeURIComponent(lessonTitle ?? '');
  const [loading, setLoading] = useState(true);
  const [supabaseRecipe, setSupabaseRecipe] = useState<SupabaseRecipe | null>(null);
  const [timerVisible, setTimerVisible] = useState(false);

  const fav = isFavorite(title);

  useEffect(() => {
    fetchRecipeByTitle(title).then((r) => {
      setSupabaseRecipe(r);
      setLoading(false);
    });
  }, [title]);

  const recipe = RECIPES[title] ?? null;
  const lessonDetail = LESSON_DETAILS[title];
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
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color={c.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]} numberOfLines={1}>{title}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => setTimerVisible(true)} hitSlop={8}>
            <Ionicons name="timer-outline" size={24} color={c.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavorite(title)} hitSlop={8}>
            <Ionicons name={fav ? 'heart' : 'heart-outline'} size={24} color={fav ? '#ef4444' : c.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <CookingTimerModal visible={timerVisible} onClose={() => setTimerVisible(false)} color={c.primary} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
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

        {displayRecipe && (
          <View style={styles.metaRow}>
            <View style={[styles.metaCard, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
              <Text style={styles.metaEmoji}>{String.fromCharCode(0x1F52A)}</Text>
              <Text style={[styles.metaValue, { color: c.text }]}>{displayRecipe.prep_time_min} min</Text>
              <Text style={[styles.metaLabel, { color: c.textMuted }]}>Préparation</Text>
            </View>
            <View style={[styles.metaCard, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
              <Text style={styles.metaEmoji}>{String.fromCharCode(0x1F525)}</Text>
              <Text style={[styles.metaValue, { color: c.text }]}>{displayRecipe.cook_time_min} min</Text>
              <Text style={[styles.metaLabel, { color: c.textMuted }]}>Cuisson</Text>
            </View>
            <TouchableOpacity
              style={[styles.metaCard, { backgroundColor: c.primary + '15', borderColor: c.primary + '30' }]}
              onPress={() => setTimerVisible(true)}
            >
              <Text style={styles.metaEmoji}>{String.fromCharCode(0x23F1)}</Text>
              <Text style={[styles.metaValue, { color: c.primary }]}>{totalTime} min</Text>
              <Text style={[styles.metaLabel, { color: c.primary + 'aa' }]}>Minuteur</Text>
            </TouchableOpacity>
            <View style={[styles.metaCard, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
              <Text style={styles.metaEmoji}>{String.fromCharCode(0x1F37D)}️</Text>
              <Text style={[styles.metaValue, { color: c.text }]}>{displayRecipe.servings}</Text>
              <Text style={[styles.metaLabel, { color: c.textMuted }]}>Portions</Text>
            </View>
          </View>
        )}

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

        {(displayRecipe?.chef_tip || lessonDetail?.chef_tip) && (
          <View style={[styles.section, { backgroundColor: c.primary + '10', borderColor: c.primary + '30' }]}>
            <SectionHeader icon="bulb" label="Conseil du Chef" color={c.primary} />
            <Text style={[styles.sectionText, { color: c.text }]}>{displayRecipe?.chef_tip ?? lessonDetail?.chef_tip}</Text>
          </View>
        )}

        {(displayRecipe?.anecdote || lessonDetail?.anecdote) && (
          <View style={[styles.section, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
            <SectionHeader icon="book-outline" label="Anecdote" color={c.text} />
            <Text style={[styles.sectionText, { color: c.textMuted }]}>{displayRecipe?.anecdote ?? lessonDetail?.anecdote}</Text>
          </View>
        )}

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
              <Text style={styles.comingSoonEmoji}>{String.fromCharCode(0x1F51C)}</Text>
              <Text style={[styles.comingSoonText, { color: c.textMuted }]}>Recette complète bientôt disponible !</Text>
            </View>
          </>
        )}

        {!displayRecipe && !lessonDetail && (
          <View style={[styles.comingSoon, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
            <Text style={styles.comingSoonEmoji}>{String.fromCharCode(0x1F51C)}</Text>
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
