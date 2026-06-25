import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import type { MultipleChoiceData } from '@/types/lesson.types';

interface Props {
  question: string;
  data: MultipleChoiceData;
  onSubmit: (correct: boolean) => void;
}

export function MultipleChoice({ question, data, onSubmit }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  function handleVerify() {
    if (selected === null) return;
    onSubmit(selected === data.correctIndex);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.options}>
        {data.options.map((option, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.option, selected === i && styles.optionSelected]}
            onPress={() => setSelected(i)}
            activeOpacity={0.8}
          >
            <Text style={[styles.optionText, selected === i && styles.optionTextSelected]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button
        label="Vérifier"
        onPress={handleVerify}
        disabled={selected === null}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Layout.spacing.lg, gap: Layout.spacing.lg },
  question: { fontSize: Layout.fontSize.lg, fontWeight: '700', color: Colors.text, textAlign: 'center' },
  options: { gap: Layout.spacing.sm },
  option: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: Layout.radius.md,
    padding: Layout.spacing.md,
    backgroundColor: Colors.surface,
  },
  optionSelected: { borderColor: Colors.primary, backgroundColor: Colors.primary + '10' },
  optionText: { fontSize: Layout.fontSize.md, color: Colors.text, fontWeight: '600' },
  optionTextSelected: { color: Colors.primary },
  button: { marginTop: 'auto' },
});
