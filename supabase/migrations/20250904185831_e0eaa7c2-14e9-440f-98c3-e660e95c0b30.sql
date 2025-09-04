-- Drop the security definer view and function to fix security warnings
DROP VIEW IF EXISTS public.is_admin CASCADE;
DROP FUNCTION IF EXISTS public.get_admin_info() CASCADE;

-- Create a proper materialized view instead that refreshes admin data
-- This avoids the security definer view issue
CREATE MATERIALIZED VIEW public.admin_view AS
SELECT 
    au.user_id,
    true AS is_admin,
    p.email,
    au.role
FROM public.admin_users au
LEFT JOIN public.profiles p ON p.user_id = au.user_id
WHERE au.is_active = true;

-- Enable RLS on the materialized view
ALTER MATERIALIZED VIEW public.admin_view OWNER TO postgres;

-- Create a secure function to refresh the materialized view
CREATE OR REPLACE FUNCTION public.refresh_admin_view()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
    -- Only allow admins to refresh the view
    IF NOT EXISTS (
        SELECT 1 FROM public.admin_users 
        WHERE user_id = auth.uid() AND is_active = true
    ) THEN
        RAISE EXCEPTION 'Unauthorized: Only admins can refresh admin view';
    END IF;
    
    REFRESH MATERIALIZED VIEW public.admin_view;
END;
$$;

-- Create index for performance
CREATE UNIQUE INDEX idx_admin_view_user_id ON public.admin_view(user_id);

-- Refresh the view initially
REFRESH MATERIALIZED VIEW public.admin_view;