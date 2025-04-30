
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import SEO from '@/components/common/SEO';
import Container from '@/components/common/Container';

interface Article {
  id: string;
  title: string;
  content: string;
  created_at: string;
  meta_description?: string;
  description?: string;
  keywords?: string[];
  category?: string;
  author?: string;
  updated_at?: string;
}

const BlogArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        
        if (!slug) {
          setError('Article non trouvé');
          return;
        }

        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (error) {
          console.error('Error fetching article:', error);
          setError('Article non trouvé');
          return;
        }

        setArticle(data);
      } catch (err) {
        console.error('Error in fetchArticle:', err);
        setError('Une erreur est survenue lors du chargement de l\'article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  // Calculate estimated reading time (average 225 words per minute)
  const getReadingTime = (content: string) => {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 225);
    return `${minutes} min de lecture`;
  };

  if (loading) {
    return (
      <Container>
        <div className="max-w-3xl mx-auto py-10 px-4">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <div className="flex gap-4 mb-8">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-40" />
          </div>
          <Skeleton className="h-64 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        </div>
      </Container>
    );
  }

  if (error || !article) {
    return (
      <Container>
        <div className="max-w-3xl mx-auto py-10 px-4">
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error || 'Article non trouvé'}
            </AlertDescription>
          </Alert>
          <Button onClick={() => navigate('/blog')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au blog
          </Button>
        </div>
      </Container>
    );
  }
  
  return (
    <>
      <SEO
        title={`${article.title} | Progineer Blog`}
        description={article.meta_description || article.description || `Découvrez notre article sur ${article.title}`}
        keywords={article.keywords?.join(', ') || 'maître d\'œuvre, PACA, construction, blog'}
        canonicalUrl={`https://progineer.fr/blog/${slug}`}
      />
      
      <Container>
        <article className="max-w-3xl mx-auto py-10 px-4">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => navigate('/blog')} className="mb-4 -ml-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au blog
            </Button>
            
            {article.category && (
              <Badge className="mb-4">{article.category}</Badge>
            )}
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
            
            <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 mb-6">
              {article.author && (
                <div className="flex items-center mr-4 mb-2">
                  <User className="h-4 w-4 mr-1" />
                  <span>{article.author}</span>
                </div>
              )}
              <div className="flex items-center mr-4 mb-2">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{formatDate(article.created_at)}</span>
              </div>
              <div className="flex items-center mb-2">
                <Clock className="h-4 w-4 mr-1" />
                <span>{getReadingTime(article.content)}</span>
              </div>
            </div>
            
            {article.description && (
              <div className="text-lg text-gray-700 dark:text-gray-300 mb-8 italic border-l-4 pl-4 border-khaki-500 bg-khaki-50 dark:bg-gray-800 p-4 rounded-r-md">
                {article.description}
              </div>
            )}
          </div>
          
          <div 
            className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-khaki-900 dark:prose-headings:text-khaki-100 prose-a:text-khaki-600 dark:prose-a:text-khaki-400 prose-strong:text-khaki-700 dark:prose-strong:text-khaki-300"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          {article.keywords && article.keywords.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {article.keywords.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="text-gray-600 dark:text-gray-400">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </article>
      </Container>
    </>
  );
};

export default BlogArticleDetail;
