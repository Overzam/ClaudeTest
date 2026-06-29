import React, { useCallback, useState } from 'react';
import { FlatList, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { useThemeStore } from '@/stores/themeStore';
import { useProgressStore } from '@/stores/progressStore';
import { useAuthStore } from '@/stores/authStore';
import { Layout } from '@/constants/Layout';
import { LESSON_DETAILS } from '@/constants/pathsData';
import { fetchLessons, fetchPaths } from '@/services/pathService';
import type { Lesson, Path } from '@/types/database.types';

interface RecipeEntry {
  lesson: Lesson;
  path: Path;
}

export default function RecipeBookScreen() {
  const { theme } = useThemeStore();
  const { lessonProgress, loadProgress } = useProgressStore();
  const { session } = useAuthStore();
  const c = theme.colors;

  const [recipes, setRecipes] = useState<RecipeEntry[]>([]);
  const [selected, setSelected] = useState<RecipeEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (!session?.user.id) return;
      async function load() {
        await loadProgress(session!.user.id);
        const paths = await fetchPaths();
        const entries: RecipeEntry[] = [];
        for (const path of paths) {
          const lessons = await fetchLessons(path.id);
          for (const lesson of lessons) {
            if (lessonProgress[lesson.id] === 'completed' && (LESSON_DETAILS[lesson.id] ?? LESSON_DETAILS[lesson.title])) {
              entries.push({ lesson, path });
            }
          }
        }
        setRecipes(entries);
        setLoading(false);
      }
      load();
    }, [session?.user.id])
  );

  const detail = selected ? (LESSON_DETAILS[selected.lesson.id] ?? LESSON_DETAILS[selected.lesson.title]) : null;

  return (
    <ScreenWrapper>
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.back, { color: c.primary }]}>← Retour</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: c.text }]}>📖 Carnet de Recettes</Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <Text style={[styles.loadingText, { color: c.textMuted }]}>Chargement…</Text>
        </View>
      ) : recipes.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyEmoji}>📖</Text>
          <Text style={[styles.emptyTitle, { color: c.text }]}>Carnet vide</Text>
          <Text style={[styles.emptyText, { color: c.textMuted }]}>
            Termine des leçons pour débloquer des recettes dans ton carnet !
          </Text>
        </View>
      ) : (
        <>
          <Text style={[styles.countText, { color: c.textMuted, paddingHorizontal: Layout.spacing.lg, paddingTop: Layout.spacing.md }]}>
            {recipes.length} recette{recipes.length > 1 ? 's' : ''} débloquée{recipes.length > 1 ? 's' : ''}
          </Text>
          <FlatList
            data={recipes}
            keyExtractor={(r) => r.lesson.id}
            numColumns={2}
            contentContainerStyle={styles.grid}
            columnWrapperStyle={styles.row}
            renderItem={({ item }) => {
              const d = LESSON_DETAILS[item.lesson.id] ?? LESSON_DETAILS[item.lesson.title];
              return (
                <TouchableOpacity
                  style={[styles.card, { backgroundColor: item.path.color + '15', borderColor: item.path.color + '30' }]}
                  onPress={() => setSelected(item)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.cardEmoji}>{item.path.emoji}</Text>
                  <Text style={[styles.cardTitle, { color: c.text }]} numberOfLines={2}>
                    {item.lesson.title}
                  </Text>
                  {d && (
                    <View style={[styles.diffBadge, { backgroundColor: item.path.color + '30' }]}>
                      <Text style={[styles.diffText, { color: item.path.color }]}>
                        {d.difficulty === 'easy' ? 'Facile' : d.difficulty === 'medium' ? 'Moyen' : 'Expert'}
                      </Text>
                    </View>
                  )}
                  <Text style={[styles.cardPath, { color: c.textMuted }]}>{item.path.title}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </>
      )}

      {/* Recipe detail modal */}
      <Modal visible={!!selected} animationType="slide" presentationStyle="pageSheet">
        {selected && detail && (
          <ScreenWrapper>
            <View style={[styles.modalHeader, { borderBottomColor: c.border }]}>
              <TouchableOpacity onPress={() => setSelected(null)}>
                <Text style={[styles.back, { color: c.primary }]}>✕ Fermer</Text>
              </TouchableOpacity>
              <Text style={[styles.modalTitle, { color: c.text }]} numberOfLines={1}>
                {selected.lesson.title}
              </Text>
            </View>

            <ScrollView contentContainerStyle={styles.modalContent}>
              <View style={[styles.modalHero, { backgroundColor: selected.path.color + '15' }]}>
                <Text style={styles.modalEmoji}>{selected.path.emoji}</Text>
                <Text style={[styles.modalPathLabel, { color: selected.path.color }]}>{selected.path.title}</Text>
              </View>

              {detail.anecdote && (
                <View style={[styles.section, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
                  <Text style={[styles.sectionLabel, { color: c.textMuted }]}>📖 Anecdote</Text>
                  <Text style={[styles.sectionText, { color: c.text }]}>{detail.anecdote}</Text>
                </View>
              )}

              {detail.ingredients.length > 0 && (
                <View style={[styles.section, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
                  <Text style={[styles.sectionLabel, { color: c.textMuted }]}>🧄 Ingrédients</Text>
                  {detail.ingredients.map((ing, i) => (
                    <View key={i} style={styles.ingRow}>
                      <Text style={styles.ingEmoji}>{ing.emoji}</Text>
                      <Text style={[styles.ingName, { color: c.text }]}>{ing.name}</Text>
                      <Text style={[styles.ingQty, { color: c.primary }]}>
                        {ing.quantity}{ing.unit ? ` ${ing.unit}` : ''}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {detail.chef_tip && (
                <View style={[styles.section, { backgroundColor: c.primary + '10', borderColor: c.primary + '30' }]}>
                  <Text style={[styles.sectionLabel, { color: c.primary }]}>👨‍🍳 Conseil du Chef</Text>
                  <Text style={[styles.sectionText, { color: c.text }]}>{detail.chef_tip}</Text>
                </View>
              )}

              {detail.cultural_note && (
                <View style={[styles.section, { backgroundColor: c.secondary + '15', borderColor: c.secondary + '30' }]}>
                  <Text style={[styles.sectionLabel, { color: c.textSecondary }]}>🌍 Note Culturelle</Text>
                  <Text style={[styles.sectionText, { color: c.text }]}>{detail.cultural_note}</Text>
                </View>
              )}
            </ScrollView>
          </ScreenWrapper>
        )}
      </Modal>
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
  title: { fontSize: Layout.fontSize.xl, fontWeight: '900' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Layout.spacing.md, padding: Layout.spacing.xl },
  loadingText: { fontSize: Layout.fontSize.md },
  emptyEmoji: { fontSize: 56 },
  emptyTitle: { fontSize: Layout.fontSize.xl, fontWeight: '800' },
  emptyText: { fontSize: Layout.fontSize.md, textAlign: 'center', lineHeight: 22 },
  countText: { fontSize: Layout.fontSize.sm, paddingBottom: Layout.spacing.sm },
  grid: { padding: Layout.spacing.md, paddingBottom: 40 },
  row: { gap: Layout.spacing.sm, marginBottom: Layout.spacing.sm },
  card: {
    flex: 1,
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.md,
    gap: Layout.spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
  },
  cardEmoji: { fontSize: 36 },
  cardTitle: { fontSize: Layout.fontSize.sm, fontWeight: '700', textAlign: 'center' },
  diffBadge: { paddingHorizontal: Layout.spacing.sm, paddingVertical: 2, borderRadius: 12 },
  diffText: { fontSize: Layout.fontSize.xs, fontWeight: '700' },
  cardPath: { fontSize: Layout.fontSize.xs },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.md,
    padding: Layout.spacing.lg,
    borderBottomWidth: 1,
  },
  modalTitle: { flex: 1, fontSize: Layout.fontSize.lg, fontWeight: '800' },
  modalContent: { padding: Layout.spacing.lg, gap: Layout.spacing.md, paddingBottom: 40 },
  modalHero: {
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.xl,
    alignItems: 'center',
    gap: Layout.spacing.sm,
  },
  modalEmoji: { fontSize: 56 },
  modalPathLabel: { fontSize: Layout.fontSize.md, fontWeight: '700' },
  section: {
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.md,
    gap: Layout.spacing.sm,
    borderWidth: 1,
  },
  sectionLabel: { fontSize: Layout.fontSize.xs, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 },
  sectionText: { fontSize: Layout.fontSize.sm, lineHeight: 20 },
  ingRow: { flexDirection: 'row', alignItems: 'center', gap: Layout.spacing.sm },
  ingEmoji: { fontSize: 20, width: 28 },
  ingName: { flex: 1, fontSize: Layout.fontSize.sm, fontWeight: '600' },
  ingQty: { fontSize: Layout.fontSize.sm, fontWeight: '700' },
});
