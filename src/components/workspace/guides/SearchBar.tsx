
import React from 'react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative mb-8">
      <input
        type="text"
        placeholder="Rechercher un guide ou une ressource..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-khaki-500 focus:border-transparent"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <span className="absolute right-3 top-2.5 text-gray-400">
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery("")}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </span>
    </div>
  );
};
