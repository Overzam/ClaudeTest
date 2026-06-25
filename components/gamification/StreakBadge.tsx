import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

interface Props {
  streakDays: number;
  style?: ViewStyle;
}

export function StreakBadge({ streakDays, style }: Props) {
  return (
    <View style={[styles.badge, style]}>
      <Text style={styles.flame}>🔥</Text>
      <Text style={styles.count}>{streakDays}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.streakOrange + '20',
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 4,
    borderRadius: Layout.radius.full,
    gap: 2,
  },
  flame: { fontSize: 16 },
  count: { color: Colors.streakOrange, fontWeight: '700', fontSize: Layout.fontSize.sm },
});
