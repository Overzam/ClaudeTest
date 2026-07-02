import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { LeaderboardRow } from '@/components/social/LeaderboardRow';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';
import { useAuthStore } from '@/stores/authStore';
import { fetchLeaderboard } from '@/services/friendService';
import { fetchGlobalLeaderboard } from '@/services/leaderboardService';
import type { LeaderboardEntry } from '@/types/database.types';

interface GlobalEntry {
  user_id: string;
  username: string;
  xp: number;
  level: number;
  streak: number;
}

type Tab = 'global' | 'friends';

export default function LeaderboardScreen() {
  const { session, isGuest } = useAuthStore();
  const [tab, setTab] = useState<Tab>('global');
  const [friendEntries, setFriendEntries] = useState<LeaderboardEntry[]>([]);
  const [globalEntries, setGlobalEntries] = useState<GlobalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { theme } = useThemeStore();
  const c = theme.colors;

  async function load() {
    if (!session?.user.id) { setLoading(false); return; }
    try {
      const [friends, global] = await Promise.all([
        fetchLeaderboard(session.user.id),
        fetchGlobalLeaderboard(),
      ]);
      setFriendEntries(friends);
      setGlobalEntries(global);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useFocusEffect(useCallback(() => { load(); }, [session?.user.id]));

  if (loading) return <LoadingScreen />;

  const currentUserId = session?.user.id;

  function rankBadge(rank: number) {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  }

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={[styles.title, { color: c.text }]}>🏆 Classement</Text>
        <TouchableOpacity
          onPress={() => router.push('/friends')}
          style={[styles.friendsBtn, { backgroundColor: c.primary + '15' }]}
        >
          <Text style={[styles.friendsBtnText, { color: c.primary }]}>👥 Amis</Text>
        </TouchableOpacity>
      </View>

      {/* Tab toggle */}
      <View style={[styles.tabs, { backgroundColor: c.surface, borderColor: c.border }]}>
        {(['global', 'friends'] as Tab[]).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tabBtn, tab === t && { backgroundColor: c.primary }]}
            onPress={() => setTab(t)}
          >
            <Text style={[styles.tabText, { color: tab === t ? '#fff' : c.textMuted }]}>
              {t === 'global' ? '🌍 Mondial' : '👥 Amis'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab === 'global' ? (
        globalEntries.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>{isGuest ? '🔒' : '🌍'}</Text>
            <Text style={[styles.emptyTitle, { color: c.text }]}>
              {isGuest ? 'Réservé aux membres' : 'Aucun joueur'}
            </Text>
            <Text style={[styles.emptyText, { color: c.textMuted }]}>
              {isGuest
                ? 'Crée un compte gratuit pour voir le classement mondial et te mesurer aux autres chefs !'
                : 'Sois le premier à rejoindre !'}
            </Text>
            {isGuest && (
              <TouchableOpacity style={[styles.addBtn, { backgroundColor: c.primary }]} onPress={() => router.replace('/(auth)/login')}>
                <Text style={styles.addBtnText}>Créer un compte</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <FlatList
            data={globalEntries}
            keyExtractor={(e) => e.user_id}
            contentContainerStyle={styles.list}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); load(); }} tintColor={c.primary} />
            }
            ItemSeparatorComponent={() => <View style={{ height: Layout.spacing.sm }} />}
            renderItem={({ item, index }) => {
              const rank = index + 1;
              const isSelf = item.user_id === currentUserId;
              const badge = rankBadge(rank);
              const isTopThree = rank <= 3;
              return (
                <View style={[
                  styles.globalRow,
                  { backgroundColor: isSelf ? c.primary + '18' : c.surface, borderColor: isSelf ? c.primary : c.border },
                ]}>
                  <Text style={[styles.rank, isTopThree ? styles.rankMedal : { color: c.textMuted }]}>{badge}</Text>
                  <View style={[styles.avatar, { backgroundColor: c.primary + '30' }]}>
                    <Text style={[styles.avatarText, { color: c.primary }]}>
                      {(item.username ?? '?').charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.globalInfo}>
                    <Text style={[styles.globalName, { color: c.text }]} numberOfLines={1}>
                      {item.username ?? 'Anonyme'}{isSelf ? ' (moi)' : ''}
                    </Text>
                    <Text style={[styles.globalSub, { color: c.textMuted }]}>
                      Niv. {item.level} · 🔥 {item.streak}j
                    </Text>
                  </View>
                  <View style={[styles.xpBadge, { backgroundColor: c.primary + '20' }]}>
                    <Text style={[styles.xpText, { color: c.primary }]}>{item.xp} XP</Text>
                  </View>
                </View>
              );
            }}
          />
        )
      ) : (
        friendEntries.length <= 1 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>👥</Text>
            <Text style={[styles.emptyTitle, { color: c.text }]}>Pas encore d'amis</Text>
            <Text style={[styles.emptyText, { color: c.textMuted }]}>Ajoute des amis pour voir le classement !</Text>
            <TouchableOpacity style={[styles.addBtn, { backgroundColor: c.primary }]} onPress={() => router.push('/friends')}>
              <Text style={styles.addBtnText}>+ Ajouter des amis</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={friendEntries}
            keyExtractor={(e) => e.user_id}
            renderItem={({ item }) => <LeaderboardRow entry={item} />}
            contentContainerStyle={styles.list}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); load(); }} tintColor={c.primary} />
            }
            ItemSeparatorComponent={() => <View style={{ height: Layout.spacing.sm }} />}
          />
        )
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: Layout.spacing.lg },
  title: { fontSize: Layout.fontSize.xxl, fontWeight: '900' },
  friendsBtn: { paddingHorizontal: Layout.spacing.md, paddingVertical: 6, borderRadius: Layout.radius.full },
  friendsBtnText: { fontWeight: '700', fontSize: Layout.fontSize.sm },

  tabs: { flexDirection: 'row', marginHorizontal: Layout.spacing.lg, borderRadius: Layout.radius.full, borderWidth: 1, padding: 4, marginBottom: Layout.spacing.md },
  tabBtn: { flex: 1, paddingVertical: 8, borderRadius: Layout.radius.full, alignItems: 'center' },
  tabText: { fontWeight: '700', fontSize: Layout.fontSize.sm },

  list: { padding: Layout.spacing.lg, paddingBottom: 40 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Layout.spacing.md, padding: Layout.spacing.xl },
  emptyEmoji: { fontSize: 56 },
  emptyTitle: { fontSize: Layout.fontSize.xl, fontWeight: '800' },
  emptyText: { fontSize: Layout.fontSize.md, textAlign: 'center' },
  addBtn: { paddingHorizontal: Layout.spacing.xl, paddingVertical: Layout.spacing.md, borderRadius: Layout.radius.full },
  addBtnText: { color: '#fff', fontWeight: '700', fontSize: Layout.fontSize.md },

  globalRow: { flexDirection: 'row', alignItems: 'center', padding: Layout.spacing.md, borderRadius: Layout.radius.xl, borderWidth: 1, gap: Layout.spacing.sm },
  rank: { width: 36, textAlign: 'center', fontWeight: '800', fontSize: Layout.fontSize.md, color: '#888' },
  rankMedal: { fontSize: 22 },
  avatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontWeight: '900', fontSize: Layout.fontSize.lg },
  globalInfo: { flex: 1 },
  globalName: { fontWeight: '700', fontSize: Layout.fontSize.md },
  globalSub: { fontSize: Layout.fontSize.xs, marginTop: 2 },
  xpBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: Layout.radius.full },
  xpText: { fontWeight: '800', fontSize: Layout.fontSize.sm },
});
