import React, { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { Avatar } from '@/components/ui/Avatar';
import { useThemeStore } from '@/stores/themeStore';
import { useAuthStore } from '@/stores/authStore';
import { Layout } from '@/constants/Layout';
import { supabase, isSupabaseConfigured } from '@/services/supabase';

type LeaderEntry = {
  user_id: string;
  xp: number;
  streak_days: number;
  lessons_completed: number;
  username: string | null;
};

const TABS = ['XP', 'Série', 'Leçons'] as const;
type Tab = typeof TABS[number];

async function fetchLeaderboard(by: Tab): Promise<LeaderEntry[]> {
  if (!isSupabaseConfigured) return [];
  const col = by === 'XP' ? 'xp' : by === 'Série' ? 'streak_days' : 'lessons_completed';
  const { data, error } = await supabase
    .from('user_stats')
    .select('user_id, xp, streak_days, lessons_completed, profiles!inner(username)')
    .order(col, { ascending: false })
    .limit(50);
  if (error || !data) return [];
  return data.map((row: any) => ({
    user_id: row.user_id,
    xp: row.xp ?? 0,
    streak_days: row.streak_days ?? 0,
    lessons_completed: row.lessons_completed ?? 0,
    username: row.profiles?.username ?? null,
  }));
}

const RANK_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32'];
const RANK_EMOJI = ['🥇', '🥈', '🥉'];

export default function LeaderboardScreen() {
  const { session } = useAuthStore();
  const { theme } = useThemeStore();
  const c = theme.colors;
  const [tab, setTab] = useState<Tab>('XP');
  const [entries, setEntries] = useState<LeaderEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchLeaderboard(tab).then((data) => {
        setEntries(data);
        setLoading(false);
      });
    }, [tab])
  );

  const myRank = entries.findIndex((e) => e.user_id === session?.user.id);
  const myEntry = myRank >= 0 ? entries[myRank] : null;

  function scoreFor(e: LeaderEntry) {
    if (tab === 'XP') return `${e.xp} XP`;
    if (tab === 'Série') return `${e.streak_days}🔥`;
    return `${e.lessons_completed} leçons`;
  }

  return (
    <ScreenWrapper>
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.back, { color: c.primary }]}>← Retour</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: c.text }]}>Classement</Text>
      </View>

      {/* Tabs */}
      <View style={[styles.tabs, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
        {TABS.map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, tab === t && { backgroundColor: c.primary }]}
            onPress={() => setTab(t)}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, { color: tab === t ? '#fff' : c.textSecondary }]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* My rank sticky banner */}
      {myEntry && (
        <LinearGradient
          colors={[c.primary + 'CC', c.primary + '88']}
          style={styles.myRankBanner}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.myRankLabel}>Ma position</Text>
          <Text style={styles.myRankNum}>#{myRank + 1}</Text>
          <Text style={styles.myRankScore}>{scoreFor(myEntry)}</Text>
        </LinearGradient>
      )}

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color={c.primary} />
      ) : entries.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🏆</Text>
          <Text style={[styles.emptyText, { color: c.textMuted }]}>Classement indisponible hors ligne</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {entries.map((entry, idx) => {
            const isMe = entry.user_id === session?.user.id;
            const isTop3 = idx < 3;
            return (
              <View
                key={entry.user_id}
                style={[
                  styles.row,
                  { backgroundColor: isMe ? c.primary + '18' : c.surfaceElevated, borderColor: isMe ? c.primary : c.border },
                  isMe && { borderWidth: 2 },
                ]}
              >
                <View style={[styles.rankBadge, isTop3 && { backgroundColor: RANK_COLORS[idx] + '25' }]}>
                  <Text style={[styles.rankText, { color: isTop3 ? RANK_COLORS[idx] : c.textMuted }]}>
                    {isTop3 ? RANK_EMOJI[idx] : `#${idx + 1}`}
                  </Text>
                </View>
                <Avatar name={entry.username ?? '?'} size={36} />
                <Text style={[styles.username, { color: isMe ? c.primary : c.text }]} numberOfLines={1}>
                  {entry.username ?? 'Anonyme'}{isMe ? ' (moi)' : ''}
                </Text>
                <Text style={[styles.score, { color: isTop3 ? RANK_COLORS[idx] : c.textSecondary }]}>
                  {scoreFor(entry)}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.md,
    padding: Layout.spacing.lg,
    borderBottomWidth: 1,
  },
  back: { fontWeight: '600', fontSize: Layout.fontSize.md },
  title: { fontSize: Layout.fontSize.xl, fontWeight: '900' },
  tabs: {
    flexDirection: 'row',
    margin: Layout.spacing.lg,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 3,
    gap: 3,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: Layout.spacing.sm, borderRadius: Layout.radius.md },
  tabText: { fontSize: Layout.fontSize.sm, fontWeight: '700' },
  myRankBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.sm,
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.md,
    gap: Layout.spacing.sm,
  },
  myRankLabel: { color: 'rgba(255,255,255,0.8)', fontSize: Layout.fontSize.xs, fontWeight: '700', flex: 1 },
  myRankNum: { color: '#fff', fontSize: Layout.fontSize.xl, fontWeight: '900' },
  myRankScore: { color: 'rgba(255,255,255,0.9)', fontSize: Layout.fontSize.sm, fontWeight: '700' },
  list: { padding: Layout.spacing.lg, gap: Layout.spacing.sm, paddingBottom: 40 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
    padding: Layout.spacing.md,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
  },
  rankBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: { fontSize: Layout.fontSize.sm, fontWeight: '800' },
  username: { flex: 1, fontSize: Layout.fontSize.sm, fontWeight: '600' },
  score: { fontSize: Layout.fontSize.sm, fontWeight: '800' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Layout.spacing.md },
  emptyEmoji: { fontSize: 60 },
  emptyText: { fontSize: Layout.fontSize.md, textAlign: 'center' },
});
