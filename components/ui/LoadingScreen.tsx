import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useThemeStore } from '@/stores/themeStore';

export function LoadingScreen() {
  const { theme } = useThemeStore();
  const c = theme.colors;
  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <ActivityIndicator size="large" color={c.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
