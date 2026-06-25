import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from '@/components/ui/Avatar';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import type { LeaderboardEntry } from '@/types/database.types';

interface Props {
  entry: LeaderboardEntry;
}

const MEDAL: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

export function LeaderboardRow({ entry }: Props) {
  return (
    <View style={[styles.row, entry.isMe && styles.me]}>
      <Text style={styles.rank}>{MEDAL[entry.rank] ?? `#${entry.rank}`}</Text>
      <Avatar name={entry.username} uri={entry.avatar_url} size={36} />
      <View style={styles.info}>
        <Text style={styles.username}>{entry.username}{entry.isMe ? ' (toi)' : ''}</Text>
        <Text style={styles.sub}>Niv. {entry.level} · 🔥 {entry.streak_days}</Text>
      </View>
      <Text style={styles.xp}>{entry.xp} XP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Layout.radius.md,
    padding: Layout.spacing.md,
    gap: Layout.spacing.md,
  },
  me: { borderWidth: 2, borderColor: Colors.primary },
  rank: { fontSize: 20, width: 32, textAlign: 'center' },
  info: { flex: 1 },
  username: { fontSize: Layout.fontSize.sm, fontWeight: '700', color: Colors.text },
  sub: { fontSize: Layout.fontSize.xs, color: Colors.textMuted },
  xp: { fontSize: Layout.fontSize.sm, fontWeight: '800', color: Colors.xpBlue },
});
