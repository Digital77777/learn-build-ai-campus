-- Create function to handle new marketplace order notification
CREATE OR REPLACE FUNCTION public.handle_new_order_notification()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  is_enabled BOOLEAN;
BEGIN
  -- Check if the user has notifications enabled for new orders
  SELECT is_enabled INTO is_enabled FROM public.user_notification_preferences WHERE user_id = NEW.seller_id AND notification_type = 'new_order';

  -- Notify the seller
  IF (is_enabled IS NULL OR is_enabled = true) THEN
    PERFORM public.create_notification(
      NEW.seller_id,
      'new_order',
      'You have a new order for your listing: ' || (SELECT title FROM public.marketplace_listings WHERE id = NEW.listing_id),
      jsonb_build_object('order_id', NEW.id, 'listing_id', NEW.listing_id)
    );
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger for new marketplace orders
CREATE TRIGGER on_new_order
  AFTER INSERT ON public.marketplace_orders
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_order_notification();

-- Create function to handle new marketplace review notification
CREATE OR REPLACE FUNCTION public.handle_new_review_notification()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  is_enabled BOOLEAN;
BEGIN
  -- Check if the user has notifications enabled for new reviews
  SELECT is_enabled INTO is_enabled FROM public.user_notification_preferences WHERE user_id = NEW.reviewee_id AND notification_type = 'new_review';

  -- Notify the reviewee
  IF (is_enabled IS NULL OR is_enabled = true) THEN
    PERFORM public.create_notification(
      NEW.reviewee_id,
      'new_review',
      'You have a new review for your listing: ' || (SELECT title FROM public.marketplace_listings WHERE id = NEW.listing_id),
      jsonb_build_object('review_id', NEW.id, 'listing_id', NEW.listing_id)
    );
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger for new marketplace reviews
CREATE TRIGGER on_new_review
  AFTER INSERT ON public.marketplace_reviews
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_review_notification();

-- Create function to handle new marketplace message notification
CREATE OR REPLACE FUNCTION public.handle_new_message_notification()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  is_enabled BOOLEAN;
BEGIN
  -- Check if the user has notifications enabled for new messages
  SELECT is_enabled INTO is_enabled FROM public.user_notification_preferences WHERE user_id = NEW.recipient_id AND notification_type = 'new_message';

  -- Notify the recipient
  IF (is_enabled IS NULL OR is_enabled = true) THEN
    PERFORM public.create_notification(
      NEW.recipient_id,
      'new_message',
      'You have a new message from ' || (SELECT username FROM public.user_profiles WHERE user_id = NEW.sender_id),
      jsonb_build_object('message_id', NEW.id, 'listing_id', NEW.listing_id, 'sender_id', NEW.sender_id)
    );
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger for new marketplace messages
CREATE TRIGGER on_new_message
  AFTER INSERT ON public.marketplace_messages
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_message_notification();
