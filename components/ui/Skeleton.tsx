import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';

interface Props {
  width?: number | `${number}%`;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

/** Animated shimmering placeholder block, used to build skeleton loading screens. */
export function Skeleton({ width = '100%', height = 16, borderRadius = Layout.radius.sm, style }: Props) {
  const { theme } = useThemeStore();
  const c = theme.colors;
  const pulse = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <Animated.View
      style={[
        { width, height, borderRadius, backgroundColor: c.border, opacity: pulse },
        style,
      ]}
    />
  );
}
