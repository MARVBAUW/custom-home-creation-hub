
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useParams, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Clock, ChevronLeft, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import SEO from '@/components/common/SEO';
import BlogArticleCard from './BlogArticleCard';

const BlogArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<any | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch article data
  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'published')
          .single();
        
        if (error) {
          throw new Error("Article non trouvé ou inaccessible");
        }
        
        setArticle(data);
        
        // Fetch related articles after article is loaded
        if (data) {
          fetchRelatedArticles(data.category, data.id);
        }
        
      } catch (err) {
        console.error("Error fetching article:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticle();
  }, [slug]);

  // Fetch related articles
  const fetchRelatedArticles = async (category: string, currentArticleId: string) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .eq('category', category)
        .neq('id', currentArticleId)
        .order('created_at', { ascending: false })
        .limit(3);
        
      if (error) {
        throw error;
      }
      
      setRelatedArticles(data || []);
    } catch (err) {
      console.error("Error fetching related articles:", err);
    }
  };

  // Handle share button
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description,
        url: window.location.href,
      }).catch((err) => {
        console.error("Error sharing:", err);
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Lien copié dans le presse-papier");
    }
  };

  // Calculate reading time (rough estimate)
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const textLength = content ? content.split(/\s+/).length : 0;
    const readingTime = Math.ceil(textLength / wordsPerMinute);
    return readingTime > 0 ? readingTime : 1;
  };

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 w-3/4 bg-gray-200 rounded mb-6"></div>
          <div className="h-4 w-1/4 bg-gray-200 rounded mb-12"></div>
          <div className="h-64 w-full bg-gray-200 rounded-lg mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          {error || "Article non trouvé"}
        </h1>
        <p className="text-gray-600 mb-6">
          L'article que vous recherchez n'existe pas ou n'est pas disponible.
        </p>
        <Button asChild>
          <Link to="/blog">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Retour au blog
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${article.title} | Progineer Blog`}
        description={article.meta_description || article.description || `${article.title} - Blog Progineer, expert en maîtrise d'œuvre dans la région PACA.`}
        keywords={article.keywords ? article.keywords.join(', ') : "maître d'œuvre, PACA, construction"}
        canonicalUrl={`https://progineer.fr/blog/${article.slug}`}
      />
      
      <div className="bg-gray-50 py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <Link 
              to="/blog"
              className="inline-flex items-center text-khaki-700 hover:text-khaki-900 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Retour au blog
            </Link>
          </div>
          
          <div className="mb-8">
            {article.category && (
              <Badge className="mb-4 bg-khaki-600">
                {article.category}
              </Badge>
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center text-gray-600 gap-4">
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2" />
                <span>
                  {format(new Date(article.created_at), 'dd MMMM yyyy', { locale: fr })}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>
                  {calculateReadingTime(article.content)} min de lecture
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-auto"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Partager
              </Button>
            </div>
          </div>
          
          {article.image && (
            <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
              <img 
                src={article.image}
                alt={article.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          
          <article className="prose prose-khaki max-w-none">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </article>
        </div>
      </div>
      
      {/* Related articles section */}
      {relatedArticles.length > 0 && (
        <div className="container max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Articles similaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <BlogArticleCard 
                key={relatedArticle.id} 
                article={relatedArticle} 
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BlogArticleDetail;
