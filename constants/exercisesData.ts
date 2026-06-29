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
      data: {
        left: ['Dashi', 'Miso', 'Tofu soyeux', 'Wakamé'],
        right: ['Algue marine', 'Base de bouillon', 'Pâte fermentée', 'Protéines douces'],
        correctPairs: [1, 3, 2, 0],
      },
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
      data: {
        left: ['Basilic frais', 'Pignons de pin', 'Pecorino + Parmesan', 'Huile d\'olive'],
        right: ['60-80 ml', '100g feuilles', '30g mélange', '2 cuillères à soupe'],
        correctPairs: [1, 3, 2, 0],
      },
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
      data: {
        left: ['Naan nature', 'Peshwari naan', 'Keema naan', 'Garlic naan'],
        right: ['Ail et coriandre', 'Noix de coco et raisins secs', 'Viande hachée épicée', 'Beurre (ghee) seul'],
        correctPairs: [3, 1, 2, 0],
      },
    },
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

  'Le Risotto': [
    {
      id: 'local-it-risotto-1', lessonId: 'local', orderIndex: 0, xpReward: 10,
      type: 'multiple_choice',
      question: 'Quel riz est indispensable pour un risotto crémeux ?',
      data: {
        options: ['Arborio, Carnaroli ou Vialone Nano', 'Riz basmati', 'Riz long grain', 'Riz à sushi'],
        correctIndex: 0,
      },
    },
    {
      id: 'local-it-risotto-2', lessonId: 'local', orderIndex: 1, xpReward: 10,
      type: 'fill_in_blank',
      question: 'La technique finale du risotto où on incorpore beurre froid et parmesan hors du feu s\'appelle la ___.',
      data: { answer: 'mantecatura', hint: 'Mot italien qui signifie crémer' },
    },
    {
      id: 'local-it-risotto-3', lessonId: 'local', orderIndex: 2, xpReward: 10,
      type: 'step_ordering',
      question: 'Remets les étapes du risotto dans l\'ordre :',
      data: {
        steps: ['Mantecatura : beurre + parmesan hors feu', 'Toaster le riz dans le soffritto 2 min', 'Déglacer au vin blanc', 'Ajouter le bouillon chaud louche par louche'],
        correctOrder: [1, 2, 3, 0],
      },
    },
    {
      id: 'local-it-risotto-4', lessonId: 'local', orderIndex: 3, xpReward: 10,
      type: 'multiple_choice',
      question: 'Le risotto alla Milanese est coloré et parfumé au…',
      data: {
        options: ['Safran', 'Curcuma', 'Curry', 'Paprika'],
        correctIndex: 0,
      },
    },
    {
      id: 'local-it-risotto-5', lessonId: 'local', orderIndex: 4, xpReward: 10,
      type: 'multiple_choice',
      question: 'La consistance idéale d\'un risotto servi dans l\'assiette s\'appelle "all\'onda" — qu\'est-ce que cela signifie ?',
      data: {
        options: ['Il doit couler légèrement comme une vague', 'Il doit être ferme et tenir en boule', 'Il doit être très sec', 'Il doit être collant'],
        correctIndex: 0,
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

  // ── MEXICAN (additional) ────────────────────────────────────────────────────

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
