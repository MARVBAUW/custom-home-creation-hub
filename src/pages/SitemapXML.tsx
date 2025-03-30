
import React, { useEffect, useState } from 'react';
import { publicRoutes } from '../routes/publicRoutes';
import { Helmet } from 'react-helmet';
import { Navigate } from 'react-router-dom';

// Cette composante gère le sitemap XML et redirige si nécessaire
const SitemapXML: React.FC = () => {
  const [xmlContent, setXmlContent] = useState<string>('');
  const currentPath = window.location.pathname;
  
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
      
      // Crée le document XML avec l'API DOM
      const xmlDoc = document.implementation.createDocument(null, 'urlset', null);
      const urlsetElement = xmlDoc.documentElement;
      urlsetElement.setAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
      
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
          
          // Crée l'élément URL
          const urlElement = xmlDoc.createElement('url');
          
          // Ajoute location
          const locElement = xmlDoc.createElement('loc');
          locElement.textContent = fullUrl;
          urlElement.appendChild(locElement);
          
          // Ajoute lastmod
          const lastmodElement = xmlDoc.createElement('lastmod');
          lastmodElement.textContent = currentDate;
          urlElement.appendChild(lastmodElement);
          
          // Ajoute changefreq
          const changefreqElement = xmlDoc.createElement('changefreq');
          changefreqElement.textContent = changefreq;
          urlElement.appendChild(changefreqElement);
          
          // Ajoute priority
          const priorityElement = xmlDoc.createElement('priority');
          priorityElement.textContent = priority.toFixed(1);
          urlElement.appendChild(priorityElement);
          
          // Ajoute URL à urlset
          urlsetElement.appendChild(urlElement);
        });
      
      // Sérialise en chaîne XML avec la déclaration XML en première ligne
      const serializer = new XMLSerializer();
      const xmlDeclaration = '<?xml version="1.0" encoding="UTF-8"?>\n';
      const xmlString = xmlDeclaration + serializer.serializeToString(xmlDoc);
      
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
