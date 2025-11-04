-- Create user_notification_preferences table
CREATE TABLE IF NOT EXISTS public.user_notification_preferences (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL,
  is_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, notification_type)
);

-- Create function to get user notification preferences
CREATE OR REPLACE FUNCTION public.get_user_notification_preferences(p_user_id uuid)
RETURNS TABLE(
  notification_type TEXT,
  is_enabled BOOLEAN
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    prefs.notification_type,
    prefs.is_enabled
  FROM
    public.user_notification_preferences prefs
  WHERE
    prefs.user_id = p_user_id;
END;
$$;
