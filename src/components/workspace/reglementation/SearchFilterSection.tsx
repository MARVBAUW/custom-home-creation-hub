
import React from 'react';
import { SearchBar } from './SearchBar';
import { CategoryFilter } from './CategoryFilter';

interface SearchFilterSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categories: string[];
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
}

export const SearchFilterSection: React.FC<SearchFilterSectionProps> = ({
  searchTerm,
  setSearchTerm,
  categories,
  categoryFilter,
  setCategoryFilter
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <CategoryFilter 
        categories={categories} 
        categoryFilter={categoryFilter} 
        setCategoryFilter={setCategoryFilter} 
      />
    </div>
  );
};
