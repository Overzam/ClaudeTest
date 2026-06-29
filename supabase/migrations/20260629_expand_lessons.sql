-- ============================================================
-- RecipeQuest — Expansion des leçons (20 par parcours majeur)
-- À exécuter dans Supabase > SQL Editor
-- ============================================================

-- ============================================================
-- NOUVELLES LEÇONS — FRANÇAIS (fr-7 à fr-20)
-- ============================================================
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward) VALUES
('fr-7', 'path-french', 'La Ratatouille', 'Légumes du soleil confits à la provençale', 6, 35),
('fr-8', 'path-french', 'Le Confit de Canard', 'Cuisson douce dans la graisse et conservation', 7, 50),
('fr-9', 'path-french', 'La Tarte Tatin', 'Tarte aux pommes caramélisées à l''envers', 8, 40),
('fr-10','path-french', 'Le Pot-au-Feu', 'Bouillon, légumes et viandes mijotés ensemble', 9, 50),
('fr-11','path-french', 'Les Gougères', 'Chouquettes au comté, apéritif bourguignon', 10, 35),
('fr-12','path-french', 'La Bavette à l''Échalote', 'Sauce classique à l''échalote et au vin rouge', 11, 40),
('fr-13','path-french', 'Le Coq au Vin', 'Poulet braisé au vin rouge façon grand-mère', 12, 55),
('fr-14','path-french', 'La Vichyssoise', 'Soupe froide de poireaux et pommes de terre', 13, 35),
('fr-15','path-french', 'Le Canard à l''Orange', 'Magret et sauce bigarade aux agrumes', 14, 55),
('fr-16','path-french', 'Les Oeufs Cocotte', 'Œufs parfaits en cocotte crème et herbes', 15, 30),
('fr-17','path-french', 'La Brandade de Morue', 'Morue dessalée, huile d''olive et pommes de terre', 16, 45),
('fr-18','path-french', 'Le Paris-Brest', 'Choux, praliné et crème mousseline', 17, 65),
('fr-19','path-french', 'La Bouillabaisse', 'Soupe de poissons marseillaise et rouille', 18, 60),
('fr-20','path-french', 'Le Millefeuille', 'Feuilletage, crème pâtissière et fondant', 19, 70);

-- ============================================================
-- NOUVELLES LEÇONS — ITALIEN (it-7 à it-20)
-- ============================================================
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward) VALUES
('it-7', 'path-italian', 'Le Pesto Genovese', 'Basilic, pignons, ail et huile d''olive au mortier', 6, 30),
('it-8', 'path-italian', 'Les Gnocchi', 'Pommes de terre, farine et la règle de légèreté', 7, 40),
('it-9', 'path-italian', 'La Focaccia', 'Pain plat moelleux à la ligurienne', 8, 35),
('it-10','path-italian', 'L''Osso Buco', 'Jarret de veau braisé et gremolata', 9, 55),
('it-11','path-italian', 'La Panna Cotta', 'Crème prise à la gélatine et coulis de fruits rouges', 10, 35),
('it-12','path-italian', 'Les Arancini', 'Boulettes de risotto frites panées', 11, 40),
('it-13','path-italian', 'La Parmigiana', 'Aubergines, tomates et mozzarella gratinées', 12, 45),
('it-14','path-italian', 'Le Cacio e Pepe', 'Pâtes romaines au pecorino et poivre noir', 13, 40),
('it-15','path-italian', 'La Lasagne Bolognese', 'Ragù, béchamel et pâtes fraîches en couches', 14, 60),
('it-16','path-italian', 'La Polenta', 'Maïs cuisiné à la cuillère en bois, fromages fondus', 15, 35),
('it-17','path-italian', 'Le Saltimbocca', 'Escalopes de veau, jambon de Parme et sauge', 16, 45),
('it-18','path-italian', 'La Ribollita', 'Soupe toscane pain-légumes-haricots mijotée', 17, 40),
('it-19','path-italian', 'La Torta Caprese', 'Gâteau amandes-chocolat sans farine', 18, 45),
('it-20','path-italian', 'Le Cannolo Sicilien', 'Tubes frits farcis à la ricotta sucrée', 19, 55);

-- ============================================================
-- NOUVELLES LEÇONS — JAPONAIS (jp-7 à jp-20)
-- ============================================================
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward) VALUES
('jp-7', 'path-japanese', 'Le Miso Soup', 'Dashi, miso et tofu, le rituel du matin', 6, 25),
('jp-8', 'path-japanese', 'Les Gyoza', 'Raviolis pan-frits croustillants dessous', 7, 40),
('jp-9', 'path-japanese', 'Le Tonkatsu', 'Côtelette panko et sauce Worcestershire', 8, 35),
('jp-10','path-japanese', 'L''Oyakodon', 'Poulet et œufs sur riz, le bol réconfort', 9, 35),
('jp-11','path-japanese', 'Le Katsu Curry', 'Curry japonais doux et tonkatsu croustillant', 10, 45),
('jp-12','path-japanese', 'Les Onigiri', 'Triangles de riz farcis et nappés de nori', 11, 30),
('jp-13','path-japanese', 'Le Teriyaki', 'Laque sucrée-salée au mirin et sauce soja', 12, 35),
('jp-14','path-japanese', 'L''Udon', 'Nouilles épaisses en bouillon tsuyu', 13, 40),
('jp-15','path-japanese', 'L''Okonomiyaki', 'Crêpe épaisse au chou style Osaka', 14, 45),
('jp-16','path-japanese', 'Les Mochi', 'Pâte de riz gluant garnie de pâte de haricots rouges', 15, 40),
('jp-17','path-japanese', 'Le Shabu-Shabu', 'Fondue de bœuf marbré en bouillon kombu', 16, 50),
('jp-18','path-japanese', 'Le Karaage', 'Poulet frit à la japonaise — marinade soja-gingembre', 17, 40),
('jp-19','path-japanese', 'Le Takoyaki', 'Boulettes de poulpe sur la plaque takoyaki', 18, 45),
('jp-20','path-japanese', 'Le Matcha Parfait', 'Glace, azuki, mochi et sirop vert — le dessert japonais', 19, 50);

-- ============================================================
-- NOUVELLES LEÇONS — MAROCAIN (ma-6 à ma-10)
-- ============================================================
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward) VALUES
('ma-6','path-moroccan', 'La Harira', 'Soupe de l''aïd aux lentilles, pois chiches et tomates', 5, 40),
('ma-7','path-moroccan', 'Les Briouates', 'Cigares farcis amandes-cannelle en pâte filo', 6, 40),
('ma-8','path-moroccan', 'La Chermoula', 'Marinade verte aux herbes pour poissons', 7, 30),
('ma-9','path-moroccan', 'Le Mechoui', 'Agneau entier rôti à la broche marocaine', 8, 55),
('ma-10','path-moroccan', 'Le Thé à la Menthe', 'Rituel du thé vert-menthe et sa mousse', 9, 25);

-- ============================================================
-- NOUVELLES LEÇONS — MEXICAIN (mx-7 à mx-11)
-- ============================================================
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward) VALUES
('mx-7', 'path-mexican', 'Les Enchiladas', 'Tortillas farcies nappées de sauce chile rouge', 6, 40),
('mx-8', 'path-mexican', 'Le Pozole', 'Bouillon de maïs hominy et porc — plat de fête', 7, 45),
('mx-9', 'path-mexican', 'Les Chilaquiles', 'Chips de tortilla en salsa rouge ou verte au petit-déjeuner', 8, 35),
('mx-10','path-mexican', 'Les Tamales', 'Pâte de maïs farcie cuite dans des feuilles de maïs', 9, 50),
('mx-11','path-mexican', 'Les Churros con Chocolate', 'Beignets filés frits et sauce chocolat chaud épais', 10, 35);

-- ============================================================
-- NOUVELLES LEÇONS — INDIEN (in-6 à in-10)
-- ============================================================
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward) VALUES
('in-6','path-indian', 'Le Palak Paneer', 'Épinards crémeux et fromage frais indien', 5, 40),
('in-7','path-indian', 'Le Samosa', 'Chaussons frits farcis pommes de terre et petits pois', 6, 40),
('in-8','path-indian', 'Le Lassi Mango', 'Boisson yaourt-mangue fraîche et épicée', 7, 25),
('in-9','path-indian', 'Le Dosa', 'Galette fermentée de riz-lentilles croustillante du Sud', 8, 45),
('in-10','path-indian', 'Le Gulab Jamun', 'Boulettes de lait frites siropées à la rose', 9, 40);

-- ============================================================
-- NOUVELLES LEÇONS — THAÏLANDAIS (th-6 à th-10)
-- ============================================================
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward) VALUES
('th-6','path-thai', 'Le Som Tum', 'Salade de papaye verte aux crevettes et citron vert', 5, 35),
('th-7','path-thai', 'Le Massaman Curry', 'Curry doux aux arachides et pommes de terre', 6, 45),
('th-8','path-thai', 'Les Rouleaux de Printemps Frais', 'Riz soufflé, crevettes, vermicelles et menthe', 7, 30),
('th-9','path-thai', 'Le Khao Man Gai', 'Poulet poché sur riz gras et sauce gingembre', 8, 40),
('th-10','path-thai', 'Le Mango Sticky Rice', 'Riz gluant-lait de coco et mangue fraîche', 9, 35);

-- ============================================================
-- NOUVELLES LEÇONS — GREC (gr-6 à gr-10)
-- ============================================================
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward) VALUES
('gr-6','path-greek', 'La Spanakopita', 'Tourte épinards-féta en feuilles de filo', 5, 45),
('gr-7','path-greek', 'Le Souvlaki', 'Brochettes de porc marinées aux herbes méditerranéennes', 6, 40),
('gr-8','path-greek', 'La Fava Santorini', 'Purée de pois cassés à l''huile d''olive et câpres', 7, 30),
('gr-9','path-greek', 'Les Loukoumades', 'Beignets de miel grecs saupoudrés de cannelle', 8, 35),
('gr-10','path-greek', 'L''Agneau de Pâques', 'Épaule d''agneau confite aux herbes et citron', 9, 55);

-- ============================================================
-- NOUVELLES LEÇONS — CHINOIS (cn-6 à cn-10)
-- ============================================================
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward) VALUES
('cn-6','path-chinese', 'Le Kung Pao Poulet', 'Poulet pimenté aux cacahuètes du Sichuan', 5, 40),
('cn-7','path-chinese', 'Les Bao Buns', 'Petits pains vapeur moelleux farcis au porc laqué', 6, 45),
('cn-8','path-chinese', 'Les Nouilles Sautées Lo Mein', 'Nouilles aux légumes et sauce huître-soja', 7, 35),
('cn-9','path-chinese', 'La Soupe Won Ton', 'Raviolis en bouillon clair et oignons verts', 8, 40),
('cn-10','path-chinese', 'Les Egg Tarts', 'Tartelettes à la crème aux œufs style Hong Kong', 9, 40);

-- ============================================================
-- NOUVELLES LEÇONS — PÂTISSERIE (pa-6 à pa-10)
-- ============================================================
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward) VALUES
('pa-6','path-pastry', 'La Tarte au Citron Meringuée', 'Lemon curd, meringue italienne et pâte sucrée', 5, 55),
('pa-7','path-pastry', 'Le Fondant au Chocolat', 'Cœur coulant parfait — beurre, chocolat, œufs', 6, 40),
('pa-8','path-pastry', 'Les Financiers', 'Beurre noisette, poudre d''amandes et blancs montés', 7, 35),
('pa-9','path-pastry', 'La Mousse au Chocolat', 'Blancs en neige, ganache et la juste texture', 8, 40),
('pa-10','path-pastry', 'Le Saint-Honoré', 'Choux, crème chiboust et caramel filé', 9, 70);

-- ============================================================
-- NOUVELLES LEÇONS — BBQ (bb-6 à bb-10)
-- ============================================================
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward) VALUES
('bb-6','path-bbq', 'Les Ailes de Poulet Buffalo', 'Double cuisson, sauce piquante beurrée et bleu', 5, 35),
('bb-7','path-bbq', 'Le Saumon Planché', 'Filet de saumon sur planche de cèdre au BBQ', 6, 40),
('bb-8','path-bbq', 'Les Légumes Grillés', 'Maïs, courgettes, poivrons — techniques de caramélisation', 7, 30),
('bb-9','path-bbq', 'Le Smash Burger', 'Bœuf écrasé, fonte sur plaque et fromage fondu', 8, 40),
('bb-10','path-bbq', 'La Sauce BBQ Maison', 'Ketchup, vinaigre, mélasse et fumée liquide', 9, 35);

-- ============================================================
-- NOUVELLES LEÇONS — VEGAN (vg-6 à vg-10)
-- ============================================================
INSERT INTO public.lessons (id, path_id, title, description, order_index, xp_reward) VALUES
('vg-6','path-vegan', 'Le Jackfruit Pulled Pork', 'Jacquier effiloché sauce BBQ — texture bluffante', 5, 45),
('vg-7','path-vegan', 'Les Falafels Croustillants', 'Pois chiches crus mixés et frits — recette libanaise', 6, 40),
('vg-8','path-vegan', 'La Tarte aux Légumes de Saison', 'Pâte brisée végane et garniture de saison', 7, 45),
('vg-9','path-vegan', 'Le Banana Nice Cream', 'Glace crémeuse à une seule ingrédient : la banane', 8, 25),
('vg-10','path-vegan', 'Le Lait Végétal Maison', 'Avoine, amande, soja — faire son lait soi-même', 9, 30);

-- ============================================================
-- EXERCICES — FRANÇAIS
-- ============================================================

-- fr-7 : La Ratatouille
INSERT INTO public.exercises (id, lesson_id, type, question, data, order_index, xp_reward) VALUES
('fr-7-1','fr-7','multiple_choice','Quelle technique permet d''éviter une ratatouille détrempée ?',
 '{"options":["Cuire chaque légume séparément avant d''assembler","Tout cuire ensemble dès le début","Ajouter de l''eau en cours de cuisson","Couvrir à feu doux toute la cuisson"],"correctIndex":0}', 0, 10),

('fr-7-2','fr-7','fill_in_blank','La ratatouille est une spécialité de la ville de ___.',
 '{"answer":"Nice","hint":"Capitale de la Côte d''Azur, en Provence"}', 1, 10),

('fr-7-3','fr-7','step_ordering','Préparer une ratatouille :',
 '{"steps":["Couper tous les légumes en rondelles ou en dés uniformes","Faire revenir les oignons et l''ail à l''huile d''olive","Cuire les aubergines séparément jusqu''à légère coloration","Cuire les courgettes séparément","Cuire les poivrons et les tomates ensemble","Assembler tous les légumes cuits, assaisonner et mijoter 15 min"],"correctOrder":[0,1,2,3,4,5]}', 2, 20),

-- fr-8 : Le Confit de Canard
('fr-8-1','fr-8','multiple_choice','Le confit de canard est conservé dans :',
 '{"options":["Sa propre graisse de canard","De l''huile d''olive","Du sel uniquement","De la gelée de viande"],"correctIndex":0}', 0, 10),

('fr-8-2','fr-8','fill_in_blank','Avant la cuisson confite, les cuisses de canard sont frottées de ___ et laissées à mariner.',
 '{"answer":"sel","hint":"Conservation par osmose — technique ancestrale"}', 1, 15),

('fr-8-3','fr-8','step_ordering','Préparer le confit de canard :',
 '{"steps":["Frotter les cuisses de sel gros, thym et laurier — mariner 12h au frigo","Rincer et sécher les cuisses","Immerger dans la graisse de canard fondue","Cuire à 90°C pendant 2h30 — la viande doit se défaire à la fourchette","Laisser refroidir dans la graisse","Pour servir : dorer les cuisses côté peau à feu vif jusqu''à croustillant"],"correctOrder":[0,1,2,3,4,5]}', 2, 30),

-- fr-9 : La Tarte Tatin
('fr-9-1','fr-9','multiple_choice','La tarte Tatin est cuite :',
 '{"options":["À l''envers, les pommes sous la pâte dans le moule","Normalement puis retournée","Sans pâte, comme une tarte ouverte","En deux étapes séparées"],"correctIndex":0}', 0, 10),

('fr-9-2','fr-9','fill_in_blank','La tarte Tatin doit son nom à deux sœurs, Stéphanie et Caroline ___, aubergistes à Lamotte-Beuvron.',
 '{"answer":"Tatin","hint":"Elles ont « inventé » la recette par accident vers 1880"}', 1, 15),

('fr-9-3','fr-9','step_ordering','Préparer la tarte Tatin :',
 '{"steps":["Éplucher et couper les pommes en quartiers","Caraméliser le sucre et le beurre dans la poêle allant au four","Disposer les quartiers de pommes debout, serrés, dans le caramel","Cuire les pommes 15 min à feu moyen pour les confire","Recouvrir d''un disque de pâte feuilletée en rentrant les bords","Enfourner 25 min à 200°C puis retourner immédiatement sur le plat"],"correctOrder":[0,1,2,3,4,5]}', 2, 25),

-- fr-10 : Le Pot-au-Feu
('fr-10-1','fr-10','multiple_choice','Dans un pot-au-feu, on met les os à moelle pour :',
 '{"options":["Enrichir le bouillon en gélatine et en saveur","Les manger comme viande principale","Colorer le bouillon","Épaissir la sauce"],"correctIndex":0}', 0, 10),

('fr-10-2','fr-10','fill_in_blank','Le pot-au-feu donne deux plats en un : la viande avec légumes ET le ___ servi en entrée.',
 '{"answer":"bouillon","hint":"Servi dans une tasse ou une assiette creuse avec des croûtons"}', 1, 15),

('fr-10-3','fr-10','association','Associe chaque élément du pot-au-feu à son rôle :',
 '{"pairs":[{"left":"Os à moelle","right":"Gélatine et richesse du bouillon"},{"left":"Plat de côtes","right":"Viande gélatineuse qui fond"},{"left":"Carottes","right":"Sucre naturel et couleur"},{"left":"Bouquet garni","right":"Aromates (thym, laurier, persil)"}]}', 2, 20),

-- fr-11 : Les Gougères
('fr-11-1','fr-11','multiple_choice','Les gougères sont des choux salés traditionnellement au fromage :',
 '{"options":["Comté ou Gruyère","Roquefort","Brie","Camembert"],"correctIndex":0}', 0, 10),

('fr-11-2','fr-11','fill_in_blank','La pâte à choux est réalisée en desséchant la farine dans le mélange eau-beurre sur le feu, puis en incorporant les ___ un à un.',
 '{"answer":"œufs","hint":"Ils donnent la structure et le gonflant à la cuisson"}', 1, 15),

('fr-11-3','fr-11','step_ordering','Préparer des gougères :',
 '{"steps":["Porter à ébullition l''eau, le beurre, le sel et la muscade","Verser la farine d''un coup et dessécher la panade 2 min en remuant","Laisser tiédir puis incorporer les œufs un à un","Ajouter le fromage râpé et mélanger","Pocher des boules de 3 cm sur plaque silicone","Dorer au jaune d''œuf et enfourner 25 min à 200°C"],"correctOrder":[0,1,2,3,4,5]}', 2, 25),

-- fr-12 : La Bavette à l''Échalote
('fr-12-1','fr-12','multiple_choice','La bavette à l''échalote se sert traditionnellement :',
 '{"options":["Saignante ou à point — jamais bien cuite car elle durcit","Bien cuite pour une texture tendre","Marinée longtemps avant cuisson","En sauce au vin blanc"],"correctIndex":0}', 0, 10),

('fr-12-2','fr-12','fill_in_blank','La sauce est déglacée au ___ rouge après avoir fait fondre les échalotes dans la poêle de cuisson.',
 '{"answer":"vin","hint":"Vin de Bordeaux idéalement — l''acidité équilibre le gras"}', 1, 10),

('fr-12-3','fr-12','step_ordering','Préparer la bavette à l''échalote :',
 '{"steps":["Faire revenir les échalotes émincées au beurre 5 min sans colorer","Réserver les échalotes, monter à feu vif","Saisir la bavette 2 min de chaque côté pour un résultat saignant","Retirer la viande, laisser reposer sous papier alu","Remettre les échalotes, déglacer au vin rouge","Réduire de moitié, monter au beurre froid et verser sur la bavette"],"correctOrder":[0,1,2,3,4,5]}', 2, 20),

-- fr-13 : Le Coq au Vin
('fr-13-1','fr-13','multiple_choice','Dans le coq au vin authentique, le vin utilisé est :',
 '{"options":["Un bourgogne rouge — pinot noir structuré","N''importe quel vin rouge","Du vin blanc","Du champagne"],"correctIndex":0}', 0, 10),

('fr-13-2','fr-13','fill_in_blank','Le coq au vin est une technique de ___ — cuisson longue dans un liquide à faible ébullition.',
 '{"answer":"braisage","hint":"Différent du ragoût : on part de pièces dorées"}', 1, 15),

('fr-13-3','fr-13','step_ordering','Préparer le coq au vin :',
 '{"steps":["Mariner le poulet 12h dans le vin rouge avec légumes et aromates","Égoutter et sécher le poulet, conserver la marinade","Dorer les morceaux de poulet en cocotte dans du beurre","Faire revenir lardons, champignons et oignons grelots séparément","Verser la marinade filtrée, ajouter le bouquet garni et mijoter 1h30","Épaissir la sauce si besoin avec du beurre manié"],"correctOrder":[0,1,2,3,4,5]}', 2, 30),

-- fr-14 : La Vichyssoise
('fr-14-1','fr-14','multiple_choice','La vichyssoise est servie :',
 '{"options":["Froide — c''est une soupe glacée","Chaude comme une soupe classique","À température ambiante uniquement","Avec des glaçons"],"correctIndex":0}', 0, 10),

('fr-14-2','fr-14','fill_in_blank','La vichyssoise est composée de poireaux, pommes de terre et ___ fraîche.',
 '{"answer":"crème","hint":"La crème liquide donne la texture veloutée et la richesse"}', 1, 10),

('fr-14-3','fr-14','step_ordering','Préparer la vichyssoise :',
 '{"steps":["Suer le blanc de poireaux émincé dans le beurre sans colorer","Ajouter les pommes de terre pelées en dés et le bouillon de volaille","Cuire 20 min jusqu''à ce que les pommes de terre soient fondantes","Mixer finement et passer au tamis pour une texture veloutée","Incorporer la crème fraîche et assaisonner","Réfrigérer 4h et servir très frais garni de ciboulette"],"correctOrder":[0,1,2,3,4,5]}', 2, 20),

-- fr-15 : Le Canard à l''Orange
('fr-15-1','fr-15','multiple_choice','La sauce bigarade du canard à l''orange est rendue amère par :',
 '{"options":["Le zeste d''orange et la liqueur Grand Marnier","Le jus de citron","Le vinaigre de vin","La moutarde"],"correctIndex":0}', 0, 10),

('fr-15-2','fr-15','fill_in_blank','Le magret de canard vient du canard ___, engraissé pour le foie gras — plus gras et savoureux.',
 '{"answer":"gras","hint":"Mulard ou Pékin — canard des Landes et du Périgord"}', 1, 15),

('fr-15-3','fr-15','step_ordering','Cuire le magret de canard à l''orange :',
 '{"steps":["Quadriller le gras du magret sans atteindre la chair","Cuire côté gras à feu moyen 8 min pour fondre le gras","Retourner et cuire côté chair 3 min — rosé à cœur","Retirer le magret et couvrir d''un papier alu 5 min","Déglacer la poêle avec du jus d''orange et du Grand Marnier","Réduire la sauce, monter au beurre froid et napper le magret tranché"],"correctOrder":[0,1,2,3,4,5]}', 2, 25),

-- fr-16 : Les Oeufs Cocotte
('fr-16-1','fr-16','multiple_choice','La cuisson parfaite des œufs cocotte donne :',
 '{"options":["Un blanc pris et un jaune encore coulant","Un œuf entièrement cuit comme à la coque","Un blanc baveux et un jaune dur","Un jaune cuit mais un blanc coulant"],"correctIndex":0}', 0, 10),

('fr-16-2','fr-16','fill_in_blank','Les ramequins sont placés dans un bain-___ pour une cuisson douce et homogène.',
 '{"answer":"marie","hint":"Technique classique pour cuire doucement les préparations fragiles"}', 1, 10),

('fr-16-3','fr-16','step_ordering','Préparer les œufs cocotte :',
 '{"steps":["Beurrer généreusement les ramequins","Verser une cuillère de crème fraîche au fond","Casser délicatement un œuf dans chaque ramequin","Saler, poivrer et ajouter herbes ou lardons","Poser les ramequins dans un plat d''eau chaude (bain-marie)","Cuire au four à 180°C 10-12 min jusqu''au blanc pris"],"correctOrder":[0,1,2,3,4,5]}', 2, 20),

-- fr-17 : La Brandade de Morue
('fr-17-1','fr-17','multiple_choice','La brandade de morue nécessite de dessaler la morue :',
 '{"options":["48h sous eau froide renouvelée toutes les 8h","1h à l''eau chaude","Pas du tout, se cuit directement","12h dans du lait"],"correctIndex":0}', 0, 10),

('fr-17-2','fr-17','fill_in_blank','La brandade nimoise se prépare sans pomme de terre, uniquement avec huile d''olive, morue et ___.',
 '{"answer":"ail","hint":"L''ail est essentiel — il lie la préparation avec le poisson"}', 1, 15),

('fr-17-3','fr-17','step_ordering','Préparer la brandade de morue :',
 '{"steps":["Dessaler la morue 48h sous eau froide renouvelée","Pocher la morue dans l''eau avec laurier et thym 10 min","Effeuiller la morue en retirant peau et arêtes","Écraser à la fourchette ou au robot en ajoutant l''huile d''olive tiède","Incorporer la crème et les pommes de terre en purée","Gratiner au four avec chapelure et huile d''olive"],"correctOrder":[0,1,2,3,4,5]}', 2, 25),

-- fr-18 : Le Paris-Brest
('fr-18-1','fr-18','multiple_choice','Le Paris-Brest a été créé en 1910 par un pâtissier pour commémorer :',
 '{"options":["La course cycliste Paris-Brest-Paris","L''Exposition universelle","Un général napoléonien","Le centenaire de la pâtisserie française"],"correctIndex":0}', 0, 15),

('fr-18-2','fr-18','fill_in_blank','La crème du Paris-Brest est une crème mousseline au ___ — praliné noisette-amande caramélisé.',
 '{"answer":"praliné","hint":"Noisettes ou amandes + sucre caramélisé — mixés en pâte"}', 1, 20),

('fr-18-3','fr-18','step_ordering','Préparer le Paris-Brest :',
 '{"steps":["Préparer la pâte à choux et pocher un anneau de 20 cm sur la plaque","Parsemer d''amandes effilées et enfourner 35 min à 185°C","Préparer le praliné noisettes maison","Incorporer le praliné dans la crème pâtissière puis monter au beurre","Couper le choux en deux dans l''épaisseur","Garnir généreusement de crème pralinée à la poche, refermer et sucrer glace"],"correctOrder":[0,1,2,3,4,5]}', 2, 40),

-- fr-19 : La Bouillabaisse
('fr-19-1','fr-19','multiple_choice','La vraie bouillabaisse marseillaise contient obligatoirement :',
 '{"options":["Au moins 4 poissons différents de roche (rascasse, saint-pierre, grondin...)","Un seul poisson noble comme le bar","Des fruits de mer et des poissons","Du crabe et du homard uniquement"],"correctIndex":0}', 0, 15),

('fr-19-2','fr-19','fill_in_blank','La rouille, sauce accompagnant la bouillabaisse, est une mayonnaise à l''ail et au ___ safranée.',
 '{"answer":"safran","hint":"La couleur orangée vient de cette épice précieuse"}', 1, 20),

('fr-19-3','fr-19','step_ordering','Préparer la bouillabaisse :',
 '{"steps":["Faire revenir oignon, fenouil, ail et tomates dans l''huile d''olive","Ajouter bouquet garni, safran, peau d''orange et fumet de poisson","Porter à ébullition et ajouter les poissons à chair ferme en premier","Ajouter 5 min plus tard les poissons à chair plus fragile","Cuire 5-8 min supplémentaires à gros bouillons","Servir le bouillon filtré avec croûtons et rouille puis les poissons"],"correctOrder":[0,1,2,3,4,5]}', 2, 40),

-- fr-20 : Le Millefeuille
('fr-20-1','fr-20','multiple_choice','Combien de couches de feuilletage compose le millefeuille classique ?',
 '{"options":["3 couches de pâte et 2 couches de crème","2 couches de pâte et 3 couches de crème","4 couches de pâte","1 couche de pâte épaisse"],"correctIndex":0}', 0, 15),

('fr-20-2','fr-20','fill_in_blank','Le fondant du glaçage est marbrée avec du chocolat pour créer le motif ___ caractéristique.',
 '{"answer":"chevrons","hint":"Lignes décoratives obtenues avec un cure-dent passé perpendiculairement"}', 1, 20),

('fr-20-3','fr-20','step_ordering','Assembler le millefeuille :',
 '{"steps":["Cuire les rectangles de pâte feuilletée lestés à 180°C 25 min","Refroidir complètement les abaisses sur grille","Préparer une crème pâtissière parfumée à la vanille","Garnir la première abaisse de crème à la poche","Poser la deuxième abaisse et remettre de la crème","Couvrir de la troisième abaisse et glacer au fondant marbré chocolat"],"correctOrder":[0,1,2,3,4,5]}', 2, 45);

-- ============================================================
-- EXERCICES — ITALIEN (it-7 à it-20)
-- ============================================================
INSERT INTO public.exercises (id, lesson_id, type, question, data, order_index, xp_reward) VALUES

-- it-7 : Le Pesto Genovese
('it-7-1','it-7','multiple_choice','L''outil traditionnel pour le pesto genovese est :',
 '{"options":["Le mortier en marbre et le pilon","Le mixeur plongeant","Le robot ménager","La râpe"],"correctIndex":0}', 0, 10),

('it-7-2','it-7','fill_in_blank','Le fromage utilisé dans le pesto est le ___, fromage de brebis sarde.',
 '{"answer":"pecorino","hint":"Associé au parmesan — les deux sont râpés ensemble"}', 1, 15),

('it-7-3','it-7','association','Associe chaque ingrédient du pesto à sa fonction :',
 '{"pairs":[{"left":"Basilic","right":"Saveur fraîche et parfumée"},{"left":"Pignons de pin","right":"Corps et texture crémeuse"},{"left":"Ail","right":"Piquant et profondeur"},{"left":"Huile d''olive","right":"Liant et richesse"}]}', 2, 20),

-- it-8 : Les Gnocchi
('it-8-1','it-8','multiple_choice','La règle d''or pour des gnocchi légers est :',
 '{"options":["Utiliser des pommes de terre farineuses cuites au four, jamais à l''eau","Utiliser des pommes de terre nouvelles","Ajouter beaucoup d''œufs","Travailler la pâte longtemps"],"correctIndex":0}', 0, 10),

('it-8-2','it-8','fill_in_blank','On sait que les gnocchi sont cuits quand ils ___ à la surface de l''eau bouillante salée.',
 '{"answer":"remontent","hint":"La flottaison indique que la vapeur interne les pousse vers le haut"}', 1, 15),

('it-8-3','it-8','step_ordering','Préparer des gnocchi :',
 '{"steps":["Cuire les pommes de terre au four entières 1h à 200°C","Les éplucher à chaud et passer à la presse-purée","Laisser la vapeur s''échapper 5 min avant d''incorporer la farine","Mélanger avec la farine, l''œuf et le sel — ne pas trop travailler","Rouler en longs boudins et couper en tronçons de 2 cm","Cuire dans l''eau bouillante salée, retirer dès la remontée en surface"],"correctOrder":[0,1,2,3,4,5]}', 2, 25),

-- it-9 : La Focaccia
('it-9-1','it-9','multiple_choice','Le secret de la focaccia moelleuse est :',
 '{"options":["Une forte hydratation de la pâte et beaucoup d''huile d''olive","Peu d''huile et une cuisson rapide","Une pâte sèche et ferme","L''ajout de levure chimique"],"correctIndex":0}', 0, 10),

('it-9-2','it-9','fill_in_blank','Les alvéoles de la focaccia sont créées en enfonçant les ___ dans la pâte avant cuisson.',
 '{"answer":"doigts","hint":"Technique qui crée les trous caractéristiques où l''huile s''accumule"}', 1, 10),

('it-9-3','it-9','step_ordering','Préparer la focaccia :',
 '{"steps":["Mélanger farine, eau tiède, levure, sel et huile d''olive généreuse","Pétrir 10 min, la pâte doit être souple et collante","Laisser lever 2h sous torchon humide","Étaler dans le plat huilé sans trop dégazer","Enfoncer les doigts régulièrement pour créer les alvéoles","Garnir de romarin, de fleur de sel et d''huile d''olive — enfourner 25 min à 220°C"],"correctOrder":[0,1,2,3,4,5]}', 2, 20),

-- it-10 : L''Osso Buco
('it-10-1','it-10','multiple_choice','La gremolata qui accompagne l''osso buco est composée de :',
 '{"options":["Zeste de citron, persil et ail finement hachés","Basilic, citron et parmesan","Câpres, olives et anchois","Tomate, basilic et huile d''olive"],"correctIndex":0}', 0, 10),

('it-10-2','it-10','fill_in_blank','Le nom ''osso buco'' signifie en italien « os ___ » en référence à la moelle dans le jarret.',
 '{"answer":"creux","hint":"La moelle est un mets délicat — on la déguste à la cuillère"}', 1, 15),

('it-10-3','it-10','step_ordering','Préparer l''osso buco :',
 '{"steps":["Fariner les tranches de jarret de veau et les dorer à l''huile d''olive","Faire suer oignon, carotte et céleri dans la même cocotte","Déglacer au vin blanc et laisser réduire","Ajouter les tomates concassées et le bouillon de veau","Braiser à couvert 1h30 à feu doux jusqu''à ce que la viande soit tendre","Préparer la gremolata et parsemer au dernier moment"],"correctOrder":[0,1,2,3,4,5]}', 2, 30),

-- it-11 : La Panna Cotta
('it-11-1','it-11','multiple_choice','La panna cotta doit avoir une texture :',
 '{"options":["Légèrement tremblotante, fondante en bouche — pas caoutchouteuse","Ferme comme une gelée","Crémeuse sans tenir sa forme","Mousseuse et légère"],"correctIndex":0}', 0, 10),

('it-11-2','it-11','fill_in_blank','Pour une panna cotta de 4 personnes, on utilise approximativement ___ feuille(s) de gélatine.',
 '{"answer":"2","hint":"Trop de gélatine = texture caoutchouteuse — mieux vaut la prendre ferme"}', 1, 15),

('it-11-3','it-11','step_ordering','Préparer la panna cotta :',
 '{"steps":["Faire ramollir les feuilles de gélatine dans l''eau froide","Chauffer la crème avec le sucre et la vanille sans ébullition","Essorer la gélatine et la dissoudre dans la crème chaude","Verser dans des ramequins et réfrigérer 4h minimum","Démouler en passant un couteau sur le bord","Napper de coulis de framboises ou de caramel"],"correctOrder":[0,1,2,3,4,5]}', 2, 20),

-- it-12 : Les Arancini
('it-12-1','it-12','multiple_choice','La farce classique des arancini al ragù contient :',
 '{"options":["Ragù de viande, petits pois et mozzarella","Jambon et emmental","Champignons et truffe","Anchois et câpres"],"correctIndex":0}', 0, 10),

('it-12-2','it-12','fill_in_blank','Les arancini sont panés dans de la ___ avant friture pour une croûte croustillante.',
 '{"answer":"chapelure","hint":"Enrobage : farine, œuf, chapelure — technique à l''anglaise"}', 1, 10),

('it-12-3','it-12','step_ordering','Préparer les arancini :',
 '{"steps":["Préparer le risotto safranné et laisser refroidir complètement","Façonner des boules de riz en creux et déposer une cuillerée de ragù","Refermer pour former une boule ou un cône compact","Passer dans la farine, puis l''œuf battu, puis la chapelure","Frire à 170°C 4-5 min jusqu''à coloration dorée","Égoutter et servir chaud — cœur fondant et croûte croustillante"],"correctOrder":[0,1,2,3,4,5]}', 2, 25),

-- it-13 : La Parmigiana
('it-13-1','it-13','multiple_choice','Pour éviter des aubergines grasses dans la parmigiana :',
 '{"options":["Les saler, égoutter, puis les griller au four ou frire rapidement","Les faire tremper dans l''eau","Les congeler avant utilisation","Les utiliser sans traitement préalable"],"correctIndex":0}', 0, 10),

('it-13-2','it-13','fill_in_blank','La parmigiana est originaire de ___ et de la Campanie, et non de Parme comme son nom pourrait le suggérer.',
 '{"answer":"Sicile","hint":"Palermitains et Napolitains se disputent l''origine de ce plat"}', 1, 15),

('it-13-3','it-13','step_ordering','Préparer la parmigiana :',
 '{"steps":["Couper les aubergines en tranches de 5mm, saler et laisser dégorger 30 min","Rincer, sécher et frire ou griller les tranches","Préparer une sauce tomate simple ail-basilic","Alterner couches d''aubergines, sauce tomate et mozzarella tranchée","Terminer par sauce tomate et parmesan râpé","Enfourner 25 min à 180°C jusqu''à dorure et bulles"],"correctOrder":[0,1,2,3,4,5]}', 2, 25),

-- it-14 : Le Cacio e Pepe
('it-14-1','it-14','multiple_choice','La difficulté du cacio e pepe est :',
 '{"options":["Éviter que le pecorino ne forme des grumeaux en incorporant l''eau de cuisson","Cuire les pâtes al dente","Mesurer le poivre avec précision","Choisir la bonne pasta"],"correctIndex":0}', 0, 10),

('it-14-2','it-14','fill_in_blank','L''émulsion du cacio e pepe est créée grâce à l''___ des pâtes, riche en amidon.',
 '{"answer":"eau","hint":"L''eau de cuisson amidonnée crée une crème sans matière grasse"}', 1, 15),

('it-14-3','it-14','step_ordering','Préparer le cacio e pepe :',
 '{"steps":["Cuire les tonnarelli ou spaghetti dans peu d''eau très salée","Torréfier généreusement le poivre noir concassé dans la poêle à sec","Déglacer avec un peu d''eau de cuisson des pâtes","Égoutter les pâtes al dente en conservant l''eau de cuisson","Mélanger hors du feu le pecorino râpé fin avec un peu d''eau froide","Incorporer pâtes et fromage dans la poêle en ajoutant l''eau de cuisson progressivement"],"correctOrder":[0,1,2,3,4,5]}', 2, 30),

-- it-15 : La Lasagne Bolognese
('it-15-1','it-15','multiple_choice','La bolognese authentique (ragù bolognese) mijote :',
 '{"options":["Minimum 2h — idéalement 4h à feu très doux","30 minutes suffisent","Jusqu''à ce que la sauce soit sèche","Sans liquide pour rester concentrée"],"correctIndex":0}', 0, 10),

('it-15-2','it-15','fill_in_blank','La lasagne al forno doit reposer ___ minutes hors du four avant de couper pour que les couches se stabilisent.',
 '{"answer":"15","hint":"Sans repos, les couches glissent et la crème coule partout"}', 1, 15),

('it-15-3','it-15','step_ordering','Assembler les lasagnes bolognese :',
 '{"steps":["Préparer le ragù bolognese et laisser mijoter 3h","Préparer la béchamel crémeuse","Cuire les feuilles de lasagne fraîches 2 min dans l''eau salée","Étaler une couche de béchamel dans le fond du plat","Alterner : pâtes, ragù, béchamel, parmesan (4-5 couches)","Terminer par béchamel et parmesan, enfourner 45 min à 180°C"],"correctOrder":[0,1,2,3,4,5]}', 2, 35),

-- it-16 : La Polenta
('it-16-1','it-16','multiple_choice','La polenta crémeuse est obtenue avec de la farine de maïs :',
 '{"options":["Cuite longuement en fouettant dans un bouillon ou lait — ratio 4:1 liquide/farine","Cuite rapidement à feu vif","Avec peu de liquide pour une texture ferme","Sans matière grasse"],"correctIndex":0}', 0, 10),

('it-16-2','it-16','fill_in_blank','Le ___ de polenta désigne la version ferme que l''on coupe et fait griller ou frire.',
 '{"answer":"gâteau","hint":"Polenta refroidie dans un moule, puis démoulée et tranchée"}', 1, 15),

('it-16-3','it-16','step_ordering','Préparer une polenta crémeuse :',
 '{"steps":["Porter à ébullition le bouillon de volaille salé","Verser la farine de maïs en pluie en fouettant constamment","Réduire à feu doux et cuire 40-45 min en remuant régulièrement","Incorporer beurre et parmesan râpé hors du feu","Ajuster la consistance avec un peu de lait chaud","Servir immédiatement avec l''accompagnement choisi"],"correctOrder":[0,1,2,3,4,5]}', 2, 20),

-- it-17 : Le Saltimbocca
('it-17-1','it-17','multiple_choice','Le nom « saltimbocca » signifie littéralement :',
 '{"options":["« Saute en bouche » — tant la bouchée est goûteuse","« Jambon en sauge »","« Petit saut »","« Viande sautée »"],"correctIndex":0}', 0, 10),

('it-17-2','it-17','fill_in_blank','Le saltimbocca est déglacé au ___ marsala ou blanc sec après cuisson.',
 '{"answer":"vin","hint":"Le vin déglaçe les sucs de cuisson pour créer une sauce rapide"}', 1, 10),

('it-17-3','it-17','step_ordering','Préparer le saltimbocca :',
 '{"steps":["Aplatir les escalopes de veau à 5mm d''épaisseur","Poser une tranche de jambon de Parme et une feuille de sauge sur chaque escalope","Fixer avec un cure-dent","Saisir côté jambon dans le beurre 2 min puis retourner 1 min","Retirer la viande, déglacer au vin blanc ou marsala","Réduire la sauce 1 min et napper les escalopes"],"correctOrder":[0,1,2,3,4,5]}', 2, 20),

-- it-18 : La Ribollita
('it-18-1','it-18','multiple_choice','Le mot « ribollita » signifie :',
 '{"options":["« Rebouillie » — une soupe réchauffée le lendemain","« Soupe de riz »","« Bouillon de légumes »","« Reboiled beans »"],"correctIndex":0}', 0, 10),

('it-18-2','it-18','fill_in_blank','La ribollita contient obligatoirement du pain ___ toscan rassis qui épaissit la soupe.',
 '{"answer":"rassis","hint":"Pain de la veille — le pain frais ne convient pas"}', 1, 15),

('it-18-3','it-18','step_ordering','Préparer la ribollita :',
 '{"steps":["Faire revenir oignon, carotte, céleri et ail à l''huile d''olive","Ajouter les tomates concassées et cuire 10 min","Incorporer haricots cannellini, chou noir et pommes de terre en dés","Verser le bouillon et mijoter 30 min","Ajouter des tranches de pain rassis, laisser gonfler","Le lendemain, réchauffer (ribollire) et servir avec huile d''olive généreuse"],"correctOrder":[0,1,2,3,4,5]}', 2, 25),

-- it-19 : La Torta Caprese
('it-19-1','it-19','multiple_choice','La torta caprese est naturellement sans farine, ce qui la rend :',
 '{"options":["Sans gluten — idéale pour les intolérants","Moins riche","Difficile à réaliser","Sèche et friable"],"correctIndex":0}', 0, 10),

('it-19-2','it-19','fill_in_blank','La torta caprese provient de l''île de ___, dans le golfe de Naples.',
 '{"answer":"Capri","hint":"Île célèbre aussi pour le citron, la limoncello et la beauté méditerranéenne"}', 1, 15),

('it-19-3','it-19','step_ordering','Préparer la torta caprese :',
 '{"steps":["Faire fondre le chocolat noir avec le beurre au bain-marie","Moudre finement les amandes pelées","Battre les œufs avec le sucre jusqu''à blanchiment","Incorporer le chocolat fondu au mélange œufs-sucre","Ajouter les amandes moulues et la liqueur d''amande","Verser dans un moule beurré et cuire 35 min à 170°C — le centre doit rester moelleux"],"correctOrder":[0,1,2,3,4,5]}', 2, 25),

-- it-20 : Le Cannolo Sicilien
('it-20-1','it-20','multiple_choice','La farce traditionnelle du cannolo est à base de :',
 '{"options":["Ricotta de brebis sucrée et zestes confits","Mascarpone","Crème fouettée","Crème pâtissière"],"correctIndex":0}', 0, 10),

('it-20-2','it-20','fill_in_blank','La pâte des tubes à cannolo est frite enroulée autour de ___ métalliques.',
 '{"answer":"tubes","hint":"Cylindres de métal — la pâte est retirée après friture"}', 1, 15),

('it-20-3','it-20','step_ordering','Préparer les cannoli siciliens :',
 '{"steps":["Préparer la pâte à cannolo : farine, sucre, beurre, vin marsala","Abaisser finement et découper des ovales","Enrouler autour des tubes métalliques et fermer avec de l''œuf","Frire à 180°C 2-3 min jusqu''à doré croustillant","Glisser la pâte du tube et laisser refroidir","Garnir de ricotta sucrée aux zestes confits à la poche à douille avant de servir"],"correctOrder":[0,1,2,3,4,5]}', 2, 30);

-- ============================================================
-- EXERCICES — JAPONAIS (jp-7 à jp-20)
-- ============================================================
INSERT INTO public.exercises (id, lesson_id, type, question, data, order_index, xp_reward) VALUES

-- jp-7 : Le Miso Soup
('jp-7-1','jp-7','multiple_choice','À quel moment ajoute-t-on le miso dans la soupe ?',
 '{"options":["Hors du feu, juste avant de servir — le miso ne doit pas bouillir","Au début avec le dashi","À ébullition","Il se dilue seul dans l''eau froide"],"correctIndex":0}', 0, 10),

('jp-7-2','jp-7','fill_in_blank','Le miso blanc (shiro miso) a une saveur plus ___ que le miso rouge (aka miso), plus fermenté.',
 '{"answer":"douce","hint":"Fermentation courte = goût doux, fermentation longue = goût plus fort"}', 1, 10),

('jp-7-3','jp-7','association','Associe chaque type de miso à sa caractéristique :',
 '{"pairs":[{"left":"Shiro miso","right":"Blanc, doux, fermentation courte"},{"left":"Aka miso","right":"Rouge foncé, puissant, longue fermentation"},{"left":"Awase miso","right":"Mélange de miso blanc et rouge"},{"left":"Hatcho miso","right":"Très foncé, dense, fermenté 3 ans"}]}', 2, 20),

-- jp-8 : Les Gyoza
('jp-8-1','jp-8','multiple_choice','La technique de cuisson des gyoza est :',
 '{"options":["Pan-fry puis vapeur : dorer une face, ajouter l''eau, couvrir pour finir à la vapeur","Uniquement frits à l''huile","Uniquement à la vapeur","Bouillis puis frits"],"correctIndex":0}', 0, 10),

('jp-8-2','jp-8','fill_in_blank','La sauce trempette des gyoza est composée de sauce soja, vinaigre de riz et huile de ___ pimentée.',
 '{"answer":"sésame","hint":"L''huile de sésame grillé est l''arôme signature du gyoza"}', 1, 10),

('jp-8-3','jp-8','step_ordering','Préparer les gyoza :',
 '{"steps":["Mélanger porc haché, chou chinois essoré, ail, gingembre, sauce soja et huile de sésame","Placer une cuillère de farce au centre de la rondelle de pâte","Humecter le bord et plisser la pâte pour fermer en demi-lune plissée","Chauffer l''huile dans une poêle et dorer la face plate 2-3 min","Verser 50ml d''eau, couvrir immédiatement","Ôter le couvercle dès que l''eau est évaporée et terminer 1 min à sec"],"correctOrder":[0,1,2,3,4,5]}', 2, 25),

-- jp-9 : Le Tonkatsu
('jp-9-1','jp-9','multiple_choice','La panure au panko est plus croustillante que la chapelure classique car :',
 '{"options":["Le panko est plus grossier et aéré — il absorbe moins de matière grasse","Il est plus fin et adhère mieux","Il contient du sel qui croustille à la cuisson","Il est précuit"],"correctIndex":0}', 0, 10),

('jp-9-2','jp-9','fill_in_blank','La sauce Tonkatsu est une sauce à base de fruits, similaire à la sauce ___ anglaise.',
 '{"answer":"Worcestershire","hint":"Sauce brune et fruitée — Bull-Dog est la marque japonaise emblématique"}', 1, 15),

('jp-9-3','jp-9','step_ordering','Préparer le tonkatsu :',
 '{"steps":["Assaisonner les côtelettes de porc et entailler les bords pour éviter le gondolage","Paner : farine → œuf battu → panko bien tassé","Frire à 170°C 4-5 min de chaque côté jusqu''à coloration ambrée","Égoutter sur papier absorbant","Couper en tranches diagonales avec un couteau tranchant","Servir sur riz blanc avec sauce tonkatsu et chou émincé fin"],"correctOrder":[0,1,2,3,4,5]}', 2, 20),

-- jp-10 : L''Oyakodon
('jp-10-1','jp-10','multiple_choice','« Oyakodon » signifie en japonais :',
 '{"options":["''Bol parent-enfant'' — en référence au poulet et aux œufs","''Bol du soir''","''Riz à la sauce''","''Double protéines''"],"correctIndex":0}', 0, 10),

('jp-10-2','jp-10','fill_in_blank','La sauce du oyakodon est un mélange de dashi, sauce soja, mirin et ___.',
 '{"answer":"sake","hint":"Sake de cuisine — alcool de riz qui parfume et attendrit"}', 1, 10),

('jp-10-3','jp-10','step_ordering','Préparer l''oyakodon :',
 '{"steps":["Couper les blancs de poulet en dés, émincer l''oignon","Faire revenir l''oignon dans un peu d''huile","Ajouter le poulet et cuire jusqu''à blanc","Verser la sauce dashi-soja-mirin-sake et laisser mijoter 3 min","Battre les œufs légèrement (grumeaux encore visibles) et verser en filet","Couvrir 30 secondes — les œufs doivent rester crémeux","Servir sur riz blanc à grains japonais"],"correctOrder":[0,1,2,3,4,5,6]}', 2, 20),

-- jp-11 : Le Katsu Curry
('jp-11-1','jp-11','multiple_choice','Le curry japonais est différent du curry indien car il est :',
 '{"options":["Plus doux, légèrement sucré et épaissi avec de la farine — moins piquant","Plus piquant et liquide","À base de lait de coco","Sans épices de base"],"correctIndex":0}', 0, 10),

('jp-11-2','jp-11','fill_in_blank','Le curry japonais utilise souvent des ___ de curry instantanés (ex : S&B Golden Curry) comme base.',
 '{"answer":"cubes","hint":"Roux de curry prêt à l''emploi — équivalent des cubes de bouillon"}', 1, 10),

('jp-11-3','jp-11','step_ordering','Préparer le katsu curry :',
 '{"steps":["Préparer le tonkatsu (côtelette panée et frite)","Faire revenir oignon, carotte et pommes de terre en dés dans l''huile","Verser le bouillon de poulet et mijoter 15 min jusqu''à légumes tendres","Baisser le feu et incorporer les cubes de curry","Laisser épaissir 5 min à feu doux","Servir le curry sur riz blanc avec le tonkatsu tranché posé dessus"],"correctOrder":[0,1,2,3,4,5]}', 2, 20),

-- jp-12 : Les Onigiri
('jp-12-1','jp-12','multiple_choice','La farce classique de l''onigiri au Japon est :',
 '{"options":["Umeboshi (prune japonaise salée), thon-mayo ou saumon grillé","Œuf dur et mayo","Tempura de crevettes","Tofu fumé"],"correctIndex":0}', 0, 10),

('jp-12-2','jp-12','fill_in_blank','Pour que le riz colle bien, on utilise du riz japonais à grains ___, riche en amidon.',
 '{"answer":"courts","hint":"Japonica : grains ronds et courts, plus collants que le riz long-grain"}', 1, 10),

('jp-12-3','jp-12','step_ordering','Former des onigiri :',
 '{"steps":["Cuire le riz japonais à grains courts et laisser tiédir","Se humecter les mains avec de l''eau salée","Prendre une poignée de riz chaud dans la paume","Former un creux au centre et déposer la farce","Refermer le riz autour de la farce et former un triangle en pressant fermement","Enrouler la base d''une bande de nori avant de servir"],"correctOrder":[0,1,2,3,4,5]}', 2, 20),

-- jp-13 : Le Teriyaki
('jp-13-1','jp-13','multiple_choice','La sauce teriyaki gagne sa consistance sirupeuse grâce à :',
 '{"options":["La réduction du mirin et de la sauce soja qui caramélisent","L''ajout de fécule de maïs","Le beurre incorporé à froid","La cuisson prolongée"],"correctIndex":0}', 0, 10),

('jp-13-2','jp-13','fill_in_blank','Le ___ est un vin de riz sucré japonais indispensable à la sauce teriyaki.',
 '{"answer":"mirin","hint":"À ne pas confondre avec le sake — le mirin est plus sucré"}', 1, 10),

('jp-13-3','jp-13','step_ordering','Préparer le poulet teriyaki :',
 '{"steps":["Mariner les cuisses de poulet désossées dans sauce soja, mirin et sake 30 min","Essuyer légèrement le poulet et dorer côté peau à feu moyen","Retourner et cuire 5 min côté chair","Verser la marinade restante dans la poêle","Laisser caraméliser et réduire en nappant la viande","Couper en tranches et servir avec du riz et des graines de sésame"],"correctOrder":[0,1,2,3,4,5]}', 2, 20),

-- jp-14 : L''Udon
('jp-14-1','jp-14','multiple_choice','Le bouillon tsuyu des udon est composé de :',
 '{"options":["Dashi, sauce soja et mirin en proportions précises","Bouillon de poulet et sauce soja","Eau et sel uniquement","Lait de coco et dashi"],"correctIndex":0}', 0, 10),

('jp-14-2','jp-14','fill_in_blank','Les udon sont des nouilles de farine de ___, beaucoup plus épaisses que les soba.',
 '{"answer":"blé","hint":"Blé tendre = udon blanc et épais — soba = sarrasin gris"}', 1, 10),

('jp-14-3','jp-14','step_ordering','Préparer les udon en bouillon :',
 '{"steps":["Préparer le dashi en infusant le kombu puis le katsuobushi","Assaisonner de sauce soja et mirin pour créer le tsuyu","Cuire les nouilles udon séparément selon le paquet","Rincer les nouilles à l''eau froide","Réchauffer les nouilles dans le bouillon chaud","Garnir de ciboulette, kamaboko, tempura ou œuf mollet"],"correctOrder":[0,1,2,3,4,5]}', 2, 20),

-- jp-15 : L''Okonomiyaki
('jp-15-1','jp-15','multiple_choice','Le nom « okonomiyaki » signifie :',
 '{"options":["''Grillez ce que vous aimez'' — on personnalise les garnitures","''Crêpe japonaise''","''Galette de chou''","''Omelette spéciale''"],"correctIndex":0}', 0, 10),

('jp-15-2','jp-15','fill_in_blank','La sauce mayo spéciale sur l''okonomiyaki est une mayo japonaise ___, plus riche en jaune d''œuf.',
 '{"answer":"Kewpie","hint":"Marque emblématique — mayo japonaise à la bouteille avec le bébé"}', 1, 15),

('jp-15-3','jp-15','step_ordering','Préparer l''okonomiyaki :',
 '{"steps":["Mélanger la farine, le nagaimo râpé, le dashi et les œufs","Incorporer le chou finement émincé et les garnitures choisies (crevettes, bœuf, pieuvre)","Verser dans une poêle huilée et cuire à feu moyen 5 min par côté","Retourner délicatement avec une large spatule","Napper de sauce okonomiyaki puis de mayo Kewpie en zigzag","Parsemer de katsuobushi et d''aonori (algue verte en poudre)"],"correctOrder":[0,1,2,3,4,5]}', 2, 25),

-- jp-16 : Les Mochi
('jp-16-1','jp-16','multiple_choice','La farine utilisée pour les mochi est :',
 '{"options":["La farine de riz gluant (mochiko) — très différente de la farine de riz ordinaire","La fécule de maïs","La farine de blé","La farine de riz basmati"],"correctIndex":0}', 0, 10),

('jp-16-2','jp-16','fill_in_blank','La farce traditionnelle des mochi est la pâte de haricots rouges azuki sucrée appelée ___.',
 '{"answer":"anko","hint":"Pâte lisse (koshian) ou granuleuse (tsubuan) selon la texture souhaitée"}', 1, 15),

('jp-16-3','jp-16','step_ordering','Préparer les mochi à la vapeur :',
 '{"steps":["Mélanger la farine de riz gluant, le sucre et l''eau","Couvrir de film et cuire au micro-ondes 2 min, mélanger, 2 min de plus","Saupoudrer généreusement de fécule de pomme de terre pour ne pas coller","Étaler la pâte chaude à 5mm et découper des cercles","Placer une boule d''anko au centre de chaque cercle","Refermer en enveloppant le bord autour de la farce et pincer"],"correctOrder":[0,1,2,3,4,5]}', 2, 25),

-- jp-17 : Le Shabu-Shabu
('jp-17-1','jp-17','multiple_choice','Pour le shabu-shabu, la viande est tranchée :',
 '{"options":["En tranches ultra-fines de 2mm — elle cuit en 30 secondes","En morceaux épais","En cubes","En lanières larges"],"correctIndex":0}', 0, 10),

('jp-17-2','jp-17','fill_in_blank','Le bouillon du shabu-shabu est parfumé au ___ : une algue marine séchée umami.',
 '{"answer":"kombu","hint":"Algue laminaire — fondamentale dans le dashi et les bouillons japonais"}', 1, 15),

('jp-17-3','jp-17','step_ordering','Préparer le shabu-shabu :',
 '{"steps":["Porter à frémissement le bouillon kombu sur la table avec un réchaud","Préparer les sauces : ponzu (agrumes-soja) et goma dare (sésame)","Disposer les tranches de bœuf wagyu sur un plateau","Plonger une tranche dans le bouillon frémissant et agiter 20-30 secondes","Tremper dans la sauce et déguster","En fin de repas, cuire des udon dans le bouillon enrichi"],"correctOrder":[0,1,2,3,4,5]}', 2, 30),

-- jp-18 : Le Karaage
('jp-18-1','jp-18','multiple_choice','La double friture du karaage permet :',
 '{"options":["Une première friture à basse température pour cuire, une deuxième à haute température pour croustiller","De gérer la quantité d''huile","D''éviter les éclats d''huile","De cuire plus rapidement"],"correctIndex":0}', 0, 10),

('jp-18-2','jp-18','fill_in_blank','Le karaage est frit dans de la ___ de pomme de terre ou du katakuriko pour un croustillant plus léger que la farine de blé.',
 '{"answer":"fécule","hint":"Katakuriko : fécule de pomme de terre japonaise — croustillant léger et aérien"}', 1, 15),

('jp-18-3','jp-18','step_ordering','Préparer le karaage :',
 '{"steps":["Couper les cuisses de poulet en morceaux de 3-4 cm","Mariner 30 min dans sauce soja, sake, gingembre râpé et ail","Enrober de fécule de pomme de terre","Première friture à 160°C 4 min — la viande cuit","Sortir et laisser reposer 3 min (la chaleur continue à cuire à cœur)","Deuxième friture à 180°C 1-2 min — la croûte croustille"],"correctOrder":[0,1,2,3,4,5]}', 2, 25),

-- jp-19 : Le Takoyaki
('jp-19-1','jp-19','multiple_choice','Le takoyaki est originaire de la ville de :',
 '{"options":["Osaka","Tokyo","Kyoto","Hiroshima"],"correctIndex":0}', 0, 10),

('jp-19-2','jp-19','fill_in_blank','Le takoyaki contient en son centre de la pieuvre (___ en japonais) coupée en dés.',
 '{"answer":"tako","hint":"Tako = pieuvre, yaki = grillé — les boules grillées à la pieuvre"}', 1, 15),

('jp-19-3','jp-19','step_ordering','Préparer le takoyaki :',
 '{"steps":["Préparer la pâte : farine, dashi, œufs, sauce soja (texture liquide)","Hacher la pieuvre cuite, le gingembre et les oignons verts","Huiler généreusement la plaque à takoyaki et chauffer","Verser la pâte dans les cavités et ajouter les garnitures","Retourner avec des pics quand la base est prise — former les boules","Garnir de sauce takoyaki, mayo Kewpie, katsuobushi et aonori"],"correctOrder":[0,1,2,3,4,5]}', 2, 25),

-- jp-20 : Le Matcha Parfait
('jp-20-1','jp-20','multiple_choice','Le matcha de qualité culinaire pour les desserts est :',
 '{"options":["Un matcha de grade culinaire — moins amer et moins coûteux que le grade cérémonie","Le matcha le plus cher disponible","Du thé vert en poudre ordinaire","Du matcha dilué dans du lait"],"correctIndex":0}', 0, 10),

('jp-20-2','jp-20','fill_in_blank','Le matcha doit être ___ avant d''infuser pour éviter les grumeaux dans les préparations.',
 '{"answer":"tamisé","hint":"Un tamis fin élimine les grumeaux — étape indispensable"}', 1, 10),

('jp-20-3','jp-20','step_ordering','Assembler le matcha parfait japonais :',
 '{"steps":["Préparer la glace au thé vert : base anglaise + matcha tamisé + pâte de haricots","Cuire les haricots azuki sucrés jusqu''à tendreté","Préparer les mochi à la pâte de riz gluant","Dans une coupe : déposer une couche de cornflakes ou de granola","Ajouter haricots azuki, mochi, une boule de glace matcha","Napper de sirop de matcha et décorer de feuilles d''or ou de sésame noir"],"correctOrder":[0,1,2,3,4,5]}', 2, 25);

-- ============================================================
-- EXERCICES — PARCOURS SECONDAIRES (quelques leçons clés)
-- ============================================================

-- ma-6 : La Harira
INSERT INTO public.exercises (id, lesson_id, type, question, data, order_index, xp_reward) VALUES
('ma-6-1','ma-6','multiple_choice','La harira est traditionnellement servie pour rompre le jeûne du :',
 '{"options":["Ramadan","Aïd el-Kébir","Aïd el-Fitr (repas de fête après le jeûne)","Mariage"],"correctIndex":0}', 0, 10),
('ma-6-2','ma-6','fill_in_blank','La harira est épaissie avec de la ___ de tomate et de la farine délayée dans l''eau.',
 '{"answer":"purée","hint":"Aussi appelée ''tedouira'' — la liaison farineuse signature"}', 1, 15),
('ma-6-3','ma-6','step_ordering','Préparer la harira :',
 '{"steps":["Faire revenir la viande d''agneau avec oignon, gingembre et cannelle","Ajouter les tomates, les lentilles et les pois chiches","Verser le bouillon, porter à ébullition et mijoter 30 min","Incorporer la coriandre, le persil et la purée de tomate","Dilayer la farine dans un peu d''eau froide et verser en filet","Cuire encore 15 min jusqu''à consistance veloutée, servir avec des dattes et briouates"],"correctOrder":[0,1,2,3,4,5]}', 2, 25);

INSERT INTO public.exercises (id, lesson_id, type, question, data, order_index, xp_reward) VALUES
-- mx-7 : Les Enchiladas
('mx-7-1','mx-7','multiple_choice','La sauce des enchiladas rouges est à base de :',
 '{"options":["Chiles secs (ancho, guajillo) réhydratés et mixés","Tomates fraîches et jalapeños","Crème et chile serrano","Sauce tomate industrielle"],"correctIndex":0}', 0, 10),
('mx-7-2','mx-7','fill_in_blank','Les tortillas sont ___ quelques secondes dans l''huile chaude avant de les garnir pour les rendre pliables.',
 '{"answer":"trempées","hint":"Ou passées à la poêle sèche — elles doivent rester souples pour rouler"}', 1, 10),
('mx-7-3','mx-7','step_ordering','Préparer les enchiladas :',
 '{"steps":["Réhydrater les chiles secs dans l''eau bouillante 20 min","Mixer les chiles avec ail, tomate et cumin pour la sauce","Réchauffer les tortillas pour les assouplir","Tremper rapidement les tortillas dans la sauce","Garnir de poulet effiloché et de fromage, rouler","Disposer dans un plat, napper de sauce, gratiner 15 min"],"correctOrder":[0,1,2,3,4,5]}', 2, 25);

INSERT INTO public.exercises (id, lesson_id, type, question, data, order_index, xp_reward) VALUES
-- in-6 : Le Palak Paneer
('in-6-1','in-6','multiple_choice','Le paneer est un fromage frais indien obtenu par coagulation du lait avec :',
 '{"options":["Du jus de citron ou du vinaigre — technique simple sans présure","Des bactéries lactiques","De la présure animale","De la fécule de maïs"],"correctIndex":0}', 0, 10),
('in-6-2','in-6','fill_in_blank','Les épinards du palak paneer sont blanchis puis mixés en ___ pour créer la base verte du plat.',
 '{"answer":"purée","hint":"Blanchir puis choc thermique dans l''eau glacée pour garder la couleur vive"}', 1, 15),
('in-6-3','in-6','step_ordering','Préparer le palak paneer :',
 '{"steps":["Blanchir les épinards 1 min dans l''eau bouillante puis refroidir dans l''eau glacée","Mixer les épinards en purée lisse","Faire dorer le paneer en cubes dans l''huile, réserver","Faire revenir oignon, ail et gingembre avec les épices (garam masala, cumin, coriandre)","Verser la purée d''épinards et mijoter 5 min","Incorporer le paneer doré et la crème — assaisonner et servir"],"correctOrder":[0,1,2,3,4,5]}', 2, 25);

INSERT INTO public.exercises (id, lesson_id, type, question, data, order_index, xp_reward) VALUES
-- th-6 : Le Som Tum
('th-6-1','th-6','multiple_choice','Le som tum est pilonné dans un mortier pour :',
 '{"options":["Libérer les arômes et légèrement ramollir la papaye sans la réduire en purée","Pour le cuire rapidement","Pour le réduire en sauce","Pour mélanger la sauce uniformément"],"correctIndex":0}', 0, 10),
('th-6-2','th-6','fill_in_blank','La sauce du som tum est équilibrée entre 4 saveurs : sucré (sucre de palme), salé (sauce poisson), acide (___ vert) et pimenté.',
 '{"answer":"citron","hint":"Citron vert — lime — l''acidité citrique est essentielle"}', 1, 10),
('th-6-3','th-6','step_ordering','Préparer le som tum thaï :',
 '{"steps":["Râper ou julienner la papaye verte non mûre","Piler l''ail et les chiles dans le mortier jusqu''à pâte grossière","Ajouter les tomates cerises et piler légèrement","Incorporer la papaye et assaisonner : sauce poisson, sucre de palme, jus de citron vert","Ajouter haricots verts coupés et crevettes séchées","Mélanger délicatement et servir avec cacahuètes concassées"],"correctOrder":[0,1,2,3,4,5]}', 2, 20);

INSERT INTO public.exercises (id, lesson_id, type, question, data, order_index, xp_reward) VALUES
-- gr-6 : La Spanakopita
('gr-6-1','gr-6','multiple_choice','La pâte filo de la spanakopita doit être :',
 '{"options":["Badigeonnée d''huile d''olive entre chaque couche pour croustiller","Humidifiée à l''eau","Laissée sèche sans matière grasse","Épaisse d''une seule couche"],"correctIndex":0}', 0, 10),
('gr-6-2','gr-6','fill_in_blank','La spanakopita contient des épinards frais ou surgelés bien ___ et de la féta émiettée.',
 '{"answer":"égouttés","hint":"Les épinards trop humides rendent la pâte détrempée — exprimer le maximum d''eau"}', 1, 15),
('gr-6-3','gr-6','step_ordering','Préparer la spanakopita :',
 '{"steps":["Faire sauter les épinards à l''ail et presser pour retirer l''eau","Mélanger épinards, féta émiettée, œufs, aneth et oignons verts","Beurrer le plat et déposer 8 feuilles de filo beurrées une à une","Étaler la farce épinards-féta","Recouvrir de 8 autres feuilles de filo beurrées","Inciser le dessus en portions, enfourner 45 min à 180°C jusqu''à doré"],"correctOrder":[0,1,2,3,4,5]}', 2, 30);

INSERT INTO public.exercises (id, lesson_id, type, question, data, order_index, xp_reward) VALUES
-- cn-6 : Le Kung Pao Poulet
('cn-6-1','cn-6','multiple_choice','Le poivre du Sichuan dans le kung pao provoque une sensation unique :',
 '{"options":["Un engourdissement électrique et fourmillant sur la langue — le ''málà''","Une simple piqueur comme le poivre noir","Un goût amer et astringent","Une sensation de fraîcheur comme le menthol"],"correctIndex":0}', 0, 10),
('cn-6-2','cn-6','fill_in_blank','La sauce du kung pao contient du ___ de Shaoxing, vinaigre, sauce soja et sucre.',
 '{"answer":"vin","hint":"Vin de riz de Shaoxing — ingrédient fondamental de la cuisine chinoise"}', 1, 10),
('cn-6-3','cn-6','step_ordering','Préparer le kung pao poulet :',
 '{"steps":["Mariner le poulet en dés dans sauce soja, maïzena et vin de Shaoxing","Préparer la sauce : soja, vinaigre, sucre, maïzena et piment doubanjiang","Faire revenir les chiles secs et le poivre du Sichuan dans l''huile chaude","Ajouter le poulet et saisir à feu vif 3 min","Incorporer ail, gingembre puis les cacahuètes grillées","Verser la sauce et cuire jusqu''à nappant — garnir d''oignons verts"],"correctOrder":[0,1,2,3,4,5]}', 2, 25);

INSERT INTO public.exercises (id, lesson_id, type, question, data, order_index, xp_reward) VALUES
-- pa-6 : La Tarte au Citron Meringuée
('pa-6-1','pa-6','multiple_choice','La meringue italienne est plus stable que la française car :',
 '{"options":["Le sirop de sucre cuit à 118°C ''cuit'' les blancs en les incorporant — pasteurisée","Elle contient plus de sucre","Elle est montée plus ferme","Elle contient de la maïzena"],"correctIndex":0}', 0, 10),
('pa-6-2','pa-6','fill_in_blank','Le lemon curd est émulsionné avec du ___ froid incorporé hors du feu pour le lisser.',
 '{"answer":"beurre","hint":"Technique du ''beurre monté'' — crée la texture soyeuse du curd"}', 1, 15),
('pa-6-3','pa-6','step_ordering','Préparer la tarte au citron meringuée :',
 '{"steps":["Foncer un moule à tarte de pâte sucrée et cuire à blanc 20 min","Préparer le lemon curd : jus de citron, zestes, sucre, œufs — cuire jusqu''à épaississement","Incorporer le beurre froid au curd hors du feu","Verser le curd sur le fond de tarte refroidi","Préparer la meringue italienne et dresser à la poche sur le curd","Dorer au chalumeau ou sous le grill 2 min"],"correctOrder":[0,1,2,3,4,5]}', 2, 35);

INSERT INTO public.exercises (id, lesson_id, type, question, data, order_index, xp_reward) VALUES
-- bb-6 : Les Ailes de Poulet Buffalo
('bb-6-1','bb-6','multiple_choice','La vraie sauce buffalo est composée de :',
 '{"options":["Sauce piquante Frank''s RedHot et beurre fondu en proportions égales","Ketchup et tabasco","Sauce barbecue sucrée et piment","Sriracha et huile"],"correctIndex":0}', 0, 10),
('bb-6-2','bb-6','fill_in_blank','La technique de double cuisson des ailes buffalo consiste à d''abord les ___ puis à les napper de sauce.',
 '{"answer":"frire","hint":"Ou cuire au four à très haute température — l''objectif est la peau croustillante"}', 1, 10),
('bb-6-3','bb-6','step_ordering','Préparer les ailes buffalo :',
 '{"steps":["Séparer les ailes en drupes et pilons, sécher avec du papier absorbant","Assaisonner de sel, poivre et une touche de bicarbonate (pour le croustillant)","Frire à 175°C 12-14 min jusqu''à croustillant","Fondre le beurre dans la sauce Frank''s RedHot à parts égales","Napper les ailes dans la sauce immédiatement","Servir avec du céleri, des carottes et sauce bleu ou ranch"],"correctOrder":[0,1,2,3,4,5]}', 2, 20);

INSERT INTO public.exercises (id, lesson_id, type, question, data, order_index, xp_reward) VALUES
-- vg-6 : Le Jackfruit Pulled Pork
('vg-6-1','vg-6','multiple_choice','Le jackfruit (jacquier) jeune convient au pulled pork végétalien car :',
 '{"options":["Sa texture fibreuse imite la viande effilochée quand on le tire à la fourchette","Sa saveur ressemble au porc","Il absorbe les sauces rapidement","Il est riche en protéines comme la viande"],"correctIndex":0}', 0, 10),
('vg-6-2','vg-6','fill_in_blank','On utilise le jackfruit ___ en boîte (pas mûr et sucré) pour les préparations salées.',
 '{"answer":"vert","hint":"Le jackfruit mûr jaune est sucré — le vert est neutre et textural"}', 1, 10),
('vg-6-3','vg-6','step_ordering','Préparer le jackfruit pulled pork :',
 '{"steps":["Rincer et égoutter le jackfruit en boîte, retirer les graines","Effilocher les morceaux à la fourchette","Faire revenir oignon et ail, ajouter le jackfruit","Assaisonner de sauce BBQ, cumin, paprika fumé et bouillon","Mijoter 20 min jusqu''à absorption de la sauce","Servir dans des buns avec coleslaw végétalien"],"correctOrder":[0,1,2,3,4,5]}', 2, 25);
