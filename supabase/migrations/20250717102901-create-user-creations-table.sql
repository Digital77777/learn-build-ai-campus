-- Create the user creations table
CREATE TABLE
  public.user_creations (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID REFERENCES auth.users (id),
    title TEXT NOT NULL,
    description TEXT,
    price FLOAT,
    file_path TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW ()
  );

-- Create a bucket for user creations
INSERT INTO
  storage.buckets (id, name, public)
VALUES
  ('creations', 'creations', true);
