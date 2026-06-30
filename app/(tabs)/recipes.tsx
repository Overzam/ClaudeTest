import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { useThemeStore } from '@/stores/themeStore';
import { useProgressStore } from '@/stores/progressStore';
import { useAuthStore } from '@/stores/authStore';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { Layout } from '@/constants/Layout';
import { LESSON_DETAILS } from '@/constants/pathsData';
import { fetchLessons, fetchPaths } from '@/services/pathService';
import type { Lesson, Path } from '@/types/database.types';

interface RecipeEntry {
  lesson: Lesson;
  path: Path;
}

export default function RecipesTabScreen() {
  const { theme } = useThemeStore();
  const { lessonProgress, loadProgress } = useProgressStore();
  const { session } = useAuthStore();
  const { favorites, toggleFavorite, isFavorite } = useFavoritesStore();
  const c = theme.colors;

  const [recipes, setRecipes] = useState<RecipeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (!session?.user.id) return;
      async function load() {
        await loadProgress(session!.user.id);
        const freshProgress = useProgressStore.getState().lessonProgress;
        const paths = await fetchPaths();
        const entries: RecipeEntry[] = [];
        for (const path of paths) {
          const lessons = await fetchLessons(path.id);
          for (const lesson of lessons) {
            if (freshProgress[lesson.id] === 'completed' && (LESSON_DETAILS[lesson.id] ?? LESSON_DETAILS[lesson.title])) {
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

  const filtered = useMemo(() => {
    let list = recipes;
    if (showFavoritesOnly) list = list.filter((r) => isFavorite(r.lesson.title));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) => r.lesson.title.toLowerCase().includes(q) || r.path.title.toLowerCase().includes(q)
      );
    }
    return list;
  }, [recipes, search, showFavoritesOnly, favorites]);

  return (
    <ScreenWrapper>
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <Ionicons name="book" size={22} color={c.primary} />
        <Text style={[styles.title, { color: c.text }]}>Carnet de Recettes</Text>
      </View>

      {/* Search bar */}
      {!loading && recipes.length > 0 && (
        <View style={[styles.searchRow, { borderBottomColor: c.border }]}>
          <View style={[styles.searchBox, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
            <Ionicons name="search" size={16} color={c.textMuted} />
            <TextInput
              style={[styles.searchInput, { color: c.text }]}
              placeholder="Rechercher une recette…"
              placeholderTextColor={c.textMuted}
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')} hitSlop={8}>
                <Ionicons name="close-circle" size={16} color={c.textMuted} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={[styles.favFilter, { backgroundColor: showFavoritesOnly ? c.primary : c.surfaceElevated, borderColor: showFavoritesOnly ? c.primary : c.border }]}
            onPress={() => setShowFavoritesOnly((v) => !v)}
          >
            <Ionicons name={showFavoritesOnly ? 'heart' : 'heart-outline'} size={18} color={showFavoritesOnly ? '#fff' : c.textMuted} />
          </TouchableOpacity>
        </View>
      )}

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
          <TouchableOpacity
            style={[styles.cta, { backgroundColor: c.primary }]}
            onPress={() => router.push('/(tabs)/explore' as any)}
          >
            <Text style={styles.ctaText}>Explorer les parcours</Text>
          </TouchableOpacity>
        </View>
      ) : filtered.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyEmoji}>{showFavoritesOnly ? '💔' : '🔍'}</Text>
          <Text style={[styles.emptyTitle, { color: c.text }]}>
            {showFavoritesOnly ? 'Aucun favori' : 'Aucun résultat'}
          </Text>
          <Text style={[styles.emptyText, { color: c.textMuted }]}>
            {showFavoritesOnly
              ? 'Appuie sur ❤️ sur une recette pour l\'ajouter à tes favoris.'
              : 'Essaie un autre mot-clé.'}
          </Text>
        </View>
      ) : (
        <>
          <Text style={[styles.countText, { color: c.textMuted, paddingHorizontal: Layout.spacing.lg, paddingTop: Layout.spacing.md }]}>
            {filtered.length} recette{filtered.length > 1 ? 's' : ''}
            {showFavoritesOnly ? ' favorite' : filtered.length < recipes.length ? ' trouvée' : ' débloquée'}{filtered.length > 1 ? 's' : ''}
          </Text>
          <FlatList
            data={filtered}
            keyExtractor={(r) => r.lesson.id}
            numColumns={2}
            contentContainerStyle={styles.grid}
            columnWrapperStyle={styles.row}
            renderItem={({ item }) => {
              const d = LESSON_DETAILS[item.lesson.id] ?? LESSON_DETAILS[item.lesson.title];
              const fav = isFavorite(item.lesson.title);
              return (
                <TouchableOpacity
                  style={[styles.card, { backgroundColor: item.path.color + '15', borderColor: item.path.color + '30' }]}
                  onPress={() => router.push(`/recipe/${encodeURIComponent(item.lesson.title)}` as any)}
                  activeOpacity={0.8}
                >
                  <TouchableOpacity
                    style={styles.heartBtn}
                    onPress={() => toggleFavorite(item.lesson.title)}
                    hitSlop={8}
                  >
                    <Ionicons
                      name={fav ? 'heart' : 'heart-outline'}
                      size={18}
                      color={fav ? '#ef4444' : c.textMuted}
                    />
                  </TouchableOpacity>
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
  title: { fontSize: Layout.fontSize.xl, fontWeight: '900' },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.sm,
    borderBottomWidth: 1,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
    borderRadius: Layout.radius.full,
    borderWidth: 1,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
  },
  searchInput: { flex: 1, fontSize: Layout.fontSize.sm },
  favFilter: {
    width: 40,
    height: 40,
    borderRadius: Layout.radius.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Layout.spacing.md, padding: Layout.spacing.xl },
  loadingText: { fontSize: Layout.fontSize.md },
  emptyEmoji: { fontSize: 56 },
  emptyTitle: { fontSize: Layout.fontSize.xl, fontWeight: '800' },
  emptyText: { fontSize: Layout.fontSize.md, textAlign: 'center', lineHeight: 22 },
  cta: { paddingHorizontal: Layout.spacing.xl, paddingVertical: Layout.spacing.md, borderRadius: Layout.radius.full, marginTop: Layout.spacing.sm },
  ctaText: { color: '#fff', fontWeight: '700', fontSize: Layout.fontSize.md },
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
  heartBtn: { alignSelf: 'flex-end', marginBottom: -8 },
  cardEmoji: { fontSize: 36 },
  cardTitle: { fontSize: Layout.fontSize.sm, fontWeight: '700', textAlign: 'center' },
  diffBadge: { paddingHorizontal: Layout.spacing.sm, paddingVertical: 2, borderRadius: 12 },
  diffText: { fontSize: Layout.fontSize.xs, fontWeight: '700' },
  cardPath: { fontSize: Layout.fontSize.xs },
});
