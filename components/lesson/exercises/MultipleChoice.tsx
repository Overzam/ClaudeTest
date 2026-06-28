import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '@/components/ui/Button';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';
import type { MultipleChoiceData } from '@/types/lesson.types';

interface Props {
  question: string;
  data: MultipleChoiceData;
  onSubmit: (correct: boolean, correctAnswerText?: string) => void;
}

export function MultipleChoice({ question, data, onSubmit }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const { theme } = useThemeStore();
  const c = theme.colors;

  function handleVerify() {
    if (selected === null) return;
    const correct = selected === data.correctIndex;
    onSubmit(correct, data.options[data.correctIndex]);
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.question, { color: c.text }]}>{question}</Text>
        <View style={styles.options}>
          {data.options.map((option, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.option,
                { borderColor: c.border, backgroundColor: c.surfaceElevated },
                selected === i && { borderColor: c.primary, backgroundColor: c.primary + '12' },
              ]}
              onPress={() => setSelected(i)}
              activeOpacity={0.75}
            >
              <View style={[styles.optionDot, { borderColor: selected === i ? c.primary : c.border, backgroundColor: selected === i ? c.primary : 'transparent' }]}>
                {selected === i && <View style={styles.optionDotInner} />}
              </View>
              <Text style={[styles.optionText, { color: selected === i ? c.primary : c.text }]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={[styles.footer, { borderTopColor: c.border }]}>
        <Button
          label="Vérifier"
          onPress={handleVerify}
          disabled={selected === null}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: Layout.spacing.lg, gap: Layout.spacing.lg, paddingBottom: Layout.spacing.sm },
  question: { fontSize: Layout.fontSize.lg, fontWeight: '700', textAlign: 'center', lineHeight: 28 },
  options: { gap: Layout.spacing.sm },
  option: {
    borderWidth: 2,
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.md,
  },
  optionDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  optionDotInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#fff' },
  optionText: { fontSize: Layout.fontSize.md, fontWeight: '600', flex: 1 },
  footer: { padding: Layout.spacing.lg, paddingTop: Layout.spacing.md, borderTopWidth: 1 },
});
