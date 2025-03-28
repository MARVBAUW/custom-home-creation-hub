
import { useState, useEffect } from 'react';
import { articles } from '../data/reglementationArticles';

export const useReglementation = () => {
  const [page, setPage] = useState<number>(1);
  const [articlesList, setArticlesList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("tous");
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [nextScheduledUpdate, setNextScheduledUpdate] = useState<string>("");
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [isArticleOpen, setIsArticleOpen] = useState<boolean>(false);
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
  
  // List of unique categories
  const categories = ["tous", ...Array.from(new Set(articlesList.map(article => article.category)))];
  
  // Handle article click
  const handleArticleClick = (article: any) => {
    setSelectedArticle(article);
    setIsArticleOpen(true);
  };

  // Close article detail view
  const handleCloseArticle = () => {
    setIsArticleOpen(false);
  };

  return {
    page,
    setPage,
    filteredArticles,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    lastUpdate,
    nextScheduledUpdate,
    selectedArticle,
    isArticleOpen,
    handleArticleClick,
    handleCloseArticle,
    categories,
    itemsPerPage
  };
};
