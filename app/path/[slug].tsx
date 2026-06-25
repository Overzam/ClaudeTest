import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';
import { PATH_DETAILS } from '@/constants/pathsData';

export default function PathDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { theme } = useThemeStore();
  const c = theme.colors;

  const detail = PATH_DETAILS[slug];

  if (!detail) {
    return (
      <ScreenWrapper>
        <View style={styles.center}>
          <Text style={[styles.notFound, { color: c.textMuted }]}>Parcours introuvable</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={[styles.backText, { color: c.primary }]}>← Retour</Text>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={[styles.hero, { backgroundColor: detail.color + '18' }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={[styles.backText, { color: c.primary }]}>← Retour</Text>
        </TouchableOpacity>
        <Text style={styles.heroEmoji}>{detail.emoji}</Text>
        <Text style={[styles.heroTitle, { color: c.text }]}>{detail.title}</Text>
        <Text style={[styles.heroCountry, { color: c.textSecondary }]}>🌍 {detail.country}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* History */}
        <Section title="Histoire & Traditions" emoji="📜" color={c.text}>
          <Text style={[styles.bodyText, { color: c.text }]}>{detail.history}</Text>
        </Section>

        {/* Key Ingredients */}
        <Section title="Ingrédients Clés" emoji="🧄" color={c.text}>
          <View style={styles.chips}>
            {detail.key_ingredients.map((ing) => (
              <View
                key={ing}
                style={[styles.chip, { backgroundColor: detail.color + '20', borderColor: detail.color + '40' }]}
              >
                <Text style={[styles.chipText, { color: detail.color }]}>{ing}</Text>
              </View>
            ))}
          </View>
        </Section>

        {/* Famous Chefs */}
        <Section title="Chefs Emblématiques" emoji="👨‍🍳" color={c.text}>
          <View style={styles.chefList}>
            {detail.famous_chefs.map((chef, i) => (
              <View
                key={chef}
                style={[styles.chefRow, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}
              >
                <View style={[styles.chefNum, { backgroundColor: detail.color }]}>
                  <Text style={styles.chefNumText}>{i + 1}</Text>
                </View>
                <Text style={[styles.chefName, { color: c.text }]}>{chef}</Text>
              </View>
            ))}
          </View>
        </Section>
      </ScrollView>
    </ScreenWrapper>
  );
}

function Section({
  title,
  emoji,
  color,
  children,
}: {
  title: string;
  emoji: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color }]}>
        {emoji} {title}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Layout.spacing.md },
  notFound: { fontSize: Layout.fontSize.lg },
  hero: {
    padding: Layout.spacing.xl,
    paddingTop: Layout.spacing.md,
    alignItems: 'center',
    gap: Layout.spacing.sm,
  },
  backBtn: { alignSelf: 'flex-start', marginBottom: Layout.spacing.sm },
  backText: { fontSize: Layout.fontSize.md, fontWeight: '600' },
  heroEmoji: { fontSize: 64 },
  heroTitle: { fontSize: Layout.fontSize.xxl, fontWeight: '900', textAlign: 'center' },
  heroCountry: { fontSize: Layout.fontSize.md },
  content: { padding: Layout.spacing.lg, gap: Layout.spacing.xl, paddingBottom: 40 },
  section: { gap: Layout.spacing.md },
  sectionTitle: { fontSize: Layout.fontSize.lg, fontWeight: '800' },
  bodyText: { fontSize: Layout.fontSize.sm, lineHeight: 22 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: Layout.spacing.sm },
  chip: {
    borderRadius: 20,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    borderWidth: 1,
  },
  chipText: { fontSize: Layout.fontSize.sm, fontWeight: '600' },
  chefList: { gap: Layout.spacing.sm },
  chefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.md,
    borderRadius: Layout.radius.md,
    padding: Layout.spacing.md,
    borderWidth: 1,
  },
  chefNum: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chefNumText: { color: '#fff', fontWeight: '800', fontSize: Layout.fontSize.sm },
  chefName: { fontSize: Layout.fontSize.md, fontWeight: '600' },
});
