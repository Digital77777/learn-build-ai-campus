-- Strengthen RLS policies for seller_profiles to protect sensitive business data
-- Drop existing policy to rebuild with stronger security
DROP POLICY IF EXISTS "Users can manage their own seller profile" ON public.seller_profiles;

-- Create comprehensive RLS policies for seller_profiles
-- Policy 1: Only authenticated users can view their own seller profile
CREATE POLICY "authenticated_users_select_own_seller_profile" 
ON public.seller_profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Policy 2: Only authenticated users can insert their own seller profile
CREATE POLICY "authenticated_users_insert_own_seller_profile" 
ON public.seller_profiles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id AND user_id IS NOT NULL);

-- Policy 3: Only authenticated users can update their own seller profile
CREATE POLICY "authenticated_users_update_own_seller_profile" 
ON public.seller_profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id AND user_id IS NOT NULL);

-- Policy 4: Only authenticated users can delete their own seller profile
CREATE POLICY "authenticated_users_delete_own_seller_profile" 
ON public.seller_profiles 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Policy 5: Admins can view all seller profiles (for verification and management)
CREATE POLICY "admins_can_view_all_seller_profiles" 
ON public.seller_profiles 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE admin_users.user_id = auth.uid() 
    AND admin_users.is_active = true
  )
);

-- Policy 6: Admins can update seller profiles (for status changes and verification)
CREATE POLICY "admins_can_update_seller_profiles" 
ON public.seller_profiles 
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE admin_users.user_id = auth.uid() 
    AND admin_users.is_active = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE admin_users.user_id = auth.uid() 
    AND admin_users.is_active = true
  )
);

-- Ensure RLS is enabled on seller_profiles table
ALTER TABLE public.seller_profiles ENABLE ROW LEVEL SECURITY;

-- Revoke all permissions from anon role to prevent unauthenticated access
REVOKE ALL ON public.seller_profiles FROM anon;

-- Grant specific permissions only to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON public.seller_profiles TO authenticated;