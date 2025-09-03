-- Drop existing objects if they exist
DROP VIEW IF EXISTS public.is_admin_secure CASCADE;
DROP VIEW IF EXISTS public.is_admin CASCADE;
DROP FUNCTION IF EXISTS public.get_admin_info() CASCADE;

-- Create a security definer function to safely check admin status
CREATE OR REPLACE FUNCTION public.get_admin_info()
RETURNS TABLE(user_id uuid, is_admin boolean, email text, role text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
    -- Only allow access if the current user is an admin
    IF NOT EXISTS (
        SELECT 1 FROM public.admin_users 
        WHERE admin_users.user_id = auth.uid() 
        AND admin_users.is_active = true
    ) THEN
        -- Return empty result set for non-admins
        RETURN;
    END IF;

    -- Return admin information only for authenticated admins
    RETURN QUERY
    SELECT 
        au.user_id,
        true AS is_admin,
        p.email,
        au.role
    FROM public.admin_users au
    LEFT JOIN public.profiles p ON p.user_id = au.user_id
    WHERE au.is_active = true;
END;
$$;

-- Recreate the is_admin view with proper security
CREATE VIEW public.is_admin AS
SELECT * FROM public.get_admin_info();

-- Grant usage to authenticated users (security is handled by the function)
GRANT SELECT ON public.is_admin TO authenticated;