import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useThemeStore } from '@/stores/themeStore';
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
  const { theme } = useThemeStore();
  const c = theme.colors;
  const progress = totalLessons > 0 ? completedLessons / totalLessons : 0;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: c.surface }, locked && styles.locked]}
      onPress={onPress}
      disabled={locked}
      activeOpacity={0.85}
    >
      <LinearGradient
        colors={[path.color + '40', path.color + '15']}
        style={styles.emojiBox}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.emoji}>{path.emoji}</Text>
      </LinearGradient>
      <View style={styles.content}>
        <Text style={[styles.title, { color: c.text }]}>{path.title}</Text>
        {path.description && <Text style={[styles.desc, { color: c.textMuted }]} numberOfLines={1}>{path.description}</Text>}
        <ProgressBar progress={progress} color={path.color} style={styles.bar} />
        <Text style={[styles.count, { color: c.textMuted }]}>{completedLessons}/{totalLessons} leçons</Text>
      </View>
      {locked && <Text style={styles.lockIcon}>🔒</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
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
  title: { fontSize: Layout.fontSize.md, fontWeight: '700' },
  desc: { fontSize: Layout.fontSize.sm },
  bar: { marginTop: 4 },
  count: { fontSize: Layout.fontSize.xs, marginTop: 2 },
  lockIcon: { fontSize: 20 },
});
