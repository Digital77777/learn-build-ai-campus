-- Drop the potentially problematic view
DROP VIEW IF EXISTS public.is_admin_secure;

-- Recreate the function with better security practices
CREATE OR REPLACE FUNCTION public.get_admin_info()
RETURNS TABLE(user_id uuid, is_admin boolean, email text, role text)
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = 'public'
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

-- Create a simpler security definer function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = 'public'
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.admin_users 
        WHERE user_id = auth.uid() 
        AND is_active = true
    );
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_admin_info() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_current_user_admin() TO authenticated;