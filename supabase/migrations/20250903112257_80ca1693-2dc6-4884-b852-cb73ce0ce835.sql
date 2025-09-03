-- Clean up redundant RLS policies on profiles table and ensure secure access
-- First, drop all existing policies to clean up duplicates
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can manage own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users manage own profile" ON public.profiles;

-- Create clean, secure RLS policies for profiles table
-- Users can only view their own profile
CREATE POLICY "profiles_select_own" ON public.profiles
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can only insert their own profile
CREATE POLICY "profiles_insert_own" ON public.profiles
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can only update their own profile
CREATE POLICY "profiles_update_own" ON public.profiles
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can only delete their own profile
CREATE POLICY "profiles_delete_own" ON public.profiles
FOR DELETE 
USING (auth.uid() = user_id);