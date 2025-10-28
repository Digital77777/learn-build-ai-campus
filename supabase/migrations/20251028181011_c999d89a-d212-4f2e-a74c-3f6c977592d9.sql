-- Add LinkedIn-style fields to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS avatar_url text,
ADD COLUMN IF NOT EXISTS headline text,
ADD COLUMN IF NOT EXISTS bio text,
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS website text,
ADD COLUMN IF NOT EXISTS skills text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS linkedin_url text,
ADD COLUMN IF NOT EXISTS github_url text,
ADD COLUMN IF NOT EXISTS twitter_url text;

-- Add comment to table
COMMENT ON TABLE public.profiles IS 'User profiles with LinkedIn-style information';