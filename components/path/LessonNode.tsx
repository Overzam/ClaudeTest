import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import type { Lesson } from '@/types/database.types';

type Status = 'locked' | 'available' | 'completed';

interface Props {
  lesson: Lesson;
  status: Status;
  pathColor: string;
  onPress: () => void;
}

export function LessonNode({ lesson, status, pathColor, onPress }: Props) {
  const isLocked = status === 'locked';
  const isDone = status === 'completed';

  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={onPress}
      disabled={isLocked}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.node,
          isDone && { backgroundColor: pathColor },
          !isDone && !isLocked && { borderColor: pathColor, borderWidth: 3 },
          isLocked && styles.nodeLocked,
        ]}
      >
        <Text style={[styles.icon, isLocked && styles.iconLocked]}>
          {isDone ? '✓' : isLocked ? '🔒' : '▶'}
        </Text>
      </View>
      <Text style={[styles.label, isLocked && styles.labelLocked]} numberOfLines={2}>
        {lesson.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center', gap: Layout.spacing.xs, width: 80 },
  node: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  nodeLocked: { backgroundColor: Colors.locked, shadowOpacity: 0 },
  icon: { fontSize: 22, color: Colors.text },
  iconLocked: { color: Colors.textMuted },
  label: { fontSize: Layout.fontSize.xs, fontWeight: '600', color: Colors.text, textAlign: 'center' },
  labelLocked: { color: Colors.textMuted },
});
