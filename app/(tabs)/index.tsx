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
import { DuoCuistot } from '@/components/mascot/DuoCuistot';
import type { Path, Lesson } from '@/types/database.types';

const QUICK_TIPS = [
  "Un couteau aiguisé est plus sûr qu'un couteau émoussé — il glisse moins.",
  "Tempérez la viande 30 min avant cuisson pour une cuisson uniforme.",
  "L'eau des pâtes doit être salée comme la mer : 10g de sel par litre.",
  "Laissez toujours reposer la viande après cuisson pour garder les jus.",
  "Le beurre froid monte les sauces — ajoutez-le hors du feu en fouettant.",
  "La moutarde émulsionne : c'est le secret d'une vinaigrette qui tient.",
  "Faites « bloomer » vos épices 30s à sec pour doubler leur intensité.",
  "Un trait de citron en fin de cuisson réveille toutes les saveurs du plat.",
  "Les herbes fraîches se mettent en fin de cuisson, les séchées en début.",
  "Réservez l'eau de cuisson des pâtes — l'amidon lie la sauce naturellement.",
  "L'umami se cache dans le parmesan, les champignons et la sauce soja.",
  "Congèle les herbes fraîches dans de l'huile d'olive en glaçons.",
  "Tamisez toujours le matcha avant d'infuser pour éviter les grumeaux.",
  "Pour un falafel croustillant, utilisez des pois chiches crus, pas en boîte.",
];

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
        try {
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
        } finally {
          setLoading(false);
        }
      }
      load();
    }, [session?.user.id])
  );

  if (loading) return <LoadingScreen />;

  // Find the next available (unlocked but not completed) lesson across all paths
  let nextLesson: { lesson: Lesson; path: Path } | null = null;
  outer: for (const path of paths) {
    for (const lesson of lessonsMap[path.id] ?? []) {
      if (lessonProgress[lesson.id] === 'available') {
        nextLesson = { lesson, path };
        break outer;
      }
    }
  }

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
          <View style={styles.headerLeft}>
            <DuoCuistot size={64} />
            <View>
              <Text style={[styles.greeting, { color: c.text }]}>
                Bonjour {user?.username ?? ''} 👋
              </Text>
              <Text style={[styles.subGreeting, { color: c.textMuted }]}>Prêt à cuisiner ?</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <StreakBadge streakDays={gameStore.streakDays} />
            <HeartsDisplay hearts={gameStore.hearts} />
          </View>
        </View>

        <XPBar xp={gameStore.xp} level={gameStore.level} style={styles.xpBar} />

        {/* Next lesson shortcut */}
        {nextLesson && (
          <TouchableOpacity
            style={[styles.nextLessonCard, { backgroundColor: nextLesson.path.color + '15', borderColor: nextLesson.path.color + '40' }]}
            onPress={() => router.push({ pathname: '/lesson/[lessonId]', params: { lessonId: nextLesson!.lesson.id, lessonTitle: nextLesson!.lesson.title } })}
            activeOpacity={0.85}
          >
            <Text style={styles.nextLessonEmoji}>{nextLesson.path.emoji}</Text>
            <View style={styles.challengeInfo}>
              <Text style={[styles.challengeLabel, { color: nextLesson.path.color }]}>PROCHAINE LEÇON</Text>
              <Text style={[styles.challengeTitle, { color: c.text }]} numberOfLines={1}>{nextLesson.lesson.title}</Text>
            </View>
            <View style={[styles.nextLessonXP, { backgroundColor: nextLesson.path.color }]}>
              <Text style={styles.nextLessonXPText}>+{nextLesson.lesson.xp_reward} XP</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Daily challenge banner */}
        <TouchableOpacity
          style={[styles.challengeBanner, { backgroundColor: c.secondary + '20', borderColor: c.secondary + '40' }]}
          onPress={() => router.push('/daily-challenge')}
          activeOpacity={0.85}
        >
          <Text style={styles.challengeEmoji}>🔥</Text>
          <View style={styles.challengeInfo}>
            <Text style={[styles.challengeLabel, { color: c.streakOrange }]}>DÉFI DU JOUR</Text>
            <Text style={[styles.challengeTitle, { color: c.text }]}>Relève le défi quotidien !</Text>
          </View>
          <Text style={[styles.challengeArrow, { color: c.streakOrange }]}>→</Text>
        </TouchableOpacity>

        {/* Quick tip banner */}
        <TouchableOpacity
          style={[styles.tipBanner, { backgroundColor: c.xpBlue + '12', borderColor: c.xpBlue + '30' }]}
          onPress={() => router.push('/tips' as any)}
          activeOpacity={0.85}
        >
          <Text style={styles.tipBannerEmoji}>💡</Text>
          <View style={styles.challengeInfo}>
            <Text style={[styles.challengeLabel, { color: c.xpBlue }]}>ASTUCE DU CHEF</Text>
            <Text style={[styles.challengeTitle, { color: c.text }]}>{QUICK_TIPS[Math.floor(Date.now() / 86400000) % QUICK_TIPS.length]}</Text>
          </View>
        </TouchableOpacity>

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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Layout.spacing.sm },
  greeting: { fontSize: Layout.fontSize.lg, fontWeight: '800' },
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
  challengeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.md,
    gap: Layout.spacing.md,
    borderWidth: 1,
  },
  challengeEmoji: { fontSize: 36 },
  challengeInfo: { flex: 1 },
  challengeLabel: { fontSize: Layout.fontSize.xs, fontWeight: '800', letterSpacing: 1 },
  challengeTitle: { fontSize: Layout.fontSize.md, fontWeight: '700' },
  challengeArrow: { fontSize: 22, fontWeight: '700' },
  tipBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.md,
    gap: Layout.spacing.md,
    borderWidth: 1,
  },
  tipBannerEmoji: { fontSize: 28 },
  nextLessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.md,
    gap: Layout.spacing.md,
    borderWidth: 1.5,
  },
  nextLessonEmoji: { fontSize: 32 },
  nextLessonXP: {
    borderRadius: Layout.radius.full,
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 4,
  },
  nextLessonXPText: { color: '#fff', fontWeight: '800', fontSize: Layout.fontSize.xs },
});
