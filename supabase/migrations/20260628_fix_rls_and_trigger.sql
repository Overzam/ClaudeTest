-- Fix 1: unlock first lesson (order_index=0) not second (order_index=1)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.users (id, username, avatar_url)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_stats (user_id) VALUES (new.id)
  ON CONFLICT (user_id) DO NOTHING;

  INSERT INTO public.user_progress (user_id, lesson_id, path_id, status)
  SELECT new.id, l.id, l.path_id, 'available'
  FROM public.lessons l
  WHERE l.order_index = 0
  ON CONFLICT (user_id, lesson_id) DO NOTHING;

  RETURN new;
END;
$$;

-- Fix 2: allow authenticated users to read other users' public profiles
-- (needed for friend search and leaderboard)
DROP POLICY IF EXISTS "users can read own profile" ON public.users;
CREATE POLICY "users profiles are readable by authenticated" ON public.users
  FOR SELECT TO authenticated USING (true);

-- Fix 3: allow reading other users' stats for leaderboard
DROP POLICY IF EXISTS "users own their stats" ON public.user_stats;
CREATE POLICY "users own their stats" ON public.user_stats
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "user stats readable for leaderboard" ON public.user_stats
  FOR SELECT TO authenticated USING (true);
