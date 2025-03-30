
import React, { useEffect, useState } from 'react';
import { publicRoutes } from '../routes/publicRoutes';
import { Helmet } from 'react-helmet';
import { Navigate, useLocation } from 'react-router-dom';

// Cette composante gère le sitemap XML et redirige si nécessaire
const SitemapXML: React.FC = () => {
  const [xmlContent, setXmlContent] = useState<string>('');
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Si l'URL a un slash final après "sitemap.xml", on redirige vers la version sans slash
  if (currentPath.endsWith('/sitemap.xml/')) {
    return <Navigate to="/sitemap.xml" replace />;
  }
  
  useEffect(() => {
    // Génère le contenu XML immédiatement quand le composant est monté
    generateSitemapXML();
  }, []);

  const generateSitemapXML = () => {
    try {
      // Date courante au format ISO pour lastmod
      const currentDate = new Date().toISOString();
      const baseUrl = 'https://progineer.fr';
      
      // Déclaration XML
      const xmlDeclaration = '<?xml version="1.0" encoding="UTF-8"?>\n';
      
      // Créer l'élément urlset directement en string
      let xmlString = xmlDeclaration + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
      
      // Ajoute chaque route comme élément URL
      publicRoutes
        .filter(route => route.path && route.path !== '/sitemap.xml')
        .forEach(route => {
          // Construit l'URL complète
          const fullUrl = `${baseUrl}${route.path}`;
          
          // Calcule la priorité basée sur la profondeur de la route
          const pathSegments = route.path.split('/').filter(Boolean);
          const priority = pathSegments.length === 0 ? 1.0 : Math.max(0.3, 1.0 - (pathSegments.length * 0.2));
          const changefreq = priority > 0.6 ? 'monthly' : 'yearly';
          
          // Crée l'élément URL directement en string
          xmlString += '  <url>\n';
          xmlString += `    <loc>${fullUrl}</loc>\n`;
          xmlString += `    <lastmod>${currentDate}</lastmod>\n`;
          xmlString += `    <changefreq>${changefreq}</changefreq>\n`;
          xmlString += `    <priority>${priority.toFixed(1)}</priority>\n`;
          xmlString += '  </url>\n';
        });
      
      // Ferme l'élément urlset
      xmlString += '</urlset>';
      
      // Définit le contenu XML dans l'état
      setXmlContent(xmlString);
    } catch (error) {
      console.error('Erreur lors de la génération du sitemap XML:', error);
      setXmlContent(`<!-- Erreur lors de la génération du sitemap: ${error} -->`);
    }
  };

  // Style pour l'affichage du contenu XML
  const preStyle = {
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ddd',
    borderRadius: '4px',
    overflow: 'auto',
    maxHeight: '80vh'
  };

  return (
    <>
      <Helmet>
        <title>Sitemap XML - Progineer</title>
        <meta httpEquiv="Content-Type" content="text/xml; charset=utf-8" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Sitemap XML</h1>
        <p className="mb-4">Ce sitemap XML est généré dynamiquement à partir des routes de l'application.</p>
        <p className="mb-4">Pour une utilisation avec les moteurs de recherche, utilisez plutôt l'URL: <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">/sitemap.xml</a></p>
        <pre style={preStyle}>{xmlContent}</pre>
      </div>
    </>
  );
};

export default SitemapXML;
