
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
      const currentDate = '2025-04-23';
      const baseUrl = 'https://progineer.fr';
      
      // Génération du contenu XML avec un espace de noms correct
      let content = '<?xml version="1.0" encoding="UTF-8"?>\n';
      content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
      content += 'xmlns:xhtml="http://www.w3.org/1999/xhtml" ';
      content += 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" ';
      content += 'xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';

      // Ajouter l'accueil avec une priorité de 1.0
      content += '  <url>\n';
      content += `    <loc>${baseUrl}/</loc>\n`;
      content += `    <lastmod>${currentDate}</lastmod>\n`;
      content += '    <changefreq>monthly</changefreq>\n';
      content += '    <priority>1.0</priority>\n';
      content += `    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/"/>\n`;
      content += `    <xhtml:link rel="canonical" href="${baseUrl}/"/>\n`;
      content += '  </url>\n';

      // Ajouter chaque route avec une indentation appropriée
      publicRoutes
        .filter(route => route.path && route.path !== '*' && !route.path.includes('*'))
        .forEach(route => {
          const path = route.path.replace(/\/$/, '');
          const fullUrl = `${baseUrl}${path}`;
          
          // Ignorer la page d'accueil (déjà ajoutée)
          if (path !== '') {
            content += '  <url>\n';
            content += `    <loc>${fullUrl}</loc>\n`;
            content += `    <lastmod>${currentDate}</lastmod>\n`;
            
            // Ajuster la priorité en fonction de la route
            const priority = path === '/a-propos' || path === '/estimation' || path === '/contact' ? '0.9' : 
                             path.startsWith('/prestations-maitre-oeuvre') ? '0.7' : '0.8';
            
            content += '    <changefreq>monthly</changefreq>\n';
            content += `    <priority>${priority}</priority>\n`;
            
            // Ajouter les balises hreflang et canonical
            content += `    <xhtml:link rel="alternate" hreflang="fr" href="${fullUrl}"/>\n`;
            content += `    <xhtml:link rel="canonical" href="${fullUrl}"/>\n`;
            
            content += '  </url>\n';
          }
        });
      
      content += '</urlset>';
      
      // Au lieu de modifier directement le document, nous allons créer un blob et rediriger vers son URL
      const blob = new Blob([content], { type: 'application/xml' });
      const xmlUrl = URL.createObjectURL(blob);
      
      // Remplacer le contenu du document
      document.documentElement.innerHTML = '';
      
      // Ajouter un meta pour le content-type (même si nous ne pouvons pas changer le contentType directement)
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Type';
      meta.content = 'text/xml; charset=UTF-8';
      document.head.appendChild(meta);
      
      // Ajouter le XML en tant que contenu pré-formatté
      const pre = document.createElement('pre');
      pre.textContent = content;
      document.body.appendChild(pre);
      
      // Définir l'attribut xmlns sur l'élément html
      document.documentElement.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
      
      // Définir le doctype XML au lieu de HTML
      const doctypeNode = document.implementation.createDocumentType('xml', '', '');
      document.doctype && document.doctype.remove();
      document.insertBefore(doctypeNode, document.documentElement);
      
      // Rediriger vers le blob URL, ce qui permettra au navigateur de le traiter comme XML
      if (typeof window !== 'undefined') {
        window.location.href = xmlUrl;
      }
    }
  }, [currentPath]);

  // Affichage pour le rendu initial React
  return (
    <div className="hidden">
      {/* Ce contenu sera remplacé par le XML */}
    </div>
  );
};

export default SitemapXML;
