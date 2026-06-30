import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { MAX_HEARTS } from '@/constants/Config';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';

interface Props {
  hearts: number;
  style?: ViewStyle;
  /** compact=true shows ❤️ 5 badge (for headers); false shows individual hearts (for detail views) */
  compact?: boolean;
}

export function HeartsDisplay({ hearts, style, compact = false }: Props) {
  const { theme } = useThemeStore();
  const c = theme.colors;

  if (compact) {
    return (
      <View style={[styles.badge, { backgroundColor: '#ef444420' }, style]}>
        <Text style={styles.badgeEmoji}>❤️</Text>
        <Text style={[styles.badgeCount, { color: '#ef4444' }]}>{hearts}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.row, style]}>
      {Array.from({ length: MAX_HEARTS }).map((_, i) => (
        <Text key={i} style={[styles.heart, i >= hearts && styles.empty]}>
          ❤️
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 2 },
  heart: { fontSize: 18 },
  empty: { opacity: 0.2 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 4,
    borderRadius: Layout.radius.full,
    gap: 2,
  },
  badgeEmoji: { fontSize: 16 },
  badgeCount: { fontWeight: '700', fontSize: Layout.fontSize.sm },
});
