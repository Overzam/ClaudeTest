import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';

interface Props {
  progress: number;
  color?: string;
  style?: ViewStyle;
}

export function ProgressBar({ progress, color, style }: Props) {
  const { theme } = useThemeStore();
  const anim = useRef(new Animated.Value(progress)).current;

  useEffect(() => {
    Animated.timing(anim, { toValue: progress, duration: 300, useNativeDriver: false }).start();
  }, [progress]);

  const width = anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  const fillColor = color ?? theme.colors.primary;

  return (
    <View style={[styles.track, { backgroundColor: theme.colors.border }, style]}>
      <Animated.View style={[styles.fill, { width, backgroundColor: fillColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 12, borderRadius: Layout.radius.full, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: Layout.radius.full },
});
