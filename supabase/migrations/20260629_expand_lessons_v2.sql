-- RecipeQuest — Expansion des leçons (VERSION 2 — UUIDs auto)
-- Utilise gen_random_uuid() et JOIN sur paths.slug pour éviter les IDs hardcodés

-- FRANÇAIS
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward)
SELECT gen_random_uuid(), p.id, v.title, v.description, v.order_index, v.xp_reward
FROM (VALUES
  ('La Ratatouille','Légumes du soleil confits à la provençale',6,35),
  ('Le Confit de Canard','Cuisson douce dans la graisse et conservation',7,50),
  ('La Tarte Tatin','Tarte aux pommes caramélisées à l''envers',8,40),
  ('Le Pot-au-Feu','Bouillon, légumes et viandes mijotés ensemble',9,50),
  ('Les Gougères','Chouquettes au comté, apéritif bourguignon',10,35),
  ('La Bavette à l''Échalote','Sauce classique à l''échalote et au vin rouge',11,40),
  ('Le Coq au Vin','Poulet braisé au vin rouge façon grand-mère',12,55),
  ('La Vichyssoise','Soupe froide de poireaux et pommes de terre',13,35),
  ('Le Canard à l''Orange','Magret et sauce bigarade aux agrumes',14,55),
  ('Les Oeufs Cocotte','Œufs parfaits en cocotte crème et herbes',15,30),
  ('La Brandade de Morue','Morue dessalée, huile d''olive et pommes de terre',16,45),
  ('Le Paris-Brest','Choux, praliné et crème mousseline',17,65),
  ('La Bouillabaisse','Soupe de poissons marseillaise et rouille',18,60),
  ('Le Millefeuille','Feuilletage, crème pâtissière et fondant',19,70)
) AS v(title,description,order_index,xp_reward)
CROSS JOIN (SELECT id FROM public.paths WHERE slug='french' LIMIT 1) p
ON CONFLICT (path_id, order_index) DO NOTHING;

-- ITALIEN
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward)
SELECT gen_random_uuid(), p.id, v.title, v.description, v.order_index, v.xp_reward
FROM (VALUES
  ('Le Pesto Genovese','Basilic, pignons, ail et huile d''olive au mortier',6,30),
  ('Les Gnocchi di Patate','Pommes de terre, farine et la règle de légèreté',7,40),
  ('La Focaccia Genovese','Pain plat moelleux à la ligurienne',8,35),
  ('L''Osso Buco à la Milanaise','Jarret de veau braisé et gremolata',9,55),
  ('La Panna Cotta','Crème prise à la gélatine et coulis de fruits rouges',10,35),
  ('Les Arancini Siciliens','Boulettes de risotto frites panées',11,40),
  ('La Parmigiana di Melanzane','Aubergines, tomates et mozzarella gratinées',12,45),
  ('Cacio e Pepe Romaine','Pâtes romaines au pecorino et poivre noir',13,40),
  ('Les Lasagne al Forno','Ragù, béchamel et pâtes fraîches en couches',14,60),
  ('La Polenta Crémeuse','Maïs cuisiné à la cuillère en bois, fromages fondus',15,35),
  ('Le Saltimbocca alla Romana','Escalopes de veau, jambon de Parme et sauge',16,45),
  ('La Ribollita Toscane','Soupe toscane pain-légumes-haricots mijotée',17,40),
  ('La Torta Caprese','Gâteau amandes-chocolat sans farine',18,45),
  ('Le Cannolo Sicilien','Tubes frits farcis à la ricotta sucrée',19,55)
) AS v(title,description,order_index,xp_reward)
CROSS JOIN (SELECT id FROM public.paths WHERE slug='italian' LIMIT 1) p
ON CONFLICT (path_id, order_index) DO NOTHING;

-- JAPONAIS
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward)
SELECT gen_random_uuid(), p.id, v.title, v.description, v.order_index, v.xp_reward
FROM (VALUES
  ('La Soupe Miso','Dashi, miso et tofu, le rituel du matin',6,25),
  ('Les Gyoza','Raviolis pan-frits croustillants dessous',7,40),
  ('Le Tonkatsu','Côtelette panko et sauce Worcestershire',8,35),
  ('L''Oyakodon','Poulet et œufs sur riz, le bol réconfort',9,35),
  ('Le Katsu Curry','Curry japonais doux et tonkatsu croustillant',10,45),
  ('Les Onigiri','Triangles de riz farcis et nappés de nori',11,30),
  ('Le Poulet Teriyaki','Laque sucrée-salée au mirin et sauce soja',12,35),
  ('L''Udon en Bouillon','Nouilles épaisses en bouillon tsuyu',13,40),
  ('L''Okonomiyaki','Crêpe épaisse au chou style Osaka',14,45),
  ('Les Mochi Maison','Pâte de riz gluant garnie de pâte de haricots rouges',15,40),
  ('Le Shabu-Shabu','Fondue de bœuf marbré en bouillon kombu',16,50),
  ('Le Karaage','Poulet frit à la japonaise — marinade soja-gingembre',17,40),
  ('Le Takoyaki','Boulettes de poulpe sur la plaque takoyaki',18,45),
  ('Le Matcha Parfait','Glace, azuki, mochi et sirop vert',19,50)
) AS v(title,description,order_index,xp_reward)
CROSS JOIN (SELECT id FROM public.paths WHERE slug='japanese' LIMIT 1) p
ON CONFLICT (path_id, order_index) DO NOTHING;

-- MAROCAIN
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward)
SELECT gen_random_uuid(), p.id, v.title, v.description, v.order_index, v.xp_reward
FROM (VALUES
  ('La Harira','Soupe de l''aïd aux lentilles, pois chiches et tomates',5,40),
  ('Les Briouates','Cigares farcis amandes-cannelle en pâte filo',6,40),
  ('La Chermoula','Marinade verte aux herbes pour poissons',7,30),
  ('Le Mechoui','Agneau entier rôti à la broche marocaine',8,55),
  ('Le Thé à la Menthe','Rituel du thé vert-menthe et sa mousse',9,25)
) AS v(title,description,order_index,xp_reward)
CROSS JOIN (SELECT id FROM public.paths WHERE slug='moroccan' LIMIT 1) p
ON CONFLICT (path_id, order_index) DO NOTHING;

-- MEXICAIN
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward)
SELECT gen_random_uuid(), p.id, v.title, v.description, v.order_index, v.xp_reward
FROM (VALUES
  ('Les Enchiladas','Tortillas farcies nappées de sauce chile rouge',6,40),
  ('Le Pozole','Bouillon de maïs hominy et porc — plat de fête',7,45),
  ('Les Chilaquiles','Chips de tortilla en salsa rouge ou verte',8,35),
  ('Les Tamales','Pâte de maïs farcie cuite dans des feuilles de maïs',9,50),
  ('Les Churros con Chocolate','Beignets filés frits et sauce chocolat chaud',10,35)
) AS v(title,description,order_index,xp_reward)
CROSS JOIN (SELECT id FROM public.paths WHERE slug='mexican' LIMIT 1) p
ON CONFLICT (path_id, order_index) DO NOTHING;

-- INDIEN
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward)
SELECT gen_random_uuid(), p.id, v.title, v.description, v.order_index, v.xp_reward
FROM (VALUES
  ('Le Palak Paneer','Épinards crémeux et fromage frais indien',5,40),
  ('Le Samosa','Chaussons frits farcis pommes de terre et petits pois',6,40),
  ('Le Lassi Mangue','Boisson yaourt-mangue fraîche et épicée',7,25),
  ('Le Dosa','Galette fermentée de riz-lentilles croustillante',8,45),
  ('Le Gulab Jamun','Boulettes de lait frites siropées à la rose',9,40)
) AS v(title,description,order_index,xp_reward)
CROSS JOIN (SELECT id FROM public.paths WHERE slug='indian' LIMIT 1) p
ON CONFLICT (path_id, order_index) DO NOTHING;

-- THAÏLANDAIS
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward)
SELECT gen_random_uuid(), p.id, v.title, v.description, v.order_index, v.xp_reward
FROM (VALUES
  ('Le Som Tum','Salade de papaye verte aux crevettes et citron vert',5,35),
  ('Le Massaman Curry','Curry doux aux arachides et pommes de terre',6,45),
  ('Les Rouleaux de Printemps Frais','Crevettes, vermicelles et menthe en feuille de riz',7,30),
  ('Le Khao Man Gai','Poulet poché sur riz gras et sauce gingembre',8,40),
  ('Le Mango Sticky Rice','Riz gluant-lait de coco et mangue fraîche',9,35)
) AS v(title,description,order_index,xp_reward)
CROSS JOIN (SELECT id FROM public.paths WHERE slug='thai' LIMIT 1) p
ON CONFLICT (path_id, order_index) DO NOTHING;

-- GREC
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward)
SELECT gen_random_uuid(), p.id, v.title, v.description, v.order_index, v.xp_reward
FROM (VALUES
  ('La Spanakopita','Tourte épinards-féta en feuilles de filo',5,45),
  ('Le Souvlaki','Brochettes de porc marinées aux herbes méditerranéennes',6,40),
  ('La Fava Santorini','Purée de pois cassés à l''huile d''olive et câpres',7,30),
  ('Les Loukoumades','Beignets de miel grecs saupoudrés de cannelle',8,35),
  ('L''Agneau de Pâques','Épaule d''agneau confite aux herbes et citron',9,55)
) AS v(title,description,order_index,xp_reward)
CROSS JOIN (SELECT id FROM public.paths WHERE slug='greek' LIMIT 1) p
ON CONFLICT (path_id, order_index) DO NOTHING;

-- CHINOIS
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward)
SELECT gen_random_uuid(), p.id, v.title, v.description, v.order_index, v.xp_reward
FROM (VALUES
  ('Le Kung Pao Poulet','Poulet pimenté aux cacahuètes du Sichuan',5,40),
  ('Les Bao Buns','Petits pains vapeur moelleux farcis au porc laqué',6,45),
  ('Les Nouilles Lo Mein','Nouilles sautées aux légumes et sauce huître-soja',7,35),
  ('La Soupe Won Ton','Raviolis en bouillon clair et oignons verts',8,40),
  ('Les Egg Tarts','Tartelettes à la crème aux œufs style Hong Kong',9,40)
) AS v(title,description,order_index,xp_reward)
CROSS JOIN (SELECT id FROM public.paths WHERE slug='chinese' LIMIT 1) p
ON CONFLICT (path_id, order_index) DO NOTHING;

-- PÂTISSERIE
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward)
SELECT gen_random_uuid(), p.id, v.title, v.description, v.order_index, v.xp_reward
FROM (VALUES
  ('La Tarte au Citron Meringuée','Lemon curd, meringue italienne et pâte sucrée',5,55),
  ('Le Fondant au Chocolat','Cœur coulant parfait — beurre, chocolat, œufs',6,40),
  ('Les Financiers','Beurre noisette, poudre d''amandes et blancs montés',7,35),
  ('La Mousse au Chocolat','Blancs en neige, ganache et la juste texture',8,40),
  ('Le Saint-Honoré','Choux, crème chiboust et caramel filé',9,70)
) AS v(title,description,order_index,xp_reward)
CROSS JOIN (SELECT id FROM public.paths WHERE slug='pastry' LIMIT 1) p
ON CONFLICT (path_id, order_index) DO NOTHING;

-- BBQ
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward)
SELECT gen_random_uuid(), p.id, v.title, v.description, v.order_index, v.xp_reward
FROM (VALUES
  ('Les Ailes de Poulet Buffalo','Double cuisson, sauce piquante beurrée et bleu',5,35),
  ('Le Saumon sur Planche de Cèdre','Filet de saumon sur planche de cèdre au BBQ',6,40),
  ('Les Légumes Grillés','Maïs, courgettes, poivrons — techniques de caramélisation',7,30),
  ('Le Smash Burger','Bœuf écrasé, fonte sur plaque et fromage fondu',8,40),
  ('La Sauce BBQ Maison','Ketchup, vinaigre, mélasse et fumée liquide',9,35)
) AS v(title,description,order_index,xp_reward)
CROSS JOIN (SELECT id FROM public.paths WHERE slug='bbq' LIMIT 1) p
ON CONFLICT (path_id, order_index) DO NOTHING;

-- VEGAN
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward)
SELECT gen_random_uuid(), p.id, v.title, v.description, v.order_index, v.xp_reward
FROM (VALUES
  ('Le Jackfruit Pulled Pork','Jacquier effiloché sauce BBQ — texture bluffante',5,45),
  ('Les Falafels Croustillants','Pois chiches crus mixés et frits — recette libanaise',6,40),
  ('La Tarte aux Légumes de Saison','Pâte brisée végane et garniture de saison',7,45),
  ('Le Banana Nice Cream','Glace crémeuse à une seule ingrédient : la banane',8,25),
  ('Le Lait Végétal Maison','Avoine, amande, soja — faire son lait soi-même',9,30)
) AS v(title,description,order_index,xp_reward)
CROSS JOIN (SELECT id FROM public.paths WHERE slug='vegan' LIMIT 1) p
ON CONFLICT (path_id, order_index) DO NOTHING;

-- ============================================================
-- EXERCICES — liés aux leçons via leur titre
-- ============================================================
INSERT INTO public.exercises (id, lesson_id, type, question, data, order_index, xp_reward)
SELECT gen_random_uuid(), l.id, v.type::text, v.question, v.data::jsonb, v.order_index, v.xp_reward
FROM (VALUES
  ('La Ratatouille','multiple_choice','Quelle technique évite une ratatouille détrempée ?','{"options":["Cuire chaque légume séparément avant d''assembler","Tout cuire ensemble dès le début","Ajouter de l''eau en cours de cuisson","Couvrir à feu doux"],"correctIndex":0}',0,10),
  ('La Ratatouille','fill_in_blank','La ratatouille est une spécialité de la ville de ___.','{"answer":"Nice","hint":"Capitale de la Côte d''Azur"}',1,10),
  ('Le Confit de Canard','multiple_choice','Le confit de canard est conservé dans :','{"options":["Sa propre graisse de canard","De l''huile d''olive","Du sel uniquement","De la gelée de viande"],"correctIndex":0}',0,10),
  ('Le Confit de Canard','fill_in_blank','Avant la cuisson, les cuisses sont frottées de ___ et marinées.','{"answer":"sel","hint":"Conservation par osmose — technique ancestrale"}',1,15),
  ('La Tarte Tatin','multiple_choice','La tarte Tatin est cuite :','{"options":["À l''envers, les pommes sous la pâte","Normalement puis retournée","Sans pâte","En deux étapes"],"correctIndex":0}',0,10),
  ('La Tarte Tatin','fill_in_blank','La tarte Tatin doit son nom aux sœurs Stéphanie et Caroline ___.','{"answer":"Tatin","hint":"Aubergistes à Lamotte-Beuvron vers 1880"}',1,15),
  ('Le Coq au Vin','multiple_choice','Dans le coq au vin authentique, le vin utilisé est :','{"options":["Un bourgogne rouge (pinot noir)","N''importe quel vin rouge","Du vin blanc","Du champagne"],"correctIndex":0}',0,10),
  ('Le Coq au Vin','fill_in_blank','Le coq au vin est une technique de ___ — cuisson longue dans un liquide.','{"answer":"braisage","hint":"On part de pièces dorées — différent du ragoût"}',1,15),
  ('La Bouillabaisse','multiple_choice','La vraie bouillabaisse marseillaise contient obligatoirement :','{"options":["Au moins 4 poissons de roche différents","Un seul poisson noble","Des fruits de mer","Du homard uniquement"],"correctIndex":0}',0,15),
  ('La Bouillabaisse','fill_in_blank','La rouille est une mayonnaise à l''ail et au ___ safranée.','{"answer":"safran","hint":"La couleur orangée vient de cette épice précieuse"}',1,20),
  ('Le Pesto Genovese','multiple_choice','L''outil traditionnel pour le pesto genovese est :','{"options":["Le mortier en marbre et le pilon","Le mixeur plongeant","Le robot ménager","La râpe"],"correctIndex":0}',0,10),
  ('Le Pesto Genovese','fill_in_blank','Le fromage utilisé dans le pesto est le ___, fromage de brebis.','{"answer":"pecorino","hint":"Associé au parmesan — tous les deux râpés ensemble"}',1,15),
  ('Cacio e Pepe Romaine','multiple_choice','La difficulté du cacio e pepe est :','{"options":["Éviter que le pecorino ne forme des grumeaux","Cuire les pâtes al dente","Mesurer le poivre","Choisir la bonne pasta"],"correctIndex":0}',0,10),
  ('Cacio e Pepe Romaine','fill_in_blank','L''émulsion est créée grâce à l''___ des pâtes, riche en amidon.','{"answer":"eau","hint":"L''eau amidonnée crée une crème sans matière grasse"}',1,15),
  ('La Soupe Miso','multiple_choice','À quel moment ajoute-t-on le miso dans la soupe ?','{"options":["Hors du feu, juste avant de servir","Au début avec le dashi","À ébullition","Dans l''eau froide"],"correctIndex":0}',0,10),
  ('La Soupe Miso','fill_in_blank','Le miso blanc (shiro miso) a une saveur plus ___ que le miso rouge.','{"answer":"douce","hint":"Fermentation courte = goût doux"}',1,10),
  ('Les Gyoza','multiple_choice','La technique de cuisson des gyoza est :','{"options":["Dorer une face puis finir à la vapeur","Uniquement frits","Uniquement vapeur","Bouillis puis frits"],"correctIndex":0}',0,10),
  ('Les Gyoza','fill_in_blank','La sauce trempette contient sauce soja, vinaigre de riz et huile de ___.','{"answer":"sésame","hint":"L''huile de sésame grillé est l''arôme signature"}',1,10),
  ('Les Onigiri','multiple_choice','La farce classique de l''onigiri au Japon est :','{"options":["Umeboshi, thon-mayo ou saumon grillé","Œuf dur et mayo","Tempura de crevettes","Tofu fumé"],"correctIndex":0}',0,10),
  ('Les Onigiri','fill_in_blank','Pour que le riz colle bien, on utilise du riz japonais à grains ___.','{"answer":"courts","hint":"Japonica : grains ronds, plus collants que le riz long-grain"}',1,10),
  ('Le Poulet Teriyaki','multiple_choice','La sauce teriyaki gagne sa consistance sirupeuse grâce à :','{"options":["La réduction du mirin et de la sauce soja","De la fécule de maïs","Du beurre incorporé à froid","La cuisson prolongée"],"correctIndex":0}',0,10),
  ('Le Poulet Teriyaki','fill_in_blank','Le ___ est un vin de riz sucré japonais indispensable à la sauce teriyaki.','{"answer":"mirin","hint":"À ne pas confondre avec le sake — le mirin est plus sucré"}',1,10),
  ('La Harira','multiple_choice','La harira est traditionnellement servie pour rompre le jeûne du :','{"options":["Ramadan","Aïd el-Kébir","Nouvel an berbère","Mariage"],"correctIndex":0}',0,10),
  ('La Harira','fill_in_blank','La harira est épaissie avec de la ___ de tomate et de la farine délayée.','{"answer":"purée","hint":"La liaison farineuse signature — tedouira"}',1,15),
  ('Les Enchiladas','multiple_choice','La sauce des enchiladas rouges est à base de :','{"options":["Chiles secs réhydratés et mixés","Tomates fraîches et jalapeños","Crème et chile serrano","Sauce tomate industrielle"],"correctIndex":0}',0,10),
  ('Les Enchiladas','fill_in_blank','Les tortillas sont ___ quelques secondes dans l''huile avant de les garnir.','{"answer":"trempées","hint":"Pour les rendre souples avant de rouler"}',1,10),
  ('Le Palak Paneer','multiple_choice','Le paneer est obtenu par coagulation du lait avec :','{"options":["Du jus de citron ou du vinaigre","Des bactéries lactiques","De la présure animale","De la fécule de maïs"],"correctIndex":0}',0,10),
  ('Le Palak Paneer','fill_in_blank','Les épinards sont blanchis puis mixés en ___ pour créer la base verte.','{"answer":"purée","hint":"Choc thermique dans l''eau glacée pour garder la couleur vive"}',1,15),
  ('Le Kung Pao Poulet','multiple_choice','Le poivre du Sichuan provoque une sensation unique :','{"options":["Un engourdissement fourmillant — le málà","Une simple piqueur","Un goût amer","Une sensation de fraîcheur"],"correctIndex":0}',0,10),
  ('Le Kung Pao Poulet','fill_in_blank','La sauce contient du ___ de Shaoxing, vinaigre, sauce soja et sucre.','{"answer":"vin","hint":"Vin de riz de Shaoxing — fondamental en cuisine chinoise"}',1,10),
  ('Les Ailes de Poulet Buffalo','multiple_choice','La vraie sauce buffalo est composée de :','{"options":["Sauce Frank''s RedHot et beurre fondu","Ketchup et tabasco","Sauce barbecue et piment","Sriracha et huile"],"correctIndex":0}',0,10),
  ('Les Ailes de Poulet Buffalo','fill_in_blank','La technique consiste à d''abord ___ les ailes puis les napper de sauce.','{"answer":"frire","hint":"Ou cuire au four à très haute température"}',1,10),
  ('Le Jackfruit Pulled Pork','multiple_choice','Le jackfruit jeune convient au pulled pork végétalien car :','{"options":["Sa texture fibreuse imite la viande effilochée","Sa saveur ressemble au porc","Il absorbe rapidement les sauces","Il est riche en protéines"],"correctIndex":0}',0,10),
  ('Le Jackfruit Pulled Pork','fill_in_blank','On utilise le jackfruit ___ en boîte (pas mûr) pour les préparations salées.','{"answer":"vert","hint":"Le jackfruit mûr est sucré — le vert est neutre et textural"}',1,10),
  ('La Spanakopita','multiple_choice','La pâte filo de la spanakopita doit être :','{"options":["Badigeonnée d''huile d''olive entre chaque couche","Humidifiée à l''eau","Laissée sèche","Épaisse d''une seule couche"],"correctIndex":0}',0,10),
  ('La Spanakopita','fill_in_blank','La spanakopita contient des épinards bien ___ et de la féta émiettée.','{"answer":"égouttés","hint":"Les épinards trop humides rendent la pâte détrempée"}',1,15),
  ('Le Mango Sticky Rice','multiple_choice','Le riz gluant est cuit :','{"options":["À la vapeur — jamais à l''eau bouillante","Dans le lait de coco directement","Au four","Dans l''eau salée"],"correctIndex":0}',0,10),
  ('Le Mango Sticky Rice','fill_in_blank','La sauce au ___ de coco est mélangée au riz encore chaud pour l''imprégner.','{"answer":"lait","hint":"Lait de coco + sucre + sel — le riz absorbe tout"}',1,10)
) AS v(lesson_title, type, question, data, order_index, xp_reward)
JOIN public.lessons l ON l.title = v.lesson_title
ON CONFLICT DO NOTHING;
