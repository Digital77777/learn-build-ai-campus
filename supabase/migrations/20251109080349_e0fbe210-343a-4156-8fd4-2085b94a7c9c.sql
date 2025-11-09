-- Create trigger function to notify insight author when someone likes their insight
CREATE OR REPLACE FUNCTION public.notify_insight_like()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  v_insight_author_id UUID;
  v_liker_name TEXT;
BEGIN
  -- Get the insight author's ID
  SELECT user_id INTO v_insight_author_id
  FROM community_insights
  WHERE id = NEW.insight_id;
  
  -- Don't notify if user liked their own insight
  IF v_insight_author_id = NEW.user_id THEN
    RETURN NEW;
  END IF;
  
  -- Get liker's name
  SELECT COALESCE(full_name, email, 'Someone') INTO v_liker_name
  FROM profiles
  WHERE user_id = NEW.user_id;
  
  -- Create notification
  INSERT INTO public.notifications (user_id, type, message, metadata)
  VALUES (
    v_insight_author_id,
    'insight_like',
    v_liker_name || ' liked your insight',
    jsonb_build_object(
      'insight_id', NEW.insight_id,
      'liker_id', NEW.user_id,
      'liker_name', v_liker_name
    )
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger for insight likes
DROP TRIGGER IF EXISTS trigger_notify_insight_like ON insight_likes;
CREATE TRIGGER trigger_notify_insight_like
  AFTER INSERT ON insight_likes
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_insight_like();

-- Create trigger function to notify topic author when someone replies
CREATE OR REPLACE FUNCTION public.notify_topic_reply()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  v_topic_author_id UUID;
  v_replier_name TEXT;
  v_topic_title TEXT;
BEGIN
  -- Get the topic author's ID and title
  SELECT user_id, title INTO v_topic_author_id, v_topic_title
  FROM community_topics
  WHERE id = NEW.topic_id;
  
  -- Don't notify if user replied to their own topic
  IF v_topic_author_id = NEW.user_id THEN
    RETURN NEW;
  END IF;
  
  -- Get replier's name
  SELECT COALESCE(full_name, email, 'Someone') INTO v_replier_name
  FROM profiles
  WHERE user_id = NEW.user_id;
  
  -- Create notification
  INSERT INTO public.notifications (user_id, type, message, metadata)
  VALUES (
    v_topic_author_id,
    'topic_reply',
    v_replier_name || ' replied to your topic: ' || v_topic_title,
    jsonb_build_object(
      'topic_id', NEW.topic_id,
      'reply_id', NEW.id,
      'replier_id', NEW.user_id,
      'replier_name', v_replier_name
    )
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger for topic replies
DROP TRIGGER IF EXISTS trigger_notify_topic_reply ON topic_replies;
CREATE TRIGGER trigger_notify_topic_reply
  AFTER INSERT ON topic_replies
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_topic_reply();

-- Create trigger function to notify message recipient
CREATE OR REPLACE FUNCTION public.notify_new_message()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  v_sender_name TEXT;
BEGIN
  -- Get sender's name
  SELECT COALESCE(full_name, email, 'Someone') INTO v_sender_name
  FROM profiles
  WHERE user_id = NEW.sender_id;
  
  -- Create notification
  INSERT INTO public.notifications (user_id, type, message, metadata)
  VALUES (
    NEW.receiver_id,
    'new_message',
    v_sender_name || ' sent you a message',
    jsonb_build_object(
      'message_id', NEW.id,
      'sender_id', NEW.sender_id,
      'sender_name', v_sender_name
    )
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger for new messages
DROP TRIGGER IF EXISTS trigger_notify_new_message ON messages;
CREATE TRIGGER trigger_notify_new_message
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_message();

-- Create trigger function to notify event host when someone registers
CREATE OR REPLACE FUNCTION public.notify_event_registration()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  v_event_host_id UUID;
  v_attendee_name TEXT;
  v_event_title TEXT;
BEGIN
  -- Get the event host's ID and title
  SELECT user_id, title INTO v_event_host_id, v_event_title
  FROM community_events
  WHERE id = NEW.event_id;
  
  -- Don't notify if host registered for their own event
  IF v_event_host_id = NEW.user_id THEN
    RETURN NEW;
  END IF;
  
  -- Get attendee's name
  SELECT COALESCE(full_name, email, 'Someone') INTO v_attendee_name
  FROM profiles
  WHERE user_id = NEW.user_id;
  
  -- Create notification
  INSERT INTO public.notifications (user_id, type, message, metadata)
  VALUES (
    v_event_host_id,
    'event_registration',
    v_attendee_name || ' registered for your event: ' || v_event_title,
    jsonb_build_object(
      'event_id', NEW.event_id,
      'attendee_id', NEW.user_id,
      'attendee_name', v_attendee_name
    )
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger for event registrations
DROP TRIGGER IF EXISTS trigger_notify_event_registration ON event_attendees;
CREATE TRIGGER trigger_notify_event_registration
  AFTER INSERT ON event_attendees
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_event_registration();