import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';
import * as Haptics from 'expo-haptics';

interface Props {
  correct: boolean;
  correctAnswerText?: string | null;
  explanation?: string;
  onContinue: () => void;
}

export function AnswerFeedback({ correct, correctAnswerText, explanation, onContinue }: Props) {
  const { theme } = useThemeStore();
  const c = theme.colors;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (correct) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }, [correct]);

  return (
    <View
      style={[
        styles.container,
        // The overlay is absolutely positioned at the true screen bottom, so
        // the parent's safe-area padding doesn't apply — pad for the gesture
        // bar here or the Continue button sits under it. Solid surface (not
        // a translucent tint) so nothing shows through from behind.
        {
          backgroundColor: c.surface,
          borderTopWidth: 3,
          borderTopColor: correct ? c.primary : c.danger,
          paddingBottom: Layout.spacing.lg + insets.bottom,
        },
      ]}
    >
      <Text style={styles.emoji}>{correct ? '✅' : '❌'}</Text>
      <Text style={[styles.label, { color: correct ? c.primary : c.danger }]}>
        {correct ? 'Correct !' : 'Pas tout à fait…'}
      </Text>
      {!correct && correctAnswerText && (
        <View style={[styles.correctAnswerBox, { backgroundColor: c.primary + '15', borderColor: c.primary + '40' }]}>
          <Text style={[styles.correctAnswerLabel, { color: c.primary }]}>✓ Bonne réponse :</Text>
          <Text style={[styles.correctAnswerText, { color: c.text }]}>{correctAnswerText}</Text>
        </View>
      )}
      {explanation && (
        <View style={[styles.anecdoteBox, { backgroundColor: c.primary + '10', borderColor: c.primary + '30' }]}>
          <Text style={[styles.anecdoteLabel, { color: c.primary }]}>📖 Le saviez-vous ?</Text>
          <Text style={[styles.explanation, { color: c.textSecondary }]}>{explanation}</Text>
        </View>
      )}
      <Button
        label="Continuer"
        onPress={onContinue}
        variant={correct ? 'primary' : 'danger'}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Layout.spacing.lg,
    gap: Layout.spacing.sm,
    borderTopLeftRadius: Layout.radius.xl,
    borderTopRightRadius: Layout.radius.xl,
  },
  emoji: { fontSize: 32 },
  label: { fontSize: Layout.fontSize.lg, fontWeight: '800' },
  correctAnswerBox: {
    borderRadius: Layout.radius.md,
    borderWidth: 1,
    padding: Layout.spacing.md,
    gap: 4,
  },
  correctAnswerLabel: { fontSize: Layout.fontSize.xs, fontWeight: '800' },
  correctAnswerText: { fontSize: Layout.fontSize.sm, fontWeight: '600' },
  anecdoteBox: { borderRadius: Layout.radius.md, borderWidth: 1, padding: Layout.spacing.md, gap: 4 },
  anecdoteLabel: { fontSize: Layout.fontSize.xs, fontWeight: '800' },
  explanation: { fontSize: Layout.fontSize.sm, lineHeight: 18 },
  button: { marginTop: Layout.spacing.sm },
});
