
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { publicRoutes } from '../routes/publicRoutes';

const SitemapXML: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [xmlContent, setXmlContent] = useState<string>('');
  
  // Redirection pour l'URL avec slash final
  if (currentPath === '/sitemap.xml/') {
    return <Navigate to="/sitemap.xml" replace />;
  }

  useEffect(() => {
    // Ne générer et servir le XML que si nous sommes sur la route exacte /sitemap.xml
    if (currentPath === '/sitemap.xml') {
      const currentDate = new Date().toISOString().split('T')[0];
      const baseUrl = 'https://progineer.fr';
      
      // Génération du contenu XML avec un espace de noms correct
      let content = '<?xml version="1.0" encoding="UTF-8"?>\n';
      content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
      content += 'xmlns:xhtml="http://www.w3.org/1999/xhtml" ';
      content += 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" ';
      content += 'xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';

      // Ajouter chaque route avec une indentation appropriée
      publicRoutes
        .filter(route => route.path && route.path !== '*' && !route.path.includes('*'))
        .forEach(route => {
          const path = route.path.replace(/\/$/, '');
          const fullUrl = `${baseUrl}${path}`;
          
          content += '  <url>\n';
          content += `    <loc>${fullUrl}</loc>\n`;
          content += `    <lastmod>${currentDate}</lastmod>\n`;
          content += '    <changefreq>monthly</changefreq>\n';
          content += '    <priority>0.8</priority>\n';
          
          // Ajouter les balises hreflang et canonical
          content += `    <xhtml:link rel="alternate" hreflang="fr" href="${fullUrl}"/>\n`;
          content += `    <xhtml:link rel="canonical" href="${fullUrl}"/>\n`;
          
          content += '  </url>\n';
        });
      
      content += '</urlset>';
      
      setXmlContent(content);

      // Directement modifier le document pour servir correctement le XML
      // Cela contourne les limitations de React pour servir du contenu XML
      document.open('text/xml');
      document.write(content);
      document.close();
      
      // Configurer le Content-Type directement sur le document
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Type';
      meta.content = 'text/xml; charset=utf-8';
      document.head.appendChild(meta);

      // Définir le titre du document
      document.title = 'Sitemap XML - Progineer';
    }
    
    // Nettoyage lors du démontage
    return () => {
      if (currentPath === '/sitemap.xml') {
        const meta = document.querySelector('meta[http-equiv="Content-Type"]');
        if (meta) meta.remove();
      }
    };
  }, [currentPath]);

  // Pour l'affichage initial avant le remplacement du document
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
