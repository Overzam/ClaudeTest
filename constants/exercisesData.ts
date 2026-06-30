import type { Exercise } from '@/types/lesson.types';

// Static exercises keyed by lesson title (used as fallback when Supabase is empty)
export const STATIC_EXERCISES: Record<string, Exercise[]> = {

  // ── FRENCH ──────────────────────────────────────────────────────────────────

  'Les Sauces de Base': [
    {
      id: 'local-fr-sauce-1', lessonId: 'local', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quelles sont les 5 sauces mères de la cuisine française ?',
      data: {
        options: [
          'Béchamel, velouté, espagnole, hollandaise, tomat',
          'Béchamel, mayonnaise, béarnaise, vinaigrette, mornay',
          'Velouté, roux, fond de veau, demi-glace, crème',
          'Beurre blanc, beurre noisette, roux blanc, roux brun, liée',
        ],
        correctIndex: 0,
      },
    },
    {
      id: 'local-fr-sauce-2', lessonId: 'local', orderIndex: 1, xpReward: 10,
      type: 'multiple_choice',
      question: 'Pour réussir une béchamel sans grumeaux, le lait doit être…',
      data: {
        options: ['Froid, versé d\'un coup', 'Chaud, versé en 3 fois en fouettant', 'À température ambiante, versé lentement', 'Bouillant, versé tout d\'un coup'],
        correctIndex: 1,
      },
    },
    {
      id: 'local-fr-sauce-3', lessonId: 'local', orderIndex: 2, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Le mélange beurre + farine cuit ensemble s\'appelle un ___.',
      data: { answer: 'roux', hint: 'Base de la béchamel et du velouté' },
    },
    {
      id: 'local-fr-sauce-4', lessonId: 'local', orderIndex: 3, xpReward: 10,
      type: 'step_ordering',
      question: 'Remets les étapes de la béchamel dans l\'ordre :',
      data: {
        steps: ['Incorporer le lait chaud en fouettant', 'Faire fondre le beurre', 'Ajouter la farine et cuire 2 min', 'Assaisonner et râper la muscade'],
        correctOrder: [1, 2, 0, 3],
      },
    },
    {
      id: 'local-fr-sauce-5', lessonId: 'local', orderIndex: 4, xpReward: 10,
      type: 'association',
      question: 'Associe chaque sauce à sa base :',
      data: {
        pairs: [
          { left: 'Béchamel', right: 'Roux blanc + lait' },
          { left: 'Velouté', right: 'Roux blanc + fond' },
          { left: 'Espagnole', right: 'Roux brun + fond brun' },
          { left: 'Hollandaise', right: 'Jaunes d\'œufs + beurre clarifié' },
        ],
      },
    },
  ],

  'La Quiche Lorraine': [
    {
      id: 'local-fr-quiche-1', lessonId: 'local', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'La vraie quiche lorraine traditionnelle contient-elle du fromage ?',
      data: {
        options: ['Non, seulement lardons + œufs + crème', 'Oui, du gruyère râpé', 'Oui, de la feta', 'Oui, du comté'],
        correctIndex: 0,
      },
    },
    {
      id: 'local-fr-quiche-2', lessonId: 'local', orderIndex: 1, xpReward: 10,
      type: 'multiple_choice',
      question: 'De quelle langue vient le mot "quiche" ?',
      data: {
        options: ['Latin', 'Allemand (Kuchen = gâteau)', 'Alsacien', 'Occitan'],
        correctIndex: 1,
      },
    },
    {
      id: 'local-fr-quiche-3', lessonId: 'local', orderIndex: 2, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Le mélange œufs + crème versé dans une quiche s\'appelle une ___.',
      data: { answer: 'migaine', hint: 'Terme lorrain traditionnel' },
    },
    {
      id: 'local-fr-quiche-4', lessonId: 'local', orderIndex: 3, xpReward: 10,
      type: 'step_ordering',
      question: 'Remets les étapes de la quiche lorraine dans l\'ordre :',
      data: {
        steps: ['Verser la migaine sur les lardons', 'Cuire la pâte à blanc 10 min', 'Enfourner 30 min à 180°C', 'Déposer les lardons dorés', 'Piquer le fond de tarte'],
        correctOrder: [4, 1, 3, 0, 2],
      },
    },
  ],

  'Le Bœuf Bourguignon': [
    {
      id: 'local-fr-boeuf-1', lessonId: 'local', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Pourquoi saisit-on la viande EN PETITES QUANTITÉS pour le bourguignon ?',
      data: {
        options: [
          'Pour qu\'elle soit plus tendre',
          'Pour éviter qu\'elle bouille dans son jus et ne dore pas',
          'Pour économiser l\'huile',
          'Pour accélérer la cuisson',
        ],
        correctIndex: 1,
      },
    },
    {
      id: 'local-fr-boeuf-2', lessonId: 'local', orderIndex: 1, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quel vin utilise-t-on pour le bœuf bourguignon ?',
      data: {
        options: ['Bordeaux rouge', 'Pinot Noir de Bourgogne', 'Côtes du Rhône', 'Beaujolais nouveau'],
        correctIndex: 1,
      },
    },
    {
      id: 'local-fr-boeuf-3', lessonId: 'local', orderIndex: 2, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La réaction chimique qui crée la croûte brune savoureuse sur la viande s\'appelle la réaction de ___.',
      data: { answer: 'maillard', hint: 'Se produit à partir de 140°C' },
    },
    {
      id: 'local-fr-boeuf-4', lessonId: 'local', orderIndex: 3, xpReward: 10,
      type: 'association',
      question: 'Associe chaque ingrédient à son rôle dans le bourguignon :',
      data: {
        pairs: [
          { left: 'Pinot Noir', right: 'Attendrit et parfume' },
          { left: 'Bouquet garni', right: 'Aromatise le fond' },
          { left: 'Farine', right: 'Lie la sauce' },
          { left: 'Lardons', right: 'Apporte du gras et du fumé' },
        ],
      },
    },
  ],

  // ── ITALIAN ─────────────────────────────────────────────────────────────────

  'Les Pâtes Fraîches': [
    {
      id: 'local-it-pasta-1', lessonId: 'local', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quelle farine utilise-t-on pour des pâtes fraîches italiennes authentiques ?',
      data: {
        options: ['Farine T55 ordinaire', 'Farine 00 (très fine)', 'Farine de blé complet', 'Farine de riz'],
        correctIndex: 1,
      },
    },
    {
      id: 'local-it-pasta-2', lessonId: 'local', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Des pâtes cuites "à la dent" encore légèrement fermes se disent "al ___".',
      data: { answer: 'dente', hint: 'Expression italienne' },
    },
    {
      id: 'local-it-pasta-3', lessonId: 'local', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Combien de temps avant la durée indiquée sur le paquet faut-il égoutter les pâtes ?',
      data: {
        options: ['5 minutes avant', '2 minutes avant', 'Au temps exact', 'Après — on les laisse ramollir'],
        correctIndex: 1,
      },
    },
    {
      id: 'local-it-pasta-4', lessonId: 'local', orderIndex: 3, xpReward: 10,
      type: 'multiple_choice',
      question: 'Pourquoi garde-t-on une louche d\'eau de cuisson des pâtes ?',
      data: {
        options: [
          'Pour refroidir les pâtes',
          'L\'amidon dissous lie la sauce aux pâtes et ajuste la texture',
          'Pour rincer les pâtes',
          'Pour garder les pâtes au chaud',
        ],
        correctIndex: 1,
      },
    },
    {
      id: 'local-it-pasta-5', lessonId: 'local', orderIndex: 4, xpReward: 10,
      type: 'step_ordering',
      question: 'Remets les étapes de la pâte fraîche dans l\'ordre :',
      data: {
        steps: ['Laisser reposer 30 min au frais', 'Mélanger farine + œufs', 'Pétrir 10 min jusqu\'à lisse', 'Abaisser au laminoir ou rouleau', 'Découper et fariner'],
        correctOrder: [1, 2, 0, 3, 4],
      },
    },
  ],

  'La Pizza Napoletana': [
    {
      id: 'local-it-pizza-1', lessonId: 'local', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quelle est la température de cuisson d\'une vraie pizza napolitaine au four à bois ?',
      data: {
        options: ['200°C pendant 20 min', '250°C pendant 15 min', '480°C pendant 60 à 90 secondes', '300°C pendant 10 min'],
        correctIndex: 2,
      },
    },
    {
      id: 'local-it-pizza-2', lessonId: 'local', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La mozzarella de bufflonne protégée par une AOP italienne s\'appelle mozzarella di ___.',
      data: { answer: 'bufala', hint: 'Originaire de Campanie' },
    },
    {
      id: 'local-it-pizza-3', lessonId: 'local', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quelles tomates utilise-t-on pour la sauce pizza napolitaine authentique ?',
      data: {
        options: ['Tomates cerises fraîches', 'Tomates San Marzano DOP en conserve', 'Concentré de tomates', 'Tomates provençales fraîches'],
        correctIndex: 1,
      },
    },
    {
      id: 'local-it-pizza-4', lessonId: 'local', orderIndex: 3, xpReward: 10,
      type: 'association',
      question: 'Associe chaque type de pizza à ses caractéristiques :',
      data: {
        pairs: [
          { left: 'Margherita', right: 'Tomate, mozzarella, basilic' },
          { left: 'Marinara', right: 'Tomate, ail, origan, pas de fromage' },
          { left: 'Quattro Stagioni', right: 'Divisée en 4 sections garnies différemment' },
          { left: 'Bianca', right: 'Sans sauce tomate, crème ou ricotta' },
        ],
      },
    },
  ],

  // ── JAPANESE ────────────────────────────────────────────────────────────────

  'Le Dashi': [
    {
      id: 'local-jp-dashi-1', lessonId: 'local', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quels sont les deux ingrédients du dashi de base (Ichiban dashi) ?',
      data: {
        options: [
          'Sauce soja + mirin',
          'Kombu (algue) + katsuobushi (bonite séchée)',
          'Miso blanc + algues wakame',
          'Shiitake séché + nori',
        ],
        correctIndex: 1,
      },
    },
    {
      id: 'local-jp-dashi-2', lessonId: 'local', orderIndex: 1, xpReward: 10,
      type: 'multiple_choice',
      question: 'À quelle température doit-on retirer le kombu pour éviter l\'amertume ?',
      data: {
        options: ['À ébullition (100°C)', 'À 60°C (avant ébullition)', 'À 80°C', 'Après 30 min d\'ébullition'],
        correctIndex: 1,
      },
    },
    {
      id: 'local-jp-dashi-3', lessonId: 'local', orderIndex: 2, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La 5e saveur fondamentale, découverte par Kikunae Ikeda en 1908, s\'appelle l\'___.',
      data: { answer: 'umami', hint: 'Présente dans le dashi, le parmesan, les champignons' },
    },
    {
      id: 'local-jp-dashi-4', lessonId: 'local', orderIndex: 3, xpReward: 10,
      type: 'step_ordering',
      question: 'Remets les étapes du dashi dans l\'ordre :',
      data: {
        steps: [
          'Infuser les flocons de bonite 5 min hors du feu',
          'Plonger le kombu dans l\'eau froide',
          'Filtrer et réserver le dashi',
          'Chauffer doucement jusqu\'à 60°C, retirer le kombu',
          'Porter à frémissement (pas ébullition)',
        ],
        correctOrder: [1, 3, 4, 0, 2],
      },
    },
  ],

  // ── MOROCCAN ────────────────────────────────────────────────────────────────

  'Le Couscous Royal': [
    {
      id: 'local-ma-couscous-1', lessonId: 'local', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quand le couscous a-t-il été déclaré patrimoine immatériel de l\'UNESCO ?',
      data: {
        options: ['1995', '2010', '2020', '2023'],
        correctIndex: 2,
      },
    },
    {
      id: 'local-ma-couscous-2', lessonId: 'local', orderIndex: 1, xpReward: 10,
      type: 'multiple_choice',
      question: 'Combien de fois faut-il passer la semoule à la vapeur pour un couscous traditionnel ?',
      data: {
        options: ['1 fois', '2 fois', '3 fois', '4 fois'],
        correctIndex: 2,
      },
    },
    {
      id: 'local-ma-couscous-3', lessonId: 'local', orderIndex: 2, xpReward: 10,
      type: 'fill_in_blank',
      question: 'L\'ustensile traditionnel en deux parties pour cuire le couscous à la vapeur s\'appelle un ___.',
      data: { answer: 'couscoussier', hint: 'Passoire sur marmite' },
    },
    {
      id: 'local-ma-couscous-4', lessonId: 'local', orderIndex: 3, xpReward: 10,
      type: 'association',
      question: 'Associe chaque épice à sa description :',
      data: {
        pairs: [
          { left: 'Ras-el-hanout', right: 'Jusqu\'à 50 épices mélangées' },
          { left: 'Safran de Taliouine', right: 'Plus précieux que l\'or, au pistilets' },
          { left: 'Cumin', right: 'Graine chaude et terreuse, indispensable' },
          { left: 'Coriandre', right: 'Graine douce et citronnée' },
        ],
      },
    },
  ],

  'Les Épices Marocaines': [
    { id: 'local-ma1-1', lessonId: 'ma-1', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le ras-el-hanout est :',
      data: { options: ['Un mélange pouvant comporter jusqu\'à 50 épices différentes', 'Une épice unique rare', 'Une herbe fraîche', 'Un condiment pimenté'], correctIndex: 0,
        anecdote: '"Ras el hanout" signifie "tête du magasin" en arabe — les épiciers mélangeaient leurs meilleures épices. Chaque épicier a sa propre recette secrète.' } },
    { id: 'local-ma1-2', lessonId: 'ma-1', orderIndex: 1, xpReward: 10,
      type: 'association',
      question: 'Associe chaque épice marocaine à sa caractéristique :',
      data: { pairs: [
        { left: 'Safran de Taliouine', right: 'Plus précieux que l\'or, pistils de crocus' },
        { left: 'Cumin', right: 'Graine chaude et terreuse, indispensable au couscous' },
        { left: 'Coriandre moulue', right: 'Graine douce et citronnée' },
        { left: 'Paprika fumé', right: 'Couleur rouge et saveur douce à fumée' },
      ] } },
    { id: 'local-ma1-3', lessonId: 'ma-1', orderIndex: 2, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Le mélange d\'épices qui donne au poulet rôti marocain sa couleur jaune dorée est le ___, contenant safran, gingembre, curcuma et ail.',
      data: { answer: 'chermoula', hint: 'Aussi utilisée en marinade pour le poisson' } },
  ],

  "Le Tajine d'Agneau": [
    { id: 'local-ma3-1', lessonId: 'ma-3', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le tajine est à la fois le nom du plat et :',
      data: { options: ['L\'ustensile conique en terre cuite qui le cuit', 'La sauce épicée qui l\'accompagne', 'La viande utilisée', 'Le riz servi en dessous'], correctIndex: 0,
        anecdote: 'Le couvercle conique du tajine est conçu pour condenser la vapeur et la faire retomber sur les aliments — une technique de cuisson à l\'économie d\'eau adaptée au climat sec du Maghreb.' } },
    { id: 'local-ma3-2', lessonId: 'ma-3', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Le tajine d\'agneau aux pruneaux et amandes combine le sucré et le salé — une influence de la cuisine ___ médiévale.',
      data: { answer: 'persane / arabo-andalouse', hint: 'Les Arabes ont apporté ce mélange sucré-salé au Maghreb' } },
    { id: 'local-ma3-3', lessonId: 'ma-3', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Pour un tajine fondant, la cuisson idéale est :',
      data: { options: ['Feu doux très longtemps (2-3h) avec peu de liquide — la vapeur fait tout', 'Feu vif 30 min avec beaucoup d\'eau', 'Four à 200°C 1h', 'Cocotte-minute 20 min'], correctIndex: 0 } },
  ],

  'La Pastilla au Poulet': [
    { id: 'local-ma4-1', lessonId: 'ma-4', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'La pastilla est enveloppée dans :',
      data: { options: ['Feuilles de brick (ou ouarka) — une pâte ultra-fine marocaine', 'Pâte feuilletée classique', 'Pâte brisée', 'Feuilles de phyllo grecques'], correctIndex: 0,
        anecdote: 'La pastilla (bastilla) est un héritage de la cuisine maure andalouse. Manger sucré-salé dans une même bouchée (cannelle + sucre + viande) représente la sophistication de la cuisine royale marocaine de Fès.' } },
    { id: 'local-ma4-2', lessonId: 'ma-4', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La pastilla se finit toujours par un saupoudrage de ___ et de cannelle en poudre sur le dessus doré.',
      data: { answer: 'sucre glace', hint: 'Le contraste sucré sur la viande salée est la signature du plat' } },
    { id: 'local-ma4-3', lessonId: 'ma-4', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Outre le poulet, quelle autre garniture est classique dans la pastilla ?',
      data: { options: ['Amandes grillées sucrées-épicées et œufs brouillés aromatisés', 'Fromage frais et herbes', 'Riz pilaf aux raisins', 'Légumes vapeur'], correctIndex: 0 } },
  ],

  'Les Cornes de Gazelle': [
    { id: 'local-ma5-1', lessonId: 'ma-5', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Les cornes de gazelle (kaab el ghzal) sont fourrées de :',
      data: { options: ['Pâte d\'amandes aromatisée à l\'eau de fleur d\'oranger et cannelle', 'Pâte de dattes', 'Confiture de figue', 'Miel et noix'], correctIndex: 0,
        anecdote: 'Les cornes de gazelle sont la pâtisserie marocaine la plus connue. Leur forme incurvée imite la corne d\'une gazelle. Elles sont servies pour les fêtes et les mariages.' } },
    { id: 'local-ma5-2', lessonId: 'ma-5', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La pâte des cornes de gazelle est traditionnellement pétrie avec du ___ fondu au lieu d\'eau.',
      data: { answer: 'beurre', hint: 'Cela donne une texture sablée qui fond en bouche' } },
    { id: 'local-ma5-3', lessonId: 'ma-5', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Pour les parfumer, les amandes de la farce sont aromatisées avec :',
      data: { options: ['Eau de fleur d\'oranger et eau de rose', 'Extrait de vanille', 'Zeste de citron uniquement', 'Mastic (résine)'], correctIndex: 0 } },
  ],

  // ── BBQ ─────────────────────────────────────────────────────────────────────

  'Choisir son Bois de Fumage': [
    { id: 'local-bb1-1', lessonId: 'bb-1', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quel bois est le plus doux et conseillé pour les volailles et poissons ?',
      data: { options: ['Bois de pommier ou de cerisier — fumée fruitée légère', 'Hickory — fumée puissante de noix', 'Mesquite — fumée intense terreuse', 'Chêne — fumée forte universelle'], correctIndex: 0,
        anecdote: 'Le choix du bois de fumage est aussi important que la marinade. Le mesquite brûle très chaud et convient aux grillades rapides texanes, mais peut amariquer si on fume trop longtemps.' } },
    { id: 'local-bb1-2', lessonId: 'bb-1', orderIndex: 1, xpReward: 10,
      type: 'association',
      question: 'Associe chaque bois à son accord optimal :',
      data: { pairs: [
        { left: 'Hickory', right: 'Porc et bœuf — fumée noix intense' },
        { left: 'Pommier', right: 'Volaille et porc — fumée douce sucrée' },
        { left: 'Mesquite', right: 'Bœuf Texas — fumée terreuse intense' },
        { left: 'Cerisier', right: 'Canard et gibier — couleur acajou' },
      ] } },
    { id: 'local-bb1-3', lessonId: 'bb-1', orderIndex: 2, xpReward: 10,
      type: 'fill_in_blank',
      question: 'On ne doit jamais utiliser de bois ___ (pin, épicéa) pour fumer car leur résine produit des composés toxiques.',
      data: { answer: 'résineux', hint: 'Les conifères contiennent des résines nocives' } },
  ],

  'Le Pulled Pork': [
    { id: 'local-bb3-1', lessonId: 'bb-3', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'La température interne cible pour un pulled pork parfaitement effiloché est :',
      data: { options: ['93-95°C — le collagène est totalement fondu en gélatine', '75°C — safe mais trop ferme', '85°C — mi-chemin', '100°C — trop cuit, se dessèche'], correctIndex: 0,
        anecdote: 'Le "stall" (plateau) est un phénomène entre 65-75°C où la température stagne des heures — l\'évaporation de l\'humidité refroidit la viande. Envelopper dans du papier butcher passe ce cap.' } },
    { id: 'local-bb3-2', lessonId: 'bb-3', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Le pulled pork utilise l\'épaule de porc car c\'est un muscle très travaillé, riche en ___ qui fond en gélatine à haute température.',
      data: { answer: 'collagène', hint: 'Comme pour le bœuf bourguignon — la cuisson lente transforme le dur en fondant' } },
    { id: 'local-bb3-3', lessonId: 'bb-3', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le "bark" (croûte noire externe) du pulled pork est formé par :',
      data: { options: ['La réaction de Maillard + caramélisation du rub sur la longue cuisson', 'La brûlure du bois', 'Une sauce appliquée en fin de cuisson', 'Le sel qui carbonise'], correctIndex: 0 } },
  ],

  'Les Ribs Kansas City': [
    { id: 'local-bb4-1', lessonId: 'bb-4', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'La méthode "3-2-1" pour les ribs signifie :',
      data: { options: ['3h fumé, 2h emballé dans du papier alu, 1h à la sauce', '3h à feu vif, 2h repos, 1h glaçage', '3 couches de sauce, 2 retournements, 1h de repos', '3 bois différents, 2 températures, 1 sauce'], correctIndex: 0,
        anecdote: 'Kansas City est la capitale mondiale du BBQ avec plus de 100 restaurants de BBQ. La sauce KC est épaisse, sucrée-fumée à base de tomate et mélasse — à contraster avec la sauce vinaigrée de Caroline du Nord.' } },
    { id: 'local-bb4-2', lessonId: 'bb-4', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Avant de cuire les ribs, on retire la ___ sur l\'envers pour que les épices pénètrent et la texture soit meilleure.',
      data: { answer: 'membrane / plèvre', hint: 'Peau argentée sur l\'os — on la soulève avec un couteau et tire' } },
    { id: 'local-bb4-3', lessonId: 'bb-4', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Des ribs parfaitement cuits présentent le "bend test" :',
      data: { options: ['La viande se fissure légèrement quand on plie le rack — pas tomber-de-l\'os ni résistance', 'La viande tombe toute seule des os', 'L\'os ressort propre en tirant', 'La surface craque comme du verre'], correctIndex: 0 } },
  ],

  'Le Brisket Texas': [
    { id: 'local-bb5-1', lessonId: 'bb-5', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'La poitrine de bœuf (brisket) est fumée low & slow car :',
      data: { options: ['C\'est un muscle très sollicité riche en collagène qui nécessite 10-14h pour fondre', 'C\'est une pièce très maigre qui cuirait vite', 'Elle doit rester saignante', 'Le froid ralentit naturellement la cuisson'], correctIndex: 0,
        anecdote: 'La Aaron Franklin (Franklin BBQ, Austin TX) a été désigné "meilleur brisket du monde" par Bon Appétit. Sa recette : sel + poivre grossier uniquement, bois de chêne du Texas, 12h à 110°C. Rien d\'autre.' } },
    { id: 'local-bb5-2', lessonId: 'bb-5', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Le brisket texan authentique se sèche uniquement avec du sel et du ___ grossièrement moulu — pas d\'épices complexes.',
      data: { answer: 'poivre noir', hint: 'La philosophie texane : le bœuf doit parler, pas les épices' } },
    { id: 'local-bb5-3', lessonId: 'bb-5', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Après cuisson, le brisket doit reposer emballé dans du papier butcher pendant :',
      data: { options: ['1 à 4 heures — les jus se redistribuent et il reste chaud', '5 minutes seulement', 'Toute une nuit au froid', 'Il se mange immédiatement'], correctIndex: 0 } },
  ],

  'Les Marinades': [
    {
      id: 'local-bbq-marinade-1', lessonId: 'local', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quel élément d\'une marinade attendrit la viande en décomposant les fibres musculaires ?',
      data: {
        options: ['L\'huile', 'L\'acide (citron, vinaigre, vin)', 'Le sel', 'Les herbes'],
        correctIndex: 1,
      },
    },
    {
      id: 'local-bbq-marinade-2', lessonId: 'local', orderIndex: 1, xpReward: 10,
      type: 'multiple_choice',
      question: 'Combien de temps maximum doit-on mariner du poulet ?',
      data: {
        options: ['30 minutes maximum', '2 heures maximum', '24 heures maximum', '72 heures'],
        correctIndex: 2,
      },
    },
    {
      id: 'local-bbq-marinade-3', lessonId: 'local', orderIndex: 2, xpReward: 10,
      type: 'association',
      question: 'Associe chaque style de BBQ à sa région américaine :',
      data: {
        pairs: [
          { left: 'Kansas City', right: 'Sauce tomate sucrée épaisse' },
          { left: 'Caroline du Nord', right: 'Base vinaigre, sans tomate' },
          { left: 'Texas', right: 'Bœuf nature, rub sec, peu de sauce' },
          { left: 'Memphis', right: 'Porc effiloché, rub sec ou sauce légère' },
        ],
      },
    },
    {
      id: 'local-bbq-marinade-4', lessonId: 'local', orderIndex: 3, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Le mélange d\'épices sèches frotté sur la viande avant cuisson s\'appelle un "dry ___".',
      data: { answer: 'rub', hint: 'Terme anglais, paprika + sel + sucre + épices' },
    },
  ],

  // ── VEGAN ───────────────────────────────────────────────────────────────────

  'Les Bases du Vegan': [
    { id: 'local-vg1-1', lessonId: 'vg-1', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quel ingrédient remplace les œufs dans les gâteaux vegan ?',
      data: { options: ['Compote de pommes, banane écrasée, ou graines de lin moulues + eau', 'Lait de soja uniquement', 'Sucre supplémentaire', 'Levure chimique en double dose'], correctIndex: 0,
        anecdote: 'L\'aquafaba (eau de cuisson des pois chiches) monte en neige comme les blancs d\'œuf — découverte accidentelle par Joël Roessel en 2014. 45 ml = 2 blancs d\'œuf en pâtisserie.' } },
    { id: 'local-vg1-2', lessonId: 'vg-1', orderIndex: 1, xpReward: 10,
      type: 'association',
      question: 'Associe chaque substitut à l\'ingrédient animal qu\'il remplace :',
      data: { pairs: [
        { left: 'Aquafaba', right: 'Blancs d\'œuf' },
        { left: 'Noix de cajou trempées', right: 'Crème fraîche / fromage blanc' },
        { left: 'Lait de coco entier', right: 'Crème liquide' },
        { left: 'Tofu soyeux', right: 'Ricotta / fromage frais' },
      ] } },
    { id: 'local-vg1-3', lessonId: 'vg-1', orderIndex: 2, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La levure ___ donne un goût fromager aux plats vegan — elle est riche en vitamines B et en protéines.',
      data: { answer: 'nutritionnelle', hint: 'Aussi appelée "levure maltée" ou "nooch"' } },
  ],

  'Le Buddha Bowl': [
    { id: 'local-vg2-1', lessonId: 'vg-2', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Un buddha bowl équilibré doit contenir :',
      data: { options: ['Base de grains + protéines végétales + légumes + bonne sauce', 'Uniquement des légumes crus', 'Riz blanc + tofu frit', 'N\'importe quoi dans un bol'], correctIndex: 0,
        anecdote: 'Le nom "buddha bowl" (bol de Bouddha) fait référence au bol que le Bouddha portait en mendiant sa nourriture — reçevant des dons de différents plats dans un seul récipient.' } },
    { id: 'local-vg2-2', lessonId: 'vg-2', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La sauce tahini classique du buddha bowl se prépare avec de la purée de sésame, du citron, de l\'ail et de ___ pour la diluer.',
      data: { answer: 'l\'eau froide', hint: 'L\'eau froide crée une émulsion épaisse et crémeuse' } },
    { id: 'local-vg2-3', lessonId: 'vg-2', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Pour des légumes rôtis dorés (et non vapeur) dans le buddha bowl :',
      data: { options: ['Four à 200-220°C, légumes espacés sur la plaque, pas entassés', 'Four à 160°C couvert', 'Poêle avec eau à couvert', 'Micro-ondes 5 min'], correctIndex: 0 } },
  ],

  'Les Fromages Végétaux': [
    { id: 'local-vg4-1', lessonId: 'vg-4', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'La base des fromages végétaux fermentés est souvent :',
      data: { options: ['Noix de cajou trempées et mixées — crème naturellement riche', 'Tofu mixé uniquement', 'Lait de soja', 'Purée d\'amandes'], correctIndex: 0,
        anecdote: 'Les fromages vegan fermentés utilisent des bactéries lactiques (comme les fromages classiques) — L. acidophilus, L. bulgaricus. La fermentation développe les arômes acides et complexes absents dans les fromages crus non fermentés.' } },
    { id: 'local-vg4-2', lessonId: 'vg-4', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Pour donner un goût "fromager" aux noix de cajou, on ajoute de la levure ___ et du miso.',
      data: { answer: 'nutritionnelle', hint: 'Elle apporte l\'umami et la saveur lactée' } },
    { id: 'local-vg4-3', lessonId: 'vg-4', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Pour un fromage vegan qui se coupe (style cheddar), on utilise comme gélifiant :',
      data: { options: ['Agar-agar (gélifiant végétal issu d\'algues)', 'Gélatine animale', 'Amidon de maïs uniquement', 'Pectine de pomme'], correctIndex: 0 } },
  ],

  'Le Rôti de Seitan': [
    { id: 'local-vg5-1', lessonId: 'vg-5', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le seitan est fabriqué à partir de :',
      data: { options: ['Gluten de blé — la protéine lavée de l\'amidon', 'Soja fermenté', 'Pois chiches', 'Lentilles'], correctIndex: 0,
        anecdote: 'Le seitan (aussi appelé "viande de blé") est utilisé par les moines bouddhistes depuis le VIe siècle. Le mot "seitan" a été popularisé par la macrobiotique japonaise dans les années 1960.' } },
    { id: 'local-vg5-2', lessonId: 'vg-5', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Pour préparer le seitan maison, on pétrit de la farine, on le rince à l\'eau froide pour éliminer l\'amidon, ne gardant que le ___.',
      data: { answer: 'gluten', hint: 'Protéine élastique qui donne la texture "viande"' } },
    { id: 'local-vg5-3', lessonId: 'vg-5', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'La texture du rôti de seitan est améliorée en le cuisant dans un bouillon savoureux car :',
      data: { options: ['Le seitan absorbe les saveurs du bouillon et gonfle légèrement', 'L\'eau le ramollit seulement', 'Il faut le déshydrater au four', 'Le bouillon lui donne sa texture sans autre effet'], correctIndex: 0 } },
  ],

  'Protéines Végétales': [
    {
      id: 'local-vg-protein-1', lessonId: 'local', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Qu\'est-ce que l\'aquafaba ?',
      data: {
        options: [
          'Une plante aquatique comestible',
          'L\'eau de cuisson des pois chiches, utilisée comme blanc d\'œuf',
          'Un fromage végétal à base d\'amandes',
          'Une algue riche en protéines',
        ],
        correctIndex: 1,
      },
    },
    {
      id: 'local-vg-protein-2', lessonId: 'local', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La levure ___ apporte un goût umami et fromager aux plats vegan.',
      data: { answer: 'nutritionnelle', hint: 'Aussi appelée "nooch"' },
    },
    {
      id: 'local-vg-protein-3', lessonId: 'local', orderIndex: 2, xpReward: 10,
      type: 'association',
      question: 'Associe chaque protéine végétale à sa source :',
      data: {
        pairs: [
          { left: 'Tofu', right: 'Lait de soja coagulé' },
          { left: 'Seitan', right: 'Gluten de blé' },
          { left: 'Tempeh', right: 'Soja fermenté' },
          { left: 'Aquafaba', right: 'Eau de cuisson pois chiches' },
        ],
      },
    },
    {
      id: 'local-vg-protein-4', lessonId: 'local', orderIndex: 3, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quand le terme "vegan" a-t-il été créé et par qui ?',
      data: {
        options: [
          'En 1900 par des moines bouddhistes',
          'En 1944 par Donald Watson à Leicester',
          'En 1970 pendant le mouvement hippie',
          'En 1980 par des scientifiques nutritionnistes',
        ],
        correctIndex: 1,
      },
    },
  ],
  // ── FRENCH (new lessons) ─────────────────────────────────────────────────────

  'La Ratatouille': [
    {
      id: 'local-fr7-1', lessonId: 'fr-7', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quelle est l\'origine de la ratatouille ?',
      data: {
        options: ['La Bretagne', 'La Provence (Nice)', 'L\'Alsace', 'Le Périgord'],
        correctIndex: 1,
        anecdote: 'La ratatouille est un plat d\'été niçois. Son nom vient du verbe "touiller" (remuer). Elle a été popularisée dans le monde entier grâce au film Pixar de 2007 !',
      },
    },
    {
      id: 'local-fr7-2', lessonId: 'fr-7', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La ratatouille contient des courgettes, des aubergines, des poivrons, des tomates et des ___.',
      data: { answer: 'oignons', hint: 'Légume à l\'odeur forte qui fait pleurer' },
    },
    {
      id: 'local-fr7-3', lessonId: 'fr-7', orderIndex: 2, xpReward: 10,
      type: 'step_ordering',
      question: 'Remets les étapes de la ratatouille dans l\'ordre :',
      data: {
        steps: ['Ajouter les tomates et mijoter 20 min', 'Faire revenir l\'oignon et l\'ail', 'Faire sauter les courgettes et aubergines séparément', 'Assaisonner avec thym, basilic et huile d\'olive'],
        correctOrder: [1, 2, 0, 3],
      },
    },
  ],

  'Le Coq au Vin': [
    {
      id: 'local-fr13-1', lessonId: 'fr-13', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Dans le coq au vin classique, quel vin utilise-t-on ?',
      data: {
        options: ['Vin blanc de Bourgogne', 'Vin rouge de Bourgogne (Pinot Noir)', 'Champagne', 'Bordeaux'],
        correctIndex: 1,
        anecdote: 'Autrefois, on cuisinait les vieux coqs trop coriaces pour être rôtis. La cuisson longue dans le vin les attendrissait. Julia Child a popularisé la recette aux États-Unis dans les années 1960.',
      },
    },
    {
      id: 'local-fr13-2', lessonId: 'fr-13', orderIndex: 1, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quelle est la durée de marinade recommandée pour le coq au vin ?',
      data: {
        options: ['15 minutes', '1 heure', '12 à 24 heures', '3 jours'],
        correctIndex: 2,
      },
    },
    {
      id: 'local-fr13-3', lessonId: 'fr-13', orderIndex: 2, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Les petits champignons utilisés dans le coq au vin s\'appellent des champignons de ___.',
      data: { answer: 'Paris', hint: 'La capitale de la France' },
    },
  ],

  'La Bouillabaisse': [
    {
      id: 'local-fr19-1', lessonId: 'fr-19', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'De quelle ville provient la bouillabaisse ?',
      data: {
        options: ['Nice', 'Marseille', 'Toulon', 'Montpellier'],
        correctIndex: 1,
        anecdote: 'La bouillabaisse est née à Marseille comme soupe de pêcheurs utilisant les poissons invendables. Elle doit son nom au provençal "bolh abaisso" — "ça bout, on baisse le feu".',
      },
    },
    {
      id: 'local-fr19-2', lessonId: 'fr-19', orderIndex: 1, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quelle sauce accompagne obligatoirement la bouillabaisse ?',
      data: {
        options: ['Aïoli', 'Rouille', 'Tapenade', 'Pistou'],
        correctIndex: 1,
      },
    },
    {
      id: 'local-fr19-3', lessonId: 'fr-19', orderIndex: 2, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La rouille est une sauce à base d\'ail, safran, huile d\'olive et de ___ pour lier.',
      data: { answer: 'mie de pain', hint: 'La partie molle du pain' },
    },
  ],

  // ── FRENCH (new lessons fr-8 to fr-20) ────────────────────────────────────

  'Le Confit de Canard': [
    { id: 'local-fr8-1', lessonId: 'fr-8', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'À quelle température cuit-on le confit de canard ?',
      data: { options: ['200°C pendant 30 min', '80-90°C pendant 2-3 heures', '160°C pendant 1 heure', '50°C pendant 6 heures'], correctIndex: 1,
        anecdote: 'Le confit est une technique de conservation gasconne : la graisse créait une barrière hermétique et pouvait conserver le canard plusieurs mois sans réfrigération.' } },
    { id: 'local-fr8-2', lessonId: 'fr-8', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Avant de confir, on frotte les cuisses de canard avec du sel et des aromates, puis on les laisse mariner au frais pendant ___.',
      data: { answer: '24 heures', hint: 'Une nuit complète au minimum' } },
    { id: 'local-fr8-3', lessonId: 'fr-8', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Pour un confit croustillant, comment finit-on la cuisson ?',
      data: { options: ['Poêle à feu vif côté peau, sans matière grasse ajoutée', 'Four à 240°C 5 min', 'Friture à 180°C', 'Grill à pleine puissance'], correctIndex: 0 } },
  ],

  'Le Pot-au-Feu': [
    { id: 'local-fr10-1', lessonId: 'fr-10', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quelle est la règle d\'or pour obtenir un bouillon de pot-au-feu clair ?',
      data: { options: ['Démarrer à froid et écumer soigneusement', 'Porter à ébullition forte', 'Couvrir hermétiquement', 'Ajouter du vinaigre'], correctIndex: 0,
        anecdote: 'Le pot-au-feu est mentionné dès le XVe siècle. Mirabeau l\'appelait "le symbole de la vie de famille française".' } },
    { id: 'local-fr10-2', lessonId: 'fr-10', orderIndex: 1, xpReward: 10,
      type: 'association',
      question: 'Associe chaque morceau de bœuf à son rôle dans le pot-au-feu :',
      data: { pairs: [
        { left: 'Plat de côtes', right: 'Viande gélatineuse et goûteuse' },
        { left: 'Queue de bœuf', right: 'Enrichit le bouillon en collagène' },
        { left: 'Gîte', right: 'Viande ferme à fibres longues' },
        { left: 'Os à moelle', right: 'Onctuosité et arôme fumé' },
      ] } },
    { id: 'local-fr10-3', lessonId: 'fr-10', orderIndex: 2, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Les légumes du pot-au-feu (carottes, poireaux, navets) sont ajoutés ___ pour ne pas les réduire en bouillie.',
      data: { answer: 'en cours de cuisson', hint: 'Pas dès le début avec la viande' } },
  ],

  'Les Gougères': [
    { id: 'local-fr11-1', lessonId: 'fr-11', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'La pâte à choux est une émulsion de :',
      data: { options: ['Eau + beurre + farine + œufs', 'Lait + sucre + beurre + farine', 'Eau + sel + farine + levure', 'Beurre + sucre + amandes + farine'], correctIndex: 0,
        anecdote: 'Les gougères sont originaires de Bourgogne. Elles étaient traditionnellement offertes lors des dégustations de vin pour "préparer" le palais.' } },
    { id: 'local-fr11-2', lessonId: 'fr-11', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Pour que les choux gonflent correctement, on ne doit jamais ouvrir le four pendant les premières ___ de cuisson.',
      data: { answer: '20 minutes', hint: 'La vapeur interne est responsable du gonflement' } },
    { id: 'local-fr11-3', lessonId: 'fr-11', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quel fromage est traditionnellement utilisé dans les gougères ?',
      data: { options: ['Gruyère ou Comté râpé', 'Mozzarella', 'Camembert', 'Parmesan'], correctIndex: 0 } },
  ],

  "La Bavette à l'Échalote": [
    { id: 'local-fr12-1', lessonId: 'fr-12', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Pour réussir la bavette, elle doit être cuite :',
      data: { options: ['Saignante à bleue — max 3 min par côté à feu très vif', 'Bien cuite 10 min à feu moyen', 'À la vapeur', 'Mijotée 1 heure dans du vin'], correctIndex: 0,
        anecdote: 'La bavette est un muscle abdominal très sollicité, d\'où ses fibres longues. Elle doit être tranchée perpendiculairement aux fibres pour être tendre.' } },
    { id: 'local-fr12-2', lessonId: 'fr-12', orderIndex: 1, xpReward: 10,
      type: 'step_ordering',
      question: 'Remets les étapes de la sauce échalote dans l\'ordre :',
      data: {
        steps: ['Déglacer avec vin rouge et laisser réduire', 'Monter au beurre froid hors du feu', 'Faire suer les échalotes émincées dans le beurre', 'Assaisonner et servir sur la bavette reposée'],
        correctOrder: [2, 0, 1, 3],
      } },
    { id: 'local-fr12-3', lessonId: 'fr-12', orderIndex: 2, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Après cuisson, la bavette doit reposer ___ avant d\'être découpée pour que les jus se redistribuent.',
      data: { answer: '3 à 5 minutes', hint: 'Aussi longtemps que le temps de cuisson' } },
  ],

  'La Vichyssoise': [
    { id: 'local-fr14-1', lessonId: 'fr-14', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'La vichyssoise est servie :',
      data: { options: ['Froide ou à température ambiante', 'Très chaude avec croûtons', 'Tiède avec lardons', 'À température ambiante avec crème fraîche chaude'], correctIndex: 0,
        anecdote: 'Paradoxe: la vichyssoise a été créée non pas en France, mais à New York en 1917 par le chef Louis Diat, nostalgique de la soupe chaude que lui faisait sa grand-mère à Vichy.' } },
    { id: 'local-fr14-2', lessonId: 'fr-14', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La vichyssoise est préparée avec les ___ blancs des poireaux (parties tendres) et des pommes de terre.',
      data: { answer: 'blancs', hint: 'On n\'utilise pas les feuilles vertes' } },
    { id: 'local-fr14-3', lessonId: 'fr-14', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Pour une texture parfaitement soyeuse, on passe la vichyssoise au :',
      data: { options: ['Mixeur plongeant puis tamis fin ou chinois', 'Moulin à légumes seulement', 'Robot-coupe sans passer au tamis', 'Blender sans filtrer'], correctIndex: 0 } },
  ],

  "Le Canard à l'Orange": [
    { id: 'local-fr15-1', lessonId: 'fr-15', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'La sauce bigarade du canard à l\'orange est une sauce :',
      data: { options: ['Aigre-douce à base d\'orange amère, sucre caramélisé et fond de veau', 'Simplement du jus d\'orange chaud', 'Crème + jus d\'orange', 'Vinaigrette à l\'orange'], correctIndex: 0,
        anecdote: 'Le canard à l\'orange est un classique de la haute cuisine française datant du XVIIe siècle. "Bigarade" désigne l\'orange amère de Séville, plus parfumée que l\'orange douce.' } },
    { id: 'local-fr15-2', lessonId: 'fr-15', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Le caramel à sec utilisé dans la sauce bigarade est "piqué" avec du vinaigre — c\'est ce qu\'on appelle un ___.',
      data: { answer: 'gastrique', hint: 'Caramel dégacé avec du vinaigre ou jus d\'agrume' } },
    { id: 'local-fr15-3', lessonId: 'fr-15', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Pour rôtir le canard entier, quelle est la technique correcte ?',
      data: { options: ['Démarrer sur poitrine, retourner régulièrement pour fondre la graisse sous-cutanée', 'Poitrine vers le haut toute la cuisson à 200°C', 'Cuire dans un fond d\'eau pour garder l\'humidité', 'Envelopper dans du papier alu'], correctIndex: 0 } },
  ],

  'Les Oeufs Cocotte': [
    { id: 'local-fr16-1', lessonId: 'fr-16', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Les œufs cocotte cuisent par :',
      data: { options: ['Bain-marie au four', 'Vapeur directe', 'Grill du four', 'Micro-ondes'], correctIndex: 0,
        anecdote: 'Les œufs cocotte étaient servis dans les grands restaurants parisiens dès le XIXe siècle. Le mot "cocotte" désigne le petit ramequin en céramique ou fonte dans lequel ils cuisent.' } },
    { id: 'local-fr16-2', lessonId: 'fr-16', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Pour un jaune coulant, on cuit les œufs cocotte environ ___ minutes au bain-marie.',
      data: { answer: '12 à 15', hint: 'Le blanc doit être pris, le jaune encore tremblant' } },
    { id: 'local-fr16-3', lessonId: 'fr-16', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Qu\'ajoute-t-on classiquement dans le fond du ramequin avant l\'œuf ?',
      data: { options: ['Une cuillerée de crème fraîche épaisse', 'De l\'eau bouillante', 'Du lait', 'Rien'], correctIndex: 0 } },
  ],

  'La Brandade de Morue': [
    { id: 'local-fr17-1', lessonId: 'fr-17', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Avant de cuisiner la morue salée, combien de temps faut-il la dessaler ?',
      data: { options: ['24 à 48 heures dans l\'eau froide renouvelée', '2 heures dans l\'eau chaude', '1 nuit dans le lait', '30 minutes à l\'eau courante'], correctIndex: 0,
        anecdote: 'La brandade de morue est originaire de Nîmes et de la région nimoise. Le mot "brandade" vient du provençal "brandar" signifiant "remuer" — geste répété pour émulsionner le plat.' } },
    { id: 'local-fr17-2', lessonId: 'fr-17', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La brandade nimoise est une émulsion de morue pochée, ail et huile d\'olive — sans ___, contrairement à la version parisienne.',
      data: { answer: 'pommes de terre', hint: 'Ajout bourgeois parisien du XIXe siècle' } },
    { id: 'local-fr17-3', lessonId: 'fr-17', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Pour réussir l\'émulsion de la brandade, on incorpore l\'huile d\'olive :',
      data: { options: ['En filet, hors du feu, en remuant énergiquement', 'Toute à la fois en début de cuisson', 'Au mixer à grande vitesse', 'Froide en dehors de la cuisson'], correctIndex: 0 } },
  ],

  'Le Paris-Brest': [
    { id: 'local-fr18-1', lessonId: 'fr-18', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le Paris-Brest a été créé pour commémorer :',
      data: { options: ['La course cycliste Paris-Brest-Paris de 1891', 'L\'Exposition Universelle de 1900', 'La visite du Président à Brest', 'La réouverture du Moulin Rouge'], correctIndex: 0,
        anecdote: 'Le pâtissier Louis Durand a créé ce gâteau en 1910 à la demande de Pierre Giffard, organisateur de la course Paris-Brest. La forme en couronne représente une roue de vélo.' } },
    { id: 'local-fr18-2', lessonId: 'fr-18', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La crème mousseline pralinée du Paris-Brest est obtenue en incorporant du beurre pommade dans une crème ___.',
      data: { answer: 'pâtissière', hint: 'La base classique des gâteaux français' } },
    { id: 'local-fr18-3', lessonId: 'fr-18', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Avant cuisson, on parsème la couronne de choux d\'amandes :',
      data: { options: ['Effilées — elles dorent et apportent croquant', 'En poudre mélangée à la pâte', 'Entières concassées', 'On ne met pas d\'amandes'], correctIndex: 0 } },
  ],

  'Le Millefeuille': [
    { id: 'local-fr20-1', lessonId: 'fr-20', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Combien de couches de feuilletage un millefeuille traditionnel comporte-t-il ?',
      data: { options: ['3 rectangles de pâte feuilletée, soit ~729 couches par rectangle', '1 seule grande plaque', '6 couches fines', '10 disques ronds'], correctIndex: 0,
        anecdote: 'La pâte feuilletée compte théoriquement 2048 couches après 6 tours. Le millefeuille d\'Antonin Carême (1815) était déjà composé de 3 étages de feuilletage.' } },
    { id: 'local-fr20-2', lessonId: 'fr-20', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Pour empêcher la pâte feuilletée de gonfler à la cuisson, on la pique avec une fourchette — c\'est ce qu\'on appelle "___" la pâte.',
      data: { answer: 'piquer', hint: 'On perfore régulièrement toute la surface' } },
    { id: 'local-fr20-3', lessonId: 'fr-20', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le glaçage royal du millefeuille classique est réalisé avec :',
      data: { options: ['Sucre glace + blanc d\'œuf + jus de citron', 'Chocolat fondu + crème', 'Fondant commercial chauffé', 'Sucre + eau uniquement'], correctIndex: 0 } },
  ],

  'La Tempura': [
    { id: 'local-jp5-1', lessonId: 'jp-5', orderIndex: 0, xpReward: 10, type: 'multiple_choice',
      question: 'La tempura a été introduite au Japon par qui au XVIe siècle ?',
      data: { options: ['Les missionnaires jésuites portugais', 'Les marchands chinois', 'Les Hollandais', 'Les Coréens'], correctIndex: 0 } },
    { id: 'local-jp5-2', lessonId: 'jp-5', orderIndex: 1, xpReward: 10, type: 'fill_in_blank',
      question: 'La pâte à tempura doit être préparée avec de l\'eau ___ et ne pas être trop mélangée pour rester légère.',
      data: { answer: 'glacée', hint: 'Le froid empêche le gluten de se développer' } },
    { id: 'local-jp5-3', lessonId: 'jp-5', orderIndex: 2, xpReward: 10, type: 'multiple_choice',
      question: 'À quelle température doit-on frire la tempura pour obtenir un enrobage croustillant et léger ?',
      data: { options: ['170-180°C', '140°C', '200°C', '120°C'], correctIndex: 0 } },
  ],

  'Le Wagyu & Yakitori': [
    { id: 'local-jp6-1', lessonId: 'jp-6', orderIndex: 0, xpReward: 10, type: 'multiple_choice',
      question: 'Qu\'est-ce qui rend le bœuf wagyu si particulier ?',
      data: { options: ['Son persillé exceptionnel (marbrure de gras intramusculaire) qui fond en bouche', 'Sa couleur rouge vif', 'Sa taille imposante', 'Son goût très fort'], correctIndex: 0 } },
    { id: 'local-jp6-2', lessonId: 'jp-6', orderIndex: 1, xpReward: 10, type: 'fill_in_blank',
      question: 'Les yakitori sont des brochettes de poulet grillées sur des braises de charbon de bois japonais appelé ___.',
      data: { answer: 'binchotan', hint: 'Charbon blanc de chêne — brûle longtemps et sans fumée' } },
    { id: 'local-jp6-3', lessonId: 'jp-6', orderIndex: 2, xpReward: 10, type: 'multiple_choice',
      question: 'La sauce tare pour yakitori est composée principalement de :',
      data: { options: ['Sauce soja, mirin, saké et sucre réduits ensemble', 'Miso et sésame', 'Huile de sésame et gingembre', 'Ponzu et yuzu'], correctIndex: 0 } },
  ],

  // ── JAPANESE (new lessons) ─────────────────────────────────────────────────

  'La Soupe Miso': [
    {
      id: 'local-jp7-1', lessonId: 'jp-7', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Qu\'est-ce que le miso ?',
      data: {
        options: ['Une algue séchée', 'Une pâte de soja fermentée', 'Un bouillon de poisson', 'Un condiment sucré'],
        correctIndex: 1,
        anecdote: 'Le miso existe depuis plus de 1300 ans au Japon. Il existe des centaines de variétés selon la région et la durée de fermentation. Le miso blanc (shiro) est doux, le miso rouge (aka) est plus intense.',
      },
    },
    {
      id: 'local-jp7-2', lessonId: 'jp-7', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'On ne doit jamais faire ___ le miso pour conserver ses bienfaits et son arôme.',
      data: { answer: 'bouillir', hint: 'La chaleur extrême détruit les probiotiques' },
    },
    {
      id: 'local-jp7-3', lessonId: 'jp-7', orderIndex: 2, xpReward: 10,
      type: 'association',
      question: 'Associe chaque ingrédient à son rôle dans la soupe miso :',
      data: { pairs: [
        { left: 'Dashi', right: 'Base de bouillon' },
        { left: 'Miso', right: 'Pâte fermentée' },
        { left: 'Tofu soyeux', right: 'Protéines douces' },
        { left: 'Wakamé', right: 'Algue marine' },
      ] },
    },
  ],

  'Les Gyoza': [
    {
      id: 'local-jp8-1', lessonId: 'jp-8', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quelle est l\'origine des gyoza japonais ?',
      data: {
        options: ['Corée du Sud', 'Chine (jiaozi)', 'Thaïlande', 'Vietnam'],
        correctIndex: 1,
        anecdote: 'Les gyoza sont inspirés des jiaozi chinois, ramenés au Japon après la Seconde Guerre mondiale. Les Japonais les ont adaptés : plus fins, plus aillés, et toujours poêlés-vapeur.',
      },
    },
    {
      id: 'local-jp8-2', lessonId: 'jp-8', orderIndex: 1, xpReward: 10,
      type: 'step_ordering',
      question: 'Remets les étapes de cuisson des gyoza dans l\'ordre :',
      data: {
        steps: ['Couvrir et cuire à la vapeur 3 min', 'Disposer les gyoza dans la poêle huilée chaude', 'Saisir 2 min jusqu\'à coloration dorée', 'Verser 50ml d\'eau et couvrir rapidement'],
        correctOrder: [1, 2, 3, 0],
      },
    },
    {
      id: 'local-jp8-3', lessonId: 'jp-8', orderIndex: 2, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La sauce d\'accompagnement classique des gyoza mélange sauce soja, vinaigre de riz et ___ chili.',
      data: { answer: 'huile de', hint: 'Un condiment huileux pimenté' },
    },
  ],

  'Le Karaage': [
    {
      id: 'local-jp18-1', lessonId: 'jp-18', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quelle farine donne au karaage son enrobage croustillant unique ?',
      data: {
        options: ['Farine de blé T55', 'Fécule de pomme de terre (katakuriko)', 'Chapelure panko', 'Farine de riz'],
        correctIndex: 1,
        anecdote: 'La fécule de pomme de terre (katakuriko) crée une croûte plus légère et transparente que la farine de blé. Le karaage est souvent servi avec une rondelle de citron pour équilibrer le gras.',
      },
    },
    {
      id: 'local-jp18-2', lessonId: 'jp-18', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La marinade du karaage contient sauce soja, mirin, saké et ___ râpé.',
      data: { answer: 'gingembre', hint: 'Racine aromatique au goût piquant' },
    },
    {
      id: 'local-jp18-3', lessonId: 'jp-18', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'À quelle température doit-on frire le karaage pour une cuisson parfaite ?',
      data: {
        options: ['140°C', '160°C', '175°C', '200°C'],
        correctIndex: 2,
      },
    },
  ],

  // ── ITALIAN (new lessons) ─────────────────────────────────────────────────

  'Le Pesto Genovese': [
    {
      id: 'local-it7-1', lessonId: 'it-7', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quel ustensile traditionnel utilise-t-on pour faire le pesto ?',
      data: {
        options: ['Mixeur électrique', 'Mortier et pilon en marbre', 'Robot culinaire', 'Moulin à légumes'],
        correctIndex: 1,
        anecdote: 'Le pesto au mortier libère les huiles essentielles différemment du mixeur. Les lames chauffent les feuilles et les oxydent, donnant un goût amer. Le mortier de marbre reste donc la méthode traditionnelle et préférée des puristes.',
      },
    },
    {
      id: 'local-it7-2', lessonId: 'it-7', orderIndex: 1, xpReward: 10,
      type: 'association',
      question: 'Associe chaque ingrédient du pesto à sa quantité pour 4 personnes :',
      data: { pairs: [
        { left: 'Basilic frais', right: '100g feuilles' },
        { left: 'Pignons de pin', right: '2 cuillères à soupe' },
        { left: 'Pecorino + Parmesan', right: '30g mélange' },
        { left: 'Huile d\'olive', right: '60-80 ml' },
      ] },
    },
    {
      id: 'local-it7-3', lessonId: 'it-7', orderIndex: 2, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Pour conserver le pesto sans qu\'il noircisse, on verse une couche d\'___ en surface.',
      data: { answer: 'huile d\'olive', hint: 'Protège de l\'oxydation à l\'air' },
    },
  ],

  'La Panna Cotta': [
    {
      id: 'local-it11-1', lessonId: 'it-11', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Que signifie "panna cotta" en italien ?',
      data: {
        options: ['Crème brûlée', 'Crème cuite', 'Lait doux', 'Crème fouettée'],
        correctIndex: 1,
        anecdote: 'La panna cotta vient du Piémont et daterait du début du XXe siècle. Contrairement aux idées reçues, c\'est un dessert moderne — les premières recettes écrites apparaissent seulement dans les années 1960.',
      },
    },
    {
      id: 'local-it11-2', lessonId: 'it-11', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'L\'ingrédient gélifiant de la panna cotta est la ___ alimentaire.',
      data: { answer: 'gélatine', hint: 'Protéine animale qui fige les préparations au froid' },
    },
    {
      id: 'local-it11-3', lessonId: 'it-11', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Combien de temps doit reposer la panna cotta au réfrigérateur minimum ?',
      data: {
        options: ['30 minutes', '1 heure', '4 heures', '24 heures'],
        correctIndex: 2,
      },
    },
  ],

  // ── GREEK (new lessons) ────────────────────────────────────────────────────

  'Les Bases Méditerranéennes': [
    { id: 'local-gr1-1', lessonId: 'gr-1', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quelle herbe est la plus emblématique de la cuisine grecque ?',
      data: { options: ['Origan séché — arôme intense sur les grillades et salades', 'Basilic frais', 'Estragon', 'Aneth uniquement'], correctIndex: 0,
        anecdote: 'La Grèce est l\'un des plus grands producteurs d\'huile d\'olive au monde (20 kg/habitant/an). Le régime méditerranéen, classé patrimoine UNESCO, a démontré ses bienfaits cardiovasculaires.' } },
    { id: 'local-gr1-2', lessonId: 'gr-1', orderIndex: 1, xpReward: 10,
      type: 'association',
      question: 'Associe chaque ingrédient méditerranéen à son utilisation typique :',
      data: { pairs: [
        { left: 'Feta', right: 'Salade grecque et pastèque — fromage AOP de brebis' },
        { left: 'Sumac', right: 'Épice acide sur le poulet et salades levantines' },
        { left: 'Huile d\'olive extra vierge', right: 'Finition crue, jamais de friture haute temp' },
        { left: 'Citron', right: 'Marinade (avgolemono) et assaisonnement acide' },
      ] } },
    { id: 'local-gr1-3', lessonId: 'gr-1', orderIndex: 2, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Le lait de brebis est préféré en Grèce pour les fromages car il est plus riche en ___ que le lait de vache.',
      data: { answer: 'matières grasses', hint: 'Plus de gras = plus de saveur et d\'onctuosité' } },
  ],

  'Les Mezze': [
    { id: 'local-gr3-1', lessonId: 'gr-3', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Les mezze sont une tradition de :',
      data: { options: ['Nombreuses petites assiettes partagées — culture du partage levantin et grec', 'Un seul grand plat divisé en portions', 'Un apéritif unique par personne', 'Un dessert varié'], correctIndex: 0,
        anecdote: '"Mezze" vient du turc/arabe "maza" (chose à goûter). La culture mezze s\'étend de la Grèce à la Turquie, au Liban et à la Syrie — des centaines de petits plats différents selon les régions.' } },
    { id: 'local-gr3-2', lessonId: 'gr-3', orderIndex: 1, xpReward: 10,
      type: 'association',
      question: 'Associe chaque mezze grec à sa description :',
      data: { pairs: [
        { left: 'Tarama', right: 'Crème d\'œufs de cabillaud rose, pain, citron' },
        { left: 'Dolmades', right: 'Feuilles de vigne farcies riz-herbes' },
        { left: 'Spanakopita', right: 'Feuilles phyllo + épinards + feta' },
        { left: 'Saganaki', right: 'Fromage grillé flambé à l\'ouzo' },
      ] } },
    { id: 'local-gr3-3', lessonId: 'gr-3', orderIndex: 2, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Le houmous authentique (levant) est fait de pois chiches cuits, tahini, citron, ail et ___ pour la texture soyeuse.',
      data: { answer: 'glaçons (eau glacée)', hint: 'L\'eau froide crée une émulsion plus légère' } },
  ],

  'Le Baklava': [
    { id: 'local-gr5-1', lessonId: 'gr-5', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le secret d\'un baklava croustillant est :',
      data: { options: ['Verser le sirop froid sur le baklava chaud (ou sirop chaud sur baklava froid)', 'Laisser tremper dans le sirop 24h', 'Mettre le sirop pendant la cuisson', 'Arroser toutes les 10 min au four'], correctIndex: 0,
        anecdote: 'L\'origine du baklava est disputée entre la Turquie (cuisine de palais Ottoman), la Grèce et les pays arabes. La version grecque utilise souvent des noix et de la cannelle, la turque des pistaches.' } },
    { id: 'local-gr5-2', lessonId: 'gr-5', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Le baklava grec comprend des feuilles de phyllo alternées avec un mélange de ___, de cannelle et de sucre.',
      data: { answer: 'noix concassées', hint: 'Noix, noisettes ou pistaches selon la région' } },
    { id: 'local-gr5-3', lessonId: 'gr-5', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le sirop du baklava est aromatisé avec :',
      data: { options: ['Eau de rose ou eau de fleur d\'oranger et miel', 'Sirop de sucre blanc neutre uniquement', 'Confiture d\'abricots', 'Sirop d\'érable'], correctIndex: 0 } },
  ],

  // ── GREEK ──────────────────────────────────────────────────────────────────

  'Le Tzatziki': [
    {
      id: 'local-gr-tzat-1', lessonId: 'gr-2', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quel est le secret pour un tzatziki qui ne rend pas d\'eau ?',
      data: {
        options: [
          'Utiliser du yaourt maigre',
          'Râper et saler le concombre puis le presser dans un linge',
          'Ajouter de la fécule de maïs',
          'Congeler le concombre avant utilisation',
        ],
        correctIndex: 1,
        anecdote: 'Le concombre contient 95% d\'eau. Sans cette étape, votre tzatziki sera liquide en 30 minutes.',
      },
    },
    {
      id: 'local-gr-tzat-2', lessonId: 'gr-2', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Le tzatziki se prépare avec du yaourt grec, du concombre, de l\'ail et de l\'___ fraîche.',
      data: { answer: 'aneth', hint: 'Herbe verte avec un goût anisé doux' },
    },
    {
      id: 'local-gr-tzat-3', lessonId: 'gr-2', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Combien de temps minimum le tzatziki doit-il reposer avant d\'être servi ?',
      data: {
        options: ['Aucun temps de repos', '30 minutes au frigo', '1 heure minimum', '3 heures'],
        correctIndex: 2,
      },
    },
  ],

  'La Moussaka': [
    {
      id: 'local-gr-mous-1', lessonId: 'gr-4', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quel légume est la base de la moussaka grecque ?',
      data: {
        options: ['Courgettes', 'Aubergines', 'Pommes de terre', 'Poivrons'],
        correctIndex: 1,
        anecdote: 'La moussaka se retrouve dans toute la Méditerranée orientale avec des variantes. En Grèce, la version de Nikolaos Tselementes (années 1910) avec béchamel est devenue la norme.',
      },
    },
    {
      id: 'local-gr-mous-2', lessonId: 'gr-4', orderIndex: 1, xpReward: 10,
      type: 'step_ordering',
      question: 'Remets les couches de la moussaka dans l\'ordre (de bas en haut) :',
      data: {
        steps: ['Béchamel', 'Viande hachée épicée', 'Aubergines grillées (1ère couche)', 'Aubergines grillées (2ème couche)'],
        correctOrder: [2, 1, 3, 0],
      },
    },
    {
      id: 'local-gr-mous-3', lessonId: 'gr-4', orderIndex: 2, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La viande de la moussaka est parfumée à la cannelle, aux clous de girofle et au ___ de la Terre.',
      data: { answer: 'muscade', hint: 'Épice utilisée aussi dans la béchamel' },
    },
  ],

  // ── INDIAN (new lessons) ──────────────────────────────────────────────────

  'Les Épices Indiennes': [
    { id: 'local-in1-1', lessonId: 'in-1', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'La technique de "bloomer" les épices dans l\'huile chaude avant d\'ajouter les autres ingrédients s\'appelle :',
      data: { options: ['Tadka (ou tarka) — les épices libèrent leurs huiles essentielles dans le gras chaud', 'Rôtissage à sec', 'Macération à froid', 'Infusion à l\'eau'], correctIndex: 0,
        anecdote: 'Le "tadka" est la technique la plus fondamentale de la cuisine indienne. Les graines de moutarde doivent éclater, les feuilles de curry crépiter — ces sons indiquent que les arômes sont libérés.' } },
    { id: 'local-in1-2', lessonId: 'in-1', orderIndex: 1, xpReward: 10,
      type: 'association',
      question: 'Associe chaque épice indienne à son profil :',
      data: { pairs: [
        { left: 'Cardamome verte', right: 'Florale, menthée — desserts et chai' },
        { left: 'Fenugrec', right: 'Légèrement amer, arôme de sirop d\'érable' },
        { left: 'Curcuma', right: 'Couleur jaune, légèrement terreux, anti-inflammatoire' },
        { left: 'Poivre long', right: 'Plus complexe que le poivre noir, épicé doux' },
      ] } },
    { id: 'local-in1-3', lessonId: 'in-1', orderIndex: 2, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Le garam masala est ajouté ___ de la cuisson car la chaleur prolongée détruirait ses arômes délicats.',
      data: { answer: 'en fin', hint: 'Contrairement aux épices de base qui cuisent dès le début' } },
  ],

  'Le Curry Butter Chicken': [
    { id: 'local-in3-1', lessonId: 'in-3', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le butter chicken (murgh makhani) a été créé dans les années 1950 à Delhi pour :',
      data: { options: ['Recycler le poulet tandoori sec dans une sauce crémeuse tomate-beurre', 'Imiter la cuisine britannique', 'Créer un plat vegan', 'Utiliser des restes de soupe'], correctIndex: 0,
        anecdote: 'Kundan Lal Gujral a inventé le tikka masala par accident en versant de la sauce tomate-crème sur du poulet tandoori trop sec — accident qui a créé l\'un des plats les plus populaires du monde.' } },
    { id: 'local-in3-2', lessonId: 'in-3', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La couleur orange vif et la saveur fumée du butter chicken viennent du poulet préalablement cuit au ___ ou au four très chaud.',
      data: { answer: 'tandoor', hint: 'Four cylindrique en argile cuit à 480°C+' } },
    { id: 'local-in3-3', lessonId: 'in-3', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'La sauce makhani est rendue onctueuse par :',
      data: { options: ['Tomates mixées + crème + beurre (makhani = beurre en hindi) + noix de cajou', 'Lait de coco uniquement', 'Yaourt et farine', 'Lait entier + piment'], correctIndex: 0 } },
  ],

  'Le Biryani Royal': [
    { id: 'local-in5-1', lessonId: 'in-5', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'La technique "dum" du biryani consiste à :',
      data: { options: ['Sceller hermétiquement la casserole et cuire à l\'étouffée sur feu doux', 'Cuire à la vapeur sans couvercle', 'Frire le riz dans le beurre', 'Cuire la viande et le riz séparément puis mélanger'], correctIndex: 0,
        anecdote: 'Le biryani hyderabadi et le biryani lucknowi sont les deux grands styles. Hyderabad cuit viande et riz ensemble (kacchi dum), Lucknow précuit la viande (pakki dum) — deux philosophies opposées.' } },
    { id: 'local-in5-2', lessonId: 'in-5', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Le riz basmati pour biryani est trempé ___ heures avant cuisson pour que les grains s\'allongent au maximum.',
      data: { answer: '30 minutes à 2', hint: 'L\'hydratation préalable permet aux grains de cuire sans se casser' } },
    { id: 'local-in5-3', lessonId: 'in-5', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le safran du biryani est dissous dans du lait chaud puis versé en filet sur le riz pour :',
      data: { options: ['Créer un effet marbré jaune-blanc et diffuser l\'arôme dans tout le plat', 'Colorer uniformément tout le riz', 'Aromatiser la viande seulement', 'Conserver le riz plus longtemps'], correctIndex: 0 } },
  ],

  // ── INDIAN ─────────────────────────────────────────────────────────────────

  'Le Dal Makhani': [
    {
      id: 'local-in-dal-1', lessonId: 'in-2', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Que signifie "makhani" en hindi ?',
      data: {
        options: ['Épicé', 'Au beurre', 'Fumé', 'Lentilles noires'],
        correctIndex: 1,
        anecdote: 'Le Dal Makhani a été créé au Moti Mahal de Delhi dans les années 1940. La recette originale cuit dans le tandoor pendant 24 heures. Dans les grands restaurants indiens, il mijote parfois 72 heures !',
      },
    },
    {
      id: 'local-in-dal-2', lessonId: 'in-2', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Le type de lentilles utilisé dans le dal makhani s\'appelle urad dal ou lentilles ___.',
      data: { answer: 'noires', hint: 'Couleur du légume sec avant cuisson' },
    },
    {
      id: 'local-in-dal-3', lessonId: 'in-2', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Combien d\'heures minimum doit cuire un bon dal makhani ?',
      data: {
        options: ['30 minutes', '1 heure', '4 heures', '12 heures'],
        correctIndex: 2,
      },
    },
  ],

  'Le Pain Naan': [
    {
      id: 'local-in-naan-1', lessonId: 'in-4', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Dans quel four traditionnel cuit le naan authentique ?',
      data: {
        options: ['Four à bois', 'Four tandoor (terre cuite)', 'Plancha', 'Poêle à frire'],
        correctIndex: 1,
        anecdote: 'Le tandoor atteint 480°C. Le naan colle aux parois et cuit en 90 secondes. La chaleur extrême crée les bulles caractéristiques. Au four domestique, la lèchefrite préchaussée au maximum donne le meilleur résultat.',
      },
    },
    {
      id: 'local-in-naan-2', lessonId: 'in-4', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Le naan est un pain ___ fait de farine de blé, yaourt et levure.',
      data: { answer: 'levé', hint: 'Il gonfle grâce à la fermentation' },
    },
    {
      id: 'local-in-naan-3', lessonId: 'in-4', orderIndex: 2, xpReward: 10,
      type: 'association',
      question: 'Associe chaque variante de naan à sa garniture :',
      data: { pairs: [
        { left: 'Naan nature', right: 'Beurre (ghee) seul' },
        { left: 'Peshwari naan', right: 'Noix de coco et raisins secs' },
        { left: 'Keema naan', right: 'Viande hachée épicée' },
        { left: 'Garlic naan', right: 'Ail et coriandre' },
      ] },
    },
  ],

  // ── THAI (new lessons) ─────────────────────────────────────────────────────

  'Les 4 Saveurs Thaïlandaises': [
    { id: 'local-th1-1', lessonId: 'th-1', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'L\'équilibre des 4 saveurs thaïlandaises est obtenu dans quel ordre d\'ajout ?',
      data: { options: ['Sucré (palm sugar) → Salé (fish sauce) → Acide (citron vert) → Pimenté (piment)', 'Pimenté → Sucré → Salé → Acide', 'Acide → Salé → Sucré → Pimenté', 'L\'ordre n\'importe pas'], correctIndex: 0,
        anecdote: 'La cuisine thaïlandaise est la seule au monde à avoir codifié l\'équilibre parfait de ces 4 saveurs. Le chef ajuste jusqu\'à ce que chaque bouchée éveille successivement les 4 sens gustatifs.' } },
    { id: 'local-th1-2', lessonId: 'th-1', orderIndex: 1, xpReward: 10,
      type: 'association',
      question: 'Associe chaque ingrédient à la saveur qu\'il apporte :',
      data: { pairs: [
        { left: 'Sauce poisson (nam pla)', right: 'Salé + umami profond' },
        { left: 'Sucre de palme', right: 'Sucré doux et caramel' },
        { left: 'Citron vert kaffir', right: 'Acide + floral' },
        { left: 'Piment oiseau', right: 'Pimenté intense et rapide' },
      ] } },
    { id: 'local-th1-3', lessonId: 'th-1', orderIndex: 2, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La sauce poisson thaïlandaise (nam pla) est fabriquée par fermentation d\'anchois et de sel pendant ___ mois minimum.',
      data: { answer: '12 à 18', hint: 'Un an de patience pour l\'umami parfait' } },
  ],

  'La Soupe Tom Kha Gaï': [
    { id: 'local-th3-1', lessonId: 'th-3', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: '"Tom kha gaï" signifie :',
      data: { options: ['"Soupe bouillie au galanga et poulet"', '"Soupe de coco et citronnelle"', '"Curry liquide au poulet"', '"Bouillon de Chiang Mai"'], correctIndex: 0,
        anecdote: 'Le galanga (kha) est la racine qui distingue le tom kha du tom yum. Il ressemble au gingembre mais avec un arôme de pin et de citronnelle plus poivré. Il n\'est pas consommé mais infusé.' } },
    { id: 'local-th3-2', lessonId: 'th-3', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Le tom kha gaï ne doit jamais bouillir vigoureusement car le lait de coco se ___ et perd sa texture crémeuse.',
      data: { answer: 'sépare / tranche', hint: 'Chaleur douce pour une soupe soyeuse' } },
    { id: 'local-th3-3', lessonId: 'th-3', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Les ingrédients infusés (galanga, citronnelle, feuilles de kaffir) dans le tom kha sont :',
      data: { options: ['Laissés entiers ou en gros morceaux — on ne les mange pas', 'Mixés dans la soupe pour plus de goût', 'Retirés avant d\'ajouter le lait de coco', 'Hachés finement et consommés'], correctIndex: 0 } },
  ],

  'La Pâte de Curry Vert': [
    { id: 'local-th4-1', lessonId: 'th-4', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'La couleur verte de la pâte de curry vert vient de :',
      data: { options: ['Piments verts frais + coriandre + feuilles de basilic thaï', 'Colorant vert alimentaire', 'Épinards mixés', 'Citronnelle uniquement'], correctIndex: 0,
        anecdote: 'Le curry rouge utilise des piments rouges séchés (plus intense), le curry vert des piments frais (plus herbacé). Le curry jaune ajoute du curcuma. Aucun ne contient de curry en poudre indien.' } },
    { id: 'local-th4-2', lessonId: 'th-4', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Pour préparer la pâte au mortier traditionnel, on commence par les ingrédients les plus ___ (galanga, citronnelle) avant les plus mous.',
      data: { answer: 'durs / fibreux', hint: 'On écrase du plus dur vers le plus tendre' } },
    { id: 'local-th4-3', lessonId: 'th-4', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'La pâte de curry maison est supérieure à la version industrielle car :',
      data: { options: ['Les huiles essentielles des ingrédients frais sont libérées par l\'écrasement — impossibles à conserver en pot', 'Elle est moins pimentée', 'Elle se conserve plus longtemps', 'Elle contient plus d\'épices'], correctIndex: 0 } },
  ],

  'Le Larb de Viande': [
    { id: 'local-th5-1', lessonId: 'th-5', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le larb est une salade de viande originaire de :',
      data: { options: ['Isan (nord-est de la Thaïlande) et Laos — plat national laotien', 'Bangkok', 'Côte sud thaïlandaise', 'Yunnan chinois'], correctIndex: 0,
        anecdote: 'Le larb est considéré comme le plat national du Laos. La version "koi" est préparée avec de la viande crue marinée dans du jus de citron vert — similaire au ceviche d\'Amérique du Sud.' } },
    { id: 'local-th5-2', lessonId: 'th-5', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'L\'ingrédient unique du larb qui lui donne son croquant et son arôme grillé est le riz ___ — graines de riz rôties à sec puis moulues.',
      data: { answer: 'grillé (khao khua)', hint: 'Il se prépare à la poêle sèche, sans huile, jusqu\'au brun doré' } },
    { id: 'local-th5-3', lessonId: 'th-5', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le larb se sert traditionnellement avec :',
      data: { options: ['Riz gluant (khao niao) roulé en boule que l\'on trempe dans la salade', 'Riz blanc vapeur', 'Nouilles de riz', 'Pain thaï'], correctIndex: 0 } },
  ],

  // ── THAI ──────────────────────────────────────────────────────────────────

  'Le Pad Thaï': [
    {
      id: 'local-th-padthai-1', lessonId: 'th-2', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quel ingrédient donne au pad thaï son goût acidulé caractéristique ?',
      data: {
        options: ['Citron vert', 'Vinaigre de riz', 'Jus de tamarin', 'Lime kaffir'],
        correctIndex: 2,
        anecdote: 'Le pad thaï a été inventé dans les années 1940 par le gouvernement thaïlandais pour promouvoir la cuisine nationale et réduire la consommation de riz pendant une pénurie. C\'est un plat politique autant que gastronomique !',
      },
    },
    {
      id: 'local-th-padthai-2', lessonId: 'th-2', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Pour ne pas avoir des nouilles pâteuses dans le pad thaï, il faut les tremper dans l\'eau ___ pendant 30 min.',
      data: { answer: 'froide', hint: 'Pas chaude, pas bouillante — juste froide' },
    },
    {
      id: 'local-th-padthai-3', lessonId: 'th-2', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quelle est la clé d\'un pad thaï authentique au wok ?',
      data: {
        options: ['Feu doux pour ne pas brûler', 'Feu maximum et wok fumant', 'Cuisson à l\'eau d\'abord', 'Pas d\'huile'],
        correctIndex: 1,
      },
    },
  ],

  // ── CHINESE (new lessons) ──────────────────────────────────────────────────

  'Les Techniques au Wok': [
    { id: 'local-cn1-1', lessonId: 'cn-1', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le "wok hei" (souffle du wok) est :',
      data: { options: ['La saveur fumée-caramélisée créée par les très hautes températures du wok en fonte', 'Le sifflement de l\'huile', 'L\'arôme de la sauce soja brûlée', 'La fumée visible du wok'], correctIndex: 0,
        anecdote: '"Wok hei" signifie littéralement "souffle du wok". C\'est une réaction complexe entre les protéines, les sucres et les acides aminés à très haute température (400°C+) — impossible à reproduire sur une cuisinière domestique ordinaire.' } },
    { id: 'local-cn1-2', lessonId: 'cn-1', orderIndex: 1, xpReward: 10,
      type: 'association',
      question: 'Associe chaque technique chinoise de cuisson à sa définition :',
      data: { pairs: [
        { left: 'Chao (炒)', right: 'Sauté rapide au wok à très haute flamme' },
        { left: 'Zheng (蒸)', right: 'Vapeur — conserve les nutriments et la texture' },
        { left: 'Hong shao (红烧)', right: 'Braisé à la sauce soja et sucre — couleur acajou' },
        { left: 'Lu (卤)', right: 'Mijoté dans un bouillon maître épicé et réutilisé' },
      ] } },
    { id: 'local-cn1-3', lessonId: 'cn-1', orderIndex: 2, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Pour culotter un wok neuf en acier carbone et l\'empêcher de rouiller, on le chauffe à blanc puis on le frotte avec de l\'___ à l\'aide d\'un papier essuie-tout.',
      data: { answer: 'huile', hint: 'Plusieurs cycles de chauffe-huile créent une couche antiadhésive naturelle' } },
  ],

  'Les Dim Sum': [
    { id: 'local-cn2-1', lessonId: 'cn-2', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le dim sum est une tradition cantonaise appelée "yum cha" qui signifie :',
      data: { options: ['"Boire du thé" — les bouchées accompagnent le thé, elles ne sont pas le repas principal', '"Manger ensemble"', '"Petites bouches"', '"Déjeuner dominical"'], correctIndex: 0,
        anecdote: 'La tradition yum cha (dim sum) vient des maisons de thé de la Route de la Soie où les voyageurs s\'arrêtaient. Les "dimsums" voyageaient sur des chariots poussés par des serveuses — tradition encore vivante à Hong Kong.' } },
    { id: 'local-cn2-2', lessonId: 'cn-2', orderIndex: 1, xpReward: 10,
      type: 'association',
      question: 'Associe chaque dim sum à sa description :',
      data: { pairs: [
        { left: 'Har gow', right: 'Ravioli vapeur à la crevette, pâte translucide' },
        { left: 'Siu mai', right: 'Panier ouvert porc-crevette, bord plissé jaune' },
        { left: 'Char siu bao', right: 'Bun vapeur ou cuit au four, farce porc laqué' },
        { left: 'Cheung fun', right: 'Crêpe de riz roulée, soyeuse et glissante' },
      ] } },
    { id: 'local-cn2-3', lessonId: 'cn-2', orderIndex: 2, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La pâte translucide du har gow est faite de farine de ___ (amidon de blé) — sans gluten, ce qui la rend transparente à la cuisson.',
      data: { answer: 'blé tamisée (wheat starch)', hint: 'Pas de la farine ordinaire — l\'amidon pur donne la transparence' } },
  ],

  'Le Porc Laqué': [
    { id: 'local-cn4-1', lessonId: 'cn-4', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le char siu (porc laqué cantonais) est mariné dans :',
      data: { options: ['Sauce soja + miel + sauce hoisin + cinq-épices + saké de riz (shaoxing)', 'Sauce soja + gingembre + ail uniquement', 'Sauce huître + sucre', 'Vinaigre + piment + sucre'], correctIndex: 0,
        anecdote: '"Char siu" signifie "viande fourchette" — la viande était traditionnellement suspendue sur une longue fourchette au-dessus du feu. La laque brillante rouge-orangée vient du fermented bean curd rouge (nan ru).' } },
    { id: 'local-cn4-2', lessonId: 'cn-4', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Pour obtenir la laque brillante caractéristique, on badigeonne la viande de miel à plusieurs reprises ___ minutes avant la fin de cuisson.',
      data: { answer: '5 à 10', hint: 'Le miel caramélise sans brûler grâce à la chaleur résiduelle' } },
    { id: 'local-cn4-3', lessonId: 'cn-4', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'La coupe de porc idéale pour le char siu est :',
      data: { options: ['Échine (cou) — marbré de gras pour une laque juteuse et tendre', 'Filet — trop maigre, se dessèche', 'Côtes — trop d\'os', 'Jambon — trop compact'], correctIndex: 0 } },
  ],

  'Le Canard Laqué de Pékin': [
    { id: 'local-cn5-1', lessonId: 'cn-5', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'La peau du canard laqué de Pékin est rendue croustillante grâce à :',
      data: { options: ['Séchage à l\'air pendant 24-48h après enduction de maltose + sauce', 'Friture dans l\'huile bouillante', 'Four très humide', 'Glaçage au sel'], correctIndex: 0,
        anecdote: 'Le canard laqué de Pékin date de la cour impériale des Ming (XVe siècle). À Pékin, il se mange en 3 services : peau seule avec sauce hoisin et crêpes, puis chair sautée, puis soupe avec carcasse.' } },
    { id: 'local-cn5-2', lessonId: 'cn-5', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Pour aérer la peau du canard, on insuffle de l\'___ entre la peau et la chair avant le séchage.',
      data: { answer: 'air', hint: 'Technique qui décolle la peau pour qu\'elle sèche uniformément' } },
    { id: 'local-cn5-3', lessonId: 'cn-5', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'La crêpe du canard laqué est garnée dans l\'ordre :',
      data: { options: ['Sauce hoisin → oignon vert → concombre julienne → peau + chair', 'Peau → sauce → légumes', 'Concombre → sauce → canard → oignon', 'N\'importe quel ordre'], correctIndex: 0 } },
  ],

  // ── CHINESE ────────────────────────────────────────────────────────────────

  'Le Mapo Tofu': [
    {
      id: 'local-cn-mapo-1', lessonId: 'cn-3', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le mapo tofu vient de quelle province chinoise réputée pour le piquant ?',
      data: {
        options: ['Pékin', 'Hunan', 'Sichuan', 'Canton'],
        correctIndex: 2,
        anecdote: 'Le mapo tofu aurait été créé par une femme âgée (mapo = "femme grêlée") à Chengdu au XIXe siècle. Le piment du Sichuan ne brûle pas — il engourdit la bouche (phénomène ma, l\'engourdissement) avant d\'apporter la chaleur (la, le piquant).',
      },
    },
    {
      id: 'local-cn-mapo-2', lessonId: 'cn-3', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La sensation unique du piment du Sichuan qui engourdit la bouche s\'appelle la sensation "___ la".',
      data: { answer: 'ma', hint: 'Premier caractère du mot "mápó" — l\'engourdissement' },
    },
    {
      id: 'local-cn-mapo-3', lessonId: 'cn-3', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quel type de tofu utilise-t-on dans le mapo tofu authentique ?',
      data: {
        options: ['Tofu ferme frit', 'Tofu soyeux (silken)', 'Tofu fumé', 'Tofu lyophilisé'],
        correctIndex: 1,
      },
    },
  ],

  // ── FRENCH (additional) ────────────────────────────────────────────────────

  'Les Bases du Couteau': [
    {
      id: 'local-fr-knife-1', lessonId: 'local', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quelle est la prise correcte d\'un couteau de chef professionnel ?',
      data: {
        options: [
          'Pincer la lame entre le pouce et l\'index, les autres doigts sur le manche',
          'Tenir uniquement le manche à pleine main',
          'Pincer le manche entre pouce et majeur',
          'Pointer l\'index le long de la lame',
        ],
        correctIndex: 0,
      },
    },
    {
      id: 'local-fr-knife-2', lessonId: 'local', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La technique qui consiste à recourber les doigts en protection s\'appelle la main en ___.',
      data: { answer: 'griffe', hint: 'Protège vos phalanges lors de la découpe' },
    },
    {
      id: 'local-fr-knife-3', lessonId: 'local', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Qu\'est-ce que la brunoise ?',
      data: {
        options: [
          'Des dés de légumes de 1-2mm de côté',
          'Des lamelles très fines',
          'Des bâtonnets de 5mm',
          'Des rondelles régulières',
        ],
        correctIndex: 0,
      },
    },
    {
      id: 'local-fr-knife-4', lessonId: 'local', orderIndex: 3, xpReward: 10,
      type: 'association',
      question: 'Associe chaque coupe à sa description :',
      data: {
        pairs: [
          { left: 'Julienne', right: 'Bâtonnets fins 2×2mm' },
          { left: 'Brunoise', right: 'Dés 2mm × 2mm' },
          { left: 'Chiffonnade', right: 'Feuilles roulées en lanières' },
          { left: 'Paysanne', right: 'Carrés plats 5mm' },
        ],
      },
    },
    {
      id: 'local-fr-knife-5', lessonId: 'local', orderIndex: 4, xpReward: 10,
      type: 'multiple_choice',
      question: 'Pourquoi un couteau bien aiguisé est-il plus sûr qu\'un couteau émoussé ?',
      data: {
        options: [
          'Il nécessite moins de pression et glisse moins sur les aliments',
          'Il est plus lourd et plus stable',
          'Il coupe plus lentement, donnant plus de contrôle',
          'Il ne rouille pas',
        ],
        correctIndex: 0,
      },
    },
  ],

  'Les Crêpes': [
    {
      id: 'local-fr-crepe-1', lessonId: 'local', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Pourquoi doit-on laisser reposer la pâte à crêpes 1 heure ?',
      data: {
        options: [
          'Pour que le gluten se détende et que la pâte soit plus fluide',
          'Pour que les œufs cuisent légèrement',
          'Pour que le beurre durcisse',
          'Pour que la farine fermente',
        ],
        correctIndex: 0,
      },
    },
    {
      id: 'local-fr-crepe-2', lessonId: 'local', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La crêpe salée faite avec de la farine de sarrasin s\'appelle une ___.',
      data: { answer: 'galette', hint: 'Spécialité bretonne sans gluten' },
    },
    {
      id: 'local-fr-crepe-3', lessonId: 'local', orderIndex: 2, xpReward: 10,
      type: 'step_ordering',
      question: 'Remets les étapes de la pâte à crêpes dans le bon ordre :',
      data: {
        steps: ['Laisser reposer 1h au réfrigérateur', 'Mélanger farine et sel, creuser un puits', 'Ajouter le beurre fondu et le lait', 'Incorporer les œufs un à un'],
        correctOrder: [1, 3, 2, 0],
      },
    },
    {
      id: 'local-fr-crepe-4', lessonId: 'local', orderIndex: 3, xpReward: 10,
      type: 'multiple_choice',
      question: 'La Crêpe Suzette est flambée à quel alcool ?',
      data: {
        options: ['Grand Marnier ou Cointreau', 'Cognac', 'Rhum ambré', 'Calvados'],
        correctIndex: 0,
      },
    },
  ],

  'Le Soufflé au Fromage': [
    {
      id: 'local-fr-souffle-1', lessonId: 'local', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Pourquoi ne doit-on JAMAIS ouvrir le four pendant la cuisson d\'un soufflé ?',
      data: {
        options: [
          'Le choc thermique fait retomber les blancs en neige',
          'Cela réduirait la température trop longtemps',
          'La vapeur s\'échapperait trop rapidement',
          'La croûte se formerait trop tôt',
        ],
        correctIndex: 0,
      },
    },
    {
      id: 'local-fr-souffle-2', lessonId: 'local', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Les blancs montés en neige doivent être incorporés à la béchamel par mouvements ___, pas en remuant.',
      data: { answer: 'délicats', hint: 'Pour conserver l\'air dans les blancs' },
    },
    {
      id: 'local-fr-souffle-3', lessonId: 'local', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Pour qu\'un soufflé monte bien droit, on beurre le moule puis…',
      data: {
        options: [
          'On le chemise de parmesan râpé ou de chapelure',
          'On le pose sur une grille froide',
          'On le rince à l\'eau froide',
          'On le saupoudre de farine',
        ],
        correctIndex: 0,
      },
    },
    {
      id: 'local-fr-souffle-4', lessonId: 'local', orderIndex: 3, xpReward: 10,
      type: 'association',
      question: 'Associe chaque soufflé à son fromage traditionnel :',
      data: {
        pairs: [
          { left: 'Soufflé classique', right: 'Gruyère ou comté' },
          { left: 'Soufflé Roquefort', right: 'Bleu d\'Auvergne' },
          { left: 'Soufflé Parmesan', right: 'Parmigiano Reggiano' },
          { left: 'Soufflé Chèvre', right: 'Fromage de chèvre frais' },
        ],
      },
    },
  ],

  'La Tarte Tatin': [
    {
      id: 'local-fr-tatin-1', lessonId: 'local', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'La Tarte Tatin a été inventée par accident par les sœurs Tatin. Dans quelle région ?',
      data: {
        options: ['Sologne (Loir-et-Cher)', 'Normandie', 'Bretagne', 'Alsace'],
        correctIndex: 0,
      },
    },
    {
      id: 'local-fr-tatin-2', lessonId: 'local', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La tarte Tatin est une tarte ___ (le fond de pâte est au-dessus pendant la cuisson).',
      data: { answer: 'renversée', hint: 'On la retourne au moment de servir' },
    },
    {
      id: 'local-fr-tatin-3', lessonId: 'local', orderIndex: 2, xpReward: 10,
      type: 'step_ordering',
      question: 'Remets les étapes dans le bon ordre :',
      data: {
        steps: ['Retourner sur un plat au sortir du four', 'Caraméliser pommes et beurre dans la poêle', 'Enfourner 25 min à 200°C', 'Déposer la pâte sur les pommes'],
        correctOrder: [1, 3, 2, 0],
      },
    },
    {
      id: 'local-fr-tatin-4', lessonId: 'local', orderIndex: 3, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quelle pomme est idéale pour une Tarte Tatin ?',
      data: {
        options: ['Golden ou Reine des Reinettes (tient à la cuisson)', 'Granny Smith (trop acide)', 'Fuji (trop juteuse)', 'Pink Lady (trop croquante)'],
        correctIndex: 0,
      },
    },
  ],

  // ── ITALIAN (additional) ────────────────────────────────────────────────────

  "L'Huile d'Olive": [
    {
      id: 'local-it-olive-1', lessonId: 'local', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Qu\'est-ce que l\'huile d\'olive "extra vierge" ?',
      data: {
        options: [
          'Première pression à froid, acidité < 0,8%, aucun défaut',
          'Deuxième pression, acidité < 2%',
          'Mélange d\'huiles raffinées et vierge',
          'Huile chauffée à haute température',
        ],
        correctIndex: 0,
      },
    },
    {
      id: 'local-it-olive-2', lessonId: 'local', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Le terme "DOP" (Denominazione di Origine Protetta) garantit que l\'huile provient d\'une ___ géographique précise.',
      data: { answer: 'zone', hint: 'Comme pour les vins et fromages' },
    },
    {
      id: 'local-it-olive-3', lessonId: 'local', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Pour préserver une huile d\'olive de qualité, elle doit être conservée…',
      data: {
        options: [
          'À l\'abri de la lumière, de la chaleur et de l\'air',
          'Au réfrigérateur pour la solidifier',
          'En plein soleil pour accentuer les arômes',
          'Dans un récipient métallique ouvert',
        ],
        correctIndex: 0,
      },
    },
    {
      id: 'local-it-olive-4', lessonId: 'local', orderIndex: 3, xpReward: 10,
      type: 'association',
      question: 'Associe chaque région à son huile d\'olive :',
      data: {
        pairs: [
          { left: 'Toscane', right: 'Intense, poivrée, herbe fraîche' },
          { left: 'Sicile', right: 'Fruitée, dorée, artichaut' },
          { left: 'Ligurie', right: 'Douce, délicate, pour le pesto' },
          { left: 'Pouilles', right: 'Robuste, grande production italienne' },
        ],
      },
    },
  ],

  'La Carbonara Authentique': [
    {
      id: 'local-it-carbonara-1', lessonId: 'local', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'La carbonara authentique romaine ne contient pas de crème. Qu\'est-ce qui crée sa texture crémeuse ?',
      data: {
        options: [
          'Jaunes d\'œufs + eau de cuisson amidonnée + Pecorino',
          'Mascarpone et parmesan',
          'Ricotta et beurre',
          'Lait entier et fécule',
        ],
        correctIndex: 0,
      },
    },
    {
      id: 'local-it-carbonara-2', lessonId: 'local', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La viande utilisée dans la vraie carbonara est le ___, joue de porc séchée et non fumée.',
      data: { answer: 'guanciale', hint: 'Pas de pancetta, encore moins de lardons !' },
    },
    {
      id: 'local-it-carbonara-3', lessonId: 'local', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Pourquoi retire-t-on la poêle du feu avant d\'ajouter les œufs dans la carbonara ?',
      data: {
        options: [
          'Pour éviter que les œufs brouillent — ils doivent émulsionner, pas cuire',
          'Pour que la graisse du guanciale ne brûle pas',
          'Pour que les pâtes refroidissent légèrement',
          'Pour que le pecorino fonde mieux',
        ],
        correctIndex: 0,
      },
    },
    {
      id: 'local-it-carbonara-4', lessonId: 'local', orderIndex: 3, xpReward: 10,
      type: 'association',
      question: 'Carbonara : vrai ou faux (associe) :',
      data: {
        pairs: [
          { left: 'Guanciale', right: '✅ Ingrédient authentique' },
          { left: 'Crème fraîche', right: '❌ Hérésie culinaire' },
          { left: 'Pecorino Romano', right: '✅ Fromage traditionnel' },
          { left: 'Pancetta fumée', right: '⚠️ Substitut acceptable' },
        ],
      },
    },
  ],

  'Le Tiramisu': [
    {
      id: 'local-it-tiramisu-1', lessonId: 'local', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Que signifie "tiramisù" en italien ?',
      data: {
        options: ['Tire-moi vers le haut (remonte-moi le moral)', 'Dessert du soir', 'Crème de mascarpone', 'Gâteau au café'],
        correctIndex: 0,
      },
    },
    {
      id: 'local-it-tiramisu-2', lessonId: 'local', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Les biscuits à tremper dans le café pour le tiramisu s\'appellent des ___.',
      data: { answer: 'savoiardi', hint: 'Aussi appelés "boudoirs" en France' },
    },
    {
      id: 'local-it-tiramisu-3', lessonId: 'local', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Pour la crème de tiramisu sans œufs crus, on peut la pasteuriser en…',
      data: {
        options: [
          'Fouettant les jaunes au bain-marie avec le sucre jusqu\'à 60°C (pâte à bombe)',
          'Ajoutant de la fécule de maïs',
          'Utilisant de la crème fouettée à la place',
          'Cuisant les œufs entiers 5 min',
        ],
        correctIndex: 0,
      },
    },
    {
      id: 'local-it-tiramisu-4', lessonId: 'local', orderIndex: 3, xpReward: 10,
      type: 'step_ordering',
      question: 'Remets les étapes du tiramisu dans l\'ordre :',
      data: {
        steps: ['Laisser reposer 4h au réfrigérateur', 'Tremper les savoiardi dans l\'espresso', 'Monter jaunes + sucre en pâte à bombe', 'Alterner couches de biscuits et crème'],
        correctOrder: [2, 1, 3, 0],
      },
    },
  ],

  'Cacio e Pepe Romaine': [
    {
      id: 'local-it-cacio-1', lessonId: 'local', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Cacio e Pepe ne contient que 3 ingrédients. Lesquels ?',
      data: {
        options: [
          'Spaghetti + Pecorino Romano + poivre noir',
          'Spaghetti + Parmesan + poivre noir + beurre',
          'Rigatoni + Ricotta + piment',
          'Spaghetti + Pecorino + pancetta',
        ],
        correctIndex: 0,
      },
    },
    {
      id: 'local-it-cacio-2', lessonId: 'local', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Dans Cacio e Pepe, l\'eau de cuisson amidonnée est cruciale car elle permet au Pecorino de ___ sans former de grumeaux.',
      data: { answer: 'fondre', hint: 'L\'amidon est l\'émulsifiant naturel' },
    },
    {
      id: 'local-it-cacio-3', lessonId: 'local', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quelle est la technique pour éviter les grumeaux de fromage dans la Cacio e Pepe ?',
      data: {
        options: [
          'Mélanger le Pecorino avec l\'eau de cuisson FROIDE avant d\'incorporer',
          'Ajouter le fromage directement dans la poêle très chaude',
          'Faire fondre le fromage dans du beurre d\'abord',
          'Utiliser du fromage râpé extra-fin et ajouter tout d\'un coup',
        ],
        correctIndex: 0,
      },
    },
  ],

  // ── JAPANESE (additional) ───────────────────────────────────────────────────

  'Les 5 Saveurs Japonaises': [
    {
      id: 'local-jp-saveurs-1', lessonId: 'local', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quelle saveur a été officiellement identifiée par le chercheur japonais Kikunae Ikeda en 1908 ?',
      data: {
        options: ['Umami (saveur du glutamate)', 'Amer', 'Acide', 'Astringent'],
        correctIndex: 0,
      },
    },
    {
      id: 'local-jp-saveurs-2', lessonId: 'local', orderIndex: 1, xpReward: 10,
      type: 'association',
      question: 'Associe chaque saveur à un aliment japonais typique :',
      data: {
        pairs: [
          { left: 'Umami', right: 'Kombu, bonite, miso' },
          { left: 'Sucré', right: 'Mirin, mochis' },
          { left: 'Acide', right: 'Ponzu, yuzu' },
          { left: 'Amer', right: 'Matcha, melon amer' },
        ],
      },
    },
    {
      id: 'local-jp-saveurs-3', lessonId: 'local', orderIndex: 2, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Le concept japonais de cuisine saine basée sur l\'équilibre des saveurs et la saisonnalité s\'appelle la ___ cuisine.',
      data: { answer: 'washoku', hint: 'Inscrite au patrimoine mondial de l\'UNESCO' },
    },
    {
      id: 'local-jp-saveurs-4', lessonId: 'local', orderIndex: 3, xpReward: 10,
      type: 'multiple_choice',
      question: 'L\'umami est lié à quel acide aminé naturel ?',
      data: {
        options: ['Acide glutamique (glutamate)', 'Acide citrique', 'Acide acétique', 'Acide lactique'],
        correctIndex: 0,
      },
    },
  ],

  'Les Sushis': [
    {
      id: 'local-jp-sushi-1', lessonId: 'local', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Qu\'est-ce qui différencie le nigiri du maki ?',
      data: {
        options: [
          'Nigiri = riz à la main + poisson dessus. Maki = rouleau de riz enroulé dans le nori',
          'Nigiri = toujours cuit. Maki = toujours cru',
          'Nigiri = avec avocat. Maki = sans avocat',
          'Ce sont les mêmes',
        ],
        correctIndex: 0,
      },
    },
    {
      id: 'local-jp-sushi-2', lessonId: 'local', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Le riz à sushi est assaisonné d\'un mélange de vinaigre de riz, sucre et ___, ajouté au riz chaud.',
      data: { answer: 'sel', hint: 'Trois ingrédients simples, un résultat précis' },
    },
    {
      id: 'local-jp-sushi-3', lessonId: 'local', orderIndex: 2, xpReward: 10,
      type: 'step_ordering',
      question: 'Remets la préparation du riz à sushi dans l\'ordre :',
      data: {
        steps: ['Éventailler pour refroidir à température ambiante', 'Rincer le riz 5-6 fois à l\'eau froide', 'Cuisiner à la vapeur ou absorption', 'Incorporer le mélange vinaigré'],
        correctOrder: [1, 2, 3, 0],
      },
    },
    {
      id: 'local-jp-sushi-4', lessonId: 'local', orderIndex: 3, xpReward: 10,
      type: 'association',
      question: 'Associe chaque type à sa description :',
      data: {
        pairs: [
          { left: 'Nigiri', right: 'Riz moulé à la main, poisson sur le dessus' },
          { left: 'Temaki', right: 'Cône de nori garni à la main' },
          { left: 'Uramaki', right: 'Riz à l\'extérieur, nori à l\'intérieur' },
          { left: 'Chirashi', right: 'Bol de riz avec garnitures dispersées' },
        ],
      },
    },
  ],

  'Le Ramen': [
    {
      id: 'local-jp-ramen-1', lessonId: 'local', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quelles sont les 4 grandes catégories de ramen japonais ?',
      data: {
        options: [
          'Shoyu (soja), Shio (sel), Miso, Tonkotsu (porc)',
          'Porc, poulet, légumes, fruits de mer',
          'Tokyo, Osaka, Hokkaido, Kyushu',
          'Froid, chaud, épicé, doux',
        ],
        correctIndex: 0,
      },
    },
    {
      id: 'local-jp-ramen-2', lessonId: 'local', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Le bouillon de ramen Tonkotsu (de Fukuoka) est réalisé à partir d\'os de ___ cuits plusieurs heures.',
      data: { answer: 'porc', hint: 'Un bouillon crémeux et très riche' },
    },
    {
      id: 'local-jp-ramen-3', lessonId: 'local', orderIndex: 2, xpReward: 10,
      type: 'association',
      question: 'Associe chaque garniture à son nom japonais :',
      data: {
        pairs: [
          { left: 'Chashu', right: 'Porc braisé laqué' },
          { left: 'Ajitsuke tamago', right: 'Œuf mariné mollet' },
          { left: 'Menma', right: 'Pousses de bambou marinées' },
          { left: 'Nori', right: 'Algue séchée' },
        ],
      },
    },
    {
      id: 'local-jp-ramen-4', lessonId: 'local', orderIndex: 3, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le "tare" dans un ramen, c\'est quoi ?',
      data: {
        options: [
          'La sauce concentrée (sel, soja ou miso) qui assaisonne le bouillon dans le bol',
          'Le type de nouilles utilisé',
          'La couche de gras flottant',
          'La garniture de légumes',
        ],
        correctIndex: 0,
      },
    },
  ],

  'Le Poulet Teriyaki': [
    {
      id: 'local-jp-teriyaki-1', lessonId: 'local', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'La sauce teriyaki est composée de :',
      data: {
        options: [
          'Sauce soja + mirin + saké + sucre (proportions égales)',
          'Sauce soja + vinaigre + sésame',
          'Miso + mirin + gingembre',
          'Sauce soja + sriracha + ail',
        ],
        correctIndex: 0,
      },
    },
    {
      id: 'local-jp-teriyaki-2', lessonId: 'local', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: '"Teri" signifie brillant et "yaki" signifie ___ en japonais.',
      data: { answer: 'grillé', hint: 'C\'est une technique de cuisson' },
    },
    {
      id: 'local-jp-teriyaki-3', lessonId: 'local', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Pour un teriyaki brillant, on badigeonne la viande de sauce…',
      data: {
        options: [
          'En fin de cuisson, plusieurs fois, pour caraméliser',
          'Avant la cuisson seulement pour mariner',
          'Après la cuisson, froide, pour le goût',
          'Pendant toute la cuisson dès le début',
        ],
        correctIndex: 0,
      },
    },
    {
      id: 'local-jp-teriyaki-4', lessonId: 'local', orderIndex: 3, xpReward: 10,
      type: 'association',
      question: 'Associe chaque ingrédient à son rôle dans la sauce teriyaki :',
      data: {
        pairs: [
          { left: 'Sauce soja', right: 'Umami et sel' },
          { left: 'Mirin', right: 'Douceur et brillance' },
          { left: 'Saké', right: 'Arôme et attendrissement' },
          { left: 'Sucre', right: 'Caramélisation et laque' },
        ],
      },
    },
  ],

  'Les Onigiri': [
    {
      id: 'local-jp-onigiri-1', lessonId: 'local', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quel riz utilise-t-on pour faire des onigiri ?',
      data: {
        options: [
          'Riz japonais à grains courts (uruchimai), légèrement collant',
          'Riz basmati long grain',
          'Riz gluant (mochigome)',
          'Riz sauvage',
        ],
        correctIndex: 0,
      },
    },
    {
      id: 'local-jp-onigiri-2', lessonId: 'local', orderIndex: 1, xpReward: 10,
      type: 'association',
      question: 'Associe chaque garniture à son nom japonais :',
      data: {
        pairs: [
          { left: 'Umeboshi', right: 'Prune fermentée acide' },
          { left: 'Okaka', right: 'Flocons de bonite et sauce soja' },
          { left: 'Sake', right: 'Saumon grillé émietté' },
          { left: 'Kombu', right: 'Algue confite sucrée-salée' },
        ],
      },
    },
    {
      id: 'local-jp-onigiri-3', lessonId: 'local', orderIndex: 2, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Les onigiri se moulent avec les mains légèrement ___ pour que le riz ne colle pas.',
      data: { answer: 'humides', hint: 'Et un peu de sel sur les paumes' },
    },
    {
      id: 'local-jp-onigiri-4', lessonId: 'local', orderIndex: 3, xpReward: 10,
      type: 'multiple_choice',
      question: 'Pour que le nori reste croustillant, on l\'enroule autour de l\'onigiri…',
      data: {
        options: [
          'Juste avant de manger, pas avant',
          'Le matin pour qu\'il ramollisse et colle',
          'On le trempe d\'abord dans l\'eau',
          'On le cuit avec le riz',
        ],
        correctIndex: 0,
      },
    },
  ],

  'Le Tonkatsu': [
    { id: 'local-jp9-1', lessonId: 'jp-9', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'La chapelure japonaise utilisée pour le tonkatsu s\'appelle :',
      data: { options: ['Panko', 'Chapelure ordinaire', 'Farine de riz', 'Semoule de maïs'], correctIndex: 0,
        anecdote: 'Le tonkatsu (côtelette de porc panée) est apparu à Tokyo en 1899. Le panko — flocons de pain plus grossiers — absorbe moins d\'huile et crée une croûte plus légère que la chapelure fine.' } },
    { id: 'local-jp9-2', lessonId: 'jp-9', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La sauce tonkatsu est une variante épaisse et sucrée de la sauce ___, importée d\'Angleterre au Japon.',
      data: { answer: 'Worcestershire', hint: 'Sauce brune anglaise célèbre' } },
    { id: 'local-jp9-3', lessonId: 'jp-9', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'À quelle température frit-on le tonkatsu ?',
      data: { options: ['170-175°C — cuisson progressive', '200°C pour croûte rapide', '150°C cuisson lente', '160°C dès le départ'], correctIndex: 0 } },
  ],

  "L'Oyakodon": [
    { id: 'local-jp10-1', lessonId: 'jp-10', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: '"Oyako" signifie en japonais :',
      data: { options: ['"Parent et enfant" (poulet + œuf)', '"Bol de riz réconfortant"', '"Sauce soja douce"', '"Plat du soir"'], correctIndex: 0,
        anecdote: 'Le nom poétique "oyakodon" célèbre la réunion du poulet (le parent) et de l\'œuf (l\'enfant). Populaire depuis l\'ère Meiji, c\'est le plat du dimanche de nombreuses familles japonaises.' } },
    { id: 'local-jp10-2', lessonId: 'jp-10', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Le bouillon sucré-salé de l\'oyakodon mélange dashi, sauce soja, mirin et ___ à parts égales.',
      data: { answer: 'saké', hint: 'Les 4 piliers des sauces japonaises cuites' } },
    { id: 'local-jp10-3', lessonId: 'jp-10', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Pour l\'œuf mi-cuit soyeux caractéristique, on :',
      data: { options: ['Verse les œufs battus et couvre immédiatement hors du feu', 'Brouille à feu vif 5 min', 'Cuit l\'œuf séparément à la poêle', 'Ajoute l\'œuf cru au dernier moment sur le riz'], correctIndex: 0 } },
  ],

  'Le Katsu Curry': [
    { id: 'local-jp11-1', lessonId: 'jp-11', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le curry japonais diffère du curry indien car il est :',
      data: { options: ['Plus doux, sucré, épaissi au roux beurre-farine', 'Plus pimenté et sans épaississant', 'À base de lait de coco', 'À base de pâte de miso rouge'], correctIndex: 0,
        anecdote: 'Le curry est arrivé au Japon via la Royal Navy britannique au XIXe siècle. Les marins de la marine impériale l\'ont popularisé — il reste le plat hebdomadaire réglementaire de la marine japonaise.' } },
    { id: 'local-jp11-2', lessonId: 'jp-11', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'L\'ingrédient secret du curry japonais maison, qui apporte douceur et profondeur, est la ___ râpée.',
      data: { answer: 'pomme', hint: 'Ou du miel et du chocolat noir selon les familles' } },
    { id: 'local-jp11-3', lessonId: 'jp-11', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Les roux curry en blocs du commerce (Vermont Curry, Java Curry…) s\'ajoutent :',
      data: { options: ['Hors du feu après cuisson des légumes, on laisse fondre', 'En début de cuisson avec les oignons', 'Dilués dans de l\'eau froide avant', 'Au dernier moment sans cuire'], correctIndex: 0 } },
  ],

  "L'Udon en Bouillon": [
    { id: 'local-jp14-1', lessonId: 'jp-14', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le bouillon "tsuyu" pour udon est composé de :',
      data: { options: ['Dashi + sauce soja + mirin (8:1:1)', 'Eau + sel uniquement', 'Bouillon de poulet + soja', 'Miso + dashi'], correctIndex: 0,
        anecdote: 'L\'udon de Sanuki (Kagawa) est considéré le meilleur du Japon. Certains maîtres pétrissent encore la pâte avec les pieds — une technique qui développe un gluten incomparable.' } },
    { id: 'local-jp14-2', lessonId: 'jp-14', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La pâte à udon maison ne contient que farine de blé, eau et ___ — sans œuf ni matière grasse.',
      data: { answer: 'sel', hint: 'La simplicité est la force de l\'udon' } },
    { id: 'local-jp14-3', lessonId: 'jp-14', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Après cuisson, on rince les udon à l\'eau froide pour :',
      data: { options: ['Stopper la cuisson et ôter l\'amidon pour plus d\'élasticité', 'Les refroidir pour soupe froide uniquement', 'Les colorer', 'Les déshydrater'], correctIndex: 0 } },
  ],

  "L'Okonomiyaki": [
    { id: 'local-jp15-1', lessonId: 'jp-15', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: '"Okonomiyaki" signifie littéralement :',
      data: { options: ['"Ce que tu veux + grillé"', '"Galette de chou impériale"', '"Pancake d\'Osaka"', '"Repas du pêcheur"'], correctIndex: 0,
        anecdote: 'Il existe deux styles rivaux : Osaka (tout mélangé) et Hiroshima (couches superposées avec nouilles). La mayonnaise Kewpie et les flocons de bonite animés par la chaleur sont les signatures visuelles.' } },
    { id: 'local-jp15-2', lessonId: 'jp-15', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'L\'ingrédient qui rend la pâte à okonomiyaki légère et mousseuse est le ___ (igname japonaise râpée).',
      data: { answer: 'yamaimo', hint: 'Tubercule de montagne japonais — "yama" = montagne' } },
    { id: 'local-jp15-3', lessonId: 'jp-15', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Les flocons qui ondulent sur l\'okonomiyaki chaud sont :',
      data: { options: ['Katsuobushi (bonite séchée) animé par la vapeur', 'Algues wakamé', 'Tempura émiettée', 'Riz soufflé'], correctIndex: 0 } },
  ],

  'Le Mochi': [
    { id: 'local-jp16-1', lessonId: 'jp-16', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le mochi est fabriqué à partir de :',
      data: { options: ['Riz gluant (mochigome) cuit à la vapeur puis pilé', 'Riz basmati', 'Farine de blé et œufs', 'Fécule de maïs'], correctIndex: 0,
        anecdote: 'La cérémonie du mochitsuki (pilonnage du riz) requiert deux personnes : l\'une frappe avec un maillet, l\'autre tourne le riz entre chaque coup. Une mauvaise coordination peut briser les doigts !' } },
    { id: 'local-jp16-2', lessonId: 'jp-16', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Pour travailler la pâte à mochi sans qu\'elle colle aux mains, on la saupoudre de ___ de pomme de terre (katakuriko).',
      data: { answer: 'fécule', hint: 'Ou fécule de maïs (maïzena)' } },
    { id: 'local-jp16-3', lessonId: 'jp-16', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'La garniture classique du daifuku mochi est :',
      data: { options: ['Anko — pâte de haricots rouges sucrée', 'Chocolat fondu', 'Crème au beurre', 'Confiture de fraises'], correctIndex: 0 } },
  ],

  'Le Shabu-Shabu': [
    { id: 'local-jp17-1', lessonId: 'jp-17', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: '"Shabu-shabu" est une onomatopée qui imite :',
      data: { options: ['Le bruit de la viande agitée dans le bouillon', 'L\'eau bouillante', 'Le sifflement de vapeur', 'Les baguettes sur le bol'], correctIndex: 0,
        anecdote: 'Le shabu-shabu est né à Osaka dans les années 1950. Le dashi très léger (kombu seulement) est conçu pour ne pas masquer le goût subtil du wagyu de haute qualité.' } },
    { id: 'local-jp17-2', lessonId: 'jp-17', orderIndex: 1, xpReward: 10,
      type: 'association',
      question: 'Associe chaque sauce au shabu-shabu avec sa description :',
      data: { pairs: [
        { left: 'Ponzu', right: 'Agrumes + soja — fraîche et acide' },
        { left: 'Goma dare', right: 'Sésame blanc + dashi — crémeuse' },
        { left: 'Momiji oroshi', right: 'Daikon + piment rouge râpé' },
        { left: 'Tare', right: 'Soja concentré pour assaisonner le bouillon' },
      ] } },
    { id: 'local-jp17-3', lessonId: 'jp-17', orderIndex: 2, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La viande pour shabu-shabu est tranchée très finement — environ ___ mm — pour cuire en quelques secondes.',
      data: { answer: '2', hint: 'Presque transparente, comme du papier' } },
  ],

  'Le Takoyaki': [
    { id: 'local-jp19-1', lessonId: 'jp-19', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: '"Tako" signifie ___ en japonais.',
      data: { options: ['Poulpe', 'Porc', 'Tofu', 'Oeuf'], correctIndex: 0,
        anecdote: 'Le takoyaki a été inventé à Osaka en 1935 par Tomekichi Endo. Osaka est surnommée "kuidaore" (manger jusqu\'à tomber) et le takoyaki est son emblème culinaire de rue.' } },
    { id: 'local-jp19-2', lessonId: 'jp-19', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Pour former la boule de takoyaki, on retourne la pâte à mi-cuisson avec une ___ fine en métal ou bambou.',
      data: { answer: 'brochette', hint: 'Ou un cure-dent — geste rapide et précis' } },
    { id: 'local-jp19-3', lessonId: 'jp-19', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Les garnitures classiques du takoyaki (au-delà de la sauce) sont :',
      data: { options: ['Mayonnaise Kewpie, katsuobushi et aonori (algue verte)', 'Sauce soja et wasabi', 'Fromage fondu et lardons', 'Moutarde et cornichons'], correctIndex: 0 } },
  ],

  'Le Matcha Parfait': [
    { id: 'local-jp20-1', lessonId: 'jp-20', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le matcha est obtenu à partir de :',
      data: { options: ['Feuilles de thé vert ombragées puis broyées en poudre fine', 'Feuilles de thé séchées ordinaires', 'Herbes de montagne japonaises', 'Extrait concentré de thé vert'], correctIndex: 0,
        anecdote: 'Les plants de thé matcha sont ombragés 3-4 semaines avant récolte pour concentrer la chlorophylle et la L-théanine. Cette ombre produit la douceur et la couleur vert intense du matcha de qualité.' } },
    { id: 'local-jp20-2', lessonId: 'jp-20', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'L\'amertume du matcha dans le parfait est équilibrée par l\'___, une pâte sucrée de haricots rouges.',
      data: { answer: 'anko', hint: 'Aussi appelée "pâte azuki"' } },
    { id: 'local-jp20-3', lessonId: 'jp-20', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le parfait japonais (pafait) diffère du sundae américain car il comprend :',
      data: { options: ['Des couches de mochi, gelée, anko et crème — textures variées', 'Seulement glace + chantilly + cerises', 'Un brownie au chocolat à la base', 'Du sirop d\'érable uniquement'], correctIndex: 0 } },
  ],

  'Les Gnocchi di Patate': [
    { id: 'local-it8-1', lessonId: 'it-8', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Pour des gnocchis légers, on utilise des pommes de terre :',
      data: { options: ['Farineuses (Bintje, Monalisa) cuites au four ou à la vapeur — jamais à l\'eau', 'À chair ferme cuites à l\'eau', 'Nouvelles grillées', 'En purée du commerce'], correctIndex: 0,
        anecdote: 'Les gnocchis existent depuis le Moyen Âge. L\'erreur numéro un est d\'utiliser des pommes de terre trop humides (bouillies) — elles absorbent trop de farine et donnent des gnocchis caoutchouteux.' } },
    { id: 'local-it8-2', lessonId: 'it-8', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Les gnocchis sont prêts à l\'égouttage quand ils ___ à la surface de l\'eau bouillante salée.',
      data: { answer: 'remontent', hint: 'Ils flottent — signe de cuisson' } },
    { id: 'local-it8-3', lessonId: 'it-8', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Les rainures sur les gnocchis (faites avec une fourchette ou une planche à gnocchis) servent à :',
      data: { options: ['Retenir plus de sauce dans les creux', 'Décorer seulement', 'Accélérer la cuisson', 'Empêcher qu\'ils collent entre eux'], correctIndex: 0 } },
  ],

  'La Focaccia Genovese': [
    { id: 'local-it9-1', lessonId: 'it-9', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'La focaccia genovese se distingue par :',
      data: { options: ['Une couche généreuse d\'huile d\'olive saumurée sur le dessus et une mie très aérée', 'Une pâte sans levure très fine', 'Du fromage dans la pâte', 'Une garniture de tomates cerises'], correctIndex: 0,
        anecdote: 'La focaccia genovese est protégée par une association IGP à Gênes. Les Génois la mangent même au petit-déjeuner trempée dans du cappuccino — habitude choquante pour le reste de l\'Italie !' } },
    { id: 'local-it9-2', lessonId: 'it-9', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Avant la dernière levée, on enfonce les doigts dans la pâte pour créer des ___ qui retiennent la saumure d\'huile.',
      data: { answer: 'alvéoles / trous', hint: 'Le geste signature de la focaccia' } },
    { id: 'local-it9-3', lessonId: 'it-9', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'La saumure versée sur la focaccia avant cuisson est :',
      data: { options: ['Huile d\'olive + eau + sel en proportions égales', 'Huile d\'olive pure', 'Eau salée seule', 'Lait + sel'], correctIndex: 0 } },
  ],

  "L'Osso Buco à la Milanaise": [
    { id: 'local-it10-1', lessonId: 'it-10', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: '"Osso buco" signifie en italien :',
      data: { options: ['"Os avec trou" — le trou contient la moelle', '"Os de veau braisé"', '"Os creux de la joie"', '"Viande de trou"'], correctIndex: 0,
        anecdote: 'L\'osso buco traditionnel ne contient pas de tomate (version "in bianco") — c\'est la version milanaise moderne qui l\'ajoute. La gremolata (zeste citron + ail + persil) est essentielle et toujours ajoutée hors feu.' } },
    { id: 'local-it10-2', lessonId: 'it-10', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La gremolata qui garnit l\'osso buco est composée de zeste de citron, ail et ___ finement hachés.',
      data: { answer: 'persil plat', hint: 'Les trois ingrédients qui "réveillent" le plat braisé' } },
    { id: 'local-it10-3', lessonId: 'it-10', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'L\'accompagnement traditionnel de l\'osso buco milanais est :',
      data: { options: ['Risotto allo zafferano (risotto au safran)', 'Polenta', 'Pâtes fraîches', 'Pommes de terre sautées'], correctIndex: 0 } },
  ],

  'Les Arancini Siciliens': [
    { id: 'local-it12-1', lessonId: 'it-12', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: '"Arancini" signifie en sicilien :',
      data: { options: ['"Petites oranges" — leur forme ronde dorée rappelle le fruit', '"Petites boules de riz"', '"Boulettes à la viande"', '"Nourriture de fête"'], correctIndex: 0,
        anecdote: 'Les arancini siciliens existent depuis le Xe siècle, introduits par les Arabes lors de leur occupation de la Sicile. La forme conique (arancino) à Catane vs ronde (arancina) à Palerme est un sujet de débat passionné.' } },
    { id: 'local-it12-2', lessonId: 'it-12', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Pour que la panure des arancini reste en place à la friture, on les passe dans la farine, l\'œuf battu puis la ___ dans cet ordre.',
      data: { answer: 'chapelure', hint: 'La classique panure à l\'anglaise' } },
    { id: 'local-it12-3', lessonId: 'it-12', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le riz des arancini est un risotto refroidi assaisonné de :',
      data: { options: ['Safran (pour la couleur dorée) et parmesan', 'Sauce tomate et basilic', 'Pesto verde', 'Vinaigre balsamique'], correctIndex: 0 } },
  ],

  'La Parmigiana di Melanzane': [
    { id: 'local-it13-1', lessonId: 'it-13', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Avant d\'assembler la parmigiana, les aubergines doivent être :',
      data: { options: ['Salées, pressées, puis frites ou grillées pour ôter l\'amertume et l\'eau', 'Utilisées crues directement', 'Cuites à la vapeur', 'Marinées au vinaigre'], correctIndex: 0,
        anecdote: 'L\'origine de la parmigiana est dispute entre Naples, Sicile et Parme. Le mot "parmigiana" ne dérive pas nécessairement de Parme — il pourrait venir du sicilien "parmiciana" désignant les jalousies de volets.' } },
    { id: 'local-it13-2', lessonId: 'it-13', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La parmigiana se monte en couches alternées d\'aubergines, sauce tomate, mozzarella et ___ râpé.',
      data: { answer: 'parmesan', hint: 'Le fromage qui donne le nom au plat' } },
    { id: 'local-it13-3', lessonId: 'it-13', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Pour une parmigiana légère, on peut substituer la friture des aubergines par :',
      data: { options: ['Cuisson au four à 200°C avec un filet d\'huile', 'Blanchiment à l\'eau', 'Grillage au grill d\'intérieur', 'Cuisson à la vapeur'], correctIndex: 0 } },
  ],

  'Les Lasagne al Forno': [
    { id: 'local-it15-1', lessonId: 'it-15', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le ragù bolognaise authentique (ragù alla bolognese) se prépare avec :',
      data: { options: ['Bœuf + porc hachés, vin blanc, lait — mijoté minimum 3 heures', 'Bœuf haché + sauce tomate en boîte + basilic', 'Agneau haché + tomates fraîches', 'Veau haché + crème fraîche'], correctIndex: 0,
        anecdote: 'La recette officielle du ragù bolognese a été déposée en 1982 à la Chambre de Commerce de Bologne. Elle stipule : bœuf et porc, vin blanc (pas rouge), lait — et très peu de tomate. La tomate est moderne.' } },
    { id: 'local-it15-2', lessonId: 'it-15', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Les lasagnes al forno se montent avec 4 à 6 couches de pâtes, ragù et béchamel — la dernière couche doit toujours être de la ___ gratinée.',
      data: { answer: 'béchamel', hint: 'Protège les pâtes du dessèchement et gratine joliment' } },
    { id: 'local-it15-3', lessonId: 'it-15', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le secret pour des lasagnes qui se tiennent à la découpe est :',
      data: { options: ['Laisser reposer 10-15 min hors du four avant de couper', 'Découper immédiatement à la sortie du four', 'Réfrigérer 1h avant de couper', 'Ajouter plus de farine à la béchamel'], correctIndex: 0 } },
  ],

  'La Polenta Crémeuse': [
    { id: 'local-it16-1', lessonId: 'it-16', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'La polenta traditionnelle (non instantanée) nécessite :',
      data: { options: ['40 à 60 minutes de cuisson en remuant constamment', '5 minutes à l\'eau bouillante', '20 minutes au micro-ondes', '10 minutes puis repos'], correctIndex: 0,
        anecdote: 'La polenta était la nourriture des paysans du nord de l\'Italie (Vénétie, Lombardie, Piémont) pendant des siècles. Elle remplaçait le pain. La polenta "taragna" intègre de la farine de sarrasin et du fromage fondu.' } },
    { id: 'local-it16-2', lessonId: 'it-16', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Pour une polenta crémeuse, on incorpore en fin de cuisson du ___ et du parmesan râpé.',
      data: { answer: 'beurre', hint: 'La mantecatura italienne — même principe que le risotto' } },
    { id: 'local-it16-3', lessonId: 'it-16', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'La polenta refroidie se solidifie et peut être :',
      data: { options: ['Découpée en tranches puis grillée ou frite — une texture complètement différente', 'Réchauffée uniquement à la casserole', 'Utilisée seulement comme purée', 'Elle ne se solidifie jamais'], correctIndex: 0 } },
  ],

  'Le Saltimbocca alla Romana': [
    { id: 'local-it17-1', lessonId: 'it-17', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: '"Saltimbocca" signifie :',
      data: { options: ['"Saute en bouche" — tant il est savoureux', '"Veau sauté"', '"Sauce au vin blanc"', '"Petite escalope romaine"'], correctIndex: 0,
        anecdote: 'Le saltimbocca alla romana est cité dans les livres de cuisine romains du XVIIe siècle. La sauge et le prosciutto sont fixés avec un cure-dent — la sauge ne doit pas se détacher à la cuisson.' } },
    { id: 'local-it17-2', lessonId: 'it-17', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Le saltimbocca se cuit d\'abord côté prosciutto à sec, puis on déglace au ___ blanc pour créer la sauce.',
      data: { answer: 'vin', hint: 'Le vin blanc romain (Frascati) est traditionnel' } },
    { id: 'local-it17-3', lessonId: 'it-17', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Pourquoi ne sale-t-on pas le veau avant cuisson dans le saltimbocca ?',
      data: { options: ['Le prosciutto est déjà très salé — saler en plus rendrait le plat immangeable', 'Le sel empêche la dorure', 'La sauge libère du sel', 'C\'est simplement une tradition sans raison'], correctIndex: 0 } },
  ],

  'La Ribollita Toscane': [
    { id: 'local-it18-1', lessonId: 'it-18', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: '"Ribollita" signifie :',
      data: { options: ['"Rebouillie" — la soupe était réchauffée et rebouilli le lendemain pour s\'épaissir', '"Soupe de pain"', '"Minestrone toscan"', '"Soupe récupérée"'], correctIndex: 0,
        anecdote: 'La ribollita est née de la pauvreté : les paysans toscans récupéraient les restes de minestrone, ajoutaient du pain rassis et faisaient rebouillir. Le chou noir (cavolo nero) est l\'ingrédient signature.' } },
    { id: 'local-it18-2', lessonId: 'it-18', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Le légume feuille toscan indispensable dans la ribollita, au goût amer et robuste, s\'appelle le chou ___ (cavolo nero).',
      data: { answer: 'noir', hint: 'Aussi appelé "lacinato kale" dans les pays anglo-saxons' } },
    { id: 'local-it18-3', lessonId: 'it-18', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le pain utilisé pour épaissir la ribollita est :',
      data: { options: ['Pain toscan rassis (pane sciocco — sans sel)', 'Baguette fraîche', 'Pain de mie', 'Pain de seigle'], correctIndex: 0 } },
  ],

  'La Torta Caprese': [
    { id: 'local-it19-1', lessonId: 'it-19', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'La torta caprese est naturellement sans gluten car elle est faite de :',
      data: { options: ['Chocolat fondant + amandes en poudre — sans farine de blé', 'Farine de blé + cacao', 'Farine de riz + chocolat', 'Fécule de maïs uniquement'], correctIndex: 0,
        anecdote: 'La torta caprese a été créée par accident dans les années 1920 à Capri : un chef a oublié d\'ajouter la farine. Le résultat était si moelleux et chocolaté qu\'il est devenu le dessert emblématique de l\'île.' } },
    { id: 'local-it19-2', lessonId: 'it-19', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La texture humide et fondante au centre de la torta caprese est due à la proportion élevée de ___ et d\'amandes par rapport aux œufs.',
      data: { answer: 'chocolat', hint: 'Au minimum 70% de cacao pour un goût intense' } },
    { id: 'local-it19-3', lessonId: 'it-19', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Comment reconnaît-on que la torta caprese est prête (elle ne doit pas être surcuite) ?',
      data: { options: ['Le centre tremble légèrement à la sortie du four — il se raffermit en refroidissant', 'La lame d\'un couteau ressort propre', 'Elle se décolle des bords et gonfle', 'Elle dure 45 min précises quelle que soit la taille'], correctIndex: 0 } },
  ],

  'Le Cannolo Sicilien': [
    { id: 'local-it20-1', lessonId: 'it-20', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'La coque croustillante du cannolo est traditionnellement frite dans :',
      data: { options: ['Du saindoux (graisse de porc) — pour le croustillant authentique', 'De l\'huile d\'olive', 'Du beurre clarifié', 'De l\'huile de tournesol'], correctIndex: 0,
        anecdote: 'Les cannoli seraient apparus en Sicile durant la domination arabe (IXe-XIe siècles), peut-être pour célébrer le carnaval de Caltanissetta. La règle d\'or : ne jamais fourrer les coques à l\'avance — elles ramollissent.' } },
    { id: 'local-it20-2', lessonId: 'it-20', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La farce du cannolo est une ricotta égouttée sucrée, dont on retire le maximum d\'___ pour qu\'elle ne détrempe pas la coque.',
      data: { answer: 'eau / lactosérum', hint: 'On l\'égoutte dans une étamine plusieurs heures' } },
    { id: 'local-it20-3', lessonId: 'it-20', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Les garnitures classiques des extrémités d\'un cannolo sicilien comprennent :',
      data: { options: ['Pistaches concassées, oranges confites ou cerises au marasquin', 'Noisettes grillées et myrtilles', 'Noix et caramel', 'Seulement sucre glace'], correctIndex: 0 } },
  ],

  // ── PASTRY ────────────────────────────────────────────────────────────────
  'Les Macarons': [
    {
      id: 'local-pastry-mac-1', lessonId: 'local', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Qu\'est-ce que le "macaronnage" dans la recette des macarons ?',
      data: {
        options: [
          'L\'action de travailler la meringue avec les poudres pour obtenir un appareil brillant qui forme un ruban',
          'La cuisson des coques au four',
          'Le remplissage avec la ganache',
          'Le repos des coques avant garniture',
        ],
        correctIndex: 0,
      },
    },
    {
      id: 'local-pastry-mac-2', lessonId: 'local', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Avant de cuire, les coques de macarons doivent "croûter" — c\'est-à-dire sécher à l\'air libre pendant ___ minutes.',
      data: { answer: '30', hint: 'La surface doit ne plus coller au doigt' },
    },
    {
      id: 'local-pastry-mac-3', lessonId: 'local', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quel est l\'avantage de la meringue italienne sur la meringue française pour les macarons ?',
      data: {
        options: [
          'Plus stable, plus brillante, meilleure conservation',
          'Plus rapide à réaliser',
          'Moins de sucre nécessaire',
          'Se tient moins mais est plus légère',
        ],
        correctIndex: 0,
      },
    },
    {
      id: 'local-pastry-mac-4', lessonId: 'local', orderIndex: 3, xpReward: 10,
      type: 'step_ordering',
      question: 'Remets les étapes des macarons dans l\'ordre :',
      data: {
        steps: ['Croûtage 30-45 min à température ambiante', 'Mixer et tamiser amandes + sucre glace', 'Macaronnage : incorporer la poudre à la meringue', 'Cuire 12-14 min à 150°C four ventilé'],
        correctOrder: [1, 2, 0, 3],
      },
    },
    {
      id: 'local-pastry-mac-5', lessonId: 'local', orderIndex: 4, xpReward: 10,
      type: 'multiple_choice',
      question: 'Pourquoi faut-il utiliser des blancs d\'œufs vieillis (3-4 jours au réfrigérateur) pour les macarons ?',
      data: {
        options: [
          'Ils contiennent moins d\'eau, montent mieux et forment une meringue plus stable',
          'Ils sont plus colorés',
          'Ils ont un goût plus prononcé',
          'Ils cuisent plus vite',
        ],
        correctIndex: 0,
      },
    },
  ],

  // ── PASTRY (additional) ────────────────────────────────────────────────────
  'Les Bases Pâtissières': [
    { id: 'local-pa-base-1', lessonId: 'local', orderIndex: 0, xpReward: 10, type: 'multiple_choice',
      question: 'Quels sont les quatre piliers de la pâtisserie française classique ?',
      data: { options: ['Pâtes, crèmes, mousses, glaçages', 'Farine, beurre, sucre, chocolat', 'Tartes, gâteaux, viennoiseries, glaces', 'Chaud, froid, sec, humide'], correctIndex: 0 } },
    { id: 'local-pa-base-2', lessonId: 'local', orderIndex: 1, xpReward: 10, type: 'fill_in_blank',
      question: 'La pâtisserie est souvent surnommée "la ___ de la cuisine" car elle exige précision et rigueur.',
      data: { answer: 'chimie', hint: 'Les proportions y sont cruciales' } },
    { id: 'local-pa-base-3', lessonId: 'local', orderIndex: 2, xpReward: 10, type: 'multiple_choice',
      question: 'Pourquoi pèse-t-on les ingrédients en pâtisserie plutôt que de les mesurer en volume ?',
      data: { options: ['Pour plus de précision — la densité varie selon les produits', 'Par tradition', 'Pour aller plus vite', 'Les verres doseurs ne sont pas fiables'], correctIndex: 0 } },
  ],

  'La Crème Pâtissière': [
    { id: 'local-pa-creme-1', lessonId: 'local', orderIndex: 0, xpReward: 10, type: 'multiple_choice',
      question: 'Quel amidon épaissit classiquement la crème pâtissière ?',
      data: { options: ['Fécule de maïs (Maïzena) ou farine', 'Agar-agar', 'Gélatine', 'Arrowroot uniquement'], correctIndex: 0 } },
    { id: 'local-pa-creme-2', lessonId: 'local', orderIndex: 1, xpReward: 10, type: 'fill_in_blank',
      question: 'Pour éviter qu\'une peau ne se forme sur la crème pâtissière en refroidissant, on applique un film plastique ___ sur la surface.',
      data: { answer: 'au contact', hint: 'Directement collé à la crème' } },
    { id: 'local-pa-creme-3', lessonId: 'local', orderIndex: 2, xpReward: 10, type: 'step_ordering',
      question: 'Remets les étapes de la crème pâtissière dans l\'ordre :',
      data: { steps: ['Incorporer jaunes + sucre + fécule', 'Faire bouillir le lait avec la vanille', 'Verser le lait chaud sur le mélange jaunes', 'Recuire en remuant jusqu\'à épaississement'], correctOrder: [1, 0, 2, 3] } },
  ],

  'Les Éclairs au Chocolat': [
    { id: 'local-pa-eclair-1', lessonId: 'local', orderIndex: 0, xpReward: 10, type: 'multiple_choice',
      question: 'La pâte à choux tire son nom de sa ressemblance avec un légume. Pourquoi ce nom ?',
      data: { options: ['Les petits choux soufflés ressemblent à des choux en miniature', 'Elle est verte comme un chou', 'Elle a été inventée par un pâtissier nommé Chou', 'Elle pousse comme des feuilles de chou'], correctIndex: 0 } },
    { id: 'local-pa-eclair-2', lessonId: 'local', orderIndex: 1, xpReward: 10, type: 'fill_in_blank',
      question: 'L\'éclair doit son nom à sa facilité à être mangé "en un ___ d\'éclair".',
      data: { answer: 'éclair', hint: 'Il se dévore très vite' } },
    { id: 'local-pa-eclair-3', lessonId: 'local', orderIndex: 2, xpReward: 10, type: 'multiple_choice',
      question: 'Comment vérifier qu\'une pâte à choux a la bonne consistance ?',
      data: { options: ['Elle forme un ruban qui tombe lentement et forme un "V" au bout de la spatule', 'Elle est très liquide et coule librement', 'Elle est dure et ne colle pas', 'Elle fait des bulles à la surface'], correctIndex: 0 } },
  ],

  'La Pâte Feuilletée': [
    { id: 'local-pa-feuil-1', lessonId: 'local', orderIndex: 0, xpReward: 10, type: 'multiple_choice',
      question: 'Combien de couches de pâte obtient-on avec une pâte feuilletée classique à 6 tours simples ?',
      data: { options: ['729 couches', '24 couches', '256 couches', '1024 couches'], correctIndex: 0 } },
    { id: 'local-pa-feuil-2', lessonId: 'local', orderIndex: 1, xpReward: 10, type: 'fill_in_blank',
      question: 'Le "tourage" consiste à plier et étaler la pâte pour créer les couches. Entre chaque tour, on laisse reposer la pâte au ___ pour détendre le gluten.',
      data: { answer: 'réfrigérateur', hint: 'Le froid empêche aussi le beurre de fondre' } },
    { id: 'local-pa-feuil-3', lessonId: 'local', orderIndex: 2, xpReward: 10, type: 'multiple_choice',
      question: 'Quelle est la différence entre pâte feuilletée et pâte feuilletée inversée ?',
      data: { options: ['Dans l\'inversée, le beurre enveloppe la détrempe (et non l\'inverse) — résultat plus croustillant', 'L\'inversée n\'a pas de beurre', 'L\'inversée se prépare à chaud', 'Elles sont identiques'], correctIndex: 0 } },
  ],

  // ── MEXICAN (additional) ────────────────────────────────────────────────────

  'Les Ingrédients Clés': [
    { id: 'local-mx-ing-1', lessonId: 'local', orderIndex: 0, xpReward: 10, type: 'multiple_choice',
      question: 'Quel piment séché est à la base du mole et de nombreuses sauces mexicaines ?',
      data: { options: ['Ancho (poblano séché)', 'Jalapeño vert frais', 'Cayenne', 'Paprika fumé'], correctIndex: 0 } },
    { id: 'local-mx-ing-2', lessonId: 'local', orderIndex: 1, xpReward: 10, type: 'fill_in_blank',
      question: 'La base des tortillas mexicaines traditionnelles est la ___, farine de maïs traitée à la chaux.',
      data: { answer: 'masa', hint: 'Nixtamalisation — procédé précolombien' } },
    { id: 'local-mx-ing-3', lessonId: 'local', orderIndex: 2, xpReward: 10, type: 'multiple_choice',
      question: 'Qu\'est-ce que l\'épazote, herbe emblématique de la cuisine mexicaine ?',
      data: { options: ['Une herbe aromatique au goût puissant utilisée dans les haricots et soupes', 'Un type de piment doux', 'Une épice comme la cannelle', 'Un fromage mexicain'], correctIndex: 0 } },
  ],

  'Les Tacos al Pastor': [
    { id: 'local-mx-pastor-1', lessonId: 'local', orderIndex: 0, xpReward: 10, type: 'multiple_choice',
      question: 'Les tacos al pastor ont été inventés par qui au Mexique ?',
      data: { options: ['Des immigrants libanais qui ont apporté la technique de la broche verticale (shawarma)', 'Des cowboys texans', 'Des moines franciscains', 'Des pêcheurs de Veracruz'], correctIndex: 0 } },
    { id: 'local-mx-pastor-2', lessonId: 'local', orderIndex: 1, xpReward: 10, type: 'fill_in_blank',
      question: 'La marinade al pastor est à base de piments ___, vinaigre, ananas et épices.',
      data: { answer: 'guajillo', hint: 'Piments séchés rouges au goût fruité' } },
    { id: 'local-mx-pastor-3', lessonId: 'local', orderIndex: 2, xpReward: 10, type: 'multiple_choice',
      question: 'La garniture traditionnelle des tacos al pastor comprend :',
      data: { options: ['Ananas, coriandre, oignon blanc et salsa verde', 'Fromage, crème et guacamole', 'Laitue, tomate et mayo', 'Haricots noirs et riz'], correctIndex: 0 } },
  ],

  'La Salsa Verde': [
    { id: 'local-mx-salsa-1', lessonId: 'local', orderIndex: 0, xpReward: 10, type: 'multiple_choice',
      question: 'Quel est l\'ingrédient principal qui donne son acidité naturelle à la salsa verde mexicaine ?',
      data: { options: ['Le tomatillo (tomate verte à enveloppe papyracée)', 'Le citron vert', 'Le vinaigre blanc', 'La pomme verte'], correctIndex: 0 } },
    { id: 'local-mx-salsa-2', lessonId: 'local', orderIndex: 1, xpReward: 10, type: 'fill_in_blank',
      question: 'Pour une salsa verde rôtie plus douce, on passe les tomatillos sous le ___ quelques minutes.',
      data: { answer: 'gril', hint: 'Broiler en anglais — crée une légère carbonisation' } },
    { id: 'local-mx-salsa-3', lessonId: 'local', orderIndex: 2, xpReward: 10, type: 'multiple_choice',
      question: 'La salsa verde se distingue de la sauce tomate rouge par :',
      data: { options: ['Son acidité vive, sa couleur verte et ses notes herbacées de coriandre', 'Sa texture plus épaisse', 'L\'absence de piment', 'Sa longue cuisson'], correctIndex: 0 } },
  ],

  'Les Tortillas Maison': [
    { id: 'local-mx-tortilla-1', lessonId: 'local', orderIndex: 0, xpReward: 10, type: 'multiple_choice',
      question: 'La nixtamalisation consiste à cuire le maïs dans :',
      data: { options: ['Une solution alcaline de chaux (hydroxyde de calcium)', 'Du vinaigre', 'Du sel marin', 'De l\'eau bouillante simple'], correctIndex: 0 } },
    { id: 'local-mx-tortilla-2', lessonId: 'local', orderIndex: 1, xpReward: 10, type: 'fill_in_blank',
      question: 'La tortilla de maïs traditionnelle est cuite sur un ___, plaque plate en terre cuite ou métal.',
      data: { answer: 'comal', hint: 'Ustensile précolombien encore utilisé aujourd\'hui' } },
    { id: 'local-mx-tortilla-3', lessonId: 'local', orderIndex: 2, xpReward: 10, type: 'step_ordering',
      question: 'Remets les étapes de la tortilla maison dans l\'ordre :',
      data: { steps: ['Cuire 1-2 min par face sur comal très chaud', 'Mélanger masa harina et eau tiède', 'Former des boules et aplatir avec une tortillera', 'Laisser reposer la masa 15 min'], correctOrder: [1, 3, 2, 0] } },
  ],

  'Le Mole Negro': [
    { id: 'local-mx-mole-1', lessonId: 'local', orderIndex: 0, xpReward: 10, type: 'multiple_choice',
      question: 'Quel ingrédient surprenant donne sa profondeur et sa couleur au mole negro ?',
      data: { options: ['Du chocolat noir (cacao non sucré)', 'De l\'encre de seiche', 'Du café espresso', 'Du charbon végétal'], correctIndex: 0 } },
    { id: 'local-mx-mole-2', lessonId: 'local', orderIndex: 1, xpReward: 10, type: 'fill_in_blank',
      question: 'Le mole negro traditionnel de Oaxaca peut contenir jusqu\'à ___ ingrédients différents.',
      data: { answer: '30', hint: 'Entre 20 et 30 selon les familles' } },
    { id: 'local-mx-mole-3', lessonId: 'local', orderIndex: 2, xpReward: 10, type: 'multiple_choice',
      question: 'Pourquoi le mole negro est-il considéré comme un plat de fête au Mexique ?',
      data: { options: ['Il demande plusieurs heures de préparation et symbolise le partage et l\'abondance', 'Il est très pimenté', 'Il contient des ingrédients rares importés', 'Il se mange seulement en hiver'], correctIndex: 0 } },
  ],

  'Le Guacamole': [
    {
      id: 'local-mx-guac-1', lessonId: 'local', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Comment choisir un avocat mûr pour le guacamole ?',
      data: {
        options: [
          'Il cède légèrement sous une pression douce — ni dur, ni trop mou',
          'Il est vert vif et très dur',
          'Il est entièrement noir',
          'Il flotte dans l\'eau',
        ],
        correctIndex: 0,
      },
    },
    {
      id: 'local-mx-guac-2', lessonId: 'local', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'Pour éviter que le guacamole noircisse, on peut mettre ___ en contact direct avec la surface.',
      data: { answer: 'film alimentaire', hint: 'Ou un noyau d\'avocat selon la légende' },
    },
    {
      id: 'local-mx-guac-3', lessonId: 'local', orderIndex: 2, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le guacamole traditionnel mexicain se prépare dans quel ustensile ?',
      data: {
        options: ['Molcajete (mortier en basalte)', 'Mixeur électrique', 'Fouet', 'Robot coupe'],
        correctIndex: 0,
      },
    },
    {
      id: 'local-mx-guac-4', lessonId: 'local', orderIndex: 3, xpReward: 10,
      type: 'association',
      question: 'Associe chaque ingrédient à son rôle dans le guacamole :',
      data: {
        pairs: [
          { left: 'Citron vert', right: 'Acidité et antioxydation' },
          { left: 'Coriandre', right: 'Fraîcheur herbacée' },
          { left: 'Piment jalapeño', right: 'Chaleur et piquant' },
          { left: 'Oignon blanc', right: 'Croquant et piquant doux' },
        ],
      },
    },
  ],

};

// Fuzzy match: find exercises for a lesson by checking if the title matches a key
export function getLocalExercises(lessonTitle: string): Exercise[] | null {
  // Exact match
  if (STATIC_EXERCISES[lessonTitle]) return STATIC_EXERCISES[lessonTitle];

  // Partial match (case insensitive)
  const key = Object.keys(STATIC_EXERCISES).find(
    (k) => k.toLowerCase() === lessonTitle.toLowerCase() ||
           lessonTitle.toLowerCase().includes(k.toLowerCase().slice(0, 8))
  );
  return key ? STATIC_EXERCISES[key] : null;
}
