import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import type { Path } from '@/types/database.types';

interface Props {
  path: Path;
  completedLessons: number;
  totalLessons: number;
  onPress: () => void;
  locked?: boolean;
}

export function PathCard({ path, completedLessons, totalLessons, onPress, locked }: Props) {
  const progress = totalLessons > 0 ? completedLessons / totalLessons : 0;

  return (
    <TouchableOpacity
      style={[styles.card, locked && styles.locked]}
      onPress={onPress}
      disabled={locked}
      activeOpacity={0.85}
    >
      <View style={[styles.emojiBox, { backgroundColor: path.color + '20' }]}>
        <Text style={styles.emoji}>{path.emoji}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{path.title}</Text>
        {path.description && <Text style={styles.desc} numberOfLines={1}>{path.description}</Text>}
        <ProgressBar progress={progress} color={path.color} style={styles.bar} />
        <Text style={styles.count}>{completedLessons}/{totalLessons} leçons</Text>
      </View>
      {locked && <Text style={styles.lockIcon}>🔒</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.md,
    gap: Layout.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  locked: { opacity: 0.5 },
  emojiBox: {
    width: 56,
    height: 56,
    borderRadius: Layout.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 28 },
  content: { flex: 1, gap: 4 },
  title: { fontSize: Layout.fontSize.md, fontWeight: '700', color: Colors.text },
  desc: { fontSize: Layout.fontSize.sm, color: Colors.textMuted },
  bar: { marginTop: 4 },
  count: { fontSize: Layout.fontSize.xs, color: Colors.textMuted, marginTop: 2 },
  lockIcon: { fontSize: 20 },
});
