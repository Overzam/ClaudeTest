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

  // ── PASTRY ──────────────────────────────────────────────────────────────────

  'Macarons Parisiens': [
    {
      id: 'local-pa-macaron-1', lessonId: 'local', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quand le macaron parisien moderne a-t-il été créé et par qui ?',
      data: {
        options: [
          'En 1789 par Marie-Antoinette',
          'En 1930 par Pierre Desfontaines chez Ladurée',
          'En 1850 par Antonin Carême',
          'En 1960 par Pierre Hermé',
        ],
        correctIndex: 1,
      },
    },
    {
      id: 'local-pa-macaron-2', lessonId: 'local', orderIndex: 1, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le "macaronnage" consiste à…',
      data: {
        options: [
          'Fouetter les blancs en neige',
          'Plier délicatement la meringue dans la poudre pour obtenir un ruban',
          'Cuire les coques à la vapeur',
          'Mixer la poudre d\'amandes très finement',
        ],
        correctIndex: 1,
      },
    },
    {
      id: 'local-pa-macaron-3', lessonId: 'local', orderIndex: 2, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La petite collerette qui se forme à la base des coques pendant la cuisson s\'appelle la ___.',
      data: { answer: 'collerette', hint: 'Signe d\'une cuisson réussie' },
    },
    {
      id: 'local-pa-macaron-4', lessonId: 'local', orderIndex: 3, xpReward: 10,
      type: 'step_ordering',
      question: 'Remets les étapes des macarons dans l\'ordre :',
      data: {
        steps: [
          'Laisser croûter 30 min à température ambiante',
          'Macaronner (mélanger poudre + meringue)',
          'Monter les blancs en neige ferme',
          'Cuire 12 min à 150°C',
          'Pocher les coques sur plaque silicone',
        ],
        correctOrder: [2, 1, 4, 0, 3],
      },
    },
  ],

  // ── BBQ ─────────────────────────────────────────────────────────────────────

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
