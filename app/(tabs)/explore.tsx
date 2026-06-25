import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';
import { useAuthStore } from '@/stores/authStore';
import { useProgressStore } from '@/stores/progressStore';
import { fetchPaths, fetchLessons } from '@/services/pathService';
import { LESSON_DETAILS } from '@/constants/pathsData';
import type { Path, Lesson } from '@/types/database.types';

export default function ExploreScreen() {
  const { session } = useAuthStore();
  const { lessonProgress, loadProgress } = useProgressStore();
  const [paths, setPaths] = useState<Path[]>([]);
  const [lessonsMap, setLessonsMap] = useState<Record<string, Lesson[]>>({});
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { pathId } = useLocalSearchParams<{ pathId?: string }>();
  const { theme } = useThemeStore();
  const c = theme.colors;

  useFocusEffect(
    useCallback(() => {
      if (!session?.user.id) return;
      async function load() {
        setLoading(true);
        const pathList = await fetchPaths();
        await loadProgress(session!.user.id);
        const map: Record<string, Lesson[]> = {};
        await Promise.all(pathList.map(async (p) => { map[p.id] = await fetchLessons(p.id); }));
        setPaths(pathList);
        setLessonsMap(map);
        if (pathId) setSelectedPath(pathId);
        setLoading(false);
      }
      load();
    }, [session?.user.id])
  );

  if (loading) return <LoadingScreen />;

  const activePath = paths.find((p) => p.id === selectedPath);

  if (selectedPath && activePath) {
    const lessons = lessonsMap[selectedPath] ?? [];
    const completed = lessons.filter((l) => lessonProgress[l.id] === 'completed').length;
    const progress = lessons.length > 0 ? completed / lessons.length : 0;

    return (
      <ScreenWrapper>
        {/* Path header */}
        <View style={[styles.pathHeader, { backgroundColor: activePath.color + '18' }]}>
          <TouchableOpacity onPress={() => setSelectedPath(null)} style={styles.backBtn}>
            <Text style={[styles.backText, { color: c.primary }]}>← Parcours</Text>
          </TouchableOpacity>
          <View style={styles.pathMeta}>
            <Text style={styles.pathEmoji}>{activePath.emoji}</Text>
            <View style={styles.pathInfo}>
              <Text style={[styles.pathTitle, { color: c.text }]}>{activePath.title}</Text>
              <Text style={[styles.pathStats, { color: c.textSecondary }]}>
                {completed}/{lessons.length} leçons terminées
              </Text>
              <View style={[styles.progressTrack, { backgroundColor: c.border }]}>
                <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: activePath.color }]} />
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.detailBtn, { borderColor: activePath.color, backgroundColor: activePath.color + '10' }]}
            onPress={() => router.push({ pathname: '/path/[slug]', params: { slug: activePath.slug } })}
          >
            <Text style={[styles.detailBtnText, { color: activePath.color }]}>À propos de ce parcours →</Text>
          </TouchableOpacity>
        </View>

        {/* Lessons */}
        <ScrollView contentContainerStyle={styles.lessonList}>
          {lessons.map((lesson, idx) => {
            const status = lessonProgress[lesson.id] ?? 'locked';
            const isLocked = status === 'locked';
            const isDone = status === 'completed';
            const hasIngredients = !!LESSON_DETAILS[lesson.id];

            return (
              <View key={lesson.id} style={styles.lessonRow}>
                {/* Connector line */}
                {idx > 0 && (
                  <View style={[styles.connector, { backgroundColor: isDone ? activePath.color : c.border }]} />
                )}

                <View style={styles.lessonRowContent}>
                  {/* Node button */}
                  <TouchableOpacity
                    style={[
                      styles.lessonNode,
                      isDone && { backgroundColor: activePath.color },
                      !isDone && !isLocked && { borderColor: activePath.color, borderWidth: 3, backgroundColor: c.surface },
                      isLocked && { backgroundColor: c.locked },
                    ]}
                    onPress={() =>
                      !isLocked && router.push({ pathname: '/lesson/[lessonId]', params: { lessonId: lesson.id, lessonTitle: lesson.title } })
                    }
                    disabled={isLocked}
                    activeOpacity={0.85}
                  >
                    <Text style={[styles.nodeIcon, isLocked && { color: c.textMuted }]}>
                      {isDone ? '✓' : isLocked ? '🔒' : '▶'}
                    </Text>
                  </TouchableOpacity>

                  {/* Lesson info */}
                  <View style={styles.lessonMeta}>
                    <Text style={[styles.lessonTitle, { color: isLocked ? c.textMuted : c.text }]} numberOfLines={1}>
                      {lesson.title}
                    </Text>
                    <View style={styles.lessonTags}>
                      <View style={[styles.xpTag, { backgroundColor: c.xpBlue + '20' }]}>
                        <Text style={[styles.xpTagText, { color: c.xpBlue }]}>+{lesson.xp_reward} XP</Text>
                      </View>
                      {hasIngredients && !isLocked && (
                        <TouchableOpacity
                          style={[styles.ingTag, { backgroundColor: activePath.color + '15', borderColor: activePath.color + '30' }]}
                          onPress={() =>
                            router.push({
                              pathname: '/lesson/ingredients',
                              params: { lessonId: lesson.id, lessonTitle: lesson.title },
                            })
                          }
                        >
                          <Text style={[styles.ingTagText, { color: activePath.color }]}>🧄 Ingrédients</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.screenTitle, { color: c.text }]}>Explorer</Text>
        <Text style={[styles.screenSubtitle, { color: c.textMuted }]}>Choisis un parcours culinaire</Text>

        {paths.map((path) => {
          const lessons = lessonsMap[path.id] ?? [];
          const completed = lessons.filter((l) => lessonProgress[l.id] === 'completed').length;
          const progress = lessons.length > 0 ? completed / lessons.length : 0;

          return (
            <TouchableOpacity
              key={path.id}
              style={[styles.pathCard, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}
              onPress={() => setSelectedPath(path.id)}
              activeOpacity={0.85}
            >
              <View style={[styles.pathCardEmoji, { backgroundColor: path.color + '20' }]}>
                <Text style={styles.pathCardEmojiText}>{path.emoji}</Text>
              </View>
              <View style={styles.pathCardContent}>
                <Text style={[styles.pathCardTitle, { color: c.text }]}>{path.title}</Text>
                {path.description && (
                  <Text style={[styles.pathCardDesc, { color: c.textMuted }]} numberOfLines={1}>
                    {path.description}
                  </Text>
                )}
                <View style={[styles.progressTrack, { backgroundColor: c.border, marginTop: 6 }]}>
                  <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: path.color }]} />
                </View>
                <Text style={[styles.pathCardCount, { color: c.textMuted }]}>
                  {completed}/{lessons.length} leçons
                </Text>
              </View>
              {completed === lessons.length && lessons.length > 0 && (
                <Text style={styles.completedBadge}>🏆</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: { padding: Layout.spacing.lg, gap: Layout.spacing.md, paddingBottom: 40 },
  screenTitle: { fontSize: Layout.fontSize.xxl, fontWeight: '900' },
  screenSubtitle: { fontSize: Layout.fontSize.md },
  pathCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.md,
    gap: Layout.spacing.md,
    borderWidth: 1,
  },
  pathCardEmoji: {
    width: 56,
    height: 56,
    borderRadius: Layout.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pathCardEmojiText: { fontSize: 28 },
  pathCardContent: { flex: 1 },
  pathCardTitle: { fontSize: Layout.fontSize.md, fontWeight: '700' },
  pathCardDesc: { fontSize: Layout.fontSize.sm },
  pathCardCount: { fontSize: Layout.fontSize.xs, marginTop: 2 },
  completedBadge: { fontSize: 24 },
  progressTrack: { height: 6, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },

  // Path detail header
  pathHeader: { padding: Layout.spacing.lg, gap: Layout.spacing.md },
  backBtn: {},
  backText: { fontSize: Layout.fontSize.md, fontWeight: '600' },
  pathMeta: { flexDirection: 'row', alignItems: 'center', gap: Layout.spacing.md },
  pathEmoji: { fontSize: 48 },
  pathInfo: { flex: 1, gap: 4 },
  pathTitle: { fontSize: Layout.fontSize.xl, fontWeight: '900' },
  pathStats: { fontSize: Layout.fontSize.sm },
  detailBtn: {
    borderRadius: Layout.radius.md,
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  detailBtnText: { fontSize: Layout.fontSize.sm, fontWeight: '600' },

  // Lesson list
  lessonList: { padding: Layout.spacing.lg, gap: 0, paddingBottom: 40 },
  lessonRow: { alignItems: 'center' },
  connector: { width: 3, height: 24, marginLeft: 36 },
  lessonRowContent: { flexDirection: 'row', alignItems: 'center', gap: Layout.spacing.md, width: '100%' },
  lessonNode: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  nodeIcon: { fontSize: 24, color: '#fff', fontWeight: '700' },
  lessonMeta: { flex: 1, gap: 6 },
  lessonTitle: { fontSize: Layout.fontSize.md, fontWeight: '700' },
  lessonTags: { flexDirection: 'row', gap: Layout.spacing.sm },
  xpTag: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 3 },
  xpTagText: { fontSize: Layout.fontSize.xs, fontWeight: '700' },
  ingTag: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
  },
  ingTagText: { fontSize: Layout.fontSize.xs, fontWeight: '600' },
});
