
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { publicRoutes } from '../routes/publicRoutes';

const SitemapXML: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Redirection for URL with trailing slash
  if (currentPath === '/sitemap.xml/') {
    return <Navigate to="/sitemap.xml" replace />;
  }

  useEffect(() => {
    // Only generate and serve XML if we're on the exact /sitemap.xml route
    if (currentPath === '/sitemap.xml') {
      const currentDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
      const baseUrl = 'https://progineer.fr';
      
      // Generate XML content with proper namespaces
      let content = '<?xml version="1.0" encoding="UTF-8"?>\n';
      content += '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n';
      content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
      content += 'xmlns:xhtml="http://www.w3.org/1999/xhtml" ';
      content += 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" ';
      content += 'xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';

      // Add home page with priority 1.0
      content += '  <url>\n';
      content += `    <loc>${baseUrl}/</loc>\n`;
      content += `    <lastmod>${currentDate}</lastmod>\n`;
      content += '    <changefreq>monthly</changefreq>\n';
      content += '    <priority>1.0</priority>\n';
      content += `    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/"/>\n`;
      content += `    <xhtml:link rel="canonical" href="${baseUrl}/"/>\n`;
      content += '  </url>\n';

      // Add each route with appropriate indentation
      publicRoutes
        .filter(route => route.path && route.path !== '*' && !route.path.includes('*'))
        .forEach(route => {
          const path = route.path.replace(/\/$/, '');
          const fullUrl = `${baseUrl}${path}`;
          
          // Skip the home page (already added)
          if (path !== '') {
            content += '  <url>\n';
            content += `    <loc>${fullUrl}</loc>\n`;
            content += `    <lastmod>${currentDate}</lastmod>\n`;
            
            // Adjust priority based on route
            const priority = path === '/a-propos' || path === '/estimation' || path === '/contact' ? '0.9' : 
                             path.startsWith('/prestations-maitre-oeuvre') ? '0.7' : '0.8';
            
            content += '    <changefreq>monthly</changefreq>\n';
            content += `    <priority>${priority}</priority>\n`;
            
            // Add hreflang and canonical tags
            content += `    <xhtml:link rel="alternate" hreflang="fr" href="${fullUrl}"/>\n`;
            content += `    <xhtml:link rel="canonical" href="${fullUrl}"/>\n`;
            
            content += '  </url>\n';
          }
        });
      
      content += '</urlset>';
      
      // Create a Blob with the XML content and the correct content type
      const blob = new Blob([content], { type: 'application/xml;charset=UTF-8' });
      
      // IMPORTANT: Set the document Content-Type using document.contentType
      // This is a more direct approach than using meta tags
      document.contentType = 'application/xml';
      
      // Complete replacement of the document with XML content
      document.open('application/xml');
      document.write(content);
      document.close();
    }
  }, [currentPath]);

  // Initial React render content (not shown to users as it will be replaced by XML)
  return null;
};

export default SitemapXML;
