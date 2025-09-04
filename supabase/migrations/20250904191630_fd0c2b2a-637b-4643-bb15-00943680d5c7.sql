-- Fix the search path warning by setting it to empty string (most secure)
CREATE OR REPLACE FUNCTION public.check_current_user_admin_status()
RETURNS TABLE(user_id uuid, is_admin boolean, email text, role text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
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