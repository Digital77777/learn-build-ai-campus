-- Create function to handle new topic reply notification
CREATE OR REPLACE FUNCTION public.handle_new_topic_reply_notification()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  topic_author_id UUID;
  is_enabled BOOLEAN;
BEGIN
  -- Get the author of the topic
  SELECT user_id INTO topic_author_id FROM public.community_topics WHERE id = NEW.topic_id;

  -- Check if the user has notifications enabled for new replies
  SELECT is_enabled INTO is_enabled FROM public.user_notification_preferences WHERE user_id = topic_author_id AND notification_type = 'new_reply';

  -- Notify the topic author
  IF topic_author_id IS NOT NULL AND topic_author_id != NEW.user_id AND (is_enabled IS NULL OR is_enabled = true) THEN
    PERFORM public.create_notification(
      topic_author_id,
      'new_reply',
      'Your topic "' || (SELECT title FROM public.community_topics WHERE id = NEW.topic_id) || '" has a new reply.',
      jsonb_build_object('topic_id', NEW.topic_id, 'reply_id', NEW.id)
    );
  END IF;

  RETURN NEW;
END;
$$;

-- Create trigger for new topic replies
CREATE TRIGGER on_new_topic_reply
  AFTER INSERT ON public.topic_replies
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_topic_reply_notification();

-- Create function to handle new insight like notification
CREATE OR REPLACE FUNCTION public.handle_new_insight_like_notification()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  insight_author_id UUID;
  is_enabled BOOLEAN;
BEGIN
  -- Get the author of the insight
  SELECT user_id INTO insight_author_id FROM public.community_insights WHERE id = NEW.insight_id;

  -- Check if the user has notifications enabled for new likes
  SELECT is_enabled INTO is_enabled FROM public.user_notification_preferences WHERE user_id = insight_author_id AND notification_type = 'new_like';

  -- Notify the insight author
  IF insight_author_id IS NOT NULL AND insight_author_id != NEW.user_id AND (is_enabled IS NULL OR is_enabled = true) THEN
    PERFORM public.create_notification(
      insight_author_id,
      'new_like',
      'Your insight "' || (SELECT title FROM public.community_insights WHERE id = NEW.insight_id) || '" has a new like.',
      jsonb_build_object('insight_id', NEW.insight_id)
    );
  END IF;

  RETURN NEW;
END;
$$;

-- Create trigger for new insight likes
CREATE TRIGGER on_new_insight_like
  AFTER INSERT ON public.insight_likes
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_insight_like_notification();

-- Create function to handle new event notification
CREATE OR REPLACE FUNCTION public.handle_new_event_notification()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  community_member RECORD;
  is_enabled BOOLEAN;
BEGIN
  -- Notify all community members (users who have interacted with the community)
  FOR community_member IN
    SELECT DISTINCT user_id FROM (
      SELECT user_id FROM public.community_topics
      UNION
      SELECT user_id FROM public.topic_replies
      UNION
      SELECT user_id FROM public.insight_likes
    ) AS active_users
    WHERE user_id != NEW.user_id
  LOOP
    -- Check if the user has notifications enabled for new events
    SELECT is_enabled INTO is_enabled FROM public.user_notification_preferences WHERE user_id = community_member.user_id AND notification_type = 'new_event';

    IF (is_enabled IS NULL OR is_enabled = true) THEN
      PERFORM public.create_notification(
        community_member.user_id,
        'new_event',
        'A new event "' || NEW.title || '" has been created in the community.',
        jsonb_build_object('event_id', NEW.id)
      );
    END IF;
  END LOOP;

  RETURN NEW;
END;
$$;

-- Create trigger for new community events
CREATE TRIGGER on_new_community_event
  AFTER INSERT ON public.community_events
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_event_notification();
