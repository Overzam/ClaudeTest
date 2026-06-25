import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { LessonCompleteCard } from '@/components/gamification/LessonCompleteCard';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

export default function LessonCompleteScreen() {
  const { xpEarned, score, mistakes } = useLocalSearchParams<{
    xpEarned: string;
    score: string;
    mistakes: string;
  }>();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Félicitations ! 🎉</Text>
        <LessonCompleteCard
          xpEarned={Number(xpEarned)}
          score={Number(score)}
          mistakesCount={Number(mistakes)}
        />
        <View style={styles.buttons}>
          <Button
            label="Continuer à apprendre"
            onPress={() => router.replace('/(tabs)/explore')}
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
  container: { flex: 1, padding: Layout.spacing.lg, justifyContent: 'center', gap: Layout.spacing.xl },
  title: { fontSize: Layout.fontSize.xxl, fontWeight: '900', color: Colors.text, textAlign: 'center' },
  buttons: { gap: Layout.spacing.md },
});
