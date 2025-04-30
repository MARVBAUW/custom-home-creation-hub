
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { CalendarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface BlogArticleCardProps {
  article: {
    id: string;
    title: string;
    slug: string;
    description?: string;
    category?: string;
    created_at: string;
    image?: string;
    is_ai_generated?: boolean;
  };
}

const BlogArticleCard: React.FC<BlogArticleCardProps> = ({ article }) => {
  const publishDate = new Date(article.created_at);
  const timeAgo = formatDistanceToNow(publishDate, { addSuffix: true, locale: fr });
  
  // Default image if none provided
  const imageUrl = article.image || '/images/default-article-image.jpg';
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={article.title} 
          className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
        />
        {article.category && (
          <Badge className="absolute top-4 right-4 bg-khaki-600">
            {article.category}
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <Link to={`/blog/${article.slug}`} className="group">
          <h3 className="text-xl font-semibold group-hover:text-khaki-700 transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-gray-600 line-clamp-3 mb-4">
          {article.description || "Découvrez cet article complet sur la maîtrise d'œuvre et la construction en région PACA."}
        </p>
        <div className="flex items-center text-sm text-gray-500">
          <CalendarIcon className="h-4 w-4 mr-2" />
          <span>{timeAgo}</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Link 
          to={`/blog/${article.slug}`}
          className="text-khaki-700 font-medium hover:text-khaki-900 transition-colors flex items-center"
        >
          Lire l'article
          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogArticleCard;
