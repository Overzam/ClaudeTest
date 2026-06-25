import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { LEVEL_THRESHOLDS } from '@/constants/Config';

interface Props {
  xp: number;
  level: number;
  style?: ViewStyle;
}

export function XPBar({ xp, level, style }: Props) {
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const nextThreshold = LEVEL_THRESHOLDS[level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  const progress = Math.min(1, (xp - currentThreshold) / (nextThreshold - currentThreshold));

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={styles.label}>Niveau {level}</Text>
        <Text style={styles.xpText}>{xp} XP</Text>
      </View>
      <ProgressBar progress={progress} color={Colors.xpBlue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: Layout.spacing.xs },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { fontSize: Layout.fontSize.sm, fontWeight: '700', color: Colors.text },
  xpText: { fontSize: Layout.fontSize.sm, color: Colors.textMuted },
});
