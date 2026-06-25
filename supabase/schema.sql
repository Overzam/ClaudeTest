-- RecipeQuest — Supabase Schema
-- Run each migration block in order in the Supabase SQL editor

-- ===========================
-- MIGRATION 1 — Core tables
-- ===========================

create extension if not exists "uuid-ossp";

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  avatar_url text,
  created_at timestamptz default now() not null
);

create table public.paths (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  description text,
  emoji text not null,
  color text not null,
  order_index int not null,
  is_active boolean default true
);

create table public.lessons (
  id uuid primary key default uuid_generate_v4(),
  path_id uuid references public.paths(id) on delete cascade not null,
  title text not null,
  description text,
  order_index int not null,
  xp_reward int default 20 not null,
  thumbnail_url text
);

create table public.exercises (
  id uuid primary key default uuid_generate_v4(),
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  type text not null check (type in ('multiple_choice', 'step_ordering', 'photo_identification', 'association')),
  order_index int not null,
  question text not null,
  image_url text,
  data jsonb not null,
  xp_reward int default 5 not null
);

create table public.user_stats (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid unique references public.users(id) on delete cascade not null,
  xp int default 0 not null,
  level int default 1 not null,
  streak_days int default 0 not null,
  last_activity_date date,
  hearts int default 5 not null,
  hearts_last_refill timestamptz default now(),
  lessons_completed int default 0 not null,
  updated_at timestamptz default now() not null
);

create table public.user_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade not null,
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  path_id uuid references public.paths(id) not null,
  status text default 'locked' check (status in ('locked', 'available', 'completed')) not null,
  score int,
  completed_at timestamptz,
  attempts int default 0 not null,
  unique(user_id, lesson_id)
);

-- ===========================
-- MIGRATION 2 — RLS policies
-- ===========================

alter table public.users enable row level security;
alter table public.user_stats enable row level security;
alter table public.user_progress enable row level security;
alter table public.paths enable row level security;
alter table public.lessons enable row level security;
alter table public.exercises enable row level security;

create policy "paths are public" on public.paths for select using (true);
create policy "lessons are public" on public.lessons for select using (true);
create policy "exercises are public" on public.exercises for select using (true);

create policy "users can read own profile" on public.users for select using (auth.uid() = id);
create policy "users can update own profile" on public.users for update using (auth.uid() = id);
create policy "users can insert own profile" on public.users for insert with check (auth.uid() = id);

create policy "users own their stats" on public.user_stats for all using (auth.uid() = user_id);
create policy "users own their progress" on public.user_progress for all using (auth.uid() = user_id);

-- =================================
-- MIGRATION 3 — Functions & triggers
-- =================================

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.users (id, username, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  insert into public.user_stats (user_id) values (new.id);
  insert into public.user_progress (user_id, lesson_id, path_id, status)
  select new.id, l.id, l.path_id, 'available'
  from public.lessons l
  where l.order_index = 1;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.update_streak(p_user_id uuid)
returns void language plpgsql as $$
declare
  v_last_date date;
  v_today date := current_date;
begin
  select last_activity_date into v_last_date
  from public.user_stats where user_id = p_user_id;

  if v_last_date = v_today - 1 then
    update public.user_stats
    set streak_days = streak_days + 1, last_activity_date = v_today, updated_at = now()
    where user_id = p_user_id;
  elsif v_last_date < v_today - 1 or v_last_date is null then
    update public.user_stats
    set streak_days = 1, last_activity_date = v_today, updated_at = now()
    where user_id = p_user_id;
  end if;
end;
$$;

create or replace function public.increment_lessons_completed(p_user_id uuid)
returns void language plpgsql as $$
begin
  update public.user_stats
  set lessons_completed = lessons_completed + 1, updated_at = now()
  where user_id = p_user_id;
end;
$$;

-- =======================
-- MIGRATION 4 — Seed data
-- =======================

insert into public.paths (slug, title, description, emoji, color, order_index) values
  ('french',     'Cuisine Française',    'Maîtrise les classiques de la gastronomie française', '🇫🇷', '#0055A4', 1),
  ('italian',    'Cuisine Italienne',    'Pasta, pizza e molto altro!',                          '🇮🇹', '#CE2B37', 2),
  ('vegetarian', 'Cuisine Végétarienne', 'Délicieux sans viande',                                '🥗',  '#3A7D44', 3);

with p as (select id, slug from public.paths)
insert into public.lessons (path_id, title, description, order_index, xp_reward) values
  ((select id from p where slug='french'), 'Les Sauces de Base',     'Béchamel, velouté, hollandaise…',          1, 20),
  ((select id from p where slug='french'), 'La Quiche Lorraine',     'Tarte salée aux lardons et fromage',       2, 20),
  ((select id from p where slug='french'), 'Le Bœuf Bourguignon',    'Mijotage et braising à la française',      3, 25),
  ((select id from p where slug='french'), 'Les Crêpes',             'Fine crêpe dorée sucrée ou salée',         4, 20),
  ((select id from p where slug='french'), 'La Soupe à l''Oignon',   'Gratinée parisienne traditionnelle',       5, 25),
  ((select id from p where slug='italian'), 'Les Pâtes Fraîches',    'Tagliatelle, fettuccine maison',           1, 20),
  ((select id from p where slug='italian'), 'La Sauce Tomate',       'Pomodoro, passata, basilico',              2, 20),
  ((select id from p where slug='italian'), 'Le Risotto',            'Al dente avec mantecatura',                3, 25),
  ((select id from p where slug='italian'), 'La Pizza Napolitaine',  'Pâte fine, four chaud, mozzarella',        4, 25),
  ((select id from p where slug='italian'), 'Le Tiramisu',           'Mascarpone, café, savoiardi',              5, 20),
  ((select id from p where slug='vegetarian'), 'Le Curry de Légumes', 'Épices, lait de coco, légumes de saison', 1, 20),
  ((select id from p where slug='vegetarian'), 'Le Houmous',          'Pois chiches, tahini, citron',            2, 20),
  ((select id from p where slug='vegetarian'), 'Le Buddha Bowl',      'Équilibre, couleurs et protéines végétales', 3, 20),
  ((select id from p where slug='vegetarian'), 'La Quiche aux Légumes','Sans viande, pleine de saveurs',         4, 25),
  ((select id from p where slug='vegetarian'), 'Le Gaspacho',         'Soupe froide espagnole aux tomates',      5, 20);

-- Example exercises for "Les Sauces de Base" (lesson 1 of French path)
-- Replace lesson_id with the actual UUID from your DB
-- Insert at least 3 exercises per lesson, covering all 4 types

-- Example multiple_choice:
-- insert into public.exercises (lesson_id, type, order_index, question, data, xp_reward)
-- select l.id, 'multiple_choice', 1,
--   'Quelle farine utilise-t-on pour une béchamel ?',
--   '{"options":["Farine de blé","Farine de maïs","Fécule de pomme de terre","Farine de riz"],"correctIndex":0}'::jsonb,
--   5
-- from public.lessons l
-- join public.paths p on l.path_id = p.id
-- where p.slug = 'french' and l.order_index = 1;

-- See README for full exercise seed examples
