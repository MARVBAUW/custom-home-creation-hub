
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { publicRoutes } from '../routes/publicRoutes';

const SitemapXML: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Redirection pour l'URL avec slash final
  if (currentPath === '/sitemap.xml/') {
    return <Navigate to="/sitemap.xml" replace />;
  }

  useEffect(() => {
    // Ne générer et servir le XML que si nous sommes sur la route exacte /sitemap.xml
    if (currentPath === '/sitemap.xml') {
      const currentDate = new Date().toISOString().split('T')[0];
      const baseUrl = 'https://progineer.fr';
      
      // Génération du contenu XML
      let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xmlContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
      xmlContent += 'xmlns:xhtml="http://www.w3.org/1999/xhtml" ';
      xmlContent += 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" ';
      xmlContent += 'xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';

      // Ajouter chaque route avec une indentation appropriée
      publicRoutes
        .filter(route => route.path && route.path !== '*' && !route.path.includes('*'))
        .forEach(route => {
          const path = route.path.replace(/\/$/, '');
          const fullUrl = `${baseUrl}${path}`;
          
          xmlContent += '  <url>\n';
          xmlContent += `    <loc>${fullUrl}</loc>\n`;
          xmlContent += `    <lastmod>${currentDate}</lastmod>\n`;
          xmlContent += '    <changefreq>monthly</changefreq>\n';
          xmlContent += '    <priority>0.8</priority>\n';
          
          // Ajouter les balises hreflang et canonical
          xmlContent += `    <xhtml:link rel="alternate" hreflang="fr" href="${fullUrl}"/>\n`;
          xmlContent += `    <xhtml:link rel="canonical" href="${fullUrl}"/>\n`;
          
          xmlContent += '  </url>\n';
        });
      
      xmlContent += '</urlset>';
      
      // Remplacer complètement le contenu de la page par le XML
      document.open('text/xml');
      document.write(xmlContent);
      document.close();
      
      // Configurer le Content-Type directement sur le document
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Type';
      meta.content = 'text/xml; charset=utf-8';
      document.head.appendChild(meta);
    }
    
    // Nettoyage lors du démontage
    return () => {
      if (document.contentType !== 'text/xml') {
        const meta = document.querySelector('meta[http-equiv="Content-Type"]');
        if (meta) meta.remove();
      }
    };
  }, [currentPath]);

  // Pour l'affichage initial avant le remplacement du document
  // Ce contenu ne sera visible que brièvement
  if (currentPath === '/sitemap.xml') {
    return (
      <div className="text-center py-10">
        <p>Génération du sitemap XML...</p>
      </div>
    );
  }

  // Pour tout autre chemin (sauf /sitemap.xml/ qui est redirigé)
  return null;
};

export default SitemapXML;
