import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { StreakBadge } from '@/components/gamification/StreakBadge';
import { HeartsDisplay } from '@/components/gamification/HeartsDisplay';
import { XPBar } from '@/components/gamification/XPBar';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';
import { useAuthStore } from '@/stores/authStore';
import { useGameStore } from '@/stores/gameStore';
import { useProgressStore } from '@/stores/progressStore';
import { fetchPaths, fetchLessons } from '@/services/pathService';
import { fetchUserStats } from '@/services/statsService';
import type { Path, Lesson } from '@/types/database.types';

export default function HomeScreen() {
  const { user, session } = useAuthStore();
  const gameStore = useGameStore();
  const { loadProgress, lessonProgress } = useProgressStore();
  const [paths, setPaths] = useState<Path[]>([]);
  const [lessonsMap, setLessonsMap] = useState<Record<string, Lesson[]>>({});
  const [loading, setLoading] = useState(true);
  const { theme } = useThemeStore();
  const c = theme.colors;

  useFocusEffect(
    useCallback(() => {
      if (!session?.user.id) return;
      async function load() {
        setLoading(true);
        const [stats, pathList] = await Promise.all([
          fetchUserStats(session!.user.id),
          fetchPaths(),
        ]);
        if (stats) gameStore.setStats(stats, session!.user.id);
        await loadProgress(session!.user.id);
        const map: Record<string, Lesson[]> = {};
        await Promise.all(pathList.map(async (p) => { map[p.id] = await fetchLessons(p.id); }));
        setPaths(pathList);
        setLessonsMap(map);
        setLoading(false);
      }
      load();
    }, [session?.user.id])
  );

  if (loading) return <LoadingScreen />;

  const inProgressPaths = paths.filter((p) => {
    const lessons = lessonsMap[p.id] ?? [];
    const done = lessons.filter((l) => lessonProgress[l.id] === 'completed').length;
    return done > 0 && done < lessons.length;
  });

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: c.text }]}>
              Bonjour {user?.username ?? ''} 👋
            </Text>
            <Text style={[styles.subGreeting, { color: c.textMuted }]}>Prêt à cuisiner ?</Text>
          </View>
          <View style={styles.headerRight}>
            <StreakBadge streakDays={gameStore.streakDays} />
            <HeartsDisplay hearts={gameStore.hearts} />
          </View>
        </View>

        <XPBar xp={gameStore.xp} level={gameStore.level} style={styles.xpBar} />

        {/* In-progress paths */}
        {inProgressPaths.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { color: c.text }]}>En cours</Text>
            {inProgressPaths.map((path) => {
              const lessons = lessonsMap[path.id] ?? [];
              const completed = lessons.filter((l) => lessonProgress[l.id] === 'completed').length;
              const progress = lessons.length > 0 ? completed / lessons.length : 0;
              return (
                <TouchableOpacity
                  key={path.id}
                  style={[styles.inProgressCard, { backgroundColor: path.color + '15', borderColor: path.color + '30' }]}
                  onPress={() => router.push({ pathname: '/(tabs)/explore', params: { pathId: path.id } })}
                  activeOpacity={0.85}
                >
                  <Text style={styles.inProgressEmoji}>{path.emoji}</Text>
                  <View style={styles.inProgressInfo}>
                    <Text style={[styles.inProgressTitle, { color: c.text }]}>{path.title}</Text>
                    <View style={[styles.progressTrack, { backgroundColor: path.color + '30' }]}>
                      <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: path.color }]} />
                    </View>
                    <Text style={[styles.inProgressCount, { color: path.color }]}>
                      {completed}/{lessons.length} leçons
                    </Text>
                  </View>
                  <Text style={[styles.continueBtn, { color: path.color }]}>▶</Text>
                </TouchableOpacity>
              );
            })}
          </>
        )}

        {/* All paths */}
        <Text style={[styles.sectionTitle, { color: c.text }]}>Tous les parcours</Text>
        <View style={styles.pathGrid}>
          {paths.map((path) => {
            const lessons = lessonsMap[path.id] ?? [];
            const completed = lessons.filter((l) => lessonProgress[l.id] === 'completed').length;
            const isDone = lessons.length > 0 && completed === lessons.length;
            return (
              <TouchableOpacity
                key={path.id}
                style={[styles.pathTile, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}
                onPress={() => router.push({ pathname: '/(tabs)/explore', params: { pathId: path.id } })}
                activeOpacity={0.85}
              >
                <View style={[styles.pathTileEmoji, { backgroundColor: path.color + '20' }]}>
                  <Text style={styles.pathEmojiText}>{path.emoji}</Text>
                  {isDone && <Text style={styles.doneBadge}>✓</Text>}
                </View>
                <Text style={[styles.pathTileTitle, { color: c.text }]} numberOfLines={2}>
                  {path.title}
                </Text>
                <Text style={[styles.pathTileCount, { color: c.textMuted }]}>
                  {completed}/{lessons.length}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: { padding: Layout.spacing.lg, gap: Layout.spacing.md, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  greeting: { fontSize: Layout.fontSize.xl, fontWeight: '800' },
  subGreeting: { fontSize: Layout.fontSize.sm },
  headerRight: { alignItems: 'flex-end', gap: Layout.spacing.xs },
  xpBar: { marginVertical: Layout.spacing.sm },
  sectionTitle: { fontSize: Layout.fontSize.lg, fontWeight: '700', marginTop: Layout.spacing.sm },
  inProgressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.md,
    gap: Layout.spacing.md,
    borderWidth: 1,
  },
  inProgressEmoji: { fontSize: 36 },
  inProgressInfo: { flex: 1, gap: 6 },
  inProgressTitle: { fontSize: Layout.fontSize.md, fontWeight: '700' },
  progressTrack: { height: 6, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  inProgressCount: { fontSize: Layout.fontSize.xs, fontWeight: '600' },
  continueBtn: { fontSize: 22, fontWeight: '700' },
  pathGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Layout.spacing.md },
  pathTile: {
    width: '47%',
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.md,
    alignItems: 'center',
    gap: Layout.spacing.sm,
    borderWidth: 1,
  },
  pathTileEmoji: {
    width: 56,
    height: 56,
    borderRadius: Layout.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  pathEmojiText: { fontSize: 28 },
  doneBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#58CC02',
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
    width: 18,
    height: 18,
    borderRadius: 9,
    textAlign: 'center',
    lineHeight: 18,
  },
  pathTileTitle: { fontSize: Layout.fontSize.sm, fontWeight: '700', textAlign: 'center' },
  pathTileCount: { fontSize: Layout.fontSize.xs },
});
