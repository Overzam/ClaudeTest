import React, { useCallback } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { XPBar } from '@/components/gamification/XPBar';
import { HeartsDisplay } from '@/components/gamification/HeartsDisplay';
import { StreakBadge } from '@/components/gamification/StreakBadge';
import { BadgeCard } from '@/components/gamification/BadgeCard';
import { NewBadgeModal } from '@/components/gamification/NewBadgeModal';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useAuthStore } from '@/stores/authStore';
import { useGameStore } from '@/stores/gameStore';
import { useBadgeStore } from '@/stores/badgeStore';
import { fetchUserStats } from '@/services/statsService';

export default function ProfileScreen() {
  const { user, session, signOut } = useAuthStore();
  const { xp, level, streakDays, hearts, lessonsCompleted, setStats } = useGameStore();
  const { userBadges, newlyEarned, loadBadges, checkBadges, clearNewlyEarned } = useBadgeStore();

  useFocusEffect(
    useCallback(() => {
      if (!session?.user.id) return;
      fetchUserStats(session.user.id).then((stats) => {
        if (stats) setStats(stats, session.user.id);
      });
      loadBadges(session.user.id);
      checkBadges(session.user.id);
    }, [session?.user.id])
  );

  async function handleSignOut() {
    Alert.alert('Déconnexion', 'Es-tu sûr de vouloir te déconnecter ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Déconnexion',
        style: 'destructive',
        onPress: async () => {
          await signOut();
          router.replace('/(auth)/login');
        },
      },
    ]);
  }

  const recentBadges = userBadges.slice(0, 6);
  const currentNewBadge = newlyEarned[0] ?? null;

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Avatar name={user?.username} size={80} />
          <Text style={styles.username}>{user?.username ?? '—'}</Text>
          <Text style={styles.level}>Niveau {level}</Text>
        </View>

        <XPBar xp={xp} level={level} />

        <View style={styles.statsRow}>
          <StatCard label="Série" value={<StreakBadge streakDays={streakDays} />} />
          <StatCard label="Leçons" value={<Text style={styles.statValue}>{lessonsCompleted}</Text>} />
          <StatCard label="Vies" value={<HeartsDisplay hearts={hearts} />} />
        </View>

        <Card style={styles.xpCard}>
          <Text style={styles.xpTotal}>{xp} XP total</Text>
          <Text style={styles.xpLabel}>accumulés depuis le début</Text>
        </Card>

        {/* Social */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn} onPress={() => router.push('/friends')}>
            <Text style={styles.socialEmoji}>👥</Text>
            <Text style={styles.socialLabel}>Amis</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn} onPress={() => router.push('/badges')}>
            <Text style={styles.socialEmoji}>🏆</Text>
            <Text style={styles.socialLabel}>Trophées{userBadges.length > 0 ? ` (${userBadges.length})` : ''}</Text>
          </TouchableOpacity>
        </View>

        {/* Recent badges */}
        {recentBadges.length > 0 && (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Derniers badges</Text>
              <TouchableOpacity onPress={() => router.push('/badges')}>
                <Text style={styles.seeAll}>Voir tout →</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.badgeRow}>
              {recentBadges.map((ub) => (
                <BadgeCard key={ub.id} badge={ub.badge!} earned earnedAt={ub.earned_at} />
              ))}
            </ScrollView>
          </View>
        )}

        <Button
          label="Se déconnecter"
          onPress={handleSignOut}
          variant="ghost"
          style={styles.signoutBtn}
        />
      </ScrollView>

      <NewBadgeModal
        badge={currentNewBadge}
        onClose={() => clearNewlyEarned()}
      />
    </ScreenWrapper>
  );
}

function StatCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Card style={styles.statCard}>
      {value}
      <Text style={styles.statLabel}>{label}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  content: { padding: Layout.spacing.lg, gap: Layout.spacing.md },
  header: { alignItems: 'center', gap: Layout.spacing.sm, paddingVertical: Layout.spacing.lg },
  username: { fontSize: Layout.fontSize.xl, fontWeight: '800', color: Colors.text },
  level: { fontSize: Layout.fontSize.sm, color: Colors.textMuted },
  statsRow: { flexDirection: 'row', gap: Layout.spacing.sm },
  statCard: { flex: 1, alignItems: 'center', gap: 4 },
  statValue: { fontSize: Layout.fontSize.xl, fontWeight: '800', color: Colors.text },
  statLabel: { fontSize: Layout.fontSize.xs, color: Colors.textMuted, fontWeight: '600' },
  xpCard: { alignItems: 'center', gap: 4 },
  xpTotal: { fontSize: Layout.fontSize.xl, fontWeight: '800', color: Colors.xpBlue },
  xpLabel: { fontSize: Layout.fontSize.sm, color: Colors.textMuted },
  socialRow: { flexDirection: 'row', gap: Layout.spacing.md },
  socialBtn: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.md,
    alignItems: 'center',
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  socialEmoji: { fontSize: 28 },
  socialLabel: { fontSize: Layout.fontSize.sm, fontWeight: '700', color: Colors.text },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Layout.spacing.sm },
  sectionTitle: { fontSize: Layout.fontSize.md, fontWeight: '700', color: Colors.text },
  seeAll: { fontSize: Layout.fontSize.sm, color: Colors.primary, fontWeight: '600' },
  badgeRow: { gap: Layout.spacing.sm, paddingVertical: 4 },
  signoutBtn: { marginTop: Layout.spacing.lg },
});
