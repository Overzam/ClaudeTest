import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MAX_HEARTS } from '@/constants/Config';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';

interface Props {
  hearts: number;
  style?: ViewStyle;
  compact?: boolean;
}

export function HeartsDisplay({ hearts, style, compact = false }: Props) {
  const { theme } = useThemeStore();
  const c = theme.colors;

  if (compact) {
    return (
      <View style={[styles.badge, { backgroundColor: '#ef444420' }, style]}>
        <Ionicons name="heart" size={16} color="#ef4444" />
        <Text style={[styles.badgeCount, { color: '#ef4444' }]}>{hearts}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.row, style]}>
      {Array.from({ length: MAX_HEARTS }).map((_, i) => (
        <Ionicons key={i} name="heart" size={20} color="#ef4444" style={{ opacity: i < hearts ? 1 : 0.2 }} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 2 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 4,
    borderRadius: Layout.radius.full,
    gap: 2,
  },
  badgeCount: { fontWeight: '700', fontSize: Layout.fontSize.sm },
});
