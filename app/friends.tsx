import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { Avatar } from '@/components/ui/Avatar';
import { useThemeStore } from '@/stores/themeStore';
import { useAuthStore } from '@/stores/authStore';
import { Layout } from '@/constants/Layout';
import {
  searchUsers,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  removeFriend,
  fetchFriends,
  fetchPendingRequests,
  getFriendshipStatus,
  fetchLeaderboard,
} from '@/services/friendService';
import type { UserProfile, LeaderboardEntry } from '@/types/database.types';

type Tab = 'friends' | 'leaderboard';

export default function FriendsScreen() {
  const { session } = useAuthStore();
  const { theme } = useThemeStore();
  const c = theme.colors;
  const userId = session?.user.id ?? '';

  const [tab, setTab] = useState<Tab>('friends');
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [searching, setSearching] = useState(false);
  const [friends, setFriends] = useState<{ id: string; user: UserProfile }[]>([]);
  const [pending, setPending] = useState<{ id: string; user: UserProfile }[]>([]);
  const [statusMap, setStatusMap] = useState<Record<string, string>>({});
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loadingLb, setLoadingLb] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadFriends();
    }, [userId])
  );

  async function loadFriends() {
    const [friendList, pendingList] = await Promise.all([
      fetchFriends(userId),
      fetchPendingRequests(userId),
    ]);
    setFriends(
      friendList.map((f) => ({
        id: f.id,
        user: f.requester_id === userId ? f.addressee : f.requester,
      }))
    );
    setPending(pendingList.map((f) => ({ id: f.id, user: f.requester })));
  }

  async function loadLeaderboard() {
    if (leaderboard.length > 0) return;
    setLoadingLb(true);
    const lb = await fetchLeaderboard(userId);
    setLeaderboard(lb);
    setLoadingLb(false);
  }

  function switchTab(t: Tab) {
    setTab(t);
    if (t === 'leaderboard') loadLeaderboard();
  }

  async function handleSearch(text: string) {
    setQuery(text);
    if (text.length < 2) { setSearchResults([]); return; }
    setSearching(true);
    const results = await searchUsers(text, userId);
    const statuses: Record<string, string> = {};
    await Promise.all(results.map(async (u) => {
      const f = await getFriendshipStatus(userId, u.id);
      if (!f) statuses[u.id] = 'none';
      else if (f.status === 'accepted') statuses[u.id] = 'friend';
      else if (f.requester_id === userId) statuses[u.id] = 'pending_sent';
      else statuses[u.id] = 'pending_received';
    }));
    setStatusMap(statuses);
    setSearchResults(results);
    setSearching(false);
  }

  async function handleAdd(targetId: string) {
    await sendFriendRequest(userId, targetId);
    setStatusMap((s) => ({ ...s, [targetId]: 'pending_sent' }));
  }

  async function handleAccept(friendshipId: string, targetId: string) {
    await acceptFriendRequest(friendshipId);
    setPending((p) => p.filter((f) => f.id !== friendshipId));
    setStatusMap((s) => ({ ...s, [targetId]: 'friend' }));
    loadFriends();
  }

  async function handleDecline(friendshipId: string) {
    await declineFriendRequest(friendshipId);
    setPending((p) => p.filter((f) => f.id !== friendshipId));
  }

  async function handleRemove(friendshipId: string) {
    await removeFriend(friendshipId);
    setFriends((f) => f.filter((fr) => fr.id !== friendshipId));
  }

  return (
    <ScreenWrapper>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color={c.primary} />
        </TouchableOpacity>
        <Ionicons name="people" size={22} color={c.primary} />
        <Text style={[styles.title, { color: c.text }]}>Amis</Text>
        {pending.length > 0 && (
          <View style={[styles.pendingBadge, { backgroundColor: '#ef4444' }]}>
            <Text style={styles.pendingBadgeText}>{pending.length}</Text>
          </View>
        )}
      </View>

      {/* Tab bar */}
      <View style={[styles.tabs, { borderBottomColor: c.border }]}>
        {(['friends', 'leaderboard'] as Tab[]).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tabBtn, tab === t && { borderBottomColor: c.primary, borderBottomWidth: 2 }]}
            onPress={() => switchTab(t)}
          >
            <Ionicons
              name={t === 'friends' ? 'people' : 'podium'}
              size={16}
              color={tab === t ? c.primary : c.textMuted}
            />
            <Text style={[styles.tabLabel, { color: tab === t ? c.primary : c.textMuted }]}>
              {t === 'friends' ? `Amis (${friends.length})` : 'Classement'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab === 'friends' ? (
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {/* Search */}
          <View style={[styles.searchBar, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
            <Ionicons name="search" size={16} color={c.textMuted} />
            <TextInput
              style={[styles.searchInput, { color: c.text }]}
              placeholder="Rechercher un joueur par pseudo…"
              value={query}
              onChangeText={handleSearch}
              placeholderTextColor={c.textMuted}
              autoCapitalize="none"
            />
            {searching && <ActivityIndicator size="small" color={c.primary} />}
            {query.length > 0 && !searching && (
              <TouchableOpacity onPress={() => { setQuery(''); setSearchResults([]); }} hitSlop={8}>
                <Ionicons name="close-circle" size={18} color={c.textMuted} />
              </TouchableOpacity>
            )}
          </View>

          {/* Search results */}
          {searchResults.length > 0 && (
            <View style={[styles.section, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
              <Text style={[styles.sectionTitle, { color: c.text }]}>Résultats de recherche</Text>
              {searchResults.map((u) => (
                <UserRow
                  key={u.id}
                  user={u}
                  status={statusMap[u.id] as any ?? 'none'}
                  onPress={() => router.push(`/user/${u.id}` as any)}
                  onAdd={() => handleAdd(u.id)}
                  c={c}
                />
              ))}
            </View>
          )}

          {/* Pending requests */}
          {pending.length > 0 && (
            <View style={[styles.section, { backgroundColor: '#ef444410', borderColor: '#ef444430' }]}>
              <View style={styles.sectionRow}>
                <Ionicons name="mail" size={16} color="#ef4444" />
                <Text style={[styles.sectionTitle, { color: '#ef4444', marginBottom: 0 }]}>
                  Demandes reçues ({pending.length})
                </Text>
              </View>
              {pending.map((f) => (
                <UserRow
                  key={f.id}
                  user={f.user}
                  status="pending_received"
                  onPress={() => router.push(`/user/${f.user.id}` as any)}
                  onAccept={() => handleAccept(f.id, f.user.id)}
                  onDecline={() => handleDecline(f.id)}
                  c={c}
                />
              ))}
            </View>
          )}

          {/* Friends list */}
          {friends.length > 0 ? (
            <View style={[styles.section, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
              <Text style={[styles.sectionTitle, { color: c.text }]}>Mes amis</Text>
              {friends.map((f) => (
                <UserRow
                  key={f.id}
                  user={f.user}
                  status="friend"
                  onPress={() => router.push(`/user/${f.user.id}` as any)}
                  onRemove={() => handleRemove(f.id)}
                  c={c}
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>👨‍🍳</Text>
              <Text style={[styles.emptyTitle, { color: c.text }]}>Pas encore d'amis</Text>
              <Text style={[styles.emptyText, { color: c.textMuted }]}>
                Recherche des joueurs par pseudo pour les ajouter. Vous verrez vos XP respectifs dans le classement !
              </Text>
            </View>
          )}
        </ScrollView>
      ) : (
        /* Leaderboard tab */
        loadingLb ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={c.primary} />
          </View>
        ) : leaderboard.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🏆</Text>
            <Text style={[styles.emptyTitle, { color: c.text }]}>Classement vide</Text>
            <Text style={[styles.emptyText, { color: c.textMuted }]}>
              Ajoute des amis pour les voir apparaître dans le classement hebdomadaire.
            </Text>
          </View>
        ) : (
          <FlatList
            data={leaderboard}
            keyExtractor={(r) => r.user_id}
            contentContainerStyle={styles.lbList}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[
                  styles.lbRow,
                  { backgroundColor: item.isMe ? c.primary + '15' : c.surfaceElevated, borderColor: item.isMe ? c.primary + '40' : c.border },
                ]}
                onPress={() => router.push(`/user/${item.user_id}` as any)}
                activeOpacity={0.8}
              >
                <Text style={[styles.lbRank, { color: index < 3 ? ['#f59e0b', '#6b7280', '#b45309'][index] : c.textMuted }]}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                </Text>
                <Avatar name={item.username} uri={item.avatar_url} size={40} />
                <View style={styles.lbInfo}>
                  <Text style={[styles.lbName, { color: c.text }]} numberOfLines={1}>
                    {item.username}{item.isMe ? ' (toi)' : ''}
                  </Text>
                  <View style={styles.lbMeta}>
                    <Ionicons name="flame" size={12} color="#f97316" />
                    <Text style={[styles.lbMetaText, { color: c.textMuted }]}>{item.streak_days}j</Text>
                    <Text style={[styles.lbMetaText, { color: c.textMuted }]}>· Niv.{item.level}</Text>
                  </View>
                </View>
                <Text style={[styles.lbXp, { color: c.primary }]}>{item.xp} XP</Text>
              </TouchableOpacity>
            )}
          />
        )
      )}
    </ScreenWrapper>
  );
}

interface UserRowProps {
  user: UserProfile;
  status: 'none' | 'pending_sent' | 'pending_received' | 'friend';
  onPress: () => void;
  onAdd?: () => void;
  onAccept?: () => void;
  onDecline?: () => void;
  onRemove?: () => void;
  c: any;
}

function UserRow({ user, status, onPress, onAdd, onAccept, onDecline, onRemove, c }: UserRowProps) {
  return (
    <TouchableOpacity style={styles.userRow} onPress={onPress} activeOpacity={0.8}>
      <Avatar name={user.username} uri={user.avatar_url} size={44} />
      <View style={styles.userInfo}>
        <Text style={[styles.userName, { color: c.text }]} numberOfLines={1}>{user.username}</Text>
        <Text style={[styles.userSub, { color: c.textMuted }]}>Voir le profil →</Text>
      </View>
      <View style={styles.userActions}>
        {status === 'none' && (
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: c.primary }]} onPress={onAdd}>
            <Ionicons name="person-add" size={14} color="#fff" />
            <Text style={styles.actionBtnText}>Ajouter</Text>
          </TouchableOpacity>
        )}
        {status === 'pending_sent' && (
          <View style={[styles.actionBtnOutline, { borderColor: c.border }]}>
            <Text style={[styles.actionOutlineText, { color: c.textMuted }]}>En attente</Text>
          </View>
        )}
        {status === 'pending_received' && (
          <>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#22c55e' }]} onPress={onAccept}>
              <Ionicons name="checkmark" size={14} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtnOutline, { borderColor: '#ef4444' }]} onPress={onDecline}>
              <Ionicons name="close" size={14} color="#ef4444" />
            </TouchableOpacity>
          </>
        )}
        {status === 'friend' && (
          <TouchableOpacity style={[styles.actionBtnOutline, { borderColor: c.border }]} onPress={onRemove}>
            <Text style={[styles.actionOutlineText, { color: c.textMuted }]}>Retirer</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
    padding: Layout.spacing.lg,
    borderBottomWidth: 1,
  },
  title: { flex: 1, fontSize: Layout.fontSize.xl, fontWeight: '900' },
  pendingBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendingBadgeText: { color: '#fff', fontSize: 11, fontWeight: '800' },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: Layout.spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabLabel: { fontSize: Layout.fontSize.sm, fontWeight: '700' },
  content: { padding: Layout.spacing.md, gap: Layout.spacing.md, paddingBottom: 40 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Layout.radius.full,
    borderWidth: 1,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: 10,
    gap: Layout.spacing.sm,
  },
  searchInput: { flex: 1, fontSize: Layout.fontSize.md },
  section: {
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.md,
    gap: Layout.spacing.sm,
    borderWidth: 1,
  },
  sectionRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  sectionTitle: { fontSize: Layout.fontSize.sm, fontWeight: '800', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  userRow: { flexDirection: 'row', alignItems: 'center', gap: Layout.spacing.sm, paddingVertical: Layout.spacing.sm },
  userInfo: { flex: 1 },
  userName: { fontSize: Layout.fontSize.md, fontWeight: '700' },
  userSub: { fontSize: Layout.fontSize.xs, marginTop: 1 },
  userActions: { flexDirection: 'row', gap: Layout.spacing.sm },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 6, borderRadius: Layout.radius.full },
  actionBtnText: { color: '#fff', fontWeight: '700', fontSize: Layout.fontSize.xs },
  actionBtnOutline: { borderWidth: 1.5, paddingHorizontal: 10, paddingVertical: 6, borderRadius: Layout.radius.full, alignItems: 'center', justifyContent: 'center' },
  actionOutlineText: { fontWeight: '600', fontSize: Layout.fontSize.xs },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Layout.spacing.xl, gap: Layout.spacing.md },
  emptyEmoji: { fontSize: 56 },
  emptyTitle: { fontSize: Layout.fontSize.xl, fontWeight: '800', textAlign: 'center' },
  emptyText: { fontSize: Layout.fontSize.md, textAlign: 'center', lineHeight: 22 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  lbList: { padding: Layout.spacing.md, gap: Layout.spacing.sm, paddingBottom: 40 },
  lbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
    padding: Layout.spacing.md,
    borderRadius: Layout.radius.xl,
    borderWidth: 1,
  },
  lbRank: { width: 32, fontSize: Layout.fontSize.md, fontWeight: '800', textAlign: 'center' },
  lbInfo: { flex: 1 },
  lbName: { fontSize: Layout.fontSize.md, fontWeight: '700' },
  lbMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  lbMetaText: { fontSize: Layout.fontSize.xs, fontWeight: '600' },
  lbXp: { fontSize: Layout.fontSize.md, fontWeight: '800' },
});
