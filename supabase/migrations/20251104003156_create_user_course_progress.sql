-- Create user_course_progress table
CREATE TABLE IF NOT EXISTS public.user_course_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  module_id BIGINT NOT NULL REFERENCES public.course_modules(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id, module_id)
);

-- Create function to check for course completion and create notification
CREATE OR REPLACE FUNCTION public.handle_course_completion()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  total_modules INT;
  completed_modules INT;
  is_enabled BOOLEAN;
BEGIN
  -- Get the total number of modules for the course
  SELECT
    COUNT(*)
  INTO
    total_modules
  FROM
    public.course_modules
  WHERE
    course_id = NEW.course_id;

  -- Get the number of completed modules for the user and course
  SELECT
    COUNT(*)
  INTO
    completed_modules
  FROM
    public.user_course_progress
  WHERE
    user_id = NEW.user_id
    AND course_id = NEW.course_id
    AND is_completed = true;

  -- If all modules are completed, create a notification
  IF total_modules = completed_modules THEN
    -- Check if the user has notifications enabled for course completions
    SELECT is_enabled INTO is_enabled FROM public.user_notification_preferences WHERE user_id = NEW.user_id AND notification_type = 'course_completion';

    IF (is_enabled IS NULL OR is_enabled = true) THEN
      PERFORM public.create_notification(
        NEW.user_id,
        'course_completion',
        'Congratulations! You have completed the course ' || NEW.course_id,
        jsonb_build_object('course_id', NEW.course_id)
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- Create trigger to call handle_course_completion
CREATE TRIGGER on_course_progress_change
  AFTER INSERT OR UPDATE ON public.user_course_progress
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_course_completion();
