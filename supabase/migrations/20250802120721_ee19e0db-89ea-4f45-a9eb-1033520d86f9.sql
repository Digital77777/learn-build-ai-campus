-- Phase 1: Critical Database Security Fixes

-- 1. Enable RLS on error_log table with admin-only access
ALTER TABLE public.error_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can access error logs"
ON public.error_log
FOR ALL
USING (auth.uid() IN (SELECT user_id FROM public.admin_users WHERE is_active = true));

-- 2. Create missing marketplace tables with proper RLS policies

-- Marketplace categories table
CREATE TABLE public.marketplace_categories (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.marketplace_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are publicly readable"
ON public.marketplace_categories
FOR SELECT
USING (is_active = true);

CREATE POLICY "Only admins can manage categories"
ON public.marketplace_categories
FOR ALL
USING (auth.uid() IN (SELECT user_id FROM public.admin_users WHERE is_active = true))
WITH CHECK (auth.uid() IN (SELECT user_id FROM public.admin_users WHERE is_active = true));

-- Marketplace listings table
CREATE TABLE public.marketplace_listings (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.marketplace_categories(id),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    listing_type TEXT NOT NULL CHECK (listing_type IN ('product', 'service', 'job', 'ai_development')),
    price DECIMAL(10,2),
    currency TEXT DEFAULT 'USD',
    images TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    is_featured BOOLEAN DEFAULT false,
    delivery_time INTEGER, -- in days
    requirements TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'sold', 'suspended')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.marketplace_listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view active listings"
ON public.marketplace_listings
FOR SELECT
USING (status = 'active');

CREATE POLICY "Users can manage their own listings"
ON public.marketplace_listings
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all listings"
ON public.marketplace_listings
FOR ALL
USING (auth.uid() IN (SELECT user_id FROM public.admin_users WHERE is_active = true))
WITH CHECK (auth.uid() IN (SELECT user_id FROM public.admin_users WHERE is_active = true));

-- Marketplace favorites table
CREATE TABLE public.marketplace_favorites (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    listing_id UUID NOT NULL REFERENCES public.marketplace_listings(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(user_id, listing_id)
);

ALTER TABLE public.marketplace_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own favorites"
ON public.marketplace_favorites
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Add indexes for performance
CREATE INDEX idx_marketplace_listings_user_id ON public.marketplace_listings(user_id);
CREATE INDEX idx_marketplace_listings_category_id ON public.marketplace_listings(category_id);
CREATE INDEX idx_marketplace_listings_status ON public.marketplace_listings(status);
CREATE INDEX idx_marketplace_listings_listing_type ON public.marketplace_listings(listing_type);
CREATE INDEX idx_marketplace_favorites_user_id ON public.marketplace_favorites(user_id);
CREATE INDEX idx_marketplace_favorites_listing_id ON public.marketplace_favorites(listing_id);

-- Add triggers for updated_at timestamps
CREATE TRIGGER update_marketplace_categories_updated_at
    BEFORE UPDATE ON public.marketplace_categories
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_marketplace_listings_updated_at
    BEFORE UPDATE ON public.marketplace_listings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default categories
INSERT INTO public.marketplace_categories (name, description, icon) VALUES
('AI Tools', 'AI-powered tools and applications', 'Bot'),
('Digital Products', 'Digital downloads and software', 'Download'),
('Freelance Services', 'Professional services and consulting', 'Users'),
('AI Development', 'Custom AI development projects', 'Code'),
('Online Courses', 'Educational content and training', 'GraduationCap');