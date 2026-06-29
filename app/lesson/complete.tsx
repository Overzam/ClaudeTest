import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';

const { width: W } = Dimensions.get('window');
const CONFETTI = ['🎊', '⭐', '✨', '🎉', '🌟'];

function ConfettiPiece({ delay, x }: { delay: number; x: number }) {
  const y = useRef(new Animated.Value(-30)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(y, { toValue: 600, duration: 2000, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ]).start();
    }, delay);
  }, []);
  return (
    <Animated.Text style={{ position: 'absolute', left: x, transform: [{ translateY: y }], opacity, fontSize: 20 }}>
      {CONFETTI[Math.floor(x) % CONFETTI.length]}
    </Animated.Text>
  );
}
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

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const star1Anim = useRef(new Animated.Value(0)).current;
  const star2Anim = useRef(new Animated.Value(0)).current;
  const star3Anim = useRef(new Animated.Value(0)).current;
  const starAnims = [star1Anim, star2Anim, star3Anim];

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, tension: 80, friction: 6 }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
      Animated.stagger(150, starAnims.slice(0, stars).map((anim, i) => {
        const step = Animated.spring(anim, { toValue: 1, useNativeDriver: true, tension: 100, friction: 5 });
        step.start(() => {
          if (i === 0) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          if (i === 1) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          if (i === 2) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        });
        return step;
      })),
    ]).start(() => {
      if (perfect) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    });
  }, []);

  return (
    <ScreenWrapper>
      {perfect && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          {Array.from({ length: 12 }).map((_, i) => (
            <ConfettiPiece key={i} delay={i * 120} x={(W / 12) * i + Math.random() * 20} />
          ))}
        </View>
      )}
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.celebrationBox,
            { backgroundColor: perfect ? c.success + '20' : c.primary + '15' },
            { transform: [{ scale: scaleAnim }], opacity: fadeAnim },
          ]}
        >
          <DuoCuistot size={90} animate />
          <Text style={[styles.title, { color: c.text }]}>
            {perfect ? '🎉 Parfait !' : stars === 2 ? '👍 Bien joué !' : 'Continue !'}
          </Text>
          <View style={styles.starsRow}>
            {[0, 1, 2].map((i) => (
              <Animated.Text
                key={i}
                style={[
                  styles.star,
                  {
                    opacity: i < stars ? starAnims[i] : 0.2,
                    transform: [{ scale: i < stars ? starAnims[i].interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }) : 1 }],
                  },
                ]}
              >
                ⭐
              </Animated.Text>
            ))}
          </View>
          {perfect && (
            <Text style={[styles.perfectMsg, { color: c.success }]}>Zéro erreur — tu maîtrises !</Text>
          )}
          {!perfect && mistakesNum > 0 && (
            <Text style={[styles.mistakesMsg, { color: c.textMuted }]}>
              {mistakesNum} erreur{mistakesNum > 1 ? 's' : ''} — tu progresses !
            </Text>
          )}
        </Animated.View>

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
  title: { fontSize: Layout.fontSize.xxl, fontWeight: '900', textAlign: 'center' },
  starsRow: { flexDirection: 'row', gap: 8, marginVertical: 4 },
  star: { fontSize: 40 },
  perfectMsg: { fontSize: Layout.fontSize.md, fontWeight: '700', textAlign: 'center' },
  mistakesMsg: { fontSize: Layout.fontSize.sm, textAlign: 'center' },
  buttons: { gap: Layout.spacing.md },
});
