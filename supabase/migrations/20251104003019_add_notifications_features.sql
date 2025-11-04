-- Add is_read and read_at columns to notifications table
ALTER TABLE public.notifications
ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS read_at TIMESTAMETZ;

-- Create function to get notifications for a user
CREATE OR REPLACE FUNCTION public.get_notifications(p_user_id uuid)
RETURNS TABLE(
  id BIGINT,
  user_id uuid,
  type TEXT,
  message TEXT,
  metadata JSONB,
  is_read BOOLEAN,
  read_at TIMESTAMETZ,
  created_at TIMESTAMETZ
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    n.id,
    n.user_id,
    n.type,
    n.message,
    n.metadata,
    n.is_read,
    n.read_at,
    n.created_at
  FROM
    public.notifications n
  WHERE
    n.user_id = p_user_id
  ORDER BY
    n.created_at DESC;
END;
$$;
