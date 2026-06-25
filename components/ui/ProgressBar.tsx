import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';

interface Props {
  progress: number; // 0 to 1
  color?: string;
  style?: ViewStyle;
}

export function ProgressBar({ progress, color = Colors.primary, style }: Props) {
  const anim = useRef(new Animated.Value(progress)).current;

  useEffect(() => {
    Animated.timing(anim, { toValue: progress, duration: 300, useNativeDriver: false }).start();
  }, [progress]);

  const width = anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View style={[styles.track, style]}>
      <Animated.View style={[styles.fill, { width, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 12, borderRadius: 6, backgroundColor: Colors.border, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 6 },
});
