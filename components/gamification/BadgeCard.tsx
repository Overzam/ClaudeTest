import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import type { Badge } from '@/types/database.types';

interface Props {
  badge: Badge;
  earned?: boolean;
  earnedAt?: string;
  style?: ViewStyle;
}

export function BadgeCard({ badge, earned = false, earnedAt, style }: Props) {
  return (
    <Card style={[styles.card, !earned && styles.locked, style]}>
      <Text style={[styles.emoji, !earned && styles.emojiLocked]}>{badge.emoji}</Text>
      <Text style={[styles.title, !earned && styles.textLocked]} numberOfLines={1}>
        {badge.title}
      </Text>
      <Text style={styles.desc} numberOfLines={2}>
        {badge.description}
      </Text>
      {earned && earnedAt && (
        <Text style={styles.date}>
          {new Date(earnedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
        </Text>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { alignItems: 'center', gap: 4, padding: Layout.spacing.md, width: 110 },
  locked: { opacity: 0.4 },
  emoji: { fontSize: 32 },
  emojiLocked: { grayscale: 1 } as never,
  title: { fontSize: Layout.fontSize.xs, fontWeight: '700', color: Colors.text, textAlign: 'center' },
  textLocked: { color: Colors.textMuted },
  desc: { fontSize: 10, color: Colors.textMuted, textAlign: 'center', lineHeight: 13 },
  date: { fontSize: 10, color: Colors.primary, fontWeight: '600' },
});
