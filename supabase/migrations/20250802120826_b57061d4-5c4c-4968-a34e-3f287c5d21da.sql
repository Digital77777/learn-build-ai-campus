-- Phase 2: Fix function search path security issues
-- Update all functions to have secure search_path

-- Fix update_last_login function
CREATE OR REPLACE FUNCTION public.update_last_login()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
    RETURN NEW;
END;
$function$;

-- Fix create_notification function
CREATE OR REPLACE FUNCTION public.create_notification(p_user_id uuid, p_type text, p_message text, p_metadata jsonb DEFAULT NULL::jsonb)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
    v_notification_id BIGINT;
BEGIN
    INSERT INTO public.notifications (
        user_id, 
        type, 
        message, 
        metadata
    ) VALUES (
        p_user_id,
        p_type,
        p_message,
        p_metadata
    ) RETURNING id INTO v_notification_id;

    RETURN v_notification_id;
END;
$function$;

-- Fix update_modified_column function
CREATE OR REPLACE FUNCTION public.update_modified_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$;

-- Fix add_admin_user function
CREATE OR REPLACE FUNCTION public.add_admin_user(p_user_id uuid, p_role text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
    INSERT INTO public.admin_users (user_id, is_active, role)
    VALUES (p_user_id, true, p_role)
    ON CONFLICT (user_id) DO UPDATE
    SET 
        is_active = true, 
        role = EXCLUDED.role;
END;
$function$;

-- Fix upsert_seller_profile function
CREATE OR REPLACE FUNCTION public.upsert_seller_profile(p_business_name text, p_business_type text DEFAULT NULL::text, p_description text DEFAULT NULL::text, p_contact_email text DEFAULT NULL::text, p_contact_phone text DEFAULT NULL::text, p_address jsonb DEFAULT NULL::jsonb, p_tax_id text DEFAULT NULL::text)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
    v_user_id UUID;
    v_seller_profile_id BIGINT;
BEGIN
    v_user_id := auth.uid();

    INSERT INTO public.seller_profiles (
        user_id,
        business_name,
        business_type,
        description,
        contact_email,
        contact_phone,
        address,
        tax_id,
        status
    ) VALUES (
        v_user_id,
        p_business_name,
        p_business_type,
        p_description,
        p_contact_email,
        p_contact_phone,
        p_address,
        p_tax_id,
        'pending'
    )
    ON CONFLICT (user_id) DO UPDATE 
    SET 
        business_name = EXCLUDED.business_name,
        business_type = EXCLUDED.business_type,
        description = EXCLUDED.description,
        contact_email = EXCLUDED.contact_email,
        contact_phone = EXCLUDED.contact_phone,
        address = EXCLUDED.address,
        tax_id = EXCLUDED.tax_id,
        updated_at = NOW()
    RETURNING id INTO v_seller_profile_id;

    PERFORM public.create_seller_verification_task(v_seller_profile_id);

    RETURN v_seller_profile_id;
END;
$function$;

-- Fix remaining functions with search_path
CREATE OR REPLACE FUNCTION public.check_user_seller_status()
RETURNS TABLE(has_seller_profile boolean, profile_status text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
    v_user_id UUID;
BEGIN
    v_user_id := auth.uid();

    RETURN QUERY 
    SELECT 
        EXISTS(SELECT 1 FROM public.seller_profiles WHERE user_id = v_user_id) AS has_seller_profile,
        (SELECT status FROM public.seller_profiles WHERE user_id = v_user_id) AS profile_status;
END;
$function$;

CREATE OR REPLACE FUNCTION public.create_seller_verification_task(p_seller_profile_id bigint, p_required_documents jsonb DEFAULT NULL::jsonb)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
    v_task_id BIGINT;
BEGIN
    INSERT INTO public.seller_verification_tasks (
        seller_profile_id, 
        status, 
        required_documents
    ) VALUES (
        p_seller_profile_id, 
        'pending', 
        COALESCE(p_required_documents, '[]'::JSONB)
    ) RETURNING id INTO v_task_id;

    UPDATE public.seller_profiles
    SET status = 'under_review'
    WHERE id = p_seller_profile_id;

    RETURN v_task_id;
END;
$function$;