import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { LeaderboardRow } from '@/components/social/LeaderboardRow';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useAuthStore } from '@/stores/authStore';
import { fetchLeaderboard } from '@/services/friendService';
import type { LeaderboardEntry } from '@/types/database.types';

export default function LeaderboardScreen() {
  const { session } = useAuthStore();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function load() {
    if (!session?.user.id) return;
    const data = await fetchLeaderboard(session.user.id);
    setEntries(data);
    setLoading(false);
    setRefreshing(false);
  }

  useFocusEffect(useCallback(() => { load(); }, [session?.user.id]));

  if (loading) return <LoadingScreen />;

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={styles.title}>🏆 Classement</Text>
        <TouchableOpacity onPress={() => router.push('/friends')} style={styles.friendsBtn}>
          <Text style={styles.friendsBtnText}>Amis</Text>
        </TouchableOpacity>
      </View>
      {entries.length <= 1 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>👥</Text>
          <Text style={styles.emptyTitle}>Pas encore d'amis</Text>
          <Text style={styles.emptyText}>Ajoute des amis pour voir le classement !</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => router.push('/friends')}>
            <Text style={styles.addBtnText}>+ Ajouter des amis</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(e) => e.user_id}
          renderItem={({ item }) => <LeaderboardRow entry={item} />}
          contentContainerStyle={styles.list}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); load(); }} />}
          ItemSeparatorComponent={() => <View style={{ height: Layout.spacing.sm }} />}
        />
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: Layout.spacing.lg },
  title: { fontSize: Layout.fontSize.xxl, fontWeight: '900', color: Colors.text },
  friendsBtn: { backgroundColor: Colors.primary + '15', paddingHorizontal: Layout.spacing.md, paddingVertical: 6, borderRadius: Layout.radius.full },
  friendsBtnText: { color: Colors.primary, fontWeight: '700', fontSize: Layout.fontSize.sm },
  list: { padding: Layout.spacing.lg, gap: Layout.spacing.sm },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Layout.spacing.md, padding: Layout.spacing.xl },
  emptyEmoji: { fontSize: 56 },
  emptyTitle: { fontSize: Layout.fontSize.xl, fontWeight: '800', color: Colors.text },
  emptyText: { fontSize: Layout.fontSize.md, color: Colors.textMuted, textAlign: 'center' },
  addBtn: { backgroundColor: Colors.primary, paddingHorizontal: Layout.spacing.xl, paddingVertical: Layout.spacing.md, borderRadius: Layout.radius.full },
  addBtnText: { color: '#fff', fontWeight: '700', fontSize: Layout.fontSize.md },
});
