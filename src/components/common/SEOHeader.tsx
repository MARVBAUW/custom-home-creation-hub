
import React from 'react';
import SEO from '@/components/common/SEO';
import { validateUniqueTitle, validateUniqueDescription, formatPageTitle } from '@/utils/seoUtils';
import { useLocation } from 'react-router-dom';

interface SEOHeaderProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  structuredData?: object;
  includeLocationSuffix?: boolean;
  ogType?: string;
  ogImage?: string;
  additionalTags?: React.ReactNode;
}

/**
 * Composant SEO amélioré pour gérer tous les aspects du référencement d'une page
 */
const SEOHeader: React.FC<SEOHeaderProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  structuredData,
  includeLocationSuffix = true,
  ogType = 'website',
  ogImage,
  additionalTags
}) => {
  const location = useLocation();
  
  // Valider l'unicité des titres et descriptions (pour le développement)
  const isUniqueTitle = validateUniqueTitle(title);
  const isUniqueDescription = validateUniqueDescription(description);
  
  // Avertissements pour les doublons en développement
  if (process.env.NODE_ENV === 'development') {
    if (!isUniqueTitle) {
      console.warn(`[SEO Warning] Duplicate title detected: "${title}"`);
    }
    
    if (!isUniqueDescription) {
      console.warn(`[SEO Warning] Duplicate description detected: "${description.substring(0, 50)}..."`);
    }
  }

  // Format du titre avec suffixe de localisation si nécessaire
  const fullTitle = includeLocationSuffix 
    ? formatPageTitle(title, 'en PACA | Progineer')
    : formatPageTitle(title);

  // Générer l'URL canonique par défaut si non fournie
  const generatedCanonicalUrl = canonicalUrl || `https://progineer.fr${location.pathname}`;

  return (
    <SEO
      title={fullTitle}
      description={description}
      keywords={keywords}
      canonicalUrl={generatedCanonicalUrl}
      structuredData={structuredData}
      ogType={ogType}
      ogImage={ogImage}
    >
      {/* Tags supplémentaires si fournis */}
      {additionalTags}
      
      {/* Ajouter le préchargement des ressources critiques */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      
      {/* Balises spécifiques aux réseaux sociaux français */}
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="Progineer | Maître d'œuvre en PACA" />
      
      {/* Pour le référencement local */}
      <meta name="geo.region" content="FR-PAC" />
      <meta name="geo.placename" content="Marseille" />
    </SEO>
  );
};

export default SEOHeader;
