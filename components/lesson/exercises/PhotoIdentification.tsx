import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { Button } from '@/components/ui/Button';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';
import type { PhotoIdentificationData } from '@/types/lesson.types';

interface Props {
  question: string;
  data: PhotoIdentificationData;
  onSubmit: (correct: boolean, correctAnswerText?: string) => void;
}

export function PhotoIdentification({ question, data, onSubmit }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const { theme } = useThemeStore();
  const c = theme.colors;

  function handleVerify() {
    if (selected === null) return;
    onSubmit(selected === data.correctIndex, data.options[data.correctIndex]?.label);
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={data.options}
        keyExtractor={(_, i) => String(i)}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={[styles.grid, { paddingHorizontal: Layout.spacing.lg, paddingTop: Layout.spacing.lg }]}
        ListHeaderComponent={<Text style={[styles.question, { color: c.text }]}>{question}</Text>}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.option,
              { borderColor: c.border, backgroundColor: c.surfaceElevated },
              selected === index && { borderColor: c.primary },
            ]}
            onPress={() => setSelected(index)}
            activeOpacity={0.85}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
              contentFit="cover"
              placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
            />
            <Text style={[styles.label, { color: selected === index ? c.primary : c.text }]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={[styles.footer, { borderTopColor: c.border }]}>
        <Button label="Vérifier" onPress={handleVerify} disabled={selected === null} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { flex: 1 },
  question: { fontSize: Layout.fontSize.lg, fontWeight: '700', textAlign: 'center', marginBottom: Layout.spacing.md, lineHeight: 28 },
  grid: { gap: Layout.spacing.sm, paddingBottom: Layout.spacing.sm },
  row: { gap: Layout.spacing.sm },
  option: {
    flex: 1,
    borderWidth: 2,
    borderRadius: Layout.radius.lg,
    overflow: 'hidden',
  },
  image: { width: '100%', aspectRatio: 1 },
  label: { textAlign: 'center', padding: Layout.spacing.sm, fontSize: Layout.fontSize.sm, fontWeight: '600' },
  footer: { padding: Layout.spacing.lg, paddingTop: Layout.spacing.md, borderTopWidth: 1 },
});
