-- Drop the materialized view to fix the API exposure warning
DROP MATERIALIZED VIEW IF EXISTS public.admin_view CASCADE;
DROP FUNCTION IF EXISTS public.refresh_admin_view() CASCADE;

-- Create a simple helper function that returns admin status for the current user only
-- This avoids exposing admin data through APIs while providing necessary functionality
CREATE OR REPLACE FUNCTION public.check_current_user_admin_status()
RETURNS TABLE(user_id uuid, is_admin boolean, email text, role text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
    current_user_id uuid;
BEGIN
    current_user_id := auth.uid();
    
    -- Only return data if the current user is an admin
    IF EXISTS (
        SELECT 1 FROM public.admin_users 
        WHERE admin_users.user_id = current_user_id 
        AND admin_users.is_active = true
    ) THEN
        RETURN QUERY
        SELECT 
            current_user_id,
            true AS is_admin,
            p.email,
            au.role
        FROM public.admin_users au
        LEFT JOIN public.profiles p ON p.user_id = au.user_id
        WHERE au.user_id = current_user_id AND au.is_active = true;
    END IF;
    
    RETURN;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.check_current_user_admin_status() TO authenticated;