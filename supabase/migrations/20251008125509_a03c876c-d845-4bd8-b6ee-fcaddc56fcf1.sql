-- Fix critical RLS security issues

-- 1. Add explicit public access denial to profiles table
CREATE POLICY "Deny public access to profiles"
ON public.profiles
FOR SELECT
TO anon
USING (false);

-- 2. Add explicit public access denial to seller_profiles
CREATE POLICY "Deny public access to seller_profiles"
ON public.seller_profiles
FOR SELECT
TO anon
USING (false);

-- 3. Add explicit public access denial to referrals
CREATE POLICY "Deny public access to referrals"
ON public.referrals
FOR SELECT
TO anon
USING (false);

-- 4. Add admin policy for seller_verification_tasks
CREATE POLICY "Admins can manage all verification tasks"
ON public.seller_verification_tasks
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid() AND is_active = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid() AND is_active = true
  )
);

-- 5. Add policy to allow sellers to update their verification tasks
CREATE POLICY "Sellers can update their own verification tasks"
ON public.seller_verification_tasks
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.seller_profiles sp
    WHERE sp.id = seller_verification_tasks.seller_profile_id
    AND sp.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.seller_profiles sp
    WHERE sp.id = seller_verification_tasks.seller_profile_id
    AND sp.user_id = auth.uid()
  )
);

-- 6. Deny unauthorized access to seller_verification_tasks
CREATE POLICY "Deny unauthorized access to verification tasks"
ON public.seller_verification_tasks
FOR SELECT
TO authenticated
USING (
  -- Only allow sellers to see their own tasks or admins to see all
  EXISTS (
    SELECT 1 FROM public.seller_profiles sp
    WHERE sp.id = seller_verification_tasks.seller_profile_id
    AND sp.user_id = auth.uid()
  )
  OR
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid() AND is_active = true
  )
);