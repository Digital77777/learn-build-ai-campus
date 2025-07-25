-- Create the user listings table
CREATE TABLE
  public.user_listings (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID REFERENCES auth.users (id),
    title TEXT NOT NULL,
    description TEXT,
    price FLOAT,
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW ()
  );
