-- Create the marketplace categories table
CREATE TABLE
  public.marketplace_categories (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT NOT NULL,
    description TEXT,
    feature TEXT,
    icon TEXT,
    category TEXT,
    gradient TEXT
  );

-- Create the featured listings table
CREATE TABLE
  public.featured_listings (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT NOT NULL,
    seller TEXT,
    price TEXT,
    rating FLOAT,
    sales TEXT,
    reviews TEXT,
    type TEXT,
    category TEXT,
    company TEXT,
    salary TEXT,
    location TEXT
  );

-- Create the marketplace stats table
CREATE TABLE
  public.marketplace_stats (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    label TEXT NOT NULL,
    value TEXT NOT NULL,
    icon TEXT
  );

-- Seed the marketplace categories
INSERT INTO
  public.marketplace_categories (
    title,
    description,
    feature,
    icon,
    category,
    gradient
  )
VALUES
  (
    'Sell Your Creations',
    'Monetize your AI tools, templates, courses, and digital products',
    'No listing fees',
    'Store',
    'Products',
    'from-emerald-500 to-teal-500'
  ),
  (
    'Freelance Services',
    'Offer your AI expertise, consulting, and specialized skills to clients',
    'Set your rates',
    'Briefcase',
    'Services',
    'from-blue-500 to-cyan-500'
  ),
  (
    'Post Job Opportunities',
    'Find talented AI professionals and hire for your projects',
    'Verified profiles',
    'Users',
    'Jobs',
    'from-purple-500 to-pink-500'
  ),
  (
    'AI Development',
    'Custom AI solutions, model training, and integration services',
    'Enterprise ready',
    'Code',
    'Development',
    'from-orange-500 to-red-500'
  );

-- Seed the featured listings
INSERT INTO
  public.featured_listings (
    title,
    seller,
    price,
    rating,
    sales,
    type,
    category
  )
VALUES
  (
    'GPT-4 Prompt Templates Pack',
    'AI_Expert_Pro',
    '$29',
    4.9,
    '1.2k',
    'product',
    'Templates'
  );

INSERT INTO
  public.featured_listings (
    title,
    seller,
    price,
    rating,
    reviews,
    type,
    category
  )
VALUES
  (
    'Machine Learning Consulting',
    'DataScience_Guru',
    '$150/hr',
    4.8,
    '89',
    'service',
    'Consulting'
  );

INSERT INTO
  public.featured_listings (
    title,
    company,
    salary,
    location,
    type,
    category
  )
VALUES
  (
    'Senior AI Engineer - Remote',
    'TechInnovate Co.',
    '$120k-180k',
    'Remote',
    'job',
    'Full-time'
  );

-- Seed the marketplace stats
INSERT INTO
  public.marketplace_stats (label, value, icon)
VALUES
  ('Active Sellers', '8,500+', 'Store'),
  ('Total Sales', '$2.8M+', 'DollarSign'),
  ('Jobs Posted', '1,200+', 'Briefcase'),
  ('Success Rate', '94%', 'TrendingUp');
