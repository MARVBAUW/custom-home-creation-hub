
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleClear = () => {
    setSearchTerm('');
  };
  
  return (
    <div className={`relative flex-grow transition-all duration-200 ${isFocused ? 'ring-1 ring-khaki-400' : ''}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Rechercher par mots-clés, titre ou contenu..."
        className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-md focus:ring-khaki-500 focus:border-khaki-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {searchTerm && (
        <button 
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
        </button>
      )}
      
      <div className="absolute mt-1 w-full text-xs text-gray-500 pl-3">
        {searchTerm && (
          <span>Recherche par titre, description, contenu et mots-clés</span>
        )}
      </div>
    </div>
  );
};
