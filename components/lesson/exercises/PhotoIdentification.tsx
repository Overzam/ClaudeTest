import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import type { PhotoIdentificationData } from '@/types/lesson.types';

interface Props {
  question: string;
  data: PhotoIdentificationData;
  onSubmit: (correct: boolean) => void;
}

export function PhotoIdentification({ question, data, onSubmit }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  function handleVerify() {
    if (selected === null) return;
    onSubmit(selected === data.correctIndex);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      <FlatList
        data={data.options}
        keyExtractor={(_, i) => String(i)}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[styles.option, selected === index && styles.optionSelected]}
            onPress={() => setSelected(index)}
            activeOpacity={0.85}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
              contentFit="cover"
              placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
            />
            <Text style={[styles.label, selected === index && styles.labelSelected]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />
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
  grid: { gap: Layout.spacing.sm },
  row: { gap: Layout.spacing.sm },
  option: {
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: Layout.radius.md,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
  },
  optionSelected: { borderColor: Colors.primary },
  image: { width: '100%', aspectRatio: 1 },
  label: { textAlign: 'center', padding: Layout.spacing.sm, fontSize: Layout.fontSize.sm, fontWeight: '600', color: Colors.text },
  labelSelected: { color: Colors.primary },
  button: { marginTop: 'auto' },
});
