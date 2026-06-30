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
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';
import { useAuthStore } from '@/stores/authStore';
import { useGameStore } from '@/stores/gameStore';
import { useBadgeStore } from '@/stores/badgeStore';
import { usePremiumStore } from '@/stores/premiumStore';
import { fetchUserStats } from '@/services/statsService';

export default function ProfileScreen() {
  const { user, session, signOut } = useAuthStore();
  const { xp, level, streakDays, hearts, lessonsCompleted, setStats } = useGameStore();
  const { userBadges, newlyEarned, loadBadges, checkBadges, clearNewlyEarned } = useBadgeStore();
  const { isPremium, coins } = usePremiumStore();
  const { theme } = useThemeStore();
  const c = theme.colors;

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
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: c.primary + '12', borderRadius: Layout.radius.xl }]}>
          <Avatar name={user?.username} size={80} />
          <Text style={[styles.username, { color: c.text }]}>{user?.username ?? '—'}</Text>
          <View style={[styles.levelBadge, { backgroundColor: c.primary }]}>
            <Text style={styles.levelText}>Niv. {level}</Text>
          </View>
        </View>

        <XPBar xp={xp} level={level} />

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
            <StreakBadge streakDays={streakDays} />
            <Text style={[styles.statLabel, { color: c.textMuted }]}>Série</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
            <Text style={[styles.statValue, { color: c.text }]}>{lessonsCompleted}</Text>
            <Text style={[styles.statLabel, { color: c.textMuted }]}>Leçons</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
            <HeartsDisplay hearts={hearts} />
            <Text style={[styles.statLabel, { color: c.textMuted }]}>Vies</Text>
          </View>
        </View>

        {/* XP total */}
        <View style={[styles.xpCard, { backgroundColor: c.xpBlue + '15', borderColor: c.xpBlue + '30', borderWidth: 1, borderRadius: Layout.radius.lg }]}>
          <Text style={[styles.xpTotal, { color: c.xpBlue }]}>{xp} XP</Text>
          <Text style={[styles.xpLabel, { color: c.textSecondary }]}>accumulés depuis le début</Text>
        </View>

        {/* Weekly activity calendar */}
        <WeeklyCalendar streakDays={streakDays} c={c} />

        {/* Actions */}
        <View style={styles.actionGrid}>
          {[
            { emoji: '👥', label: 'Amis', route: '/friends' },
            { emoji: '🏅', label: 'Classement', route: '/leaderboard' },
            { emoji: '🏆', label: `Trophées${userBadges.length > 0 ? ` (${userBadges.length})` : ''}`, route: '/badges' },
            { emoji: isPremium() ? '✨' : '⭐', label: isPremium() ? 'Premium actif' : 'RecipeQuest+', route: '/premium', highlight: isPremium() },
            { emoji: '🛒', label: `Boutique · 🪙${coins}`, route: '/shop' },
            { emoji: '📖', label: 'Carnet de Recettes', route: '/recipe-book' },
            { emoji: '💡', label: 'Astuces & Techniques', route: '/tips' },
            { emoji: '📚', label: 'Glossaire Culinaire', route: '/glossary' },
          ].map(({ emoji, label, route, highlight }) => (
            <TouchableOpacity
              key={route}
              style={[
                styles.actionBtn,
                { backgroundColor: c.surfaceElevated, borderColor: highlight ? c.secondary : c.border },
                highlight && { borderWidth: 2 },
              ]}
              onPress={() => router.push(route as any)}
              activeOpacity={0.8}
            >
              <Text style={styles.actionEmoji}>{emoji}</Text>
              <Text style={[styles.actionLabel, { color: highlight ? c.secondary : c.text }]} numberOfLines={1}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.settingsLink, { backgroundColor: c.surfaceElevated, borderColor: c.border, borderWidth: 1 }]}
          onPress={() => router.push('/settings')}
        >
          <Text style={[styles.settingsText, { color: c.textSecondary }]}>⚙️ Paramètres</Text>
        </TouchableOpacity>

        {/* Recent badges */}
        {recentBadges.length > 0 && (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: c.text }]}>Derniers badges</Text>
              <TouchableOpacity onPress={() => router.push('/badges')}>
                <Text style={[styles.seeAll, { color: c.primary }]}>Voir tout →</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.badgeRow}>
              {recentBadges.map((ub) => (
                <BadgeCard key={ub.id} badge={ub.badge!} earned earnedAt={ub.earned_at} />
              ))}
            </ScrollView>
          </View>
        )}

        <Button label="Se déconnecter" onPress={handleSignOut} variant="ghost" style={styles.signoutBtn} />
      </ScrollView>

      <NewBadgeModal badge={currentNewBadge} onClose={() => clearNewlyEarned()} />
    </ScreenWrapper>
  );
}

const DAY_LABELS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

function WeeklyCalendar({ streakDays, c }: { streakDays: number; c: any }) {
  const today = new Date().getDay(); // 0=Sun..6=Sat → remap to Mon=0
  const todayIdx = today === 0 ? 6 : today - 1;
  return (
    <View style={calStyles.container}>
      <Text style={[calStyles.title, { color: c.text }]}>🔥 Activité de la semaine</Text>
      <View style={calStyles.row}>
        {DAY_LABELS.map((label, i) => {
          const isPast = i <= todayIdx;
          const isToday = i === todayIdx;
          const isActive = isPast && streakDays > todayIdx - i;
          return (
            <View key={i} style={calStyles.dayCol}>
              <View style={[
                calStyles.dot,
                { backgroundColor: isActive ? c.streakOrange : isToday ? c.border : 'transparent', borderColor: isToday ? c.streakOrange : c.border, borderWidth: 1 },
              ]}>
                {isActive && <Text style={calStyles.flame}>🔥</Text>}
              </View>
              <Text style={[calStyles.label, { color: isToday ? c.streakOrange : c.textMuted }]}>{label}</Text>
            </View>
          );
        })}
      </View>
      <Text style={[calStyles.streak, { color: c.streakOrange }]}>
        {streakDays} jour{streakDays > 1 ? 's' : ''} de série !
      </Text>
    </View>
  );
}

const calStyles = StyleSheet.create({
  container: { borderRadius: Layout.radius.xl, padding: Layout.spacing.md, gap: Layout.spacing.sm, backgroundColor: 'transparent', borderWidth: 1, borderColor: 'rgba(255,150,0,0.25)' },
  title: { fontSize: Layout.fontSize.sm, fontWeight: '700', textAlign: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-around' },
  dayCol: { alignItems: 'center', gap: 4 },
  dot: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  flame: { fontSize: 18 },
  label: { fontSize: 11, fontWeight: '600' },
  streak: { fontSize: Layout.fontSize.sm, fontWeight: '800', textAlign: 'center' },
});

const styles = StyleSheet.create({
  content: { padding: Layout.spacing.lg, gap: Layout.spacing.md, paddingBottom: 40 },
  header: { alignItems: 'center', gap: Layout.spacing.sm, paddingVertical: Layout.spacing.xl },
  username: { fontSize: Layout.fontSize.xl, fontWeight: '800' },
  levelBadge: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: 4,
    borderRadius: 20,
  },
  levelText: { color: '#fff', fontWeight: '800', fontSize: Layout.fontSize.sm },
  statsRow: { flexDirection: 'row', gap: Layout.spacing.sm },
  statCard: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    padding: Layout.spacing.md,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
  },
  statValue: { fontSize: Layout.fontSize.xl, fontWeight: '800' },
  statLabel: { fontSize: Layout.fontSize.xs, fontWeight: '600' },
  xpCard: { alignItems: 'center', gap: 4, padding: Layout.spacing.md },
  xpTotal: { fontSize: Layout.fontSize.xl, fontWeight: '800' },
  xpLabel: { fontSize: Layout.fontSize.sm },
  actionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Layout.spacing.sm },
  actionBtn: {
    width: '47%',
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.md,
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
  },
  actionEmoji: { fontSize: 28 },
  actionLabel: { fontSize: Layout.fontSize.sm, fontWeight: '700', textAlign: 'center' },
  settingsLink: {
    alignItems: 'center',
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.radius.lg,
  },
  settingsText: { fontSize: Layout.fontSize.sm, fontWeight: '600' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Layout.spacing.sm },
  sectionTitle: { fontSize: Layout.fontSize.md, fontWeight: '700' },
  seeAll: { fontSize: Layout.fontSize.sm, fontWeight: '600' },
  badgeRow: { gap: Layout.spacing.sm, paddingVertical: 4 },
  signoutBtn: { marginTop: Layout.spacing.lg },
});
