
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ChevronDown, Search } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import BlogArticleCard from './BlogArticleCard';

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

interface BlogArticlesListProps {
  showPagination?: boolean;
  showFilters?: boolean;
  limit?: number;
  category?: string;
  featured?: boolean;
}

const BlogArticlesList: React.FC<BlogArticlesListProps> = ({ 
  showPagination = false, 
  showFilters = false, 
  limit = 10,
  category,
  featured = false
}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(category || null);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');

  const articlesPerPage = limit;

  // Fetch articles from Supabase
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      
      // Calculate offset for pagination
      const offset = (currentPage - 1) * articlesPerPage;
      
      try {
        // First get the count
        const countQuery = supabase
          .from('articles')
          .select('id', { count: 'exact' })
          .eq('status', 'published');
          
        if (selectedCategory) {
          countQuery.eq('category', selectedCategory);
        }
        
        if (searchQuery) {
          countQuery.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
        }

        const { count, error: countError } = await countQuery;
        
        if (countError) throw countError;
        setTotalCount(count || 0);
        
        // Then get the actual articles
        let query = supabase
          .from('articles')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false })
          .range(offset, offset + articlesPerPage - 1);
          
        if (selectedCategory) {
          query = query.eq('category', selectedCategory);
        }
        
        if (searchQuery) {
          query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
        }

        const { data, error } = await query;
        
        if (error) throw error;
        
        setArticles(data || []);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage, articlesPerPage, selectedCategory, searchQuery]);

  // Fetch unique categories for filter
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('category')
          .not('category', 'is', null)
          .eq('status', 'published');
          
        if (error) throw error;
        
        // Extract unique categories
        const categories = [...new Set(data.map(item => item.category))];
        setUniqueCategories(categories as string[]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    if (showFilters) {
      fetchCategories();
    }
  }, [showFilters]);

  const totalPages = Math.ceil(totalCount / articlesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category || null);
    setCurrentPage(1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    if (value === 'all') {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(value);
    }
    
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-4">
            <div className="space-y-3">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-20 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Aucun article disponible pour le moment
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Revenez prochainement pour découvrir nos nouveaux contenus.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {showFilters && (
        <div className="space-y-6">
          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">Rechercher</Button>
          </form>

          {/* Category tabs */}
          {uniqueCategories.length > 0 && (
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <div className="border-b mb-4">
                <TabsList className="h-auto p-0 bg-transparent">
                  <TabsTrigger 
                    value="all" 
                    className={`px-4 py-2 rounded-t-md data-[state=active]:border-b-2 data-[state=active]:border-khaki-600 data-[state=active]:text-khaki-800 data-[state=active]:shadow-none data-[state=active]:bg-transparent`}
                  >
                    Tous
                  </TabsTrigger>
                  {uniqueCategories.map((cat, index) => (
                    <TabsTrigger 
                      key={index} 
                      value={cat}
                      className={`px-4 py-2 rounded-t-md data-[state=active]:border-b-2 data-[state=active]:border-khaki-600 data-[state=active]:text-khaki-800 data-[state=active]:shadow-none data-[state=active]:bg-transparent`}
                    >
                      {cat}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </Tabs>
          )}
        </div>
      )}
      
      {/* Articles grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <BlogArticleCard key={article.id} article={article} />
        ))}
      </div>
      
      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              // Show first 2 pages, current page, and last 2 pages
              if (
                page <= 2 ||
                page > totalPages - 2 ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              
              // Show ellipsis for skipped pages
              if (page === 3 && currentPage > 4) {
                return <PaginationItem key="ellipsis-1">...</PaginationItem>;
              }
              
              if (page === totalPages - 2 && currentPage < totalPages - 3) {
                return <PaginationItem key="ellipsis-2">...</PaginationItem>;
              }
              
              return null;
            })}
            
            <PaginationItem>
              <PaginationNext
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default BlogArticlesList;
