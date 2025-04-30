
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create a table to log article generation attempts
CREATE TABLE IF NOT EXISTS public.article_generation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  topic TEXT,
  category TEXT,
  article_title TEXT,
  article_slug TEXT,
  error_message TEXT
);

-- Set up the weekly article generation cron job
SELECT cron.schedule(
  'generate-weekly-article',
  '0 3 * * 0', -- At 03:00 on Sunday
  $$
  SELECT
    net.http_post(
      url:='https://usakxozksekpuoukvksj.supabase.co/functions/v1/auto-generate-article',
      headers:='{"Content-Type": "application/json", "Authorization": "Bearer '||(
        SELECT value FROM secrets.decrypted WHERE name = 'SUPABASE_SERVICE_ROLE_KEY'
      )||'"}'::jsonb,
      body:='{}'::jsonb
    ) as request_id;
  $$
);
