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

  const xpLeft = nextThreshold - xp;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <View style={[styles.levelBadge, { backgroundColor: c.xpBlue + '20' }]}>
          <Text style={[styles.label, { color: c.xpBlue }]}>⚡ Niv. {level}</Text>
        </View>
        <Text style={[styles.xpText, { color: c.textMuted }]}>
          {xp} XP · encore {xpLeft} pour niv. {level + 1}
        </Text>
      </View>
      <ProgressBar progress={progress} color={c.xpBlue} height={10} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: Layout.spacing.xs },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  levelBadge: { borderRadius: Layout.radius.full, paddingHorizontal: 10, paddingVertical: 3 },
  label: { fontSize: Layout.fontSize.sm, fontWeight: '800' },
  xpText: { fontSize: Layout.fontSize.xs },
});
