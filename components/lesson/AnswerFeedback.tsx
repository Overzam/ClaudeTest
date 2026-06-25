import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import * as Haptics from 'expo-haptics';
import { useEffect } from 'react';

interface Props {
  correct: boolean;
  explanation?: string;
  onContinue: () => void;
}

export function AnswerFeedback({ correct, explanation, onContinue }: Props) {
  useEffect(() => {
    if (correct) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }, [correct]);

  return (
    <View style={[styles.container, correct ? styles.correctBg : styles.wrongBg]}>
      <Text style={[styles.emoji]}>{correct ? '✅' : '❌'}</Text>
      <Text style={[styles.label, correct ? styles.correctText : styles.wrongText]}>
        {correct ? 'Correct !' : 'Pas tout à fait…'}
      </Text>
      {explanation && <Text style={styles.explanation}>{explanation}</Text>}
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
  correctBg: { backgroundColor: Colors.primary + '15' },
  wrongBg: { backgroundColor: Colors.danger + '15' },
  emoji: { fontSize: 32 },
  label: { fontSize: Layout.fontSize.lg, fontWeight: '800' },
  correctText: { color: Colors.primary },
  wrongText: { color: Colors.danger },
  explanation: { fontSize: Layout.fontSize.sm, color: Colors.textMuted },
  button: { marginTop: Layout.spacing.sm },
});
