-- Fix function search path security warnings
CREATE OR REPLACE FUNCTION public.decrement_topic_replies()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.community_topics
  SET replies_count = GREATEST(0, replies_count - 1),
      last_activity_at = now()
  WHERE id = OLD.topic_id;
  RETURN OLD;
END;
$$;