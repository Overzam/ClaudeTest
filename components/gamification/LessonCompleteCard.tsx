import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';

interface Props {
  xpEarned: number;
  score: number;
  mistakesCount: number;
}

export function LessonCompleteCard({ xpEarned, score, mistakesCount }: Props) {
  const { theme } = useThemeStore();
  const c = theme.colors;
  return (
    <Card style={styles.card}>
      <Text style={[styles.title, { color: c.text }]}>🎉 Leçon terminée !</Text>
      <View style={styles.stats}>
        <StatItem label="Score" value={`${score}%`} color={c.primary} textColor={c.textMuted} />
        <StatItem label="XP gagnés" value={`+${xpEarned}`} color={c.xpBlue} textColor={c.textMuted} />
        <StatItem
          label="Erreurs"
          value={`${mistakesCount}`}
          color={mistakesCount === 0 ? c.primary : c.danger}
          textColor={c.textMuted}
        />
      </View>
    </Card>
  );
}

function StatItem({ label, value, color, textColor }: { label: string; value: string; color: string; textColor: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: textColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { alignItems: 'center', paddingVertical: Layout.spacing.xl, gap: Layout.spacing.lg },
  title: { fontSize: Layout.fontSize.xl, fontWeight: '800' },
  stats: { flexDirection: 'row', gap: Layout.spacing.xl },
  statItem: { alignItems: 'center', gap: 4 },
  statValue: { fontSize: Layout.fontSize.xxl, fontWeight: '800' },
  statLabel: { fontSize: Layout.fontSize.sm, fontWeight: '600' },
});
