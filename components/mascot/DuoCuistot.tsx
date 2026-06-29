import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View, ViewStyle } from 'react-native';

interface Props {
  size?: number;
  style?: ViewStyle;
  animate?: boolean;
}

export function DuoCuistot({ size = 100, style, animate = false }: Props) {
  const bounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animate) return;
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, { toValue: -8, duration: 600, useNativeDriver: true }),
        Animated.timing(bounce, { toValue: 0, duration: 600, useNativeDriver: true }),
      ])
    ).start();
  }, [animate]);

  const s = size / 100;

  return (
    <Animated.View style={[{ alignItems: 'center' }, style, animate && { transform: [{ translateY: bounce }] }]}>
      {/* Toque (chef hat) */}
      <View style={{ alignItems: 'center', marginBottom: -s * 4 }}>
        {/* Brim */}
        <View style={[styles.hatBrim, { width: s * 72, height: s * 14, borderRadius: s * 7 }]} />
        {/* Cylinder */}
        <View style={[styles.hatCylinder, { width: s * 52, height: s * 40, borderRadius: s * 8, marginTop: -s * 6 }]} />
        {/* Puffy top */}
        <View style={[styles.hatPuff, { width: s * 60, height: s * 28, borderRadius: s * 20, marginTop: -s * 18 }]} />
      </View>

      {/* Body */}
      <View style={[styles.body, { width: s * 100, height: s * 90, borderRadius: s * 50 }]}>
        {/* Eyes */}
        <View style={[styles.eyesRow, { marginTop: s * 24, gap: s * 18 }]}>
          <View style={[styles.eye, { width: s * 22, height: s * 26, borderRadius: s * 13 }]}>
            <View style={[styles.pupil, { width: s * 11, height: s * 13, borderRadius: s * 7, top: s * 5, left: s * 5 }]} />
            <View style={[styles.gleam, { width: s * 5, height: s * 5, borderRadius: s * 3, top: s * 5, left: s * 5 }]} />
          </View>
          <View style={[styles.eye, { width: s * 22, height: s * 26, borderRadius: s * 13 }]}>
            <View style={[styles.pupil, { width: s * 11, height: s * 13, borderRadius: s * 7, top: s * 5, left: s * 5 }]} />
            <View style={[styles.gleam, { width: s * 5, height: s * 5, borderRadius: s * 3, top: s * 5, left: s * 5 }]} />
          </View>
        </View>

        {/* Cheek blush left */}
        <View style={[styles.blush, { width: s * 18, height: s * 10, borderRadius: s * 9, left: s * 8, top: s * 50 }]} />
        {/* Cheek blush right */}
        <View style={[styles.blush, { width: s * 18, height: s * 10, borderRadius: s * 9, right: s * 8, top: s * 50 }]} />

        {/* Smile */}
        <View style={[styles.smileContainer, { width: s * 46, height: s * 22, marginTop: s * 6 }]}>
          <View style={[styles.smile, { width: s * 46, height: s * 46, borderRadius: s * 23, borderWidth: s * 3.5, bottom: 0 }]} />
        </View>
      </View>

      {/* Arms */}
      <View style={[styles.armsRow, { width: s * 130, marginTop: -s * 30 }]}>
        {/* Left arm */}
        <View style={[styles.arm, { width: s * 18, height: s * 38, borderRadius: s * 9, transform: [{ rotate: '20deg' }] }]} />
        {/* Right arm (holding spoon) */}
        <View style={{ alignItems: 'center' }}>
          <View style={[styles.arm, { width: s * 18, height: s * 38, borderRadius: s * 9, transform: [{ rotate: '-20deg' }] }]} />
          <Text style={{ fontSize: s * 22, marginTop: -s * 8 }}>🥄</Text>
        </View>
      </View>

      {/* Name tag */}
      <View style={[styles.nameTag, { marginTop: s * 8, paddingHorizontal: s * 10, paddingVertical: s * 4, borderRadius: s * 10 }]}>
        <Text style={[styles.nameText, { fontSize: s * 11 }]}>DuoCuistot</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  hatBrim: { backgroundColor: '#fff' },
  hatCylinder: { backgroundColor: '#fff' },
  hatPuff: { backgroundColor: '#fff' },
  body: { backgroundColor: '#58CC02', alignItems: 'center', overflow: 'hidden' },
  eyesRow: { flexDirection: 'row' },
  eye: { backgroundColor: '#fff', overflow: 'hidden' },
  pupil: { backgroundColor: '#3C3C3C', position: 'absolute' },
  gleam: { backgroundColor: '#fff', position: 'absolute' },
  blush: { backgroundColor: '#FF9600', opacity: 0.35, position: 'absolute' },
  smileContainer: { overflow: 'hidden', alignItems: 'center' },
  smile: { borderColor: '#fff', position: 'absolute', borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent' },
  armsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: -1 },
  arm: { backgroundColor: '#45A800' },
  nameTag: { backgroundColor: '#45A800' },
  nameText: { color: '#fff', fontWeight: '900', letterSpacing: 0.5 },
});
