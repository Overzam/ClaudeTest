import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { Skeleton } from '@/components/ui/Skeleton';
import { Layout } from '@/constants/Layout';

export function ExploreSkeleton() {
  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Skeleton width={120} height={28} />
        <Skeleton height={40} borderRadius={Layout.radius.full} style={{ marginTop: Layout.spacing.sm }} />
      </View>
      <View style={styles.content}>
        <Skeleton width={160} height={16} />
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} height={140} borderRadius={20} />
        ))}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: { padding: Layout.spacing.lg, gap: Layout.spacing.sm },
  content: { padding: Layout.spacing.lg, gap: Layout.spacing.md },
});
