-- Phase 1: Critical Security Fixes
-- ================================

-- 1. Create app_role enum for role-based access control
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- 2. Create user_roles table with proper RBAC structure
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role public.app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    created_by UUID REFERENCES auth.users(id),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 4. Migrate existing admin_users data to user_roles
INSERT INTO public.user_roles (user_id, role, created_at)
SELECT 
  user_id, 
  CASE 
    WHEN role = 'super_admin' THEN 'admin'::public.app_role
    WHEN role = 'admin' THEN 'admin'::public.app_role
    WHEN role = 'moderator' THEN 'moderator'::public.app_role
    ELSE 'user'::public.app_role
  END,
  created_at
FROM public.admin_users
WHERE is_active = true
ON CONFLICT (user_id, role) DO NOTHING;

-- 5. Create RLS policies for user_roles table
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 6. Update all existing RLS policies to use has_role() instead of admin_users

-- Drop old admin policies and create new ones using has_role()
DROP POLICY IF EXISTS "Admins can manage all listings" ON public.marketplace_listings;
CREATE POLICY "Admins can manage all listings"
ON public.marketplace_listings
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can manage all subscriptions" ON public.user_subscriptions;
CREATE POLICY "Admins can manage all subscriptions"
ON public.user_subscriptions
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Only admins can manage categories" ON public.marketplace_categories;
CREATE POLICY "Only admins can manage categories"
ON public.marketplace_categories
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can manage all verification tasks" ON public.seller_verification_tasks;
CREATE POLICY "Admins can manage all verification tasks"
ON public.seller_verification_tasks
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Only admins can access error logs" ON public.error_log;
CREATE POLICY "Only admins can access error logs"
ON public.error_log
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admins_can_view_all_profiles" ON public.profiles;
CREATE POLICY "admins_can_view_all_profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admins_can_view_all_seller_profiles" ON public.seller_profiles;
CREATE POLICY "admins_can_view_all_seller_profiles"
ON public.seller_profiles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admins_can_update_seller_profiles" ON public.seller_profiles;
CREATE POLICY "admins_can_update_seller_profiles"
ON public.seller_profiles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Update admin check functions to use has_role
DROP FUNCTION IF EXISTS public.is_current_user_admin();
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin');
$$;

DROP FUNCTION IF EXISTS public.is_admin_email();
CREATE OR REPLACE FUNCTION public.is_admin_email()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin');
$$;

-- 7. Fix Notifications RLS Policies
DROP POLICY IF EXISTS "Deny all access by default" ON public.notifications;

CREATE POLICY "Users can view their own notifications"
ON public.notifications
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
ON public.notifications
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all notifications"
ON public.notifications
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 8. Enable pgcrypto for sensitive data encryption
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 9. Create audit log table for sensitive data access
CREATE TABLE IF NOT EXISTS public.security_audit_log (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id TEXT,
    ip_address INET,
    user_agent TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view audit logs"
ON public.security_audit_log
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 10. Add encrypted columns for sensitive seller data
ALTER TABLE public.seller_profiles 
ADD COLUMN IF NOT EXISTS tax_id_encrypted BYTEA,
ADD COLUMN IF NOT EXISTS payout_method_encrypted BYTEA;

-- Create function to encrypt sensitive seller data
CREATE OR REPLACE FUNCTION public.encrypt_seller_sensitive_data()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    encryption_key TEXT;
BEGIN
    -- Use a secret key from Supabase Vault (you'll need to set this up)
    -- For now, using a placeholder - MUST be replaced with proper key management
    encryption_key := current_setting('app.settings.encryption_key', true);
    
    IF encryption_key IS NULL OR encryption_key = '' THEN
        encryption_key := 'TEMP_KEY_REPLACE_WITH_VAULT_SECRET';
    END IF;

    -- Encrypt tax_id if provided
    IF NEW.tax_id IS NOT NULL AND NEW.tax_id != '' THEN
        NEW.tax_id_encrypted := pgp_sym_encrypt(NEW.tax_id, encryption_key);
        NEW.tax_id := '[ENCRYPTED]';
    END IF;

    -- Encrypt payout_method if provided
    IF NEW.payout_method IS NOT NULL THEN
        NEW.payout_method_encrypted := pgp_sym_encrypt(NEW.payout_method::TEXT, encryption_key);
        NEW.payout_method := '{"status": "encrypted"}'::JSONB;
    END IF;

    RETURN NEW;
END;
$$;

-- Create trigger for seller profile encryption
DROP TRIGGER IF EXISTS encrypt_seller_data_trigger ON public.seller_profiles;
CREATE TRIGGER encrypt_seller_data_trigger
    BEFORE INSERT OR UPDATE ON public.seller_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.encrypt_seller_sensitive_data();

-- 11. Create function to log sensitive data access
CREATE OR REPLACE FUNCTION public.log_sensitive_access(
    p_action TEXT,
    p_table_name TEXT,
    p_record_id TEXT,
    p_metadata JSONB DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.security_audit_log (
        user_id,
        action,
        table_name,
        record_id,
        metadata
    ) VALUES (
        auth.uid(),
        p_action,
        p_table_name,
        p_record_id,
        p_metadata
    );
END;
$$;

-- 12. Update existing admin functions to use new RBAC
DROP FUNCTION IF EXISTS public.add_admin_user(UUID, TEXT);
CREATE OR REPLACE FUNCTION public.add_admin_user(
    p_user_id UUID,
    p_role TEXT DEFAULT 'admin'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_role public.app_role;
    v_role_id UUID;
BEGIN
    -- Only admins can add other admins
    IF NOT public.has_role(auth.uid(), 'admin') THEN
        RAISE EXCEPTION 'Only admins can add admin users';
    END IF;

    -- Convert text role to enum
    v_role := p_role::public.app_role;

    INSERT INTO public.user_roles (user_id, role, created_by)
    VALUES (p_user_id, v_role, auth.uid())
    ON CONFLICT (user_id, role) DO UPDATE
    SET created_by = auth.uid()
    RETURNING id INTO v_role_id;

    -- Log the action
    PERFORM public.log_sensitive_access(
        'add_admin_user',
        'user_roles',
        v_role_id::TEXT,
        jsonb_build_object('target_user_id', p_user_id, 'role', p_role)
    );

    RETURN v_role_id;
END;
$$;

-- 13. Create helper function to check if current user is admin (for UI)
CREATE OR REPLACE FUNCTION public.get_current_user_roles()
RETURNS TABLE(role TEXT)
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT role::TEXT
    FROM public.user_roles
    WHERE user_id = auth.uid();
$$;

-- 14. Add index for performance
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);
CREATE INDEX IF NOT EXISTS idx_security_audit_user_id ON public.security_audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_security_audit_created_at ON public.security_audit_log(created_at DESC);

-- 15. Add comments for documentation
COMMENT ON TABLE public.user_roles IS 'Stores user role assignments for RBAC. Uses security definer functions to prevent RLS recursion.';
COMMENT ON FUNCTION public.has_role IS 'Security definer function to check if a user has a specific role. Used in RLS policies to prevent recursion.';
COMMENT ON TABLE public.security_audit_log IS 'Audit log for tracking access to sensitive data and admin actions.';
COMMENT ON FUNCTION public.encrypt_seller_sensitive_data IS 'Automatically encrypts sensitive seller data (tax_id, payout_method) before storage.';