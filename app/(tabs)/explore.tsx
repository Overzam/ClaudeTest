import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { PathCard } from '@/components/path/PathCard';
import { LessonNode } from '@/components/path/LessonNode';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useAuthStore } from '@/stores/authStore';
import { useProgressStore } from '@/stores/progressStore';
import { fetchPaths, fetchLessons } from '@/services/pathService';
import type { Path, Lesson } from '@/types/database.types';

export default function ExploreScreen() {
  const { session } = useAuthStore();
  const { lessonProgress, loadProgress } = useProgressStore();
  const [paths, setPaths] = useState<Path[]>([]);
  const [lessonsMap, setLessonsMap] = useState<Record<string, Lesson[]>>({});
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { pathId } = useLocalSearchParams<{ pathId?: string }>();

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

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Explorer</Text>

        {!selectedPath && (
          <>
            <Text style={styles.subtitle}>Choisis un parcours</Text>
            {paths.map((path) => {
              const lessons = lessonsMap[path.id] ?? [];
              const completed = lessons.filter((l) => lessonProgress[l.id] === 'completed').length;
              return (
                <PathCard
                  key={path.id}
                  path={path}
                  completedLessons={completed}
                  totalLessons={lessons.length}
                  onPress={() => setSelectedPath(path.id)}
                />
              );
            })}
          </>
        )}

        {selectedPath && activePath && (
          <>
            <Text style={styles.pathTitle}>
              {activePath.emoji} {activePath.title}
            </Text>
            <Text style={styles.backBtn} onPress={() => setSelectedPath(null)}>← Tous les parcours</Text>
            <View style={styles.nodes}>
              {(lessonsMap[selectedPath] ?? []).map((lesson) => {
                const status = lessonProgress[lesson.id] ?? 'locked';
                return (
                  <LessonNode
                    key={lesson.id}
                    lesson={lesson}
                    status={status}
                    pathColor={activePath.color}
                    onPress={() => router.push({ pathname: '/lesson/[lessonId]', params: { lessonId: lesson.id } })}
                  />
                );
              })}
            </View>
          </>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: { padding: Layout.spacing.lg, gap: Layout.spacing.md },
  title: { fontSize: Layout.fontSize.xxl, fontWeight: '900', color: Colors.text },
  subtitle: { fontSize: Layout.fontSize.md, color: Colors.textMuted },
  pathTitle: { fontSize: Layout.fontSize.xl, fontWeight: '800', color: Colors.text },
  backBtn: { fontSize: Layout.fontSize.sm, color: Colors.primary, fontWeight: '600' },
  nodes: { flexDirection: 'row', flexWrap: 'wrap', gap: Layout.spacing.lg, paddingTop: Layout.spacing.md },
});
