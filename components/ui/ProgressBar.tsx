import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';

interface Props {
  progress: number;
  color?: string;
  style?: ViewStyle;
  height?: number;
}

export function ProgressBar({ progress, color, style, height = 12 }: Props) {
  const { theme } = useThemeStore();
  const anim = useRef(new Animated.Value(progress)).current;

  useEffect(() => {
    Animated.timing(anim, { toValue: progress, duration: 400, useNativeDriver: false }).start();
  }, [progress]);

  const width = anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  const fillColor = color ?? theme.colors.primary;

  return (
    <View style={[styles.track, { backgroundColor: theme.colors.border, height, borderRadius: height / 2 }, style]}>
      <Animated.View style={{ width, height: '100%', borderRadius: height / 2, overflow: 'hidden' }}>
        <LinearGradient
          colors={[fillColor + 'FF', fillColor + 'CC']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: { overflow: 'hidden' },
});
