-- Create recipes table
CREATE TABLE IF NOT EXISTS public.recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid REFERENCES public.lessons(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  emoji text DEFAULT '🍽️',
  prep_time_min integer DEFAULT 15,
  cook_time_min integer DEFAULT 30,
  servings integer DEFAULT 4,
  difficulty text CHECK (difficulty IN ('facile','moyen','difficile','expert')) DEFAULT 'moyen',
  avg_price_eur text DEFAULT '8-15€',
  ingredients jsonb NOT NULL DEFAULT '[]',
  instructions jsonb NOT NULL DEFAULT '[]',
  chef_tip text,
  cultural_note text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "recipes_read" ON public.recipes FOR SELECT USING (true);

-- Insert sample recipes for the first 5 lessons of the French path
-- (Run this after lessons are inserted; uses subquery to find lesson IDs by title)

INSERT INTO public.recipes (lesson_id, title, description, emoji, prep_time_min, cook_time_min, servings, difficulty, avg_price_eur, ingredients, instructions, chef_tip, cultural_note)
SELECT id, 'Omelette aux Herbes', 'Une omelette légère et parfumée aux herbes fraîches du jardin.', '🍳', 5, 5, 2, 'facile', '3-5€',
  '[{"qty":"3","item":"œufs"},{"qty":"1 c.s.","item":"beurre"},{"qty":"2 c.s.","item":"ciboulette ciselée"},{"qty":"1 c.s.","item":"persil haché"},{"qty":"1 pincée","item":"sel et poivre"}]',
  '["Cassez les œufs dans un bol et battez-les vigoureusement avec sel et poivre.","Faites fondre le beurre dans une poêle antiadhésive à feu moyen-vif.","Versez les œufs battus et remuez avec une spatule en ramenant les bords vers le centre.","Ajoutez les herbes quand les œufs sont presque pris.","Pliez l''omelette en deux et glissez-la dans l''assiette."]',
  'Ne trop cuite pas ! Une omelette parfaite reste légèrement baveuse à l''intérieur.', 'L''omelette est un classique de la cuisine française depuis le Moyen Âge. Julia Child disait qu''on reconnaît un bon chef à sa façon de faire une omelette.'
FROM public.lessons WHERE title = 'Les Couteaux' LIMIT 1;

INSERT INTO public.recipes (lesson_id, title, description, emoji, prep_time_min, cook_time_min, servings, difficulty, avg_price_eur, ingredients, instructions, chef_tip, cultural_note)
SELECT id, 'Vinaigrette Maison', 'La vinaigrette traditionnelle française, base de toutes les salades.', '🥗', 3, 0, 4, 'facile', '1-2€',
  '[{"qty":"3 c.s.","item":"huile d''olive extra vierge"},{"qty":"1 c.s.","item":"vinaigre de vin rouge"},{"qty":"1 c.c.","item":"moutarde de Dijon"},{"qty":"1 pincée","item":"sel fin"},{"qty":"1 pincée","item":"poivre noir moulu"}]',
  '["Versez la moutarde dans un bol.","Ajoutez le vinaigre et le sel, mélangez bien.","Incorporez l''huile en filet tout en fouettant pour émulsionner.","Goûtez et ajustez l''assaisonnement.","Versez immédiatement sur la salade ou conservez au réfrigérateur."]',
  'Le ratio classique est 3 parts d''huile pour 1 part de vinaigre. La moutarde sert d''émulsifiant naturel.', 'La vinaigrette française est protégée par une tradition culinaire séculaire. Contrairement à la croyance populaire, la vraie vinaigrette française ne contient pas de sucre.'
FROM public.lessons WHERE title = 'Les Sauces de Base' LIMIT 1;

INSERT INTO public.recipes (lesson_id, title, description, emoji, prep_time_min, cook_time_min, servings, difficulty, avg_price_eur, ingredients, instructions, chef_tip, cultural_note)
SELECT id, 'Soupe à l''Oignon Gratinée', 'La soupe à l''oignon, réconfortante et généreuse, symbole de la cuisine bistrot.', '🧅', 15, 45, 4, 'moyen', '6-10€',
  '[{"qty":"6","item":"oignons jaunes","tip":"émincés finement"},{"qty":"50g","item":"beurre"},{"qty":"1 c.s.","item":"farine"},{"qty":"150ml","item":"vin blanc sec"},{"qty":"1L","item":"bouillon de bœuf"},{"qty":"8 tranches","item":"baguette grillée"},{"qty":"150g","item":"gruyère râpé"}]',
  '["Faites fondre les oignons dans le beurre à feu doux pendant 30 minutes en remuant souvent jusqu''à caramélisation dorée.","Saupoudrez de farine, mélangez 2 minutes.","Déglacez au vin blanc, laissez réduire 3 minutes.","Ajoutez le bouillon, salez, poivrez, mijotez 15 minutes.","Versez dans des bols allant au four, posez les tranches de pain, couvrez de gruyère.","Gratinez sous le gril 5 minutes jusqu''à dorure."]',
  'La clé est la patience pour caraméliser les oignons. Ne précipitez pas cette étape !', 'Plat populaire depuis le XVIIIe siècle, la soupe à l''oignon était servie la nuit aux Halles de Paris pour réchauffer les maraîchers et fêtards.'
FROM public.lessons WHERE title = 'Les Bases des Soupes' LIMIT 1;

INSERT INTO public.recipes (lesson_id, title, description, emoji, prep_time_min, cook_time_min, servings, difficulty, avg_price_eur, ingredients, instructions, chef_tip, cultural_note)
SELECT id, 'Bœuf Bourguignon', 'Le grand classique bourguignon, mijoté au vin rouge avec légumes et lardons.', '🥩', 30, 180, 6, 'difficile', '18-25€',
  '[{"qty":"1.5kg","item":"bœuf à braiser","tip":"coupé en gros cubes"},{"qty":"200g","item":"lardons fumés"},{"qty":"1 bouteille","item":"vin rouge de Bourgogne"},{"qty":"3","item":"carottes"},{"qty":"2","item":"oignons"},{"qty":"4","item":"gousses d''ail"},{"qty":"200g","item":"champignons de Paris"},{"qty":"1","item":"bouquet garni"}]',
  '["Faites mariner le bœuf dans le vin avec les légumes 12h au réfrigérateur.","Égouttez et séchez la viande. Faites revenir les lardons.","Dorez les cubes de bœuf en plusieurs fois dans la graisse des lardons.","Ajoutez la marinade filtrée, portez à ébullition.","Enfournez à 160°C pendant 2h30, ajoutez les champignons en fin de cuisson.","Rectifiez l''assaisonnement et servez avec des pommes vapeur."]',
  'Préparez-le la veille : réchauffé, il est encore meilleur ! La sauce doit napper la cuillère.', 'Inventé par Julia Child en Amérique puis popularisé en France, le bœuf bourguignon est devenu ambassadeur de la gastronomie française dans le monde entier.'
FROM public.lessons WHERE title = 'Les Viandes Mijotées' LIMIT 1;

INSERT INTO public.recipes (lesson_id, title, description, emoji, prep_time_min, cook_time_min, servings, difficulty, avg_price_eur, ingredients, instructions, chef_tip, cultural_note)
SELECT id, 'Crème Brûlée', 'Le dessert français par excellence : une crème soyeuse sous un caramel craquant.', '🍮', 20, 45, 6, 'moyen', '5-8€',
  '[{"qty":"6","item":"jaunes d''œufs"},{"qty":"100g","item":"sucre en poudre"},{"qty":"50cl","item":"crème liquide entière"},{"qty":"1","item":"gousse de vanille"},{"qty":"6 c.s.","item":"cassonade","tip":"pour caraméliser"}]',
  '["Préchauffez le four à 150°C.","Fendez la gousse de vanille, grattez les graines dans la crème. Chauffez sans bouillir.","Fouettez les jaunes avec le sucre jusqu''à blanchiment.","Versez la crème chaude sur les œufs en remuant doucement.","Répartissez dans 6 ramequins, enfournez au bain-marie 40 minutes.","Réfrigérez 2h minimum. Saupoudrez de cassonade et caramélisez au chalumeau."]',
  'Le chalumeau doit être tenu en mouvement circulaire pour un caramel uniforme. Servez dans les 30 minutes !', 'Attestée dès 1691 dans le livre de cuisine de François Massialot, cuisinier de Louis XIV, la crème brûlée est l''un des desserts les plus copiés au monde.'
FROM public.lessons WHERE title = 'Les Desserts Classiques' LIMIT 1;
