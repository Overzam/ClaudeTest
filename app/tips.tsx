import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';

interface Tip {
  id: string;
  category: string;
  emoji: string;
  title: string;
  body: string;
  pro?: string;
}

const TIPS: Tip[] = [
  // Couteaux
  { id: 't1', category: 'Couteaux', emoji: '🔪', title: 'La prise en pince', body: "Tenez votre couteau en pinçant la lame entre le pouce et l'index, pas par le manche. Vous gagnez en précision et en contrôle.", pro: 'Tous les cuisiniers pro utilisent cette prise' },
  { id: 't2', category: 'Couteaux', emoji: '🔪', title: 'La main en griffe', body: 'Recourez les doigts vers l\'intérieur comme une griffe de chat pour protéger vos phalanges. Le dos de la main guide le couteau.', pro: 'Technique enseignée en école de cuisine' },
  { id: 't3', category: 'Couteaux', emoji: '🔪', title: 'Entretien de la lame', body: "Affûtez votre couteau avant chaque utilisation avec un fusil, pas un aiguiseur électrique. Un couteau tranchant est plus sûr qu'un couteau émoussé.", pro: 'Passez 10 secondes à affûter avant chaque session' },

  // Sauces
  { id: 't4', category: 'Sauces', emoji: '🥄', title: 'Monter au beurre', body: "Hors du feu, incorporez des dés de beurre froid en fouettant vivement pour créer une sauce brillante et liée. Si le beurre fond trop vite, il « tranche ».", pro: 'Le secret des sauces beurre blanc en gastronomie' },
  { id: 't5', category: 'Sauces', emoji: '🥄', title: 'Déglacer pour les sucs', body: "Après une viande poêlée, versez du vin, bouillon ou vinaigre dans la poêle chaude et grattez les sucs dorés. C'est là que réside toute la saveur.", pro: 'Base de tous les jus et sauces de rôtisserie' },
  { id: 't6', category: 'Sauces', emoji: '🥄', title: 'Liaison à la fécule', body: "Délayez toujours la fécule dans un liquide froid avant de l'ajouter à chaud, sinon des grumeaux se forment. Ratio : 1c. à café pour 250ml.", pro: 'Préférez la fécule de maïs pour une sauce translucide' },

  // Cuisson
  { id: 't7', category: 'Cuisson', emoji: '🍳', title: 'Saisir = chaleur sèche', body: "Une poêle trop froide fait bouillir les aliments dans leur jus au lieu de les saisir. Chauffez jusqu'à voir une légère fumée avant d'ajouter le gras.", pro: 'La réaction de Maillard se produit à 140°C+' },
  { id: 't8', category: 'Cuisson', emoji: '🍳', title: 'Cuire à basse température', body: "Une viande cuite à 60-65°C pendant 1-2h reste juteuse et tendre partout. La chaleur se diffuse uniformément sans assécher l'extérieur.", pro: 'Le principe du sous-vide, faisable au four ordinaire' },
  { id: 't9', category: 'Cuisson', emoji: '🍳', title: 'Repos après cuisson', body: "Laissez reposer la viande 5-10 min hors du feu sous une feuille d'alu. Les jus se redistribuent — vous perdrez 50% moins de jus à la découpe.", pro: 'Règle d\'or : temps de repos = épaisseur en cm × 2 minutes' },
  { id: 't10', category: 'Cuisson', emoji: '🍳', title: 'L\'eau salée comme la mer', body: "L'eau de cuisson des pâtes doit être très salée (10g/l). Le sel ne sert pas qu'à goûter — il gélatinise l'amidon différemment et rend la pâte plus ferme.", pro: 'Les Italiens disent « sale come il mare »' },

  // Pâtisserie
  { id: 't11', category: 'Pâtisserie', emoji: '🧁', title: 'Ingrédients à température ambiante', body: "Beurre, œufs, lait doivent être à température ambiante pour s'incorporer uniformément. Un beurre trop froid empêche la crème de s'émulsionner.", pro: 'Sortez vos ingrédients 1h avant de pâtisser' },
  { id: 't12', category: 'Pâtisserie', emoji: '🧁', title: 'Peser, pas mesurer', body: "En pâtisserie, pesez toujours au gramme près. Une tasse de farine peut varier de 120g à 180g selon le tassement — une différence catastrophique.", pro: 'La cuisine pardonne, la pâtisserie non' },
  { id: 't13', category: 'Pâtisserie', emoji: '🧁', title: 'Le bain-marie parfait', body: "L'eau du bain-marie ne doit jamais toucher le fond du bol supérieur. Gardez l'eau frémissante, pas bouillante, pour un contrôle délicat de la chaleur.", pro: 'Idéal pour fondre le chocolat et cuire les crèmes' },

  // Aromates
  { id: 't14', category: 'Aromates', emoji: '🌿', title: 'Herbes fraîches vs séchées', body: "Les herbes fraîches s'ajoutent en fin de cuisson (basilic, coriandre). Les herbes séchées se cuisent longtemps pour s'exprimer (thym, romarin, laurier).", pro: 'Ratio : 1c. à soupe fraîches = 1c. à café séchées' },
  { id: 't15', category: 'Aromates', emoji: '🌿', title: 'Infuser à froid', body: "Faites infuser ail, épices et herbes dans une huile froide que vous chauffez doucement. La saveur sera plus complexe et profonde qu'un ajout direct.", pro: 'Technique du confit d\'ail : 1h à 90°C dans l\'huile' },
  { id: 't16', category: 'Aromates', emoji: '🌿', title: 'Bloom des épices', body: "Faites revenir vos épices moulues 30 secondes à sec dans une poêle chaude ou dans le gras chaud. Cela libère les huiles essentielles et double l'intensité.", pro: 'Toujours utilisé en cuisine indienne — le « tadka »' },

  // Pâtes & Riz
  { id: 't17', category: 'Pâtes & Céréales', emoji: '🍝', title: "Al dente, c'est quoi exactement ?", body: "Une pâte al dente a un fin cœur blanc encore cru. Elle finit de cuire dans la sauce. Pour tester : coupez-en une — il doit rester un point blanc.", pro: 'Retirez les pâtes 2 min avant la durée indiquée' },
  { id: 't18', category: 'Pâtes & Céréales', emoji: '🍚', title: 'Rincer le riz... ou pas', body: "Rincez le riz à sushi pour enlever l'excès d'amidon. Ne rincez PAS le risotto — l'amidon est ce qui crée sa texture crémeuse. Chaque riz a sa règle.", pro: 'Riz pilaf : rincé et toasté. Risotto : ni l\'un ni l\'autre' },
  { id: 't19', category: 'Pâtes & Céréales', emoji: '🍝', title: 'Eau de cuisson = or liquide', body: "Réservez toujours une louche d'eau de cuisson avant d'égoutter. Riche en amidon, elle lie la sauce aux pâtes et ajuste la texture.", pro: 'Dans la cacio e pepe, c\'est l\'unique source de liaison' },

  // Umami & Saveur
  { id: 't20', category: 'Saveurs', emoji: '😋', title: 'L\'umami, 5e saveur', body: "L'umami est la saveur de la glutamate — profonde, ronde, qui dure longtemps. Parmesan, anchois, miso, champignons, tomates séchées : tous riches en umami naturel.", pro: 'Découvert par Kikunae Ikeda en 1908 au Japon' },
  { id: 't21', category: 'Saveurs', emoji: '😋', title: 'Équilibrer l\'acidité', body: "Un plat trop gras ? Ajoutez un trait de citron ou de vinaigre. L'acidité coupe la richesse et ravive toutes les autres saveurs. Quelques gouttes suffisent.", pro: 'Finissez toujours vos plats avec une pointe d\'acide' },
  { id: 't22', category: 'Saveurs', emoji: '😋', title: 'Sucre = équilibre, pas douceur', body: "Une pincée de sucre dans une sauce tomate acide ne la rend pas sucrée — elle équilibre l'acidité. Le sucre est un régulateur de saveur, pas juste un édulcorant.", pro: 'Technique italo-napolitaine classique' },

  // Conservation
  { id: 't23', category: 'Conservation', emoji: '🫙', title: 'Congélation des herbes', body: "Mixez vos herbes fraîches avec un peu d'huile d'olive et congelez-les dans un bac à glaçons. Vous aurez des portions prêtes à l'emploi toute l'année.", pro: 'Idéal pour le basilic en saison estivale' },
  { id: 't24', category: 'Conservation', emoji: '🫙', title: 'Lacto-fermentation', body: "Le sel inhibe les mauvaises bactéries et favorise les lactobacilles naturels. À 2% de sel sur le poids des légumes, vous obtenez une fermentation stable et sûre.", pro: 'Aucun équipement spécial — juste sel + légumes + bocal' },

  // Viandes
  { id: 't25', category: 'Viandes', emoji: '🥩', title: 'Tempérer la viande', body: "Sortez la viande du réfrigérateur 30-45 minutes avant la cuisson. Une viande froide au centre cuit de façon inégale — l'extérieur brûle avant que le cœur soit chaud.", pro: 'Surtout crucial pour les grosses pièces (rôtis, côtes de bœuf)' },
  { id: 't26', category: 'Viandes', emoji: '🥩', title: 'Saisir dans la bonne graisse', body: "Utilisez du beurre clarifié (ou ghee) ou de l'huile à haute température pour saisir la viande. Le beurre ordinaire brûle à partir de 130°C — bien trop bas.", pro: 'Ajoutez le beurre non clarifié en fin de cuisson pour le goût' },
  { id: 't27', category: 'Viandes', emoji: '🥩', title: 'Découper dans le sens inverse des fibres', body: "Repérez la direction des fibres musculaires et découpez perpendiculairement à elles. Cela raccourcit les fibres et rend la viande plus tendre à la mastication.", pro: 'Essentiel pour la bavette, le flank steak, le rôti de palette' },
  { id: 't28', category: 'Viandes', emoji: '🐔', title: 'Poulet : sécher la peau', body: "Pour une peau croustillante, séchez le poulet avec du papier absorbant avant cuisson. L'humidité en surface crée de la vapeur qui ramollit la peau au lieu de la griller.", pro: 'Le laisser sécher 1h à l\'air libre au réfrigérateur donne les meilleurs résultats' },

  // Cuisine Japonaise
  { id: 't29', category: 'Japonais', emoji: '🍜', title: 'Le dashi, base de tout', body: "Le dashi (bouillon de kombu et bonite séchée) est à la cuisine japonaise ce que le bouillon est à la française. Il se prépare en 15 minutes mais structure toutes les saveurs.", pro: 'Ne jamais faire bouillir — le kombu libère une amertume à l\'ébullition' },
  { id: 't30', category: 'Japonais', emoji: '🍣', title: 'Riz à sushi : le vinaigre', body: "La vinaigrette du riz à sushi (vinaigre de riz, sel, sucre) ne doit pas être mélangée mais tranchée dans le riz avec une spatule en bois, pour ne pas écraser les grains.", pro: 'Évantez le riz pendant le mélange pour qu\'il refroidisse vite et brille' },
  { id: 't31', category: 'Japonais', emoji: '🍱', title: 'Umami naturel japonais', body: "Les Japonais utilisent le principe de 'umami synergy' : combiner kombu (glutamate) et bonite séchée (inosinate) double la perception de l'umami de façon exponentielle.", pro: '1+1=8 en matière d\'umami selon les recherches de Kikunae Ikeda' },

  // Méditerranée
  { id: 't32', category: 'Méditerranée', emoji: '🫒', title: 'Huile d\'olive : cuire ou finir', body: "L'huile d'olive extra vierge a un point de fumée à 190°C — suffisant pour la plupart des cuissons. Mais son goût s'altère à haute température. Gardez la meilleure pour finir les plats.", pro: 'Pour les friture : huile d\'olive raffinée ou huile de tournesol' },
  { id: 't33', category: 'Méditerranée', emoji: '🧄', title: 'L\'ail : 3 intensités', body: "Ail cru : intense et piquant. Ail émincé revenu : doux et parfumé. Ail confit (1h à 90°C dans l'huile) : caramélisé, sucré, fondant. Choisissez selon l'effet voulu.", pro: 'L\'ail confit en pot se conserve 3 semaines au réfrigérateur' },
  { id: 't34', category: 'Méditerranée', emoji: '🍋', title: 'Citron : zeste d\'abord', body: "Prélevez toujours le zeste avant de presser le citron. Le zeste contient les huiles essentielles les plus aromatiques — jusqu'à 10× plus parfumé que le jus.", pro: 'Congelez les zestes en excès — ils durent 6 mois au congélateur' },

  // Œufs
  { id: 't35', category: 'Œufs', emoji: '🥚', title: 'Tester la fraîcheur', body: "Plongez un œuf dans un verre d'eau : s'il coule à plat, il est frais. S'il se dresse debout, il vieillit. S'il flotte, jetez-le — la chambre d'air s'est trop agrandie.", pro: 'Les œufs frais sont essentiels pour pochés et à la coque' },
  { id: 't36', category: 'Œufs', emoji: '🥚', title: 'Blancs en neige : le secret', body: "Utilisez un bol parfaitement propre et sec — une trace de gras empêche les blancs de monter. Ajoutez une pincée de sel ou quelques gouttes de citron pour stabiliser.", pro: 'Commencez à vitesse lente pour créer de petites bulles stables' },
  { id: 't37', category: 'Œufs', emoji: '🥚', title: 'L\'œuf parfaitement poché', body: "Eau frémissante (pas bouillante) avec un filet de vinaigre. Créez un tourbillon, cassez l'œuf dans une tasse puis glissez-le au centre du tourbillon. 3 minutes pour un jaune coulant.", pro: 'Le tourbillon centre le blanc autour du jaune' },
];

const CATEGORIES = ['Tous', ...Array.from(new Set(TIPS.map((t) => t.category)))];

export default function TipsScreen() {
  const { theme } = useThemeStore();
  const c = theme.colors;
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = TIPS.filter((t) => {
    const matchCat = activeCategory === 'Tous' || t.category === activeCategory;
    const q = query.toLowerCase();
    const matchQuery = !q || t.title.toLowerCase().includes(q) || t.body.toLowerCase().includes(q) || t.category.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  return (
    <ScreenWrapper>
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color={c.primary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: c.text }]}>Astuces & Techniques</Text>
        <TouchableOpacity onPress={() => router.push('/glossary' as any)} hitSlop={8} style={{ marginLeft: 'auto' }}>
          <Text style={[styles.glossaryLink, { color: c.primary }]}>Glossaire</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={[styles.searchBar, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
        <Ionicons name="search" size={16} color={c.textMuted} />
        <TextInput
          style={[styles.searchInput, { color: c.text }]}
          placeholder="Rechercher une technique…"
          placeholderTextColor={c.textMuted}
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')} hitSlop={8}>
            <Ionicons name="close-circle" size={18} color={c.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Category chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        {CATEGORIES.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.chip,
              { backgroundColor: item === activeCategory ? c.primary : c.surfaceElevated, borderColor: item === activeCategory ? c.primary : c.border },
            ]}
            onPress={() => setActiveCategory(item)}
          >
            <Text style={[styles.chipText, { color: item === activeCategory ? '#fff' : c.text }]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Tips list */}
      <FlatList
        data={filtered}
        keyExtractor={(t) => t.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: Layout.spacing.sm }} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="search" size={40} color={c.textMuted} />
            <Text style={[styles.emptyText, { color: c.textMuted }]}>Aucune astuce trouvée</Text>
          </View>
        }
        renderItem={({ item }) => {
          const isOpen = expanded === item.id;
          return (
            <TouchableOpacity
              style={[styles.tipCard, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}
              onPress={() => setExpanded(isOpen ? null : item.id)}
              activeOpacity={0.85}
            >
              <View style={styles.tipHeader}>
                <Text style={styles.tipEmoji}>{item.emoji}</Text>
                <View style={styles.tipHeaderText}>
                  <View style={[styles.catBadge, { backgroundColor: c.primary + '15' }]}>
                    <Text style={[styles.catBadgeText, { color: c.primary }]}>{item.category}</Text>
                  </View>
                  <Text style={[styles.tipTitle, { color: c.text }]}>{item.title}</Text>
                </View>
                <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={16} color={c.textMuted} />
              </View>
              {isOpen && (
                <View style={styles.tipBody}>
                  <Text style={[styles.tipBodyText, { color: c.text }]}>{item.body}</Text>
                  {item.pro && (
                    <View style={[styles.proBox, { backgroundColor: c.xpBlue + '15', borderColor: c.xpBlue + '30' }]}>
                      <Ionicons name="bulb-outline" size={14} color={c.xpBlue} style={{ marginBottom: 2 }} />
                      <Text style={[styles.proLabel, { color: c.xpBlue }]}>Le saviez-vous ?</Text>
                      <Text style={[styles.proText, { color: c.textSecondary }]}>{item.pro}</Text>
                    </View>
                  )}
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />
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
  glossaryLink: { fontSize: Layout.fontSize.sm, fontWeight: '700' },
  title: { fontSize: Layout.fontSize.xl, fontWeight: '900', flex: 1 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Layout.spacing.lg,
    marginTop: Layout.spacing.md,
    borderRadius: Layout.radius.full,
    borderWidth: 1,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: 10,
    gap: Layout.spacing.sm,
  },
  searchIcon: {},
  searchInput: { flex: 1, fontSize: Layout.fontSize.md },
  clearBtn: {},
  chips: { paddingHorizontal: Layout.spacing.lg, paddingVertical: Layout.spacing.md, gap: Layout.spacing.sm },
  chip: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: 6,
    borderRadius: Layout.radius.full,
    borderWidth: 1,
  },
  chipText: { fontSize: Layout.fontSize.sm, fontWeight: '600' },
  list: { paddingHorizontal: Layout.spacing.lg, paddingBottom: 40 },
  empty: { alignItems: 'center', paddingTop: 60, gap: Layout.spacing.md },
  emptyEmoji: { fontSize: 40 },
  emptyText: { fontSize: Layout.fontSize.md },
  tipCard: {
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.md,
    borderWidth: 1,
    gap: Layout.spacing.sm,
  },
  tipHeader: { flexDirection: 'row', alignItems: 'center', gap: Layout.spacing.md },
  tipEmoji: { fontSize: 28 },
  tipHeaderText: { flex: 1, gap: 4 },
  catBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  catBadgeText: { fontSize: Layout.fontSize.xs, fontWeight: '700' },
  tipTitle: { fontSize: Layout.fontSize.md, fontWeight: '700' },
  chevron: { fontSize: 12 },
  tipBody: { gap: Layout.spacing.sm, paddingTop: 4 },
  tipBodyText: { fontSize: Layout.fontSize.sm, lineHeight: 22 },
  proBox: {
    borderRadius: Layout.radius.md,
    padding: Layout.spacing.sm,
    gap: 2,
    borderWidth: 1,
  },
  proLabel: { fontSize: Layout.fontSize.xs, fontWeight: '800' },
  proText: { fontSize: Layout.fontSize.sm, lineHeight: 20 },
});
