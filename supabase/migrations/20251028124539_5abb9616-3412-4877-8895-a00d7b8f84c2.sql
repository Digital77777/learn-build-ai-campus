-- =====================================================
-- Community Feature Production Readiness Migration
-- =====================================================

-- 1. Create profiles auto-population trigger for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  )
  ON CONFLICT (user_id) DO UPDATE
  SET email = EXCLUDED.email,
      full_name = COALESCE(EXCLUDED.full_name, profiles.full_name);
  RETURN NEW;
END;
$$;

-- Drop existing trigger if it exists and create new one
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. Add foreign key constraints with CASCADE for proper cleanup
ALTER TABLE community_topics
DROP CONSTRAINT IF EXISTS community_topics_user_id_fkey,
ADD CONSTRAINT community_topics_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES profiles(user_id) ON DELETE CASCADE;

ALTER TABLE topic_replies
DROP CONSTRAINT IF EXISTS topic_replies_user_id_fkey,
ADD CONSTRAINT topic_replies_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES profiles(user_id) ON DELETE CASCADE,
DROP CONSTRAINT IF EXISTS topic_replies_topic_id_fkey,
ADD CONSTRAINT topic_replies_topic_id_fkey
  FOREIGN KEY (topic_id) REFERENCES community_topics(id) ON DELETE CASCADE;

ALTER TABLE community_events
DROP CONSTRAINT IF EXISTS community_events_user_id_fkey,
ADD CONSTRAINT community_events_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES profiles(user_id) ON DELETE CASCADE;

ALTER TABLE event_attendees
DROP CONSTRAINT IF EXISTS event_attendees_user_id_fkey,
ADD CONSTRAINT event_attendees_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES profiles(user_id) ON DELETE CASCADE,
DROP CONSTRAINT IF EXISTS event_attendees_event_id_fkey,
ADD CONSTRAINT event_attendees_event_id_fkey
  FOREIGN KEY (event_id) REFERENCES community_events(id) ON DELETE CASCADE;

ALTER TABLE community_insights
DROP CONSTRAINT IF EXISTS community_insights_user_id_fkey,
ADD CONSTRAINT community_insights_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES profiles(user_id) ON DELETE CASCADE;

ALTER TABLE insight_likes
DROP CONSTRAINT IF EXISTS insight_likes_user_id_fkey,
ADD CONSTRAINT insight_likes_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES profiles(user_id) ON DELETE CASCADE,
DROP CONSTRAINT IF EXISTS insight_likes_insight_id_fkey,
ADD CONSTRAINT insight_likes_insight_id_fkey
  FOREIGN KEY (insight_id) REFERENCES community_insights(id) ON DELETE CASCADE;

-- 3. Add performance indexes
CREATE INDEX IF NOT EXISTS idx_community_topics_user_id ON community_topics(user_id);
CREATE INDEX IF NOT EXISTS idx_community_topics_created_at ON community_topics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_community_topics_last_activity ON community_topics(last_activity_at DESC);

CREATE INDEX IF NOT EXISTS idx_topic_replies_topic_id ON topic_replies(topic_id);
CREATE INDEX IF NOT EXISTS idx_topic_replies_user_id ON topic_replies(user_id);
CREATE INDEX IF NOT EXISTS idx_topic_replies_created_at ON topic_replies(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_community_events_user_id ON community_events(user_id);
CREATE INDEX IF NOT EXISTS idx_community_events_date ON community_events(event_date, event_time);
CREATE INDEX IF NOT EXISTS idx_community_events_status ON community_events(status);

CREATE INDEX IF NOT EXISTS idx_event_attendees_event_id ON event_attendees(event_id);
CREATE INDEX IF NOT EXISTS idx_event_attendees_user_id ON event_attendees(user_id);

CREATE INDEX IF NOT EXISTS idx_community_insights_user_id ON community_insights(user_id);
CREATE INDEX IF NOT EXISTS idx_community_insights_category ON community_insights(category);
CREATE INDEX IF NOT EXISTS idx_community_insights_published ON community_insights(is_published, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_insight_likes_insight_id ON insight_likes(insight_id);
CREATE INDEX IF NOT EXISTS idx_insight_likes_user_id ON insight_likes(user_id);

-- 4. Add unique constraint to prevent duplicate likes and registrations
ALTER TABLE insight_likes
DROP CONSTRAINT IF EXISTS insight_likes_user_insight_unique,
ADD CONSTRAINT insight_likes_user_insight_unique UNIQUE (user_id, insight_id);

ALTER TABLE event_attendees
DROP CONSTRAINT IF EXISTS event_attendees_user_event_unique,
ADD CONSTRAINT event_attendees_user_event_unique UNIQUE (user_id, event_id);

-- 5. Ensure updated_at triggers exist for all tables
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS update_community_topics_updated_at ON community_topics;
CREATE TRIGGER update_community_topics_updated_at
  BEFORE UPDATE ON community_topics
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS update_topic_replies_updated_at ON topic_replies;
CREATE TRIGGER update_topic_replies_updated_at
  BEFORE UPDATE ON topic_replies
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS update_community_events_updated_at ON community_events;
CREATE TRIGGER update_community_events_updated_at
  BEFORE UPDATE ON community_events
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS update_community_insights_updated_at ON community_insights;
CREATE TRIGGER update_community_insights_updated_at
  BEFORE UPDATE ON community_insights
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 6. Ensure reply count trigger exists
DROP TRIGGER IF EXISTS increment_topic_replies_trigger ON topic_replies;
CREATE TRIGGER increment_topic_replies_trigger
  AFTER INSERT ON topic_replies
  FOR EACH ROW EXECUTE FUNCTION public.increment_topic_replies();

DROP TRIGGER IF EXISTS decrement_topic_replies_trigger ON topic_replies;
CREATE OR REPLACE FUNCTION public.decrement_topic_replies()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.community_topics
  SET replies_count = GREATEST(0, replies_count - 1),
      last_activity_at = now()
  WHERE id = OLD.topic_id;
  RETURN OLD;
END;
$$;

CREATE TRIGGER decrement_topic_replies_trigger
  AFTER DELETE ON topic_replies
  FOR EACH ROW EXECUTE FUNCTION public.decrement_topic_replies();

-- 7. Ensure event attendees count triggers exist
DROP TRIGGER IF EXISTS update_event_attendees_count_insert ON event_attendees;
DROP TRIGGER IF EXISTS update_event_attendees_count_delete ON event_attendees;

CREATE TRIGGER update_event_attendees_count_insert
  AFTER INSERT ON event_attendees
  FOR EACH ROW EXECUTE FUNCTION public.update_event_attendees_count();

CREATE TRIGGER update_event_attendees_count_delete
  AFTER DELETE ON event_attendees
  FOR EACH ROW EXECUTE FUNCTION public.update_event_attendees_count();

-- 8. Ensure insight likes count triggers exist
DROP TRIGGER IF EXISTS update_insight_likes_count_insert ON insight_likes;
DROP TRIGGER IF EXISTS update_insight_likes_count_delete ON insight_likes;

CREATE TRIGGER update_insight_likes_count_insert
  AFTER INSERT ON insight_likes
  FOR EACH ROW EXECUTE FUNCTION public.update_insight_likes_count();

CREATE TRIGGER update_insight_likes_count_delete
  AFTER DELETE ON insight_likes
  FOR EACH ROW EXECUTE FUNCTION public.update_insight_likes_count();

-- 9. Add content length validation
ALTER TABLE community_topics
ADD CONSTRAINT community_topics_title_length CHECK (char_length(title) >= 5 AND char_length(title) <= 200),
ADD CONSTRAINT community_topics_content_length CHECK (char_length(content) >= 10 AND char_length(content) <= 10000);

ALTER TABLE topic_replies
ADD CONSTRAINT topic_replies_content_length CHECK (char_length(content) >= 1 AND char_length(content) <= 5000);

ALTER TABLE community_events
ADD CONSTRAINT community_events_title_length CHECK (char_length(title) >= 5 AND char_length(title) <= 200),
ADD CONSTRAINT community_events_description_length CHECK (char_length(description) >= 10 AND char_length(description) <= 5000);

ALTER TABLE community_insights
ADD CONSTRAINT community_insights_title_length CHECK (char_length(title) >= 5 AND char_length(title) <= 200),
ADD CONSTRAINT community_insights_content_length CHECK (char_length(content) >= 50 AND char_length(content) <= 50000);