-- Helper function to check if the current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Check if the user has the 'admin' role in the profiles table
  RETURN EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$;

-- Grant execute permission on the helper function to authenticated users
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- Drop existing policies to redefine them with admin privileges
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile." ON public.profiles;

-- RLS Policies for Admins and Users
-- 1. SELECT: Admins can see all profiles. Users can only see their own.
CREATE POLICY "Allow admin to read all profiles and users to read their own."
ON public.profiles
FOR SELECT
USING (auth.uid() = id OR public.is_admin());

-- 2. UPDATE: Admins can update any profile. Users can only update their own.
CREATE POLICY "Allow admin to update all profiles and users to update their own."
ON public.profiles
FOR UPDATE
USING (auth.uid() = id OR public.is_admin())
WITH CHECK (auth.uid() = id OR public.is_admin());

-- 3. INSERT: Admins can create profiles for other users.
-- The handle_new_user trigger handles self-insertion upon sign-up.
CREATE POLICY "Allow admin to insert new profiles."
ON public.profiles
FOR INSERT
WITH CHECK (public.is_admin());

-- 4. DELETE: Only admins can delete profiles.
CREATE POLICY "Allow admin to delete profiles."
ON public.profiles
FOR DELETE
USING (public.is_admin());
