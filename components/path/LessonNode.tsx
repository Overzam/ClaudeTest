import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';
import type { Lesson } from '@/types/database.types';

type Status = 'locked' | 'available' | 'completed';

interface Props {
  lesson: Lesson;
  status: Status;
  pathColor: string;
  onPress: () => void;
}

export function LessonNode({ lesson, status, pathColor, onPress }: Props) {
  const { theme } = useThemeStore();
  const c = theme.colors;
  const isLocked = status === 'locked';
  const isDone = status === 'completed';
  const isNext = status === 'available';
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (toValue: number) => {
    Animated.spring(scale, { toValue, useNativeDriver: true, speed: 30, bounciness: 8 }).start();
  };

  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={onPress}
      onPressIn={() => !isLocked && animateTo(0.88)}
      onPressOut={() => !isLocked && animateTo(1)}
      disabled={isLocked}
      activeOpacity={0.8}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        {isDone ? (
          <LinearGradient
            colors={[pathColor, pathColor + 'BB']}
            style={styles.node}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={[styles.icon, { color: '#fff' }]}>✓</Text>
          </LinearGradient>
        ) : (
          <View
            style={[
              styles.node,
              { backgroundColor: c.surface },
              !isLocked && { borderColor: pathColor, borderWidth: 3 },
              isLocked && { backgroundColor: c.border, shadowOpacity: 0 },
              isNext && { shadowColor: pathColor, shadowOpacity: 0.35, shadowRadius: 10 },
            ]}
          >
            <Text style={[styles.icon, { color: isLocked ? c.textMuted : pathColor }]}>
              {isLocked ? '🔒' : '▶'}
            </Text>
          </View>
        )}
      </Animated.View>
      <Text style={[styles.label, { color: isLocked ? c.textMuted : c.text }]} numberOfLines={2}>
        {lesson.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center', gap: Layout.spacing.xs, width: 80 },
  node: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: { fontSize: 22 },
  label: { fontSize: Layout.fontSize.xs, fontWeight: '600', textAlign: 'center' },
});
