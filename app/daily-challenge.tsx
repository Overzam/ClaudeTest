import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { useThemeStore } from '@/stores/themeStore';
import { useGameStore } from '@/stores/gameStore';
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
  {
    emoji: '🥩',
    title: "Steak Parfait",
    description: "Prépare un steak en utilisant la technique de saisie à haute température puis repos — obtiens une cuisson rosée et uniforme.",
    category: "Viandes & Grillades",
    difficulty: 'Moyen',
    xpReward: 85,
    timeLimit: "20 min",
    tips: [
      "Tempérez la viande 30 min à température ambiante avant cuisson",
      "Saisissez 2 min par face à feu vif, puis réduisez et arrosez de beurre noisette",
      "Laissez reposer sous alu le même temps que la cuisson — les jus restent à l'intérieur",
    ],
  },
  {
    emoji: '🥗',
    title: "Vinaigrette Émulsionnée",
    description: "Réalise une vinaigrette stable qui ne se sépare pas en 48h grâce à la technique d'émulsion.",
    category: "Sauces & Vinaigrettes",
    difficulty: 'Facile',
    xpReward: 40,
    timeLimit: "10 min",
    tips: [
      "La moutarde est l'émulsifiant naturel : une c. à café suffit pour lier 150ml",
      "Versez l'huile en filet mince tout en fouettant pour créer une émulsion stable",
      "Ratio classique : 1 part vinaigre / 3 parts huile. Ajustez selon votre goût",
    ],
  },
  {
    emoji: '🍞',
    title: "Pain Sans Pétrissage",
    description: "Réalise un pain artisanal à croûte craquante avec la méthode No-Knead : 18h de fermentation lente.",
    category: "Boulangerie",
    difficulty: 'Facile',
    xpReward: 70,
    timeLimit: "20 min actif + 18h",
    tips: [
      "Mélangez 450g de farine T65, 350ml d'eau, 1g de levure, 9g de sel. Laissez 18h à température ambiante",
      "La cocotte en fonte est essentielle : elle reproduit l'effet four à vapeur professionnel",
      "Préchauffez cocotte et four à 240°C avant d'enfourner — le choc thermique crée la croûte",
    ],
  },
  {
    emoji: '🦐',
    title: "Bisque Express",
    description: "Transforme des carcasses de crevettes en une bisque veloutée intense en 40 minutes.",
    category: "Cuisine de la Mer",
    difficulty: 'Expert',
    xpReward: 110,
    timeLimit: "40 min",
    tips: [
      "Faites revenir les carcasses au four à 200°C 10 min avant de les faire revenir à la casserole — la coloration profonde donne la saveur",
      "Flambez au Cognac pour ajouter de la complexité aromatique",
      "Mixez puis passez au chinois fin en pressant bien — les carapaces libèrent toute leur richesse",
    ],
  },
  {
    emoji: '🧆',
    title: "Falafels Croustillants",
    description: "Prépare des falafels maison croustillants à l'extérieur et moelleux à l'intérieur, sans boîte de pois chiches.",
    category: "Cuisine du Moyen-Orient",
    difficulty: 'Moyen',
    xpReward: 75,
    timeLimit: "30 min + 12h trempage",
    tips: [
      "Utilisez des pois chiches CRU trempés 12h — les boîtes donnent des falafels qui s'effritent à la friture",
      "La masse doit être granuleuse, pas lisse. Arrêtez le mixeur dès que c'est homogène",
      "Friture à 175°C : trop chaud, l'extérieur brûle avant que l'intérieur soit cuit",
    ],
  },
  {
    emoji: '🍵',
    title: "Thé Matcha Parfait",
    description: "Prépare un matcha cérémonie (usucha) sans grumeaux avec la technique du tamis et du chasen.",
    category: "Boissons & Infusions",
    difficulty: 'Facile',
    xpReward: 45,
    timeLimit: "5 min",
    tips: [
      "Tamisez toujours le matcha pour éviter les grumeaux — c'est la première étape incontournable",
      "L'eau ne doit jamais bouillir : 75-80°C. Une eau trop chaude rend le matcha amer",
      "Fouettez en W avec le chasen (fouet bambou) jusqu'à obtenir une mousse fine en surface",
    ],
  },
  {
    emoji: '🌮',
    title: "Tortillas Maison",
    description: "Réalise des tortillas de maïs fraîches avec du masa harina — leur goût n'a rien à voir avec les tortillas industrielles.",
    category: "Cuisine Mexicaine",
    difficulty: 'Facile',
    xpReward: 50,
    timeLimit: "30 min",
    tips: [
      "Ratio : 2 tasses de masa harina + 1.5 tasses d'eau chaude + 1 c. à café de sel",
      "La pâte doit avoir la consistance de la Play-Doh — ni trop sèche ni collante",
      "Cuisson 1 min par face sur comal très chaud, sans huile. La tortilla doit gonfler légèrement",
    ],
  },
  {
    emoji: '🍲',
    title: "Blanquette de Veau",
    description: "Réussis la blanquette classique : veau poché dans un fond blanc, sauce velouté liée à la crème et jaune d'œuf.",
    category: "Cuisine Française",
    difficulty: 'Moyen',
    xpReward: 90,
    timeLimit: "1h30",
    tips: [
      "La viande ne doit jamais bouillir — un léger frémissement suffit pour garder le veau tendre",
      "La liaison crème-jaune d'œuf s'appelle une liaison à l'anglaise : attention, elle ne doit plus bouillir après ajout",
      "Servez avec du riz blanc ou des pâtes fraîches — c'est le plat réconfort parfait",
    ],
  },
  {
    emoji: '🧄',
    title: "Aïoli Provençal",
    description: "Monte un aïoli traditionnel au pilon : une émulsion d'ail et d'huile d'olive, sans jaune d'œuf ni moutarde.",
    category: "Techniques de Base",
    difficulty: 'Expert',
    xpReward: 100,
    timeLimit: "20 min",
    tips: [
      "Commencez par écraser l'ail avec une pincée de sel au mortier jusqu'à obtenir une pommade lisse",
      "Incorporez l'huile d'olive goutte à goutte en tournant le pilon — la liaison est fragile au début",
      "Si l'émulsion 'tourne' : commencez dans un nouveau bol avec un peu d'ail, incorporez l'émulsion ratée goutte à goutte",
    ],
  },
  {
    emoji: '🍋',
    title: "Lemon Curd Parfait",
    description: "Prépare un lemon curd soyeux, brillant, ni trop sucré ni trop acide — la base de la tarte au citron.",
    category: "Pâtisserie Française",
    difficulty: 'Moyen',
    xpReward: 70,
    timeLimit: "25 min",
    tips: [
      "Cuisez au bain-marie en remuant constamment — la chaleur directe fait coaguler les œufs trop vite",
      "Le curd est prêt quand il nappe une cuillère et que le trait d'un doigt reste net",
      "Incorporez le beurre en dés hors du feu pour plus d'onctuosité — mixez pour le rendre ultra-lisse",
    ],
  },
  {
    emoji: '🥟',
    title: "Dim Sum Maison",
    description: "Façonne des har gow (raviolis vapeur aux crevettes) avec la pliure traditionnelle en 6 plis.",
    category: "Cuisine Cantonaise",
    difficulty: 'Expert',
    xpReward: 110,
    timeLimit: "1h",
    tips: [
      "La pâte des har gow est en amidon de blé (pas de la farine) — elle devient translucide à la cuisson",
      "Travaillez la pâte chaude, elle sèche rapidement — couvrez d'un torchon humide pendant le façonnage",
      "La crevette doit croquer sous la dent : ne pas trop cuire, 6 min à la vapeur suffisent",
    ],
  },
  {
    emoji: '🍰',
    title: "Cheesecake New-Yorkais",
    description: "Réussis le cheesecake new-yorkais : dense, crémeux, sans craquelures, avec le bon rapport sucré-acide.",
    category: "Pâtisserie Américaine",
    difficulty: 'Moyen',
    xpReward: 85,
    timeLimit: "1h + 12h repos",
    tips: [
      "Tous les ingrédients doivent être à température ambiante — un cream cheese froid crée des grumeaux",
      "Cuisez au bain-marie à 150°C : la vapeur évite les craquelures et garantit une texture crémeuse",
      "Laissez refroidir dans le four éteint porte entre-ouverte — le choc thermique cause les craquelures",
    ],
  },
  {
    emoji: '🌶️',
    title: "Salsa Verde Mexicaine",
    description: "Prépare une salsa verde fraîche à la tomatillo, jalapeño et coriandre — en version crue et en version rôtie.",
    category: "Cuisine Mexicaine",
    difficulty: 'Facile',
    xpReward: 45,
    timeLimit: "20 min",
    tips: [
      "La tomatillo se cuisine CRU (fruité et acidulé) ou RÔTI au four (sucré et fumé) — deux salses différentes",
      "Mixez grossièrement : la salsa doit avoir de la texture, pas être un purée lisse",
      "Équilibrez toujours avec une pincée de sucre si l'acidité est trop prononcée",
    ],
  },
  {
    emoji: '🫐',
    title: "Confiture de Saison",
    description: "Réalise une confiture artisanale avec le minimum de sucre et le maximum de fruit — maîtrise la prise.",
    category: "Conservation",
    difficulty: 'Facile',
    xpReward: 60,
    timeLimit: "45 min",
    tips: [
      "Ratio minimum pour la prise : 45g de sucre pour 55g de fruit — avec moins, pasteurisez en autoclave",
      "Test de la prise : une goutte sur une assiette froide — elle doit figer en 30 secondes",
      "L'écume en surface est bonne : elle concentre les saveurs. Retirez-la juste avant de mettre en pots",
    ],
  },
  {
    emoji: '🐟',
    title: "Poisson Entier au Four",
    description: "Cuire un poisson entier (dorade ou bar) en croûte de sel — une technique qui préserve moelleux et saveurs.",
    category: "Cuisine de la Mer",
    difficulty: 'Facile',
    xpReward: 65,
    timeLimit: "40 min",
    tips: [
      "Ratio croûte de sel : 1 kg de gros sel gris + 2 blancs d'œufs + herbes aromatiques",
      "Le poisson cuit dans sa propre vapeur — la croûte ne doit PAS être salée à l'intérieur",
      "Cassez la croûte à table : l'effet est spectaculaire et le poisson sort parfaitement cuit",
    ],
  },
  {
    emoji: '🥕',
    title: "Velouté de Légumes",
    description: "Réalise un velouté parfaitement lisse et soyeux — carotte, butternut ou petits pois. Maîtrise la technique.",
    category: "Techniques de Base",
    difficulty: 'Facile',
    xpReward: 40,
    timeLimit: "35 min",
    tips: [
      "Faites suer les légumes avec de l'oignon dans le beurre sans coloration — c'est la base de la douceur",
      "Mixez longuement et passez au tamis pour une texture velours sans fibre",
      "Montez au beurre froid hors du feu pour le brillant et la richesse — ou à la crème pour plus de douceur",
    ],
  },
  {
    emoji: '🍄',
    title: "Duxelles Parfaites",
    description: "Prépare une duxelles de champignons : hachée menu, sautée jusqu'à complète évaporation de l'eau.",
    category: "Techniques de Base",
    difficulty: 'Facile',
    xpReward: 45,
    timeLimit: "25 min",
    tips: [
      "Hachez les champignons très finement — le couteau, pas le robot (qui les rend aqueux)",
      "Cuisez à feu vif jusqu'à complète évaporation : les champignons passent de 300g à 80g",
      "La duxelles se congèle parfaitement et sert pour les sauces, les farcis et le Bœuf Wellington",
    ],
  },
  {
    emoji: '🧇',
    title: "Crêpes à la Perfection",
    description: "Maîtrise la pâte à crêpes : une crêpe fine, dorée et sans grumeaux avec le secret du beurre noisette.",
    category: "Pâtisserie Française",
    difficulty: 'Facile',
    xpReward: 40,
    timeLimit: "30 min + 1h repos",
    tips: [
      "Ajoutez le beurre noisette tiède à la pâte — il parfume et donne des crêpes dorées sans accrocher",
      "La pâte doit reposer 1h minimum : le gluten se détend, les crêpes sont moins élastiques",
      "La première crêpe est toujours sacrifiée pour huiler la poêle — c'est une tradition de cuisine",
    ],
  },
  {
    emoji: '🍖',
    title: "Slow Cooking : Porc Effiloché",
    description: "Cuire une épaule de porc 8h à 120°C jusqu'à ce qu'elle s'effiloche toute seule.",
    category: "Viandes & Grillades",
    difficulty: 'Facile',
    xpReward: 95,
    timeLimit: "8h (actif : 20 min)",
    tips: [
      "La collagène de l'épaule fond après 6-8h à 120°C, rendant la viande soyeuse et effiloochable",
      "Frottez la viande la veille avec le dry rub (sucre brun + paprika + ail + sel + cumin)",
      "La température interne cible : 90°C — à ce stade les fibres lâchent et la viande effile parfaitement",
    ],
  },
  {
    emoji: '🫚',
    title: "Huile Infusée Maison",
    description: "Prépare 3 huiles aromatisées maison : ail rôti, piment-citron et basilic. Technique froide et technique chaude.",
    category: "Techniques de Base",
    difficulty: 'Facile',
    xpReward: 35,
    timeLimit: "30 min + 1 semaine infusion",
    tips: [
      "Infusion à froid (basilic, herbes fraîches) : 1 semaine au réfrigérateur — préserve la couleur vive",
      "Infusion à chaud (ail, épices) : chauffez l'huile à 60°C max avec les aromates, refroidissez, filtrez",
      "ATTENTION : les herbes fraîches dans l'huile à température ambiante peuvent être dangereuses (botulisme) — conservez au frais",
    ],
  },
  {
    emoji: '🍨',
    title: "Glace Maison Sans Sorbetière",
    description: "Réalise une glace crémeuse sans sorbetière par la technique du fouettage toutes les heures.",
    category: "Pâtisserie",
    difficulty: 'Moyen',
    xpReward: 70,
    timeLimit: "20 min actif + 6h congélateur",
    tips: [
      "Base classique : crème entière 35% + lait concentré sucré (sans sucre supplémentaire) + arôme",
      "Fouettez la crème en chantilly avant de congeler — l'air incorporé évite les cristaux de glace",
      "Fouettez toutes les heures pendant les 3 premières heures pour casser les cristaux qui se forment",
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
  const gameStore = useGameStore();
  const [challenge] = useState<Challenge>(getDailyChallenge);
  const [completed, setCompleted] = useState(false);

  async function handleComplete() {
    setCompleted(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await gameStore.gainXP(challenge.xpReward);
  }

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
        <LinearGradient
          colors={[diffColor + 'CC', diffColor + '66']}
          style={styles.hero}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.heroEmoji}>{challenge.emoji}</Text>
          <View style={styles.diffBadge}>
            <Text style={styles.diffText}>{challenge.difficulty}</Text>
          </View>
          <Text style={styles.heroTitle}>{challenge.title}</Text>
          <Text style={styles.heroCategory}>{challenge.category}</Text>
        </LinearGradient>

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
            onPress={handleComplete}
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
  diffBadge: { paddingHorizontal: Layout.spacing.md, paddingVertical: 4, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.3)' },
  diffText: { color: '#fff', fontWeight: '800', fontSize: Layout.fontSize.sm },
  heroTitle: { fontSize: Layout.fontSize.xl, fontWeight: '900', textAlign: 'center', color: '#fff' },
  heroCategory: { fontSize: Layout.fontSize.sm, color: 'rgba(255,255,255,0.85)' },
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
