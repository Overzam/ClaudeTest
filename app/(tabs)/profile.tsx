import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { XPBar } from '@/components/gamification/XPBar';
import { HeartsDisplay } from '@/components/gamification/HeartsDisplay';
import { StreakBadge } from '@/components/gamification/StreakBadge';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useAuthStore } from '@/stores/authStore';
import { useGameStore } from '@/stores/gameStore';

export default function ProfileScreen() {
  const { user, signOut } = useAuthStore();
  const { xp, level, streakDays, hearts, lessonsCompleted } = useGameStore();

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

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Avatar name={user?.username} size={80} />
          <Text style={styles.username}>{user?.username ?? '—'}</Text>
          <Text style={styles.email}>Niveau {level}</Text>
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

        <Button
          label="Se déconnecter"
          onPress={handleSignOut}
          variant="ghost"
          style={styles.signoutBtn}
        />
      </ScrollView>
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
  email: { fontSize: Layout.fontSize.sm, color: Colors.textMuted },
  statsRow: { flexDirection: 'row', gap: Layout.spacing.sm },
  statCard: { flex: 1, alignItems: 'center', gap: 4 },
  statValue: { fontSize: Layout.fontSize.xl, fontWeight: '800', color: Colors.text },
  statLabel: { fontSize: Layout.fontSize.xs, color: Colors.textMuted, fontWeight: '600' },
  xpCard: { alignItems: 'center', gap: 4 },
  xpTotal: { fontSize: Layout.fontSize.xl, fontWeight: '800', color: Colors.xpBlue },
  xpLabel: { fontSize: Layout.fontSize.sm, color: Colors.textMuted },
  signoutBtn: { marginTop: Layout.spacing.lg },
});
