-- Create community topics table
CREATE TABLE public.community_topics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  views INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT false,
  is_locked BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create community events table
CREATE TABLE public.community_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  max_attendees INTEGER,
  cover_image TEXT,
  meeting_link TEXT,
  location TEXT,
  is_online BOOLEAN DEFAULT true,
  status TEXT NOT NULL DEFAULT 'upcoming',
  attendees_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create event attendees table
CREATE TABLE public.event_attendees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.community_events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'registered',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Create community insights table
CREATE TABLE public.community_insights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  cover_image TEXT,
  read_time TEXT,
  likes_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create insight likes table
CREATE TABLE public.insight_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  insight_id UUID NOT NULL REFERENCES public.community_insights(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(insight_id, user_id)
);

-- Create topic replies table
CREATE TABLE public.topic_replies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id UUID NOT NULL REFERENCES public.community_topics(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.community_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insight_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_replies ENABLE ROW LEVEL SECURITY;

-- Policies for community_topics
CREATE POLICY "Anyone can view published topics"
  ON public.community_topics FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create topics"
  ON public.community_topics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own topics"
  ON public.community_topics FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own topics"
  ON public.community_topics FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for community_events
CREATE POLICY "Anyone can view events"
  ON public.community_events FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create events"
  ON public.community_events FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own events"
  ON public.community_events FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own events"
  ON public.community_events FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for event_attendees
CREATE POLICY "Anyone can view attendees"
  ON public.event_attendees FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can register for events"
  ON public.event_attendees FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own registration"
  ON public.event_attendees FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can cancel their own registration"
  ON public.event_attendees FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for community_insights
CREATE POLICY "Anyone can view published insights"
  ON public.community_insights FOR SELECT
  USING (is_published = true);

CREATE POLICY "Authenticated users can create insights"
  ON public.community_insights FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own insights"
  ON public.community_insights FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own insights"
  ON public.community_insights FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for insight_likes
CREATE POLICY "Anyone can view likes"
  ON public.insight_likes FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can like insights"
  ON public.insight_likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike insights"
  ON public.insight_likes FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for topic_replies
CREATE POLICY "Anyone can view replies"
  ON public.topic_replies FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can reply to topics"
  ON public.topic_replies FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own replies"
  ON public.topic_replies FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own replies"
  ON public.topic_replies FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_community_topics_updated_at
  BEFORE UPDATE ON public.community_topics
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_community_events_updated_at
  BEFORE UPDATE ON public.community_events
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_community_insights_updated_at
  BEFORE UPDATE ON public.community_insights
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_topic_replies_updated_at
  BEFORE UPDATE ON public.topic_replies
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create function to increment replies count
CREATE OR REPLACE FUNCTION public.increment_topic_replies()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.community_topics
  SET replies_count = replies_count + 1,
      last_activity_at = now()
  WHERE id = NEW.topic_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_topic_replies_trigger
  AFTER INSERT ON public.topic_replies
  FOR EACH ROW
  EXECUTE FUNCTION public.increment_topic_replies();

-- Create function to increment attendees count
CREATE OR REPLACE FUNCTION public.update_event_attendees_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.community_events
    SET attendees_count = attendees_count + 1
    WHERE id = NEW.event_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.community_events
    SET attendees_count = attendees_count - 1
    WHERE id = OLD.event_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_event_attendees_count_trigger
  AFTER INSERT OR DELETE ON public.event_attendees
  FOR EACH ROW
  EXECUTE FUNCTION public.update_event_attendees_count();

-- Create function to update insight likes count
CREATE OR REPLACE FUNCTION public.update_insight_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.community_insights
    SET likes_count = likes_count + 1
    WHERE id = NEW.insight_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.community_insights
    SET likes_count = likes_count - 1
    WHERE id = OLD.insight_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_insight_likes_count_trigger
  AFTER INSERT OR DELETE ON public.insight_likes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_insight_likes_count();