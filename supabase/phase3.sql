-- RecipeQuest — Phase 3 Migrations
-- Run after phase2.sql

-- ============================
-- MIGRATION 8 — Subscriptions
-- ============================

create table public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid unique references public.users(id) on delete cascade not null,
  plan text not null check (plan in ('free', 'monthly', 'yearly')),
  started_at timestamptz default now() not null,
  expires_at timestamptz,
  store_transaction_id text,  -- RevenueCat / App Store receipt ID
  updated_at timestamptz default now() not null
);

alter table public.subscriptions enable row level security;
create policy "users own subscription" on public.subscriptions for all using (auth.uid() = user_id);

-- Auto-create free subscription on signup (extend handle_new_user trigger)
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
  insert into public.subscriptions (user_id, plan) values (new.id, 'free');
  insert into public.user_progress (user_id, lesson_id, path_id, status)
  select new.id, l.id, l.path_id, 'available'
  from public.lessons l
  where l.order_index = 1;
  return new;
end;
$$;

-- ============================
-- MIGRATION 9 — Coins system
-- ============================

alter table public.user_stats add column if not exists coins int default 0 not null;

-- RPC to add coins
create or replace function public.add_coins(p_user_id uuid, p_amount int)
returns void language plpgsql as $$
begin
  update public.user_stats
  set coins = coins + p_amount, updated_at = now()
  where user_id = p_user_id;
end;
$$;

-- RPC to spend coins (returns false if insufficient)
create or replace function public.spend_coins(p_user_id uuid, p_amount int)
returns boolean language plpgsql as $$
declare
  v_coins int;
begin
  select coins into v_coins from public.user_stats where user_id = p_user_id;
  if v_coins < p_amount then return false; end if;
  update public.user_stats set coins = coins - p_amount, updated_at = now()
  where user_id = p_user_id;
  return true;
end;
$$;
