
CREATE TABLE public.offer_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  spots_remaining INTEGER NOT NULL DEFAULT 5,
  total_spots INTEGER NOT NULL DEFAULT 10,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.offer_settings TO anon;
GRANT SELECT, UPDATE ON public.offer_settings TO authenticated;
GRANT ALL ON public.offer_settings TO service_role;

ALTER TABLE public.offer_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read offer settings"
ON public.offer_settings FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can update offer settings"
ON public.offer_settings FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

ALTER TABLE public.offer_settings REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.offer_settings;

INSERT INTO public.offer_settings (spots_remaining, total_spots) VALUES (5, 10);
