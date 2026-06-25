-- ============================================================
-- RecipeQuest — Script SQL complet (tables + seed)
-- À exécuter dans Supabase > SQL Editor
-- ============================================================

-- ============================================================
-- 1. TABLES (drop + recreate pour forcer les types text)
-- ============================================================

drop table if exists public.exercises cascade;
drop table if exists public.lessons cascade;
drop table if exists public.paths cascade;

create table public.paths (
  id text primary key,
  slug text unique not null,
  title text not null,
  description text,
  emoji text,
  color text,
  order_index integer default 0,
  is_active boolean default true
);

create table public.lessons (
  id text primary key,
  path_id text references public.paths(id) on delete cascade,
  title text not null,
  description text,
  order_index integer default 0,
  xp_reward integer default 30,
  thumbnail_url text
);

create table public.exercises (
  id text primary key,
  lesson_id text references public.lessons(id) on delete cascade,
  type text not null check (type in ('multiple_choice','step_ordering','association','fill_in_blank')),
  question text not null,
  data jsonb not null,
  order_index integer default 0,
  xp_reward integer default 10
);

-- RLS : lecture publique
alter table public.paths enable row level security;
alter table public.lessons enable row level security;
alter table public.exercises enable row level security;

drop policy if exists "paths_read" on public.paths;
drop policy if exists "lessons_read" on public.lessons;
drop policy if exists "exercises_read" on public.exercises;

create policy "paths_read" on public.paths for select using (true);
create policy "lessons_read" on public.lessons for select using (true);
create policy "exercises_read" on public.exercises for select using (true);

-- ============================================================
-- 2. PATHS
-- ============================================================

insert into public.paths (id, slug, title, description, emoji, color, order_index, is_active) values
  ('path-french',   'french',   'Cuisine Française',    'Maîtrise les classiques de la gastronomie française', '🇫🇷', '#0055A4', 0,  true),
  ('path-italian',  'italian',  'Cuisine Italienne',    'Pasta, pizza e molto altro!',                          '🇮🇹', '#CE2B37', 1,  true),
  ('path-japanese', 'japanese', 'Cuisine Japonaise',    'Sushi, ramen, et l''art du dashi',                     '🇯🇵', '#BC002D', 2,  true),
  ('path-moroccan', 'moroccan', 'Cuisine Marocaine',    'Tajine, couscous et ras-el-hanout',                    '🇲🇦', '#C1272D', 3,  true),
  ('path-mexican',  'mexican',  'Cuisine Mexicaine',    'Tacos, guacamole et mole',                             '🇲🇽', '#006847', 4,  true),
  ('path-indian',   'indian',   'Cuisine Indienne',     'Curry, masala et pains naan',                          '🇮🇳', '#FF9933', 5,  true),
  ('path-thai',     'thai',     'Cuisine Thaïlandaise', 'Pad thaï, larb et soupes de coco',                    '🇹🇭', '#A51931', 6,  true),
  ('path-greek',    'greek',    'Cuisine Grecque',      'Mezze, moussaka et tzatziki',                          '🇬🇷', '#0D5EAF', 7,  true),
  ('path-chinese',  'chinese',  'Cuisine Chinoise',     'Wok, dim sum et sauces authentiques',                  '🇨🇳', '#DE2910', 8,  true),
  ('path-pastry',   'pastry',   'Pâtisserie',           'Gâteaux, éclairs et macarons',                         '🎂',  '#F4A6C0', 9,  true),
  ('path-bbq',      'bbq',      'Barbecue & Grillades', 'Marinades, fumage et cuissons directes',               '🔥',  '#8B0000', 10, true),
  ('path-vegan',    'vegan',    'Cuisine Vegan',        '100% végétal, 100% savoureux',                         '🌿',  '#2E7D32', 11, true)


-- ============================================================
-- 3. LESSONS
-- ============================================================

insert into public.lessons (id, path_id, title, description, order_index, xp_reward) values
-- FRANÇAIS
('fr-1','path-french','Les Bases du Couteau',     'Prise en pince, main en griffe, tailles essentielles', 0, 20),
('fr-2','path-french','Les Sauces de Base',        'Béchamel, velouté, hollandaise et leurs dérivés',      1, 30),
('fr-3','path-french','La Quiche Lorraine',        'Pâte brisée, lardons, crème et œufs',                  2, 30),
('fr-4','path-french','Les Crêpes',                'Pâte, repos, cuisson à la crêpière',                   3, 25),
('fr-5','path-french','Le Bœuf Bourguignon',       'Mijotage et braising à la française',                   4, 50),
('fr-6','path-french','Le Soufflé au Fromage',     'Secrets du soufflé qui ne retombe pas',                5, 60),
-- ITALIAN
('it-1','path-italian','L''Huile d''Olive',         'Choisir, déguster et conserver l''huile d''olive',     0, 20),
('it-2','path-italian','Les Pâtes Fraîches',        'Tagliatelle et fettuccine maison à la main',            1, 35),
('it-3','path-italian','La Pizza Napoletana',       'Pâte à pizza, sauce San Marzano, cuisson au four',     2, 35),
('it-4','path-italian','Le Tiramisu',               'Mascarpone, café espresso et savoiardi',               3, 30),
('it-5','path-italian','Le Risotto',                'Al dente avec mantecatura au beurre',                  4, 50),
('it-6','path-italian','La Carbonara Authentique',  'Guanciale, pecorino, œufs — sans crème',               5, 60),
-- JAPONAIS
('jp-1','path-japanese','Les 5 Saveurs Japonaises','Sucré, salé, acide, amer et umami',                    0, 20),
('jp-2','path-japanese','Le Dashi',                 'Bouillon fondateur à base de kombu et katsuobushi',   1, 30),
('jp-3','path-japanese','Les Sushis',               'Riz vinaigré, nori et garnitures variées',             2, 50),
('jp-4','path-japanese','Le Ramen',                 'Bouillon tare, nouilles et garnitures',                3, 50),
('jp-5','path-japanese','La Tempura',               'Pâte légère à l''eau glacée et friture parfaite',     4, 55),
('jp-6','path-japanese','Le Wagyu & Yakitori',      'Viandes japonaises et brochettes au charbon',          5, 65),
-- MAROCAIN
('ma-1','path-moroccan','Les Épices Marocaines',   'Ras-el-hanout, safran, cumin et coriandre',            0, 20),
('ma-2','path-moroccan','Le Couscous Royal',        'Semoule vapeur, légumes et bouillon mijoté',           1, 35),
('ma-3','path-moroccan','Le Tajine d''Agneau',      'Viande fondante aux pruneaux et amandes',              2, 50),
('ma-4','path-moroccan','La Pastilla au Poulet',    'Feuilleté sucré-salé à la cannelle et sucre glace',   3, 60),
('ma-5','path-moroccan','Les Cornes de Gazelle',    'Pâtisserie aux amandes et eau de fleur d''oranger',   4, 55),
-- MEXICAIN
('mx-1','path-mexican','Les Ingrédients Clés',     'Piments, tomatilles, masa et avocats',                 0, 20),
('mx-2','path-mexican','Le Guacamole',              'Avocats Hass, citron vert, coriandre fraîche',         1, 25),
('mx-3','path-mexican','Les Tacos al Pastor',       'Porc mariné achiote et ananas, à la broche',          2, 40),
('mx-4','path-mexican','La Salsa Verde',            'Tomatilles rôties, piments verts et herbes',           3, 35),
('mx-5','path-mexican','Les Tortillas Maison',      'Masa harina, eau et comal — la base mexicaine',        4, 40),
('mx-6','path-mexican','Le Mole Negro',             '36 ingrédients, profondeur et complexité',             5, 70),
-- INDIEN
('in-1','path-indian','Les Épices Indiennes',      'Garam masala, cumin, cardamome et curcuma',            0, 20),
('in-2','path-indian','Le Dal Makhani',             'Lentilles noires en sauce beurrée et crémeuse',        1, 30),
('in-3','path-indian','Le Curry Butter Chicken',   'Poulet mariné en sauce tomate-crème épicée',           2, 45),
('in-4','path-indian','Le Pain Naan',               'Pain plat moelleux au four ou à la poêle',             3, 35),
('in-5','path-indian','Le Biryani Royal',           'Riz basmati aux épices, viande et safran',             4, 65),
-- THAÏLANDAIS
('th-1','path-thai','Les 4 Saveurs Thaïlandaises', 'Sucré, salé, acide et pimenté en équilibre',           0, 20),
('th-2','path-thai','Le Pad Thaï',                  'Nouilles de riz, crevettes, cacahuètes style Bangkok', 1, 35),
('th-3','path-thai','La Soupe Tom Kha Gaï',        'Poulet à la citronnelle et lait de coco',              2, 40),
('th-4','path-thai','La Pâte de Curry Vert',       'Préparation maison de la pâte de base',                3, 55),
('th-5','path-thai','Le Larb de Viande',            'Salade de viande épicée du nord de la Thaïlande',     4, 60),
-- GREC
('gr-1','path-greek','Les Bases Méditerranéennes', 'Huile d''olive, citron, herbes et féta',               0, 20),
('gr-2','path-greek','Le Tzatziki',                 'Yaourt grec, concombre râpé, ail et aneth',            1, 25),
('gr-3','path-greek','Les Mezze',                   'Houmous, tarama, dolmades et spanakopita',             2, 35),
('gr-4','path-greek','La Moussaka',                 'Aubergines, viande hachée et béchamel gratinée',       3, 55),
('gr-5','path-greek','Le Baklava',                  'Feuilleté au miel, pistaches et noix',                4, 60),
-- CHINOIS
('cn-1','path-chinese','Les Techniques au Wok',    'Feu vif, wok en acier et velveting de la viande',     0, 20),
('cn-2','path-chinese','Les Dim Sum',               'Raviolis cuits à la vapeur, porc et crevettes',       1, 40),
('cn-3','path-chinese','Le Mapo Tofu',              'Tofu soyeux, porc haché, sauce doubanjiang',           2, 45),
('cn-4','path-chinese','Le Porc Laqué',             'Char siu : marinade miel-sauce hoisin',                3, 55),
('cn-5','path-chinese','Le Canard Laqué de Pékin', 'Laquage, séchage et découpe traditionnelle',           4, 70),
-- PÂTISSERIE
('pa-1','path-pastry','Les Bases Pâtissières',     'Pâte brisée, sucrée et sablée',                        0, 20),
('pa-2','path-pastry','La Crème Pâtissière',       'Crème de base et ses dérivés (diplomate, mousseline)', 1, 35),
('pa-3','path-pastry','Les Éclairs au Chocolat',   'Pâte à choux, crème chocolat et glaçage',              2, 45),
('pa-4','path-pastry','Les Macarons',               'Meringue italienne, tant-pour-tant, ganache',          3, 60),
('pa-5','path-pastry','La Pâte Feuilletée',        'Détrempe, beurrage et 6 tours',                        4, 70),
-- BBQ
('bb-1','path-bbq','Choisir son Bois de Fumage',  'Hickory, mesquite, pommier : saveurs et usages',       0, 20),
('bb-2','path-bbq','Les Marinades',                 'Dry rub, marinades humides et leur timing',            1, 30),
('bb-3','path-bbq','Le Pulled Pork',                'Soc de porc fumé 12h, effiloché',                     2, 45),
('bb-4','path-bbq','Les Ribs Kansas City',          'Baby back ribs, sauce BBQ sucrée-fumée',              3, 55),
('bb-5','path-bbq','Le Brisket Texas',              'Poitrine de bœuf fumée 16h, croûte noire',            4, 70),
-- VEGAN
('vg-1','path-vegan','Les Bases du Vegan',          'Substituts du beurre, œufs et produits laitiers',     0, 20),
('vg-2','path-vegan','Le Buddha Bowl',              'Céréales, légumineuses, légumes et sauce tahini',      1, 30),
('vg-3','path-vegan','Protéines Végétales',         'Tofu, tempeh, seitan et légumineuses',                 2, 40),
('vg-4','path-vegan','Les Fromages Végétaux',       'Cashew cheese, tofu fumé et levure nutritionnelle',    3, 55),
('vg-5','path-vegan','Le Rôti de Seitan',           'Gluten de blé, bouillon et herbes — rôti festif',     4, 65)


-- ============================================================
-- 4. EXERCISES
-- Format data JSON par type :
-- multiple_choice : {"options":["a","b","c","d"],"correctIndex":0}
-- step_ordering   : {"steps":["a","b","c"],"correctOrder":[0,1,2]}
-- association     : {"pairs":[{"left":"a","right":"b"},...]}
-- fill_in_blank   : {"answer":"mot","hint":"indice optionnel"}
-- ============================================================

insert into public.exercises (id, lesson_id, type, question, data, order_index, xp_reward) values

-- ============================================================
-- FRANÇAIS — fr-1 : Les Bases du Couteau
-- ============================================================
('fr-1-1','fr-1','multiple_choice','Comment s''appelle la technique de coupe qui consiste à tenir le couteau entre le pouce et l''index ?',
 '{"options":["La prise en pince","La prise en marteau","La prise en paume","La prise en croix"],"correctIndex":0}', 0, 10),

('fr-1-2','fr-1','multiple_choice','Quelle forme doit faire la main qui maintient l''aliment à couper ?',
 '{"options":["Une griffe — doigts repliés","Une pince — index tendu","Un poing fermé","Une main à plat"],"correctIndex":0}', 1, 10),

('fr-1-3','fr-1','fill_in_blank','La taille en très petits cubes réguliers de 1-2 mm s''appelle la ___.',
 '{"answer":"brunoise","hint":"Commence par ''b'', fine taille classique française"}', 2, 15),

('fr-1-4','fr-1','step_ordering','Remettre dans l''ordre pour émincer un oignon en brunoise :',
 '{"steps":["Couper l''oignon en deux dans la hauteur","Faire des entailles horizontales sans couper le talon","Faire des entailles verticales en éventail","Émincer perpendiculairement pour obtenir des petits cubes"],"correctOrder":[0,1,2,3]}', 3, 20),

-- ============================================================
-- FRANÇAIS — fr-2 : Les Sauces de Base
-- ============================================================
('fr-2-1','fr-2','multiple_choice','Quelle est la sauce mère à base de lait ?',
 '{"options":["La béchamel","Le velouté","L''espagnole","La hollandaise"],"correctIndex":0}', 0, 10),

('fr-2-2','fr-2','multiple_choice','Le velouté est une sauce mère réalisée avec un roux blanc et quel liquide ?',
 '{"options":["Un fond blanc (bouillon)","Du lait","De la crème fraîche","Du vin blanc"],"correctIndex":0}', 1, 10),

('fr-2-3','fr-2','association','Associe chaque sauce mère à son liquide de base :',
 '{"pairs":[{"left":"Béchamel","right":"Lait"},{"left":"Velouté","right":"Fond blanc"},{"left":"Espagnole","right":"Fond brun"},{"left":"Hollandaise","right":"Beurre clarifié + jaunes"}]}', 2, 20),

('fr-2-4','fr-2','fill_in_blank','Un roux est un mélange à parts égales de beurre et de ___.',
 '{"answer":"farine","hint":"Ingrédient sec, base de nombreuses sauces"}', 3, 15),

('fr-2-5','fr-2','step_ordering','Réaliser une béchamel dans l''ordre :',
 '{"steps":["Faire fondre le beurre à feu moyen","Ajouter la farine et mélanger pour former le roux","Verser le lait chaud progressivement en fouettant","Cuire jusqu''à épaississement, saler et poivrer"],"correctOrder":[0,1,2,3]}', 4, 25),

-- ============================================================
-- FRANÇAIS — fr-3 : La Quiche Lorraine
-- ============================================================
('fr-3-1','fr-3','multiple_choice','La quiche lorraine traditionnelle contient des lardons et de la crème. Qu''est-ce qu''elle NE contient PAS à l''origine ?',
 '{"options":["Du fromage râpé","Des œufs","De la crème épaisse","Des lardons fumés"],"correctIndex":0}', 0, 10),

('fr-3-2','fr-3','fill_in_blank','La pâte utilisée pour la quiche lorraine est la pâte ___.',
 '{"answer":"brisée","hint":"Pâte sablée mais sans sucre"}', 1, 15),

('fr-3-3','fr-3','multiple_choice','À quelle température doit-on faire cuire une quiche ?',
 '{"options":["180°C","120°C","250°C","90°C"],"correctIndex":0}', 2, 10),

('fr-3-4','fr-3','step_ordering','Préparer une quiche lorraine dans l''ordre :',
 '{"steps":["Foncer le moule avec la pâte brisée et piquer le fond","Faire revenir les lardons à sec","Mélanger œufs, crème et assaisonnement (l''appareil)","Disposer les lardons sur le fond de tarte, verser l''appareil","Enfourner à 180°C pendant 30-35 min"],"correctOrder":[0,1,2,3,4]}', 3, 25),

('fr-3-5','fr-3','association','Associe chaque terme à sa définition :',
 '{"pairs":[{"left":"Foncer","right":"Étaler la pâte dans le moule"},{"left":"Appareil","right":"Mélange liquide œufs-crème"},{"left":"Blanchir","right":"Faire précuire les lardons"},{"left":"Piquer","right":"Faire des trous avec une fourchette"}]}', 4, 20),

-- ============================================================
-- FRANÇAIS — fr-4 : Les Crêpes
-- ============================================================
('fr-4-1','fr-4','multiple_choice','Pourquoi laisse-t-on reposer la pâte à crêpes 30 min ?',
 '{"options":["Pour hydrater le gluten et rendre la pâte plus souple","Pour la refroidir","Pour la faire lever","Pour concentrer les arômes"],"correctIndex":0}', 0, 10),

('fr-4-2','fr-4','fill_in_blank','La première crêpe est souvent ratée car la poêle n''est pas encore à la bonne ___.',
 '{"answer":"température","hint":"Ce que doit atteindre la poêle avant de cuire"}', 1, 15),

('fr-4-3','fr-4','multiple_choice','Quel gras est traditionnel pour cuire les crêpes ?',
 '{"options":["Le beurre clarifié","L''huile d''olive","Le saindoux","La margarine"],"correctIndex":0}', 2, 10),

('fr-4-4','fr-4','step_ordering','Faire des crêpes dans l''ordre :',
 '{"steps":["Mélanger farine, œufs et lait jusqu''à obtenir une pâte lisse","Laisser reposer la pâte 30 min","Chauffer la poêle et la graisser légèrement","Verser une louche et étaler en inclinant la poêle","Cuire 1 min, retourner et cuire 30 sec"],"correctOrder":[0,1,2,3,4]}', 3, 25),

-- ============================================================
-- FRANÇAIS — fr-5 : Le Bœuf Bourguignon
-- ============================================================
('fr-5-1','fr-5','multiple_choice','Quel vin utilise-t-on pour le bœuf bourguignon ?',
 '{"options":["Un vin rouge de Bourgogne","Un vin blanc sec","Un rosé de Provence","Un vin de Bordeaux uniquement"],"correctIndex":0}', 0, 10),

('fr-5-2','fr-5','fill_in_blank','Le fait de saisir la viande à feu vif avant de mijoter s''appelle ___.',
 '{"answer":"saisir","hint":"Réaction de Maillard, croûte dorée"}', 1, 15),

('fr-5-3','fr-5','multiple_choice','Combien de temps doit mijoter un bœuf bourguignon ?',
 '{"options":["Au moins 2 heures","15 minutes","45 minutes","6 heures minimum"],"correctIndex":0}', 2, 10),

('fr-5-4','fr-5','association','Associe chaque ingrédient à son rôle dans le bourguignon :',
 '{"pairs":[{"left":"Lardons","right":"Apportent le gras et la saveur fumée"},{"left":"Champignons","right":"Ajoutés en fin de cuisson, texture"},{"left":"Bouquet garni","right":"Aromates : thym, laurier, persil"},{"left":"Farine","right":"Lie la sauce"}]}', 3, 20),

('fr-5-5','fr-5','step_ordering','Réaliser un bœuf bourguignon :',
 '{"steps":["Faire mariner le bœuf 12h dans le vin avec aromates","Égoutter et sécher la viande, faire revenir les lardons","Saisir les morceaux de bœuf à feu vif sur toutes les faces","Singer (ajouter la farine) et déglacer avec le vin de marinade","Ajouter les légumes et le bouquet garni, laisser mijoter 2h30","Ajouter les champignons 30 min avant la fin"],"correctOrder":[0,1,2,3,4,5]}', 4, 30),

-- ============================================================
-- FRANÇAIS — fr-6 : Le Soufflé au Fromage
-- ============================================================
('fr-6-1','fr-6','multiple_choice','Pourquoi ne faut-il jamais ouvrir le four pendant la cuisson d''un soufflé ?',
 '{"options":["Le choc thermique fait retomber le soufflé","Ça change la couleur","Ça brûle le beurre","Le fromage coagule"],"correctIndex":0}', 0, 10),

('fr-6-2','fr-6','fill_in_blank','Les blancs d''œufs montés en neige sont incorporés au mélange en faisant des gestes de bas en haut appelés ___.',
 '{"answer":"macaronner","hint":"Technique délicate pour ne pas casser les blancs"}', 1, 20),

('fr-6-3','fr-6','multiple_choice','Quel fromage est le plus classique pour un soufflé au fromage ?',
 '{"options":["Le gruyère ou comté râpé","Le camembert","Le bleu d''Auvergne","La ricotta"],"correctIndex":0}', 2, 15),

('fr-6-4','fr-6','step_ordering','Réaliser un soufflé au fromage :',
 '{"steps":["Beurrer et chemiser le moule de fromage râpé","Préparer une béchamel épaisse et y incorporer les jaunes d''œufs et le fromage","Monter les blancs en neige ferme","Incorporer délicatement 1/3 des blancs pour détendre","Incorporer le reste en soulevant la masse","Enfourner immédiatement à 200°C, ne pas ouvrir le four"],"correctOrder":[0,1,2,3,4,5]}', 3, 35),

-- ============================================================
-- ITALIEN — it-1 : L'Huile d'Olive
-- ============================================================
('it-1-1','it-1','multiple_choice','Que signifie "Extra Vierge" sur une huile d''olive ?',
 '{"options":["Première pression à froid, acidité < 0,8%","Deuxième pression","Huile raffinée de qualité supérieure","Huile biologique"],"correctIndex":0}', 0, 10),

('it-1-2','it-1','fill_in_blank','L''huile d''olive doit être conservée à l''abri de la lumière et de la ___.',
 '{"answer":"chaleur","hint":"Ce qui dégrade les acides gras"}', 1, 10),

('it-1-3','it-1','multiple_choice','Pour une salade, on utilise une huile d''olive :',
 '{"options":["Fruitée et extra vierge, sans chauffer","Raffinée pour la neutralité","Pomace pour l''économie","Très ancienne pour le goût"],"correctIndex":0}', 2, 10),

-- ============================================================
-- ITALIEN — it-2 : Les Pâtes Fraîches
-- ============================================================
('it-2-1','it-2','multiple_choice','Quelle farine donne les meilleures pâtes fraîches ?',
 '{"options":["Farine 00 ou semoule fine de blé dur","Farine complète T110","Farine de maïs","Farine de riz"],"correctIndex":0}', 0, 10),

('it-2-2','it-2','fill_in_blank','Le ratio classique pour les pâtes fraîches est 100g de farine pour ___ œuf(s).',
 '{"answer":"1","hint":"Un nombre simple"}', 1, 15),

('it-2-3','it-2','multiple_choice','Pourquoi pétrit-on la pâte à pâtes minimum 10 minutes ?',
 '{"options":["Pour développer le réseau de gluten et la rendre élastique","Pour la refroidir","Pour intégrer de l''air","Pour la rendre plus molle"],"correctIndex":0}', 2, 10),

('it-2-4','it-2','step_ordering','Faire des pâtes fraîches :',
 '{"steps":["Verser la farine en fontaine, casser les œufs au centre","Incorporer les œufs progressivement avec une fourchette","Pétrir à la main 10 min jusqu''à obtenir une boule lisse","Filmer et laisser reposer 30 min au frais","Étaler au laminoir ou au rouleau en bandes fines","Découper en tagliatelle et laisser sécher sur un support fariné"],"correctOrder":[0,1,2,3,4,5]}', 3, 30),

('it-2-5','it-2','association','Associe chaque type de pâtes à sa forme :',
 '{"pairs":[{"left":"Tagliatelle","right":"Longues rubans plats"},{"left":"Penne","right":"Tubes coupés en biais"},{"left":"Farfalle","right":"Nœuds papillon"},{"left":"Rigatoni","right":"Gros tubes rainurés"}]}', 4, 20),

-- ============================================================
-- ITALIEN — it-3 : La Pizza Napoletana
-- ============================================================
('it-3-1','it-3','multiple_choice','Quelle farine est indispensable pour une vraie pizza napolitaine ?',
 '{"options":["Farine 00, riche en gluten","Farine complète T80","Farine de sarrasin","Farine de riz"],"correctIndex":0}', 0, 10),

('it-3-2','it-3','fill_in_blank','Une pizza napolitaine se cuit à ___ °C dans un four à bois.',
 '{"answer":"485","hint":"Température extrêmement élevée, entre 450 et 500°C"}', 1, 20),

('it-3-3','it-3','multiple_choice','Quel type de tomate est utilisé pour la sauce pizza napolitaine ?',
 '{"options":["San Marzano DOP","Tomate cerise","Tomate séchée","Tomate verte"],"correctIndex":0}', 2, 10),

('it-3-4','it-3','step_ordering','Faire une pizza napolitaine :',
 '{"steps":["Mélanger farine, eau, levure et sel, pétrir 20 min","Faire lever la pâte 2h à température ambiante puis 24h au frais","Étaler la pâte à la main en cercle sans rouleau","Garnir de sauce San Marzano, mozzarella fior di latte","Cuire 90 secondes à 485°C ou 8 min à 280°C au four domestique"],"correctOrder":[0,1,2,3,4]}', 3, 30),

-- ============================================================
-- ITALIEN — it-4 : Le Tiramisu
-- ============================================================
('it-4-1','it-4','multiple_choice','Quel biscuit trempe-t-on dans le café pour le tiramisu ?',
 '{"options":["Les savoiardi (biscuits à la cuillère)","Les spéculoos","Les amaretti","Les cantuccini"],"correctIndex":0}', 0, 10),

('it-4-2','it-4','fill_in_blank','Le fromage frais crémeux utilisé dans le tiramisu est le ___.',
 '{"answer":"mascarpone","hint":"Fromage italien très riche, origine Lombardie"}', 1, 10),

('it-4-3','it-4','step_ordering','Réaliser un tiramisu :',
 '{"steps":["Séparer les blancs des jaunes d''œufs","Fouetter les jaunes avec le sucre jusqu''à blanchiment","Incorporer le mascarpone aux jaunes sucrés","Monter les blancs en neige et les incorporer délicatement","Tremper rapidement les savoiardi dans le café froid","Alterner couches de biscuits et crème, réfrigérer 4h","Saupoudrer de cacao amer avant de servir"],"correctOrder":[0,1,2,3,4,5,6]}', 2, 35),

-- ============================================================
-- ITALIEN — it-5 : Le Risotto
-- ============================================================
('it-5-1','it-5','multiple_choice','Quelle variété de riz est idéale pour le risotto ?',
 '{"options":["Carnaroli ou Arborio","Basmati","Riz long étuvé","Riz rond japonais"],"correctIndex":0}', 0, 10),

('it-5-2','it-5','fill_in_blank','La technique qui consiste à incorporer beurre froid et parmesan en fin de cuisson s''appelle la ___.',
 '{"answer":"mantecatura","hint":"Terme italien, donne la texture crémeuse"}', 1, 20),

('it-5-3','it-5','step_ordering','Cuire un risotto :',
 '{"steps":["Faire revenir l''échalote dans le beurre","Ajouter le riz sec et le nacrer 2 min","Déglacer avec le vin blanc et laisser absorber","Ajouter le bouillon chaud louche par louche en remuant","Stopper la cuisson al dente, éteindre le feu","Incorporer beurre froid et parmesan râpé (mantecatura)","Laisser reposer 1 min, servir immédiatement"],"correctOrder":[0,1,2,3,4,5,6]}', 2, 35),

('it-5-4','it-5','association','Associe chaque risotto à son ingrédient signature :',
 '{"pairs":[{"left":"Risotto Milanese","right":"Safran"},{"left":"Risotto al nero","right":"Encre de seiche"},{"left":"Risotto ai funghi","right":"Cèpes"},{"left":"Risotto agli asparagi","right":"Asperges"}]}', 3, 20),

-- ============================================================
-- ITALIEN — it-6 : La Carbonara Authentique
-- ============================================================
('it-6-1','it-6','multiple_choice','La vraie carbonara romaine NE contient PAS :',
 '{"options":["De la crème fraîche","Du guanciale","Du pecorino romano","Des œufs entiers"],"correctIndex":0}', 0, 10),

('it-6-2','it-6','fill_in_blank','La joue de porc italienne séchée utilisée dans la carbonara est le ___.',
 '{"answer":"guanciale","hint":"Différent de la pancetta, plus gras et savoureux"}', 1, 20),

('it-6-3','it-6','step_ordering','Réaliser une carbonara authentique :',
 '{"steps":["Faire dorer le guanciale en dés à sec dans la poêle","Cuire les spaghetti al dente, réserver l''eau de cuisson","Mélanger jaunes d''œufs, pecorino et poivre noir","Retirer la poêle du feu, ajouter les pâtes égouttées","Verser le mélange œufs-fromage hors du feu en remuant","Ajouter l''eau de cuisson pour créer une sauce crémeuse","Servir avec pecorino et poivre supplémentaires"],"correctOrder":[0,1,2,3,4,5,6]}', 2, 40),

-- ============================================================
-- JAPONAIS — jp-1 : Les 5 Saveurs
-- ============================================================
('jp-1-1','jp-1','multiple_choice','Comment s''appelle la 5ème saveur japonaise, découverte en 1908 ?',
 '{"options":["Umami","Kokumi","Kara","Shibo"],"correctIndex":0}', 0, 10),

('jp-1-2','jp-1','fill_in_blank','L''umami est associé à un acide aminé appelé l''acide ___.',
 '{"answer":"glutamique","hint":"Base du glutamate monosodique (MSG)"}', 1, 20),

('jp-1-3','jp-1','association','Associe chaque saveur à un ingrédient japonais qui l''incarne :',
 '{"pairs":[{"left":"Umami","right":"Sauce soja"},{"left":"Sucré","right":"Mirin"},{"left":"Acide","right":"Vinaigre de riz"},{"left":"Amer","right":"Thé matcha"}]}', 2, 20),

-- ============================================================
-- JAPONAIS — jp-2 : Le Dashi
-- ============================================================
('jp-2-1','jp-2','multiple_choice','Quels sont les deux ingrédients du dashi classique (ichiban dashi) ?',
 '{"options":["Kombu et katsuobushi","Miso et tofu","Nori et sake","Soja et gingembre"],"correctIndex":0}', 0, 10),

('jp-2-2','jp-2','fill_in_blank','Le kombu est une algue qui libère l''umami grâce à sa teneur en acide ___.',
 '{"answer":"glutamique","hint":"Même réponse que pour l''umami en général"}', 1, 20),

('jp-2-3','jp-2','step_ordering','Préparer un dashi ichiban :',
 '{"steps":["Essuyer le kombu avec un linge humide (ne pas laver)","Faire tremper le kombu dans l''eau froide 30 min","Chauffer doucement jusqu''à 60°C, retirer le kombu avant ébullition","Porter à frémissement et ajouter les flocons de katsuobushi","Éteindre le feu et laisser infuser 5 min sans remuer","Filtrer délicatement à travers une étamine"],"correctOrder":[0,1,2,3,4,5]}', 2, 30),

-- ============================================================
-- JAPONAIS — jp-3 : Les Sushis
-- ============================================================
('jp-3-1','jp-3','multiple_choice','Quel vinaigre assaisonne le riz à sushi ?',
 '{"options":["Vinaigre de riz sucré-salé","Vinaigre de cidre","Vinaigre blanc","Vinaigre balsamique"],"correctIndex":0}', 0, 10),

('jp-3-2','jp-3','fill_in_blank','Le riz à sushi doit être à température ___ lorsqu''on l''assaisonne.',
 '{"answer":"ambiante","hint":"Ni chaud ni froid — le vinaigre doit s''absorber correctement"}', 1, 20),

('jp-3-3','jp-3','association','Associe chaque type de sushi à sa description :',
 '{"pairs":[{"left":"Nigiri","right":"Boulette de riz surmontée d''un topping"},{"left":"Maki","right":"Rouleau avec nori à l''extérieur"},{"left":"Temaki","right":"Cornet de nori roulé à la main"},{"left":"Chirashi","right":"Bol de riz garni de poissons variés"}]}', 2, 20),

('jp-3-4','jp-3','step_ordering','Préparer du riz à sushi :',
 '{"steps":["Laver le riz japonais jusqu''à ce que l''eau soit claire","Cuire le riz avec un peu moins d''eau que d''habitude","Mélanger vinaigre de riz, sucre et sel pour l''assaisonnement","Transférer le riz dans un hangiri (bac en bois)","Verser l''assaisonnement et mélanger avec des gestes de coupe","Éventer le riz pour le faire briller et refroidir à l''air"],"correctOrder":[0,1,2,3,4,5]}', 3, 30),

-- ============================================================
-- JAPONAIS — jp-4 : Le Ramen
-- ============================================================
('jp-4-1','jp-4','multiple_choice','Quel est le bouillon de base le plus riche et crémeux du ramen ?',
 '{"options":["Tonkotsu (os de porc)","Shoyu (soja)","Shio (sel)","Miso"],"correctIndex":0}', 0, 10),

('jp-4-2','jp-4','fill_in_blank','La sauce concentrée qui assaisonne le bouillon de ramen s''appelle le ___.',
 '{"answer":"tare","hint":"Trois types : shoyu, shio, miso"}', 1, 20),

('jp-4-3','jp-4','association','Associe chaque garniture de ramen à son nom japonais :',
 '{"pairs":[{"left":"Tranche de porc braisé","right":"Chashu"},{"left":"Œuf mariné dans la soja","right":"Ajitsuke tamago"},{"left":"Bambou fermenté","right":"Menma"},{"left":"Feuille d''algue séchée","right":"Nori"}]}', 2, 20),

('jp-4-4','jp-4','step_ordering','Préparer un bouillon tonkotsu :',
 '{"steps":["Blanchir les os de porc 10 min et rincer à l''eau froide","Remettre les os dans l''eau froide et porter à ébullition vive","Cuire à gros bouillons pendant 8-10 heures en écumant","Filtrer et assaisonner avec le tare shoyu ou shio","Cuire les nouilles ramen séparément","Assembler : bouillon chaud, nouilles, garnitures"],"correctOrder":[0,1,2,3,4,5]}', 3, 35),

-- ============================================================
-- JAPONAIS — jp-5 : La Tempura
-- ============================================================
('jp-5-1','jp-5','multiple_choice','Pourquoi utilise-t-on de l''eau glacée pour la pâte à tempura ?',
 '{"options":["Pour ralentir le développement du gluten et garder la pâte légère","Pour la garder fraîche","Pour accélérer la cuisson","Pour donner plus de croustillant"],"correctIndex":0}', 0, 10),

('jp-5-2','jp-5','fill_in_blank','La sauce d''accompagnement de la tempura, à base de dashi, mirin et soja, s''appelle le ___.',
 '{"answer":"tentsuyu","hint":"Ten-tsu-yu : sauce pour tremper la tempura"}', 1, 25),

('jp-5-3','jp-5','multiple_choice','La pâte à tempura doit être :',
 '{"options":["Grumeleuse et légèrement sous-mélangée","Parfaitement lisse","Très épaisse","Préparée 1h avant"],"correctIndex":0}', 2, 15),

-- ============================================================
-- JAPONAIS — jp-6 : Le Wagyu & Yakitori
-- ============================================================
('jp-6-1','jp-6','multiple_choice','Que désigne le score A5 sur le bœuf wagyu ?',
 '{"options":["La plus haute qualité de persillage et de rendement","La race de l''animal","L''âge d''abattage","La région de production"],"correctIndex":0}', 0, 15),

('jp-6-2','jp-6','fill_in_blank','Le yakitori est cuit sur des braises de charbon de bois japonais appelé ___.',
 '{"answer":"binchotan","hint":"Charbon blanc très pur, sans fumée"}', 1, 25),

('jp-6-3','jp-6','association','Associe chaque type de yakitori à sa garniture :',
 '{"pairs":[{"left":"Negima","right":"Poulet et oignon vert"},{"left":"Tsukune","right":"Boulettes de poulet haché"},{"left":"Kawa","right":"Peau de poulet croustillante"},{"left":"Momo","right":"Cuisse de poulet"}]}', 2, 20),

-- ============================================================
-- MAROCAIN — ma-1 : Les Épices
-- ============================================================
('ma-1-1','ma-1','multiple_choice','Quelle épice marocaine précieuse est souvent falsifiée car très chère ?',
 '{"options":["Le safran","Le cumin","La cannelle","Le gingembre"],"correctIndex":0}', 0, 10),

('ma-1-2','ma-1','fill_in_blank','Le mélange d''épices marocain qui signifie littéralement "tête de l''épicier" est le ___.',
 '{"answer":"ras-el-hanout","hint":"Mélange pouvant contenir jusqu''à 30 épices"}', 1, 10),

('ma-1-3','ma-1','association','Associe chaque épice à son usage principal dans la cuisine marocaine :',
 '{"pairs":[{"left":"Cumin","right":"Couscous et légumes"},{"left":"Cannelle","right":"Tajines sucrés-salés"},{"left":"Safran","right":"Riz et volailles"},{"left":"Coriandre","right":"Harira et marinades"}]}', 2, 20),

-- ============================================================
-- MAROCAIN — ma-2 : Le Couscous Royal
-- ============================================================
('ma-2-1','ma-2','multiple_choice','Comment doit cuire la semoule dans la cuisine marocaine traditionnelle ?',
 '{"options":["À la vapeur dans un couscoussier","Bouillie dans l''eau","Au micro-ondes","Grillée à la poêle"],"correctIndex":0}', 0, 10),

('ma-2-2','ma-2','fill_in_blank','Le bouillon épicé dans lequel mijotent les légumes du couscous s''appelle le ___.',
 '{"answer":"bouillon","hint":"Simple mot français, mais ici enrichi d''épices et de safran"}', 1, 15),

('ma-2-3','ma-2','step_ordering','Préparer un couscous :',
 '{"steps":["Faire revenir oignons et viandes dans de l''huile d''olive","Ajouter les épices (cumin, curcuma, cannelle, gingembre)","Couvrir d''eau et mijoter 45 min","Ajouter les légumes durs (navets, carottes) puis les tendres (courgettes)","Hydrater la semoule à la vapeur en 3 passages au couscoussier","Servir la semoule en dôme, napper de bouillon et garnir"],"correctOrder":[0,1,2,3,4,5]}', 2, 30),

-- ============================================================
-- MAROCAIN — ma-3 : Le Tajine d'Agneau
-- ============================================================
('ma-3-1','ma-3','multiple_choice','À quoi sert le couvercle conique du tajine ?',
 '{"options":["À faire condenser la vapeur qui retombe sur les aliments","À concentrer la chaleur","À réduire la sauce","À fumiger les épices"],"correctIndex":0}', 0, 10),

('ma-3-2','ma-3','fill_in_blank','Le tajine aux pruneaux et amandes mélange saveurs sucrées et salées : c''est le principe du ___.',
 '{"answer":"sucré-salé","hint":"Mariage de deux opposés culinaires"}', 1, 15),

('ma-3-3','ma-3','step_ordering','Préparer un tajine d''agneau aux pruneaux :',
 '{"steps":["Faire dorer les morceaux d''agneau dans l''huile d''olive","Ajouter oignons émincés, ail et épices (gingembre, cannelle, safran)","Couvrir à hauteur d''eau, poser le couvercle conique","Mijoter à feu doux 1h30","Ajouter pruneaux et miel, cuire encore 30 min","Parsemer d''amandes grillées et de graines de sésame avant de servir"],"correctOrder":[0,1,2,3,4,5]}', 2, 30),

('ma-3-4','ma-3','association','Associe chaque variante de tajine à ses ingrédients clés :',
 '{"pairs":[{"left":"Tajine kefta","right":"Boulettes de viande et œufs"},{"left":"Tajine de poulet","right":"Citrons confits et olives"},{"left":"Tajine de légumes","right":"Pommes de terre, carottes, poivrons"},{"left":"Tajine de poisson","right":"Chermoula et tomates"}]}', 3, 20),

-- ============================================================
-- MAROCAIN — ma-4 : La Pastilla
-- ============================================================
('ma-4-1','ma-4','multiple_choice','Quelle pâte ultra-fine est utilisée pour la pastilla ?',
 '{"options":["La feuille de brick (ouarka)","La pâte filo","La pâte feuilletée","La pâte brisée"],"correctIndex":0}', 0, 15),

('ma-4-2','ma-4','fill_in_blank','La pastilla est saupoudrée en surface de sucre ___ et de cannelle.',
 '{"answer":"glace","hint":"Sucre très finement moulu"}', 1, 15),

('ma-4-3','ma-4','step_ordering','Préparer une pastilla au poulet :',
 '{"steps":["Cuire le poulet avec oignons, épices et herbes","Effilocher la viande, séparer le bouillon","Faire réduire le bouillon avec des œufs pour une farce liée","Préparer la farce d''amandes (broyées, sucrées, parfumées à l''eau de fleur)","Alterner couches de brick, viande et amandes dans un moule beurré","Refermer, dorer au four 25 min, saupoudrer sucre glace et cannelle"],"correctOrder":[0,1,2,3,4,5]}', 2, 35),

-- ============================================================
-- MAROCAIN — ma-5 : Les Cornes de Gazelle
-- ============================================================
('ma-5-1','ma-5','multiple_choice','Quel parfum est caractéristique de la pâtisserie marocaine ?',
 '{"options":["L''eau de fleur d''oranger","La vanille","L''extrait d''amande amère","La lavande"],"correctIndex":0}', 0, 10),

('ma-5-2','ma-5','fill_in_blank','La farce des cornes de gazelle est composée essentiellement d''amandes ___ et de sucre.',
 '{"answer":"moulues","hint":"Elles sont travaillées finement comme une pâte"}', 1, 15),

('ma-5-3','ma-5','step_ordering','Réaliser des cornes de gazelle :',
 '{"steps":["Préparer la farce : amandes moulues, sucre, eau de fleur d''oranger, beurre","Former des petits boudins de farce et les réfrigérer","Abaisser la pâte finement","Enrouler la pâte autour de la farce et souder les bords","Courber légèrement pour former la corne","Cuire à 180°C 12-15 min, sans les colorer"],"correctOrder":[0,1,2,3,4,5]}', 2, 30),

-- ============================================================
-- MEXICAIN — mx-1 : Les Ingrédients Clés
-- ============================================================
('mx-1-1','mx-1','multiple_choice','La masa est une pâte de maïs nixtamalisé. Que signifie nixtamalisation ?',
 '{"options":["Traitement alcalin du maïs à la chaux pour libérer les nutriments","Séchage du maïs au soleil","Fermentation du maïs","Mouture humide du maïs"],"correctIndex":0}', 0, 15),

('mx-1-2','mx-1','fill_in_blank','L''avocat Hass est la variété préférée pour le guacamole grâce à sa texture ___ et crémeuse.',
 '{"answer":"beurrée","hint":"Adjectif qui évoque le beurre, la matière grasse douce"}', 1, 10),

('mx-1-3','mx-1','association','Associe chaque piment à son niveau de chaleur :',
 '{"pairs":[{"left":"Jalapeño","right":"Moyen (2 500–8 000 SHU)"},{"left":"Habanero","right":"Très fort (100 000–350 000 SHU)"},{"left":"Poblano","right":"Doux (1 000–2 000 SHU)"},{"left":"Serrano","right":"Fort (10 000–23 000 SHU)"}]}', 2, 20),

-- ============================================================
-- MEXICAIN — mx-2 : Le Guacamole
-- ============================================================
('mx-2-1','mx-2','multiple_choice','Quel ingrédient permet d''éviter que le guacamole ne noircisse ?',
 '{"options":["Le jus de citron vert (acide citrique)","Le sel","L''huile d''olive","Le film plastique"],"correctIndex":0}', 0, 10),

('mx-2-2','mx-2','fill_in_blank','On écrase l''avocat dans un ___, mortier mexicain en pierre volcanique.',
 '{"answer":"molcajete","hint":"Ustensile de cuisine précolombien"}', 1, 20),

('mx-2-3','mx-2','multiple_choice','Le guacamole authentique ne contient PAS :',
 '{"options":["Mayonnaise","Coriandre fraîche","Piment","Oignon rouge"],"correctIndex":0}', 2, 10),

-- ============================================================
-- MEXICAIN — mx-3 : Les Tacos al Pastor
-- ============================================================
('mx-3-1','mx-3','multiple_choice','Les tacos al pastor sont inspirés de quel autre plat ?',
 '{"options":["Le shawarma libanais","Le kebab turc","Le gyros grec","Le souvlaki"],"correctIndex":0}', 0, 15),

('mx-3-2','mx-3','fill_in_blank','La marinade des tacos al pastor utilise des piments séchés ___ pour sa couleur rouge.',
 '{"answer":"guajillo","hint":"Piment doux et fruité, base des marinades mexicaines"}', 1, 20),

('mx-3-3','mx-3','step_ordering','Préparer des tacos al pastor :',
 '{"steps":["Préparer la marinade : piments guajillo, achiote, vinaigre, épices","Mariner le porc en tranches fines 12-24h","Empiler les tranches sur une broche verticale avec un ananas","Griller lentement en faisant tourner la broche","Trancher finement sur des tortillas de maïs","Garnir d''oignon, coriandre, ananas et salsa verde"],"correctOrder":[0,1,2,3,4,5]}', 2, 30),

-- ============================================================
-- MEXICAIN — mx-4 : La Salsa Verde
-- ============================================================
('mx-4-1','mx-4','multiple_choice','La salsa verde mexicaine est faite à base de :',
 '{"options":["Tomatilles (pas de tomates rouges)","Tomates vertes non mûres","Avocats","Poivrons verts"],"correctIndex":0}', 0, 15),

('mx-4-2','mx-4','fill_in_blank','Les tomatilles se distinguent par leur petite enveloppe collante appelée ___.',
 '{"answer":"cosse","hint":"Gaine papier qui entoure le fruit"}', 1, 20),

('mx-4-3','mx-4','step_ordering','Préparer une salsa verde :',
 '{"steps":["Enlever les cosses des tomatilles et les rincer","Faire rôtir tomatilles et piments au four à 200°C jusqu''à caramélisation","Laisser refroidir légèrement","Mixer avec oignon, ail, coriandre et sel","Goûter et ajuster acidité et piquant","Servir à température ambiante ou chauffer légèrement"],"correctOrder":[0,1,2,3,4,5]}', 2, 25),

-- ============================================================
-- MEXICAIN — mx-5 : Les Tortillas Maison
-- ============================================================
('mx-5-1','mx-5','multiple_choice','Quelle est la différence entre une tortilla de maïs et une de farine de blé ?',
 '{"options":["La tortilla maïs est plus petite, sans gluten, utilisée en tacos; la farine est grande et souple pour les burritos","La tortilla maïs est plus grande","Elles sont identiques","La tortilla farine est sans gluten"],"correctIndex":0}', 0, 15),

('mx-5-2','mx-5','fill_in_blank','La plaque de cuisson traditionnelle mexicaine pour les tortillas s''appelle le ___.',
 '{"answer":"comal","hint":"Plaque plate en argile ou métal, chauffée à sec"}', 1, 20),

('mx-5-3','mx-5','step_ordering','Faire des tortillas de maïs :',
 '{"steps":["Mélanger masa harina et eau tiède jusqu''à obtenir une pâte souple","Former des boules de 30g et laisser reposer 15 min","Aplatir entre deux feuilles de papier cuisson avec une presse à tortillas","Cuire sur le comal chaud 30 sec de chaque côté","La tortilla doit gonfler légèrement et avoir des taches brunes","Empiler sous un torchon pour garder la chaleur et la souplesse"],"correctOrder":[0,1,2,3,4,5]}', 2, 30),

-- ============================================================
-- MEXICAIN — mx-6 : Le Mole Negro
-- ============================================================
('mx-6-1','mx-6','multiple_choice','Le mole negro est originaire de quel État mexicain ?',
 '{"options":["Oaxaca","Puebla","Jalisco","Yucatan"],"correctIndex":0}', 0, 15),

('mx-6-2','mx-6','fill_in_blank','L''ingrédient surprenant qui donne de la profondeur au mole negro est le chocolat ___ (sans sucre).',
 '{"answer":"noir","hint":"Ou chocolat amer, non sucré, à 70%+"}', 1, 20),

('mx-6-3','mx-6','association','Associe chaque type de mole à sa couleur/région :',
 '{"pairs":[{"left":"Mole negro","right":"Noir, Oaxaca, chili brûlé"},{"left":"Mole poblano","right":"Rouge foncé, Puebla, chocolat"},{"left":"Mole verde","right":"Vert, herbes fraîches et pepitas"},{"left":"Mole amarillo","right":"Jaune, cumin et piments doux"}]}', 2, 25),

-- ============================================================
-- INDIEN — in-1 : Les Épices Indiennes
-- ============================================================
('in-1-1','in-1','multiple_choice','Quelle épice donne la couleur jaune caractéristique du curry ?',
 '{"options":["Le curcuma","Le safran","Le paprika","La cardamome"],"correctIndex":0}', 0, 10),

('in-1-2','in-1','fill_in_blank','Le mélange d''épices qui signifie "mélange chaud" en hindi est le ___.',
 '{"answer":"garam masala","hint":"Cardamome, cannelle, clous de girofle, poivre noir..."}', 1, 10),

('in-1-3','in-1','association','Associe chaque épice à sa saveur dominante :',
 '{"pairs":[{"left":"Cardamome","right":"Fraîche et camphrée"},{"left":"Fenugrec","right":"Légèrement amère et caramel"},{"left":"Asafoetida","right":"Alliacée (remplace l''ail)"},{"left":"Clou de girofle","right":"Intense et anesthésiante"}]}', 2, 20),

-- ============================================================
-- INDIEN — in-2 : Le Dal Makhani
-- ============================================================
('in-2-1','in-2','multiple_choice','Quelle légumineuse est la base du dal makhani ?',
 '{"options":["Les lentilles noires entières (urad dal)","Les lentilles rouges","Les pois chiches","Les haricots mungo"],"correctIndex":0}', 0, 10),

('in-2-2','in-2','fill_in_blank','Le "makhani" dans le nom signifie "au beurre" — l''ingrédient riche qui termine la sauce est le ___ indien.',
 '{"answer":"ghee","hint":"Beurre clarifié indien"}', 1, 15),

('in-2-3','in-2','step_ordering','Préparer un dal makhani :',
 '{"steps":["Faire tremper les lentilles noires 8h puis rincer","Cuire à l''autocuiseur 30 min avec sel et eau","Faire revenir oignon, ail, gingembre dans le ghee","Ajouter tomates concassées, épices (cumin, coriandre, garam masala)","Mélanger les lentilles cuites à la sauce, mijoter 30 min","Terminer avec crème épaisse et ghee, laisser mijoter encore 15 min"],"correctOrder":[0,1,2,3,4,5]}', 2, 30),

-- ============================================================
-- INDIEN — in-3 : Le Curry Butter Chicken
-- ============================================================
('in-3-1','in-3','multiple_choice','Qu''est-ce que le "murgh makhani" (butter chicken) ?',
 '{"options":["Poulet tandoori en sauce tomate-beurre-crème","Poulet frit à la farine épicée","Poulet rôti à la broche","Poulet braisé au lait de coco"],"correctIndex":0}', 0, 10),

('in-3-2','in-3','fill_in_blank','La marinade du poulet pour le butter chicken à base de yaourt et d''épices s''appelle le ___.',
 '{"answer":"tandoori","hint":"Même nom que le four en argile traditionnel"}', 1, 15),

('in-3-3','in-3','step_ordering','Préparer un butter chicken :',
 '{"steps":["Mariner le poulet avec yaourt, citron et épices (8h minimum)","Griller le poulet au four à haute température","Faire revenir oignon, ail, gingembre dans le beurre","Ajouter tomates, épices (garam masala, kashmiri chili) et cuire 20 min","Mixer la sauce et la passer au tamis pour un résultat lisse","Ajouter le poulet grillé et la crème, mijoter 15 min"],"correctOrder":[0,1,2,3,4,5]}', 2, 30),

-- ============================================================
-- INDIEN — in-4 : Le Pain Naan
-- ============================================================
('in-4-1','in-4','multiple_choice','Le naan est traditionnellement cuit dans quel four ?',
 '{"options":["Le tandoor (four en argile à 450°C)","Un four électrique standard","Une poêle à sec","Un four à pizza en pierre"],"correctIndex":0}', 0, 10),

('in-4-2','in-4','fill_in_blank','La levure chimique qui rend le naan souple sans longue fermentation est le ___ de soude.',
 '{"answer":"bicarbonate","hint":"Alternative rapide à la levure boulangère"}', 1, 15),

('in-4-3','in-4','step_ordering','Faire des naans :',
 '{"steps":["Mélanger farine, yaourt, huile, sel et levure (ou bicarbonate)","Pétrir 10 min et laisser lever 1h","Diviser en boules et abaisser en ovales fins","Humidifier légèrement et parsemer de nigelle ou ail","Coller sur la paroi du four très chaud (ou poêle en fonte brûlante)","Cuire 2-3 min, retirer quand les bulles apparaissent, badigeonner de beurre"],"correctOrder":[0,1,2,3,4,5]}', 2, 30),

-- ============================================================
-- INDIEN — in-5 : Le Biryani Royal
-- ============================================================
('in-5-1','in-5','multiple_choice','Le biryani est originellement un plat de riz des cuisines :',
 '{"options":["Mogholes (Inde du Nord)","Draviennes (Inde du Sud)","Goanaises (côte ouest)","Bengalaises (est)"],"correctIndex":0}', 0, 15),

('in-5-2','in-5','fill_in_blank','La technique qui consiste à finir la cuisson du biryani à l''étouffée sous un couvercle hermétique s''appelle le ___.',
 '{"answer":"dum","hint":"Mot ourdou signifiant ''souffle'' ou ''vapeur douce''"}', 1, 25),

('in-5-3','in-5','step_ordering','Préparer un biryani :',
 '{"steps":["Mariner la viande avec yaourt, épices et safran 4h","Faire revenir oignons jusqu''à caramélisation dorée","Faire revenir la viande avec la marinade jusqu''à coloration","Cuire le riz basmati à moitié (al dente)","Superposer riz et viande en couches, disperser safran dilué et ghee","Sceller le couvercle avec de la pâte et cuire au dum 30 min"],"correctOrder":[0,1,2,3,4,5]}', 2, 40),

-- ============================================================
-- THAÏLANDAIS — th-1 : Les 4 Saveurs
-- ============================================================
('th-1-1','th-1','multiple_choice','Quel ingrédient apporte l''acidité dans la cuisine thaïlandaise ?',
 '{"options":["La citronnelle et le jus de citron vert","Le vinaigre de riz","Le tamarin uniquement","Le sumac"],"correctIndex":0}', 0, 10),

('th-1-2','th-1','fill_in_blank','La sauce fermentée de poisson thaïlandaise utilisée comme condiment salé est le ___.',
 '{"answer":"nam pla","hint":"Deux mots thaïs pour ''eau de poisson''"}', 1, 15),

('th-1-3','th-1','association','Associe chaque saveur à son ingrédient thaï :',
 '{"pairs":[{"left":"Sucré","right":"Sucre de palme"},{"left":"Salé","right":"Nam pla (sauce poisson)"},{"left":"Acide","right":"Jus de citron vert"},{"left":"Pimenté","right":"Piments oiseaux"}]}', 2, 20),

-- ============================================================
-- THAÏLANDAIS — th-2 : Le Pad Thaï
-- ============================================================
('th-2-1','th-2','multiple_choice','Quelles nouilles utilise-t-on pour le pad thaï ?',
 '{"options":["Nouilles de riz plates (sen lek)","Nouilles de blé ramen","Vermicelles de verre","Spaghettis"],"correctIndex":0}', 0, 10),

('th-2-2','th-2','fill_in_blank','La pâte fermentée de crevettes qui donne de l''umami au pad thaï s''appelle la ___ de crevettes.',
 '{"answer":"pâte","hint":"Aussi connue sous le nom de ''kapi'' en thaï"}', 1, 15),

('th-2-3','th-2','step_ordering','Cuire un pad thaï :',
 '{"steps":["Faire tremper les nouilles de riz 30 min dans l''eau froide","Chauffer le wok à feu très vif avec de l''huile","Faire sauter les crevettes et les retirer","Ajouter l''œuf, brouiller rapidement","Ajouter les nouilles égouttées et la sauce (tamarin, nam pla, sucre)","Remettre les crevettes, ajouter germes de soja et ciboule","Servir avec cacahuètes broyées, citron vert et piment séché"],"correctOrder":[0,1,2,3,4,5,6]}', 2, 35),

-- ============================================================
-- THAÏLANDAIS — th-3 : Tom Kha Gaï
-- ============================================================
('th-3-1','th-3','multiple_choice','Le galanga est souvent confondu avec le gingembre mais il est :',
 '{"options":["Plus poivré et terreux, moins piquant que le gingembre","Plus sucré","Plus parfumé à la vanille","Identique au gingembre"],"correctIndex":0}', 0, 15),

('th-3-2','th-3','fill_in_blank','Le ''Kha'' dans ''Tom Kha Gaï'' désigne le ___, racine aromatique de la famille du gingembre.',
 '{"answer":"galanga","hint":"Rhizome thaïlandais essentiel"}', 1, 20),

('th-3-3','th-3','step_ordering','Préparer une soupe Tom Kha Gaï :',
 '{"steps":["Chauffer le lait de coco dans la casserole","Ajouter galanga, citronnelle, feuilles de combava, piments","Incorporer le bouillon de poule et porter à frémissement","Ajouter le poulet émincé et cuire 10 min","Assaisonner avec nam pla et sucre de palme","Terminer avec jus de citron vert et champignons eryngii","Servir garni de feuilles de coriandre"],"correctOrder":[0,1,2,3,4,5,6]}', 2, 30),

-- ============================================================
-- THAÏLANDAIS — th-4 : La Pâte de Curry Vert
-- ============================================================
('th-4-1','th-4','multiple_choice','La couleur verte de la pâte de curry vert vient de :',
 '{"options":["Les piments verts frais et les herbes","Les feuilles d''épinards","Le concombre","La citronnelle"],"correctIndex":0}', 0, 15),

('th-4-2','th-4','fill_in_blank','L''outil traditionnel pour préparer la pâte de curry est le ___ en pierre.',
 '{"answer":"mortier","hint":"Pilon et mortier — même en français"}', 1, 15),

('th-4-3','th-4','step_ordering','Préparer une pâte de curry vert maison :',
 '{"steps":["Torréfier à sec les épices sèches (coriandre, cumin, poivre blanc)","Mixer piments verts, citronnelle, galanga, ail, échalotes","Ajouter épices torréfiées et pâte de crevettes","Piler au mortier 20-30 min pour obtenir une pâte lisse","Conserver au frais jusqu''à 2 semaines ou congeler en portions"],"correctOrder":[0,1,2,3,4]}', 2, 30),

-- ============================================================
-- THAÏLANDAIS — th-5 : Le Larb
-- ============================================================
('th-5-1','th-5','multiple_choice','Le larb est une salade de viande originaire de quelle région ?',
 '{"options":["Le nord de la Thaïlande (Chiang Mai) et du Laos","Bangkok","Le sud de la Thaïlande","La côte est"],"correctIndex":0}', 0, 15),

('th-5-2','th-5','fill_in_blank','Le riz grillé et réduit en poudre qui donne du croquant au larb s''appelle le ___ de riz.',
 '{"answer":"riz toasté","hint":"Aussi appelé ''khao khua'' en thaï"}', 1, 20),

('th-5-3','th-5','step_ordering','Préparer un larb de viande :',
 '{"steps":["Griller le riz à sec dans une poêle jusqu''à coloration, puis le moudre grossièrement","Cuire la viande hachée à la poêle sans corps gras jusqu''à juste cuisson","Assaisonner avec nam pla, jus de citron vert, piment en poudre","Ajouter le riz toasté, les échalotes émincées et les herbes (menthe, coriandre)","Mélanger et goûter pour équilibrer les 4 saveurs","Servir tiède avec du riz gluant et des légumes crus"],"correctOrder":[0,1,2,3,4,5]}', 2, 35),

-- ============================================================
-- GREC — gr-1 : Bases Méditerranéennes
-- ============================================================
('gr-1-1','gr-1','multiple_choice','Qu''est-ce qui distingue l''huile d''olive grecque des autres ?',
 '{"options":["Elle est souvent plus fruitée et intense, avec une forte teneur en polyphénols","Elle est neutre et légère","Elle convient moins à la cuisson","Elle est toujours douce"],"correctIndex":0}', 0, 10),

('gr-1-2','gr-1','fill_in_blank','La principale herbe aromatique grecque séchée sur les collines est ___.',
 '{"answer":"origan","hint":"Herbe emblématique de la pizza et de la cuisine méditerranéenne"}', 1, 10),

('gr-1-3','gr-1','association','Associe chaque fromage grec à sa texture :',
 '{"pairs":[{"left":"Féta","right":"Friable, saumuré, salé"},{"left":"Halloumi","right":"Ferme, grillable sans fondre"},{"left":"Graviera","right":"Dur, goût de noisette"},{"left":"Manouri","right":"Doux, crémeux, frais"}]}', 2, 20),

-- ============================================================
-- GREC — gr-2 : Le Tzatziki
-- ============================================================
('gr-2-1','gr-2','multiple_choice','Pour éviter un tzatziki liquide, que faut-il faire avec le concombre ?',
 '{"options":["Le râper et l''égoutter avec du sel","Le cuire","Le hacher grossièrement","Le mettre congelé"],"correctIndex":0}', 0, 10),

('gr-2-2','gr-2','fill_in_blank','Le yaourt utilisé dans le tzatziki est le yaourt ___, très épais et non sucré.',
 '{"answer":"grec","hint":"Nom de la cuisine dont cette recette est issue"}', 1, 10),

('gr-2-3','gr-2','step_ordering','Préparer le tzatziki :',
 '{"steps":["Râper le concombre et saupoudrer de sel, laisser dégorger 15 min","Presser le concombre pour en extraire l''eau","Émincer l''ail finement","Mélanger yaourt grec, concombre, ail, aneth","Assaisonner de sel, poivre et un filet d''huile d''olive","Réfrigérer au moins 1h avant de servir"],"correctOrder":[0,1,2,3,4,5]}', 2, 20),

-- ============================================================
-- GREC — gr-3 : Les Mezze
-- ============================================================
('gr-3-1','gr-3','multiple_choice','Le houmous est à base de :',
 '{"options":["Pois chiches, tahini, citron et ail","Lentilles, citron et cumin","Aubergines fumées et tahini","Fèves et persil"],"correctIndex":0}', 0, 10),

('gr-3-2','gr-3','fill_in_blank','Les feuilles de vigne farcies de riz et d''herbes aromatiques s''appellent les ___.',
 '{"answer":"dolmades","hint":"Ou dolmas — terme largement répandu en Méditerranée"}', 1, 15),

('gr-3-3','gr-3','association','Associe chaque mezze à sa composition :',
 '{"pairs":[{"left":"Tarama","right":"Œufs de poisson, pain, citron"},{"left":"Spanakopita","right":"Épinards et féta en pâte filo"},{"left":"Saganaki","right":"Fromage frit ou flambé"},{"left":"Tirokafteri","right":"Féta pimentée et mixée"}]}', 2, 20),

-- ============================================================
-- GREC — gr-4 : La Moussaka
-- ============================================================
('gr-4-1','gr-4','multiple_choice','La moussaka traditionnelle grecque utilise quelle viande ?',
 '{"options":["L''agneau haché","Le porc haché","Le veau","Le poulet"],"correctIndex":0}', 0, 10),

('gr-4-2','gr-4','fill_in_blank','La sauce blanche dorée sur la moussaka est la sauce ___.',
 '{"answer":"béchamel","hint":"Sauce mère française adoptée par la cuisine grecque"}', 1, 10),

('gr-4-3','gr-4','step_ordering','Préparer une moussaka :',
 '{"steps":["Couper les aubergines en tranches, saler et laisser dégorger 20 min","Faire griller ou frire les tranches d''aubergines","Préparer la sauce bolognaise à l''agneau avec cannelle et tomates","Préparer une béchamel épaisse et l''enrichir d''un jaune d''œuf","Alterner couches d''aubergines et de viande dans le plat","Napper de béchamel et enfourner 45 min à 180°C"],"correctOrder":[0,1,2,3,4,5]}', 2, 35),

-- ============================================================
-- GREC — gr-5 : Le Baklava
-- ============================================================
('gr-5-1','gr-5','multiple_choice','La pâte ultra-fine utilisée dans le baklava est la pâte :',
 '{"options":["Filo","Brick","Feuilletée","Brisée"],"correctIndex":0}', 0, 10),

('gr-5-2','gr-5','fill_in_blank','Le sirop versé sur le baklava chaud est parfumé à l''eau de rose ou à l''eau de fleur d''___.',
 '{"answer":"oranger","hint":"Parfum méditerranéen classique des pâtisseries"}', 1, 15),

('gr-5-3','gr-5','step_ordering','Préparer le baklava :',
 '{"steps":["Broyer grossièrement les noix et pistaches avec sucre et cannelle","Beurrer généreusement le plat","Alterner feuilles de filo beurrées et couches de noix (3 feuilles + 1 couche de noix)","Terminer par 6-8 feuilles de filo beurrées","Découper en losanges avant cuisson avec un couteau tranchant","Enfourner 30 min à 180°C","Verser le sirop chaud sur le baklava chaud à la sortie du four"],"correctOrder":[0,1,2,3,4,5,6]}', 2, 40),

-- ============================================================
-- CHINOIS — cn-1 : Les Techniques au Wok
-- ============================================================
('cn-1-1','cn-1','multiple_choice','Pourquoi le wok traditionnel est-il en acier au carbone et non en inox ?',
 '{"options":["Il conduit mieux la chaleur et développe une patine antiadhésive naturelle","Il est plus léger","Il rouille moins","Il coûte moins cher"],"correctIndex":0}', 0, 10),

('cn-1-2','cn-1','fill_in_blank','La technique qui consiste à précuire la viande dans une marinade fécule-blanc d''œuf pour la garder tendre s''appelle le ___.',
 '{"answer":"velveting","hint":"Mot anglais, technique chinoise — viande ''veloutée''"}', 1, 20),

('cn-1-3','cn-1','multiple_choice','Le "wok hei" (souffle du wok) est :',
 '{"options":["L''arôme fumé acquis par la cuisson à feu vif dans un wok culotté","Le son caractéristique du wok","La couleur dorée des aliments","La vapeur qui s''en dégage"],"correctIndex":0}', 2, 15),

-- ============================================================
-- CHINOIS — cn-2 : Les Dim Sum
-- ============================================================
('cn-2-1','cn-2','multiple_choice','Quelle est la tradition qui accompagne les dim sum ?',
 '{"options":["Le yum cha — boire du thé tout en partageant des petits plats","Le partage d''un plat unique","Le service en buffet","Le repas debout"],"correctIndex":0}', 0, 10),

('cn-2-2','cn-2','fill_in_blank','Les raviolis dim sum cuits à la vapeur dans un panier en bambou s''appellent le ___.',
 '{"answer":"har gow","hint":"Har gow : crevettes en enveloppe translucide"}', 1, 20),

('cn-2-3','cn-2','step_ordering','Préparer des har gow (raviolis crevettes) :',
 '{"steps":["Hacher les crevettes grossièrement, assaisonner avec sauce soja, huile de sésame, maïzena","Pétrir la pâte de fécule de blé et eau bouillante","Abaisser en petits ronds très fins","Placer une cuillerée de farce au centre","Plier et pincer pour former les raviolis","Cuire à la vapeur 8 min dans un panier en bambou huilé"],"correctOrder":[0,1,2,3,4,5]}', 2, 35),

-- ============================================================
-- CHINOIS — cn-3 : Le Mapo Tofu
-- ============================================================
('cn-3-1','cn-3','multiple_choice','De quelle région de Chine vient le mapo tofu ?',
 '{"options":["Sichuan","Canton","Shanghaï","Pékin"],"correctIndex":0}', 0, 10),

('cn-3-2','cn-3','fill_in_blank','La pâte de haricots fermentés piquante essentielle au mapo tofu est la ___.',
 '{"answer":"doubanjiang","hint":"Pâte rouge-brun, cœur de la cuisine du Sichuan"}', 1, 20),

('cn-3-3','cn-3','step_ordering','Préparer le mapo tofu :',
 '{"steps":["Couper le tofu soyeux en cubes de 2 cm et le blanchir dans l''eau salée","Faire revenir porc haché dans l''huile jusqu''à dorure","Ajouter l''ail, le gingembre et la doubanjiang, cuire 2 min","Verser le bouillon, ajouter les cubes de tofu délicatement","Épaissir avec de la maïzena délayée","Terminer avec l''huile de sésame, les oignons verts et le poivre du Sichuan moulu"],"correctOrder":[0,1,2,3,4,5]}', 2, 30),

-- ============================================================
-- CHINOIS — cn-4 : Le Porc Laqué (Char Siu)
-- ============================================================
('cn-4-1','cn-4','multiple_choice','Que signifie "Char Siu" en cantonais ?',
 '{"options":["''Porc rôti à la broche''","''Porc rouge sucré''","''Porc laqué au miel''","''Porc à la sauce hoisin''"],"correctIndex":0}', 0, 15),

('cn-4-2','cn-4','fill_in_blank','La couleur rouge caractéristique du char siu vient de la sauce ___ fermentée.',
 '{"answer":"hoisin","hint":"Sauce fermentée sucrée à base de soja et d''aromates"}', 1, 20),

('cn-4-3','cn-4','step_ordering','Préparer le char siu :',
 '{"steps":["Mélanger sauce hoisin, miel, sauce soja, huître, vin de Shaoxing et colorant rouge (optionnel)","Mariner l''échine de porc en morceaux 24h au frigo","Sortir la viande 30 min avant, éponger et badigeonner de marinade","Rôtir au four à 220°C 20 min","Badigeonner de miel et remettre 5 min pour glacer","Laisser reposer 10 min avant de trancher finement"],"correctOrder":[0,1,2,3,4,5]}', 2, 35),

-- ============================================================
-- CHINOIS — cn-5 : Le Canard Laqué de Pékin
-- ============================================================
('cn-5-1','cn-5','multiple_choice','La clé du canard laqué de Pékin est :',
 '{"options":["La peau séchée à l''air plusieurs heures pour un résultat ultra-croustillant","La marinade humide","La cuisson à basse température","La farce aux herbes"],"correctIndex":0}', 0, 15),

('cn-5-2','cn-5','fill_in_blank','Le canard laqué se sert dans des galettes de blé appelées ___.',
 '{"answer":"mandarin pancakes","hint":"Crêpes très fines servies avec concombre, oignon et sauce hoisin"}', 1, 25),

('cn-5-3','cn-5','step_ordering','Préparer le canard laqué de Pékin :',
 '{"steps":["Blanchir le canard entier à l''eau bouillante pour resserrer la peau","Injecter de l''air entre la peau et la chair avec une poire à jus","Badigeonner de sirop (miel, vinaigre de riz) et sécher 24-48h au frigo","Rôtir à 220°C en retournant toutes les 20 min","Laisser reposer 15 min avant de découper","Servir peau croustillante, chair effilochée, galettes, sauce hoisin et julienne de concombre"],"correctOrder":[0,1,2,3,4,5]}', 2, 45),

-- ============================================================
-- PÂTISSERIE — pa-1 : Les Bases Pâtissières
-- ============================================================
('pa-1-1','pa-1','multiple_choice','Quelle pâte est la plus friable et sucrée ?',
 '{"options":["La pâte sablée","La pâte brisée","La pâte feuilletée","La pâte à choux"],"correctIndex":0}', 0, 10),

('pa-1-2','pa-1','fill_in_blank','La technique qui consiste à mélanger beurre et farine en sable sans former de réseau de gluten s''appelle ___.',
 '{"answer":"sabler","hint":"Obtenir la texture d''un sable fin avec les doigts"}', 1, 15),

('pa-1-3','pa-1','association','Associe chaque pâte à son usage :',
 '{"pairs":[{"left":"Pâte brisée","right":"Quiche et tartes salées"},{"left":"Pâte sucrée","right":"Tartes aux fruits et desserts"},{"left":"Pâte sablée","right":"Biscuits et fonds de tarte friables"},{"left":"Pâte feuilletée","right":"Mille-feuilles et galettes des rois"}]}', 2, 20),

-- ============================================================
-- PÂTISSERIE — pa-2 : La Crème Pâtissière
-- ============================================================
('pa-2-1','pa-2','multiple_choice','Quel ingrédient épaissit la crème pâtissière ?',
 '{"options":["La fécule de maïs ou la farine, avec les jaunes d''œufs","Le beurre","La gélatine","La crème fouettée"],"correctIndex":0}', 0, 10),

('pa-2-2','pa-2','fill_in_blank','La crème pâtissière mélangée à de la crème fouettée s''appelle la crème ___.',
 '{"answer":"diplomate","hint":"Crème légère, idéale pour les choux et mille-feuilles"}', 1, 20),

('pa-2-3','pa-2','step_ordering','Préparer une crème pâtissière :',
 '{"steps":["Chauffer le lait avec la vanille fendue","Blanchir les jaunes avec le sucre et la fécule","Verser le lait chaud sur les jaunes en fouettant","Reverser dans la casserole et cuire à feu moyen en fouettant","Cuire jusqu''à épaississement et 1 min après ébullition","Incorporer le beurre froid en dés, filmer au contact et refroidir"],"correctOrder":[0,1,2,3,4,5]}', 2, 30),

-- ============================================================
-- PÂTISSERIE — pa-3 : Les Éclairs au Chocolat
-- ============================================================
('pa-3-1','pa-3','multiple_choice','La pâte à choux gonfle grâce à :',
 '{"options":["La vapeur d''eau produite par les œufs à la cuisson","La levure chimique","Le beurre qui fond","Le sucre qui caramélise"],"correctIndex":0}', 0, 10),

('pa-3-2','pa-3','fill_in_blank','Le glaçage brillant sur les éclairs est un fondant ou un ___ au chocolat.',
 '{"answer":"glaçage","hint":"Enrobage brillant, souvent à base de chocolat tempéré"}', 1, 15),

('pa-3-3','pa-3','step_ordering','Réaliser des éclairs au chocolat :',
 '{"steps":["Préparer la pâte à choux : eau, beurre, farine, œufs","Pocher les éclairs en boudins de 12 cm sur la plaque","Cuire à 180°C 25-30 min sans ouvrir le four","Laisser refroidir sur grille","Garnir de crème pâtissière au chocolat avec une poche à douille","Tremper le dessus dans le fondant au chocolat chauffé à 37°C","Réfrigérer 30 min avant de servir"],"correctOrder":[0,1,2,3,4,5,6]}', 2, 40),

-- ============================================================
-- PÂTISSERIE — pa-4 : Les Macarons
-- ============================================================
('pa-4-1','pa-4','multiple_choice','Quelle meringue donne des macarons plus stables ?',
 '{"options":["La meringue italienne (sirop de sucre cuit)","La meringue française","La meringue suisse","Les trois donnent le même résultat"],"correctIndex":0}', 0, 15),

('pa-4-2','pa-4','fill_in_blank','Le mélange de poudre d''amandes et de sucre glace à parts égales s''appelle le ___.',
 '{"answer":"tant-pour-tant","hint":"50% amandes / 50% sucre glace"}', 1, 20),

('pa-4-3','pa-4','step_ordering','Réaliser des coques de macarons :',
 '{"steps":["Mixer et tamiser le tant-pour-tant (amandes + sucre glace)","Préparer la meringue italienne : cuire sirop à 118°C, verser sur blancs montés","Incorporer la meringue au tant-pour-tant : macaronner jusqu''au ruban","Pocher des ronds de 4 cm sur tapis silicone","Laisser croûter à l''air libre 30-60 min","Enfourner à 150°C 12-13 min","Laisser refroidir complètement avant de garnir"],"correctOrder":[0,1,2,3,4,5,6]}', 2, 50),

-- ============================================================
-- PÂTISSERIE — pa-5 : La Pâte Feuilletée
-- ============================================================
('pa-5-1','pa-5','multiple_choice','Combien de couches de beurre obtient-on après 6 tours simples de pâte feuilletée ?',
 '{"options":["729 couches","64 couches","512 couches","1000 couches"],"correctIndex":0}', 0, 20),

('pa-5-2','pa-5','fill_in_blank','La pâte de base avant d''incorporer le beurre s''appelle la ___.',
 '{"answer":"détrempe","hint":"Farine, eau, sel et un peu de beurre — avant le tourage"}', 1, 20),

('pa-5-3','pa-5','step_ordering','Réaliser une pâte feuilletée :',
 '{"steps":["Préparer la détrempe (farine, eau, sel, beurre fondu) et la laisser reposer 30 min","Préparer le beurrage : façonner le beurre sec en carré de 1 cm","Enfermer le beurrage dans la détrempe (croix)","Donner 2 tours simples, filmer et réfrigérer 30 min","Répéter 2 tours, repos, puis 2 derniers tours (6 tours total)","Laisser reposer 1h au frais avant d''abaisser et utiliser"],"correctOrder":[0,1,2,3,4,5]}', 2, 50),

-- ============================================================
-- BBQ — bb-1 : Choisir son Bois de Fumage
-- ============================================================
('bb-1-1','bb-1','multiple_choice','Quel bois est le plus fort et utilisé pour les viandes de bœuf ?',
 '{"options":["Hickory ou mesquite","Pommier","Cerisier","Hêtre"],"correctIndex":0}', 0, 10),

('bb-1-2','bb-1','fill_in_blank','Le bois de ___ donne une saveur légèrement sucrée et fruitée, idéale pour la volaille et le porc.',
 '{"answer":"cerisier","hint":"Arbre fruitier, bois rouge caractéristique"}', 1, 15),

('bb-1-3','bb-1','association','Associe chaque bois à la viande qu''il accompagne le mieux :',
 '{"pairs":[{"left":"Mesquite","right":"Bœuf et agneau"},{"left":"Pommier","right":"Porc et poulet doux"},{"left":"Hickory","right":"Porc ribs et épaule"},{"left":"Hêtre","right":"Poisson et légumes"}]}', 2, 20),

-- ============================================================
-- BBQ — bb-2 : Les Marinades
-- ============================================================
('bb-2-1','bb-2','multiple_choice','Un dry rub est :',
 '{"options":["Un mélange d''épices sèches frotté sur la viande","Une marinade liquide","Une sauce de finition","Un mode de cuisson"],"correctIndex":0}', 0, 10),

('bb-2-2','bb-2','fill_in_blank','L''ingrédient acide d''une marinade (citron, vinaigre) a pour rôle de ___ les protéines de la viande.',
 '{"answer":"attendrir","hint":"Dénaturer partiellement les fibres musculaires"}', 1, 15),

('bb-2-3','bb-2','multiple_choice','Combien de temps faut-il mariner des ribs ?',
 '{"options":["12 à 24 heures minimum","30 minutes","2 heures","48 heures, jamais moins"],"correctIndex":0}', 2, 10),

-- ============================================================
-- BBQ — bb-3 : Le Pulled Pork
-- ============================================================
('bb-3-1','bb-3','multiple_choice','Quelle partie du porc est idéale pour le pulled pork ?',
 '{"options":["L''épaule (soc ou boston butt)","Le filet mignon","Les côtelettes","La longe"],"correctIndex":0}', 0, 10),

('bb-3-2','bb-3','fill_in_blank','La température interne cible pour que le collagène se transforme en gélatine dans le pulled pork est ___ °C.',
 '{"answer":"95","hint":"Entre 93 et 96°C — la viande s''effiloche seule"}', 1, 20),

('bb-3-3','bb-3','step_ordering','Préparer un pulled pork :',
 '{"steps":["Appliquer le dry rub sur l''épaule et laisser mariner 12h","Préparer le fumoir à 110°C avec du hickory","Enfumer l''épaule 8-10h jusqu''à une température interne de 75°C","Envelopper dans du papier boucher (Texas crutch) et continuer à 95°C","Laisser reposer 1h dans une glacière isotherme","Effilocher la viande avec deux fourchettes et mélanger au jus"],"correctOrder":[0,1,2,3,4,5]}', 2, 35),

-- ============================================================
-- BBQ — bb-4 : Les Ribs Kansas City
-- ============================================================
('bb-4-1','bb-4','multiple_choice','Les ribs style Kansas City se caractérisent par :',
 '{"options":["Une sauce BBQ sucrée appliquée en fin de cuisson qui caramélise","Une sauce vinaigrée sans sucre","Un fumage sans sauce","Une cuisson directe sur la flamme"],"correctIndex":0}', 0, 10),

('bb-4-2','bb-4','fill_in_blank','Pour des ribs fondants, on utilise la méthode ___ : 3h fumées, 2h emballées, 1h glaçage.',
 '{"answer":"3-2-1","hint":"Trois chiffres séparés par des tirets"}', 1, 20),

('bb-4-3','bb-4','step_ordering','Cuire des ribs Kansas City :',
 '{"steps":["Retirer la membrane du dos des ribs","Appliquer le dry rub (paprika, cassonade, ail, sel, poivre)","Fumer à 110°C pendant 3h avec du cerisier ou hickory","Envelopper dans du papier alu avec beurre, cassonade et sauce, cuire 2h","Retirer l''emballage et badigeonner de sauce BBQ","Remettre 1h pour caraméliser la sauce","Laisser reposer 10 min avant de couper entre les os"],"correctOrder":[0,1,2,3,4,5,6]}', 2, 40),

-- ============================================================
-- BBQ — bb-5 : Le Brisket Texas
-- ============================================================
('bb-5-1','bb-5','multiple_choice','Le brisket est quelle partie du bœuf ?',
 '{"options":["La poitrine (pectoral)","L''entrecôte","L''épaule","Le jarret"],"correctIndex":0}', 0, 10),

('bb-5-2','bb-5','fill_in_blank','La croûte foncée et caramélisée qui se forme sur le brisket s''appelle le ___.',
 '{"answer":"bark","hint":"Mot anglais pour ''écorce'' — croûte croustillante et savoureuse"}', 1, 20),

('bb-5-3','bb-5','step_ordering','Fumer un brisket style Texas :',
 '{"steps":["Parer le brisket : retirer l''excès de gras mais garder 6mm de chapeau","Assaisonner uniquement sel grossier et poivre noir concassé (style Texas)","Fumer au chêne ou hickory à 110-120°C pendant 6-8h","Quand la température interne stagne à 70°C (''stall''), envelopper dans du papier boucher","Continuer à fumer jusqu''à 95°C interne (4-6h supplémentaires)","Laisser reposer 2h minimum dans une glacière avant de trancher perpendiculairement aux fibres"],"correctOrder":[0,1,2,3,4,5]}', 2, 50),

-- ============================================================
-- VEGAN — vg-1 : Les Bases du Vegan
-- ============================================================
('vg-1-1','vg-1','multiple_choice','Quel substitut végétal remplace les œufs en pâtisserie ?',
 '{"options":["La compote de pommes, les graines de lin ou l''aquafaba","La margarine","Le lait d''amande","La fécule seule"],"correctIndex":0}', 0, 10),

('vg-1-2','vg-1','fill_in_blank','Le jus de pois chiches qui monte en neige comme les blancs d''œufs s''appelle ___.',
 '{"answer":"aquafaba","hint":"Aqua (eau) + faba (fève en latin)"}', 1, 15),

('vg-1-3','vg-1','association','Associe chaque ingrédient à ce qu''il remplace :',
 '{"pairs":[{"left":"Huile de coco","right":"Beurre en pâtisserie"},{"left":"Graines de lin moulues + eau","right":"Œufs liants"},{"left":"Lait d''avoine","right":"Lait de vache"},{"left":"Noix de cajou trempées","right":"Crème ou fromage frais"}]}', 2, 20),

-- ============================================================
-- VEGAN — vg-2 : Le Buddha Bowl
-- ============================================================
('vg-2-1','vg-2','multiple_choice','Un buddha bowl réussi contient idéalement :',
 '{"options":["Une céréale, une protéine végétale, des légumes crus et cuits, une sauce","Uniquement des crudités","Du riz blanc et de la sauce soja","Un seul ingrédient végétal"],"correctIndex":0}', 0, 10),

('vg-2-2','vg-2','fill_in_blank','La sauce crémeuse à base de purée de sésame utilisée dans les buddha bowls est la sauce ___.',
 '{"answer":"tahini","hint":"Purée de sésame d''origine moyen-orientale"}', 1, 15),

('vg-2-3','vg-2','step_ordering','Assembler un buddha bowl :',
 '{"steps":["Cuire la céréale de base (quinoa, riz brun, orge)","Rôtir les légumes au four (patate douce, brocoli, pois chiches)","Préparer la sauce tahini (tahini, citron, ail, eau)","Couper les crudités (concombre, carottes, chou rouge)","Disposer les éléments en sections dans un bol","Napper de sauce et garnir de graines et d''herbes"],"correctOrder":[0,1,2,3,4,5]}', 2, 25),

-- ============================================================
-- VEGAN — vg-3 : Protéines Végétales
-- ============================================================
('vg-3-1','vg-3','multiple_choice','Qu''est-ce que le tempeh ?',
 '{"options":["Soja fermenté en bloc compact, plus riche en protéines que le tofu","Soja caillé et pressé comme un fromage","Farine de soja déshydratée","Lait de soja épaissi"],"correctIndex":0}', 0, 15),

('vg-3-2','vg-3','fill_in_blank','Le seitan est fabriqué à partir du ___ de blé, le gluten.',
 '{"answer":"gluten","hint":"Protéine du blé, très proche texturalement de la viande"}', 1, 15),

('vg-3-3','vg-3','association','Associe chaque protéine végétale à sa texture :',
 '{"pairs":[{"left":"Tofu soyeux","right":"Crémeux, idéal pour mousses et crèmes"},{"left":"Tofu ferme","right":"Dense, à couper en dés pour sautés"},{"left":"Tempeh","right":"Compact et noisette, se coupe en tranches"},{"left":"Seitan","right":"Fibreux et moelleux, ressemble à la viande"}]}', 2, 20),

-- ============================================================
-- VEGAN — vg-4 : Les Fromages Végétaux
-- ============================================================
('vg-4-1','vg-4','multiple_choice','La levure nutritionnelle apporte dans les fromages végétaux :',
 '{"options":["Une saveur umami et fromagère naturelle","Du calcium","Une texture ferme","De la couleur"],"correctIndex":0}', 0, 15),

('vg-4-2','vg-4','fill_in_blank','La base des fromages vegans à pâte molle est la noix de ___ trempée et mixée.',
 '{"answer":"cajou","hint":"Noix douce et crémeuse d''origine tropicale"}', 1, 15),

('vg-4-3','vg-4','step_ordering','Préparer un cashew cheese (fromage cajou) :',
 '{"steps":["Faire tremper les noix de cajou 6-8h dans l''eau froide","Les égoutter et rincer","Mixer avec levure nutritionnelle, jus de citron, ail et sel","Ajouter de l''eau progressivement pour la texture souhaitée","Assaisonner avec herbes ou épices (poivre fumé, paprika)","Réfrigérer 2h pour raffermir"],"correctOrder":[0,1,2,3,4,5]}', 2, 30),

-- ============================================================
-- VEGAN — vg-5 : Le Rôti de Seitan
-- ============================================================
('vg-5-1','vg-5','multiple_choice','Qu''est-ce qui donne au seitan sa texture fibreuse proche de la viande ?',
 '{"options":["Le réseau de gluten développé pendant le pétrissage","La cuisson à la vapeur","Le bouillon de cuisson","Le sel"],"correctIndex":0}', 0, 15),

('vg-5-2','vg-5','fill_in_blank','La farine de gluten pur utilisée pour faire du seitan s''appelle le ___ de blé.',
 '{"answer":"gluten","hint":"On dit aussi ''vital wheat gluten''"}', 1, 15),

('vg-5-3','vg-5','step_ordering','Préparer un rôti de seitan :',
 '{"steps":["Mélanger gluten de blé, levure nutritionnelle et épices","Ajouter bouillon, sauce soja et huile pour former une pâte","Pétrir 5 min pour développer la texture fibreuse","Façonner en rôti et envelopper dans du film alimentaire","Cuire à la vapeur 45 min","Déballer, badigeonner de marinade et rôtir au four 25 min à 200°C pour dorer"],"correctOrder":[0,1,2,3,4,5]}')


