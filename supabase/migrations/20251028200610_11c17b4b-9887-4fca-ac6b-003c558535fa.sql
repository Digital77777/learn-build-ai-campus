
-- Function to update insight likes count
CREATE OR REPLACE FUNCTION update_insight_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE community_insights
    SET likes_count = likes_count + 1
    WHERE id = NEW.insight_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE community_insights
    SET likes_count = GREATEST(likes_count - 1, 0)
    WHERE id = OLD.insight_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for insert
CREATE TRIGGER insight_likes_insert_trigger
AFTER INSERT ON insight_likes
FOR EACH ROW
EXECUTE FUNCTION update_insight_likes_count();

-- Create trigger for delete
CREATE TRIGGER insight_likes_delete_trigger
AFTER DELETE ON insight_likes
FOR EACH ROW
EXECUTE FUNCTION update_insight_likes_count();
