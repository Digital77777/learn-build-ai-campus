-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  metadata JSONB,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create function to create a notification
CREATE OR REPLACE FUNCTION public.create_notification(p_user_id uuid, p_type text, p_message text, p_metadata jsonb DEFAULT NULL::jsonb)
RETURNS bigint
LANGUAGE plpgsql
AS $$
DECLARE
    v_notification_id BIGINT;
BEGIN
    INSERT INTO public.notifications (
        user_id,
        type,
        message,
        metadata
    ) VALUES (
        p_user_id,
        p_type,
        p_message,
        p_metadata
    ) RETURNING id INTO v_notification_id;

    RETURN v_notification_id;
END;
$$;
