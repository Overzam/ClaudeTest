import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useThemeStore } from '@/stores/themeStore';
import { DuoCuistot } from '@/components/mascot/DuoCuistot';

export function LoadingScreen() {
  const { theme } = useThemeStore();
  const c = theme.colors;
  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <DuoCuistot size={110} animate />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
