
import React from 'react';

export const highlightSearchTerm = (text: string, searchTerm: string): React.ReactNode => {
  if (!searchTerm || searchTerm.trim() === '') {
    return text;
  }

  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, i) => 
    regex.test(part) ? <mark key={i} className="bg-yellow-200 px-0.5 rounded">{part}</mark> : part
  );
};
