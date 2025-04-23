
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { publicRoutes } from '../routes/publicRoutes';

const SitemapXML: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // If the URL has a trailing slash after "sitemap.xml", redirect to the version without slash
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

      // Add each route
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

      // Create a Blob with the XML content
      const blob = new Blob([xmlString], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);

      // Clear any existing document content
      document.documentElement.innerHTML = '';

      // Create an iframe to display the XML content
      const iframe = document.createElement('iframe');
      iframe.style.width = '100%';
      iframe.style.height = '100vh';
      iframe.style.border = 'none';
      document.body.appendChild(iframe);

      // Set the iframe source to the Blob URL
      iframe.src = url;

      // Clean up the Blob URL when the component unmounts
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [currentPath]);

  // Return empty fragment since we're handling the DOM directly for XML
  return <></>;
};

export default SitemapXML;
