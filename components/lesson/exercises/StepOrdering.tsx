import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import { Button } from '@/components/ui/Button';
import { useThemeStore } from '@/stores/themeStore';
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
  const { theme } = useThemeStore();
  const c = theme.colors;

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
        <View style={[
          styles.item,
          { backgroundColor: c.surfaceElevated, borderColor: c.border },
          isActive && { borderColor: c.primary, elevation: 8 },
        ]}>
          <Text style={[styles.handle, { color: c.textMuted }]}>☰</Text>
          <Text style={[styles.label, { color: c.text }]} onLongPress={drag}>
            {item.label}
          </Text>
        </View>
      </ScaleDecorator>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.question, { color: c.text }]}>{question}</Text>
      <Text style={[styles.hint, { color: c.textMuted }]}>Maintenez et glissez pour réordonner</Text>
      <DraggableFlatList
        style={styles.list}
        data={items}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        onDragEnd={({ data: newData }) => setItems(newData)}
        contentContainerStyle={styles.listContent}
      />
      <View style={[styles.footer, { borderTopColor: c.border }]}>
        <Button label="Vérifier" onPress={handleVerify} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  question: { fontSize: Layout.fontSize.lg, fontWeight: '700', textAlign: 'center', padding: Layout.spacing.lg, paddingBottom: Layout.spacing.sm },
  hint: { fontSize: Layout.fontSize.sm, textAlign: 'center', paddingBottom: Layout.spacing.md },
  list: { flex: 1 },
  listContent: { gap: Layout.spacing.sm, paddingHorizontal: Layout.spacing.lg },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: Layout.radius.md,
    padding: Layout.spacing.md,
    gap: Layout.spacing.md,
  },
  handle: { fontSize: 18 },
  label: { flex: 1, fontSize: Layout.fontSize.md, fontWeight: '600' },
  footer: { padding: Layout.spacing.lg, paddingTop: Layout.spacing.md, borderTopWidth: 1 },
});
