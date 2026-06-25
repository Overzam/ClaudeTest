import React, { useState, useRef } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';
import type { FillInBlankData } from '@/types/lesson.types';

interface Props {
  question: string;
  data: FillInBlankData;
  onSubmit: (correct: boolean) => void;
}

export function FillInBlank({ question, data, onSubmit }: Props) {
  const { theme } = useThemeStore();
  const c = theme.colors;
  const [value, setValue] = useState('');
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<TextInput>(null);

  function handleVerify() {
    Keyboard.dismiss();
    const normalized = value.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const correct = normalized === data.answer.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    onSubmit(correct);
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.question, { color: c.text }]}>{question}</Text>

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => inputRef.current?.focus()}
        style={[styles.inputBox, { borderColor: value ? c.primary : c.border, backgroundColor: c.surfaceElevated }]}
      >
        <TextInput
          ref={inputRef}
          style={[styles.input, { color: c.text }]}
          value={value}
          onChangeText={setValue}
          placeholder="Tapez votre réponse…"
          placeholderTextColor={c.textMuted}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
          onSubmitEditing={value ? handleVerify : undefined}
        />
      </TouchableOpacity>

      {data.hint && (
        <TouchableOpacity onPress={() => setShowHint(!showHint)} style={styles.hintBtn}>
          <Text style={[styles.hintBtnText, { color: c.xpBlue }]}>
            {showHint ? '🙈 Masquer l\'indice' : '💡 Voir un indice'}
          </Text>
        </TouchableOpacity>
      )}
      {showHint && data.hint && (
        <View style={[styles.hintBox, { backgroundColor: c.xpBlue + '15', borderColor: c.xpBlue + '30' }]}>
          <Text style={[styles.hintText, { color: c.xpBlue }]}>{data.hint}</Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: value ? c.primary : c.border }]}
        onPress={handleVerify}
        disabled={!value}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Vérifier</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Layout.spacing.lg, gap: Layout.spacing.lg },
  question: { fontSize: Layout.fontSize.lg, fontWeight: '700', textAlign: 'center', lineHeight: 28 },
  inputBox: {
    borderWidth: 2,
    borderRadius: Layout.radius.md,
    padding: Layout.spacing.md,
  },
  input: { fontSize: Layout.fontSize.lg, fontWeight: '600', textAlign: 'center' },
  hintBtn: { alignSelf: 'center' },
  hintBtnText: { fontSize: Layout.fontSize.sm, fontWeight: '600' },
  hintBox: {
    borderRadius: Layout.radius.md,
    padding: Layout.spacing.md,
    borderWidth: 1,
  },
  hintText: { fontSize: Layout.fontSize.sm, textAlign: 'center', fontStyle: 'italic' },
  button: {
    borderRadius: Layout.radius.full,
    padding: Layout.spacing.md,
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonText: { color: '#fff', fontWeight: '800', fontSize: Layout.fontSize.md },
});
