
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  meta_description?: string;
  description?: string;
  category?: string;
  keywords?: string[];
  image?: string;
  author?: string;
}

interface BlogArticleCardProps {
  article: Article;
}

const BlogArticleCard: React.FC<BlogArticleCardProps> = ({ article }) => {
  // Format the date
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
    return `${minutes} min`;
  };
  
  // Extract plain text from HTML content
  const getTextFromHtml = (html: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  };
  
  // Create a brief excerpt of the article content
  const getExcerpt = (content: string, maxLength = 100) => {
    const text = getTextFromHtml(content);
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <Link to={`/blog/${article.slug}`} className="flex-1">
        {article.image && (
          <div className="relative w-full pt-[56.25%] overflow-hidden">
            <img 
              src={article.image} 
              alt={article.title} 
              className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
            />
          </div>
        )}
        
        <CardContent className={`flex-1 ${article.image ? 'pt-5' : 'pt-5'}`}>
          {article.category && (
            <Badge className="mb-2">{article.category}</Badge>
          )}
          
          <h2 className="text-xl font-semibold mb-2 hover:text-khaki-600 transition-colors line-clamp-2">
            {article.title}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
            {article.description || getExcerpt(article.content)}
          </p>
        </CardContent>
      </Link>
      
      <CardFooter className="border-t pt-4 text-sm text-gray-500 flex justify-between">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{formatDate(article.created_at)}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          <span>{getReadingTime(article.content)}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogArticleCard;
