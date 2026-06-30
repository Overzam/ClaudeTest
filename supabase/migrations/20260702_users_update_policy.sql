-- Allow authenticated users to update their own profile (username, avatar_url)
CREATE POLICY "users can update their own profile"
ON public.users FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
