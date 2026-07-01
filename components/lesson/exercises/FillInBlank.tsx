import React, { useState, useRef } from 'react';
import { Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';
import type { FillInBlankData } from '@/types/lesson.types';

const ACCENTS = ['é', 'è', 'ê', 'à', 'â', 'ù', 'û', 'ô', 'î', 'ï', 'ç', 'œ', 'æ'];

interface Props {
  question: string;
  data: FillInBlankData;
  onSubmit: (correct: boolean, correctAnswerText?: string) => void;
}

export function FillInBlank({ question, data, onSubmit }: Props) {
  const { theme } = useThemeStore();
  const c = theme.colors;
  const [value, setValue] = useState('');
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<TextInput>(null);

  function handleVerify() {
    Keyboard.dismiss();
    const strip = (s: string) => s.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const correct = strip(value) === strip(data.answer);
    onSubmit(correct, data.answer);
  }

  function insertAccent(ch: string) {
    setValue((prev) => prev + ch);
    inputRef.current?.focus();
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
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

        {/* Accent helpers */}
        <View style={styles.accentsRow}>
          {ACCENTS.map((ch) => (
            <TouchableOpacity
              key={ch}
              style={[styles.accentBtn, { borderColor: c.border, backgroundColor: c.surfaceElevated }]}
              onPress={() => insertAccent(ch)}
              activeOpacity={0.7}
            >
              <Text style={[styles.accentText, { color: c.text }]}>{ch}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {data.hint && (
          <TouchableOpacity onPress={() => setShowHint(!showHint)} style={styles.hintBtn}>
            <Text style={[styles.hintBtnText, { color: c.xpBlue }]}>
              {showHint ? "🙈 Masquer l'indice" : "💡 Voir un indice"}
            </Text>
          </TouchableOpacity>
        )}
        {showHint && data.hint && (
          <View style={[styles.hintBox, { backgroundColor: c.xpBlue + '15', borderColor: c.xpBlue + '30' }]}>
            <Text style={[styles.hintText, { color: c.xpBlue }]}>{data.hint}</Text>
          </View>
        )}
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: c.border }]}>
        <Pressable
          collapsable={false}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: value ? c.primary : c.border },
            pressed && !!value && { opacity: 0.85 },
          ]}
          onPress={handleVerify}
          disabled={!value}
          hitSlop={12}
          android_ripple={{ color: '#ffffff30' }}
        >
          <Text style={styles.buttonText} pointerEvents="none">Vérifier</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  scroll: { padding: Layout.spacing.lg, gap: Layout.spacing.lg, paddingBottom: Layout.spacing.sm },
  question: { fontSize: Layout.fontSize.lg, fontWeight: '700', textAlign: 'center', lineHeight: 28 },
  inputBox: {
    borderWidth: 2,
    borderRadius: Layout.radius.md,
    padding: Layout.spacing.md,
  },
  input: { fontSize: Layout.fontSize.lg, fontWeight: '600', textAlign: 'center' },
  accentsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, justifyContent: 'center' },
  accentBtn: {
    borderWidth: 1,
    borderRadius: Layout.radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 6,
    minWidth: 36,
    alignItems: 'center',
  },
  accentText: { fontSize: Layout.fontSize.md, fontWeight: '600' },
  hintBtn: { alignSelf: 'center' },
  hintBtnText: { fontSize: Layout.fontSize.sm, fontWeight: '600' },
  hintBox: {
    borderRadius: Layout.radius.md,
    padding: Layout.spacing.md,
    borderWidth: 1,
  },
  hintText: { fontSize: Layout.fontSize.sm, textAlign: 'center', fontStyle: 'italic' },
  footer: { padding: Layout.spacing.lg, paddingTop: Layout.spacing.md, borderTopWidth: 1 },
  button: {
    borderRadius: Layout.radius.full,
    padding: Layout.spacing.md,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '800', fontSize: Layout.fontSize.md },
});
