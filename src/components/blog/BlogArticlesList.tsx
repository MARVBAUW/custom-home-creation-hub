
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import BlogArticleCard from './BlogArticleCard';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface BlogArticlesListProps {
  category?: string;
  featured?: boolean;
  limit?: number;
  showPagination?: boolean;
  showFilters?: boolean;
}

const BlogArticlesList: React.FC<BlogArticlesListProps> = ({ 
  category,
  featured = false,
  limit = 9,
  showPagination = true,
  showFilters = true
}) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(category || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const itemsPerPage = limit;

  // Fetch articles with pagination
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      
      try {
        // Build query
        let query = supabase
          .from('articles')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false });
        
        // Apply category filter if specified
        if (selectedCategory && selectedCategory !== 'all') {
          query = query.eq('category', selectedCategory);
        }
        
        // Apply search filter if specified
        if (searchQuery) {
          query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
        }
        
        // Get total count for pagination
        const { count, error: countError } = await query.count();
        
        if (countError) {
          throw countError;
        }
        
        setTotalPages(Math.ceil((count || 0) / itemsPerPage));
        
        // Get paginated results
        const from = (currentPage - 1) * itemsPerPage;
        const to = from + itemsPerPage - 1;
        
        const { data, error } = await query
          .range(from, to);
        
        if (error) {
          throw error;
        }
        
        setArticles(data || []);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, [currentPage, selectedCategory, searchQuery, itemsPerPage, featured]);

  // Fetch available categories for filter
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('category')
          .eq('status', 'published');
          
        if (error) {
          throw error;
        }
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(article => article.category).filter(Boolean))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    
    if (showFilters) {
      fetchCategories();
    }
  }, [showFilters]);

  // Handle category change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1); // Reset to first page when changing category
  };

  // Handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div className="space-y-8">
      {/* Filters */}
      {showFilters && (
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full md:w-1/3">
            <Label htmlFor="category-filter">Catégorie</Label>
            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger id="category-filter">
                <SelectValue placeholder="Toutes les catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <form onSubmit={handleSearch} className="w-full md:w-2/3 flex gap-2">
            <div className="flex-grow">
              <Label htmlFor="search">Rechercher</Label>
              <Input
                id="search"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" className="self-end">
              Rechercher
            </Button>
          </form>
        </div>
      )}
      
      {/* Articles Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-khaki-700" />
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700">Aucun article trouvé</h3>
          <p className="text-gray-500 mt-2">
            {searchQuery 
              ? `Aucun résultat pour "${searchQuery}"` 
              : "Aucun article disponible pour le moment"}
          </p>
          {(searchQuery || selectedCategory !== 'all') && (
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Réinitialiser les filtres
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <BlogArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
      
      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {/* Generate page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              let pageNum;
              
              // Logic for showing relevant page numbers
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
                if (i === 4) pageNum = totalPages;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
                if (i === 0) pageNum = 1;
                if (i === 4) pageNum = totalPages;
              }
              
              return (
                <PaginationItem key={i}>
                  {(i === 1 && pageNum > 2) || (i === 3 && pageNum < totalPages - 1) ? (
                    <PaginationLink>...</PaginationLink>
                  ) : (
                    <PaginationLink
                      isActive={currentPage === pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </PaginationLink>
                  )}
                </PaginationItem>
              );
            })}
            
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default BlogArticlesList;
