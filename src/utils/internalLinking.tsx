
import React from 'react';
import { Link } from 'react-router-dom';

// Structure defining keywords and their target URLs
export const keywordMap: Record<string, string> = {
  // Pages principales
  "maître d'œuvre": "/",
  "maître d'œuvre marseille": "/",
  "maître d'œuvre paca": "/",
  "maîtrise d'œuvre": "/",
  "construction sur mesure": "/prestations-maitre-oeuvre/construction-neuve",
  "construction maison": "/prestations-maitre-oeuvre/construction-neuve",
  "maison sur mesure": "/prestations-maitre-oeuvre/construction-neuve",
  "rénovation": "/prestations-maitre-oeuvre/renovation",
  "rénovation énergétique": "/prestations-maitre-oeuvre/renovation",
  "extension": "/prestations-maitre-oeuvre/extension",
  "extension maison": "/prestations-maitre-oeuvre/extension",
  "optimisation d'espace": "/prestations-maitre-oeuvre/optimisation-espace",
  "design d'intérieur": "/prestations-maitre-oeuvre/design-interieur",
  "design d'espace": "/prestations-maitre-oeuvre/design-interieur",
  "aménagement intérieur": "/prestations-maitre-oeuvre/design-interieur",
  "réalisations": "/realisations-architecte-maison",
  "projets": "/realisations-architecte-maison",
  "devis": "/contact",
  "estimation": "/estimation",
  "contact": "/contact",
  
  // Villes PACA
  "marseille": "/",
  "aix-en-provence": "/",
  "toulon": "/",
  "nice": "/",
  "cannes": "/",
  "saint-tropez": "/",
  "fréjus": "/",
  "hyères": "/",
};

// Find keywords in text and replace them with links
export const addKeywordLinks = (text: string, maxOccurrences = 1): React.ReactNode[] => {
  if (!text) return [text];
  
  // Sort keywords by length (descending) to match longer phrases first
  const sortedKeywords = Object.keys(keywordMap).sort((a, b) => b.length - a.length);
  
  let lastIndex = 0;
  const result: React.ReactNode[] = [];
  const occurrenceCount: Record<string, number> = {};
  
  // Initialize the occurrence counter for each keyword
  sortedKeywords.forEach(keyword => {
    occurrenceCount[keyword] = 0;
  });
  
  // Convert text to lowercase for case-insensitive matching
  const lowerText = text.toLowerCase();
  
  // Function to check if we're inside an HTML tag
  const isInsideHtmlTag = (position: number): boolean => {
    const openTagBefore = lowerText.lastIndexOf('<', position);
    const closeTagBefore = lowerText.lastIndexOf('>', position);
    return openTagBefore > closeTagBefore;
  };
  
  // Find all occurrences of all keywords
  const matches: Array<{keyword: string, index: number}> = [];
  
  sortedKeywords.forEach(keyword => {
    let keywordIndex = lowerText.indexOf(keyword.toLowerCase());
    
    while (keywordIndex !== -1) {
      // Check if this occurrence is inside an HTML tag
      if (!isInsideHtmlTag(keywordIndex)) {
        matches.push({
          keyword,
          index: keywordIndex
        });
      }
      
      keywordIndex = lowerText.indexOf(keyword.toLowerCase(), keywordIndex + 1);
    }
  });
  
  // Sort matches by their index in the text
  matches.sort((a, b) => a.index - b.index);
  
  // Process non-overlapping matches
  let lastProcessedIndex = 0;
  
  for (const match of matches) {
    // Skip if we've already processed this part of text
    if (match.index < lastProcessedIndex) continue;
    
    // Skip if we've reached the max occurrences for this keyword
    if (occurrenceCount[match.keyword] >= maxOccurrences) continue;
    
    // Add text before the match
    if (match.index > lastIndex) {
      result.push(text.substring(lastIndex, match.index));
    }
    
    // Add the keyword as a link
    const originalKeyword = text.substring(match.index, match.index + match.keyword.length);
    result.push(
      <Link 
        key={`keyword-${match.index}`} 
        to={keywordMap[match.keyword]} 
        className="text-khaki-600 hover:text-khaki-800 hover:underline"
      >
        {originalKeyword}
      </Link>
    );
    
    // Update trackers
    occurrenceCount[match.keyword]++;
    lastIndex = match.index + match.keyword.length;
    lastProcessedIndex = lastIndex;
  }
  
  // Add any remaining text
  if (lastIndex < text.length) {
    result.push(text.substring(lastIndex));
  }
  
  return result;
};

// Component that applies internal linking to a block of text
interface InternalLinkTextProps {
  text: string;
  className?: string;
  maxOccurrences?: number;
}

export const InternalLinkText: React.FC<InternalLinkTextProps> = ({ 
  text, 
  className = "",
  maxOccurrences = 1
}) => {
  const linkedContent = addKeywordLinks(text, maxOccurrences);
  
  return (
    <span className={className}>
      {linkedContent}
    </span>
  );
};
