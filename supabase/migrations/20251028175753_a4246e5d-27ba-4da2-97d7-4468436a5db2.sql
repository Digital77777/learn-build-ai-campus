-- Drop the security definer view
DROP VIEW IF EXISTS public.active_members;

-- The get_user_contributions function is fine as it's already SECURITY DEFINER with set search_path
-- This is necessary to allow counting across tables

-- We'll query profiles directly and use the function in the application layer instead