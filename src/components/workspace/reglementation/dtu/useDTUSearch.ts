
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
        
        // Search in title and description
        const basicMatch = 
          dtu.title.toLowerCase().includes(search) ||
          dtu.description.toLowerCase().includes(search);
          
        if (basicMatch) return true;
        
        // Search in rules (title and content)
        const rulesMatch = dtu.rules.some(rule => 
          rule.title.toLowerCase().includes(search) || 
          rule.content.toLowerCase().includes(search)
        );
        
        if (rulesMatch) return true;
        
        // Search in sections (title and content)
        const sectionsMatch = dtu.sections.some(section => 
          section.title.toLowerCase().includes(search) || 
          section.content.toLowerCase().includes(search)
        );
        
        return sectionsMatch;
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
