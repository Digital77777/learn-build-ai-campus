-- Create subscription tiers table
CREATE TABLE public.subscription_tiers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  display_name text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'ZAR',
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  max_tools_access integer,
  max_listings integer,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create user subscriptions table
CREATE TABLE public.user_subscriptions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tier_id uuid NOT NULL REFERENCES public.subscription_tiers(id),
  status text NOT NULL DEFAULT 'active',
  started_at timestamp with time zone NOT NULL DEFAULT now(),
  expires_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.subscription_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscription_tiers (everyone can view active tiers)
CREATE POLICY "Anyone can view active tiers"
ON public.subscription_tiers
FOR SELECT
USING (is_active = true);

-- RLS Policies for user_subscriptions
CREATE POLICY "Users can view their own subscription"
ON public.user_subscriptions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscription"
ON public.user_subscriptions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription"
ON public.user_subscriptions
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all subscriptions"
ON public.user_subscriptions
FOR ALL
USING (
  auth.uid() IN (
    SELECT user_id FROM admin_users WHERE is_active = true
  )
);

-- Insert default tiers
INSERT INTO public.subscription_tiers (name, display_name, price, currency, features, max_tools_access, max_listings) VALUES
('starter', 'Starter', 0, 'ZAR', 
  '["Access to basic AI tools", "1 marketplace listing", "Community support", "Basic learning paths"]'::jsonb, 
  2, 1),
('creator', 'Creator', 95, 'ZAR', 
  '["Access to all AI tools", "10 marketplace listings", "Priority support", "Advanced learning paths", "Creator badge"]'::jsonb, 
  10, 10),
('career', 'Career', 250, 'ZAR', 
  '["Unlimited AI tool access", "Unlimited marketplace listings", "Premium support", "All learning paths", "Career certification", "Personal AI tutor", "Job placement assistance"]'::jsonb, 
  999, 999);

-- Function to check if user is admin email
CREATE OR REPLACE FUNCTION public.is_admin_email()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM auth.users
    WHERE id = auth.uid()
    AND email = 'digitalintelligencemarketplace@gmail.com'
  )
$$;

-- Function to get user's current tier
CREATE OR REPLACE FUNCTION public.get_user_tier(user_id_param uuid)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT tier_id
  FROM public.user_subscriptions
  WHERE user_id = user_id_param
  AND status = 'active'
  LIMIT 1
$$;

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION public.update_subscription_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_subscriptions_updated_at
BEFORE UPDATE ON public.user_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_subscription_updated_at();

CREATE TRIGGER update_subscription_tiers_updated_at
BEFORE UPDATE ON public.subscription_tiers
FOR EACH ROW
EXECUTE FUNCTION public.update_subscription_updated_at();