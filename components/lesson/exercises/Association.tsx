import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '@/components/ui/Button';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';
import type { AssociationData } from '@/types/lesson.types';

interface Props {
  question: string;
  data: AssociationData;
  onSubmit: (correct: boolean, correctAnswerText?: string) => void;
}

export function Association({ question, data, onSubmit }: Props) {
  const { theme } = useThemeStore();
  const c = theme.colors;

  const shuffledRight = useMemo(
    () => [...data.pairs.map((p) => p.right)].sort(() => Math.random() - 0.5),
    [data]
  );

  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matched, setMatched] = useState<Record<number, string>>({});

  function handleLeft(i: number) {
    setSelectedLeft(i === selectedLeft ? null : i);
  }

  function handleRight(value: string) {
    if (selectedLeft === null) return;
    setMatched((prev) => ({ ...prev, [selectedLeft]: value }));
    setSelectedLeft(null);
  }

  const allMatched = Object.keys(matched).length === data.pairs.length;

  function handleVerify() {
    const correct = data.pairs.every((pair, i) => matched[i] === pair.right);
    const correctText = data.pairs.map((p) => `${p.left} → ${p.right}`).join('\n');
    onSubmit(correct, correctText);
  }

  const usedRight = new Set(Object.values(matched));

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.question, { color: c.text }]}>{question}</Text>
        <View style={styles.columns}>
          <View style={styles.col}>
            {data.pairs.map((pair, i) => {
              const isSelected = selectedLeft === i;
              const isMatched = matched[i] !== undefined;
              return (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.cell,
                    { borderColor: c.border, backgroundColor: c.surfaceElevated },
                    isSelected && { borderColor: c.xpBlue, backgroundColor: c.xpBlue + '12' },
                    isMatched && { borderColor: c.primary, backgroundColor: c.primary + '12' },
                  ]}
                  onPress={() => !isMatched && handleLeft(i)}
                  disabled={isMatched}
                >
                  <Text style={[styles.cellText, { color: isMatched ? c.primary : c.text }]}>{pair.left}</Text>
                  {isMatched && <Text style={[styles.matchedRight, { color: c.primary }]}>✓ {matched[i]}</Text>}
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.col}>
            {shuffledRight.map((right, i) => {
              const isUsed = usedRight.has(right);
              return (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.cell,
                    { borderColor: c.border, backgroundColor: c.surfaceElevated },
                    isUsed && { borderColor: c.primary, backgroundColor: c.primary + '12', opacity: 0.5 },
                    !isUsed && selectedLeft !== null && { borderColor: c.secondary, backgroundColor: c.secondary + '12' },
                  ]}
                  onPress={() => !isUsed && handleRight(right)}
                  disabled={isUsed || selectedLeft === null}
                >
                  <Text style={[styles.cellText, { color: isUsed ? c.primary : c.text }]}>{right}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {selectedLeft !== null && (
          <Text style={[styles.hint, { color: c.xpBlue }]}>Maintenant sélectionne la réponse à droite →</Text>
        )}
      </ScrollView>
      <View style={[styles.footer, { borderTopColor: c.border }]}>
        <Button label="Vérifier" onPress={handleVerify} disabled={!allMatched} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  scroll: { padding: Layout.spacing.lg, gap: Layout.spacing.md },
  question: { fontSize: Layout.fontSize.lg, fontWeight: '700', textAlign: 'center', lineHeight: 28 },
  columns: { flexDirection: 'row', gap: Layout.spacing.sm },
  col: { flex: 1, gap: Layout.spacing.sm },
  cell: {
    borderWidth: 2,
    borderRadius: Layout.radius.md,
    padding: Layout.spacing.sm,
    minHeight: 52,
    justifyContent: 'center',
  },
  cellText: { fontSize: Layout.fontSize.sm, fontWeight: '600', textAlign: 'center' },
  matchedRight: { fontSize: Layout.fontSize.xs, textAlign: 'center', marginTop: 2 },
  hint: { fontSize: Layout.fontSize.xs, fontWeight: '600', textAlign: 'center' },
  footer: { padding: Layout.spacing.lg, paddingTop: Layout.spacing.md, borderTopWidth: 1 },
});
