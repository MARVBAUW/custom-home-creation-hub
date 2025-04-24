
import React from 'react';

/**
 * Utility to highlight search terms in text for better user experience
 */
export const highlightSearchTerm = (text: string, searchTerm: string): React.ReactNode => {
  if (!searchTerm || searchTerm.trim() === '' || !text) {
    return text;
  }

  const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
  
  return parts.map((part, index) => {
    if (part.toLowerCase() === searchTerm.toLowerCase()) {
      return React.createElement("span", {
        key: index,
        className: "bg-yellow-200 text-gray-900 rounded px-1 font-medium"
      }, part);
    }
    return part;
  });
};

/**
 * Utility to count occurrences of search term in text
 */
export const countSearchMatches = (text: string, searchTerm: string): number => {
  if (!searchTerm || searchTerm.trim() === '' || !text) {
    return 0;
  }
  
  const regex = new RegExp(searchTerm, 'gi');
  const matches = text.match(regex);
  return matches ? matches.length : 0;
};
