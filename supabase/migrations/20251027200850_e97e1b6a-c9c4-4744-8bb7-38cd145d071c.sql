-- Update profiles RLS to allow public read access for community features
DROP POLICY IF EXISTS "Deny public access to profiles" ON profiles;

CREATE POLICY "Public can view basic profile info"
ON profiles FOR SELECT
USING (true);