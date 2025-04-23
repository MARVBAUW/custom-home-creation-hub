
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
      const xmlUrl = URL.createObjectURL(blob);
      
      // Replace the current document content with the XML content
      document.open();
      document.write('<!DOCTYPE xml>');
      document.write(`
        <html>
          <head>
            <meta http-equiv="Content-Type" content="application/xml; charset=UTF-8" />
            <title>Sitemap XML - Progineer</title>
          </head>
          <body>
            <pre>${content}</pre>
          </body>
        </html>
      `);
      document.close();
      
      // Add a download link for the XML file
      const downloadLink = document.createElement('a');
      downloadLink.style.position = 'fixed';
      downloadLink.style.bottom = '10px';
      downloadLink.style.right = '10px';
      downloadLink.style.padding = '8px 16px';
      downloadLink.style.backgroundColor = '#787346';
      downloadLink.style.color = 'white';
      downloadLink.style.textDecoration = 'none';
      downloadLink.style.borderRadius = '4px';
      downloadLink.href = xmlUrl;
      downloadLink.setAttribute('download', 'sitemap.xml');
      downloadLink.textContent = 'Télécharger le sitemap XML';
      document.body.appendChild(downloadLink);
      
      // Add a link to view the raw XML
      const viewLink = document.createElement('a');
      viewLink.style.position = 'fixed';
      viewLink.style.bottom = '10px';
      viewLink.style.left = '10px';
      viewLink.style.padding = '8px 16px';
      viewLink.style.backgroundColor = '#333';
      viewLink.style.color = 'white';
      viewLink.style.textDecoration = 'none';
      viewLink.style.borderRadius = '4px';
      viewLink.href = xmlUrl;
      viewLink.setAttribute('target', '_blank');
      viewLink.textContent = 'Voir le XML brut';
      document.body.appendChild(viewLink);
      
      // Alternative method: direct download via automatic click
      // Uncomment this to automatically download the file when visiting the URL
      // document.body.appendChild(downloadLink);
      // downloadLink.click();
      // document.body.removeChild(downloadLink);
    }
  }, [currentPath]);

  // Initial React render content
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-6">
        <h1 className="text-xl font-semibold mb-4">Chargement du sitemap XML...</h1>
        <p className="text-gray-600">Si le sitemap ne s'affiche pas automatiquement, essayez de rafraîchir la page.</p>
      </div>
    </div>
  );
};

export default SitemapXML;
