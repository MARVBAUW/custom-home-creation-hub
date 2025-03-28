
import { useState, useMemo } from 'react';
import { DTU } from './types';

export const useDTUSearch = (dtuRecaps: DTU[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('tous');
  
  // Unique categories
  const categories = useMemo(() => {
    return ['tous', ...Array.from(new Set(dtuRecaps.map(dtu => dtu.category)))];
  }, [dtuRecaps]);
  
  // Filtered DTUs
  const filteredDTUs = useMemo(() => {
    return dtuRecaps.filter(dtu => {
      // Filter by category
      if (categoryFilter !== 'tous' && dtu.category !== categoryFilter) {
        return false;
      }
      
      // Filter by search term
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        return (
          dtu.title.toLowerCase().includes(search) ||
          dtu.description.toLowerCase().includes(search)
        );
      }
      
      return true;
    });
  }, [dtuRecaps, searchTerm, categoryFilter]);

  return {
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    categories,
    filteredDTUs
  };
};
