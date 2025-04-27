
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface AlternateLanguage {
  lang: string;
  url: string;
}

interface CanonicalLinksProps {
  canonicalUrl?: string;
  alternateLanguages?: AlternateLanguage[];
  noIndex?: boolean;
  noFollow?: boolean;
}

/**
 * Composant pour gérer les liens canoniques et les hreflang
 */
const CanonicalLinks: React.FC<CanonicalLinksProps> = ({
  canonicalUrl,
  alternateLanguages = [],
  noIndex = false,
  noFollow = false
}) => {
  const location = useLocation();
  
  // Utiliser l'URL actuelle si aucune URL canonique n'est fournie
  const url = canonicalUrl || `https://progineer.fr${location.pathname}`;
  
  // Créer la directive robots
  const robotsContent = [
    noIndex ? 'noindex' : 'index',
    noFollow ? 'nofollow' : 'follow',
    'max-snippet:-1', 
    'max-image-preview:large', 
    'max-video-preview:-1'
  ].join(', ');

  return (
    <Helmet>
      {/* Lien canonique */}
      <link rel="canonical" href={url} />
      
      {/* Directives robots */}
      <meta name="robots" content={robotsContent} />
      
      {/* Liens hreflang pour les versions linguistiques alternatives */}
      {alternateLanguages.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      
      {/* Toujours ajouter x-default pour les utilisateurs sans préférence de langue */}
      {alternateLanguages.length > 0 && (
        <link rel="alternate" hrefLang="x-default" href={url} />
      )}
    </Helmet>
  );
};

export default CanonicalLinks;
