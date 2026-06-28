import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

  useEffect(() => {
    if (correct) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }, [correct]);

  return (
    <View style={[styles.container, { backgroundColor: correct ? c.primary + '18' : c.danger + '18' }]}>
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
      {explanation && <Text style={[styles.explanation, { color: c.textMuted }]}>{explanation}</Text>}
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
  explanation: { fontSize: Layout.fontSize.sm },
  button: { marginTop: Layout.spacing.sm },
});
