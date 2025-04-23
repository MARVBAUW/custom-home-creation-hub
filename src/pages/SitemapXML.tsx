
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
      
      // Create a simple XSL stylesheet if it doesn't exist in public folder
      const xslContent = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap - Progineer</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #333;
            margin: 0;
            padding: 20px;
          }
          h1 {
            color: #0a5b8f;
            font-size: 1.5em;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
          }
          th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          th {
            background-color: #f2f2f2;
            color: #333;
          }
          tr:hover {
            background-color: #f5f5f5;
          }
          a {
            color: #0a5b8f;
          }
          .url {
            max-width: 400px;
            word-break: break-all;
          }
          .header {
            background-color: #f8f9fa;
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 20px;
          }
          .footer {
            font-size: 0.8em;
            color: #666;
            margin-top: 30px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Plan du site XML de Progineer</h1>
          <p>Ce fichier XML est utilisé par les moteurs de recherche pour découvrir toutes les pages du site.</p>
        </div>
        <div>
          <table>
            <tr>
              <th>URL</th>
              <th>Dernière modification</th>
              <th>Fréquence</th>
              <th>Priorité</th>
            </tr>
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <tr>
                <td class="url"><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
                <td><xsl:value-of select="sitemap:lastmod"/></td>
                <td><xsl:value-of select="sitemap:changefreq"/></td>
                <td><xsl:value-of select="sitemap:priority"/></td>
              </tr>
            </xsl:for-each>
          </table>
        </div>
        <div class="footer">
          <p>Généré par Progineer - <a href="https://progineer.fr">progineer.fr</a></p>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>`;
      
      // Method 1: Use a downloadable Blob approach
      const blob = new Blob([content], { type: 'application/xml;charset=UTF-8' });
      const url = URL.createObjectURL(blob);
      
      // Method 2: Create both an XML blob and XSL blob for styling
      const xslBlob = new Blob([xslContent], { type: 'application/xml;charset=UTF-8' });
      const xslUrl = URL.createObjectURL(xslBlob);
      
      // Clear the document and set proper meta tags
      document.open();
      document.write(`
        <!DOCTYPE xml>
        <html xmlns="http://www.w3.org/1999/xhtml">
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
      
      // Add a fallback link for downloading the XML
      const downloadLink = document.createElement('a');
      downloadLink.style.position = 'fixed';
      downloadLink.style.bottom = '10px';
      downloadLink.style.right = '10px';
      downloadLink.style.padding = '8px 16px';
      downloadLink.style.backgroundColor = '#0a5b8f';
      downloadLink.style.color = 'white';
      downloadLink.style.textDecoration = 'none';
      downloadLink.style.borderRadius = '4px';
      downloadLink.href = url;
      downloadLink.setAttribute('download', 'sitemap.xml');
      downloadLink.textContent = 'Télécharger le sitemap XML';
      document.body.appendChild(downloadLink);
      
      // Provide a link to view the XML directly
      const viewLink = document.createElement('a');
      viewLink.style.position = 'fixed';
      viewLink.style.bottom = '10px';
      viewLink.style.left = '10px';
      viewLink.style.padding = '8px 16px';
      viewLink.style.backgroundColor = '#333';
      viewLink.style.color = 'white';
      viewLink.style.textDecoration = 'none';
      viewLink.style.borderRadius = '4px';
      viewLink.href = url;
      viewLink.setAttribute('target', '_blank');
      viewLink.textContent = 'Voir le XML brut';
      document.body.appendChild(viewLink);
      
      // Alternative approach: redirect to the blob URL for direct XML viewing
      // Uncomment this to use this approach instead of inline display
      // window.location.href = url;
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
