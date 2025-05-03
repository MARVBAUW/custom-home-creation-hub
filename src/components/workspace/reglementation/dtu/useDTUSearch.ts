
import { useState, useEffect, useMemo } from 'react';
import { DTU } from './types';

export const useDTUSearch = (dtus: DTU[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Extract unique categories from DTUs
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    uniqueCategories.add('all');
    dtus.forEach(dtu => uniqueCategories.add(dtu.category));
    return Array.from(uniqueCategories);
  }, [dtus]);
  
  // Filter DTUs based on search term and category
  const filteredDTUs = useMemo(() => {
    return dtus.filter(dtu => {
      const matchesSearch = 
        dtu.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        dtu.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || dtu.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [dtus, searchTerm, categoryFilter]);
  
  return {
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    categories,
    filteredDTUs
  };
};
