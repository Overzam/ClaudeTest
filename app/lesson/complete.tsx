import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { LessonCompleteCard } from '@/components/gamification/LessonCompleteCard';
import { Button } from '@/components/ui/Button';
import { DuoCuistot } from '@/components/mascot/DuoCuistot';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';

export default function LessonCompleteScreen() {
  const { xpEarned, score, mistakes } = useLocalSearchParams<{
    xpEarned: string;
    score: string;
    mistakes: string;
  }>();
  const { theme } = useThemeStore();
  const c = theme.colors;

  const scoreNum = Number(score);
  const mistakesNum = Number(mistakes);
  const perfect = scoreNum === 100 && mistakesNum === 0;
  const stars = mistakesNum === 0 ? 3 : mistakesNum <= 2 ? 2 : 1;

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={[styles.celebrationBox, { backgroundColor: c.success + '15' }]}>
          <DuoCuistot size={90} animate />
          <Text style={[styles.title, { color: c.text }]}>
            {perfect ? 'Parfait !' : 'Félicitations !'}
          </Text>
          <View style={styles.starsRow}>
            {[1, 2, 3].map((s) => (
              <Text key={s} style={[styles.star, { opacity: s <= stars ? 1 : 0.25 }]}>⭐</Text>
            ))}
          </View>
          {perfect && (
            <Text style={[styles.perfectMsg, { color: c.success }]}>Zéro erreur — tu maîtrises !</Text>
          )}
        </View>

        <LessonCompleteCard
          xpEarned={Number(xpEarned)}
          score={scoreNum}
          mistakesCount={Number(mistakes)}
        />

        <View style={styles.buttons}>
          <Button
            label="Continuer à apprendre"
            onPress={() => router.replace('/(tabs)/explore')}
          />
          <Button
            label="Voir mes recettes"
            onPress={() => router.replace('/recipe-book')}
            variant="secondary"
          />
          <Button
            label="Accueil"
            onPress={() => router.replace('/(tabs)')}
            variant="ghost"
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Layout.spacing.lg, justifyContent: 'center', gap: Layout.spacing.lg },
  celebrationBox: {
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.xl,
    alignItems: 'center',
    gap: Layout.spacing.sm,
  },
  celebrationEmoji: { fontSize: 64 },
  title: { fontSize: Layout.fontSize.xxl, fontWeight: '900', textAlign: 'center' },
  starsRow: { flexDirection: 'row', gap: 4 },
  star: { fontSize: 36 },
  perfectMsg: { fontSize: Layout.fontSize.md, fontWeight: '600' },
  buttons: { gap: Layout.spacing.md },
});
