import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from '@/components/ui/Avatar';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';
import type { LeaderboardEntry } from '@/types/database.types';

interface Props {
  entry: LeaderboardEntry;
}

const MEDAL: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

export function LeaderboardRow({ entry }: Props) {
  const { theme } = useThemeStore();
  const c = theme.colors;
  return (
    <View style={[styles.row, { backgroundColor: c.surfaceElevated }, entry.isMe && { borderWidth: 2, borderColor: c.primary }]}>
      <Text style={styles.rank}>{MEDAL[entry.rank] ?? `#${entry.rank}`}</Text>
      <Avatar name={entry.username} uri={entry.avatar_url} size={36} />
      <View style={styles.info}>
        <Text style={[styles.username, { color: c.text }]}>{entry.username}{entry.isMe ? ' (toi)' : ''}</Text>
        <Text style={[styles.sub, { color: c.textMuted }]}>Niv. {entry.level} · 🔥 {entry.streak_days}</Text>
      </View>
      <Text style={[styles.xp, { color: c.xpBlue }]}>{entry.xp} XP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Layout.radius.md,
    padding: Layout.spacing.md,
    gap: Layout.spacing.md,
  },
  rank: { fontSize: 20, width: 32, textAlign: 'center' },
  info: { flex: 1 },
  username: { fontSize: Layout.fontSize.sm, fontWeight: '700' },
  sub: { fontSize: Layout.fontSize.xs },
  xp: { fontSize: Layout.fontSize.sm, fontWeight: '800' },
});
