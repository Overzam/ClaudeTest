import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import type { StepOrderingData } from '@/types/lesson.types';

interface StepItem {
  key: string;
  label: string;
  originalIndex: number;
}

interface Props {
  question: string;
  data: StepOrderingData;
  onSubmit: (correct: boolean, correctAnswerText?: string) => void;
}

export function StepOrdering({ question, data, onSubmit }: Props) {
  const initial = useMemo<StepItem[]>(
    () =>
      data.steps
        .map((label, i) => ({ key: `step-${i}`, label, originalIndex: i }))
        .sort(() => Math.random() - 0.5),
    [data]
  );

  const [items, setItems] = useState(initial);

  function handleVerify() {
    const currentOrder = items.map((item) => item.originalIndex);
    const correct = JSON.stringify(currentOrder) === JSON.stringify(data.correctOrder);
    const correctText = data.correctOrder.map((i) => data.steps[i]).join(' → ');
    onSubmit(correct, correctText);
  }

  function renderItem({ item, drag, isActive }: RenderItemParams<StepItem>) {
    return (
      <ScaleDecorator>
        <View style={[styles.item, isActive && styles.itemActive]}>
          <Text style={styles.handle}>☰</Text>
          <Text style={styles.label} onLongPress={drag}>
            {item.label}
          </Text>
        </View>
      </ScaleDecorator>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      <Text style={styles.hint}>Maintenez et glissez pour réordonner</Text>
      <DraggableFlatList
        data={items}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        onDragEnd={({ data: newData }) => setItems(newData)}
        contentContainerStyle={styles.list}
      />
      <Button label="Vérifier" onPress={handleVerify} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Layout.spacing.lg, gap: Layout.spacing.md },
  question: { fontSize: Layout.fontSize.lg, fontWeight: '700', color: Colors.text, textAlign: 'center' },
  hint: { fontSize: Layout.fontSize.sm, color: Colors.textMuted, textAlign: 'center' },
  list: { gap: Layout.spacing.sm },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: Layout.radius.md,
    padding: Layout.spacing.md,
    gap: Layout.spacing.md,
  },
  itemActive: { borderColor: Colors.primary, shadowOpacity: 0.2, elevation: 8 },
  handle: { fontSize: 18, color: Colors.textMuted },
  label: { flex: 1, fontSize: Layout.fontSize.md, color: Colors.text, fontWeight: '600' },
  button: {},
});
