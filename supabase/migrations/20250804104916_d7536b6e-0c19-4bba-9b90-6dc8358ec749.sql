-- Add missing columns to marketplace_listings table for full functionality
ALTER TABLE marketplace_listings 
ADD COLUMN IF NOT EXISTS videos text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS creation_link text;