
import React from 'react';
import { Link } from 'react-router-dom';

// Structure defining keywords and their target URLs with optional anchors
export const keywordMap: Record<string, string> = {
  // Pages principales avec ancres
  "maître d'œuvre": "/",
  "maître d'œuvre marseille": "/",
  "maître d'œuvre paca": "/",
  "maîtrise d'œuvre": "/",
  "construction sur mesure": "/prestations-maitre-oeuvre/construction-neuve#services",
  "construction maison": "/prestations-maitre-oeuvre/construction-neuve#process",
  "maison sur mesure": "/prestations-maitre-oeuvre/construction-neuve#options",
  "rénovation": "/prestations-maitre-oeuvre/renovation#overview",
  "rénovation énergétique": "/prestations-maitre-oeuvre/renovation#energy",
  "extension": "/prestations-maitre-oeuvre/extension#overview",
  "extension maison": "/prestations-maitre-oeuvre/extension#services",
  "optimisation d'espace": "/prestations-maitre-oeuvre/optimisation-espace#services",
  "design d'intérieur": "/prestations-maitre-oeuvre/design-interieur#overview",
  "design d'espace": "/prestations-maitre-oeuvre/design-interieur#services",
  "aménagement intérieur": "/prestations-maitre-oeuvre/design-interieur#amenagement",
  "réalisations": "/realisations-architecte-maison#gallery",
  "portfolio": "/realisations-architecturales#projects",
  "réalisations architecturales": "/realisations-architecturales#featured",
  "projets": "/realisations-architecte-maison#recent",
  "devis": "/contact#form",
  "estimation": "/estimation#calculator",
  "contact": "/contact#form",

  // Ajouts pour maillage interne spécifique
  "montage administratif": "/prestations-maitre-oeuvre/montage-administratif#process",
  "petit collectif résidentiel": "/prestations-maitre-oeuvre/petit-collectif#overview",
  "petit collectif": "/prestations-maitre-oeuvre/petit-collectif#services",
  "réhabilitation": "/prestations-maitre-oeuvre/rehabilitation#overview",
  "réhabilitation bâtiment": "/prestations-maitre-oeuvre/rehabilitation#services",
  "construction écologique": "/prestations-maitre-oeuvre/construction-ecologique#principles",
  "maison écologique": "/prestations-maitre-oeuvre/construction-ecologique#materials",
  "construction bois": "/prestations-maitre-oeuvre/construction-ecologique#wood",
  "ossature bois": "/prestations-maitre-oeuvre/construction-ecologique#structure",
  "permis de construire": "/prestations-maitre-oeuvre/montage-administratif#permits",
  "déclaration préalable": "/prestations-maitre-oeuvre/montage-administratif#declarations",

  // Villes PACA avec ancres spécifiques
  "marseille": "/#marseille",
  "aix-en-provence": "/#aix",
  "toulon": "/#toulon",
  "nice": "/#nice",
  "cannes": "/#cannes",
  "saint-tropez": "/#saint-tropez",
  "fréjus": "/#frejus",
  "hyères": "/#hyeres",
};

// Fonction améliorée pour gérer les liens avec ancres
export const addKeywordLinks = (text: string, maxOccurrences = 1): React.ReactNode[] => {
  if (!text) return [text];
  
  // Sort keywords by length (descending) to match longer phrases first
  const sortedKeywords = Object.keys(keywordMap).sort((a, b) => b.length - a.length);
  
  let lastIndex = 0;
  const result: React.ReactNode[] = [];
  const occurrenceCount: Record<string, number> = {};
  
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
  
  const matches: Array<{keyword: string, index: number}> = [];
  
  sortedKeywords.forEach(keyword => {
    let keywordIndex = lowerText.indexOf(keyword.toLowerCase());
    
    while (keywordIndex !== -1) {
      if (!isInsideHtmlTag(keywordIndex)) {
        matches.push({
          keyword,
          index: keywordIndex
        });
      }
      keywordIndex = lowerText.indexOf(keyword.toLowerCase(), keywordIndex + 1);
    }
  });
  
  matches.sort((a, b) => a.index - b.index);
  
  let lastProcessedIndex = 0;
  
  for (const match of matches) {
    if (match.index < lastProcessedIndex) continue;
    if (occurrenceCount[match.keyword] >= maxOccurrences) continue;
    
    if (match.index > lastIndex) {
      result.push(text.substring(lastIndex, match.index));
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
            const element = document.getElementById(anchor);
            if (element) {
              element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
              // Mise à jour de l'URL sans rechargement
              window.history.pushState({}, '', targetUrl);
            }
          }
        }}
      >
        {originalKeyword}
      </Link>
    );
    
    occurrenceCount[match.keyword]++;
    lastIndex = match.index + match.keyword.length;
    lastProcessedIndex = lastIndex;
  }
  
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
