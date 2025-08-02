-- Fix remaining functions with search_path security issues

CREATE OR REPLACE FUNCTION public.update_required_document_types(p_seller_profile_id bigint, p_document_types jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
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
SET search_path = ''
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
SET search_path = ''
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
SET search_path = ''
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
SET search_path = ''
AS $function$
BEGIN
    INSERT INTO public.error_log (error_message, error_context)
    VALUES (p_error_message, p_error_context);
END;
$function$;

CREATE OR REPLACE FUNCTION public.raise_application_error(p_error_code integer, p_error_message text)
RETURNS void
LANGUAGE plpgsql
SET search_path = ''
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
SET search_path = ''
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