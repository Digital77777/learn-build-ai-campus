-- Drop the old constraint
ALTER TABLE public.notifications DROP CONSTRAINT IF EXISTS notifications_type_check;

-- Add updated constraint with all valid notification types
ALTER TABLE public.notifications ADD CONSTRAINT notifications_type_check 
CHECK (type = ANY (ARRAY[
  'seller_status',
  'document_review', 
  'system',
  'messages',
  'new_message',
  'new_order',
  'new_review',
  'new_reply',
  'new_like',
  'new_event',
  'community_new_message',
  'insight_like',
  'topic_reply',
  'event_registration'
]));