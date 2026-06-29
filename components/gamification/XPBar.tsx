import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';
import { LEVEL_THRESHOLDS } from '@/constants/Config';

interface Props {
  xp: number;
  level: number;
  style?: ViewStyle;
}

export function XPBar({ xp, level, style }: Props) {
  const { theme } = useThemeStore();
  const c = theme.colors;
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const nextThreshold = LEVEL_THRESHOLDS[level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  const progress = Math.min(1, (xp - currentThreshold) / (nextThreshold - currentThreshold));

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={[styles.label, { color: c.text }]}>Niveau {level}</Text>
        <Text style={[styles.xpText, { color: c.textMuted }]}>{xp} XP</Text>
      </View>
      <ProgressBar progress={progress} color={c.xpBlue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: Layout.spacing.xs },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { fontSize: Layout.fontSize.sm, fontWeight: '700' },
  xpText: { fontSize: Layout.fontSize.sm },
});
