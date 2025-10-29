-- Create user_connections table for managing connection requests
CREATE TABLE public.user_connections (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  requester_id uuid NOT NULL,
  recipient_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'accepted', 'ignored')),
  CONSTRAINT different_users CHECK (requester_id != recipient_id),
  UNIQUE (requester_id, recipient_id)
);

-- Enable RLS
ALTER TABLE public.user_connections ENABLE ROW LEVEL SECURITY;

-- Users can view connections where they are involved
CREATE POLICY "Users can view their own connections"
ON public.user_connections
FOR SELECT
USING (auth.uid() = requester_id OR auth.uid() = recipient_id);

-- Users can create connection requests
CREATE POLICY "Users can create connection requests"
ON public.user_connections
FOR INSERT
WITH CHECK (auth.uid() = requester_id);

-- Recipients can update connection status
CREATE POLICY "Recipients can update connection status"
ON public.user_connections
FOR UPDATE
USING (auth.uid() = recipient_id);

-- Users can delete their own connection requests
CREATE POLICY "Users can delete their own connections"
ON public.user_connections
FOR DELETE
USING (auth.uid() = requester_id OR auth.uid() = recipient_id);

-- Create index for faster lookups
CREATE INDEX idx_user_connections_requester ON public.user_connections(requester_id);
CREATE INDEX idx_user_connections_recipient ON public.user_connections(recipient_id);
CREATE INDEX idx_user_connections_status ON public.user_connections(status);

-- Trigger for updated_at
CREATE TRIGGER update_user_connections_updated_at
BEFORE UPDATE ON public.user_connections
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();