
import React from 'react';
import { Link } from 'react-router-dom';

// Structure defining keywords and their target URLs with optional anchors
export const keywordMap: Record<string, string> = {
  // Pages principales avec ancres
  "maître d'œuvre": "/",
  "maître d'œuvre marseille": "/#marseille",
  "maître d'œuvre paca": "/#paca",
  "maîtrise d'œuvre": "/",
  
  // Services principaux
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
  
  // Pages portfolio et contact
  "réalisations": "/realisations-architecte-maison#gallery",
  "portfolio": "/realisations-architecturales#projects",
  "réalisations architecturales": "/realisations-architecturales#featured",
  "projets": "/realisations-architecte-maison#recent",
  "devis": "/contact#form",
  "estimation": "/estimation#calculator",
  "contact": "/contact#form",

  // Prestations spécifiques
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

  // Villes PACA principales
  "marseille": "/#marseille",
  "aix-en-provence": "/#aix",
  "toulon": "/#toulon",
  "nice": "/#nice",
  "cannes": "/#cannes",
  "saint-tropez": "/#saint-tropez",
  "fréjus": "/#frejus",
  "hyères": "/#hyeres",
  
  // Quartiers de Marseille
  "marseille centre": "/#marseille-centre",
  "vieux port": "/#vieux-port",
  "prado": "/#prado",
  "castellane": "/#castellane",
  "joliette": "/#joliette",
  "saint-charles": "/#saint-charles",
  
  // Villes PACA additionnelles
  "antibes": "/#antibes",
  "cagnes-sur-mer": "/#cagnes-sur-mer",
  "draguignan": "/#draguignan",
  "la ciotat": "/#la-ciotat",
  "menton": "/#menton",
  "aubagne": "/#aubagne",
  "salon-de-provence": "/#salon",
  "istres": "/#istres",
  "mandelieu": "/#mandelieu",
  "cassis": "/#cassis",
  "bandol": "/#bandol",
  "six-fours": "/#six-fours",
  "la seyne sur mer": "/#la-seyne-sur-mer",
  "martigues": "/#martigues",
  
  // Combinaisons métier + ville
  "construction maison marseille": "/prestations-maitre-oeuvre/construction-neuve#marseille",
  "rénovation marseille": "/prestations-maitre-oeuvre/renovation#marseille",
  "extension maison marseille": "/prestations-maitre-oeuvre/extension#marseille",
  "rénovation appartement marseille": "/prestations-maitre-oeuvre/renovation#marseille-appartement",
  "design intérieur marseille": "/prestations-maitre-oeuvre/design-interieur#marseille",
  
  "construction maison aix": "/prestations-maitre-oeuvre/construction-neuve#aix",
  "rénovation aix": "/prestations-maitre-oeuvre/renovation#aix",
  "extension maison aix": "/prestations-maitre-oeuvre/extension#aix",
  "rénovation appartement aix": "/prestations-maitre-oeuvre/renovation#aix-appartement",
  
  "construction maison toulon": "/prestations-maitre-oeuvre/construction-neuve#toulon",
  "rénovation toulon": "/prestations-maitre-oeuvre/renovation#toulon",
  "extension maison toulon": "/prestations-maitre-oeuvre/extension#toulon",
  
  "construction maison nice": "/prestations-maitre-oeuvre/construction-neuve#nice",
  "rénovation nice": "/prestations-maitre-oeuvre/renovation#nice",
  "extension maison nice": "/prestations-maitre-oeuvre/extension#nice",
  
  "construction maison cannes": "/prestations-maitre-oeuvre/construction-neuve#cannes",
  "rénovation cannes": "/prestations-maitre-oeuvre/renovation#cannes",
  "extension maison cannes": "/prestations-maitre-oeuvre/extension#cannes",
  
  // Types de bâtiments
  "maison individuelle": "/prestations-maitre-oeuvre/construction-neuve#maison-individuelle",
  "appartement": "/prestations-maitre-oeuvre/renovation#appartement",
  "villa": "/prestations-maitre-oeuvre/construction-neuve#villa",
  "loft": "/prestations-maitre-oeuvre/design-interieur#loft",
  "local commercial": "/prestations-maitre-oeuvre/rehabilitation#commercial",
  "bureau": "/prestations-maitre-oeuvre/rehabilitation#bureau",
  
  // Termes techniques du bâtiment
  "isolation thermique": "/prestations-maitre-oeuvre/renovation#isolation",
  "pompe à chaleur": "/prestations-maitre-oeuvre/renovation#chauffage",
  "domotique": "/prestations-maitre-oeuvre/design-interieur#domotique",
  "panneaux solaires": "/prestations-maitre-oeuvre/construction-ecologique#solaire",
  "véranda": "/prestations-maitre-oeuvre/extension#veranda",
  "pergola": "/prestations-maitre-oeuvre/extension#pergola",
  "terrasse": "/prestations-maitre-oeuvre/extension#terrasse",
  "piscine": "/prestations-maitre-oeuvre/extension#piscine",
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
  
  // Function to check if we're inside another link already
  const isInsideLink = (position: number): boolean => {
    const openLinkBefore = lowerText.lastIndexOf('<a', position);
    if (openLinkBefore === -1) return false;
    
    const closeLinkBefore = lowerText.lastIndexOf('</a>', position);
    return openLinkBefore > closeLinkBefore;
  };
  
  const matches: Array<{keyword: string, index: number}> = [];
  
  sortedKeywords.forEach(keyword => {
    let keywordIndex = lowerText.indexOf(keyword.toLowerCase());
    
    while (keywordIndex !== -1) {
      if (!isInsideHtmlTag(keywordIndex) && !isInsideLink(keywordIndex)) {
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
            // Laissons un peu de temps au composant pour se charger si nécessaire
            setTimeout(() => {
              const element = document.getElementById(anchor);
              if (element) {
                element.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
                // Mise à jour de l'URL sans rechargement
                window.history.pushState({}, '', targetUrl);
              } else {
                console.warn(`L'ancre #${anchor} n'existe pas dans la page ${baseUrl}`);
                // Naviguons quand même vers la page de base
                window.location.href = targetUrl;
              }
            }, 100);
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
