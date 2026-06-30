import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { Avatar } from '@/components/ui/Avatar';
import { BadgeCard } from '@/components/gamification/BadgeCard';
import { useThemeStore } from '@/stores/themeStore';
import { useAuthStore } from '@/stores/authStore';
import { Layout } from '@/constants/Layout';
import { fetchPublicProfile, type PublicProfile } from '@/services/profileService';
import {
  sendFriendRequest,
  getFriendshipStatus,
  acceptFriendRequest,
  removeFriend,
} from '@/services/friendService';

export default function UserProfileScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const { theme } = useThemeStore();
  const { session } = useAuthStore();
  const c = theme.colors;

  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [friendStatus, setFriendStatus] = useState<'none' | 'pending_sent' | 'pending_received' | 'friend'>('none');
  const [friendshipId, setFriendshipId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const myId = session?.user.id ?? '';
  const isMe = userId === myId;

  useEffect(() => {
    if (!userId) return;
    loadProfile();
  }, [userId]);

  async function loadProfile() {
    setLoading(true);
    const [pub, friendship] = await Promise.all([
      fetchPublicProfile(userId),
      isMe ? Promise.resolve(null) : getFriendshipStatus(myId, userId),
    ]);
    setProfile(pub);
    if (friendship) {
      setFriendshipId(friendship.id);
      if (friendship.status === 'accepted') setFriendStatus('friend');
      else if (friendship.requester_id === myId) setFriendStatus('pending_sent');
      else setFriendStatus('pending_received');
    }
    setLoading(false);
  }

  async function handleFriendAction() {
    setActionLoading(true);
    try {
      if (friendStatus === 'none') {
        await sendFriendRequest(myId, userId);
        setFriendStatus('pending_sent');
      } else if (friendStatus === 'pending_received' && friendshipId) {
        await acceptFriendRequest(friendshipId);
        setFriendStatus('friend');
      } else if (friendStatus === 'friend' && friendshipId) {
        await removeFriend(friendshipId);
        setFriendStatus('none');
        setFriendshipId(null);
      }
    } finally {
      setActionLoading(false);
    }
  }

  if (loading) {
    return (
      <ScreenWrapper>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={c.primary} />
        </View>
      </ScreenWrapper>
    );
  }

  if (!profile) {
    return (
      <ScreenWrapper>
        <View style={styles.center}>
          <Text style={[styles.notFound, { color: c.textMuted }]}>Profil introuvable</Text>
        </View>
      </ScreenWrapper>
    );
  }

  const { user, stats, badges, recentLessons } = profile;

  const friendBtnConfig = {
    none: { label: 'Ajouter', icon: 'person-add' as const, color: c.primary },
    pending_sent: { label: 'Demande envoyée', icon: 'time-outline' as const, color: c.textMuted },
    pending_received: { label: 'Accepter', icon: 'checkmark-circle' as const, color: '#22c55e' },
    friend: { label: 'Amis ✓', icon: 'people' as const, color: c.primary },
  }[friendStatus];

  return (
    <ScreenWrapper>
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color={c.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]} numberOfLines={1}>
          {user.username}
        </Text>
        {isMe && (
          <TouchableOpacity onPress={() => router.push('/edit-profile')} hitSlop={8}>
            <Ionicons name="create-outline" size={22} color={c.primary} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <LinearGradient colors={[c.primary + '25', c.secondary + '10']} style={styles.hero}>
          <Avatar name={user.username} uri={user.avatar_url} size={90} />
          <Text style={[styles.username, { color: c.text }]}>{user.username}</Text>
          {stats && (
            <View style={[styles.levelPill, { backgroundColor: c.primary }]}>
              <Text style={styles.levelPillText}>Niv. {stats.level}</Text>
            </View>
          )}
          {!isMe && (
            <TouchableOpacity
              style={[styles.friendBtn, { backgroundColor: friendBtnConfig.color + (friendStatus === 'pending_sent' ? '20' : ''), borderColor: friendBtnConfig.color }]}
              onPress={handleFriendAction}
              disabled={actionLoading || friendStatus === 'pending_sent'}
              activeOpacity={0.8}
            >
              {actionLoading ? (
                <ActivityIndicator size="small" color={friendStatus === 'pending_sent' ? c.textMuted : '#fff'} />
              ) : (
                <>
                  <Ionicons name={friendBtnConfig.icon} size={16} color={friendStatus === 'pending_sent' ? c.textMuted : '#fff'} />
                  <Text style={[styles.friendBtnText, { color: friendStatus === 'pending_sent' ? c.textMuted : '#fff' }]}>
                    {friendBtnConfig.label}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          )}
        </LinearGradient>

        {/* Stats row */}
        {stats && (
          <View style={styles.statsRow}>
            {[
              { icon: 'flame', value: `${stats.streak_days}j`, label: 'Série', color: '#f97316' },
              { icon: 'school', value: stats.lessons_completed, label: 'Leçons', color: c.primary },
              { icon: 'star', value: `${stats.xp}`, label: 'XP', color: '#f59e0b' },
            ].map(({ icon, value, label, color }) => (
              <View key={label} style={[styles.statCard, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
                <Ionicons name={icon as any} size={20} color={color} />
                <Text style={[styles.statValue, { color: c.text }]}>{value}</Text>
                <Text style={[styles.statLabel, { color: c.textMuted }]}>{label}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Badges */}
        {badges.length > 0 && (
          <View>
            <Text style={[styles.sectionTitle, { color: c.text }]}>
              Badges ({badges.length})
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.badgeRow}>
              {badges.map((ub) => (
                <BadgeCard key={ub.id} badge={ub.badge!} earned earnedAt={ub.earned_at} />
              ))}
            </ScrollView>
          </View>
        )}

        {/* Recent activity */}
        {recentLessons.length > 0 && (
          <View style={[styles.activityCard, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
            <View style={styles.activityHeader}>
              <Ionicons name="time-outline" size={16} color={c.primary} />
              <Text style={[styles.sectionTitle, { color: c.text, marginBottom: 0 }]}>Activité récente</Text>
            </View>
            {recentLessons.map((l, i) => (
              <View key={i} style={[styles.activityRow, i < recentLessons.length - 1 && { borderBottomWidth: 1, borderBottomColor: c.border }]}>
                <View style={[styles.activityDot, { backgroundColor: c.primary + '20' }]}>
                  <Ionicons name="checkmark" size={12} color={c.primary} />
                </View>
                <Text style={[styles.activityText, { color: c.textMuted }]}>
                  Leçon complétée · {new Date(l.completed_at ?? '').toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                </Text>
              </View>
            ))}
          </View>
        )}

        {badges.length === 0 && recentLessons.length === 0 && (
          <View style={styles.emptyActivity}>
            <Text style={styles.emptyEmoji}>🍳</Text>
            <Text style={[styles.emptyText, { color: c.textMuted }]}>
              {isMe ? 'Commence des leçons pour remplir ton profil !' : 'Aucune activité récente.'}
            </Text>
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFound: { fontSize: Layout.fontSize.md },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.md,
    padding: Layout.spacing.lg,
    borderBottomWidth: 1,
  },
  headerTitle: { flex: 1, fontSize: Layout.fontSize.lg, fontWeight: '800' },
  content: { padding: Layout.spacing.lg, gap: Layout.spacing.md, paddingBottom: 48 },
  hero: {
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.xl,
    alignItems: 'center',
    gap: Layout.spacing.sm,
  },
  username: { fontSize: Layout.fontSize.xl, fontWeight: '800', marginTop: 4 },
  levelPill: { paddingHorizontal: Layout.spacing.md, paddingVertical: 4, borderRadius: 20 },
  levelPillText: { color: '#fff', fontWeight: '800', fontSize: Layout.fontSize.sm },
  friendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.sm + 2,
    borderRadius: Layout.radius.full,
    borderWidth: 1.5,
    marginTop: Layout.spacing.sm,
  },
  friendBtnText: { fontWeight: '700', fontSize: Layout.fontSize.sm },
  statsRow: { flexDirection: 'row', gap: Layout.spacing.sm },
  statCard: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    padding: Layout.spacing.md,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
  },
  statValue: { fontSize: Layout.fontSize.lg, fontWeight: '800' },
  statLabel: { fontSize: Layout.fontSize.xs, fontWeight: '600' },
  sectionTitle: { fontSize: Layout.fontSize.md, fontWeight: '700', marginBottom: Layout.spacing.sm },
  badgeRow: { gap: Layout.spacing.sm, paddingVertical: 4 },
  activityCard: {
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.md,
    borderWidth: 1,
    gap: Layout.spacing.sm,
  },
  activityHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  activityRow: { flexDirection: 'row', alignItems: 'center', gap: Layout.spacing.sm, paddingVertical: Layout.spacing.sm },
  activityDot: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  activityText: { fontSize: Layout.fontSize.sm, flex: 1 },
  emptyActivity: { alignItems: 'center', gap: Layout.spacing.sm, paddingVertical: Layout.spacing.xl },
  emptyEmoji: { fontSize: 40 },
  emptyText: { fontSize: Layout.fontSize.sm, textAlign: 'center' },
});
