import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import type { AssociationData } from '@/types/lesson.types';

interface Props {
  question: string;
  data: AssociationData;
  onSubmit: (correct: boolean) => void;
}

export function Association({ question, data, onSubmit }: Props) {
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
    onSubmit(correct);
  }

  const usedRight = new Set(Object.values(matched));

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.columns}>
        <View style={styles.col}>
          {data.pairs.map((pair, i) => {
            const isSelected = selectedLeft === i;
            const isMatched = matched[i] !== undefined;
            return (
              <TouchableOpacity
                key={i}
                style={[styles.cell, isSelected && styles.cellSelected, isMatched && styles.cellMatched]}
                onPress={() => !isMatched && handleLeft(i)}
                disabled={isMatched}
              >
                <Text style={styles.cellText}>{pair.left}</Text>
                {isMatched && <Text style={styles.matchedRight}> → {matched[i]}</Text>}
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
                style={[styles.cell, isUsed && styles.cellMatched, selectedLeft !== null && !isUsed && styles.cellHighlight]}
                onPress={() => !isUsed && handleRight(right)}
                disabled={isUsed || selectedLeft === null}
              >
                <Text style={styles.cellText}>{right}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <Button
        label="Vérifier"
        onPress={handleVerify}
        disabled={!allMatched}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Layout.spacing.lg, gap: Layout.spacing.lg },
  question: { fontSize: Layout.fontSize.lg, fontWeight: '700', color: Colors.text, textAlign: 'center' },
  columns: { flexDirection: 'row', gap: Layout.spacing.sm },
  col: { flex: 1, gap: Layout.spacing.sm },
  cell: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: Layout.radius.md,
    padding: Layout.spacing.sm,
    backgroundColor: Colors.surface,
    minHeight: 52,
    justifyContent: 'center',
  },
  cellSelected: { borderColor: Colors.xpBlue },
  cellMatched: { borderColor: Colors.primary, backgroundColor: Colors.primary + '10' },
  cellHighlight: { borderColor: Colors.secondary },
  cellText: { fontSize: Layout.fontSize.sm, fontWeight: '600', color: Colors.text, textAlign: 'center' },
  matchedRight: { fontSize: Layout.fontSize.xs, color: Colors.primary, textAlign: 'center' },
  button: { marginTop: 'auto' },
});
