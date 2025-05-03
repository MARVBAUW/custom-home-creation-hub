
import React from 'react';

interface HighlighterProps {
  text: string;
  highlight: string;
}

export const Highlighter: React.FC<HighlighterProps> = ({ text, highlight }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  
  const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return (
    <span>
      {parts.map((part, i) => (
        regex.test(part) ? 
          <mark key={i} className="bg-yellow-200 px-0.5 rounded-sm">{part}</mark> : 
          <span key={i}>{part}</span>
      ))}
    </span>
  );
};
