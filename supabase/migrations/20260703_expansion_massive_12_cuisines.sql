-- ============================================================
-- RecipeQuest — Expansion Massive (12 Cuisines)
-- Ajout de nouvelles leçons, recettes, tips et exercices inédits
-- ============================================================

-- 1. Ajout du Path "Végétarien" (au cas où il n'existe pas)
INSERT INTO public.paths (id, slug, title, description, emoji, color, order_index, is_active)
VALUES (gen_random_uuid(), 'vegetarian', 'Cuisine Végétarienne', 'Plats sans viande, créatifs et gorgés de saveurs', '🥗', '#4CAF50', 12, true)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- 2. INSERTION DES NOUVELLES LEÇONS
-- ============================================================
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward)
SELECT gen_random_uuid(), p.id, v.title, v.description, v.order_index, v.xp_reward
FROM (VALUES
  -- FRANÇAISE
  ('La Blanquette de Veau','Ragoût blanc traditionnel lié à la crème et aux jaunes d''œufs',20,60),
  -- ITALIENNE
  ('Linguine alle Vongole','Pâtes aux palourdes, ail, piment et vin blanc',20,50),
  -- JAPONAISE
  ('Le Tataki de Saumon','Technique de saisie rapide et marinade ponzu',20,40),
  -- CHINOISE
  ('Le Riz Sauté Cantonais','Riz frit au wok avec œuf, porc char siu et petits pois',20,40),
  -- THAÏLANDAISE
  ('Tom Yum Goong','Soupe aigre-douce piquante aux crevettes fraîches',20,55),
  -- INDIENNE
  ('Le Poulet Korma','Curry doux et crémeux aux amandes, yaourt et épices douces',20,50),
  -- MEXICAINE
  ('Les Carnitas','Porc confit effiloché ultra-fondant pour les tacos',20,60),
  -- VÉGÉTARIENNE
  ('La Shakshuka','Œufs pochés dans une sauce tomate et poivrons épicée',20,45),
  -- GRECQUE
  ('L''Horiatiki','La véritable salade grecque sans laitue, avec bloc de féta',20,35),
  -- PÂTISSERIES
  ('Les Cannelés Bordelais','Gâteau caramélisé à l''extérieur, cœur moelleux rhum-vanille',20,65),
  -- BBQ
  ('Le Tomahawk Steak','Cuisson inversée (Reverse Sear) d''une côte de bœuf géante',20,70),
  -- VEGAN
  ('Le Chili Sin Carne','Version végétale du classique tex-mex aux protéines de soja',20,45)
) AS v(title,description,order_index,xp_reward)
JOIN public.paths p ON p.slug = CASE
    WHEN v.title = 'La Blanquette de Veau' THEN 'french'
    WHEN v.title = 'Linguine alle Vongole' THEN 'italian'
    WHEN v.title = 'Le Tataki de Saumon' THEN 'japanese'
    WHEN v.title = 'Le Riz Sauté Cantonais' THEN 'chinese'
    WHEN v.title = 'Tom Yum Goong' THEN 'thai'
    WHEN v.title = 'Le Poulet Korma' THEN 'indian'
    WHEN v.title = 'Les Carnitas' THEN 'mexican'
    WHEN v.title = 'La Shakshuka' THEN 'vegetarian'
    WHEN v.title = 'L''Horiatiki' THEN 'greek'
    WHEN v.title = 'Les Cannelés Bordelais' THEN 'pastry'
    WHEN v.title = 'Le Tomahawk Steak' THEN 'bbq'
    WHEN v.title = 'Le Chili Sin Carne' THEN 'vegan'
END;


-- ============================================================
-- 3. INSERTION DES RECETTES & ASTUCES DE CHEF
-- ============================================================
INSERT INTO public.recipes (id, lesson_id, title, description, emoji, prep_time_min, cook_time_min, servings, difficulty, avg_price_eur, ingredients, instructions, chef_tip, cultural_note)
SELECT gen_random_uuid(), l.id, v.title, v.description, v.emoji, v.prep_time_min::int, v.cook_time_min::int, v.servings::int, v.difficulty, v.avg_price_eur, v.ingredients::jsonb, v.instructions::jsonb, v.chef_tip, v.cultural_note
FROM (VALUES

-- FRANÇAISE : Blanquette de Veau
('La Blanquette de Veau',
 'Blanquette de Veau à l''Ancienne', 'Le summum du réconfort français : une viande tendre dans une sauce blanche soyeuse.', '🍲', '30', '120', '6', 'moyen', '~25€',
 '[{"qty":"1.2kg","item":"épaule ou tendron de veau en cubes"},{"qty":"2","item":"carottes"},{"qty":"1","item":"oignon piqué de 2 clous de girofle"},{"qty":"1 bouquet","item":"garni (thym, laurier, persil)"},{"qty":"250g","item":"champignons de Paris"},{"qty":"15","item":"oignons grelots"},{"qty":"50g","item":"beurre et 50g farine (pour le roux)"},{"qty":"2","item":"jaunes d''œufs"},{"qty":"15cl","item":"crème fraîche épaisse"},{"qty":"1 filet","item":"de jus de citron"}]',
 '["Placez la viande dans une cocotte, couvrez d''eau froide. Portez à ébullition et écumez.","Ajoutez les carottes en rondelles, l''oignon piqué, le bouquet garni, le gros sel. Laissez mijoter 1h30 à feu très doux.","Pendant ce temps, faites glacer les oignons grelots au beurre et cuisez les champignons coupés.","Égouttez la viande (conservez le bouillon). Faites fondre 50g de beurre, ajoutez la farine (roux blanc).","Mouillez progressivement avec le bouillon chaud en fouettant pour obtenir un velouté. Laissez épaissir 10 min.","Dans un bol, fouettez la crème, les jaunes d''œufs et le citron. Incorporez ce mélange hors du feu dans la sauce.","Remettez la viande et la garniture dans la sauce. Réchauffez sans JAMAIS faire bouillir. Servez avec du riz."]',
 'La règle d''or de la blanquette : une fois que la liaison crème/jaunes d''œufs est ajoutée, la sauce ne doit plus jamais bouillir, sinon elle va coaguler (trancher).',
 'Le terme "blanquette" vient de la couleur de la viande et de la sauce : on ne fait jamais colorer ni rissoler les ingrédients.'),

-- ITALIENNE : Linguine alle Vongole
('Linguine alle Vongole',
 'Linguine aux Palourdes', 'Le grand classique de la côte amalfitaine, parfumé à l''iode, l''ail et au vin blanc.', '🍝', '45', '15', '4', 'moyen', '~18€',
 '[{"qty":"1kg","item":"palourdes fraîches (vongole veraci)"},{"qty":"400g","item":"linguine ou spaghetti"},{"qty":"3 gousses","item":"ail"},{"qty":"1","item":"petit piment oiseau (peperoncino)"},{"qty":"15cl","item":"vin blanc sec"},{"qty":"1 botte","item":"de persil plat frais"},{"qty":"5 c.s.","item":"huile d''olive extra vierge"}]',
 '["Purgez les palourdes : faites-les tremper 1h dans de l''eau froide très salée pour retirer le sable. Rincez bien.","Mettez les linguine à cuire dans l''eau bouillante salée (retirez-les 2 min avant la cuisson al dente).","Dans une grande sauteuse, faites dorer l''ail écrasé et le piment dans l''huile d''olive.","Ajoutez les palourdes et le vin blanc. Couvrez immédiatement à feu vif.","Secouez la poêle. Dès que les coquillages sont ouverts (2-3 min), retirez-les du feu (jetez celles qui restent fermées).","Versez les pâtes égouttées dans la sauteuse avec le jus des palourdes. Terminez la cuisson des pâtes dans ce jus (mantecatura).","Ajoutez le persil haché, un filet d''huile crue, et mélangez vigoureusement. Servez chaud."]',
 'Ne mettez JAMAIS de parmesan sur des pâtes aux fruits de mer en Italie, c''est un sacrilège qui écrase la subtilité iodée du plat.',
 'La "spaghettata alle vongole" est le plat traditionnel du réveillon de Noël à Naples et dans tout le sud de l''Italie.'),

-- JAPONAISE : Tataki de Saumon
('Le Tataki de Saumon',
 'Tataki de Saumon au Sésame', 'Du saumon snacké à l''extérieur et fondant à l''intérieur, sauce ponzu.', '🍣', '15', '5', '2', 'facile', '~12€',
 '[{"qty":"300g","item":"pavé de saumon frais (qualité sushi, sans peau)"},{"qty":"3 c.s.","item":"graines de sésame (blanc et noir mélangés)"},{"qty":"1 c.s.","item":"huile de sésame"},{"qty":"Sauce Ponzu:","item":""},{"qty":"3 c.s.","item":"sauce soja"},{"qty":"1 c.s.","item":"jus de yuzu ou citron vert"},{"qty":"1 c.s.","item":"mirin"},{"qty":"1 cm","item":"de gingembre frais râpé"},{"qty":"1","item":"ciboule émincée"}]',
 '["Préparez un bain d''eau rempli de glaçons dans un cul-de-poule.","Enrobez le saumon de graines de sésame en appuyant bien pour les faire adhérer.","Faites chauffer l''huile dans une poêle à feu très vif.","Saisissez le saumon 20 secondes maximum sur chaque face (juste pour dorer le sésame).","Plongez immédiatement le saumon dans le bain d''eau glacée pour stopper la cuisson (technique du tataki).","Égouttez et séchez-le avec du papier absorbant.","Mélangez le soja, le yuzu, le mirin et le gingembre pour la sauce ponzu.","Coupez le saumon en tranches fines. Servez froid nappé de sauce ponzu et de ciboule."]',
 'Pour couper de belles tranches nettes sans écraser le poisson cru, utilisez un couteau très bien aiguisé et nettoyez la lame avec un chiffon humide entre chaque coupe.',
 'Le mot "tataki" signifie "frappé" ou "pilé", faisant référence à la méthode ancienne où le poisson cru était coupé et pilé avec du gingembre.'),

-- CHINOISE : Riz Sauté Cantonais
('Le Riz Sauté Cantonais',
 'Riz Frit Cantonais Authentique', 'Le riz sauté ultime : grains détachés, wok hei fumé et garniture colorée.', '🍚', '15', '10', '4', 'facile', '~6€',
 '[{"qty":"4 tasses","item":"riz blanc cuit LA VEILLE et stocké au frigo"},{"qty":"3","item":"œufs battus"},{"qty":"150g","item":"porc laqué Char Siu (ou jambon) en petits dés"},{"qty":"100g","item":"petits pois frais ou surgelés"},{"qty":"3 tiges","item":"ciboule (séparer le blanc du vert)"},{"qty":"2 c.s.","item":"sauce soja claire"},{"qty":"1 c.c.","item":"huile de sésame grillé"},{"qty":"3 c.s.","item":"huile neutre (arachide ou tournesol)"}]',
 '["Sortez le riz froid du frigo et égrainez-le avec vos doigts mouillés pour séparer chaque grain.","Faites chauffer le wok à blanc jusqu''à ce qu''il fume. Ajoutez 1 c.s. d''huile.","Versez les œufs battus, brouillez-les rapidement en morceaux tendres, retirez-les du wok.","Remettez 2 c.s. d''huile. Faites sauter le blanc des ciboules et le porc en dés.","Ajoutez les petits pois, faites sauter 1 minute.","Ajoutez le riz froid. Faites sauter vigoureusement en pressant le riz contre la paroi chaude du wok pour le griller légèrement.","Assaisonnez avec la sauce soja. Remettez les œufs.","Hors du feu, ajoutez l''huile de sésame et le vert de la ciboule. Servez très chaud."]',
 'Le secret absolu du riz frit : utilisez du riz de la veille ! Le riz fraîchement cuit contient trop d''humidité et donnera une bouillie collante.',
 'Dans les restaurants cantonnais, la maîtrise du wok se juge sur un simple plat de riz frit : les grains doivent "danser" dans le wok (wok hei).'),

-- THAÏLANDAISE : Tom Yum Goong
('Tom Yum Goong',
 'Soupe Tom Yum aux Crevettes', 'L''explosion des saveurs thaïes : aigre, piquant, salé et incroyablement aromatique.', '🍤', '20', '15', '4', 'moyen', '~14€',
 '[{"qty":"400g","item":"crevettes crues entières (conserver les têtes et carapaces)"},{"qty":"1L","item":"eau ou bouillon de poulet léger"},{"qty":"2 tiges","item":"citronnelle fraîche (écrasées)"},{"qty":"5 tranches","item":"galanga frais"},{"qty":"5 feuilles","item":"de combava (lime kaffir) déchirées"},{"qty":"200g","item":"champignons de paille ou de Paris"},{"qty":"3 c.s.","item":"Nam Prik Pao (pâte de piment thaïlandaise)"},{"qty":"3 c.s.","item":"sauce poisson (Nam Pla)"},{"qty":"3 c.s.","item":"jus de citron vert frais"},{"qty":"Coriandre","item":"fraîche pour garnir"}]',
 '["Décortiquez les crevettes en gardant la queue. Gardez les têtes et carapaces.","Dans la casserole, faites bouillir l''eau avec les têtes de crevettes pendant 10 min. Filtrez pour obtenir un bouillon très parfumé.","Remettez ce bouillon sur le feu. Ajoutez la citronnelle écrasée, le galanga et les feuilles de combava. Laissez infuser 5 min.","Ajoutez les champignons et la pâte Nam Prik Pao.","Incorporez les crevettes crues. Dès qu''elles deviennent roses (2 minutes), coupez le feu !","Hors du feu, assaisonnez avec la sauce poisson et le jus de citron vert (l''acidité ne doit pas bouillir).","Servez immédiatement garni de piments frais et de beaucoup de coriandre."]',
 'Ne faites JAMAIS bouillir le jus de citron vert, cela le rendrait amer et détruirait sa fraîcheur. Ajoutez-le toujours à la dernière seconde hors du feu.',
 'C''est la soupe nationale de Thaïlande. "Tom" signifie bouillir, et "Yum" désigne une salade épicée et aigre. "Goong" veut dire crevette.'),

-- INDIENNE : Poulet Korma
('Le Poulet Korma',
 'Poulet Korma Crémeux', 'Un curry d''une douceur incroyable, épaissi à la pâte d''amande et au yaourt.', '🥘', '20', '40', '4', 'moyen', '~12€',
 '[{"qty":"600g","item":"filets de poulet en cubes"},{"qty":"150g","item":"yaourt nature brassé"},{"qty":"50g","item":"poudre d''amandes (ou noix de cajou mixées)"},{"qty":"2","item":"oignons hachés très finement"},{"qty":"3 gousses","item":"ail et 2cm de gingembre râpés en pâte"},{"qty":"1 c.c.","item":"garam masala, 1 c.c. curcuma, 1 c.c. coriandre moulue"},{"qty":"2","item":"gousses de cardamome verte, 1 bâton de cannelle"},{"qty":"10cl","item":"crème liquide"},{"qty":"2 c.s.","item":"Ghee (beurre clarifié)"}]',
 '["Mélangez le poulet avec le yaourt et la moitié des épices en poudre. Laissez mariner 30 min.","Dans une sauteuse, chauffez le ghee. Faites revenir la cardamome et la cannelle 30 secondes pour parfumer le gras.","Ajoutez les oignons. Faites-les rissoler doucement jusqu''à ce qu''ils soient bien dorés et fondants (15 min).","Ajoutez la pâte ail-gingembre et le reste des épices en poudre. Cuisez 2 minutes.","Ajoutez le poulet avec sa marinade et la poudre d''amande. Mélangez bien.","Versez 15cl d''eau, couvrez et laissez mijoter à feu doux 20 minutes.","En fin de cuisson, ajoutez la crème. Laissez chauffer 2 minutes.","Garnissez d''amandes effilées toastées et servez avec du riz basmati."]',
 'Le korma ne doit pas être piquant. Sa richesse vient de la "pâte" formée par les oignons très cuits mélangés à la poudre d''amande ou de noix de cajou.',
 'Le Korma trouve ses origines dans la cuisine impériale moghole du XVIe siècle en Inde du Nord, réputée pour ses plats riches et doux.'),

-- MEXICAINE : Carnitas
('Les Carnitas',
 'Carnitas de Porc (Tacos)', 'L''effiloché de porc confit à la mexicaine, fondant dedans et croustillant dehors.', '🌮', '15', '180', '6', 'facile', '~15€',
 '[{"qty":"1.5kg","item":"épaule de porc (sans os) coupée en gros cubes"},{"qty":"100g","item":"saindoux (ou huile neutre)"},{"qty":"1","item":"orange (jus ET écorce pressée)"},{"qty":"1","item":"oignon coupé en quatre"},{"qty":"4 gousses","item":"ail écrasées"},{"qty":"2 c.c.","item":"origan sec (mexicain idéalement)"},{"qty":"1 c.c.","item":"cumin moulu, 1 c.s. gros sel"},{"qty":"Tortillas","item":"de maïs, coriandre, oignon blanc haché et citron vert pour servir"}]',
 '["Dans une grande marmite ou cocotte en fonte, déposez la viande, le saindoux, l''oignon, l''ail, l''origan, le cumin et le sel.","Pressez l''orange au-dessus et jetez les moitiés d''écorce dans la marmite.","Couvrez à ras avec de l''eau. Portez à ébullition.","Baissez à feu très doux et laissez mijoter à découvert pendant 2h à 2h30, jusqu''à ce que l''eau s''évapore totalement.","Une fois l''eau évaporée, la viande va commencer à frire dans son propre gras (et le saindoux). Laissez dorer 15 minutes en remuant pour obtenir des bords croustillants.","Retirez l''orange, l''oignon et l''ail. Effilochez grossièrement la viande avec deux fourchettes.","Servez très chaud dans des tortillas de maïs chaudes avec coriandre, oignon cru et un filet de citron vert."]',
 'L''acide de l''orange aide à décomposer les fibres de la viande, tandis que le sucre naturel caramélise le porc lors de la phase de friture finale.',
 'C''est la street food par excellence de l''État du Michoacán. Les carnitas (petites viandes) sont traditionnellement cuites dans d''immenses chaudrons en cuivre.'),

-- VÉGÉTARIENNE : Shakshuka
('La Shakshuka',
 'Shakshuka aux Poivrons', 'Œufs mollets pochés dans un bain bouillonnant de tomates et poivrons épicés.', '🍳', '15', '30', '4', 'facile', '~5€',
 '[{"qty":"4","item":"œufs frais"},{"qty":"1","item":"poivron rouge et 1 poivron jaune coupés en lanières"},{"qty":"800g","item":"tomates concassées (boîte ou fraîches)"},{"qty":"1","item":"gros oignon émincé"},{"qty":"3 gousses","item":"ail hachées"},{"qty":"1 c.s.","item":"paprika fumé, 1 c.c. cumin moulu"},{"qty":"1 pincée","item":"piment de Cayenne ou flocons de piment"},{"qty":"3 c.s.","item":"huile d''olive"},{"qty":"Coriandre","item":"et pain pita pour servir"}]',
 '["Faites chauffer l''huile d''olive dans une grande poêle. Faites revenir l''oignon et les poivrons à feu moyen jusqu''à ce qu''ils soient tendres (10-15 min).","Ajoutez l''ail, le paprika, le cumin et le piment. Faites revenir 1 minute pour réveiller les épices.","Versez les tomates concassées, salez et poivrez. Laissez mijoter à feu moyen-doux pendant 15 minutes pour que la sauce réduise et épaississe.","Faites 4 petits \"puits\" dans la sauce épaisse avec le dos d''une cuillère.","Cassez un œuf dans chaque puits.","Couvrez la poêle et laissez cuire 5 à 8 minutes, jusqu''à ce que les blancs soient pris mais les jaunes encore coulants.","Parsemez de coriandre fraîche et servez directement dans la poêle avec du pain frais."]',
 'Pour des œufs parfaits, couvrez la poêle les 3 dernières minutes de cuisson. Cela permet à la vapeur de cuire le blanc sur le dessus sans durcir le jaune en dessous.',
 'Originaire du Maghreb et très populaire au Moyen-Orient (notamment en Israël), la shakshuka est un plat du petit-déjeuner devenu incontournable au brunch mondial.'),

-- GRECQUE : L'Horiatiki
('L''Horiatiki',
 'Véritable Salade Grecque', 'Fraîcheur absolue : tomates gorgées de soleil, concombre croquant et féta pure brebis.', '🥗', '10', '0', '4', 'facile', '~8€',
 '[{"qty":"4","item":"belles tomates très mûres"},{"qty":"1","item":"concombre (non pelé s''il est bio)"},{"qty":"1","item":"oignon rouge coupé en fines rondelles"},{"qty":"1","item":"poivron vert en fines lamelles"},{"qty":"1 poignée","item":"d''olives Kalamata (noires, violettes)"},{"qty":"200g","item":"de Féta (un beau bloc entier, pas en dés !)"},{"qty":"1 c.s.","item":"d''origan séché"},{"qty":"4 c.s.","item":"d''huile d''olive vierge extra grecque"},{"qty":"1 c.s.","item":"vinaigre de vin rouge"}]',
 '["Coupez les tomates en gros morceaux irréguliers (pas en rondelles de carpaccio). Mettez-les dans un grand saladier.","Coupez le concombre en demi-lunes assez épaisses.","Ajoutez le poivron vert et les rondelles d''oignon rouge.","Parsemez d''olives Kalamata.","Assaisonnez les légumes : ajoutez le vinaigre, arrosez très généreusement d''huile d''olive, salez légèrement (la féta est déjà salée). Mélangez bien.","Dressez dans les assiettes ou laissez dans le saladier.","Posez le bloc de féta ENTIER sur le dessus des légumes. Ne le coupez pas en dés.","Saupoudrez la féta d''origan et arrosez-la d''un dernier filet d''huile d''olive. Dégustez avec du pain de campagne."]',
 'La règle absolue de la salade grecque (Horiatiki) : AUCUNE SALADE VERTE (laitue) n''y a sa place. Et la féta se pose toujours en un bloc majestueux sur le dessus !',
 'Horiatiki salata se traduit littéralement par "salade de village" ou "salade paysanne", marquant l''utilisation d''ingrédients bruts des campagnes grecques.'),

-- PÂTISSERIES : Cannelés
('Les Cannelés Bordelais',
 'Cannelés de Bordeaux', 'Caramélisation croustillante à l''extérieur et cœur de flan alvéolé rhum/vanille.', '🧁', '20', '60', '12', 'difficile', '~6€',
 '[{"qty":"50cl","item":"lait entier"},{"qty":"50g","item":"beurre doux"},{"qty":"1","item":"gousse de vanille (fendue et grattée)"},{"qty":"2","item":"œufs entiers + 2 jaunes"},{"qty":"220g","item":"sucre en poudre (cassonade idéale pour la croûte)"},{"qty":"100g","item":"farine"},{"qty":"3 c.s.","item":"vieux rhum brun"}]',
 '["Faites bouillir le lait avec le beurre et la gousse de vanille grattée. Retirez du feu, laissez infuser et tiédir (à 40°C environ).","Dans un cul-de-poule, fouettez doucement les œufs, les jaunes et le sucre sans faire mousser.","Incorporez la farine délicatement au fouet.","Versez le lait tiède (sans la gousse) progressivement en mélangeant doucement pour obtenir une pâte lisse (comme une pâte à crêpes).","Ajoutez le rhum. Laissez refroidir, couvrez et placez au réfrigérateur pendant 24h à 48h. C''EST OBLIGATOIRE.","Le jour de la cuisson, préchauffez le four à 240°C.","Graissez généreusement les moules (idéalement en cuivre, avec du spray de démoulage ou cire d''abeille).","Remuez brièvement la pâte, remplissez les moules à 1 cm du bord.","Enfournez à 240°C pendant 10 minutes (pour saisir et créer la croûte), puis baissez à 180°C pendant 45 à 50 minutes. Démoulez à chaud sur une grille."]',
 'Le repos de la pâte est non négociable. Il permet à l''amidon de la farine de s''hydrater complètement, ce qui donnera la mie alvéolée si recherchée et empêchera les cannelés de "monter" hors du moule en cuisant.',
 'Originaires de Bordeaux au XVIIIe siècle, ces gâteaux auraient été inventés par les religieuses utilisant les jaunes d''œufs laissés par les vignerons (qui utilisaient les blancs pour coller le vin).'),

-- BBQ : Tomahawk Steak
('Le Tomahawk Steak',
 'Tomahawk Reverse Sear', 'La méthode infaillible pour rôtir parfaitement ce steak de bœuf gargantuesque avec son os géant.', '🥩', '10', '60', '2', 'moyen', '~50€',
 '[{"qty":"1 (1.2kg)","item":"Steak Tomahawk (Côte de bœuf avec os long dénudé), très épais (5-6cm)"},{"qty":"Gros sel","item":"Gros sel de mer ou fleur de sel"},{"qty":"Poivre noir","item":"Fraîchement concassé au pilon"},{"qty":"50g","item":"beurre"},{"qty":"2 gousses","item":"ail écrasées"},{"qty":"1 branche","item":"de romarin"}]',
 '["Sortez la viande du frigo 1h avant. Salez très généreusement (le sel pénètre la viande épaisse).","Préparez votre BBQ pour une cuisson INDIRECTE à basse température (110°C - 120°C).","Placez le Tomahawk sur la grille, côté opposé aux braises (cuisson indirecte).","Fermez le couvercle et laissez cuire lentement jusqu''à ce que la température INTERNE de la viande atteigne 45°C (pour du saignant). Comptez environ 45-60 min. Utilisez une sonde !","Retirez la viande. Changez la configuration du BBQ pour une cuisson DIRECTE ultra-violente (sur des braises brûlantes ou au chalumeau).","Saisissez la viande 1 minute de chaque côté pour créer une croûte caramélisée (la réaction de Maillard).","Pendant cette saisie, badigeonnez la viande de beurre fondu infusé à l''ail et au romarin.","Laissez reposer la viande 10 minutes sous un papier d''aluminium lâche avant de la découper."]',
 'La technique du "Reverse Sear" (saisie inversée) garantit une viande uniformément rosée d''un bord à l''autre, sans l''anneau gris surcuit habituel des cuissons classiques à la poêle.',
 'Le nom Tomahawk vient de sa ressemblance avec la hache de guerre des Amérindiens. L''os long est dénudé selon la technique bouchère française du "manchonnage" (Frenching).'),

-- VEGAN : Chili Sin Carne
('Le Chili Sin Carne',
 'Chili Sin Carne Réconfortant', 'L''alternative parfaite et riche en protéines végétales du fameux plat tex-mex.', '🌶️', '20', '40', '4', 'facile', '~6€',
 '[{"qty":"150g","item":"Protéines de Soja Texturées (PST) - petit format (ou haché végétal)"},{"qty":"1 grosse boîte","item":"(400g) de haricots rouges égouttés"},{"qty":"1 petite boîte","item":"de maïs doux égoutté"},{"qty":"800g","item":"de tomates concassées"},{"qty":"1","item":"oignon et 2 gousses d''ail hachés"},{"qty":"1","item":"poivron rouge en dés"},{"qty":"1 cube","item":"bouillon de légumes"},{"qty":"Épices:","item":"2 c.s. chili en poudre, 1 c.c. cumin, 1 c.c. origan"},{"qty":"2 carrés","item":"de chocolat noir (70%)"}]',
 '["Dans un bol, réhydratez les Protéines de Soja Texturées avec le bouillon de légumes bien chaud pendant 10 minutes. Égouttez-les légèrement.","Faites chauffer un peu d''huile dans une cocotte. Faites revenir l''oignon, l''ail et le poivron pendant 5 minutes.","Ajoutez les PST réhydratées, les épices (chili, cumin, origan). Faites revenir 3 minutes pour enrober le soja de saveurs.","Versez les tomates concassées, les haricots rouges et le maïs. Mélangez bien.","Laissez mijoter à découvert et à feu doux pendant 25 à 30 minutes jusqu''à ce que la sauce s''épaississe.","En toute fin de cuisson, hors du feu, ajoutez les deux carrés de chocolat noir et laissez-les fondre en mélangeant.","Servez avec du riz blanc, de l''avocat en tranches et de la coriandre fraîche."]',
 'Le chocolat noir (sans sucre ou peu sucré) est le secret mexicain ultime : il casse l''acidité de la tomate, épaissit la sauce et apporte une profondeur terreuse incroyable, sans donner de goût sucré.',
 'Historiquement, le chili original du Texas (San Antonio) ne contenait pas de haricots, juste de la viande et du piment. Les versions végétales (et celles avec haricots) se sont popularisées plus tard à travers le monde.')

) AS v(lesson_title, title, description, emoji, prep_time_min, cook_time_min, servings, difficulty, avg_price_eur, ingredients, instructions, chef_tip, cultural_note)
JOIN public.lessons l ON l.title = v.lesson_title
ON CONFLICT (lesson_id) DO NOTHING;


-- ============================================================
-- 4. INSERTION DES EXERCICES
-- ============================================================
INSERT INTO public.exercises (id, lesson_id, type, question, data, order_index, xp_reward)
SELECT gen_random_uuid(), l.id, v.type::text, v.question, v.data::jsonb, v.order_index, v.xp_reward
FROM (VALUES

-- Blanquette de Veau
('La Blanquette de Veau','multiple_choice','Pourquoi ce plat s''appelle-t-il la "blanquette" ?',
 '{"options":["Parce que la viande et la sauce doivent rester blanches (aucune coloration)","Parce qu''on y met de la crème fraîche","C''est le nom de la ville d''origine","Parce qu''il y a du vin blanc"],"correctIndex":0}',0,10),
('La Blanquette de Veau','fill_in_blank','L''assemblage final de crème fraîche et de jaunes d''œufs ajouté à la sauce s''appelle la ___.',
 '{"answer":"liaison","hint":"Ce qui vient ''lier'' ou épaissir le velouté en fin de cuisson"}',1,15),
('La Blanquette de Veau','step_ordering','Dans quel ordre préparer la blanquette ?',
 '{"steps":["Blanchir la viande dans l''eau bouillante et écumer","Mijoter 1h30 avec la garniture aromatique","Réaliser un roux blanc et le mouiller avec le bouillon filtré","Ajouter la liaison crème-jaunes d''œufs hors du feu","Napper la viande avec la sauce finale"],"correctOrder":[0,1,2,3,4]}',2,25),

-- Linguine alle Vongole
('Linguine alle Vongole','multiple_choice','En Italie, quel ingrédient ne doit-on absolument JAMAIS rajouter sur ce plat ?',
 '{"options":["Du parmesan ou du pecorino","Du persil","De l''huile d''olive","Du piment"],"correctIndex":0}',0,15),
('Linguine alle Vongole','fill_in_blank','Avant de cuire les palourdes, il est indispensable de les ___ dans l''eau salée pour enlever le sable.',
 '{"answer":"purger","hint":"Processus d''élimination du sable des coquillages"}',1,10),
('Linguine alle Vongole','step_ordering','Dans quel ordre cuire les pâtes aux palourdes ?',
 '{"steps":["Lancer la cuisson des linguine dans l''eau salée","Faire revenir ail et piment dans l''huile","Ajouter les palourdes et le vin blanc, couvrir à feu vif","Retirer les palourdes ouvertes, conserver le jus","Finir la cuisson des pâtes dans le jus des palourdes","Mélanger avec du persil frais"],"correctOrder":[0,1,2,3,4,5]}',2,30),

-- Tataki de Saumon
('Le Tataki de Saumon','multiple_choice','Qu''est-ce qui définit la technique de cuisson du "tataki" ?',
 '{"options":["Une saisie très brève de l''extérieur, en gardant l''intérieur totalement cru","Une cuisson lente à basse température","Un poisson totalement cru mais mariné longuement","Une cuisson à la vapeur"],"correctIndex":0}',0,10),
('Le Tataki de Saumon','fill_in_blank','Dès que le saumon est saisi, on le plonge dans l''eau ___ pour stopper instantanément la cuisson.',
 '{"answer":"glacée","hint":"Eau très froide contenant des glaçons"}',1,15),
('Le Tataki de Saumon','association','Associe les ingrédients de la sauce ponzu à leur rôle :',
 '{"pairs":[{"left":"Sauce soja","right":"Apporte le côté salé et l''umami"},{"left":"Yuzu ou citron","right":"Apporte l''acidité fraîche"},{"left":"Mirin","right":"Apporte de la rondeur et un léger sucré"},{"left":"Gingembre","right":"Apporte la puissance et la chaleur épicée"}]}',2,20),

-- Riz Sauté Cantonais
('Le Riz Sauté Cantonais','multiple_choice','Le secret pour un riz frit qui ne colle pas est de :',
 '{"options":["Utiliser du riz cuit la veille et réfrigéré","Utiliser du riz chaud tout juste sorti de la casserole","Ajouter beaucoup d''eau dans le wok","Utiliser du riz à sushi gluant"],"correctIndex":0}',0,15),
('Le Riz Sauté Cantonais','fill_in_blank','L''arôme légèrement fumé transmis par le wok brûlant s''appelle le Wok ___.',
 '{"answer":"Hei","hint":"Le fameux ''souffle du wok'' en cantonnais"}',1,20),
('Le Riz Sauté Cantonais','step_ordering','Remettre les étapes du wok dans l''ordre :',
 '{"steps":["Brouiller rapidement les œufs dans le wok chaud et les retirer","Faire sauter la garniture (porc, oignon vert, petits pois)","Ajouter le riz froid égrainé","Sauter vigoureusement en pressant le riz sur la paroi du wok","Ajouter la sauce soja, puis réintégrer les œufs"],"correctOrder":[0,1,2,3,4]}',2,25),

-- Tom Yum Goong
('Tom Yum Goong','multiple_choice','Que signifie "Goong" en thaïlandais ?',
 '{"options":["Crevette","Poulet","Soupe","Piquant"],"correctIndex":0}',0,10),
('Tom Yum Goong','fill_in_blank','Il ne faut jamais faire ___ le jus de citron vert dans la soupe, sous peine de le rendre amer.',
 '{"answer":"bouillir","hint":"Action que l''eau fait à 100 degrés"}',1,15),
('Tom Yum Goong','association','Associe ces aromates thaïs incontournables à leur aspect :',
 '{"pairs":[{"left":"Galanga","right":"Rhizome ressemblant au gingembre, goût boisé"},{"left":"Citronnelle","right":"Tige longue et dure à écraser"},{"left":"Combava (Kaffir)","right":"Feuille vert foncé en forme de ''8''"},{"left":"Nam Prik Pao","right":"Pâte de piment épaisse et rougeâtre"}]}',2,20),

-- Poulet Korma
('Le Poulet Korma','multiple_choice','D''où vient l''épaisseur et le côté crémeux de la sauce du Korma ?',
 '{"options":["De la purée d''oignons mijotés et des amandes/noix de cajou mixées","D''un roux (farine + beurre)","Exclusivement de la crème liquide","De la fécule de maïs"],"correctIndex":0}',0,15),
('Le Poulet Korma','fill_in_blank','La matière grasse typique indienne utilisée pour ce plat est le ___.',
 '{"answer":"ghee","hint":"Beurre clarifié, débarrassé de son petit-lait"}',1,10),
('Le Poulet Korma','step_ordering','Les étapes de préparation d''un Korma :',
 '{"steps":["Mariner le poulet dans du yaourt et des épices douces","Faire revenir la cardamome et cannelle dans le ghee chaud","Rissoler longuement les oignons jusqu''à ce qu''ils soient bien fondants","Ajouter la pâte ail-gingembre et le poulet","Incorporer l''eau et la poudre d''amande, laisser mijoter","Finir avec un trait de crème fraîche"],"correctOrder":[0,1,2,3,4,5]}',2,30),

-- Carnitas
('Les Carnitas','multiple_choice','La technique culinaire des carnitas est essentiellement :',
 '{"options":["Un confit (cuisson lente dans le propre gras de la viande et du saindoux)","Une grillade au barbecue","Une cuisson vapeur express","Une friture dans un bain d''huile profonde à 180°C"],"correctIndex":0}',0,15),
('Les Carnitas','fill_in_blank','On ajoute du jus d''___ au début de la cuisson pour caraméliser et dégrader les fibres de la viande.',
 '{"answer":"orange","hint":"Agrume rond, acide et sucré"}',1,10),
('Les Carnitas','step_ordering','Pour réaliser les carnitas de porc :',
 '{"steps":["Placer le porc, l''orange pressée, l''ail et les épices dans une cocotte","Couvrir d''eau à ras et porter à ébullition","Mijoter à feu doux jusqu''à évaporation totale de l''eau (env. 2h)","Laisser la viande frire dans son propre gras pour croustiller","Effilocher la viande avec deux fourchettes"],"correctOrder":[0,1,2,3,4]}',2,25),

-- Shakshuka
('La Shakshuka','multiple_choice','Comment poche-t-on les œufs dans une véritable Shakshuka ?',
 '{"options":["On casse les œufs directement dans de petits creux formés dans la sauce tomate bouillonnante","On les poche dans l''eau bouillante vinaigrée puis on les pose sur la sauce","On les bat en omelette et on les mélange à la sauce","On les cuit à part au plat"],"correctIndex":0}',0,10),
('La Shakshuka','fill_in_blank','L''épice star de la shakshuka, qui lui donne sa saveur terreuse et caractéristique du Moyen-Orient, est le ___.',
 '{"answer":"cumin","hint":"Épice brune au goût fort et chaud"}',1,15),
('La Shakshuka','association','Associe chaque action à son ingrédient pour la Shakshuka :',
 '{"pairs":[{"left":"Émincer finement","right":"L''oignon et les poivrons"},{"left":"Torréfier 1 minute","right":"Le paprika et le cumin dans l''huile chaude"},{"left":"Faire réduire","right":"La pulpe de tomate concassée"},{"left":"Casser délicatement","right":"Les œufs frais"}]}',2,20),

-- L'Horiatiki
('L''Horiatiki','multiple_choice','Qu''est-ce qu''il n''y a JAMAIS dans une vraie salade grecque villageoise (Horiatiki) ?',
 '{"options":["De la salade verte (laitue)","De l''oignon rouge","Du concombre","De l''huile d''olive"],"correctIndex":0}',0,10),
('L''Horiatiki','fill_in_blank','En Grèce, la feta n''est pas servie en petits dés, mais posée en un gros ___ sur le dessus des légumes.',
 '{"answer":"bloc","hint":"Morceau rectangulaire massif"}',1,15),
('L''Horiatiki','step_ordering','Dresser une Horiatiki dans les règles de l''art :',
 '{"steps":["Couper les tomates en gros morceaux irréguliers","Trancher le concombre en demi-lunes, l''oignon et le poivron en lamelles","Mélanger les légumes avec l''huile d''olive, le vinaigre, et ajouter les olives Kalamata","Déposer le pavé de Féta entier au centre du saladier","Saupoudrer la féta d''origan et arroser d''un dernier trait d''huile"],"correctOrder":[0,1,2,3,4]}',2,25),

-- Les Cannelés
('Les Cannelés Bordelais','multiple_choice','Quelle est la particularité indispensable de la pâte à cannelé ?',
 '{"options":["Elle doit reposer de 24 à 48h au réfrigérateur avant cuisson","Elle doit lever comme une pâte à pain","Elle est cuite au bain-marie","On la monte au batteur électrique pour qu''elle soit très mousseuse"],"correctIndex":0}',0,15),
('Les Cannelés Bordelais','fill_in_blank','Le moule traditionnel pour obtenir une belle caramélisation du cannelé est en ___.',
 '{"answer":"cuivre","hint":"Métal de couleur rougeâtre, excellent conducteur de chaleur"}',1,10),
('Les Cannelés Bordelais','association','Associe le concept du cannelé à sa description :',
 '{"pairs":[{"left":"Croûte","right":"Extrêmement caramélisée, sombre et croquante"},{"left":"Cœur","right":"Moelleux, humide, alvéolé et jaune"},{"left":"Cuisson initiale","right":"Saisie choc thermique à 240°C pour figer l''extérieur"},{"left":"Cuisson longue","right":"45 min à 180°C pour cuire l''intérieur en flan"}]}',2,20),

-- Le Tomahawk
('Le Tomahawk Steak','multiple_choice','En quoi consiste la méthode du "Reverse Sear" (Saisie Inversée) ?',
 '{"options":["Cuire lentement au four/BBQ à basse température, PUIS saisir très fort à la fin","Saisir très fort dans la poêle, PUIS terminer au four doucement","Faire bouillir la viande avant de la griller","Saisir sur la grille gelée"],"correctIndex":0}',0,15),
('Le Tomahawk Steak','fill_in_blank','Le Tomahawk est en fait une côte de bœuf dont l''os a été longuement ___, le faisant ressembler à une hache amérindienne.',
 '{"answer":"dénudé","hint":"Manchonné. Action de retirer la viande autour de l''os"}',1,15),
('Le Tomahawk Steak','step_ordering','Les étapes de la Saisie Inversée (Reverse Sear) :',
 '{"steps":["Sortir la viande et la saler très généreusement au gros sel","Placer la viande en zone de cuisson indirecte (BBQ à 110°C)","Surveiller au thermomètre jusqu''à 45°C à cœur","Retirer la viande et faire chauffer le BBQ au maximum de sa puissance (braises ardentes)","Saisir la viande 1 min par face pour créer une croûte (réaction de Maillard)","Laisser reposer 10 min sous un aluminium avant découpe"],"correctOrder":[0,1,2,3,4,5]}',2,35),

-- Le Chili Sin Carne
('Le Chili Sin Carne','multiple_choice','Le secret pour épaissir la sauce du chili et couper l''acidité de la tomate, sans rajouter de sel ou de sucre artificiel, est d''ajouter :',
 '{"options":["Du chocolat noir (carré de 70% et plus)","De la farine de maïs blanche","Du lait de coco","Un verre d''eau glacée"],"correctIndex":0}',0,15),
('Le Chili Sin Carne','fill_in_blank','Avant de les cuisiner, il faut ___ les protéines de soja texturées (PST) dans un bouillon d''eau chaude.',
 '{"answer":"réhydrater","hint":"Action de redonner de l''eau à un produit sec"}',1,10),
('Le Chili Sin Carne','step_ordering','Préparation du Chili vegan :',
 '{"steps":["Réhydrater les PST dans un bouillon chaud 10 min","Faire revenir l''oignon, l''ail et le poivron à l''huile","Ajouter les PST égouttées et torréfier les épices (chili, cumin, origan)","Verser les haricots rouges, le maïs et la tomate concassée","Laisser mijoter 30 minutes jusqu''à obtenir une sauce épaisse","Hors du feu, incorporer le chocolat noir pour lier le tout"],"correctOrder":[0,1,2,3,4,5]}',2,30)

) AS v(lesson_title, type, question, data, order_index, xp_reward)
JOIN public.lessons l ON l.title = v.lesson_title
ON CONFLICT DO NOTHING;


-- ============================================================
-- RecipeQuest — Ajout de 10 Recettes Végétariennes
-- ============================================================

-- ============================================================
-- 1. INSERTION DES 10 NOUVELLES LEÇONS VÉGÉTARIENNES
-- ============================================================
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward)
SELECT gen_random_uuid(), p.id, v.title, v.description, v.order_index, v.xp_reward
FROM (VALUES
  ('Le Dahl de Lentilles Corail', 'Plat indien réconfortant, rapide et riche en protéines végétales', 1, 35),
  ('Les Galettes de Quinoa', 'Technique pour lier et poêler des galettes végétales sans qu''elles ne se cassent', 2, 40),
  ('Le Burger Végétarien', 'Réaliser un vrai steak végétal bluffant aux haricots noirs', 3, 50),
  ('Le Crumble Salé aux Légumes', 'Légumes du soleil fondants sous une croûte sablée au parmesan', 4, 45),
  ('Les Aubergines Farcies', 'Technique de rôtissage en demi-lunes et farce méditerranéenne', 5, 40),
  ('Les Polpettes d''Aubergine', 'L''alternative végétarienne ultime aux boulettes de viande', 6, 55),
  ('Le Tofu Sauté aux Brocolis', 'Apprendre à presser et mariner le tofu pour qu''il soit croustillant et savoureux', 7, 45),
  ('La Courge Butternut Farcie', 'Plat d''automne spectaculaire, rôti au four avec champignons et châtaignes', 8, 60),
  ('Le Curry de Pois Chiches', 'Curry minute au lait de coco, épinards et épices torréfiées', 9, 35),
  ('La Tarte Rustique à la Tomate', 'Pâte brisée sans moule et astuce anti-détrempage des tomates', 10, 45)
) AS v(title, description, order_index, xp_reward)
CROSS JOIN (SELECT id FROM public.paths WHERE slug='vegetarian' LIMIT 1) p
ON CONFLICT DO NOTHING;

-- ============================================================
-- 2. INSERTION DES 10 RECETTES ASSOCIÉES
-- ============================================================
INSERT INTO public.recipes (id, lesson_id, title, description, emoji, prep_time_min, cook_time_min, servings, difficulty, avg_price_eur, ingredients, instructions, chef_tip, cultural_note)
SELECT gen_random_uuid(), l.id, v.title, v.description, v.emoji, v.prep_time_min::int, v.cook_time_min::int, v.servings::int, v.difficulty, v.avg_price_eur, v.ingredients::jsonb, v.instructions::jsonb, v.chef_tip, v.cultural_note
FROM (VALUES

('Le Dahl de Lentilles Corail',
 'Dahl de Lentilles Corail au Lait de Coco', 'Un ragoût indien végétalien, onctueux et parfumé, parfait pour les soirs de semaine.', '🍲', '10', '20', '4', 'facile', '~5€',
 '[{"qty":"250g","item":"lentilles corail"},{"qty":"400ml","item":"lait de coco"},{"qty":"400g","item":"tomates concassées en boîte"},{"qty":"1","item":"oignon haché"},{"qty":"2 gousses","item":"ail et 1 morceau de gingembre râpés"},{"qty":"Épices:","item":"1 c.c. curcuma, 1 c.c. cumin, 1 c.c. coriandre en poudre"},{"qty":"Coriandre","item":"fraîche pour le service"}]',
 '["Rincez abondamment les lentilles corail à l''eau froide jusqu''à ce que l''eau soit claire.","Dans une sauteuse, faites chauffer un filet d''huile. Faites revenir l''oignon, l''ail et le gingembre pendant 3 min.","Ajoutez les épices (curcuma, cumin, coriandre). Mélangez 1 min pour les torréfier et libérer leurs arômes.","Ajoutez les lentilles, les tomates concassées et le lait de coco.","Portez à frémissement, couvrez et laissez mijoter à feu doux pendant 15 à 20 min.","Salez en fin de cuisson. Ajoutez un peu d''eau si le dahl est trop épais.","Servez chaud avec du riz basmati ou des naans, parsemé de coriandre fraîche."]',
 'Ne salez jamais les lentilles en début de cuisson, cela durcit leur peau et rallonge considérablement le temps de cuisson. Salez toujours à la fin.',
 'Le terme "Dal" désigne en Inde à la fois la légumineuse (lentille, pois) et le plat épicé qui en est fait. C''est la base de l''alimentation végétarienne indienne.'),

('Les Galettes de Quinoa',
 'Galettes de Quinoa et Courgettes', 'Des petites galettes croustillantes à l''extérieur et moelleuses à l''intérieur.', '🧆', '15', '15', '4', 'facile', '~6€',
 '[{"qty":"150g","item":"quinoa cru (à cuire) ou 400g de quinoa déjà cuit"},{"qty":"1","item":"courgette moyenne râpée"},{"qty":"2","item":"œufs"},{"qty":"70g","item":"fromage râpé (emmental ou cheddar)"},{"qty":"3 c.s.","item":"farine ou chapelure"},{"qty":"1 gousse","item":"ail hachée"},{"qty":"Huile","item":"d''olive pour la cuisson"}]',
 '["Faites cuire le quinoa, égouttez-le bien et laissez-le tiédir.","Râpez la courgette. Mettez-la dans un torchon propre et pressez fort pour extraire un maximum d''eau.","Dans un grand bol, mélangez le quinoa, la courgette pressée, les œufs, le fromage, la farine, l''ail, le sel et le poivre.","Laissez reposer le mélange 10 minutes (important pour que la farine absorbe l''humidité).","Faites chauffer un fond d''huile dans une poêle à feu moyen.","Formez des galettes avec vos mains et déposez-les dans la poêle.","Faites cuire 4 à 5 minutes par face jusqu''à ce qu''elles soient bien dorées et croustillantes."]',
 'L''étape d''essorage de la courgette est cruciale. Si vous laissez l''eau de végétation, vos galettes vont se disloquer à la cuisson.',
 'Le quinoa n''est pas une céréale mais la graine d''une plante de la famille des épinards (une pseudo-céréale). Il est cultivé dans les Andes depuis plus de 5000 ans.'),

('Le Burger Végétarien',
 'Burger Végétarien aux Haricots Noirs', 'Oubliez les steaks de soja fades, ce steak aux haricots noirs est ultra gourmand !', '🍔', '15', '10', '4', 'moyen', '~8€',
 '[{"qty":"1 boîte","item":"(400g) de haricots noirs égouttés et rincés"},{"qty":"1/2","item":"oignon rouge haché très finement"},{"qty":"50g","item":"maïs doux en grains"},{"qty":"50g","item":"chapelure (ou flocons d''avoine mixés)"},{"qty":"1 c.s.","item":"concentré de tomate"},{"qty":"Épices:","item":"1 c.c. paprika fumé, 1 c.c. cumin"},{"qty":"4","item":"pains à burger, salade, tomate, avocat"}]',
 '["Pour un steak parfait : étalez les haricots noirs sur une plaque et passez-les au four à 180°C pendant 10 min pour les assécher légèrement.","Dans un bol, écrasez grossièrement les haricots à la fourchette (ne les mixez pas en purée, gardez de la texture).","Ajoutez l''oignon, le maïs, la chapelure, le concentré de tomate et les épices. Mélangez bien avec les mains.","Formez 4 steaks bien tassés.","Faites chauffer de l''huile dans une poêle. Cuisez les steaks 4 minutes de chaque côté pour créer une belle croûte.","Faites toaster vos pains, tartinez de sauce (mayo ou houmous), ajoutez le steak, la salade, la tomate et des tranches d''avocat."]',
 'Passer les haricots en boîte quelques minutes au four permet d''évaporer l''excès d''humidité : c''est le secret des chefs pour un burger végétal qui se tient parfaitement à la cuisson.',
 'Le premier burger végétarien commercial a été créé à Londres en 1982 par Gregory Sams, sous le nom de "VegeBurger".'),

('Le Crumble Salé aux Légumes',
 'Crumble de Légumes du Soleil au Parmesan', 'Le croquant du crumble salé sur des légumes d''été fondants.', '🥧', '20', '40', '4', 'facile', '~7€',
 '[{"qty":"2","item":"courgettes et 2 tomates coupées en dés"},{"qty":"1","item":"oignon émincé"},{"qty":"2 c.s.","item":"huile d''olive et herbes de Provence"},{"qty":"Pâte à crumble:","item":""},{"qty":"100g","item":"farine"},{"qty":"80g","item":"beurre FROID en petits dés"},{"qty":"80g","item":"parmesan râpé"},{"qty":"50g","item":"poudre d''amandes ou de noisettes"}]',
 '["Faites revenir l''oignon, les courgettes et les tomates dans l''huile d''olive à la poêle pendant 10 min pour évaporer leur eau. Salez, poivrez, ajoutez les herbes.","Transvasez les légumes dans un plat à gratin.","Préparez la pâte : dans un saladier, mélangez la farine, le parmesan et la poudre d''amandes.","Ajoutez le beurre bien froid. Frottez le mélange entre vos doigts (technique du sablage) jusqu''à obtenir une texture de gros sable granuleux.","Répartissez cette pâte émiettée sur les légumes.","Enfournez à 200°C pendant 25 à 30 minutes, jusqu''à ce que le crumble soit bien doré.","Servez chaud ou tiède avec une salade verte."]',
 'Ne pétrissez surtout pas la pâte à crumble ! Il faut utiliser le bout des doigts pour ne pas réchauffer le beurre, sinon vous obtiendrez une pâte compacte au lieu d''un sable croustillant.',
 'Le crumble (qui signifie "émietter" en anglais) a été inventé au Royaume-Uni pendant la Seconde Guerre mondiale, le rationnement rendant difficile la préparation de pâtes à tarte classiques.'),

('Les Aubergines Farcies',
 'Aubergines Farcies Quinoa et Féta', 'Un plat méditerranéen généreux, sain et plein de soleil.', '🍆', '15', '45', '4', 'facile', '~9€',
 '[{"qty":"2","item":"belles aubergines"},{"qty":"150g","item":"quinoa (cuit)"},{"qty":"100g","item":"féta émiettée"},{"qty":"2","item":"tomates coupées en petits dés"},{"qty":"30g","item":"pignons de pin ou amandes concassées"},{"qty":"Menthe","item":"et basilic frais hachés"},{"qty":"Huile","item":"d''olive, sel et poivre"}]',
 '["Coupez les aubergines en deux dans la longueur. Quadrillez la chair avec la pointe d''un couteau (sans percer la peau).","Badigeonnez généreusement d''huile d''olive, salez et enfournez à 200°C pendant 30 min (la chair doit être très tendre).","Pendant ce temps, mélangez le quinoa cuit, les dés de tomates, la féta, les pignons torréfiés et les herbes fraîches.","Sortez les aubergines du four. À l''aide d''une cuillère, aplatissez la chair cuite pour creuser un petit \"bateau\".","Remplissez généreusement avec la farce au quinoa.","Remettez au four pendant 10-15 minutes pour gratiner légèrement.","Versez un dernier filet d''huile d''olive crue avant de servir."]',
 'Quadriller la chair de l''aubergine permet à la chaleur et à l''huile de pénétrer au cœur du légume, garantissant une cuisson fondante et homogène.',
 'Ce plat est un clin d''œil à la recette turque "Imam Bayildi" (l''imam s''est pâmé), dont la légende raconte qu''un imam s''est évanoui de plaisir en la goûtant.'),

('Les Polpettes d''Aubergine',
 'Polpettes Végétariennes à l''Italienne', 'Des boulettes sans viande fondantes à l''intérieur, servies dans une sauce tomate.', '🧆', '20', '30', '4', 'moyen', '~7€',
 '[{"qty":"2","item":"grosses aubergines (cuites et réduites en purée)"},{"qty":"150g","item":"chapelure (plus ou moins selon l''humidité)"},{"qty":"80g","item":"parmesan ou pecorino râpé"},{"qty":"1","item":"œuf"},{"qty":"1 gousse","item":"d''ail et 1 botte de basilic hachés"},{"qty":"400g","item":"coulis de tomate (passata)"},{"qty":"Huile","item":"de friture ou d''olive"}]',
 '["Faites cuire les aubergines (au four ou à la vapeur) jusqu''à ce qu''elles soient très tendres. Récupérez la chair et hachez-la grossièrement au couteau.","Égouttez bien la chair d''aubergine dans une passoire pour retirer son eau.","Mélangez l''aubergine avec l''œuf, le parmesan, l''ail, le basilic, le sel et le poivre.","Ajoutez la chapelure progressivement jusqu''à pouvoir former des boulettes qui se tiennent. Laissez reposer 15 min.","Formez des boulettes de la taille d''une noix.","Faites-les dorer à la poêle dans un bon fond d''huile d''olive pendant 5 minutes.","Ajoutez le coulis de tomate dans la poêle, baissez le feu et laissez mijoter 15 minutes.","Servez avec des pâtes ou du bon pain de campagne."]',
 'Si votre préparation est trop molle, n''ajoutez pas trop de chapelure d''un coup (les boulettes deviendraient dures). Laissez plutôt reposer la pâte 15 min au frigo, elle va se raffermir.',
 'La "Polpetta di Melanzane" est un classique de la "cucina povera" (cuisine pauvre) du sud de l''Italie, notamment en Calabre et dans les Pouilles, où la viande était un luxe.'),

('Le Tofu Sauté aux Brocolis',
 'Tofu Croustillant et Brocolis au Sésame', 'Le secret asiatique pour un tofu ferme, croustillant et plein de goût.', '🥢', '15', '15', '2', 'moyen', '~6€',
 '[{"qty":"250g","item":"tofu ferme"},{"qty":"1 tête","item":"de brocoli coupée en petites fleurettes"},{"qty":"2 c.s.","item":"Maïzena (fécule de maïs)"},{"qty":"Sauce:","item":""},{"qty":"4 c.s.","item":"sauce soja (ou tamari)"},{"qty":"1 c.s.","item":"sirop d''érable ou sucre roux"},{"qty":"1 c.s.","item":"huile de sésame grillé"},{"qty":"1 gousse","item":"ail et 1cm de gingembre râpés"}]',
 '["Étape cruciale : enroulez le bloc de tofu dans un torchon propre et posez un poids dessus (une casserole lourde) pendant 15 min pour le presser et vider son eau.","Coupez le tofu pressé en dés de 2 cm. Mettez-les dans un sac congélation avec la Maïzena et secouez pour bien les enrober.","Dans un wok ou une poêle avec de l''huile, faites dorer le tofu sur toutes les faces (5-8 min) pour qu''il soit ultra-croustillant. Réservez.","Dans la même poêle, faites sauter les brocolis avec un fond d''eau pendant 4 min (ils doivent rester croquants).","Mélangez tous les ingrédients de la sauce.","Remettez le tofu dans la poêle avec les brocolis, versez la sauce et mélangez vigoureusement 1 minute pour glacer le tout.","Servez immédiatement avec des graines de sésame et du riz blanc."]',
 'L''enrobage à la Maïzena (fécule) est la technique des restaurants asiatiques pour obtenir une croûte très croustillante qui va parfaitement accrocher la sauce sirupeuse ensuite.',
 'Le tofu (ou fromage de soja) a été inventé en Chine il y a plus de 2000 ans, sous la dynastie Han. C''est l''une des plus anciennes sources de protéines végétales transformées.'),

('La Courge Butternut Farcie',
 'Butternut Farcie aux Champignons et Châtaignes', 'Le plat festif par excellence, à présenter entier au centre de la table.', '🎃', '15', '50', '4', 'facile', '~10€',
 '[{"qty":"1","item":"belle courge butternut"},{"qty":"200g","item":"champignons de Paris ou forestiers"},{"qty":"100g","item":"châtaignes cuites (en bocal)"},{"qty":"100g","item":"riz sauvage ou mélange de céréales (cuit)"},{"qty":"1","item":"oignon rouge haché"},{"qty":"Herbes:","item":"thym frais, romarin"},{"qty":"Huile","item":"d''olive, sel, poivre"}]',
 '["Coupez la butternut en deux dans la longueur et évidez les graines.","Quadrillez légèrement la chair, badigeonnez d''huile, salez. Enfournez à 200°C face vers le haut pendant 35-40 min (la chair doit être tendre).","Dans une poêle, faites revenir l''oignon avec les champignons coupés en morceaux jusqu''à coloration.","Ajoutez les châtaignes émiettées, le riz cuit, le thym et le romarin. Faites sauter 3 minutes.","Sortez la courge du four. Si le creux n''est pas assez grand, évidez un peu de chair cuite et mélangez-la à la poêle avec la farce.","Remplissez généreusement les cavités de la butternut avec la farce.","Remettez au four 10 minutes. Servez chaud."]',
 'Ne jetez pas les graines de la butternut ! Lavez-les, séchez-les, enrobez-les d''huile et d''épices, et faites-les rôtir 15 min au four : un apéritif anti-gaspi parfait.',
 'Les courges d''hiver (comme la butternut) sont originaires des Amériques où elles étaient cultivées par les populations indigènes avec le maïs et les haricots ("les trois sœurs").'),

('Le Curry de Pois Chiches',
 'Curry de Pois Chiches Express', 'L''allié des soirs pressés : prêt en 20 minutes, riche, crémeux et parfumé.', '🍛', '10', '20', '4', 'facile', '~4€',
 '[{"qty":"1 grosse boîte","item":"(400g) de pois chiches égouttés"},{"qty":"250ml","item":"lait de coco (en conserve)"},{"qty":"200g","item":"coulis de tomate"},{"qty":"100g","item":"jeunes pousses d''épinards fraîches"},{"qty":"1","item":"oignon émincé"},{"qty":"2 c.s.","item":"pâte de curry jaune ou rouge (selon goût)"},{"qty":"1 c.s.","item":"huile de coco ou d''olive"}]',
 '["Faites chauffer l''huile dans une cocotte. Faites fondre l''oignon 3 minutes.","Ajoutez la pâte de curry. Faites-la revenir 1 minute pour \"réveiller\" les épices (ça doit embaumer la cuisine).","Versez les pois chiches, le coulis de tomate et le lait de coco. Bien mélanger.","Portez à petite ébullition et laissez mijoter 15 minutes pour que la sauce réduise et épaississe légèrement.","Juste avant de servir, éteignez le feu et jetez les feuilles d''épinards dans la sauce chaude. Elles vont fondre en 30 secondes.","Ajoutez un filet de jus de citron vert.","Servez immédiatement avec du riz thaï."]',
 'Le secret d''un bon curry est de faire revenir la pâte (ou les épices en poudre) dans la matière grasse chaude avant d''ajouter les liquides. Les huiles essentielles des épices sont liposolubles !',
 'Le "Chana Masala" (curry de pois chiches) est le plat végétarien le plus populaire en Inde et au Pakistan, souvent vendu dans la rue et mangé au petit-déjeuner avec du pain frit.'),

('La Tarte Rustique à la Tomate',
 'Tarte Rustique Tomates, Moutarde et Thym', 'Sans moule, sans stress : la tarte à l''ancienne au look irrésistible.', '🍅', '15', '35', '4', 'facile', '~6€',
 '[{"qty":"1","item":"pâte brisée (pur beurre si possible)"},{"qty":"4","item":"belles tomates (variétés anciennes colorées idéalement)"},{"qty":"2 c.s.","item":"moutarde de Dijon ou à l''ancienne"},{"qty":"2 c.s.","item":"semoule de blé fine (ou chapelure)"},{"qty":"1 c.s.","item":"thym ou herbes de Provence"},{"qty":"1 filet","item":"d''huile d''olive"}]',
 '["Préchauffez le four à 200°C. Coupez les tomates en rondelles épaisses de 5 mm. Astuce : posez-les sur du papier absorbant pour enlever l''excédent d''eau.","Déroulez la pâte brisée directement sur la plaque du four recouverte de papier cuisson.","Étalez la moutarde sur la pâte, en laissant un bord vide de 4 centimètres tout autour.","Saupoudrez la semoule fine ou la chapelure sur la moutarde.","Disposez joliment les rondelles de tomates en rosace sur le fond de tarte.","Salez, poivrez, ajoutez le thym et un filet d''huile d''olive.","Rabattez les bords libres de la pâte sur les tomates, en plissant grossièrement.","Enfournez pour 35 à 40 minutes. La croûte doit être bien dorée. Servez tiède."]',
 'Le combo moutarde + semoule étalé sur le fond de tarte est imparable : la semoule va boire le jus rendu par les tomates pendant la cuisson, garantissant une pâte croustillante et jamais détrempée.',
 'La tarte rustique (ou "galette" en pâtisserie anglaise) est la plus ancienne forme de tarte. Avant l''invention des cercles et moules en métal, on repliait simplement la pâte sur les fruits ou légumes.')

) AS v(lesson_title, title, description, emoji, prep_time_min, cook_time_min, servings, difficulty, avg_price_eur, ingredients, instructions, chef_tip, cultural_note)
JOIN public.lessons l ON l.title = v.lesson_title
ON CONFLICT (lesson_id) DO NOTHING;

-- ============================================================
-- 3. INSERTION DES EXERCICES VÉGÉTARIENS
-- ============================================================
INSERT INTO public.exercises (id, lesson_id, type, question, data, order_index, xp_reward)
SELECT gen_random_uuid(), l.id, v.type::text, v.question, v.data::jsonb, v.order_index, v.xp_reward
FROM (VALUES

('Le Dahl de Lentilles Corail','multiple_choice','À quel moment doit-on saler les lentilles corail ?',
 '{"options":["À la toute fin de la cuisson","Dès le début, dans l''eau de cuisson","Pendant qu''on fait revenir les épices","Jamais, on ne sale pas un dahl"],"correctIndex":0}',0,10),
('Le Dahl de Lentilles Corail','fill_in_blank','Le terme indien "Dal" désigne à la fois le plat mijoté et la ___ elle-même.',
 '{"answer":"légumineuse","hint":"La famille botanique des lentilles et pois chiches"}',1,15),
('Le Dahl de Lentilles Corail','step_ordering','Ordre de préparation du dahl :',
 '{"steps":["Rincer abondamment les lentilles corail","Faire revenir l''oignon, l''ail et le gingembre","Torréfier les épices (curcuma, cumin, coriandre) 1 minute","Ajouter les lentilles, les tomates et le lait de coco","Laisser mijoter 15 à 20 minutes","Saler en fin de cuisson"],"correctOrder":[0,1,2,3,4,5]}',2,25),

('Les Galettes de Quinoa','multiple_choice','Pourquoi est-il crucial d''essorer fortement la courgette râpée ?',
 '{"options":["Pour éviter que l''eau ne disloque les galettes à la cuisson","Pour concentrer son goût","Pour enlever l''amertume","Pour qu''elle cuise plus vite"],"correctIndex":0}',0,10),
('Les Galettes de Quinoa','fill_in_blank','Une fois le mélange préparé, il faut le laisser ___ 10 minutes pour que la farine absorbe l''humidité.',
 '{"answer":"reposer","hint":"Action d''attendre sans rien faire"}',1,15),
('Les Galettes de Quinoa','step_ordering','Préparation des galettes végétales :',
 '{"steps":["Cuire le quinoa et le laisser tiédir","Râper la courgette et la presser fort dans un torchon","Mélanger quinoa, courgette, œufs, fromage et farine","Laisser la préparation reposer 10 minutes","Former les galettes à la main","Cuire à la poêle 4 à 5 min par face jusqu''à ce qu''elles soient dorées"],"correctOrder":[0,1,2,3,4,5]}',2,30),

('Le Burger Végétarien','multiple_choice','L''astuce de chef pour un steak de haricots noirs qui se tient bien à la cuisson est de :',
 '{"options":["Passer les haricots égouttés 10 minutes au four pour les assécher","Les réduire en bouillie très fine au mixeur","Ajouter 3 œufs","Les cuire dans l''eau bouillante"],"correctIndex":0}',0,15),
('Le Burger Végétarien','fill_in_blank','Il faut écraser les haricots à la fourchette sans les réduire en purée totale afin de conserver de la ___.',
 '{"answer":"texture","hint":"Ce qu''on ressent en mâchant (le croquant, le moelleux...)"}',1,10),
('Le Burger Végétarien','step_ordering','Réaliser les steaks végétaux :',
 '{"steps":["Étaler les haricots noirs sur une plaque et les assécher au four","Écraser grossièrement les haricots à la fourchette","Incorporer oignon, maïs, chapelure, concentré de tomate et épices","Former 4 steaks bien tassés avec les mains","Saisir les steaks à la poêle huilée 4 min par face","Toaster les pains et dresser les burgers"],"correctOrder":[0,1,2,3,4,5]}',2,25),

('Le Crumble Salé aux Légumes','multiple_choice','Quelle est la bonne technique pour préparer une pâte à crumble ?',
 '{"options":["Le sablage : frotter le beurre et les poudres du bout des doigts sans pétrir","Le pétrissage : malaxer vigoureusement 5 minutes","La fonte : verser le beurre fondu chaud sur la farine","Le fouettage au batteur électrique"],"correctIndex":0}',0,15),
('Le Crumble Salé aux Légumes','fill_in_blank','Pour réussir le sablage, le beurre utilisé doit être coupé en dés et surtout bien ___.',
 '{"answer":"froid","hint":"Température sortant du frigo"}',1,10),
('Le Crumble Salé aux Légumes','step_ordering','Étapes du crumble aux légumes :',
 '{"steps":["Faire revenir les légumes à la poêle pour évaporer leur eau","Transvaser les légumes précuits dans un plat à gratin","Mélanger farine, parmesan et poudre d''amandes","Sabler avec le beurre bien froid du bout des doigts","Répartir la pâte émiettée sur les légumes","Enfourner à 200°C pendant 25 à 30 minutes"],"correctOrder":[0,1,2,3,4,5]}',2,30),

('Les Aubergines Farcies','multiple_choice','Quel est l''intérêt de quadriller la chair de l''aubergine avant de l''enfourner ?',
 '{"options":["Permettre à la chaleur et à l''huile de pénétrer à cœur pour une cuisson fondante","C''est purement décoratif","Pour éviter que la peau ne craque","Pour retirer l''amertume"],"correctIndex":0}',0,10),
('Les Aubergines Farcies','fill_in_blank','Après la première cuisson, on aplatit la chair de l''aubergine avec une cuillère pour creuser un petit "___" qui accueillera la farce.',
 '{"answer":"bateau","hint":"Petit navire (métaphore pour la forme creusée)"}',1,15),
('Les Aubergines Farcies','step_ordering','Préparer les aubergines farcies :',
 '{"steps":["Couper les aubergines en deux et quadriller la chair","Badigeonner d''huile, saler et rôtir 30 min au four à 200°C","Mélanger le quinoa avec féta, tomates, pignons et herbes fraîches","Sortir les aubergines et aplatir la chair pour former un creux","Garnir généreusement les aubergines de farce au quinoa","Gratiner au four 10 à 15 minutes"],"correctOrder":[0,1,2,3,4,5]}',2,25),

('Les Polpettes d''Aubergine','multiple_choice','Que faire si votre préparation à polpettes est trop molle avant de former les boulettes ?',
 '{"options":["La laisser reposer 15 min au frigo pour qu''elle se raffermisse","Verser 500g de chapelure d''un coup (au risque de les rendre dures)","Les cuire au micro-ondes","Ajouter de l''eau"],"correctIndex":0}',0,15),
('Les Polpettes d''Aubergine','fill_in_blank','Le mot "Polpetta" est le terme classique italien pour désigner une ___.',
 '{"answer":"boulette","hint":"Petite boule de viande (ou de légumes ici)"}',1,10),
('Les Polpettes d''Aubergine','step_ordering','Préparation des Polpettes :',
 '{"steps":["Cuire les aubergines, récupérer la chair et la hacher","Égoutter fortement la chair pour retirer l''eau","Mélanger avec œuf, parmesan, ail, basilic et chapelure","Former des boulettes de la taille d''une noix","Dorer les boulettes à la poêle dans l''huile d''olive (5 min)","Ajouter le coulis de tomate et laisser mijoter 15 min"],"correctOrder":[0,1,2,3,4,5]}',2,35),

('Le Tofu Sauté aux Brocolis','multiple_choice','Quelle est la première étape absolument indispensable pour obtenir un tofu ultra-croustillant ?',
 '{"options":["Le presser sous un poids pendant 15 min pour vider son eau","Le faire mariner toute une nuit dans l''huile","Le couper en tranches très fines","Le faire bouillir 10 minutes"],"correctIndex":0}',0,15),
('Le Tofu Sauté aux Brocolis','fill_in_blank','Pour créer une croûte parfaite qui accrochera la sauce, on enrobe les dés de tofu de ___ (fécule de maïs).',
 '{"answer":"maïzena","hint":"Marque très connue de fécule de maïs"}',1,10),
('Le Tofu Sauté aux Brocolis','step_ordering','Réussir le Tofu croustillant :',
 '{"steps":["Presser le bloc de tofu dans un torchon sous un poids lourd (15 min)","Couper en dés et enrober de fécule de maïs (Maïzena)","Faire dorer le tofu sur toutes les faces à la poêle, puis réserver","Faire sauter les brocolis avec un fond d''eau pendant 4 min","Remettre le tofu, verser la sauce (soja, sésame, érable, ail, gingembre)","Mélanger vigoureusement 1 min pour glacer l''ensemble"],"correctOrder":[0,1,2,3,4,5]}',2,30),

('La Courge Butternut Farcie','multiple_choice','Pour éviter le gaspillage, que faire des graines de la butternut évidée ?',
 '{"options":["Les laver, les sécher, les enrober d''épices et les rôtir 15 min au four (apéritif)","Les composter immédiatement","Les planter dans le jardin en plein hiver","Les faire bouillir dans la soupe"],"correctIndex":0}',0,10),
('La Courge Butternut Farcie','fill_in_blank','Les courges d''hiver étaient traditionnellement cultivées par les indigènes d''Amérique avec le maïs et les haricots, formant ce qu''on appelle "Les trois ___".',
 '{"answer":"sœurs","hint":"Membre féminin de la fratrie"}',1,15),
('La Courge Butternut Farcie','step_ordering','Réaliser la butternut farcie :',
 '{"steps":["Couper la courge en deux, évider les graines et quadriller la chair","Badigeonner d''huile et rôtir 35-40 min à 200°C face vers le haut","Faire revenir l''oignon et les champignons à la poêle","Ajouter châtaignes, riz cuit et herbes à la poêle","Sortir la courge, creuser légèrement la chair et l''intégrer à la farce","Remplir généreusement la courge de farce et ré-enfourner 10 min"],"correctOrder":[0,1,2,3,4,5]}',2,30),

('Le Curry de Pois Chiches','multiple_choice','Pour que les épices du curry libèrent toute leur puissance, il faut :',
 '{"options":["Faire revenir la pâte ou la poudre d''épices dans la matière grasse chaude 1 minute","Les ajouter à la toute fin de la cuisson","Les diluer dans de l''eau très froide","Les faire bouillir avec le lait de coco directement"],"correctIndex":0}',0,15),
('Le Curry de Pois Chiches','fill_in_blank','On ajoute les jeunes pousses d''___ dans la sauce juste avant de servir, hors du feu, car elles fondent en 30 secondes.',
 '{"answer":"épinards","hint":"Légume feuille vert très riche en fer"}',1,10),
('Le Curry de Pois Chiches','step_ordering','Préparer un curry express :',
 '{"steps":["Faire fondre l''oignon émincé dans l''huile de coco","Ajouter la pâte de curry et torréfier 1 minute","Verser les pois chiches égouttés, le coulis de tomate et le lait de coco","Porter à petite ébullition et laisser mijoter 15 minutes","Éteindre le feu et incorporer les pousses d''épinards","Ajouter un filet de jus de citron vert et servir"],"correctOrder":[0,1,2,3,4,5]}',2,25),

('La Tarte Rustique à la Tomate','multiple_choice','Quelle est l''astuce imparable pour éviter que les tomates ne détrempent le fond de tarte ?',
 '{"options":["Étaler de la moutarde et saupoudrer de semoule (ou chapelure) sous les tomates","Ne pas mettre de tomates","Précuire la pâte à blanc pendant 1 heure","Cuire la tarte au micro-ondes"],"correctIndex":0}',0,10),
('La Tarte Rustique à la Tomate','fill_in_blank','L''avantage de la tarte rustique est qu''elle se prépare directement sur la plaque de cuisson, sans utiliser de ___.',
 '{"answer":"moule","hint":"Récipient à bord utilisé habituellement pour les tartes"}',1,15),
('La Tarte Rustique à la Tomate','step_ordering','Préparer une tarte rustique :',
 '{"steps":["Couper les tomates en rondelles et les éponger sur du papier absorbant","Dérouler la pâte brisée sur une plaque avec papier cuisson","Étaler la moutarde au centre, puis saupoudrer de semoule fine","Disposer joliment les rondelles de tomates en rosace","Assaisonner, puis rabattre les bords libres de la pâte sur les tomates","Enfourner à 200°C pendant 35 à 40 minutes"],"correctOrder":[0,1,2,3,4,5]}',2,35)

) AS v(lesson_title, type, question, data, order_index, xp_reward)
JOIN public.lessons l ON l.title = v.lesson_title
ON CONFLICT DO NOTHING;
