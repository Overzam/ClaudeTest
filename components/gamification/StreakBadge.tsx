import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';

interface Props {
  streakDays: number;
  style?: ViewStyle;
}

export function StreakBadge({ streakDays, style }: Props) {
  const { theme } = useThemeStore();
  const c = theme.colors;
  return (
    <View style={[styles.badge, { backgroundColor: c.streakOrange + '20' }, style]}>
      <Ionicons name="flame" size={16} color={c.streakOrange} />
      <Text style={[styles.count, { color: c.streakOrange }]}>{streakDays}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 4,
    borderRadius: Layout.radius.full,
    gap: 2,
  },
  count: { fontWeight: '700', fontSize: Layout.fontSize.sm },
});
