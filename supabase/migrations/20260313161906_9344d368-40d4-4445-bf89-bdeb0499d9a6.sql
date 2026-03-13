-- Create business_submissions table
CREATE TABLE public.business_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  business_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT NOT NULL,
  description TEXT NOT NULL,
  income_range TEXT NOT NULL,
  services TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.business_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public form)
CREATE POLICY "Anyone can submit business details"
  ON public.business_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users (admin) to read all
CREATE POLICY "Authenticated users can view all submissions"
  ON public.business_submissions
  FOR SELECT
  TO authenticated
  USING (true);