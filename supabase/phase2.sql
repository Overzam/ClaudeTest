-- RecipeQuest — Phase 2 Migrations
-- Run in Supabase SQL editor after schema.sql

-- ===========================
-- MIGRATION 5 — Badges system
-- ===========================

create table public.badges (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  description text not null,
  emoji text not null,
  condition_type text not null check (condition_type in (
    'lessons_completed', 'streak_days', 'xp_total', 'path_completed', 'first_lesson'
  )),
  condition_value int not null
);

create table public.user_badges (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade not null,
  badge_id uuid references public.badges(id) not null,
  earned_at timestamptz default now() not null,
  unique(user_id, badge_id)
);

alter table public.user_badges enable row level security;
create policy "badges are public" on public.badges for select using (true);
create policy "users see own badges" on public.user_badges for select using (auth.uid() = user_id);
create policy "users earn own badges" on public.user_badges for insert with check (auth.uid() = user_id);

-- Badge seed data
insert into public.badges (slug, title, description, emoji, condition_type, condition_value) values
  ('first_step',     'Premier Pas',        'Complète ta première leçon',        '🌱', 'first_lesson',       1),
  ('on_fire',        'En Feu !',           'Maintiens une série de 3 jours',    '🔥', 'streak_days',        3),
  ('week_streak',    'Semaine de Feu',     'Maintiens une série de 7 jours',    '🏅', 'streak_days',        7),
  ('month_streak',   'Mois Parfait',       'Maintiens une série de 30 jours',   '💎', 'streak_days',       30),
  ('xp_100',        '100 XP',             'Accumule 100 XP',                   '⭐', 'xp_total',         100),
  ('xp_500',        '500 XP',             'Accumule 500 XP',                   '🌟', 'xp_total',         500),
  ('xp_1000',       'Maître Cuisinier',   'Accumule 1000 XP',                  '👨‍🍳', 'xp_total',        1000),
  ('lessons_5',     'Apprenti',           'Complète 5 leçons',                 '📚', 'lessons_completed',   5),
  ('lessons_15',    'Intermédiaire',      'Complète 15 leçons',                '🎓', 'lessons_completed',  15),
  ('lessons_30',    'Expert',             'Complète 30 leçons',                '🏆', 'lessons_completed',  30),
  ('path_french',   'Chef Français',      'Termine le parcours Français',      '🇫🇷', 'path_completed',     1),
  ('path_italian',  'Cuisinier Italien',  'Termine le parcours Italien',       '🇮🇹', 'path_completed',     2),
  ('path_veggie',   'Végé Master',        'Termine le parcours Végétarien',    '🥗', 'path_completed',     3);

-- ===========================
-- MIGRATION 6 — Friends system
-- ===========================

create table public.friendships (
  id uuid primary key default uuid_generate_v4(),
  requester_id uuid references public.users(id) on delete cascade not null,
  addressee_id uuid references public.users(id) on delete cascade not null,
  status text not null check (status in ('pending', 'accepted', 'declined')),
  created_at timestamptz default now() not null,
  unique(requester_id, addressee_id)
);

alter table public.friendships enable row level security;
create policy "users see own friendships" on public.friendships for select
  using (auth.uid() = requester_id or auth.uid() = addressee_id);
create policy "users create friend requests" on public.friendships for insert
  with check (auth.uid() = requester_id);
create policy "users update own friendships" on public.friendships for update
  using (auth.uid() = addressee_id or auth.uid() = requester_id);

-- ===========================
-- MIGRATION 7 — 10 new paths
-- ===========================

insert into public.paths (slug, title, description, emoji, color, order_index) values
  ('japanese',     'Cuisine Japonaise',    'Sushi, ramen, et l''art du dashi',           '🇯🇵', '#BC002D', 4),
  ('mexican',      'Cuisine Mexicaine',    'Tacos, guacamole et mole',                   '🇲🇽', '#006847', 5),
  ('moroccan',     'Cuisine Marocaine',    'Tajine, couscous et ras-el-hanout',          '🇲🇦', '#C1272D', 6),
  ('chinese',      'Cuisine Chinoise',     'Wok, dim sum et sauces authentiques',        '🇨🇳', '#DE2910', 7),
  ('indian',       'Cuisine Indienne',     'Curry, masala et pains naan',                '🇮🇳', '#FF9933', 8),
  ('greek',        'Cuisine Grecque',      'Mezze, moussaka et tzatziki',                '🇬🇷', '#0D5EAF', 9),
  ('thai',         'Cuisine Thaïlandaise', 'Pad thaï, laak et soupes de coco',           '🇹🇭', '#A51931', 10),
  ('pastry',       'Pâtisserie',           'Gâteaux, éclairs et macarons',               '🎂', '#F4A6C0', 11),
  ('bbq',          'Barbecue & Grillades', 'Marinades, fumage et cuissons directes',     '🔥', '#8B0000', 12),
  ('vegan',        'Cuisine Vegan',        '100% végétal, 100% savoureux',               '🌿', '#2E7D32', 13);

-- Add 5 lessons per new path (example: Japanese)
with p as (select id, slug from public.paths)
insert into public.lessons (path_id, title, description, order_index, xp_reward) values
  ((select id from p where slug='japanese'), 'Le Dashi',              'Le bouillon fondateur de la cuisine japonaise', 1, 20),
  ((select id from p where slug='japanese'), 'Les Sushis',            'Riz vinaigré, nori et garnitures',             2, 25),
  ((select id from p where slug='japanese'), 'Le Ramen',              'Bouillon, nouilles et toppings',               3, 25),
  ((select id from p where slug='japanese'), 'Le Tempura',            'Légumes et fruits de mer en beignet léger',    4, 20),
  ((select id from p where slug='japanese'), 'Le Mochi',              'Gâteau de riz gluant traditionnel',            5, 20),

  ((select id from p where slug='mexican'), 'Le Guacamole',           'Avocat, citron vert et coriandre',             1, 20),
  ((select id from p where slug='mexican'), 'Les Tacos',              'Tortillas, viande marinée et salsa',           2, 20),
  ((select id from p where slug='mexican'), 'Le Mole Negro',          'Sauce chocolat-épices ancestrale',             3, 30),
  ((select id from p where slug='mexican'), 'Le Ceviche',             'Poisson cru mariné aux agrumes',               4, 20),
  ((select id from p where slug='mexican'), 'Les Churros',            'Beignets frits au sucre cannelle',             5, 20),

  ((select id from p where slug='moroccan'), 'Le Tajine d''Agneau',   'Viande fondante aux pruneaux et amandes',      1, 25),
  ((select id from p where slug='moroccan'), 'Le Couscous Royal',     'Semoule, légumes et merguez',                  2, 25),
  ((select id from p where slug='moroccan'), 'La Harira',             'Soupe traditionnelle du Ramadan',              3, 20),
  ((select id from p where slug='moroccan'), 'Les Briouats',          'Feuilletés sucrés ou salés',                   4, 20),
  ((select id from p where slug='moroccan'), 'La Pastilla',           'Tourte sucrée-salée au pigeon',                5, 30),

  ((select id from p where slug='chinese'), 'Le Wok Parfait',         'Maîtriser le feu vif et la cuisson rapide',   1, 20),
  ((select id from p where slug='chinese'), 'Les Dim Sum',            'Raviolis vapeur et bouchées cantonaises',     2, 25),
  ((select id from p where slug='chinese'), 'Le Canard Laqué',        'Cuisson lente et laquage traditionnel',       3, 30),
  ((select id from p where slug='chinese'), 'Le Kung Pao',            'Poulet épicé aux cacahuètes',                 4, 20),
  ((select id from p where slug='chinese'), 'Le Gâteau de Lune',      'Pâtisserie traditionnelle de mi-automne',     5, 20),

  ((select id from p where slug='indian'), 'Le Curry Butter Chicken', 'Poulet en sauce tomate-crème épicée',         1, 20),
  ((select id from p where slug='indian'), 'Le Dal Makhani',          'Lentilles noires mijotées au beurre',         2, 20),
  ((select id from p where slug='indian'), 'Le Pain Naan',            'Pain levé cuit au tandoor',                   3, 20),
  ((select id from p where slug='indian'), 'Le Biryani',              'Riz parfumé aux épices et viande',            4, 25),
  ((select id from p where slug='indian'), 'Les Samosas',             'Beignets farcis aux légumes ou viande',       5, 20),

  ((select id from p where slug='greek'), 'La Moussaka',              'Gratin d''aubergines et béchamel',            1, 25),
  ((select id from p where slug='greek'), 'Le Tzatziki',              'Yaourt, concombre et ail',                    2, 15),
  ((select id from p where slug='greek'), 'La Spanakopita',           'Feuilleté épinards-feta',                     3, 20),
  ((select id from p where slug='greek'), 'Le Souvlaki',              'Brochettes marinées à la grecque',            4, 20),
  ((select id from p where slug='greek'), 'Le Baklava',               'Feuilletés au miel et aux noix',              5, 20),

  ((select id from p where slug='thai'), 'Le Pad Thaï',               'Nouilles de riz sautées à la thaïlandaise',  1, 20),
  ((select id from p where slug='thai'), 'La Soupe Tom Kha',          'Bouillon de coco, galanga et citronnelle',   2, 20),
  ((select id from p where slug='thai'), 'Le Curry Vert',             'Pâte de curry verte et lait de coco',        3, 25),
  ((select id from p where slug='thai'), 'Le Riz Gluant à la Mangue', 'Dessert sucré-salé emblématique',            4, 20),
  ((select id from p where slug='thai'), 'Les Rouleaux de Printemps', 'Frais ou frits, avec sauce nuoc mam',        5, 20),

  ((select id from p where slug='pastry'), 'La Pâte Feuilletée',      'Beurrage et tourage étape par étape',        1, 25),
  ((select id from p where slug='pastry'), 'Les Macarons',            'Tant pour tant, meringue italienne',          2, 30),
  ((select id from p where slug='pastry'), 'L''Éclair au Chocolat',   'Pâte à choux, crème pâtissière, glaçage',   3, 25),
  ((select id from p where slug='pastry'), 'La Tarte Tatin',          'Caramel, pommes et feuilletage inversé',     4, 20),
  ((select id from p where slug='pastry'), 'Le Soufflé au Chocolat',  'Légèreté, timing et précision',              5, 30),

  ((select id from p where slug='bbq'), 'Les Marinades',              'Acide, gras, sel et aromates',               1, 20),
  ((select id from p where slug='bbq'), 'La Cuisson Directe',         'Saisir, griller et marquer',                 2, 20),
  ((select id from p where slug='bbq'), 'Le Fumage',                  'Bois, température et durée',                 3, 25),
  ((select id from p where slug='bbq'), 'Les Ribs',                   'Low & slow : côtes levées texanes',          4, 25),
  ((select id from p where slug='bbq'), 'Les Sauces Barbecue',        'BBQ Kansas City, Carolina, Texas',           5, 20),

  ((select id from p where slug='vegan'), 'Le Tofu Sauté',            'Marinade, saisie et textures',               1, 20),
  ((select id from p where slug='vegan'), 'Le Lait Végétal Maison',   'Amande, avoine, soja',                       2, 15),
  ((select id from p where slug='vegan'), 'Le Seitan',                'Protéine de blé texturée et cuisinée',       3, 25),
  ((select id from p where slug='vegan'), 'Le Bowl Protéiné',         'Quinoa, légumineuses et graines',            4, 20),
  ((select id from p where slug='vegan'), 'Le Cheesecake Vegan',      'Noix de cajou, citron et fruits rouges',     5, 20);
