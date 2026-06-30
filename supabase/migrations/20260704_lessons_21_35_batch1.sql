-- ============================================================
-- RecipeQuest — Batch 1 : Leçons 21→35
-- Parcours : Français, Italien, Japonais, Marocain
-- ============================================================

-- ============================================================
-- FRANÇAIS (21→35)
-- ============================================================
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward)
SELECT gen_random_uuid(), p.id, v.title, v.description, v.order_index, v.xp_reward
FROM (VALUES
  ('La Soupe à l''Oignon Gratinée','Caraméliser les oignons et gratiner avec comté et croûtons',21,45),
  ('Le Gratin Dauphinois','Pommes de terre, crème fraîche et ail fondus au four',22,40),
  ('Les Moules Marinières','Cuisson à la vapeur, sauce vin blanc et échalotes',23,35),
  ('Le Clafoutis aux Cerises','Flan aux cerises, tradition limousine sans dénoyauter',24,35),
  ('La Quiche Lorraine','Appareil œufs-crème sur pâte brisée croustillante',25,40),
  ('Le Cassoulet Toulousain','Haricots lingots, confit de canard et saucisse de Toulouse',26,65),
  ('Les Profiteroles','Choux, crème chantilly et sauce chocolat chaude',27,45),
  ('La Daube Provençale','Bœuf mijoté au vin rouge, olives et herbes de Provence',28,55),
  ('Le Soufflé au Chocolat','Béchamel chocolatée et blancs montés en neige ferme',29,65),
  ('La Tapenade Noire','Olives, anchois, câpres et huile d''olive au mortier',30,30),
  ('Les Escargots à la Bourguignonne','Beurre persillé à l''ail, cuisson au four en coquilles',31,40),
  ('La Crème Caramel','Caramel à sec et crème renversée au bain-marie',32,40),
  ('Le Kouign-Amann','Gâteau breton au beurre et sucre caramélisé en cuisson',33,55),
  ('La Flamiche aux Poireaux','Tarte flamande aux poireaux fondants à la crème',34,40),
  ('Le Saucisson Brioché Lyonnais','Brioche moelleuse autour d''un saucisson à cuire pistaché',35,50)
) AS v(title, description, order_index, xp_reward)
CROSS JOIN (SELECT id FROM public.paths WHERE slug='french' LIMIT 1) p
ON CONFLICT DO NOTHING;

-- ============================================================
-- ITALIEN (21→35)
-- ============================================================
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward)
SELECT gen_random_uuid(), p.id, v.title, v.description, v.order_index, v.xp_reward
FROM (VALUES
  ('La Bruschetta al Pomodoro','Pain grillé, tomates fraîches, basilic et ail frotté',21,25),
  ('Le Risotto ai Funghi Porcini','Cèpes séchés réhydratés, parmesan et beurre en fin de cuisson',22,50),
  ('La Pasta alla Norma','Pâtes siciliennes aux aubergines frites et ricotta salée',23,40),
  ('Le Tiramisù Classique','Mascarpone, savoiardi, café espresso et cacao amer',24,45),
  ('La Caponata Sicilienne','Légumes frits en sauce aigre-douce aux câpres et raisins',25,40),
  ('La Pasta e Fagioli','Soupe italienne épaisse de pâtes et haricots borlotti',26,40),
  ('La Stracciatella di Burrata','Crème intérieure de burrata effilochée à l''huile d''olive',27,35),
  ('Le Fritto Misto di Mare','Fruits de mer frits en tempura légère et citron',28,55),
  ('La Focaccia Pugliese','Focaccia des Pouilles, plus épaisse, avec tomates cerises',29,40),
  ('Le Supplì al Telefono','Boulettes de risotto frites, fromage qui file comme un téléphone',30,40),
  ('Le Panettone Maison','Brioche italienne aérée aux fruits confits et raisins secs',31,70),
  ('Les Grissini Turinois','Gressins fins et croustillants à l''huile d''olive',32,30),
  ('La Pasta Amatriciana','Guanciale, tomates, pecorino et piment — plat romain emblématique',33,45),
  ('Le Gelato al Pistacchio','Glace sicilienne à la pâte de pistache pure, sans baratte',34,55),
  ('Le Pandoro Véronais','Alternative au panettone, étoile en poudre de vanille',35,65)
) AS v(title, description, order_index, xp_reward)
CROSS JOIN (SELECT id FROM public.paths WHERE slug='italian' LIMIT 1) p
ON CONFLICT DO NOTHING;

-- ============================================================
-- JAPONAIS (21→35)
-- ============================================================
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward)
SELECT gen_random_uuid(), p.id, v.title, v.description, v.order_index, v.xp_reward
FROM (VALUES
  ('Le Dashi Maison','Infusion kombu à froid, puis bonite à 70°C, base de tout',21,40),
  ('Le Tamagoyaki','Omelette japonaise roulée sucrée-salée à la poêle carrée',22,35),
  ('La Tempura de Légumes','Pâte froide aux glaçons, huile fraîche et friture instantanée',23,45),
  ('Le Chawanmushi','Flan salé à la vapeur aux crevettes et champignons',24,50),
  ('Le Yakitori au Tare','Brochettes de poulet caramélisées à la sauce soja-mirin',25,40),
  ('Le Nikujaga','Ragout sucré-salé japonais de bœuf et pommes de terre',26,40),
  ('Le Soba Froid au Tsuyu','Nouilles de sarrasin froides et sauce dipping glacée',27,35),
  ('Le Dorayaki','Pancakes fourrés à la pâte de haricots rouges anko',28,35),
  ('Le Yaki Onigiri','Boulettes de riz grillées et nappées de sauce soja',29,30),
  ('La Soupe Tonjiru','Soupe miso de porc, daikon et légumes racines d''hiver',30,40),
  ('Le Katsu Sando','Sandwich japonais au porc pané et sauce tonkatsu',31,40),
  ('L''Omurice','Omelette moelleuse enroulée autour d''un riz sauté',32,40),
  ('La Salade Wakamé au Sésame','Algues réhydratées, sauce ponzu et graines de sésame',33,25),
  ('Le Matcha Latte Maison','Thé matcha en poudre, technique du chasen et lait moussé',34,30),
  ('Le Zōni Festif','Soupe de Nouvel An japonais aux mochi et légumes',35,45)
) AS v(title, description, order_index, xp_reward)
CROSS JOIN (SELECT id FROM public.paths WHERE slug='japanese' LIMIT 1) p
ON CONFLICT DO NOTHING;

-- ============================================================
-- MAROCAIN (21→35)
-- ============================================================
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward)
SELECT gen_random_uuid(), p.id, v.title, v.description, v.order_index, v.xp_reward
FROM (VALUES
  ('Les Keftas Grillées','Brochettes de viande hachée aux épices cuites sur braise',21,35),
  ('La Salade Taktouka','Poivrons et tomates grillés confits à l''huile d''olive',22,30),
  ('La Zaalouk d''Aubergines','Caviar d''aubergines marocain fumé à l''ail et cumin',23,35),
  ('Les Briouats au Fromage','Feuilles de brick farcies au fromage et herbes, frits',24,35),
  ('Le Tajine aux Pruneaux et Amandes','Agneau fondant en sauce sucrée-salée aux fruits secs',25,55),
  ('Les Chebakia','Gâteaux au sésame et miel en forme de fleur, parfumés',26,50),
  ('Les M''hanncha','Serpent de feuilles de brick aux amandes et eau de fleur',27,55),
  ('La Zaalouk de Courgettes','Version plus légère au citron confit et coriandre fraîche',28,30),
  ('Le Bastilla au Poulet (version accessible)','B''stilla simplifiée avec brick et poulet effiloché',29,60),
  ('Le Baghrir','Crêpes mille-trous à la semoule, beurre fondu et miel',30,35),
  ('Les Sfenj','Beignets marocains à la levure, croustillants et légers',31,35),
  ('La Salade de Carottes à la Chermoula','Carottes cuites aux épices et herbes fraîches',32,25),
  ('La Mrouzia','Agneau aux raisins de Corinthe, miel, ras el hanout et amandes',33,55),
  ('Le Couscous aux Sept Légumes','Version végétarienne complète aux légumes de saison',34,55),
  ('La Pastilla aux Fruits de Mer','Version moderne : gambas, crevettes et sauce crémeuse',35,65)
) AS v(title, description, order_index, xp_reward)
CROSS JOIN (SELECT id FROM public.paths WHERE slug='moroccan' LIMIT 1) p
ON CONFLICT DO NOTHING;


-- ============================================================
-- RECETTES — FRANÇAIS (21→35)
-- ============================================================
INSERT INTO public.recipes (id, lesson_id, title, description, emoji, prep_time_min, cook_time_min, servings, difficulty, avg_price_eur, ingredients, instructions, chef_tip, cultural_note)
SELECT gen_random_uuid(), l.id, v.title, v.description, v.emoji, v.prep_time_min::int, v.cook_time_min::int, v.servings::int, v.difficulty, v.avg_price_eur, v.ingredients::jsonb, v.instructions::jsonb, v.chef_tip, v.cultural_note
FROM (VALUES

('La Soupe à l''Oignon Gratinée',
 'Soupe à l''Oignon Gratinée au Comté', 'La soupe réconfortante par excellence : oignons fondants, bouillon riche et croûte gratinée.', '🧅', '15', '60', '4', 'moyen', '~8€',
 '[{"qty":"1kg","item":"oignons jaunes émincés finement"},{"qty":"50g","item":"beurre"},{"qty":"1 c.s.","item":"farine"},{"qty":"20cl","item":"vin blanc sec"},{"qty":"1.5L","item":"bouillon de bœuf"},{"qty":"8 tranches","item":"baguette rassis"},{"qty":"150g","item":"comté râpé"}]',
 '["Faites fondre le beurre dans une grande cocotte. Ajoutez les oignons et faites-les revenir à feu doux pendant 40 minutes en remuant souvent jusqu''à ce qu''ils soient très dorés et fondants.","Saupoudrez la farine, mélangez 2 minutes.","Déglacez avec le vin blanc, grattez le fond.","Versez le bouillon chaud, salez et poivrez. Laissez mijoter 15 minutes.","Répartissez la soupe dans des bols allant au four. Posez 2 tranches de baguette sur chaque bol.","Couvrez généreusement de comté râpé.","Passez sous le gril du four 3 à 5 minutes jusqu''à ce que le fromage soit fondu et doré."]',
 'Le secret d''une soupe à l''oignon réussie est la patience : il faut caraméliser les oignons pendant au moins 40 minutes à feu doux. Ils doivent fondre et prendre une couleur ambrée profonde avant d''ajouter le liquide.',
 'La soupe à l''oignon était historiquement la soupe des halles de Paris, consommée par les maraîchers et bouchers à 5h du matin après leur nuit de travail.'),

('Le Gratin Dauphinois',
 'Gratin Dauphinois Authentique', 'Fondant, crémeux et doré : le gratin de pommes de terre parfait.', '🥔', '20', '90', '6', 'facile', '~6€',
 '[{"qty":"1.2kg","item":"pommes de terre à chair ferme (Charlotte ou Bintje)"},{"qty":"50cl","item":"crème fraîche liquide entière"},{"qty":"25cl","item":"lait entier"},{"qty":"1 gousse","item":"ail"},{"qty":"Noix de muscade","item":"râpée"},{"qty":"30g","item":"beurre"}]',
 '["Frottez un plat à gratin avec la gousse d''ail coupée en deux, puis beurrez-le.","Épluchez et tranchez les pommes de terre en rondelles de 3mm (à la mandoline idéalement). Ne les lavez pas pour garder l''amidon.","Dans une casserole, faites chauffer la crème et le lait. Ajoutez les pommes de terre crues, la muscade, sel et poivre.","Portez à frémissement en remuant doucement pendant 10 min. Les pommes de terre commencent à cuire et la crème épaissit.","Versez dans le plat à gratin et étalez bien.","Enfournez à 180°C pendant 70 à 80 minutes. La surface doit être bien gratinée et la lame d''un couteau doit s''enfoncer sans résistance.","Laissez reposer 10 minutes avant de servir."]',
 'Ne lavez jamais les pommes de terre après les avoir tranchées : l''amidon de surface va naturellement lier la crème et donner cette texture onctueuse si caractéristique.',
 'Contrairement aux idées reçues, le vrai gratin dauphinois n''a PAS de fromage : le gratin vient de la caramélisation naturelle de la crème en surface.'),

('Les Moules Marinières',
 'Moules Marinières Classiques', 'Un kilo de moules fraîches, deux minutes de cuisson, un festival d''iode.', '🦪', '15', '10', '2', 'facile', '~8€',
 '[{"qty":"2kg","item":"moules de bouchot fraîches"},{"qty":"3","item":"échalotes émincées"},{"qty":"2 gousses","item":"ail écrasées"},{"qty":"25cl","item":"vin blanc sec"},{"qty":"50g","item":"beurre"},{"qty":"1 bouquet","item":"de persil plat"},{"qty":"1 c.s.","item":"crème fraîche (optionnel)"}]',
 '["Grattez et ébarbez les moules. Jetez celles qui sont ouvertes et qui ne se referment pas au toucher.","Dans une grande cocotte, faites fondre le beurre. Faites revenir les échalotes et l''ail 2 minutes.","Versez le vin blanc. Portez à ébullition.","Jetez les moules d''un coup. Couvrez immédiatement.","Faites cuire à feu très vif en secouant la cocotte de temps en temps pendant 3 à 5 minutes.","Dès que les moules sont toutes ouvertes, c''est prêt.","Ajoutez le persil haché et la crème si désiré. Servez avec des frites ou du pain."]',
 'Jetez immédiatement toute moule qui reste fermée après cuisson. Et à l''inverse, jetez toute moule ouverte qui ne se referme pas AVANT la cuisson : ce sont les deux règles de sécurité absolues.',
 'La moule de bouchot (élevée sur des pieux en bois fichés dans la mer) est la plus répandue en France. Le terme "marinière" désigne simplement une cuisson au vin blanc avec des aromates.'),

('Le Clafoutis aux Cerises',
 'Clafoutis aux Cerises Authentique', 'Moelleux comme un flan, parfumé par les noyaux des cerises.', '🍒', '10', '45', '6', 'facile', '~5€',
 '[{"qty":"600g","item":"cerises fraîches (non dénoyautées !)"},{"qty":"3","item":"œufs"},{"qty":"100g","item":"sucre"},{"qty":"60g","item":"farine"},{"qty":"25cl","item":"lait entier"},{"qty":"10cl","item":"crème fraîche"},{"qty":"1 sachet","item":"sucre vanillé"},{"qty":"Beurre","item":"pour le plat"}]',
 '["Préchauffez le four à 180°C. Beurrez un plat à gratin.","Lavez et équeutez les cerises. NE LES DÉNOYAUTEZ PAS.","Dans un saladier, fouettez les œufs, le sucre et la vanille jusqu''à ce que le mélange blanchisse.","Incorporez la farine, puis le lait et la crème progressivement.","Répartissez les cerises dans le plat beurré.","Versez l''appareil par-dessus.","Enfournez 40 à 45 minutes. Le clafoutis doit être gonflé et doré. Il se dégonfle en refroidissant, c''est normal.","Saupoudrez de sucre glace. Servez tiède ou froid."]',
 'Les noyaux sont essentiels ! Pendant la cuisson, ils libèrent un léger parfum d''amande qui fait toute la magie du clafoutis. C''est le secret que les grands-mères gardaient jalousement.',
 'Le clafoutis est originaire du Limousin. Le terme viendrait du verbe occitan "clafir" qui signifie "garnir" ou "remplir". Le vrai clafoutis est toujours aux cerises noires.'),

('La Quiche Lorraine',
 'Quiche Lorraine Authentique', 'L''emblème de la cuisine lorraine : lardons fumés, appareil crème-œufs sur pâte croustillante.', '🥧', '20', '40', '6', 'moyen', '~7€',
 '[{"qty":"1","item":"pâte brisée pur beurre"},{"qty":"200g","item":"lardons fumés"},{"qty":"3","item":"œufs entiers + 1 jaune"},{"qty":"30cl","item":"crème fraîche épaisse"},{"qty":"10cl","item":"lait entier"},{"qty":"Noix de muscade","item":"fraîchement râpée"}]',
 '["Foncez votre moule à tarte avec la pâte brisée, piquez le fond avec une fourchette.","Faites précuire la pâte à blanc à 180°C pendant 15 minutes (avec des billes de cuisson).","Faites revenir les lardons à sec dans une poêle jusqu''à ce qu''ils soient dorés. Égouttez sur du papier absorbant.","Fouettez ensemble les œufs, le jaune, la crème et le lait. Assaisonnez de sel, poivre et muscade.","Répartissez les lardons sur le fond de tarte précuit.","Versez l''appareil crème-œufs par-dessus.","Enfournez à 180°C pendant 30 à 35 minutes. La quiche doit être légèrement tremblotante au centre à la sortie du four (elle finit de cuire sur la plaque)."]',
 'La quiche ne doit pas avoir une surface dorée et dure : elle doit sortir du four encore légèrement tremblotante au centre. Elle va se solidifier en refroidissant et restera crémeuse à cœur.',
 'La vraie quiche lorraine n''a pas de fromage ! Le fromage, c''est la version alsacienne. Et pas d''oignons non plus — c''est une erreur très répandue. Uniquement des lardons, crème et œufs.'),

('Le Cassoulet Toulousain',
 'Cassoulet de Toulouse Simplifié', 'Le plat emblématique du Sud-Ouest : haricots, confit de canard et saucisse.', '🫘', '30', '150', '6', 'difficile', '~20€',
 '[{"qty":"500g","item":"haricots lingots secs (trempés 12h la veille)"},{"qty":"2","item":"cuisses de confit de canard"},{"qty":"300g","item":"saucisse de Toulouse"},{"qty":"200g","item":"couenne de porc"},{"qty":"1","item":"oignon et 4 gousses d''ail"},{"qty":"400g","item":"tomates concassées"},{"qty":"Bouquet garni","item":"thym, laurier, persil"}]',
 '["Faites cuire les haricots égouttés dans de l''eau fraîche avec le bouquet garni et la couenne pendant 1h. Ils doivent être presque cuits mais encore fermes.","Faites dorer les cuisses de confit (côté peau) dans leur graisse dans une cocotte. Réservez.","Faites revenir l''oignon et l''ail dans la même cocotte. Ajoutez les tomates.","Ajoutez les haricots égouttés et le bouillon de cuisson (gardez-le !). Posez le confit et la saucisse coupée en tronçons.","Versez du bouillon jusqu''à couvrir. Enfournez à 160°C pendant 2 heures.","Formez une croûte en surface en appuyant dessus avec le dos d''une cuillère et en enfournant à 200°C pendant 15 minutes. Répétez 3 fois.","La croûte qui se reforme doit être rompue et enfoncée 3 fois : c''est le secret du cassoulet."]',
 'La règle d''or du cassoulet : rompre et enfoncer la croûte exactement 3 fois pendant la cuisson au four. Cette étape fait descendre les sucs dans les haricots et crée les couches de saveurs.',
 'Le cassoulet doit son nom à la cassole, le plat en terre cuite de Issel (Aude) dans lequel il est traditionnellement cuit. La bataille entre Castelnaudary, Carcassonne et Toulouse pour sa paternité est légendaire.'),

('Les Profiteroles',
 'Profiteroles Sauce Chocolat Chaud', 'Des choux légers, crème chantilly et une cascade de chocolat fondu.', '🍫', '30', '30', '6', 'moyen', '~6€',
 '[{"qty":"Pâte à choux:","item":""},{"qty":"125ml","item":"eau + 125ml lait"},{"qty":"100g","item":"beurre"},{"qty":"150g","item":"farine"},{"qty":"4","item":"œufs"},{"qty":"Garniture:","item":""},{"qty":"30cl","item":"crème liquide entière (très froide)"},{"qty":"30g","item":"sucre glace"},{"qty":"200g","item":"chocolat noir 70%"},{"qty":"10cl","item":"crème"}]',
 '["Portez à ébullition l''eau, le lait, le beurre et le sel. Hors du feu, versez la farine en une fois et mélangez vigoureusement jusqu''à dessécher la pâte (elle doit se détacher des parois).","Incorporez les œufs un par un jusqu''à obtenir une pâte lisse et brillante qui forme un ruban.","Pochezdes petits choux sur une plaque. Dorez à l''œuf. Enfournez à 200°C pendant 25 min SANS OUVRIR le four.","Laissez refroidir complètement sur une grille.","Montez la crème en chantilly avec le sucre glace. Percez chaque chou par le dessous et garnissez de chantilly à la poche.","Faites fondre le chocolat avec la crème chaude pour la sauce.","Servez les choux glacés nappés de sauce chocolat chaude."]',
 'La règle d''or des choux : n''ouvrez JAMAIS le four pendant la cuisson. La vapeur emprisonnée est ce qui fait gonfler les choux. Si vous ouvrez, ils s''effondrent immédiatement.',
 'Le profiterole viendrait du mot "profit" — un petit avantage, un petit extra. Ces choux étaient distribués aux domestiques comme pourboire après les grands banquets de la cour de France.'),

('La Daube Provençale',
 'Daube de Bœuf Provençale', 'Bœuf fondant mijoté au vin rouge avec olives et herbes du maquis.', '🫕', '30', '180', '6', 'moyen', '~20€',
 '[{"qty":"1.2kg","item":"joue ou paleron de bœuf en gros cubes"},{"qty":"75cl","item":"vin rouge (côtes du Rhône)"},{"qty":"200g","item":"olives noires dénoyautées"},{"qty":"200g","item":"lardons"},{"qty":"1","item":"orange (zeste)"},{"qty":"4","item":"carottes en tronçons"},{"qty":"Herbes:","item":"thym, laurier, romarin"},{"qty":"2 c.s.","item":"concentré de tomate"}]',
 '["La veille idéalement : mettez le bœuf dans un saladier, couvrez de vin avec les herbes, les carottes et le zeste d''orange. Laissez mariner 12h au frigo.","Le jour J : égouttez la viande. Filtrez la marinade et réservez-la.","Faites dorer les lardons et la viande en plusieurs fois dans de l''huile d''olive dans une cocotte en fonte.","Remettez tout dans la cocotte. Versez la marinade filtrée, ajoutez le concentré de tomate.","Couvrez et enfournez à 150°C pendant 3 heures. La viande doit se défaire à la fourchette.","30 minutes avant la fin, ajoutez les olives.","Servez avec des pâtes fraîches ou de la polenta."]',
 'La marinade est l''âme de la daube. L''acidité du vin décompose les fibres du bœuf sur 12h, ce qui permet une cuisson plus courte et une viande plus tendre qu''une simple braise sans marinade.',
 'La daube tient son nom de la daubière, cocotte à couvercle creux où l''on mettait de la braise sur le dessus pour que la chaleur vienne de partout. Elle symbolise la cuisine lente provençale.'),

('Le Soufflé au Chocolat',
 'Soufflé au Chocolat de Restaurant', 'La star des desserts : croûte légèrement croquante, cœur coulant et aérien.', '🍫', '25', '12', '4', 'difficile', '~6€',
 '[{"qty":"200g","item":"chocolat noir 70%"},{"qty":"6","item":"œufs (blancs et jaunes séparés)"},{"qty":"80g","item":"sucre"},{"qty":"40g","item":"beurre + extra pour les moules"},{"qty":"2 c.s.","item":"sucre glace pour chemiser les moules"}]',
 '["Préchauffez le four à 200°C. Beurrez généreusement 4 ramequins et saupoudrez de sucre glace (tapotez pour enlever l''excès).","Faites fondre le chocolat et le beurre au bain-marie. Laissez tiédir.","Séparez les blancs des jaunes. Fouettez les jaunes avec 40g de sucre jusqu''à blanchiment. Incorporez au chocolat.","Montez les blancs en neige avec une pincée de sel. Quand ils sont mousseux, ajoutez progressivement les 40g de sucre restants. Continuez jusqu''à obtenir une neige ferme et brillante.","Incorporez 1/3 des blancs au chocolat vigoureusement pour détendre. Puis incorporez le reste délicatement à la maryse (mouvements de bas en haut).","Remplissez les ramequins à ras bord. Passez le pouce sur le bord pour créer un petit sillon (cela aide le soufflé à monter droit).","Enfournez immédiatement : 10-12 minutes SANS OUVRIR LE FOUR. Servez en courant !"]',
 'Le sillon passé au pouce sur le bord du ramequin n''est pas une légende : il force le soufflé à monter droit vers le haut plutôt que de pencher. Passez aussi le pouce sur 1cm de hauteur de moule.',
 'Le soufflé a été inventé par le grand chef français Vincent La Chapelle vers 1742. Son nom vient du verbe "souffler" — la technique de monter des blancs en neige pour alléger un appareil.'),

('La Tapenade Noire',
 'Tapenade Noire Provençale', 'La tartinade soleil : olives noires, anchois et câpres au mortier.', '🫒', '10', '0', '6', 'facile', '~5€',
 '[{"qty":"200g","item":"olives noires (type Nyons ou taggiasche, dénoyautées)"},{"qty":"4","item":"filets d''anchois à l''huile"},{"qty":"2 c.s.","item":"câpres rincées et égouttées"},{"qty":"1 gousse","item":"ail"},{"qty":"1 c.s.","item":"jus de citron"},{"qty":"4 c.s.","item":"huile d''olive extra vierge de Provence"},{"qty":"Thym frais","item":"quelques brins"}]',
 '["Au mortier (méthode traditionnelle) ou au mixeur : placez les olives, les anchois, les câpres et l''ail.","Écrasez ou mixez par impulsions courtes — la tapenade ne doit pas être une purée lisse mais garder de la texture.","Ajoutez le jus de citron et les feuilles de thym.","Versez l''huile d''olive en filet en mélangeant pour obtenir une pâte qui s''étale bien.","Goûtez avant de saler — les anchois et câpres sont déjà très salés.","Servez sur des tranches de pain grillé, avec des crudités ou pour garnir des feuilletés."]',
 'Le mot "tapenade" vient du provençal "tapeno" qui signifie câpres — et non pas olives ! Les câpres en sont l''ingrédient historiquement central, même si les olives dominent aujourd''hui.',
 'La tapenade est un condiment provençal dont la recette a été codifiée en 1880 par le chef Meynier du restaurant La Maison Dorée à Marseille, bien qu''elle existât bien avant dans les cuisines paysannes.'),

('Les Escargots à la Bourguignonne',
 'Escargots au Beurre Persillé', 'Le classique absolu de la gastronomie bourguignonne : beurre d''ail fondant dans les coquilles.', '🐌', '20', '10', '4', 'facile', '~10€',
 '[{"qty":"48","item":"escargots en boîte (égouttés et rincés)"},{"qty":"200g","item":"beurre mou"},{"qty":"4 gousses","item":"ail très finement hachées"},{"qty":"1 bouquet","item":"persil plat haché très finement"},{"qty":"2","item":"échalotes hachées"},{"qty":"Sel, poivre","item":""}]',
 '["Préparez le beurre d''escargot : mélangez à la fourchette le beurre mou, l''ail, les échalotes, le persil, le sel et le poivre.","Mettez une petite noisette de beurre au fond de chaque coquille.","Placez un escargot dans chaque coquille.","Fermez avec une généreuse noix de beurre persillé.","Disposez les escargots dans un plat à escargots (ou sur du gros sel pour les maintenir stables).","Enfournez à 220°C pendant 8 à 10 minutes, jusqu''à ce que le beurre soit fondu et légèrement doré, et les escargots bien chauds.","Servez immédiatement avec du pain de campagne pour saucer."]',
 'La qualité du beurre est primordiale. Utilisez un beurre AOP (Charentes-Poitou idéalement) et n''hésitez pas sur les quantités : le beurre fondu qui surnage est ce que tout le monde veut saucer avec le pain.',
 'Les Romains consommaient déjà les escargots engraissés au lait. En Bourgogne, la tradition est vivace depuis le Moyen-Âge. Les vignerons les ramassaient après les pluies dans les vignes.'),

('La Crème Caramel',
 'Crème Caramel Maison', 'Caramel ambré inversé sur une crème de flan dorée et soyeuse.', '🍮', '20', '50', '6', 'moyen', '~4€',
 '[{"qty":"Caramel:","item":""},{"qty":"150g","item":"sucre"},{"qty":"3 c.s.","item":"eau"},{"qty":"Crème:","item":""},{"qty":"50cl","item":"lait entier"},{"qty":"4","item":"œufs entiers + 2 jaunes"},{"qty":"100g","item":"sucre"},{"qty":"1","item":"gousse de vanille"}]',
 '["Faites le caramel : versez le sucre et l''eau dans une casserole. Chauffez à feu moyen SANS REMUER jusqu''à obtenir un caramel ambré.","Versez rapidement le caramel dans 6 ramequins en inclinant pour couvrir le fond. Attention aux éclaboussures !","Faites chauffer le lait avec la vanille grattée. Laissez infuser 10 minutes.","Fouettez les œufs, jaunes et sucre sans faire mousser. Versez le lait tiède progressivement.","Filtrez l''appareil pour enlever les impuretés. Répartissez dans les ramequins.","Posez les ramequins dans un plat à four. Versez de l''eau chaude à mi-hauteur (bain-marie).","Enfournez à 160°C pendant 40 à 45 minutes. La crème doit trembler légèrement au centre. Laissez refroidir puis réfrigérez minimum 4h avant de démouler."]',
 'La crème doit être filtrée après avoir mélangé les œufs et le lait pour enlever les germes et les chalazes (petits filaments blancs) qui formeraient des grumeaux à la cuisson.',
 'La crème caramel est en réalité d''origine espagnole (flan) et portugaise (pudim), importée en France aux XVIIe et XVIIIe siècles. Elle est aujourd''hui universellement adoptée comme un dessert français classique.'),

('Le Kouign-Amann',
 'Kouign-Amann Breton Caramélisé', 'Le gâteau breton layéré : croustillant, beurré et caramélisé en surface.', '🧈', '30', '45', '8', 'difficile', '~4€',
 '[{"qty":"300g","item":"farine"},{"qty":"10g","item":"levure de boulanger fraîche"},{"qty":"18cl","item":"eau tiède"},{"qty":"5g","item":"sel"},{"qty":"200g","item":"beurre salé breton (bien froid, en fines lamelles)"},{"qty":"150g","item":"sucre"}]',
 '["Faites une pâte à pain : mélangez farine, levure, eau et sel. Pétrissez 10 min. Laissez lever 1h.","Étalez la pâte en rectangle sur un plan fariné. Déposez les lamelles de beurre froid sur les 2/3 de la surface.","Repliez la pâte en trois (comme une lettre). Tournez de 90°. Étalez à nouveau. Répétez 2 fois (tourage rapide).","Étalez la pâte en rond. Saupoudrez généreusement de sucre.","Pliez à nouveau une fois et étalez pour que le sucre soit incorporé.","Placez dans un moule beurré. Le sucre va sortir sur les côtés — c''est normal et c''est ce qui caramélise.","Enfournez à 200°C pendant 40 à 45 min. La surface doit être intensément caramélisée et croustillante.","Démoulez CHAUD sur une grille. Si vous attendez, le caramel colle au moule."]',
 'Démoulez TOUJOURS le kouign-amann immédiatement à la sortie du four. Le caramel se solidifie en refroidissant et collera définitivement au moule si vous attendez.',
 'Kouign-Amann signifie "gâteau au beurre" en breton. Il a été créé en 1860 par Yves-René Scordia, boulanger de Douarnenez, qui manquant d''ingrédients, incorpora maladroitement du beurre et du sucre à une pâte à pain.'),

('La Flamiche aux Poireaux',
 'Flamiche aux Poireaux Flamande', 'Tarte nordiste aux poireaux fondants et à la crème, cousine de la quiche.', '🥧', '25', '55', '6', 'moyen', '~7€',
 '[{"qty":"1","item":"pâte brisée pur beurre"},{"qty":"1kg","item":"poireaux (blanc et vert tendre)"},{"qty":"50g","item":"beurre"},{"qty":"20cl","item":"crème fraîche épaisse"},{"qty":"3","item":"œufs"},{"qty":"100g","item":"maroilles ou fromage fort (optionnel)"}]',
 '["Émincez les poireaux en rondelles. Faites-les fondre dans le beurre à feu doux pendant 20 minutes. Ils doivent être très fondants. Assaisonnez.","Préchauffez le four à 180°C. Foncez un moule à tarte avec la pâte. Précuisez à blanc 15 min.","Fouettez ensemble les œufs et la crème. Ajoutez les poireaux refroidis.","Si vous utilisez du fromage, émiettez-le sur le fond de tarte.","Versez l''appareil poireaux-crème.","Enfournez 35 à 40 minutes, jusqu''à ce que la tarte soit dorée et l''appareil pris.","Laissez tiédir 10 min avant de servir."]',
 'Les poireaux doivent être parfaitement fondants avant d''aller dans la tarte. S''ils gardent de la mâche, ils vont rendre de l''eau pendant la cuisson et détremper la pâte.',
 'La flamiche est typique de la Picardie, de l''Artois et du Nord-Pas-de-Calais. Elle se distingue de la quiche par sa tradition d''utiliser des légumes locaux et parfois du maroilles, fromage fort du Nord.'),

('Le Saucisson Brioché Lyonnais',
 'Saucisson Brioché à la Lyonnaise', 'La star des bouchons lyonnais : brioche moelleuse autour d''un saucisson pistaché.', '🥖', '30', '40', '8', 'difficile', '~12€',
 '[{"qty":"1","item":"saucisson à cuire pistaché (type saucisson de Lyon)"},{"qty":"Pâte à brioche:","item":""},{"qty":"250g","item":"farine"},{"qty":"10g","item":"levure fraîche"},{"qty":"3","item":"œufs"},{"qty":"30g","item":"sucre"},{"qty":"5g","item":"sel"},{"qty":"125g","item":"beurre mou"}]',
 '["La veille : préparez la brioche. Mélangez farine, levure, sucre, sel et œufs. Pétrissez 10 min. Incorporez le beurre en morceaux. Pétrissez jusqu''à ce que la pâte soit lisse. Laissez pousser 2h, puis au frigo toute la nuit.","Le jour J : faites pocher le saucisson 20 min dans de l''eau frémissante (non bouillante). Laissez refroidir et épluchez-le.","Étalez la brioche froide en rectangle. Posez le saucisson au centre.","Enroulez la brioche autour du saucisson. Soudez bien les bords.","Posez dans un moule à cake beurré, soudure en dessous. Laissez lever 1h.","Dorez à l''œuf. Enfournez à 180°C pendant 35 à 40 min.","Laissez tiédir avant de trancher. Servez avec de la moutarde à l''ancienne."]',
 'La clé est de bien souder les bords de la brioche autour du saucisson. Si elles s''ouvrent en cuisant, le gras du saucisson va s''échapper dans le four. Mouillez légèrement les bords avant de les souder.',
 'Le saucisson brioché est l''emblème des bouchons lyonnais. On le déguste en entrée avec de la moutarde. Lyon, capitale de la gastronomie française, compte encore aujourd''hui des dizaines de bouchons où il figure à la carte.')

) AS v(lesson_title, title, description, emoji, prep_time_min, cook_time_min, servings, difficulty, avg_price_eur, ingredients, instructions, chef_tip, cultural_note)
JOIN public.lessons l ON l.title = v.lesson_title
ON CONFLICT (lesson_id) DO NOTHING;


-- ============================================================
-- RECETTES — ITALIEN (21→35)
-- ============================================================
INSERT INTO public.recipes (id, lesson_id, title, description, emoji, prep_time_min, cook_time_min, servings, difficulty, avg_price_eur, ingredients, instructions, chef_tip, cultural_note)
SELECT gen_random_uuid(), l.id, v.title, v.description, v.emoji, v.prep_time_min::int, v.cook_time_min::int, v.servings::int, v.difficulty, v.avg_price_eur, v.ingredients::jsonb, v.instructions::jsonb, v.chef_tip, v.cultural_note
FROM (VALUES

('La Bruschetta al Pomodoro',
 'Bruschetta al Pomodoro', 'Pain grillé frotté à l''ail, tomates fraîches, basilic et huile d''olive premium.', '🍅', '10', '5', '4', 'facile', '~4€',
 '[{"qty":"8 tranches","item":"pain de campagne (ou ciabatta)"},{"qty":"4","item":"tomates bien mûres"},{"qty":"2 gousses","item":"ail"},{"qty":"1 bouquet","item":"basilic frais"},{"qty":"6 c.s.","item":"huile d''olive extra vierge de qualité"},{"qty":"Sel de mer","item":"en flocons"}]',
 '["Faites griller les tranches de pain (au four, sur un grill ou au grille-pain). Elles doivent être bien dorées et croquantes.","Frottez immédiatement chaque tranche avec une demi-gousse d''ail crue. Le pain chaud râpe l''ail comme une râpe.","Coupez les tomates en dés. Assaisonnez avec sel, poivre et la moitié de l''huile. Laissez reposer 5 minutes.","Déposez les tomates sur le pain.","Ajoutez les feuilles de basilic déchirées à la main (ne les coupez jamais au couteau).","Arrosez d''un généreux filet d''huile d''olive crue.","Servez immédiatement, la bruschetta n''attend pas."]',
 'L''huile d''olive est l''élément clé de la bruschetta. Une huile de qualité médiocre ruinera la recette. Choisissez une huile italienne extra vierge de première pression, fruitée et piquante.',
 'La bruschetta vient du verbe romain "bruscare" (griller sur des braises). Elle était le repas des paysans de Rome et du Latium qui faisaient griller leur pain rassis sur les braises.'),

('Le Risotto ai Funghi Porcini',
 'Risotto aux Cèpes Séchés', 'Risotto crémeux et parfumé aux cèpes réhydratés, fond de leur eau de trempage.', '🍄', '15', '30', '4', 'moyen', '~12€',
 '[{"qty":"30g","item":"cèpes séchés"},{"qty":"320g","item":"riz carnaroli ou arborio"},{"qty":"1","item":"oignon jaune haché très fin"},{"qty":"20cl","item":"vin blanc"},{"qty":"1.2L","item":"bouillon de légumes chaud"},{"qty":"80g","item":"parmesan râpé"},{"qty":"60g","item":"beurre froid"},{"qty":"4 c.s.","item":"huile d''olive"}]',
 '["Réhydratez les cèpes dans 30cl d''eau chaude pendant 20 min. Égouttez en conservant précieusement l''eau de trempage. Hachez grossièrement les cèpes.","Filtrez l''eau de trempage à travers un filtre à café. Ajoutez-la au bouillon.","Dans une sauteuse large, faites fondre l''oignon dans l''huile à feu doux (soffritto).","Ajoutez les cèpes hachés, faites revenir 2 min.","Ajoutez le riz, faites-le nacrer 2 min en remuant (les grains deviennent translucides sur les bords).","Déglacez avec le vin blanc, mélangez jusqu''à absorption.","Ajoutez le bouillon louche par louche en remuant constamment. Attendez toujours que le liquide soit absorbé avant d''en rajouter. Comptez environ 18 min.","Hors du feu : incorporez le beurre froid en dés et le parmesan (mantecatura). Couvrez 2 min avant de servir."]',
 'L''eau de trempage des cèpes est un trésor — ne la jetez jamais. Elle concentre toute la saveur umami des champignons. C''est elle qui donnera la profondeur inégalable de votre risotto.',
 'Carnaroli est la variété de riz préférée des chefs italiens pour le risotto car il libère plus d''amidon que l''arborio (ce qui donne la texture crémeuse) tout en gardant une texture al dente.'),

('Le Tiramisù Classique',
 'Tiramisù Authentique à la Tasse', 'Mascarpone soyeux, savoiardi imbibés de café, cacao amer : le dessert star de l''Italie.', '☕', '30', '0', '6', 'moyen', '~8€',
 '[{"qty":"500g","item":"mascarpone"},{"qty":"4","item":"œufs (blancs et jaunes séparés)"},{"qty":"100g","item":"sucre"},{"qty":"250ml","item":"café espresso fort refroidi"},{"qty":"3 c.s.","item":"marsala ou rhum (optionnel)"},{"qty":"24","item":"biscuits savoiardi (boudoirs)"},{"qty":"Cacao amer","item":"en poudre non sucré"}]',
 '["Fouettez les jaunes d''œufs avec le sucre jusqu''à ce que le mélange blanchisse et soit très mousseux (ruban).","Incorporez le mascarpone au fouet jusqu''à obtenir une crème lisse.","Montez les blancs en neige ferme. Incorporez-les délicatement à la crème mascarpone.","Mélangez le café et le marsala dans un bol. Trempez rapidement chaque boudoir (1 seconde maximum de chaque côté).","Disposez une couche de boudoirs dans le fond du plat.","Couvrez d''une couche de crème mascarpone.","Recommencez : boudoirs imbibés, crème.","Terminez par la crème. Saupoudrez généreusement de cacao tamisé.","Réfrigérez minimum 6 heures (idéalement 24h)."]',
 'Le secret du tiramisù : les savoiardi doivent être trempés TRÈS rapidement — 1 seconde par côté. S''ils sont trop imbibés, ils se désintègrent et votre dessert sera une bouillie.',
 'Le tiramisù a été créé dans les années 1960 au restaurant "Le Beccherie" à Trévise (Vénétie). Son nom signifie "remonte-moi le moral" ou "tire-moi vers le haut" en vénitien.'),

('La Caponata Sicilienne',
 'Caponata di Melanzane', 'Légumes frits en sauce aigre-douce aux câpres, olives et raisins secs.', '🍆', '30', '30', '6', 'moyen', '~8€',
 '[{"qty":"2","item":"grosses aubergines en dés"},{"qty":"3","item":"branches de céleri"},{"qty":"1","item":"oignon rouge"},{"qty":"100g","item":"olives vertes dénoyautées"},{"qty":"2 c.s.","item":"câpres"},{"qty":"2 c.s.","item":"raisins secs"},{"qty":"400g","item":"tomates concassées"},{"qty":"4 c.s.","item":"vinaigre de vin rouge"},{"qty":"2 c.s.","item":"sucre"}]',
 '["Faites dégorger les aubergines avec du sel pendant 30 min. Rincez et séchez bien.","Faites frire les aubergines en plusieurs fois dans l''huile d''olive à 180°C. Égouttez.","Dans la même poêle (avec moins d''huile), faites revenir l''oignon et le céleri.","Ajoutez les tomates, les olives, les câpres et les raisins secs.","Préparez le agrodolce : dissolvez le sucre dans le vinaigre. Versez dans la poêle.","Laissez mijoter 15 min à feu doux.","Incorporez les aubergines frites. Mélangez délicatement.","Laissez refroidir. La caponata se mange FROIDE et est meilleure le lendemain."]',
 'La caponata est meilleure le lendemain : les saveurs aigres-douces ont le temps de se mélanger et de s''équilibrer. Préparez-la toujours 24h à l''avance.',
 'La caponata est typique de Palerme, Sicile. Elle témoigne des influences arabes sur la cuisine sicilienne : le sucre et le vinaigre ensemble (agrodolce) viennent directement de la cuisine arabe médiévale.'),

('La Pasta e Fagioli',
 'Pasta e Fagioli Napolitaine', 'La soupe paysanne italienne ultime : pâtes et haricots dans un bouillon concentré.', '🍲', '20', '45', '4', 'facile', '~5€',
 '[{"qty":"1 boîte","item":"(400g) de haricots borlotti (ou cannellini)"},{"qty":"150g","item":"macaroni ou ditalini"},{"qty":"1","item":"oignon, 2 gousses d''ail, 2 branches de céleri"},{"qty":"400g","item":"tomates concassées"},{"qty":"1L","item":"bouillon de légumes"},{"qty":"Parmesan","item":"croûte (si disponible)"},{"qty":"Romarin","item":"frais"}]',
 '["Faites revenir l''oignon, l''ail et le céleri dans l''huile d''olive 5 min.","Ajoutez les tomates, les haricots égouttés et le bouillon.","Si vous avez une croûte de parmesan, jetez-la dans la soupe — elle fond et enrichit incroyablement le bouillon.","Laissez mijoter 20 min. Prélevez 1/3 des haricots et mixez-les, puis remettez dans la soupe pour l''épaissir.","Ajoutez les pâtes crues dans la soupe. Faites-les cuire directement dedans.","En fin de cuisson, ajoutez le romarin haché et un généreux filet d''huile d''olive crue.","Servez avec du parmesan râpé."]',
 'La croûte de parmesan dans la soupe est le secret des nonnes italiennes. Elle fond lentement en libérant umami et fromage dans le bouillon, donnant une profondeur de goût incomparable.',
 'Pasta e fagioli est le plat de la cucina povera par excellence. Chaque région d''Italie a sa version : avec des haricots borlotti à Naples, des cannellini en Toscane, des haricots noirs en Vénétie.'),

('La Pasta Amatriciana',
 'Bucatini all''Amatriciana', 'La sauce romaine au guanciale : tomates, porc séché et pecorino.', '🍝', '10', '25', '4', 'moyen', '~10€',
 '[{"qty":"400g","item":"bucatini (ou spaghetti)"},{"qty":"200g","item":"guanciale (ou pancetta en remplacement)"},{"qty":"400g","item":"tomates concassées ou pelées en boîte"},{"qty":"1 piment","item":"peperoncino séché"},{"qty":"100g","item":"pecorino romano râpé"},{"qty":"10cl","item":"vin blanc sec"}]',
 '["Coupez le guanciale en lardons épais. Faites-le revenir dans une poêle SANS matière grasse à feu moyen jusqu''à ce qu''il soit doré et légèrement croustillant.","Retirez le guanciale. Dans la graisse rendue, faites revenir le piment 1 minute.","Déglacez avec le vin blanc.","Ajoutez les tomates. Salez légèrement (le pecorino est très salé). Laissez réduire 15 min.","Remettez le guanciale dans la sauce.","Faites cuire les bucatini al dente dans l''eau bien salée.","Égouttez en conservant un verre d''eau de cuisson. Versez les pâtes dans la sauce.","Hors du feu, ajoutez la moitié du pecorino et un peu d''eau de cuisson pour lier. Servez avec le reste du pecorino."]',
 'La règle d''Amatrice : guanciale UNIQUEMENT (joue de porc), pas de pancetta ni de lardons. Et pecorino uniquement, jamais de parmesan. Ces deux substitutions transforment le plat en quelque chose d''autre.',
 'L''Amatriciana vient d''Amatrice, petite ville du Latium. Le plat original (gricia) n''avait pas de tomates. La tomate fut ajoutée au XVIIIe siècle après son introduction en Europe.'),

('Le Gelato al Pistacchio',
 'Gelato al Pistacchio Sicilien', 'Glace à la pâte de pistache pure, sans baratte, crémeux et intense.', '🍦', '20', '5', '6', 'moyen', '~8€',
 '[{"qty":"150g","item":"pâte de pistache (100% pistache, sans sucre ni huile de palme)"},{"qty":"500ml","item":"lait entier"},{"qty":"200ml","item":"crème entière"},{"qty":"150g","item":"sucre"},{"qty":"4","item":"jaunes d''œufs"}]',
 '["Faites chauffer le lait et la crème avec la moitié du sucre jusqu''à frémissement.","Fouettez les jaunes avec le reste du sucre jusqu''à blanchiment.","Versez le lait chaud progressivement sur les jaunes en fouettant (tempérage).","Remettez sur feu doux en remuant jusqu''à atteindre 82°C (la crème anglaise nappe la cuillère).","Hors du feu, incorporez la pâte de pistache au fouet.","Filtrez, laissez refroidir, réfrigérez 4h.","Sans sorbetière : versez en bac, congelez 45 min, mixez, recongelez 45 min, mixez encore. Répétez 3-4 fois.","Avec sorbetière : turbinez jusqu''à consistance souhaitée."]',
 'La qualité de la pâte de pistache est tout : achetez une pâte 100% pistaches de Sicile (Bronte idéalement) sans sucre ni huile. Évitez les pâtes vert fluo qui sont artificielles.',
 'Le pistachier est cultivé à Bronte, au pied de l''Etna, depuis plus de 2000 ans. La pistache de Bronte DOP (Pistacchio Verde di Bronte) est la plus aromatique au monde et est protégée par une appellation d''origine.')

) AS v(lesson_title, title, description, emoji, prep_time_min, cook_time_min, servings, difficulty, avg_price_eur, ingredients, instructions, chef_tip, cultural_note)
JOIN public.lessons l ON l.title = v.lesson_title
ON CONFLICT (lesson_id) DO NOTHING;


-- ============================================================
-- RECETTES — JAPONAIS (21→35)
-- ============================================================
INSERT INTO public.recipes (id, lesson_id, title, description, emoji, prep_time_min, cook_time_min, servings, difficulty, avg_price_eur, ingredients, instructions, chef_tip, cultural_note)
SELECT gen_random_uuid(), l.id, v.title, v.description, v.emoji, v.prep_time_min::int, v.cook_time_min::int, v.servings::int, v.difficulty, v.avg_price_eur, v.ingredients::jsonb, v.instructions::jsonb, v.chef_tip, v.cultural_note
FROM (VALUES

('Le Dashi Maison',
 'Dashi Kombu-Katsuobushi', 'Le bouillon fondamental de la cuisine japonaise : umami pur, en 20 minutes.', '🫙', '5', '20', '4', 'moyen', '~5€',
 '[{"qty":"1L","item":"eau froide"},{"qty":"15g","item":"kombu (algue séchée)"},{"qty":"20g","item":"bonite séchée katsuobushi (copeaux)"}]',
 '["Mettez le kombu dans l''eau froide. Laissez infuser à froid minimum 30 min (ou toute une nuit au frigo pour un dashi plus doux).","Portez l''eau et le kombu à 60°C (surtout pas à ébullition — le kombu deviendrait amer et gluant).","Retirez le kombu juste avant l''ébullition.","Portez à ébullition. Ajoutez les copeaux de bonite d''un coup.","Éteignez immédiatement le feu. Laissez infuser 3 à 4 minutes SANS remuer.","Filtrez délicatement à travers un tamis fin (sans presser — le fond serait amer).","Utilisez immédiatement ou conservez au frigo 3 jours."]',
 'Ne faites jamais bouillir le kombu, et ne pressez jamais les copeaux de bonite lors du filtrage. Ces deux erreurs donnent de l''amertume et de l''astringence au dashi.',
 'Le dashi est le bouillon fondamental de la cuisine japonaise. Il contient le taux d''umami (glutamates naturels) le plus élevé de tous les bouillons du monde — jusqu''à 60x plus qu''un bouillon de poulet classique.'),

('Le Tamagoyaki',
 'Tamagoyaki Sucré-Salé', 'L''omelette roulée japonaise : technique de la poêle carrée et roulage en couches.', '🥚', '5', '10', '2', 'moyen', '~2€',
 '[{"qty":"4","item":"œufs frais"},{"qty":"1 c.s.","item":"sauce soja"},{"qty":"1 c.s.","item":"mirin"},{"qty":"1 c.c.","item":"sucre"},{"qty":"Huile","item":"végétale neutre"},{"qty":"Daikon râpé","item":"pour servir (optionnel)"}]',
 '["Fouettez ensemble les œufs, la sauce soja, le mirin et le sucre. Filtrez à travers un tamis pour une texture lisse.","Chauffez la poêle carrée à tamagoyaki (ou une petite poêle ronde) à feu moyen. Huilez légèrement avec du papier absorbant.","Versez 1/3 de l''appareil. Laissez à peine prendre (surface encore brillante).","Roulez délicatement l''omelette depuis le haut vers le bas.","Poussez le rouleau au fond de la poêle. Huilez à nouveau.","Versez un autre 1/3 d''appareil. Soulevez le rouleau pour que l''appareil passe en dessous.","Roulez à nouveau en intégrant la première couche. Répétez une 3e fois.","Posez le tamagoyaki sur un makisu (natte de bambou), roulez-le serré pour lui donner une forme rectangulaire nette. Laissez reposer 5 min."]',
 'La clé du tamagoyaki est que chaque couche doit être à peine cuite quand vous roulez : si elle est trop cuite, les couches ne colleront pas ensemble et se sépareront.',
 'Le tamagoyaki est l''un des tests classiques pour évaluer la maîtrise technique d''un cuisinier japonais. Dans les restaurants de sushi, la qualité du tamagoyaki révèle le niveau du chef.'),

('La Tempura de Légumes',
 'Tempura de Légumes Croustillante', 'Légumes enrobés d''une pâte ultra-légère, frits en une fraction de seconde.', '🥦', '15', '15', '4', 'moyen', '~8€',
 '[{"qty":"Légumes assortis:","item":"patate douce, brocoli, champignons, poivron, aubergine"},{"qty":"Pâte:","item":""},{"qty":"100g","item":"farine à tempura (ou farine + fécule 50/50)"},{"qty":"150ml","item":"eau très froide (avec glaçons)"},{"qty":"1","item":"jaune d''œuf"},{"qty":"Sauce tsuyu:","item":"200ml dashi, 2 c.s. sauce soja, 2 c.s. mirin"}]',
 '["Préparez la sauce : mélangez dashi, soja et mirin. Chauffez puis laissez tiédir.","Coupez les légumes en fines tranches ou en petits morceaux.","JUSTE avant de frire : mélangez la farine, le jaune d''œuf et l''eau glacée très rapidement et grossièrement. Des grumeaux sont normaux et souhaitables — ne mélangez pas trop.","Chauffez l''huile à 180°C.","Trempez les légumes dans la pâte et plongez-les aussitôt dans l''huile chaude.","Faites frire 2-3 minutes jusqu''à ce que la pâte soit très légère et croustillante.","Égouttez sur une grille (pas du papier) pour garder le croustillant.","Servez immédiatement avec la sauce tsuyu et du daikon râpé."]',
 'La pâte à tempura doit être préparée À LA DERNIÈRE SECONDE et mélangée le moins possible. Les grumeaux sont la signature d''une vraie tempura légère. Une pâte trop mélangée active le gluten et donne une tempura épaisse et lourde.',
 'La tempura a été introduite au Japon par les missionnaires portugais au XVIe siècle lors du jeûne du Carême (Quatuor anni tempora). Les Japonais ont adopté et perfectionné la technique au point de la rendre méconnaissable.'),

('Le Chawanmushi',
 'Chawanmushi aux Crevettes', 'Flan japonais salé à la vapeur : texture de soie, arôme de dashi.', '🍵', '15', '15', '4', 'moyen', '~8€',
 '[{"qty":"4","item":"œufs"},{"qty":"50cl","item":"dashi"},{"qty":"2 c.s.","item":"sauce soja claire"},{"qty":"1 c.s.","item":"mirin"},{"qty":"8","item":"crevettes décortiquées"},{"qty":"4","item":"champignons shiitaké tranchés"},{"qty":"1 tige","item":"de ciboulette japonaise"}]',
 '["Fouettez les œufs délicatement SANS les faire mousser (c''est crucial pour la texture lisse).","Mélangez le dashi, la sauce soja et le mirin. Versez progressivement sur les œufs.","Filtrez à travers un tamis fin pour éliminer toutes les bulles et obtenir un appareil parfaitement lisse.","Répartissez les crevettes et les champignons dans 4 tasses à chawanmushi (ou ramequins).","Versez l''appareil filtré par-dessus. Couvrez chaque tasse de film plastique ou d''un couvercle.","Cuisez à la vapeur à feu moyen 12 à 15 minutes. La surface doit être prise mais encore légèrement tremblotante.","Garnissez de ciboulette. Servez chaud."]',
 'Ne faites jamais mousser les œufs en fouettant. Les bulles d''air vont créer des trous dans le flan pendant la cuisson, lui donnant une texture d''éponge au lieu de la consistance de soie voulue.',
 'Chawanmushi signifie littéralement "cuit à la vapeur dans une tasse de thé". C''est un plat de cuisine kaiseki (gastronomie japonaise) servi en début de repas pour sa légèreté et sa délicatesse.'),

('Le Yakitori au Tare',
 'Yakitori Tori no Tare', 'Brochettes de poulet caramélisées à la sauce tare maison.', '🍢', '20', '15', '4', 'moyen', '~10€',
 '[{"qty":"500g","item":"blanc et cuisse de poulet en dés de 2cm"},{"qty":"Sauce Tare:","item":""},{"qty":"100ml","item":"sauce soja"},{"qty":"100ml","item":"mirin"},{"qty":"50ml","item":"sake"},{"qty":"2 c.s.","item":"sucre"},{"qty":"Negi","item":"(oignon vert) en tronçons de 3cm"}]',
 '["Préparez le tare : faites réduire sauce soja, mirin, sake et sucre à feu moyen jusqu''à ce que la sauce soit sirupeuse (environ 10-15 min). Laissez refroidir.","Alternez les dés de poulet et les tronçons de negi sur des brochettes.","Grillez sur charbon de bois (binchotan idéalement) ou sur grill à feu vif. Retournez souvent.","Après 3 minutes, badigeonnez abondamment de sauce tare avec un pinceau.","Laissez caraméliser 1-2 minutes, badigeonnez à nouveau. Répétez 3 fois.","La surface doit être laquée, brillante et légèrement caramélisée.","Saupoudrez de shichimi togarashi (mélange 7 épices japonaises)."]',
 'La sauce tare utilisée pour badigeonner DOIT être chauffée jusqu''à être sirupeuse avant utilisation. Une tare trop liquide glisse sur la viande sans caraméliser. Une tare sirupeuse adhère et laque.',
 'Les yakitori sont la street food japonaise par excellence, vendus dans les izakaya (bars à cuisine) et sur les stands de rue. À Kyoto, chaque famille de yakitoriya garde jalousement sa recette de tare, parfois vieille de plusieurs générations.'),

('Le Nikujaga',
 'Nikujaga (Ragout Sucré-Salé)', 'Le plat réconfortant du foyer japonais : bœuf, pommes de terre et dashi sucré.', '🥘', '15', '35', '4', 'facile', '~10€',
 '[{"qty":"300g","item":"bœuf tranché finement (ou porc)"},{"qty":"4","item":"pommes de terre en morceaux"},{"qty":"2","item":"carottes en rondelles"},{"qty":"1","item":"oignon émincé"},{"qty":"100g","item":"vermicelles de riz (shirataki)"},{"qty":"Sauce:","item":"400ml dashi, 4 c.s. sauce soja, 3 c.s. mirin, 2 c.s. sucre, 2 c.s. sake"}]',
 '["Faites revenir l''oignon dans l''huile 2 min. Ajoutez le bœuf tranché, faites-le dorer rapidement.","Ajoutez les carottes, les pommes de terre et les shirataki rincés.","Versez le dashi, la sauce soja, le mirin, le sucre et le sake.","Portez à ébullition, écumez, puis baissez à feu doux.","Couvrez et laissez mijoter 25-30 minutes jusqu''à ce que les pommes de terre soient tendres.","Goûtez et ajustez la balance sucré-salé.","Servez dans des bols avec du riz blanc."]',
 'Le nikujaga est le plat du comfort food japonais : sucré mais salé, doux mais réconfortant. L''équilibre exact entre sauce soja (salé), mirin (sucré-alcoolisé) et sucre est la signature de chaque famille.',
 'Le nikujaga aurait été inventé par l''amiral Togo Heihachiro à la fin du XIXe siècle, qui avait demandé à son cuisinier de reproduire le bœuf bourguignon goûté à Portsmouth en Angleterre. Le résultat fut ce plat typiquement japonais.'),

('Le Dorayaki',
 'Dorayaki Maison à l''Anko', 'Pancakes japonais moelleux fourrés à la pâte de haricots rouges sucrée.', '🥞', '20', '20', '8', 'facile', '~4€',
 '[{"qty":"Pancakes:","item":""},{"qty":"2","item":"œufs"},{"qty":"100g","item":"sucre"},{"qty":"1 c.s.","item":"miel"},{"qty":"150g","item":"farine"},{"qty":"1 c.c.","item":"levure chimique"},{"qty":"2 c.s.","item":"eau"},{"qty":"Garniture:","item":""},{"qty":"300g","item":"anko (pâte de haricots rouges sucrée en pot)"}]',
 '["Fouettez les œufs, le sucre et le miel jusqu''à ce que le mélange soit mousseux.","Incorporez la farine tamisée et la levure.","Ajoutez l''eau pour assouplir. Laissez reposer la pâte 15 minutes.","Chauffez une poêle anti-adhésive à feu doux. Versez une louche de pâte pour former un disque régulier.","Quand des bulles se forment à la surface, retournez. Cuisez encore 30 secondes. La surface doit être uniforme et légèrement bombée.","Répétez pour former des paires de pancakes de même taille.","Assemblez : posez une bonne cuillerée d''anko au centre d''un pancake. Recouvrez avec un second pancake. Appuyez légèrement pour coller."]',
 'La pâte doit reposer 15 min après mélange pour que la levure commence à agir. C''est ce repos qui donne aux dorayaki leur texture légèrement spongieuse et moelleuse caractéristique.',
 'Le dorayaki est le gâteau préféré de Doraemon, le célèbre chat-robot de la BD japonaise. "Dora" vient du mot gong (doragane) car les pancakes ressemblent à des cymbales.')

) AS v(lesson_title, title, description, emoji, prep_time_min, cook_time_min, servings, difficulty, avg_price_eur, ingredients, instructions, chef_tip, cultural_note)
JOIN public.lessons l ON l.title = v.lesson_title
ON CONFLICT (lesson_id) DO NOTHING;


-- ============================================================
-- RECETTES — MAROCAIN (21→35)
-- ============================================================
INSERT INTO public.recipes (id, lesson_id, title, description, emoji, prep_time_min, cook_time_min, servings, difficulty, avg_price_eur, ingredients, instructions, chef_tip, cultural_note)
SELECT gen_random_uuid(), l.id, v.title, v.description, v.emoji, v.prep_time_min::int, v.cook_time_min::int, v.servings::int, v.difficulty, v.avg_price_eur, v.ingredients::jsonb, v.instructions::jsonb, v.chef_tip, v.cultural_note
FROM (VALUES

('Les Keftas Grillées',
 'Brochettes de Kefta aux Épices', 'Viande hachée parfumée au cumin et paprika, grillée sur braise.', '🍢', '20', '10', '4', 'facile', '~8€',
 '[{"qty":"500g","item":"agneau haché (ou bœuf-agneau 50/50)"},{"qty":"1","item":"oignon râpé"},{"qty":"1 bouquet","item":"persil et coriandre hachés"},{"qty":"Épices:","item":"1 c.c. cumin, 1 c.c. paprika doux, 1/2 c.c. cannelle, 1/2 c.c. poivre"},{"qty":"1 pincée","item":"piment de Cayenne"},{"qty":"Sel","item":""}]',
 '["Mélangez tous les ingrédients à la main pendant 5 minutes. La viande doit être bien amalgamée et les épices parfaitement incorporées.","Laissez reposer la farce 30 minutes au frigo pour que les saveurs se développent.","Mouillez-vous les mains. Formez des saucisses allongées autour des brochettes en métal ou en bois (préalablement trempés dans l''eau).","Grillez sur une braise vive ou un grill en fonte très chaud 3 à 4 minutes de chaque côté.","La kefta doit être dorée à l''extérieur et encore légèrement rosée à l''intérieur.","Servez avec du pain khobz, des tomates fraîches, de la harissa et du citron."]',
 'Rassir la viande hachée avec des oignons râpés est le secret marocain : l''oignon libère son eau et parfume la viande pendant le repos au frigo. Ne sautez jamais cette étape de repos.',
 'La kefta est consommée dans tout le Maghreb et au Moyen-Orient. Au Maroc, elle est indissociable des souks, où les brochettes grillent sur des braseros au charbon de bois de thuya.'),

('La Zaalouk d''Aubergines',
 'Zaalouk d''Aubergines Fumé', 'Caviar d''aubergines marocain : onctueux, épicé et parfumé au cumin.', '🍆', '10', '30', '4', 'facile', '~4€',
 '[{"qty":"2","item":"grosses aubergines"},{"qty":"3","item":"gousses d''ail écrasées"},{"qty":"400g","item":"tomates fraîches concassées"},{"qty":"Épices:","item":"1 c.c. cumin, 1 c.c. paprika fumé"},{"qty":"1/2 bouquet","item":"coriandre fraîche hachée"},{"qty":"4 c.s.","item":"huile d''olive"},{"qty":"1 c.s.","item":"vinaigre ou jus de citron"}]',
 '["Faites griller les aubergines entières directement sur la flamme du gaz ou sous le grill du four en les retournant souvent. La peau doit être totalement carbonisée.","Laissez-les refroidir, puis pelez-les. La chair va absorber l''arôme fumé de la carbonisation.","Hachez grossièrement la chair d''aubergine.","Dans une poêle, faites revenir l''ail dans l''huile d''olive. Ajoutez les tomates et les épices.","Ajoutez l''aubergine. Faites cuire à feu moyen en écrasant à la fourchette jusqu''à évaporation de l''eau (15-20 min).","Ajoutez le vinaigre et la coriandre fraîche.","Servez froid ou à température ambiante avec du pain."]',
 'Brûler complètement la peau des aubergines sur la flamme directe n''est pas une erreur : c''est essentiel. La carbonisation de la peau est ce qui donne ce parfum fumé incomparable que vous ne pouvez pas obtenir autrement.',
 'La zaalouk est le mezze marocain par excellence. Elle est consommée en entrée ou comme accompagnement lors des repas de famille du vendredi (le déjeuner hebdomadaire familial le plus important au Maroc).'),

('Les Briouats au Fromage',
 'Briouats au Fromage et Herbes', 'Triangles croustillants de feuilles de brick farcis au fromage frais et herbes.', '🥐', '20', '15', '6', 'facile', '~5€',
 '[{"qty":"8","item":"feuilles de brick"},{"qty":"200g","item":"fromage de chèvre frais (ou ricotta, ou fromage à tartiner)"},{"qty":"1 œuf","item":""},{"qty":"1 bouquet","item":"persil et menthe hachés"},{"qty":"1","item":"échalote hachée très fin"},{"qty":"Huile","item":"pour la friture ou le four"}]',
 '["Mélangez le fromage, l''œuf battu, les herbes et l''échalote. Assaisonnez.","Coupez les feuilles de brick en deux (demi-cercles).","Posez une cuillère de farce à l''extrémité droite de la demi-feuille.","Repliez en triangle en ramenant le coin droit vers le haut. Continuez à plier en triangle jusqu''au bout.","Collez l''extrémité avec un peu de blanc d''œuf.","FOUR (moins gras) : badigeonnez d''huile. Enfournez à 200°C 12-15 min jusqu''à dorure.","FRITURE : faites frire dans l''huile à 170°C 2-3 min jusqu''à dorure."]',
 'La feuille de brick est très fragile quand elle est sèche. Gardez les feuilles non utilisées sous un linge humide pour éviter qu''elles ne sèchent et cassent pendant le pliage.',
 'Les briouats (du berbère "briwat") sont incontournables lors des repas de fête et du Ramadan au Maroc. Ils peuvent être salés (fromage, viande, crevettes) ou sucrés (amandes et miel).'),

('Les Chebakia',
 'Chebakia au Sésame et Miel', 'Pâtisseries marocaines en forme de fleur, frites et trempées dans le miel.', '🌸', '60', '30', '24', 'difficile', '~8€',
 '[{"qty":"500g","item":"farine"},{"qty":"100g","item":"graines de sésame torréfiées moulues"},{"qty":"2 c.s.","item":"eau de fleur d''oranger"},{"qty":"1 c.s.","item":"eau de rose"},{"qty":"1 c.c.","item":"cannelle moulue"},{"qty":"1/2 c.c.","item":"anis en poudre"},{"qty":"Huile","item":"de friture"},{"qty":"300g","item":"miel tiède"}]',
 '["Mélangez farine, sésame moulu, cannelle, anis, sel. Creusez un puits.","Ajoutez eau de fleur d''oranger, eau de rose et assez d''eau pour obtenir une pâte souple non collante.","Pétrissez 10 minutes. Laissez reposer 20 minutes.","Étalez la pâte finement. Découpez des bandes avec une roulette cannelée.","Formez chaque bande en nœud puis ouvrez en fleur (technique traditionnelle).","Faites frire en plusieurs fois dans l''huile à 170°C jusqu''à dorure.","Trempez immédiatement les chebakia chaudes dans le miel tiède. Laissez imbiber 5 minutes.","Saupoudrez de graines de sésame. Laissez sécher sur une grille."]',
 'Les chebakia doivent être plongées dans le miel IMMÉDIATEMENT à la sortie du bain de friture, encore bien chaudes. C''est la chaleur qui permet l''imprégnation du miel jusqu''au cœur de la pâtisserie.',
 'Les chebakia sont la pâtisserie du Ramadan par excellence. Elles sont consommées lors de la rupture du jeûne (ftour) avec la harira. Chaque région du Maroc a sa variante de forme et d''arômes.'),

('Le Baghrir',
 'Baghrir (Crêpes Mille Trous)', 'Crêpes légères et spongieuses à la semoule, fondantes au beurre et miel.', '🥞', '10', '20', '4', 'facile', '~2€',
 '[{"qty":"250g","item":"semoule fine"},{"qty":"125g","item":"farine"},{"qty":"7g","item":"levure de boulanger sèche"},{"qty":"1 c.c.","item":"levure chimique"},{"qty":"1 c.c.","item":"sel"},{"qty":"500ml","item":"eau tiède"},{"qty":"Beurre fondu et miel","item":"pour servir"}]',
 '["Mixez ensemble la semoule, la farine, les levures, le sel et l''eau tiède pendant 2 minutes pour obtenir une pâte très liquide et homogène.","Laissez reposer 20 minutes : des bulles vont se former à la surface, signe que la levure est active.","Chauffez une poêle anti-adhésive à feu moyen-doux. Ne la graissez pas.","Versez une petite louche de pâte sans étaler. La crêpe doit rester épaisse.","Faites cuire d''UN SEUL CÔTÉ uniquement. Les mille trous caractéristiques vont se former à la surface.","Quand la surface est sèche et les trous bien formés, retirez. Ne retournez jamais.","Servez immédiatement nappé de beurre fondu mélangé à du miel."]',
 'Le baghrir ne se cuit que d''un seul côté. C''est l''unique crêpe au monde qui ne se retourne pas. Les mille trous se forment pendant la cuisson grâce aux deux levures qui travaillent ensemble.',
 'Baghrir signifie "mille trous" en arabe dialectal marocain. Ce sont les trous caractéristiques qui permettent au beurre fondu et au miel de s''imprégner jusqu''au cœur de la crêpe lors du service.')

) AS v(lesson_title, title, description, emoji, prep_time_min, cook_time_min, servings, difficulty, avg_price_eur, ingredients, instructions, chef_tip, cultural_note)
JOIN public.lessons l ON l.title = v.lesson_title
ON CONFLICT (lesson_id) DO NOTHING;


-- ============================================================
-- EXERCICES — FRANÇAIS (21→35) : 2 par leçon
-- ============================================================
INSERT INTO public.exercises (id, lesson_id, type, question, data, order_index, xp_reward)
SELECT gen_random_uuid(), l.id, v.type::text, v.question, v.data::jsonb, v.order_index, v.xp_reward
FROM (VALUES

('La Soupe à l''Oignon Gratinée','multiple_choice','Combien de temps faut-il caraméliser les oignons pour une soupe réussie ?',
 '{"options":["Au moins 40 minutes à feu doux","10 minutes à feu vif","5 minutes au micro-ondes","30 secondes dans le beurre très chaud"],"correctIndex":0}',0,10),
('La Soupe à l''Oignon Gratinée','fill_in_blank','Le fromage traditionnel utilisé pour gratiner la soupe à l''oignon est le ___.',
 '{"answer":"comté","hint":"Fromage de Franche-Comté à pâte cuite pressée"}',1,10),

('Le Gratin Dauphinois','multiple_choice','Pourquoi ne faut-il PAS laver les pommes de terre après les avoir tranchées ?',
 '{"options":["Pour garder l''amidon qui va lier naturellement la crème","Pour ne pas les refroidir","Pour éviter qu''elles collent","Pour préserver les vitamines"],"correctIndex":0}',0,10),
('Le Gratin Dauphinois','fill_in_blank','Contrairement aux idées reçues, l''authentique gratin dauphinois ne contient pas de ___.',
 '{"answer":"fromage","hint":"Le gratin vient de la caramélisation naturelle de la crème"}',1,10),

('Les Moules Marinières','multiple_choice','Que faire avec une moule qui reste fermée après la cuisson ?',
 '{"options":["La jeter immédiatement, elle est mauvaise","L''ouvrir de force avec un couteau","La remettre à cuire 5 minutes de plus","La manger quand même, ça arrive parfois"],"correctIndex":0}',0,10),
('Les Moules Marinières','fill_in_blank','Le type de moule d''élevage le plus répandu en France, cultivée sur des pieux en bois, est la moule de ___.',
 '{"answer":"bouchot","hint":"Type d''élevage sur des pieux fichés en mer"}',1,10),

('Le Clafoutis aux Cerises','multiple_choice','Quelle est la règle d''or du clafoutis traditionnel concernant les cerises ?',
 '{"options":["Ne pas les dénoyauter — les noyaux parfument le flan","Les dénoyauter soigneusement avant cuisson","Les remplacer par des cerises en boîte","Les faire macérer dans le kirsch 24h"],"correctIndex":0}',0,10),
('Le Clafoutis aux Cerises','fill_in_blank','Le clafoutis est originaire de la région du ___.',
 '{"answer":"Limousin","hint":"Région du centre de la France, capitale Limoges"}',1,10),

('La Quiche Lorraine','multiple_choice','Quel ingrédient NE se trouve JAMAIS dans une vraie quiche lorraine authentique ?',
 '{"options":["Du fromage râpé","Des lardons fumés","De la crème fraîche","Des œufs"],"correctIndex":0}',0,10),
('La Quiche Lorraine','fill_in_blank','La quiche doit sortir du four encore légèrement ___ au centre pour rester crémeuse.',
 '{"answer":"tremblotante","hint":"Elle se solidifie en refroidissant"}',1,10),

('Le Cassoulet Toulousain','multiple_choice','Combien de fois doit-on rompre et enfoncer la croûte qui se forme sur le cassoulet pendant la cuisson au four ?',
 '{"options":["3 fois exactement","1 seule fois","5 à 7 fois","Jamais, la croûte ne doit pas être touchée"],"correctIndex":0}',0,10),
('Le Cassoulet Toulousain','fill_in_blank','Le cassoulet tire son nom de la ___, le plat en terre cuite dans lequel il cuit traditionnellement.',
 '{"answer":"cassole","hint":"Plat en terre cuite d''Issel, dans l''Aude"}',1,10),

('Les Profiteroles','multiple_choice','Pourquoi ne faut-il JAMAIS ouvrir le four pendant la cuisson des choux ?',
 '{"options":["La vapeur emprisonnée fait gonfler les choux et s''échappe si on ouvre","Pour ne pas brûler les choux","Pour une question de consommation d''énergie","Les choux dorent mieux à huis clos"],"correctIndex":0}',0,10),
('Les Profiteroles','fill_in_blank','La pâte à choux est gonflée par la ___ produite par l''eau contenue dans la pâte.',
 '{"answer":"vapeur","hint":"Eau à l''état gazeux"}',1,10),

('La Daube Provençale','multiple_choice','Quel est le rôle principal de la marinade dans la préparation de la daube ?',
 '{"options":["L''acidité du vin décompose les fibres du bœuf et attendrit la viande","Colorer la viande en rouge","Remplacer la cuisson longue","Ajouter du sel à la viande"],"correctIndex":0}',0,10),
('La Daube Provençale','fill_in_blank','L''ingrédient surprenant ajouté à la daube provençale pour sa subtilité aromatique est le ___ d''orange.',
 '{"answer":"zeste","hint":"La partie colorée et parfumée de l''écorce"}',1,10),

('Le Soufflé au Chocolat','multiple_choice','Quel est le rôle du sillon passé au pouce sur le bord du ramequin ?',
 '{"options":["Forcer le soufflé à monter droit vers le haut","Décorer le soufflé","Permettre un démoulage plus facile","Empêcher le soufflé de trop gonfler"],"correctIndex":0}',0,10),
('Le Soufflé au Chocolat','fill_in_blank','Une fois le soufflé sorti du four, on doit le servir en ___ car il se dégonfle rapidement.',
 '{"answer":"courant","hint":"Très rapidement, sans perdre de temps"}',1,10),

('La Tapenade Noire','multiple_choice','D''où vient étymologiquement le mot "tapenade" ?',
 '{"options":["Du provençal tapeno qui signifie câpres","Du grec tapas qui signifie plat","Du latin tapa qui signifie tartiner","Du nom du chef qui l''a inventée"],"correctIndex":0}',0,10),
('La Tapenade Noire','fill_in_blank','Les trois ingrédients de base de la tapenade sont les olives, les anchois et les ___.',
 '{"answer":"câpres","hint":"Petits boutons floraux marinés au vinaigre ou au sel"}',1,10),

('Les Escargots à la Bourguignonne','multiple_choice','La qualité de quel ingrédient est absolument primordiale dans les escargots à la bourguignonne ?',
 '{"options":["Le beurre — il doit être de grande qualité (idéalement AOP)","Les escargots — ils doivent être vivants uniquement","L''ail — il faut de l''ail noir fermenté","Le vin — il doit être un bourgogne premier cru"],"correctIndex":0}',0,10),
('Les Escargots à la Bourguignonne','fill_in_blank','La préparation de beurre aromatique utilisée pour les escargots s''appelle le beurre ___.',
 '{"answer":"persillé","hint":"Beurre mélangé à du persil haché et de l''ail"}',1,10),

('La Crème Caramel','multiple_choice','Pourquoi filtre-t-on l''appareil à crème caramel avant de le verser dans les ramequins ?',
 '{"options":["Pour éliminer les grumeaux, les germes et obtenir une texture parfaitement lisse","Pour retirer les traces de sucre non dissous","Pour refroidir l''appareil plus rapidement","Pour vérifier s''il est assez sucré"],"correctIndex":0}',0,10),
('La Crème Caramel','fill_in_blank','La crème caramel doit reposer au réfrigérateur minimum ___ heures avant d''être démoulée.',
 '{"answer":"4","hint":"Au moins 4 heures, idéalement une nuit entière"}',1,10),

('Le Kouign-Amann','multiple_choice','Quand doit-on absolument démouler le kouign-amann ?',
 '{"options":["Immédiatement à la sortie du four, encore très chaud","Après 30 minutes de refroidissement","Le lendemain matin","Uniquement quand il est froid"],"correctIndex":0}',0,10),
('Le Kouign-Amann','fill_in_blank','Le nom kouign-amann signifie "gâteau au ___" en langue bretonne.',
 '{"answer":"beurre","hint":"Matière grasse laitière, ingrédient star de la Bretagne"}',1,10),

('La Flamiche aux Poireaux','multiple_choice','Pourquoi faut-il faire fondre les poireaux à fond AVANT de les mettre dans la tarte ?',
 '{"options":["Des poireaux insuffisamment cuits vont rendre de l''eau et détremper la pâte","Pour les colorer en vert vif","Pour les sucrer naturellement","Pour réduire leur volume et en mettre plus"],"correctIndex":0}',0,10),
('La Flamiche aux Poireaux','fill_in_blank','La flamiche est une tarte originaire de la région ___.',
 '{"answer":"Picardie","hint":"Région du nord de la France, limitrophe de la Belgique"}',1,10),

('Le Saucisson Brioché Lyonnais','multiple_choice','Quel est le point technique critique lors de l''enroulage de la brioche autour du saucisson ?',
 '{"options":["Bien souder les bords pour empêcher le gras du saucisson de s''échapper","Faire un nœud décoratif en surface","Pré-cuire le saucisson dans la brioche","Congeler le saucisson avant de l''emballer"],"correctIndex":0}',0,10),
('Le Saucisson Brioché Lyonnais','fill_in_blank','Le saucisson brioché est le plat emblématique des ___ lyonnais, les restaurants traditionnels de Lyon.',
 '{"answer":"bouchons","hint":"Restaurants populaires typiquement lyonnais"}',1,10)

) AS v(lesson_title, type, question, data, order_index, xp_reward)
JOIN public.lessons l ON l.title = v.lesson_title
ON CONFLICT DO NOTHING;


-- ============================================================
-- EXERCICES — ITALIEN (21→35)
-- ============================================================
INSERT INTO public.exercises (id, lesson_id, type, question, data, order_index, xp_reward)
SELECT gen_random_uuid(), l.id, v.type::text, v.question, v.data::jsonb, v.order_index, v.xp_reward
FROM (VALUES

('La Bruschetta al Pomodoro','multiple_choice','Quel est le geste clé qui fait toute la différence de la bruschetta par rapport à une simple tartine ?',
 '{"options":["Frotter l''ail cru directement sur le pain grillé encore chaud","Mélanger l''ail à l''huile d''olive avant d''étaler","Cuire l''ail et les tomates ensemble","Utiliser de la poudre d''ail en poudre"],"correctIndex":0}',0,10),
('La Bruschetta al Pomodoro','fill_in_blank','Le basilic doit toujours être ___ à la main, jamais coupé au couteau pour éviter qu''il noircisse.',
 '{"answer":"déchiré","hint":"Action de séparer avec les doigts sans outil"}',1,10),

('Le Risotto ai Funghi Porcini','multiple_choice','Que faire de l''eau de trempage des cèpes séchés ?',
 '{"options":["La filtrer et l''ajouter au bouillon — c''est un concentré d''umami précieux","La jeter, elle est trop amère","La boire en infusion","La verser directement sur le risotto en fin de cuisson"],"correctIndex":0}',0,10),
('Le Risotto ai Funghi Porcini','fill_in_blank','La variété de riz préférée des chefs italiens pour le risotto, qui tient mieux la cuisson que l''arborio, est le ___.',
 '{"answer":"carnaroli","hint":"Riz du Piémont, grain long et riche en amidon"}',1,10),

('Le Tiramisù Classique','multiple_choice','Quelle est la durée de trempage idéale d''un boudoir dans le café ?',
 '{"options":["1 seconde de chaque côté — très rapidement","30 secondes de chaque côté","5 minutes dans le café froid","Il faut les laisser s''imbiber naturellement sans les tremper"],"correctIndex":0}',0,10),
('Le Tiramisù Classique','fill_in_blank','Le tiramisù a été créé dans les années 1960 dans la ville de ___ en Vénétie.',
 '{"answer":"Trévise","hint":"Ville du nord de l''Italie, proche de Venise"}',1,10),

('La Caponata Sicilienne','multiple_choice','À quel moment est-il préférable de manger la caponata sicilienne ?',
 '{"options":["Froide, le lendemain de sa préparation","Chaude, juste après la cuisson","Tiède, après 30 minutes","Congelée puis décongelée"],"correctIndex":0}',0,10),
('La Caponata Sicilienne','fill_in_blank','La sauce aigre-douce utilisée dans la caponata s''appelle en italien l''___.',
 '{"answer":"agrodolce","hint":"Agro = aigre, dolce = doux en italien"}',1,10),

('La Pasta e Fagioli','multiple_choice','Quel ingrédient secret de grand-mère enrichit incroyablement le bouillon de la pasta e fagioli ?',
 '{"options":["Une croûte de parmesan ajoutée pendant la cuisson","Du lait entier en fin de cuisson","Un œuf cru battu au fond du bol","Une cuillère de crème fraîche"],"correctIndex":0}',0,10),
('La Pasta e Fagioli','fill_in_blank','La particularité de la pasta e fagioli est que les pâtes sont cuites directement dans le ___ plutôt que dans une eau séparée.',
 '{"answer":"bouillon","hint":"Le liquide dans lequel mijotent les haricots"}',1,10),

('La Pasta Amatriciana','multiple_choice','Quelle est la règle absolue concernant le type de charcuterie dans l''Amatriciana authentique ?',
 '{"options":["Guanciale uniquement (joue de porc) — jamais de pancetta ni de lardons","Pancetta ou guanciale, les deux sont acceptés","N''importe quelle charcuterie fumée convient","Du jambon cru tranché finement"],"correctIndex":0}',0,10),
('La Pasta Amatriciana','fill_in_blank','Le fromage utilisé dans l''Amatriciana est exclusivement le ___, jamais le parmesan.',
 '{"answer":"pecorino","hint":"Fromage de brebis romain très salé et piquant"}',1,10),

('Le Gelato al Pistacchio','multiple_choice','Quelle est la caractéristique qui distingue un vrai gelato d''une glace industrielle ?',
 '{"options":["Le gelato contient plus de lait et moins de crème, est moins aéré et plus dense","Le gelato contient plus de crème et est plus léger","La différence est uniquement dans le contenant (sorbetière)","Le gelato est toujours servi à température négative très basse"],"correctIndex":0}',0,10),
('Le Gelato al Pistacchio','fill_in_blank','La pistache la plus aromatique au monde, protégée par une appellation, pousse au pied de l''Etna dans la ville de ___.',
 '{"answer":"Bronte","hint":"Ville sicilienne mondialement connue pour ses pistaches vertes"}',1,10)

) AS v(lesson_title, type, question, data, order_index, xp_reward)
JOIN public.lessons l ON l.title = v.lesson_title
ON CONFLICT DO NOTHING;


-- ============================================================
-- EXERCICES — JAPONAIS (21→35)
-- ============================================================
INSERT INTO public.exercises (id, lesson_id, type, question, data, order_index, xp_reward)
SELECT gen_random_uuid(), l.id, v.type::text, v.question, v.data::jsonb, v.order_index, v.xp_reward
FROM (VALUES

('Le Dashi Maison','multiple_choice','Pourquoi ne faut-il JAMAIS faire bouillir le kombu dans le dashi ?',
 '{"options":["Le kombu devient amer et libère du mucilage gluant au-delà de 60°C","Le kombu perd sa couleur verte","Le kombu fond et disparaît","Il faut obligatoirement le faire bouillir pour extraire les saveurs"],"correctIndex":0}',0,10),
('Le Dashi Maison','fill_in_blank','Le dashi contient le taux d''___ (glutamates naturels) le plus élevé de tous les bouillons du monde.',
 '{"answer":"umami","hint":"La 5e saveur, découverte par le chimiste japonais Ikeda en 1908"}',1,10),

('Le Tamagoyaki','multiple_choice','Quel est l''état idéal de la couche d''œuf au moment de rouler le tamagoyaki ?',
 '{"options":["À peine prise, surface encore brillante — si trop cuite les couches ne collent pas","Complètement cuite et sèche","Encore totalement liquide","Brûlée légèrement pour le goût"],"correctIndex":0}',0,10),
('Le Tamagoyaki','fill_in_blank','Dans les restaurants de sushi, la qualité du tamagoyaki est considérée comme un test de ___ du chef.',
 '{"answer":"maîtrise","hint":"Niveau d''expertise et de compétence technique"}',1,10),

('La Tempura de Légumes','multiple_choice','Pourquoi la pâte à tempura doit-elle être préparée juste avant de frire, avec de l''eau glacée et peu mélangée ?',
 '{"options":["Le gluten ne doit pas se développer — une pâte trop mélangée donne une tempura lourde","Pour qu''elle soit froide dans l''huile chaude, créant de la vapeur","Pour que la pâte soit plus liquide","Pour que la tempura soit plus épaisse"],"correctIndex":0}',0,10),
('La Tempura de Légumes','fill_in_blank','La tempura a été introduite au Japon par les missionnaires ___ au XVIe siècle.',
 '{"answer":"portugais","hint":"Nation maritime européenne, pionnière des grandes découvertes"}',1,10),

('Le Chawanmushi','multiple_choice','Pourquoi ne faut-il PAS fouetter les œufs vigoureusement pour le chawanmushi ?',
 '{"options":["Les bulles d''air forment des trous dans le flan pendant la cuisson vapeur","Les œufs trop battus coagulent plus vite","Ça rendrait le flan trop sucré","La vapeur ne pénètre pas si les œufs sont fouettés"],"correctIndex":0}',0,10),
('Le Chawanmushi','fill_in_blank','Chawanmushi signifie littéralement "cuit à la vapeur dans une ___ de thé" en japonais.',
 '{"answer":"tasse","hint":"Récipient pour boire le thé"}',1,10),

('Le Yakitori au Tare','multiple_choice','Quel est le signe que la sauce tare est prête à être utilisée pour badigeonner ?',
 '{"options":["Elle est sirupeuse et nap la cuillère — une tare trop liquide ne laque pas","Elle est translucide et très légère","Elle sent fortement le vinaigre","Elle forme des cristaux de sucre sur les bords"],"correctIndex":0}',0,10),
('Le Yakitori au Tare','fill_in_blank','Le charbon de bois japonais utilisé dans les meilleurs restaurants de yakitori, très pur et sans fumée, s''appelle le ___.',
 '{"answer":"binchotan","hint":"Charbon blanc japonais à très haute densité carbonique"}',1,10),

('Le Nikujaga','multiple_choice','D''après la légende, le nikujaga serait une tentative de reproduire quel plat occidental ?',
 '{"options":["Le bœuf bourguignon français","Le pot-au-feu","Le steak and kidney pie anglais","Le schnitzel autrichien"],"correctIndex":0}',0,10),
('Le Nikujaga','fill_in_blank','La balance parfaite du nikujaga combine la sauce soja (salé), le mirin (sucré-alcoolisé) et le sucre pour un goût ___-salé.',
 '{"answer":"sucré","hint":"L''une des deux saveurs primaires de ce plat"}',1,10),

('Le Dorayaki','multiple_choice','Pourquoi faut-il laisser reposer la pâte à dorayaki 15 minutes avant cuisson ?',
 '{"options":["La levure commence à agir, donnant cette texture spongieuse et moelleuse","Pour que la farine absorbe l''eau","Pour que les œufs coagulent légèrement","Pour refroidir la pâte"],"correctIndex":0}',0,10),
('Le Dorayaki','fill_in_blank','Le dorayaki est le dessert préféré de ___, le célèbre chat-robot de la bande dessinée japonaise.',
 '{"answer":"Doraemon","hint":"Robot chat bleu de manga créé par Fujiko F. Fujio"}',1,10)

) AS v(lesson_title, type, question, data, order_index, xp_reward)
JOIN public.lessons l ON l.title = v.lesson_title
ON CONFLICT DO NOTHING;


-- ============================================================
-- EXERCICES — MAROCAIN (21→35)
-- ============================================================
INSERT INTO public.exercises (id, lesson_id, type, question, data, order_index, xp_reward)
SELECT gen_random_uuid(), l.id, v.type::text, v.question, v.data::jsonb, v.order_index, v.xp_reward
FROM (VALUES

('Les Keftas Grillées','multiple_choice','Quel est le rôle de l''oignon râpé mélangé à la viande pour les keftas ?',
 '{"options":["Il libère son eau et parfume la viande pendant le repos au frigo","Il colore les brochettes en doré","Il remplace la chapelure comme liant","Il attendrit uniquement grâce à son acidité"],"correctIndex":0}',0,10),
('Les Keftas Grillées','fill_in_blank','Les épices incontournables des keftas marocaines sont le ___, le paprika, la cannelle et le poivre.',
 '{"answer":"cumin","hint":"Épice chaude et terreuse, star de la cuisine maghrébine"}',1,10),

('La Zaalouk d''Aubergines','multiple_choice','Pourquoi faut-il brûler complètement la peau des aubergines pour la zaalouk ?',
 '{"options":["La carbonisation de la peau est essentielle pour le parfum fumé caractéristique","Pour enlever les pesticides","Pour raccourcir le temps de cuisson","C''est une erreur, la peau ne doit pas brûler"],"correctIndex":0}',0,10),
('La Zaalouk d''Aubergines','fill_in_blank','La zaalouk est servie froide comme ___, en entrée lors des repas de famille.',
 '{"answer":"mezze","hint":"Petites entrées partagées du monde arabe et méditerranéen"}',1,10),

('Les Briouats au Fromage','multiple_choice','Comment conserver les feuilles de brick non utilisées pendant le pliage ?',
 '{"options":["Sous un linge humide pour éviter qu''elles sèchent et cassent","Au congélateur entre chaque utilisation","Dans l''eau froide","En les badigeonnant d''huile"],"correctIndex":0}',0,10),
('Les Briouats au Fromage','fill_in_blank','Les briouats peuvent être cuits de deux façons : à la ___ ou au four pour une version moins grasse.',
 '{"answer":"friture","hint":"Immersion dans un bain d''huile chaud"}',1,10),

('Les Chebakia','multiple_choice','À quel moment faut-il tremper les chebakia dans le miel ?',
 '{"options":["Immédiatement à la sortie de la friture, encore chaudes","Après complet refroidissement","Avant la friture","Le lendemain après une nuit au frigo"],"correctIndex":0}',0,10),
('Les Chebakia','fill_in_blank','Les chebakia sont traditionnellement préparées et consommées pendant le mois de ___.',
 '{"answer":"Ramadan","hint":"Mois de jeûne sacré dans l''islam"}',1,10),

('Le Baghrir','multiple_choice','Quelle est la particularité unique du baghrir par rapport à toutes les autres crêpes du monde ?',
 '{"options":["Il ne se cuit que d''un seul côté et ne se retourne jamais","Il est cuit dans de l''huile","Il utilise de la levure chimique uniquement","Il faut le retourner 3 fois"],"correctIndex":0}',0,10),
('Le Baghrir','fill_in_blank','Le baghrir doit son nom à ses nombreux trous caractéristiques : baghrir signifie "___ trous" en arabe dialectal.',
 '{"answer":"mille","hint":"Le chiffre 1000"}',1,10)

) AS v(lesson_title, type, question, data, order_index, xp_reward)
JOIN public.lessons l ON l.title = v.lesson_title
ON CONFLICT DO NOTHING;
