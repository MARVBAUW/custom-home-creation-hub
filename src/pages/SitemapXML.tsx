
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Composant pour rediriger vers le fichier sitemap.xml statique
 * Cette approche assure que Google Search Console puisse correctement lire le sitemap
 */
const SitemapXML: React.FC = () => {
  useEffect(() => {
    // Redirection vers le fichier XML statique
    window.location.href = '/sitemap.xml';
    
    // Log pour le débogage
    console.log('Redirection vers sitemap.xml statique');
  }, []);

  return (
    <>
      <Helmet>
        <title>Sitemap XML | Progineer</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="hidden">Redirection vers sitemap.xml...</div>
    </>
  );
};

export default SitemapXML;
