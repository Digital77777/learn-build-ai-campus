-- Enable Row Level Security on the is_admin table
ALTER TABLE public.is_admin ENABLE ROW LEVEL SECURITY;

-- Create policy to restrict access to admin information
-- Only allow authenticated users who are themselves admins to view admin data
CREATE POLICY "Only admins can view admin information" 
ON public.is_admin 
FOR SELECT 
USING (
  auth.uid() IN (
    SELECT user_id 
    FROM public.admin_users 
    WHERE is_active = true
  )
);

-- Prevent any insert/update/delete operations on is_admin table through RLS
-- This table should only be managed through secure functions
CREATE POLICY "Prevent direct modifications to admin data" 
ON public.is_admin 
FOR ALL 
USING (false) 
WITH CHECK (false);