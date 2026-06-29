import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';

interface Term {
  word: string;
  category: string;
  definition: string;
  example?: string;
  origin?: string;
}

const CULINARY_TERMS: Term[] = [
  { word: 'Brunoise', category: 'Couteau', definition: 'Découpe en très petits dés réguliers de 1-2mm de côté.', example: 'Brunoise de carottes pour une garniture.', origin: 'Français' },
  { word: 'Julienne', category: 'Couteau', definition: 'Découpe en fins bâtonnets de 3-4cm de long et 1-2mm d\'épaisseur.', example: 'Julienne de poireaux pour une soupe.', origin: 'Français' },
  { word: 'Mirepoix', category: 'Couteau', definition: 'Mélange de légumes (carotte, oignon, céleri) coupés en dés grossiers pour parfumer.', origin: 'Du duc de Lévis-Mirepoix, XVIIIe s.' },
  { word: 'Chiffonnade', category: 'Couteau', definition: 'Herbes ou feuilles roulées en cigare et coupées en très fines lanières.', example: 'Chiffonnade de basilic sur une pizza.' },
  { word: 'Suer', category: 'Cuisson', definition: 'Cuire des légumes à feu doux avec matière grasse pour les attendrir sans coloration.', example: 'Faites suer les oignons 5 minutes.' },
  { word: 'Sauter', category: 'Cuisson', definition: 'Cuire rapidement à feu vif dans peu de matière grasse en remuant.', example: 'Sautez les champignons à feu vif.' },
  { word: 'Braiser', category: 'Cuisson', definition: 'Cuire lentement dans un liquide aromatique à couvert, en mijotant.', example: 'Braiser un jarret de veau 3h.' },
  { word: 'Blanchir', category: 'Cuisson', definition: 'Plonger brièvement dans l\'eau bouillante salée puis refroidir dans de l\'eau glacée.', example: 'Blanchir les haricots verts 3 minutes.' },
  { word: 'Déglacerr', category: 'Cuisson', definition: 'Verser un liquide (vin, bouillon) dans une poêle chaude pour dissoudre les sucs caramélisés.', example: 'Déglacer au vin blanc après saisie du poulet.' },
  { word: 'Monter au beurre', category: 'Sauce', definition: 'Incorporer du beurre froid en petits morceaux hors du feu pour lier et enrichir une sauce.', example: 'Montez la sauce au beurre hors du feu.' },
  { word: 'Réduire', category: 'Sauce', definition: 'Faire évaporer un liquide par ébullition pour concentrer ses saveurs et l\'épaissir.', example: 'Réduisez le fond de veau de moitié.' },
  { word: 'Liaison', category: 'Sauce', definition: 'Technique pour épaissir une sauce : roux, amidon, œuf, crème, beurre manié.', example: 'Faites une liaison au beurre manié.' },
  { word: 'Roux', category: 'Sauce', definition: 'Mélange de farine et beurre cuits ensemble, base des sauces béchamel, velouté.', example: 'Préparez un roux blond pour la béchamel.' },
  { word: 'Émulsifier', category: 'Technique', definition: 'Mélanger deux liquides non miscibles (huile + eau) pour obtenir une texture homogène.', example: 'Émulsifier la vinaigrette en fouettant énergiquement.' },
  { word: 'Tempérer', category: 'Technique', definition: 'Amener un aliment (chocolat, viande) à température ambiante progressivement.', example: 'Tempérez le chocolat à 31°C pour une brillance parfaite.' },
  { word: 'Chemiser', category: 'Pâtisserie', definition: 'Tapisser l\'intérieur d\'un moule avec une matière (beurre+farine, papier cuisson, biscuit).', example: 'Chemisez le cercle de biscuit cuillère.' },
  { word: 'Foncer', category: 'Pâtisserie', definition: 'Garnir le fond et les parois d\'un moule avec de la pâte.', example: 'Foncez le moule à tarte.' },
  { word: 'Fraiser', category: 'Pâtisserie', definition: 'Écraser la pâte avec la paume pour homogénéiser sans la travailler.', example: 'Fraisez la pâte brisée 2-3 fois.' },
  { word: 'Macaronner', category: 'Pâtisserie', definition: 'Travailler la pâte à macarons pour chasser l\'air et obtenir la texture ruban.', example: 'Macaronnez jusqu\'à ce que la pâte forme un ruban.' },
  { word: 'Bloomer', category: 'Épices', definition: 'Faire griller des épices entières à sec ou dans la matière grasse pour libérer leurs arômes.', example: 'Bloomer les graines de cumin 30s avant d\'ajouter les oignons.', origin: 'De l\'anglais "to bloom"' },
  { word: 'Umami', category: 'Saveurs', definition: 'La 5ème saveur (après sucré, salé, acide, amer) — saveur profonde, longue en bouche.', example: 'Le parmesan, la sauce soja et le miso sont riches en umami.', origin: 'Japonais : 旨味 (délicieusement savoureux)' },
  { word: 'Mise en place', category: 'Organisation', definition: 'Préparation et organisation de tous les ingrédients avant de commencer la cuisson.', origin: 'Français (dans le monde entier)' },
  { word: 'Nappe', category: 'Sauce', definition: 'Consistance d\'une sauce qui enrobe une cuillère sans couler immédiatement.', example: 'La crème anglaise nappe quand elle est prête.' },
  { word: 'Al dente', category: 'Cuisson', definition: 'Pâtes ou légumes cuits mais encore légèrement fermes sous la dent.', origin: 'Italien : "à la dent"' },
  { word: 'Confire', category: 'Cuisson', definition: 'Cuire très lentement dans la graisse (pour la viande) ou dans le sucre (pour les fruits).', example: 'Confir des cuisses de canard dans la graisse à 80°C.' },
  { word: 'Infuser', category: 'Technique', definition: 'Laisser reposer un aromate dans un liquide chaud pour en extraire les saveurs.', example: 'Infusez le safran dans l\'eau chaude 15 minutes.' },
  { word: 'Dégorger', category: 'Technique', definition: 'Saupoudrer un légume de sel pour en extraire l\'eau de végétation.', example: 'Dégorgez les concombres 30 minutes au sel.' },
  { word: 'Lier', category: 'Sauce', definition: 'Épaissir une préparation liquide par addition d\'un liant (amidon, œuf, crème).', example: 'Liez la sauce avec de la maïzena.' },
  { word: 'Dashi', category: 'Bouillon', definition: 'Bouillon japonais de base préparé à partir de kombu et de bonite séchée.', origin: 'Japonais : 出汁' },
  { word: 'Fond', category: 'Bouillon', definition: 'Bouillon concentré de viande ou légumes, base des sauces et braisages.', example: 'Fond de veau brun pour les sauces.' },
  { word: 'Ras el hanout', category: 'Épices', definition: 'Mélange marocain de 20 à 50 épices dont chaque marchand garde la recette secrète.', origin: 'Arabe : "tête du magasin"' },
  { word: 'Gremolata', category: 'Garniture', definition: 'Condiment italien de zeste de citron, ail et persil haché — servi avec l\'osso buco.', origin: 'Italien, Milan' },
  { word: 'Mantecatura', category: 'Technique', definition: 'Incorporation finale de beurre froid et parmesan hors du feu pour lier le risotto.', origin: 'Italien' },
  { word: 'Wok hei', category: 'Technique', definition: 'Saveur fumée et caramélisée caractéristique de la cuisson au wok à très haute température.', origin: 'Cantonais : 鑊氣 (souffle du wok)' },
];

const CATEGORIES = ['Tout', 'Couteau', 'Cuisson', 'Sauce', 'Technique', 'Pâtisserie', 'Épices', 'Saveurs', 'Bouillon', 'Garniture', 'Organisation'];

export default function GlossaryScreen() {
  const { theme } = useThemeStore();
  const c = theme.colors;
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tout');

  const filtered = CULINARY_TERMS.filter((t) => {
    const matchSearch = search.length < 2 || t.word.toLowerCase().includes(search.toLowerCase()) || t.definition.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'Tout' || t.category === activeCategory;
    return matchSearch && matchCat;
  }).sort((a, b) => a.word.localeCompare(b.word));

  return (
    <ScreenWrapper>
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.back, { color: c.primary }]}>← Retour</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: c.text }]}>📚 Glossaire</Text>
      </View>

      <View style={styles.searchWrap}>
        <TextInput
          style={[styles.searchInput, { backgroundColor: c.surfaceElevated, borderColor: c.border, color: c.text }]}
          placeholder="Rechercher un terme..."
          placeholderTextColor={c.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catRow}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.catChip, { backgroundColor: activeCategory === cat ? c.primary : c.surfaceElevated, borderColor: activeCategory === cat ? c.primary : c.border }]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text style={[styles.catText, { color: activeCategory === cat ? '#fff' : c.textSecondary }]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.list}>
        <Text style={[styles.count, { color: c.textMuted }]}>{filtered.length} terme{filtered.length > 1 ? 's' : ''}</Text>
        {filtered.map((term, i) => (
          <View key={i} style={[styles.card, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.word, { color: c.text }]}>{term.word}</Text>
              <View style={[styles.catBadge, { backgroundColor: c.primary + '20' }]}>
                <Text style={[styles.catBadgeText, { color: c.primary }]}>{term.category}</Text>
              </View>
            </View>
            <Text style={[styles.definition, { color: c.textSecondary }]}>{term.definition}</Text>
            {term.example && (
              <Text style={[styles.example, { color: c.textMuted }]}>Ex. : {term.example}</Text>
            )}
            {term.origin && (
              <Text style={[styles.origin, { color: c.primary }]}>🌍 {term.origin}</Text>
            )}
          </View>
        ))}
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
  back: { fontWeight: '600', fontSize: Layout.fontSize.md },
  title: { fontSize: Layout.fontSize.xl, fontWeight: '900' },
  searchWrap: { padding: Layout.spacing.lg, paddingBottom: Layout.spacing.sm },
  searchInput: {
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    padding: Layout.spacing.md,
    fontSize: Layout.fontSize.md,
  },
  catRow: { paddingHorizontal: Layout.spacing.lg, gap: Layout.spacing.sm, paddingBottom: Layout.spacing.sm },
  catChip: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.radius.full,
    borderWidth: 1,
  },
  catText: { fontSize: Layout.fontSize.xs, fontWeight: '700' },
  list: { padding: Layout.spacing.lg, gap: Layout.spacing.sm, paddingBottom: 40 },
  count: { fontSize: Layout.fontSize.xs, marginBottom: Layout.spacing.xs },
  card: {
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    padding: Layout.spacing.md,
    gap: Layout.spacing.xs,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: Layout.spacing.sm },
  word: { fontSize: Layout.fontSize.lg, fontWeight: '900', flex: 1 },
  catBadge: { borderRadius: Layout.radius.full, paddingHorizontal: 8, paddingVertical: 3 },
  catBadgeText: { fontSize: Layout.fontSize.xs, fontWeight: '700' },
  definition: { fontSize: Layout.fontSize.sm, lineHeight: 20 },
  example: { fontSize: Layout.fontSize.xs, fontStyle: 'italic' },
  origin: { fontSize: Layout.fontSize.xs, fontWeight: '600' },
});
