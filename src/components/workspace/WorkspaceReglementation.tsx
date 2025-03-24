
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileCheck, Clock, Calendar, ArrowUpRight, Bell, FileText, Bookmark, Building, BookOpen, Landmark, HardHat, Home, Ruler, Search, FileWarning, Receipt, Shield } from 'lucide-react';
import Button from '@/components/common/Button';
import SEO from '@/components/common/SEO';
import WorkspaceArticleDetail from './WorkspaceArticleDetail';
import { articles } from './data/reglementationArticles';
import { CategoryFilter } from './reglementation/CategoryFilter';
import { ArticleCard } from './reglementation/ArticleCard';
import { SearchBar } from './reglementation/SearchBar';
import { LastUpdateInfo } from './reglementation/LastUpdateInfo';

const WorkspaceReglementation = () => {
  const [page, setPage] = useState(1);
  const [articlesList, setArticlesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("tous");
  const [lastUpdate, setLastUpdate] = useState("");
  const [nextScheduledUpdate, setNextScheduledUpdate] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isArticleOpen, setIsArticleOpen] = useState(false);
  const itemsPerPage = 5;
  
  useEffect(() => {
    // Simulation of AI updating articles
    const now = new Date();
    
    // Format for last update
    const formatLastUpdate = new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(now);
    
    // Calculate next update (next weekday: Monday, Wednesday, Friday)
    const daysToAdd = [1, 3, 5]; // Monday, Wednesday, Friday (0 = Sunday, 1 = Monday, etc.)
    const currentDay = now.getDay();
    
    let nextUpdateDay = daysToAdd.find(day => day > currentDay);
    if (!nextUpdateDay) nextUpdateDay = daysToAdd[0] + 7; // If past Friday, go to next Monday
    
    const daysUntilNext = nextUpdateDay - currentDay;
    const nextUpdate = new Date(now);
    nextUpdate.setDate(now.getDate() + (daysUntilNext <= 0 ? daysUntilNext + 7 : daysUntilNext));
    nextUpdate.setHours(8, 0, 0, 0); // 8 AM
    
    const formatNextUpdate = new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(nextUpdate);
    
    setArticlesList(articles);
    setFilteredArticles(articles);
    setLastUpdate(formatLastUpdate);
    setNextScheduledUpdate(formatNextUpdate);
  }, []);
  
  // Filter articles
  useEffect(() => {
    let result = [...articlesList];
    
    // Filter by category
    if (categoryFilter !== "tous") {
      result = result.filter(article => article.category === categoryFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(
        article => 
          article.title.toLowerCase().includes(search) || 
          article.description.toLowerCase().includes(search) ||
          article.content.toLowerCase().includes(search) ||
          article.keywords.some(keyword => keyword.toLowerCase().includes(search))
      );
    }
    
    setFilteredArticles(result);
    setPage(1); // Reset to first page after filtering
  }, [searchTerm, categoryFilter, articlesList]);
  
  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = filteredArticles.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  
  // List of unique categories
  const categories = ["tous", ...Array.from(new Set(articlesList.map(article => article.category)))];
  
  // Handle article click
  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setIsArticleOpen(true);
  };

  // Close article detail view
  const handleCloseArticle = () => {
    setIsArticleOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* SEO Enhancement */}
      <SEO 
        title="Veille réglementaire construction et immobilier | PACA | Progineer"
        description="Actualités et veille juridique pour les professionnels de la construction, architectes et maîtres d'œuvre. Nouvelles lois, règlements et normes du secteur de l'immobilier en PACA."
        keywords="veille réglementaire construction, actualité immobilier, nouvelles normes bâtiment, réglementation architecte, RE2020, loi climat résilience, DPE, PACA, Marseille"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Veille réglementaire de Progineer",
          "description": "Articles de veille juridique et réglementaire pour les professionnels de la construction et de l'immobilier en PACA",
          "publisher": {
            "@type": "Organization",
            "name": "Progineer",
            "logo": {
              "@type": "ImageObject",
              "url": "https://progineer.fr/images/progineer-logo.png"
            }
          },
          "blogPost": articles.slice(0, 5).map(article => ({
            "@type": "BlogPosting",
            "headline": article.title,
            "description": article.description,
            "datePublished": article.date,
            "author": {
              "@type": "Organization",
              "name": "Progineer"
            },
            "keywords": article.keywords.join(", ")
          }))
        }}
      />

      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Veille réglementaire</h1>
        <p className="text-gray-600">L'actualité juridique et réglementaire du secteur de la construction et de l'immobilier, mise à jour régulièrement par notre intelligence artificielle spécialisée.</p>
      </div>
      
      <LastUpdateInfo lastUpdate={lastUpdate} nextScheduledUpdate={nextScheduledUpdate} />
      
      {/* Filters and search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CategoryFilter categories={categories} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} />
      </div>
      
      {filteredArticles.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <Search className="h-10 w-10 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-700">Aucun résultat trouvé</h3>
          <p className="text-gray-500 mt-1">Essayez de modifier vos critères de recherche</p>
        </div>
      ) : (
        <div className="space-y-6">
          {paginatedArticles.map((article) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onArticleClick={handleArticleClick} 
            />
          ))}
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink 
                  onClick={() => setPage(i + 1)}
                  isActive={page === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className={page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      
      {/* Article Detail Dialog */}
      {selectedArticle && (
        <WorkspaceArticleDetail 
          article={selectedArticle}
          isOpen={isArticleOpen}
          onClose={handleCloseArticle}
        />
      )}
    </div>
  );
};

export default WorkspaceReglementation;
