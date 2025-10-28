-- Create a function to get user contributions count
CREATE OR REPLACE FUNCTION public.get_user_contributions(p_user_id UUID)
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT COUNT(*) FROM community_topics WHERE user_id = p_user_id) +
    (SELECT COUNT(*) FROM topic_replies WHERE user_id = p_user_id) +
    (SELECT COUNT(*) FROM community_insights WHERE user_id = p_user_id),
    0
  )::INTEGER;
$$;

-- Create a view for active members with their contributions
CREATE OR REPLACE VIEW public.active_members AS
SELECT 
  p.user_id,
  p.full_name,
  p.email,
  COALESCE(get_user_contributions(p.user_id), 0) as contributions,
  CASE WHEN get_user_contributions(p.user_id) >= 10 THEN true ELSE false END as is_top_contributor,
  p.created_at as joined_at
FROM profiles p
WHERE p.user_id IS NOT NULL
ORDER BY contributions DESC;

-- Grant access to authenticated users
GRANT SELECT ON public.active_members TO authenticated;