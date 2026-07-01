import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Card } from '@/components/ui/Card';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';
import type { Badge } from '@/types/database.types';

interface Props {
  badge: Badge;
  earned?: boolean;
  earnedAt?: string;
  progressCurrent?: number;
  progressTarget?: number;
  style?: ViewStyle;
}

export function BadgeCard({ badge, earned = false, earnedAt, progressCurrent, progressTarget, style }: Props) {
  const { theme } = useThemeStore();
  const c = theme.colors;
  const showProgress = !earned && typeof progressCurrent === 'number' && typeof progressTarget === 'number' && progressTarget > 0;
  const ratio = showProgress ? Math.min(1, progressCurrent! / progressTarget!) : 0;
  const isClose = showProgress && ratio >= 0.5;

  return (
    <Card style={[styles.card, !earned && styles.locked, isClose && { opacity: 0.75, borderColor: c.primary, borderWidth: 1 }, style]}>
      <Text style={styles.emoji}>{badge.emoji}</Text>
      <Text style={[styles.title, { color: earned ? c.text : c.textMuted }]} numberOfLines={1}>
        {badge.title}
      </Text>
      <Text style={[styles.desc, { color: c.textMuted }]} numberOfLines={2}>
        {badge.description}
      </Text>
      {earned && earnedAt && (
        <Text style={[styles.date, { color: c.primary }]}>
          {new Date(earnedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
        </Text>
      )}
      {showProgress && (
        <>
          <View style={[styles.progressTrack, { backgroundColor: c.border }]}>
            <View style={[styles.progressFill, { width: `${ratio * 100}%`, backgroundColor: c.primary }]} />
          </View>
          <Text style={[styles.progressText, { color: c.textMuted }]}>
            {Math.min(progressCurrent!, progressTarget!)}/{progressTarget}
          </Text>
        </>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { alignItems: 'center', gap: 4, padding: Layout.spacing.md, width: 110 },
  locked: { opacity: 0.4 },
  emoji: { fontSize: 32 },
  title: { fontSize: Layout.fontSize.xs, fontWeight: '700', textAlign: 'center' },
  desc: { fontSize: 10, textAlign: 'center', lineHeight: 13 },
  date: { fontSize: 10, fontWeight: '600' },
  progressTrack: { width: '100%', height: 4, borderRadius: 2, overflow: 'hidden', marginTop: 2 },
  progressFill: { height: '100%', borderRadius: 2 },
  progressText: { fontSize: 9, fontWeight: '700' },
});
