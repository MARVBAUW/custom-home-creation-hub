
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { articles } from '../data/reglementationArticles';

const ArticlesReglementation: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const categories = ['all', ...new Set(articles.map(article => article.category))];
  
  const filteredArticles = articles.filter(article => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Rechercher un article..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'Toutes les catégories' : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <Card key={article.id} className="flex flex-col h-full">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="mb-2">{article.category}</Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  {new Date(article.date).toLocaleDateString('fr-FR')}
                </div>
              </div>
              <CardTitle className="text-lg">{article.title}</CardTitle>
              <CardDescription className="line-clamp-2">{article.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2 mb-4">
                {article.keywords.slice(0, 3).map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link to={`/blog/${article.slug}`} className="w-full">
                <Button variant="outline" className="w-full justify-between group">
                  <span>Lire l'article</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredArticles.length === 0 && (
        <div className="text-center p-8 border border-dashed rounded-md">
          <p className="text-gray-500">Aucun article ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
};

export default ArticlesReglementation;
