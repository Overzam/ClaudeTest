import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';

interface Challenge {
  emoji: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Facile' | 'Moyen' | 'Expert';
  xpReward: number;
  timeLimit: string;
  tips: string[];
}

const DAILY_CHALLENGES: Challenge[] = [
  {
    emoji: '🥚',
    title: "Maîtrise de l'œuf",
    description: "Prépare un œuf parfait dans chacune de ces 3 cuissons : mollet, poché et en cocotte.",
    category: "Techniques de Base",
    difficulty: 'Facile',
    xpReward: 50,
    timeLimit: "30 min",
    tips: [
      "Pour un œuf poché, ajoutez une cuillère de vinaigre blanc dans l'eau frémissante",
      "Un œuf mollet parfait : 6 minutes à l'eau bouillante puis bain d'eau glacée",
      "L'œuf en cocotte se fait au bain-marie au four à 180°C pendant 10-12 minutes",
    ],
  },
  {
    emoji: '🧅',
    title: "L'art de la brunoise",
    description: "Taille un oignon en brunoise parfaite : des dés réguliers de 2mm. La régularité est tout.",
    category: "Couteaux & Découpe",
    difficulty: 'Moyen',
    xpReward: 75,
    timeLimit: "15 min",
    tips: [
      "Gardez la racine de l'oignon intacte jusqu'à la fin pour tenir les couches",
      "Faites d'abord des incisions horizontales, puis verticales, puis tranchons",
      "Un couteau bien aiguisé réduit les larmes — la cellule intacte libère moins de gaz",
    ],
  },
  {
    emoji: '🍝',
    title: "Pasta Perfetta",
    description: "Réalise des pâtes fraîches à la main et une sauce cacio e pepe en 45 minutes.",
    category: "Cuisine Italienne",
    difficulty: 'Expert',
    xpReward: 120,
    timeLimit: "45 min",
    tips: [
      "Pour 2 personnes : 200g de farine 00 + 2 jaunes d'œufs + 1 œuf entier",
      "La pâte doit reposer 30 min au frais emballée dans du film",
      "Cacio e pepe : eau de cuisson amidonnée + Pecorino + poivre noir fraîchement moulu. Pas de crème !",
    ],
  },
  {
    emoji: '🍮',
    title: "Crème Brûlée Classique",
    description: "Réussit une crème brûlée avec une croûte de caramel fine et craquante.",
    category: "Pâtisserie Française",
    difficulty: 'Moyen',
    xpReward: 80,
    timeLimit: "1h + repos",
    tips: [
      "La crème doit cuire à 160°C au bain-marie — elle est prête quand elle tremble légèrement au centre",
      "Laisser refroidir complètement avant de brûler le sucre",
      "Utilisez du sucre de canne roux pour une caramélisation plus profonde",
    ],
  },
  {
    emoji: '🍜',
    title: "Bouillon Dashi Express",
    description: "Prépare un dashi de qualité restaurant en 20 minutes avec kombu et katsuobushi.",
    category: "Cuisine Japonaise",
    difficulty: 'Facile',
    xpReward: 60,
    timeLimit: "20 min",
    tips: [
      "Ne jamais faire bouillir le kombu — retirez-le à 60°C pour éviter l'amertume",
      "Les flocons de bonite (katsuobushi) infusent hors du feu pendant 5 minutes",
      "Le dashi se conserve 3 jours au réfrigérateur ou peut être congelé en cubes",
    ],
  },
  {
    emoji: '🫙',
    title: "Fermentation Facile",
    description: "Lance une lacto-fermentation de légumes : radis, carottes ou chou. Simple mais magique.",
    category: "Fermentation & Conservation",
    difficulty: 'Facile',
    xpReward: 55,
    timeLimit: "20 min actif + 3 jours",
    tips: [
      "Ratio sel : 2% du poids des légumes (20g pour 1kg)",
      "Les légumes doivent être immergés sous la saumure — utilisez un poids",
      "Températures idéales : 18-22°C. Plus il fait chaud, plus ça fermente vite",
    ],
  },
];

function getDailyChallenge(): Challenge {
  const dayIndex = Math.floor(Date.now() / 86400000) % DAILY_CHALLENGES.length;
  return DAILY_CHALLENGES[dayIndex];
}

const DIFFICULTY_COLORS: Record<string, string> = {
  Facile: '#58CC02',
  Moyen: '#FF9600',
  Expert: '#FF4B4B',
};

export default function DailyChallengeScreen() {
  const { theme } = useThemeStore();
  const c = theme.colors;
  const [challenge] = useState<Challenge>(getDailyChallenge);
  const [completed, setCompleted] = useState(false);

  const diffColor = DIFFICULTY_COLORS[challenge.difficulty] ?? c.primary;

  return (
    <ScreenWrapper>
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.back, { color: c.primary }]}>← Retour</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]}>Défi du jour</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: diffColor + '15', borderColor: diffColor + '30', borderWidth: 1 }]}>
          <Text style={styles.heroEmoji}>{challenge.emoji}</Text>
          <View style={[styles.diffBadge, { backgroundColor: diffColor }]}>
            <Text style={styles.diffText}>{challenge.difficulty}</Text>
          </View>
          <Text style={[styles.heroTitle, { color: c.text }]}>{challenge.title}</Text>
          <Text style={[styles.heroCategory, { color: c.textSecondary }]}>{challenge.category}</Text>
        </View>

        {/* Description */}
        <View style={[styles.card, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
          <Text style={[styles.cardLabel, { color: c.textMuted }]}>Mission</Text>
          <Text style={[styles.description, { color: c.text }]}>{challenge.description}</Text>
        </View>

        {/* Metadata */}
        <View style={styles.metaRow}>
          <View style={[styles.metaItem, { backgroundColor: c.xpBlue + '15' }]}>
            <Text style={styles.metaEmoji}>⭐</Text>
            <Text style={[styles.metaValue, { color: c.xpBlue }]}>{challenge.xpReward} XP</Text>
            <Text style={[styles.metaLabel, { color: c.textMuted }]}>Récompense</Text>
          </View>
          <View style={[styles.metaItem, { backgroundColor: c.streakOrange + '15' }]}>
            <Text style={styles.metaEmoji}>⏱️</Text>
            <Text style={[styles.metaValue, { color: c.streakOrange }]}>{challenge.timeLimit}</Text>
            <Text style={[styles.metaLabel, { color: c.textMuted }]}>Durée</Text>
          </View>
        </View>

        {/* Tips */}
        <View style={[styles.card, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
          <Text style={[styles.cardLabel, { color: c.textMuted }]}>Conseils du Chef 👨‍🍳</Text>
          {challenge.tips.map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <Text style={[styles.tipBullet, { color: c.primary }]}>•</Text>
              <Text style={[styles.tipText, { color: c.text }]}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Action */}
        {!completed ? (
          <TouchableOpacity
            style={[styles.completeBtn, { backgroundColor: c.primary }]}
            onPress={() => setCompleted(true)}
            activeOpacity={0.85}
          >
            <Text style={styles.completeBtnText}>✓ Marquer comme complété</Text>
          </TouchableOpacity>
        ) : (
          <View style={[styles.completedBox, { backgroundColor: c.success + '15', borderColor: c.success + '40' }]}>
            <Text style={styles.completedEmoji}>🎉</Text>
            <Text style={[styles.completedTitle, { color: c.success }]}>Bravo !</Text>
            <Text style={[styles.completedText, { color: c.textSecondary }]}>
              Tu as relevé le défi du jour. +{challenge.xpReward} XP demain !
            </Text>
          </View>
        )}

        {/* Refresh note */}
        <Text style={[styles.refreshNote, { color: c.textMuted }]}>
          🔄 Un nouveau défi chaque jour à minuit
        </Text>
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
  back: { fontSize: Layout.fontSize.md, fontWeight: '600' },
  headerTitle: { fontSize: Layout.fontSize.xl, fontWeight: '900' },
  content: { padding: Layout.spacing.lg, gap: Layout.spacing.md, paddingBottom: 40 },
  hero: {
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.xl,
    alignItems: 'center',
    gap: Layout.spacing.sm,
  },
  heroEmoji: { fontSize: 64 },
  diffBadge: { paddingHorizontal: Layout.spacing.md, paddingVertical: 4, borderRadius: 20 },
  diffText: { color: '#fff', fontWeight: '800', fontSize: Layout.fontSize.sm },
  heroTitle: { fontSize: Layout.fontSize.xl, fontWeight: '900', textAlign: 'center' },
  heroCategory: { fontSize: Layout.fontSize.sm },
  card: {
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.md,
    gap: Layout.spacing.sm,
    borderWidth: 1,
  },
  cardLabel: { fontSize: Layout.fontSize.xs, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  description: { fontSize: Layout.fontSize.md, lineHeight: 22 },
  metaRow: { flexDirection: 'row', gap: Layout.spacing.md },
  metaItem: {
    flex: 1,
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.md,
    alignItems: 'center',
    gap: 4,
  },
  metaEmoji: { fontSize: 24 },
  metaValue: { fontSize: Layout.fontSize.lg, fontWeight: '800' },
  metaLabel: { fontSize: Layout.fontSize.xs },
  tipRow: { flexDirection: 'row', gap: Layout.spacing.sm, alignItems: 'flex-start' },
  tipBullet: { fontSize: 18, fontWeight: '700', marginTop: -2 },
  tipText: { flex: 1, fontSize: Layout.fontSize.sm, lineHeight: 20 },
  completeBtn: {
    borderRadius: Layout.radius.full,
    padding: Layout.spacing.md,
    alignItems: 'center',
  },
  completeBtnText: { color: '#fff', fontWeight: '800', fontSize: Layout.fontSize.md },
  completedBox: {
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.xl,
    alignItems: 'center',
    gap: Layout.spacing.sm,
    borderWidth: 1,
  },
  completedEmoji: { fontSize: 48 },
  completedTitle: { fontSize: Layout.fontSize.xl, fontWeight: '900' },
  completedText: { fontSize: Layout.fontSize.sm, textAlign: 'center', lineHeight: 20 },
  refreshNote: { fontSize: Layout.fontSize.xs, textAlign: 'center' },
});
