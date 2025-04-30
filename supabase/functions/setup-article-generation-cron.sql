
-- Function to set up the cron job for article generation
CREATE OR REPLACE FUNCTION setup_article_generation_cron()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result jsonb;
BEGIN
  -- Check if pg_cron extension exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_extension WHERE extname = 'pg_cron'
  ) THEN
    RETURN jsonb_build_object('success', false, 'message', 'pg_cron extension is not available');
  END IF;
  
  -- Check if the job already exists and drop it if so
  PERFORM cron.unschedule('generate-weekly-article');
  
  -- Schedule a job to run every week on Sunday at 3 AM
  SELECT cron.schedule(
    'generate-weekly-article',
    '0 3 * * 0', -- cron expression: At 03:00 on Sunday
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
  ) INTO result;
  
  RETURN jsonb_build_object('success', true, 'message', 'Article generation scheduled for every Sunday at 3 AM');
END;
$$;
