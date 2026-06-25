import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { HeartsDisplay } from '@/components/gamification/HeartsDisplay';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  progress: number;
  hearts: number;
  onClose: () => void;
}

export function ExerciseHeader({ progress, hearts, onClose }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClose} hitSlop={8}>
        <Ionicons name="close" size={28} color={Colors.textMuted} />
      </TouchableOpacity>
      <ProgressBar progress={progress} style={styles.bar} />
      <HeartsDisplay hearts={hearts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    gap: Layout.spacing.md,
  },
  bar: { flex: 1 },
});
