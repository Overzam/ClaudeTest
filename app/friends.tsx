import React, { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { FriendRow } from '@/components/social/FriendRow';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';
import { useAuthStore } from '@/stores/authStore';
import {
  searchUsers,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  removeFriend,
  fetchFriends,
  fetchPendingRequests,
  getFriendshipStatus,
} from '@/services/friendService';
import type { UserProfile } from '@/types/database.types';

export default function FriendsScreen() {
  const { session } = useAuthStore();
  const { theme } = useThemeStore();
  const c = theme.colors;
  const userId = session?.user.id ?? '';

  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [searching, setSearching] = useState(false);
  const [friends, setFriends] = useState<{ id: string; user: UserProfile }[]>([]);
  const [pending, setPending] = useState<{ id: string; user: UserProfile }[]>([]);
  const [statusMap, setStatusMap] = useState<Record<string, string>>({});

  useFocusEffect(useCallback(() => { loadFriends(); }, [userId]));

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

  async function handleSearch(text: string) {
    setQuery(text);
    if (text.length < 2) { setSearchResults([]); return; }
    setSearching(true);
    const results = await searchUsers(text, userId);
    const statuses: Record<string, string> = {};
    for (const u of results) {
      const f = await getFriendshipStatus(userId, u.id);
      if (!f) statuses[u.id] = 'none';
      else if (f.status === 'accepted') statuses[u.id] = 'friend';
      else if (f.requester_id === userId) statuses[u.id] = 'pending_sent';
      else statuses[u.id] = 'pending_received';
    }
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.back, { color: c.primary }]}>← Retour</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: c.text }]}>Amis</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.searchBox}>
          <TextInput
            style={[styles.input, { borderColor: c.border, color: c.text, backgroundColor: c.surface }]}
            placeholder="Rechercher un joueur…"
            value={query}
            onChangeText={handleSearch}
            placeholderTextColor={c.textMuted}
          />
          {searching && <ActivityIndicator size="small" color={c.primary} />}
        </View>

        {searchResults.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: c.text }]}>Résultats</Text>
            {searchResults.map((u) => (
              <FriendRow
                key={u.id}
                user={u}
                status={statusMap[u.id] as never}
                onAdd={() => handleAdd(u.id)}
              />
            ))}
          </View>
        )}

        {pending.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: c.text }]}>Demandes reçues</Text>
            {pending.map((f) => (
              <FriendRow
                key={f.id}
                user={f.user}
                status="pending_received"
                onAccept={() => handleAccept(f.id, f.user.id)}
                onDecline={() => handleDecline(f.id)}
              />
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: c.text }]}>Mes amis ({friends.length})</Text>
          {friends.length === 0 && (
            <Text style={[styles.noFriends, { color: c.textMuted }]}>Aucun ami pour l'instant. Recherche un joueur !</Text>
          )}
          {friends.map((f) => (
            <FriendRow
              key={f.id}
              user={f.user}
              status="friend"
              onRemove={() => handleRemove(f.id)}
            />
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: Layout.spacing.md, padding: Layout.spacing.lg },
  back: { fontWeight: '600', fontSize: Layout.fontSize.md },
  title: { fontSize: Layout.fontSize.xl, fontWeight: '900' },
  content: { padding: Layout.spacing.lg, gap: Layout.spacing.lg },
  searchBox: { flexDirection: 'row', alignItems: 'center', gap: Layout.spacing.sm },
  input: {
    flex: 1,
    borderWidth: 2,
    borderRadius: Layout.radius.md,
    padding: Layout.spacing.md,
    fontSize: Layout.fontSize.md,
  },
  section: { gap: Layout.spacing.xs },
  sectionTitle: { fontSize: Layout.fontSize.md, fontWeight: '800', marginBottom: 4 },
  noFriends: { fontSize: Layout.fontSize.sm, fontStyle: 'italic' },
});
