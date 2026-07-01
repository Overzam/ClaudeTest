import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { Skeleton } from '@/components/ui/Skeleton';
import { Layout } from '@/constants/Layout';

export function HomeSkeleton() {
  return (
    <ScreenWrapper>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={{ gap: 8 }}>
            <Skeleton width={160} height={22} />
            <Skeleton width={120} height={14} />
          </View>
          <Skeleton width={44} height={44} borderRadius={22} />
        </View>

        <Skeleton height={10} borderRadius={5} />

        <Skeleton height={90} borderRadius={Layout.radius.xl} />

        <Skeleton height={70} borderRadius={Layout.radius.xl} />

        <Skeleton width={140} height={18} style={{ marginTop: Layout.spacing.md }} />
        <View style={styles.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} width="30%" height={100} borderRadius={Layout.radius.lg} />
          ))}
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: { padding: Layout.spacing.lg, gap: Layout.spacing.lg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Layout.spacing.md },
});
