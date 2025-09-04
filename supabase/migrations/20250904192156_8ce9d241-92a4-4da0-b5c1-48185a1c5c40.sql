-- First, let's examine and strengthen the profiles table RLS policies
-- to prevent email harvesting attacks

-- Drop existing policies to rebuild them with stronger security
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_delete_own" ON public.profiles;

-- Create stronger RLS policies with explicit authenticated user requirements
-- Policy 1: Only authenticated users can view their own profile
CREATE POLICY "authenticated_users_select_own_profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Policy 2: Only authenticated users can insert their own profile
CREATE POLICY "authenticated_users_insert_own_profile" 
ON public.profiles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id AND user_id IS NOT NULL);

-- Policy 3: Only authenticated users can update their own profile
CREATE POLICY "authenticated_users_update_own_profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id AND user_id IS NOT NULL);

-- Policy 4: Only authenticated users can delete their own profile
CREATE POLICY "authenticated_users_delete_own_profile" 
ON public.profiles 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Policy 5: Admins can view all profiles (for legitimate admin purposes)
CREATE POLICY "admins_can_view_all_profiles" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE admin_users.user_id = auth.uid() 
    AND admin_users.is_active = true
  )
);

-- Ensure RLS is enabled on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Revoke all permissions from anon role to prevent unauthenticated access
REVOKE ALL ON public.profiles FROM anon;

-- Grant specific permissions only to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;