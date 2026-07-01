import React, { useEffect, useRef } from 'react';
import { Animated, Modal, Pressable, StyleSheet, Text } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';
import { playSound } from '@/services/soundService';
import type { Badge } from '@/types/database.types';

interface Props {
  badge: Badge | null;
  onClose: () => void;
}

export function NewBadgeModal({ badge, onClose }: Props) {
  const { theme } = useThemeStore();
  const c = theme.colors;
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (badge) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      playSound('badgeUnlock');
      Animated.parallel([
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 60, friction: 7 }),
        Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();
    } else {
      scale.setValue(0);
      opacity.setValue(0);
    }
  }, [badge]);

  if (!badge) return null;

  return (
    <Modal transparent animationType="none" visible={!!badge}>
      <Animated.View style={[styles.backdrop, { opacity }]}>
        <Animated.View style={[styles.card, { backgroundColor: c.surface, transform: [{ scale }] }]}>
          <Text style={[styles.newText, { color: c.secondary }]}>Nouveau badge !</Text>
          <Text style={styles.emoji}>{badge.emoji}</Text>
          <Text style={[styles.title, { color: c.text }]}>{badge.title}</Text>
          <Text style={[styles.desc, { color: c.textMuted }]}>{badge.description}</Text>
          <Pressable
            collapsable={false}
            style={({ pressed }) => [styles.btn, { backgroundColor: c.primary }, pressed && { opacity: 0.85 }]}
            onPress={onClose}
            hitSlop={12}
            android_ripple={{ color: '#ffffff30' }}
          >
            <Text style={styles.btnText} pointerEvents="none">Super !</Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.xl,
    alignItems: 'center',
    gap: Layout.spacing.sm,
    margin: Layout.spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  newText: { fontSize: Layout.fontSize.sm, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  emoji: { fontSize: 64, marginVertical: Layout.spacing.sm },
  title: { fontSize: Layout.fontSize.xl, fontWeight: '900' },
  desc: { fontSize: Layout.fontSize.sm, textAlign: 'center' },
  btn: {
    marginTop: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.xl,
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.radius.full,
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: Layout.fontSize.md },
});
