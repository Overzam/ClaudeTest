import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

interface Props {
  xpEarned: number;
  score: number;
  mistakesCount: number;
}

export function LessonCompleteCard({ xpEarned, score, mistakesCount }: Props) {
  return (
    <Card style={styles.card}>
      <Text style={styles.title}>🎉 Leçon terminée !</Text>
      <View style={styles.stats}>
        <StatItem label="Score" value={`${score}%`} color={Colors.primary} />
        <StatItem label="XP gagnés" value={`+${xpEarned}`} color={Colors.xpBlue} />
        <StatItem
          label="Erreurs"
          value={`${mistakesCount}`}
          color={mistakesCount === 0 ? Colors.primary : Colors.danger}
        />
      </View>
    </Card>
  );
}

function StatItem({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { alignItems: 'center', paddingVertical: Layout.spacing.xl, gap: Layout.spacing.lg },
  title: { fontSize: Layout.fontSize.xl, fontWeight: '800', color: Colors.text },
  stats: { flexDirection: 'row', gap: Layout.spacing.xl },
  statItem: { alignItems: 'center', gap: 4 },
  statValue: { fontSize: Layout.fontSize.xxl, fontWeight: '800' },
  statLabel: { fontSize: Layout.fontSize.sm, color: Colors.textMuted, fontWeight: '600' },
});
