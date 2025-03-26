
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, ArrowUpRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ArticleCardProps {
  article: any;
  onArticleClick: (article: any) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onArticleClick }) => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "construction": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      "renovation": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      "urbanisme": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      "energie": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      "fiscalite": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      "securite": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      "immobilier": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
      "financement": "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
      "default": "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    };
    
    return colors[category] || colors["default"];
  };
  
  return (
    <Card className="hover:shadow-md transition-shadow border dark:border-gray-700 dark:bg-gray-800/50">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <Badge className={getCategoryColor(article.category)} variant="outline">
            {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
          </Badge>
          
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <CalendarDays className="h-3.5 w-3.5 mr-1" />
            <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
          </div>
        </div>
        
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100 leading-tight">
          {article.title}
        </CardTitle>
        
        <CardDescription className="text-gray-600 dark:text-gray-300 mt-2">
          {article.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-1 mt-2">
          {article.keywords.slice(0, 3).map((keyword: string, index: number) => (
            <span 
              key={index}
              className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 flex items-center"
            >
              <Tag className="h-3 w-3 mr-1 opacity-70" />
              {keyword}
            </span>
          ))}
          {article.keywords.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
              +{article.keywords.length - 3}
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-between items-center">
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Clock className="h-3.5 w-3.5 mr-1" />
          <span>Lecture: {article.readingTime} min</span>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onArticleClick(article)}
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20"
        >
          Lire l'article
          <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};
