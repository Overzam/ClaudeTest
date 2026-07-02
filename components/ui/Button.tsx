import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';
import { playSound } from '@/services/soundService';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface Props {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({ label, onPress, variant = 'primary', disabled, loading, style, textStyle }: Props) {
  const { theme } = useThemeStore();
  const c = theme.colors;

  const bgMap: Record<Variant, string> = {
    primary: c.primary,
    secondary: c.secondary,
    ghost: 'transparent',
    danger: c.danger,
  };
  const colorMap: Record<Variant, string> = {
    primary: '#fff',
    secondary: c.text,
    ghost: c.primary,
    danger: '#fff',
  };

  return (
    <Pressable
      collapsable={false}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: bgMap[variant] },
        variant === 'ghost' && { borderWidth: 2, borderColor: c.primary },
        (disabled || loading) && styles.disabled,
        pressed && !disabled && !loading && styles.pressed,
        style,
      ]}
      onPress={() => {
        playSound('tap');
        onPress();
      }}
      disabled={disabled || loading}
      hitSlop={12}
      android_ripple={{ color: colorMap[variant] + '30' }}
    >
      {loading ? (
        <ActivityIndicator color={colorMap[variant]} />
      ) : (
        <Text style={[styles.text, { color: colorMap[variant] }, textStyle]} pointerEvents="none">{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.xl,
    borderRadius: Layout.radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.85 },
  text: { fontSize: Layout.fontSize.md, fontWeight: '700' },
});
