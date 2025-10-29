-- Security Fix: Update all SECURITY DEFINER functions to have proper search_path
-- This addresses the "Function Search Path Mutable" warning

-- Drop conflicting function versions first
DROP FUNCTION IF EXISTS public.add_admin_user(uuid, text);
DROP FUNCTION IF EXISTS public.add_admin_user(text, text);

-- Fix functions from early migrations that use empty search_path
CREATE OR REPLACE FUNCTION public.update_last_login()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.create_notification(p_user_id uuid, p_type text, p_message text, p_metadata jsonb DEFAULT NULL::jsonb)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

CREATE OR REPLACE FUNCTION public.update_modified_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.upsert_seller_profile(p_business_name text, p_business_type text DEFAULT NULL::text, p_description text DEFAULT NULL::text, p_contact_email text DEFAULT NULL::text, p_contact_phone text DEFAULT NULL::text, p_address jsonb DEFAULT NULL::jsonb, p_tax_id text DEFAULT NULL::text)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

CREATE OR REPLACE FUNCTION public.check_user_seller_status()
RETURNS TABLE(has_seller_profile boolean, profile_status text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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
SET search_path = public
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

CREATE OR REPLACE FUNCTION public.update_required_document_types(p_seller_profile_id bigint, p_document_types jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
    UPDATE public.seller_verification_tasks
    SET document_types_required = p_document_types
    WHERE seller_profile_id = p_seller_profile_id;
END;
$function$;

CREATE OR REPLACE FUNCTION public.upload_seller_documents(p_seller_profile_id bigint, p_documents jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
    v_verification_task_id BIGINT;
    v_current_required_docs JSONB;
    v_uploaded_docs JSONB;
    v_validation_result JSONB;
BEGIN
    SELECT id, document_types_required, uploaded_documents 
    INTO v_verification_task_id, v_current_required_docs, v_uploaded_docs
    FROM public.seller_verification_tasks 
    WHERE seller_profile_id = p_seller_profile_id;

    WITH uploaded_doc_validation AS (
        SELECT 
            doc->>'type' AS doc_type,
            doc->>'url' AS doc_url,
            doc->>'name' AS doc_name
        FROM jsonb_array_elements(p_documents) AS doc
    )
    SELECT jsonb_build_object(
        'valid_documents', jsonb_agg(
            jsonb_build_object(
                'type', doc_type,
                'url', doc_url,
                'name', doc_name,
                'is_valid', doc_type = ANY(SELECT jsonb_array_elements_text(v_current_required_docs))
            )
        ),
        'missing_documents', v_current_required_docs - 
            (SELECT jsonb_agg(DISTINCT doc_type) FROM uploaded_doc_validation)
    ) INTO v_validation_result
    FROM uploaded_doc_validation;

    UPDATE public.seller_verification_tasks
    SET 
        uploaded_documents = p_documents,
        status = CASE 
            WHEN (v_validation_result->>'missing_documents')::JSONB = '[]'::JSONB 
            THEN 'in_review' 
            ELSE 'pending' 
        END
    WHERE id = v_verification_task_id;

    UPDATE public.seller_profiles
    SET status = 'under_review'
    WHERE id = p_seller_profile_id;

    RETURN v_validation_result;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_sellers_for_review(p_status text DEFAULT 'under_review'::text, p_page integer DEFAULT 1, p_page_size integer DEFAULT 10)
RETURNS TABLE(seller_profile_id bigint, user_id uuid, business_name text, business_type text, status text, created_at timestamp with time zone, verification_task_id bigint, uploaded_documents jsonb)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        sp.id AS seller_profile_id,
        sp.user_id,
        sp.business_name,
        sp.business_type,
        sp.status,
        sp.created_at,
        svt.id AS verification_task_id,
        svt.uploaded_documents
    FROM public.seller_profiles sp
    JOIN public.seller_verification_tasks svt ON sp.id = svt.seller_profile_id
    WHERE sp.status = p_status
    ORDER BY sp.created_at DESC
    LIMIT p_page_size
    OFFSET (p_page - 1) * p_page_size;
END;
$function$;

CREATE OR REPLACE FUNCTION public.review_seller_profile(p_verification_task_id bigint, p_status text, p_reviewer_notes text DEFAULT NULL::text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
    v_seller_profile_id BIGINT;
    v_current_status TEXT;
BEGIN
    IF p_status NOT IN ('approved', 'rejected') THEN
        RAISE EXCEPTION 'Invalid status. Must be approved or rejected.';
    END IF;

    SELECT seller_profile_id, status 
    INTO v_seller_profile_id, v_current_status
    FROM public.seller_verification_tasks
    WHERE id = p_verification_task_id;

    UPDATE public.seller_verification_tasks
    SET 
        status = p_status,
        reviewer_notes = p_reviewer_notes,
        reviewed_by = auth.uid(),
        updated_at = NOW()
    WHERE id = p_verification_task_id;

    UPDATE public.seller_profiles
    SET 
        status = CASE 
            WHEN p_status = 'approved' THEN 'verified'
            ELSE 'rejected'
        END
    WHERE id = v_seller_profile_id;
END;
$function$;

CREATE OR REPLACE FUNCTION public.log_error(p_error_message text, p_error_context jsonb DEFAULT '{}'::jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
    INSERT INTO public.error_log (error_message, error_context)
    VALUES (p_error_message, p_error_context);
END;
$function$;

CREATE OR REPLACE FUNCTION public.raise_application_error(p_error_code integer, p_error_message text)
RETURNS void
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
    PERFORM public.log_error(p_error_message, 
        jsonb_build_object('error_code', p_error_code));
    
    RAISE EXCEPTION 
        '%', p_error_message 
        USING ERRCODE = p_error_code;
END;
$function$;

CREATE OR REPLACE FUNCTION public.safe_user_creation(p_email text, p_full_name text)
RETURNS uuid
LANGUAGE plpgsql
SET search_path = public
AS $function$
DECLARE
    v_user_id UUID;
BEGIN
    IF p_email IS NULL OR p_email = '' THEN
        PERFORM public.raise_application_error(
            22023, 
            'Email cannot be null or empty'
        );
    END IF;

    BEGIN
        INSERT INTO public.profiles (email, full_name)
        VALUES (p_email, p_full_name)
        RETURNING id INTO v_user_id;

        RETURN v_user_id;
    EXCEPTION 
        WHEN unique_violation THEN
            PERFORM public.raise_application_error(
                23505, 
                'User with this email already exists'
            );
        WHEN OTHERS THEN
            PERFORM public.log_error(
                SQLERRM, 
                jsonb_build_object(
                    'state', SQLSTATE, 
                    'email', p_email
                )
            );
            RAISE;
    END;
END;
$function$;

CREATE OR REPLACE FUNCTION public.refresh_admin_view()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM public.admin_users 
        WHERE user_id = auth.uid() AND is_active = true
    ) THEN
        RAISE EXCEPTION 'Unauthorized: Only admins can refresh admin view';
    END IF;
    
    REFRESH MATERIALIZED VIEW public.admin_view;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_insight_likes_count()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE community_insights
    SET likes_count = likes_count + 1
    WHERE id = NEW.insight_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE community_insights
    SET likes_count = GREATEST(likes_count - 1, 0)
    WHERE id = OLD.insight_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

CREATE OR REPLACE FUNCTION public.check_current_user_admin_status()
RETURNS TABLE(user_id uuid, is_admin boolean, email text, role text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
    current_user_id uuid;
BEGIN
    current_user_id := auth.uid();
    
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
$function$;