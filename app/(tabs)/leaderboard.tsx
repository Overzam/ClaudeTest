import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useAuthStore } from '@/stores/authStore';
import { useGameStore } from '@/stores/gameStore';

export default function LeaderboardScreen() {
  const { user } = useAuthStore();
  const { xp, level } = useGameStore();

  return (
    <ScreenWrapper>
      <View style={styles.content}>
        <Text style={styles.title}>🏆 Classement</Text>
        <Text style={styles.subtitle}>Cette semaine</Text>

        <Card style={styles.myRank}>
          <Avatar name={user?.username} size={40} />
          <View style={styles.rankInfo}>
            <Text style={styles.username}>{user?.username ?? 'Toi'}</Text>
            <Text style={styles.xpText}>{xp} XP · Niveau {level}</Text>
          </View>
          <Text style={styles.medal}>🥇</Text>
        </Card>

        <Text style={styles.comingSoon}>
          Le classement entre amis arrive bientôt !{'\n'}Invite tes amis pour te mesurer à eux.
        </Text>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, padding: Layout.spacing.lg, gap: Layout.spacing.md },
  title: { fontSize: Layout.fontSize.xxl, fontWeight: '900', color: Colors.text },
  subtitle: { fontSize: Layout.fontSize.md, color: Colors.textMuted },
  myRank: { flexDirection: 'row', alignItems: 'center', gap: Layout.spacing.md },
  rankInfo: { flex: 1 },
  username: { fontSize: Layout.fontSize.md, fontWeight: '700', color: Colors.text },
  xpText: { fontSize: Layout.fontSize.sm, color: Colors.textMuted },
  medal: { fontSize: 28 },
  comingSoon: {
    textAlign: 'center',
    color: Colors.textMuted,
    fontSize: Layout.fontSize.md,
    lineHeight: 24,
    marginTop: Layout.spacing.xl,
  },
});
