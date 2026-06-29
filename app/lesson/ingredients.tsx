import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';
import { LESSON_DETAILS } from '@/constants/pathsData';
import type { Ingredient } from '@/types/database.types';

export default function IngredientsScreen() {
  const { lessonId, lessonTitle } = useLocalSearchParams<{ lessonId: string; lessonTitle?: string }>();
  const { theme } = useThemeStore();
  const c = theme.colors;

  const detail = LESSON_DETAILS[lessonId] ?? LESSON_DETAILS[lessonTitle ?? ''];
  const ingredients: Ingredient[] = detail?.ingredients ?? [];

  return (
    <ScreenWrapper>
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={[styles.backText, { color: c.primary }]}>← Retour</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: c.text }]}>Ingrédients</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {lessonTitle && (
          <Text style={[styles.lessonTitle, { color: c.textSecondary }]}>{lessonTitle}</Text>
        )}

        {ingredients.length === 0 ? (
          <View style={[styles.emptyBox, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
            <Text style={styles.emptyEmoji}>🥘</Text>
            <Text style={[styles.emptyText, { color: c.textMuted }]}>
              La liste d'ingrédients n'est pas encore disponible pour cette leçon.
            </Text>
          </View>
        ) : (
          <>
            <Text style={[styles.subtitle, { color: c.textMuted }]}>
              {ingredients.length} ingrédient{ingredients.length > 1 ? 's' : ''} nécessaires
            </Text>
            <View style={styles.list}>
              {ingredients.map((ing, i) => (
                <View
                  key={i}
                  style={[styles.card, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}
                >
                  <View style={[styles.emojiBox, { backgroundColor: c.primary + '15' }]}>
                    <Text style={styles.ingEmoji}>{ing.emoji}</Text>
                  </View>
                  <View style={styles.ingInfo}>
                    <Text style={[styles.ingName, { color: c.text }]}>{ing.name}</Text>
                    <Text style={[styles.ingQty, { color: c.primary }]}>
                      {ing.quantity}{ing.unit ? ` ${ing.unit}` : ''}
                    </Text>
                    {ing.tip && (
                      <View style={[styles.tipBox, { backgroundColor: c.secondary + '20' }]}>
                        <Text style={[styles.tipText, { color: c.textSecondary }]}>💡 {ing.tip}</Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>

            {detail?.chef_tip && (
              <View style={[styles.chefTip, { backgroundColor: c.primary + '15', borderColor: c.primary + '40' }]}>
                <Text style={[styles.chefTipTitle, { color: c.primary }]}>👨‍🍳 Conseil du Chef</Text>
                <Text style={[styles.chefTipText, { color: c.text }]}>{detail.chef_tip}</Text>
              </View>
            )}

            {detail?.cultural_note && (
              <View style={[styles.culturalNote, { backgroundColor: c.secondary + '20', borderColor: c.secondary + '40' }]}>
                <Text style={[styles.culturalTitle, { color: c.textSecondary }]}>🌍 Note Culturelle</Text>
                <Text style={[styles.culturalText, { color: c.text }]}>{detail.cultural_note}</Text>
              </View>
            )}

            {detail?.anecdote && (
              <View style={[styles.anecdote, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
                <Text style={[styles.anecdoteTitle, { color: c.textSecondary }]}>📖 Anecdote</Text>
                <Text style={[styles.anecdoteText, { color: c.text }]}>{detail.anecdote}</Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.md,
    padding: Layout.spacing.lg,
    borderBottomWidth: 1,
  },
  backBtn: { paddingRight: Layout.spacing.sm },
  backText: { fontSize: Layout.fontSize.md, fontWeight: '600' },
  title: { fontSize: Layout.fontSize.xl, fontWeight: '900' },
  content: { padding: Layout.spacing.lg, gap: Layout.spacing.md, paddingBottom: 40 },
  lessonTitle: { fontSize: Layout.fontSize.md, fontStyle: 'italic' },
  subtitle: { fontSize: Layout.fontSize.sm },
  list: { gap: Layout.spacing.sm },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.md,
    gap: Layout.spacing.md,
    borderWidth: 1,
  },
  emojiBox: {
    width: 52,
    height: 52,
    borderRadius: Layout.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ingEmoji: { fontSize: 26 },
  ingInfo: { flex: 1, gap: 4 },
  ingName: { fontSize: Layout.fontSize.md, fontWeight: '700' },
  ingQty: { fontSize: Layout.fontSize.sm, fontWeight: '600' },
  tipBox: { marginTop: 6, borderRadius: Layout.radius.sm, padding: Layout.spacing.sm },
  tipText: { fontSize: Layout.fontSize.xs },
  chefTip: {
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.md,
    gap: Layout.spacing.sm,
    borderWidth: 1,
  },
  chefTipTitle: { fontSize: Layout.fontSize.sm, fontWeight: '800' },
  chefTipText: { fontSize: Layout.fontSize.sm, lineHeight: 20 },
  culturalNote: {
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.md,
    gap: Layout.spacing.sm,
    borderWidth: 1,
  },
  culturalTitle: { fontSize: Layout.fontSize.sm, fontWeight: '800' },
  culturalText: { fontSize: Layout.fontSize.sm, lineHeight: 20 },
  anecdote: {
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.md,
    gap: Layout.spacing.sm,
    borderWidth: 1,
  },
  anecdoteTitle: { fontSize: Layout.fontSize.sm, fontWeight: '800' },
  anecdoteText: { fontSize: Layout.fontSize.sm, lineHeight: 20 },
  emptyBox: {
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.xl,
    alignItems: 'center',
    gap: Layout.spacing.md,
    borderWidth: 1,
  },
  emptyEmoji: { fontSize: 48 },
  emptyText: { fontSize: Layout.fontSize.sm, textAlign: 'center', lineHeight: 20 },
});
