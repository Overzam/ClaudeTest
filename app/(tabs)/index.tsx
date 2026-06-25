import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { StreakBadge } from '@/components/gamification/StreakBadge';
import { HeartsDisplay } from '@/components/gamification/HeartsDisplay';
import { XPBar } from '@/components/gamification/XPBar';
import { PathCard } from '@/components/path/PathCard';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useAuthStore } from '@/stores/authStore';
import { useGameStore } from '@/stores/gameStore';
import { useProgressStore } from '@/stores/progressStore';
import { fetchPaths, fetchLessons } from '@/services/pathService';
import { fetchUserStats } from '@/services/statsService';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import type { Path, Lesson } from '@/types/database.types';

export default function HomeScreen() {
  const { user, session } = useAuthStore();
  const gameStore = useGameStore();
  const { loadProgress, lessonProgress } = useProgressStore();
  const [paths, setPaths] = useState<Path[]>([]);
  const [lessonsMap, setLessonsMap] = useState<Record<string, Lesson[]>>({});
  const [loading, setLoading] = useState(true);

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
        await Promise.all(
          pathList.map(async (p) => {
            map[p.id] = await fetchLessons(p.id);
          })
        );
        setPaths(pathList);
        setLessonsMap(map);
        setLoading(false);
      }
      load();
    }, [session?.user.id])
  );

  if (loading) return <LoadingScreen />;

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bonjour {user?.username ?? ''} 👋</Text>
            <Text style={styles.subGreeting}>Prêt à cuisiner ?</Text>
          </View>
          <View style={styles.headerRight}>
            <StreakBadge streakDays={gameStore.streakDays} />
            <HeartsDisplay hearts={gameStore.hearts} />
          </View>
        </View>

        <XPBar xp={gameStore.xp} level={gameStore.level} style={styles.xpBar} />

        <Text style={styles.sectionTitle}>Tes parcours</Text>
        {paths.map((path) => {
          const lessons = lessonsMap[path.id] ?? [];
          const completed = lessons.filter((l) => lessonProgress[l.id] === 'completed').length;
          return (
            <PathCard
              key={path.id}
              path={path}
              completedLessons={completed}
              totalLessons={lessons.length}
              onPress={() => router.push({ pathname: '/explore', params: { pathId: path.id } })}
            />
          );
        })}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: { padding: Layout.spacing.lg, gap: Layout.spacing.md },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  greeting: { fontSize: Layout.fontSize.xl, fontWeight: '800', color: Colors.text },
  subGreeting: { fontSize: Layout.fontSize.sm, color: Colors.textMuted },
  headerRight: { alignItems: 'flex-end', gap: Layout.spacing.xs },
  xpBar: { marginVertical: Layout.spacing.sm },
  sectionTitle: { fontSize: Layout.fontSize.lg, fontWeight: '700', color: Colors.text, marginTop: Layout.spacing.sm },
});
