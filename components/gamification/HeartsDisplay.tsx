import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { MAX_HEARTS } from '@/constants/Config';

interface Props {
  hearts: number;
  style?: ViewStyle;
}

export function HeartsDisplay({ hearts, style }: Props) {
  return (
    <View style={[styles.row, style]}>
      {Array.from({ length: MAX_HEARTS }).map((_, i) => (
        <Text key={i} style={[styles.heart, i >= hearts && styles.empty]}>
          ❤️
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 2 },
  heart: { fontSize: 18 },
  empty: { opacity: 0.2 },
});
