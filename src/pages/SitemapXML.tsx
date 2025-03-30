
import React, { useEffect } from 'react';
import { publicRoutes } from '../routes/publicRoutes';

// This component generates a standard XML sitemap following conventional format
const SitemapXML: React.FC = () => {
  useEffect(() => {
    // Get current date in ISO format for lastmod
    const currentDate = new Date().toISOString();
    const baseUrl = 'https://progineer.fr';
    
    // Create a properly formatted XML sitemap
    const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicRoutes
  .filter(route => route.path && route.path !== '/sitemap.xml') // Filter out the XML sitemap itself and routes without paths
  .map(route => {
    // Construct full URL
    const fullUrl = `${baseUrl}${route.path}`;
    
    // Generate lastmod date (using current date for this example)
    const lastMod = currentDate;
    
    // Calculate priority based on route depth
    const pathSegments = route.path.split('/').filter(Boolean);
    const priority = pathSegments.length === 0 ? 1.0 : Math.max(0.3, 1.0 - (pathSegments.length * 0.2));
    
    return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${priority > 0.6 ? 'monthly' : 'yearly'}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

    // Set the correct content type for XML and write the content
    document.open('text/xml');
    document.write(xmlString);
    document.close();
    
    // Force the content type header for XML
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Type';
    meta.content = 'text/xml; charset=utf-8';
    document.head.appendChild(meta);
  }, []);

  // Return a minimal component - the actual rendering happens in useEffect
  return null;
};

export default SitemapXML;
