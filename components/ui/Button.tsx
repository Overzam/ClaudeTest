import React, { useRef } from 'react';
import {
  Animated,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  Pressable,
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

function shade(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000ff) + amount));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function Button({ label, onPress, variant = 'primary', disabled, loading, style, textStyle }: Props) {
  const { theme } = useThemeStore();
  const c = theme.colors;
  const translateY = useRef(new Animated.Value(0)).current;

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

  const bg = bgMap[variant];
  const isFlat = variant === 'ghost';
  const depthColor = isFlat ? 'transparent' : shade(bg, -28);

  const animatePress = (toValue: number) => {
    Animated.spring(translateY, { toValue, useNativeDriver: true, speed: 40, bounciness: 0 }).start();
  };

  return (
    <Animated.View
      style={[
        { borderRadius: Layout.radius.xl, transform: [{ translateY }] },
        !isFlat && { backgroundColor: depthColor },
        style,
      ]}
    >
      <Pressable
        style={({ pressed }) => [
          styles.base,
          { backgroundColor: bg },
          isFlat && { borderWidth: 2, borderColor: c.primary },
          !isFlat && !pressed && styles.lifted,
          (disabled || loading) && styles.disabled,
        ]}
        onPress={onPress}
        onPressIn={() => !isFlat && animatePress(3)}
        onPressOut={() => !isFlat && animatePress(0)}
        disabled={disabled || loading}
      >
        {loading ? (
          <ActivityIndicator color={colorMap[variant]} />
        ) : (
          <Text style={[styles.text, { color: colorMap[variant] }, textStyle]}>{label}</Text>
        )}
      </Pressable>
    </Animated.View>
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
  lifted: { marginBottom: 3 },
  disabled: { opacity: 0.5 },
  text: { fontSize: Layout.fontSize.md, fontWeight: '700' },
});
