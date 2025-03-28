
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from 'lucide-react';

interface SearchAndFilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  categories: string[];
}

export const SearchAndFilterBar: React.FC<SearchAndFilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  categories
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Barre de recherche */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
        <Input 
          placeholder="Rechercher un DTU..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {/* Filtre par catégorie */}
      <div className="w-full md:w-1/3">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrer par catégorie" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === 'tous' ? 'Toutes les catégories' : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
