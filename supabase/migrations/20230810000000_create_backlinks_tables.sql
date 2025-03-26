
-- Create backlinks table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.backlinks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_article_id UUID NOT NULL,
  target_article_id UUID NOT NULL,
  relevance_score FLOAT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT unique_backlink UNIQUE (source_article_id, target_article_id)
);

-- Create articles table if it doesn't exist (for demo)
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  slug TEXT NOT NULL UNIQUE,
  keywords TEXT[],
  author_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create backlinks_logs table to track generation history
CREATE TABLE IF NOT EXISTS public.backlinks_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL CHECK (status IN ('success', 'error', 'warning')),
  message TEXT,
  backlinks_generated INTEGER DEFAULT 0,
  new_backlinks INTEGER DEFAULT 0,
  updated_backlinks INTEGER DEFAULT 0
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_backlinks_source ON public.backlinks (source_article_id);
CREATE INDEX IF NOT EXISTS idx_backlinks_target ON public.backlinks (target_article_id);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles (slug);
CREATE INDEX IF NOT EXISTS idx_backlinks_logs_status ON public.backlinks_logs (status);
