import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { BadgeCard } from '@/components/gamification/BadgeCard';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';
import { useAuthStore } from '@/stores/authStore';
import { useBadgeStore } from '@/stores/badgeStore';
import { fetchAllBadges } from '@/services/badgeService';
import type { Badge } from '@/types/database.types';

export default function BadgesScreen() {
  const { session } = useAuthStore();
  const { userBadges, loadBadges } = useBadgeStore();
  const [allBadges, setAllBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useThemeStore();
  const c = theme.colors;

  useFocusEffect(
    useCallback(() => {
      if (!session?.user.id) return;
      Promise.all([fetchAllBadges(), loadBadges(session.user.id)]).then(([badges]) => {
        setAllBadges(badges);
        setLoading(false);
      });
    }, [session?.user.id])
  );

  const earnedMap = Object.fromEntries(userBadges.map((ub) => [ub.badge_id, ub]));
  const earnedCount = userBadges.length;

  if (loading) return <LoadingScreen />;

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.back, { color: c.primary }]}>← Retour</Text>
        </TouchableOpacity>
        <View>
          <Text style={[styles.title, { color: c.text }]}>Trophées</Text>
          <Text style={[styles.count, { color: c.textMuted }]}>{earnedCount}/{allBadges.length} obtenus</Text>
        </View>
      </View>
      <FlatList
        data={allBadges}
        keyExtractor={(b) => b.id}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => {
          const ub = earnedMap[item.id];
          return <BadgeCard badge={item} earned={!!ub} earnedAt={ub?.earned_at} />;
        }}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: Layout.spacing.md, padding: Layout.spacing.lg },
  back: { fontWeight: '600', fontSize: Layout.fontSize.md },
  title: { fontSize: Layout.fontSize.xl, fontWeight: '900' },
  count: { fontSize: Layout.fontSize.sm },
  grid: { padding: Layout.spacing.lg, gap: Layout.spacing.md },
  row: { gap: Layout.spacing.md, justifyContent: 'flex-start' },
});
