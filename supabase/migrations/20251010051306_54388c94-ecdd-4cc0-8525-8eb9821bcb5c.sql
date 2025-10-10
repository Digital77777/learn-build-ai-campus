-- Grant admin role to digitalintelligencemarketplace@gmail.com
-- This allows them to switch tiers without payment

DO $$
DECLARE
  admin_user_id UUID;
BEGIN
  -- Get the user_id for the admin email
  SELECT id INTO admin_user_id
  FROM auth.users
  WHERE email = 'digitalintelligencemarketplace@gmail.com'
  LIMIT 1;

  -- Only insert if user exists
  IF admin_user_id IS NOT NULL THEN
    -- Insert admin role (will be ignored if already exists due to unique constraint)
    INSERT INTO public.user_roles (user_id, role)
    VALUES (admin_user_id, 'admin'::public.app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
    
    RAISE NOTICE 'Admin role granted to digitalintelligencemarketplace@gmail.com';
  ELSE
    RAISE NOTICE 'User with email digitalintelligencemarketplace@gmail.com not found. They need to sign up first.';
  END IF;
END $$;