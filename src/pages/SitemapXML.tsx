
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { publicRoutes } from '../routes/publicRoutes';

const SitemapXML: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Si l'URL a un slash à la fin après "sitemap.xml", rediriger vers la version sans slash
  if (currentPath.endsWith('/sitemap.xml/')) {
    return <Navigate to="/sitemap.xml" replace />;
  }

  useEffect(() => {
    if (currentPath === '/sitemap.xml') {
      const currentDate = new Date().toISOString().split('T')[0];
      const baseUrl = 'https://progineer.fr';
      
      let xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xmlString += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
      xmlString += 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ';
      xmlString += 'xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 ';
      xmlString += 'http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';

      // Ajouter chaque route
      publicRoutes
        .filter(route => route.path && route.path !== '*' && !route.path.includes('*'))
        .forEach(route => {
          const path = route.path.replace(/\/$/, '');
          const fullUrl = `${baseUrl}${path}`;
          
          xmlString += '  <url>\n';
          xmlString += `    <loc>${fullUrl}</loc>\n`;
          xmlString += `    <lastmod>${currentDate}</lastmod>\n`;
          xmlString += '    <changefreq>monthly</changefreq>\n';
          xmlString += '    <priority>0.8</priority>\n';
          xmlString += '  </url>\n';
        });
      
      xmlString += '</urlset>';

      // Au lieu de créer un iframe, définir le type de contenu et servir directement le XML
      document.open('text/xml');
      document.write(xmlString);
      document.close();
      
      // Définir le type de contenu dans l'en-tête pour indiquer qu'il s'agit de XML
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Type';
      meta.content = 'application/xml; charset=utf-8';
      document.head.appendChild(meta);
      
      // Supprimer tout élément HTML standard qui pourrait être présent
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      
      // Supprimer le favicon ou autres éléments qui pourraient être ajoutés automatiquement
      Array.from(document.head.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]'))
        .forEach(el => el.parentNode?.removeChild(el));
    }
  }, [currentPath]);

  // Renvoyer un fragment vide, le contenu sera remplacé par le XML
  return <></>;
};

export default SitemapXML;
