import React from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useThemeStore } from '@/stores/themeStore';

interface Props {
  uri?: string | null;
  name?: string;
  size?: number;
  style?: ViewStyle;
}

export function Avatar({ uri, name, size = 48, style }: Props) {
  const { theme } = useThemeStore();
  const initials = name
    ? name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
    : '?';

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[{ width: size, height: size, borderRadius: size / 2 }, style]}
      />
    );
  }

  return (
    <View
      style={[
        styles.fallback,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: theme.colors.primary },
        style,
      ]}
    >
      <Text style={[styles.initials, { fontSize: size * 0.35 }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: { alignItems: 'center', justifyContent: 'center' },
  initials: { color: '#fff', fontWeight: '700' },
});
