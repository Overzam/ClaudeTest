import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';

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
    <TouchableOpacity
      style={[
        styles.base,
        { backgroundColor: bgMap[variant] },
        variant === 'ghost' && { borderWidth: 2, borderColor: c.primary },
        (disabled || loading) && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator color={colorMap[variant]} />
      ) : (
        <Text style={[styles.text, { color: colorMap[variant] }, textStyle]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.xl,
    borderRadius: Layout.radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  disabled: { opacity: 0.5 },
  text: { fontSize: Layout.fontSize.md, fontWeight: '700' },
});
