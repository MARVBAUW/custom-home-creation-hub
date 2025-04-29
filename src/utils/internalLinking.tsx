
import React from 'react';
import { Link } from 'react-router-dom';

// Structure defining keywords and their target URLs with optional anchors
export const keywordMap: Record<string, string> = {
  // Pages principales 
  "maître d'œuvre": "/",
  "maîtrise d'œuvre": "/prestations-maitre-oeuvre",
  
  // Services principaux - limités aux termes les plus pertinents
  "construction sur mesure": "/prestations-maitre-oeuvre/construction-neuve",
  "rénovation": "/prestations-maitre-oeuvre/renovation",
  "extension maison": "/prestations-maitre-oeuvre/extension",
  "optimisation d'espace": "/prestations-maitre-oeuvre/optimisation-espace",
  "design d'intérieur": "/prestations-maitre-oeuvre/design-interieur",
  
  // Pages portfolio et contact avec ancres spécifiques
  "réalisations": "/realisations-architecte-maison",
  "contact": "/contact#form",
  "estimation": "/estimation#calculator",
  
  // Prestations spécifiques sans duplication
  "montage administratif": "/prestations-maitre-oeuvre/montage-administratif",
  "petit collectif": "/prestations-maitre-oeuvre/petit-collectif",
  "réhabilitation": "/prestations-maitre-oeuvre/rehabilitation",
  "construction écologique": "/prestations-maitre-oeuvre/construction-ecologique",
  "permis de construire": "/prestations-maitre-oeuvre/montage-administratif#permits",
  
  // Principales villes PACA - réduites aux plus importantes
  "marseille": "/#marseille",
  "aix-en-provence": "/#aix",
  "toulon": "/#toulon",
  "nice": "/#nice",
  "cannes": "/#cannes",
  
  // Combinaisons métier + ville limitées aux plus pertinentes
  "construction maison marseille": "/prestations-maitre-oeuvre/construction-neuve#marseille",
  "rénovation marseille": "/prestations-maitre-oeuvre/renovation#marseille",
  "extension maison marseille": "/prestations-maitre-oeuvre/extension#marseille",
};

// Amélioré pour être plus sélectif et éviter la suroptimisation
export const addKeywordLinks = (text: string, maxOccurrences = 1): React.ReactNode[] => {
  if (!text) return [text];
  
  // Sort keywords by length (descending) to match longer phrases first
  const sortedKeywords = Object.keys(keywordMap).sort((a, b) => b.length - a.length);
  
  let lastIndex = 0;
  const result: React.ReactNode[] = [];
  const occurrenceCount: Record<string, number> = {};
  
  // Initialize occurrence counter
  sortedKeywords.forEach(keyword => {
    occurrenceCount[keyword] = 0;
  });
  
  const lowerText = text.toLowerCase();
  
  // Function to check if we're inside an HTML tag
  const isInsideHtmlTag = (position: number): boolean => {
    const openTagBefore = lowerText.lastIndexOf('<', position);
    const closeTagBefore = lowerText.lastIndexOf('>', position);
    return openTagBefore > closeTagBefore;
  };
  
  // Function to check if we're inside another link already
  const isInsideLink = (position: number): boolean => {
    const openLinkBefore = lowerText.lastIndexOf('<a', position);
    if (openLinkBefore === -1) return false;
    
    const closeLinkBefore = lowerText.lastIndexOf('</a>', position);
    return openLinkBefore > closeLinkBefore;
  };
  
  // Function to check if the keyword is a standalone word
  // This helps prevent linking parts of longer words
  const isStandaloneWord = (position: number, keywordLength: number): boolean => {
    const prevChar = position > 0 ? lowerText[position - 1] : ' ';
    const nextChar = position + keywordLength < lowerText.length ? lowerText[position + keywordLength] : ' ';
    
    const wordBoundaryChars = [' ', '.', ',', ';', ':', '!', '?', '\n', '\r', '\t', '(', ')', '[', ']', '{', '}'];
    
    return wordBoundaryChars.includes(prevChar) && wordBoundaryChars.includes(nextChar);
  };

  // Collect all valid matches first to avoid overlapping links
  const matches: Array<{keyword: string, index: number}> = [];
  
  sortedKeywords.forEach(keyword => {
    const keywordLower = keyword.toLowerCase();
    let keywordIndex = lowerText.indexOf(keywordLower);
    
    while (keywordIndex !== -1 && occurrenceCount[keyword] < maxOccurrences) {
      if (!isInsideHtmlTag(keywordIndex) && 
          !isInsideLink(keywordIndex) && 
          isStandaloneWord(keywordIndex, keywordLower.length)) {
        
        // Check if this keyword overlaps with any existing matches
        const overlaps = matches.some(match => 
          (keywordIndex >= match.index && keywordIndex < match.index + match.keyword.length) ||
          (match.index >= keywordIndex && match.index < keywordIndex + keywordLower.length)
        );
        
        if (!overlaps) {
          matches.push({
            keyword,
            index: keywordIndex
          });
          occurrenceCount[keyword]++;
        }
      }
      keywordIndex = lowerText.indexOf(keywordLower, keywordIndex + 1);
    }
  });
  
  // Sort matches by index to process them in order
  matches.sort((a, b) => a.index - b.index);
  
  // Process matches to build result
  let lastProcessedIndex = 0;
  
  for (const match of matches) {
    if (match.index > lastProcessedIndex) {
      result.push(text.substring(lastProcessedIndex, match.index));
    }
    
    const originalKeyword = text.substring(match.index, match.index + match.keyword.length);
    const targetUrl = keywordMap[match.keyword];
    
    // Diviser l'URL et l'ancre
    const [baseUrl, anchor] = targetUrl.split('#');
    
    result.push(
      <Link 
        key={`keyword-${match.index}`} 
        to={targetUrl}
        className="text-khaki-600 hover:text-khaki-800 hover:underline"
        onClick={(e) => {
          if (anchor) {
            e.preventDefault();
            setTimeout(() => {
              const element = document.getElementById(anchor);
              if (element) {
                element.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
                window.history.pushState({}, '', targetUrl);
              } else {
                window.location.href = targetUrl;
              }
            }, 100);
          }
        }}
      >
        {originalKeyword}
      </Link>
    );
    
    lastProcessedIndex = match.index + match.keyword.length;
  }
  
  if (lastProcessedIndex < text.length) {
    result.push(text.substring(lastProcessedIndex));
  }
  
  return result;
};

// Component that applies internal linking to a block of text with improved density control
interface InternalLinkTextProps {
  text: string;
  className?: string;
  maxOccurrences?: number;
  density?: 'low' | 'medium' | 'high';
}

export const InternalLinkText: React.FC<InternalLinkTextProps> = ({ 
  text, 
  className = "",
  maxOccurrences = 1,
  density = 'medium'
}) => {
  // Adjust maxOccurrences based on density preference
  const actualMaxOccurrences = density === 'low' ? 1 : (density === 'medium' ? 2 : 3);
  const finalMaxOccurrences = Math.min(maxOccurrences, actualMaxOccurrences);
  
  const linkedContent = addKeywordLinks(text, finalMaxOccurrences);
  
  return (
    <span className={className}>
      {linkedContent}
    </span>
  );
};
