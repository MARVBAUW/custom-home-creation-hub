
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Clock, ArrowUpRight, FileText, Building, BookOpen, Landmark, HardHat, Ruler, Search, FileWarning, Receipt, Shield } from 'lucide-react';
import Button from '@/components/common/Button';

interface ArticleType {
  id: number;
  title: string;
  description: string;
  content: string;
  date: string;
  category: string;
  source: string;
  readTime: string;
  keywords: string[];
}

interface ArticleCardProps {
  article: ArticleType;
  onArticleClick: (article: ArticleType) => void;
}

// Helper function to get icon for each category
const getCategoryIcon = (category: string) => {
  switch(category) {
    case "réglementation": return <FileText className="h-4 w-4" />;
    case "financement": return <Receipt className="h-4 w-4" />;
    case "diagnostic": return <Search className="h-4 w-4" />;
    case "fiscalité": return <Receipt className="h-4 w-4" />;
    case "urbanisme": return <Building className="h-4 w-4" />;
    case "construction": return <HardHat className="h-4 w-4" />;
    case "sécurité": return <Shield className="h-4 w-4" />;
    case "profession": return <BookOpen className="h-4 w-4" />;
    case "juridique": return <Landmark className="h-4 w-4" />;
    case "environnement": return <Ruler className="h-4 w-4" />;
    case "innovation": return <Ruler className="h-4 w-4" />;
    case "santé": return <FileWarning className="h-4 w-4" />;
    default: return <FileText className="h-4 w-4" />;
  }
};

// Function to translate category names
const translateCategory = (category: string) => {
  const translations = {
    "réglementation": "Réglementation",
    "financement": "Financement",
    "diagnostic": "Diagnostic",
    "fiscalité": "Fiscalité",
    "urbanisme": "Urbanisme",
    "construction": "Construction",
    "sécurité": "Sécurité", 
    "profession": "Profession",
    "juridique": "Juridique",
    "environnement": "Environnement",
    "innovation": "Innovation",
    "santé": "Santé"
  };
  return translations[category] || category;
};

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onArticleClick }) => {
  return (
    <Card key={article.id} className="border-l-4 border-l-khaki-500 border-t border-r border-b border-gray-200 shadow-sm hover:shadow-md transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-center bg-khaki-100 text-khaki-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {getCategoryIcon(article.category)}
            <span className="ml-1">{translateCategory(article.category)}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {article.readTime}
          </div>
        </div>
        <CardTitle className="mt-2 text-xl font-semibold">{article.title}</CardTitle>
        <CardDescription className="mt-1 text-gray-600">{article.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0 pb-2">
        <p className="text-gray-700 text-sm">{article.content.substring(0, 200)}...</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {article.keywords.map((keyword, idx) => (
            <span key={idx} className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
              #{keyword}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2 pb-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {new Date(article.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          <span className="mx-2">•</span>
          <span className="italic">{article.source}</span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-khaki-600 border-khaki-200"
          onClick={() => onArticleClick(article)}
        >
          Lire l'article
          <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
};
