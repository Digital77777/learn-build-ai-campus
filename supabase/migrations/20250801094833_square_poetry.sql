/*
  # Marketplace Schema

  1. New Tables
    - `marketplace_categories` - Product/service categories
    - `marketplace_listings` - All marketplace listings (products, services, jobs)
    - `marketplace_orders` - Order management
    - `marketplace_reviews` - Reviews and ratings
    - `marketplace_messages` - Communication between users
    - `user_profiles` - Extended user profiles for marketplace
    - `marketplace_favorites` - User favorites/bookmarks

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure data access based on user roles

  3. Features
    - Support for products, services, and job listings
    - Order management and payment tracking
    - Review and rating system
    - Messaging system
    - User profiles with seller information
*/

-- Create enum types
CREATE TYPE listing_type AS ENUM ('product', 'service', 'job');
CREATE TYPE listing_status AS ENUM ('draft', 'active', 'paused', 'sold', 'expired');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'refunded');
CREATE TYPE message_status AS ENUM ('sent', 'delivered', 'read');

-- Marketplace categories
CREATE TABLE IF NOT EXISTS marketplace_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon text,
  parent_id uuid REFERENCES marketplace_categories(id),
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User profiles for marketplace
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  full_name text,
  bio text,
  avatar_url text,
  location text,
  website text,
  skills text[],
  is_seller boolean DEFAULT false,
  is_verified boolean DEFAULT false,
  seller_rating numeric(3,2) DEFAULT 0,
  total_sales integer DEFAULT 0,
  total_reviews integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Marketplace listings
CREATE TABLE IF NOT EXISTS marketplace_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id uuid REFERENCES marketplace_categories(id),
  title text NOT NULL,
  description text NOT NULL,
  listing_type listing_type NOT NULL,
  status listing_status DEFAULT 'draft',
  price numeric(10,2),
  currency text DEFAULT 'USD',
  images text[],
  tags text[],
  location text,
  is_remote boolean DEFAULT false,
  delivery_time text,
  requirements text,
  features jsonb,
  metadata jsonb,
  views_count integer DEFAULT 0,
  favorites_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  expires_at timestamptz
);

-- Marketplace orders
CREATE TABLE IF NOT EXISTS marketplace_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid REFERENCES marketplace_listings(id) ON DELETE CASCADE,
  buyer_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  seller_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  status order_status DEFAULT 'pending',
  amount numeric(10,2) NOT NULL,
  currency text DEFAULT 'USD',
  payment_intent_id text,
  delivery_date timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Marketplace reviews
CREATE TABLE IF NOT EXISTS marketplace_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES marketplace_orders(id) ON DELETE CASCADE,
  listing_id uuid REFERENCES marketplace_listings(id) ON DELETE CASCADE,
  reviewer_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  reviewee_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  title text,
  comment text,
  is_public boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Marketplace messages
CREATE TABLE IF NOT EXISTS marketplace_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid REFERENCES marketplace_listings(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  message text NOT NULL,
  status message_status DEFAULT 'sent',
  created_at timestamptz DEFAULT now(),
  read_at timestamptz
);

-- Marketplace favorites
CREATE TABLE IF NOT EXISTS marketplace_favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  listing_id uuid REFERENCES marketplace_listings(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, listing_id)
);

-- Enable RLS
ALTER TABLE marketplace_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_favorites ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Categories (public read, admin write)
CREATE POLICY "Categories are viewable by everyone"
  ON marketplace_categories FOR SELECT
  USING (true);

-- User profiles
CREATE POLICY "Users can view all profiles"
  ON user_profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Listings
CREATE POLICY "Listings are viewable by everyone"
  ON marketplace_listings FOR SELECT
  USING (status = 'active' OR auth.uid() = user_id);

CREATE POLICY "Users can create own listings"
  ON marketplace_listings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own listings"
  ON marketplace_listings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own listings"
  ON marketplace_listings FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Orders
CREATE POLICY "Users can view own orders"
  ON marketplace_orders FOR SELECT
  TO authenticated
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

CREATE POLICY "Users can create orders"
  ON marketplace_orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Users can update own orders"
  ON marketplace_orders FOR UPDATE
  TO authenticated
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

-- Reviews
CREATE POLICY "Reviews are viewable by everyone"
  ON marketplace_reviews FOR SELECT
  USING (is_public = true OR auth.uid() = reviewer_id OR auth.uid() = reviewee_id);

CREATE POLICY "Users can create reviews for their orders"
  ON marketplace_reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Users can update own reviews"
  ON marketplace_reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = reviewer_id);

-- Messages
CREATE POLICY "Users can view own messages"
  ON marketplace_messages FOR SELECT
  TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send messages"
  ON marketplace_messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update own messages"
  ON marketplace_messages FOR UPDATE
  TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

-- Favorites
CREATE POLICY "Users can view own favorites"
  ON marketplace_favorites FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own favorites"
  ON marketplace_favorites FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert default categories
INSERT INTO marketplace_categories (name, slug, description, icon) VALUES
('AI Tools & Software', 'ai-tools', 'AI-powered tools and software applications', 'Code'),
('Prompt Templates', 'prompt-templates', 'Curated prompt collections for AI models', 'FileText'),
('Datasets & Models', 'datasets-models', 'Pre-trained models and quality datasets', 'Database'),
('Courses & Education', 'courses-education', 'Educational content and training materials', 'BookOpen'),
('Consulting Services', 'consulting', 'AI consulting and advisory services', 'Users'),
('Development Services', 'development', 'Custom AI development and integration', 'Code'),
('Design & Creative', 'design-creative', 'AI-generated designs and creative assets', 'Palette'),
('Jobs & Opportunities', 'jobs', 'AI job postings and career opportunities', 'Briefcase');

-- Create indexes for performance
CREATE INDEX idx_marketplace_listings_user_id ON marketplace_listings(user_id);
CREATE INDEX idx_marketplace_listings_category_id ON marketplace_listings(category_id);
CREATE INDEX idx_marketplace_listings_status ON marketplace_listings(status);
CREATE INDEX idx_marketplace_listings_type ON marketplace_listings(listing_type);
CREATE INDEX idx_marketplace_orders_buyer_id ON marketplace_orders(buyer_id);
CREATE INDEX idx_marketplace_orders_seller_id ON marketplace_orders(seller_id);
CREATE INDEX idx_marketplace_reviews_listing_id ON marketplace_reviews(listing_id);
CREATE INDEX idx_marketplace_messages_sender_id ON marketplace_messages(sender_id);
CREATE INDEX idx_marketplace_messages_recipient_id ON marketplace_messages(recipient_id);