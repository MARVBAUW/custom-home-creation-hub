
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

    // Force content type to be XML
    document.contentType = 'text/xml';
    
    // Clear any existing content
    document.documentElement.innerHTML = '';
    
    // Create the XML document structure
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    
    // Append the XML document to the DOM
    document.appendChild(document.importNode(xmlDoc.documentElement, true));
    
    // Ensure the document is treated as XML
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Type';
    meta.content = 'text/xml; charset=utf-8';
    document.head.appendChild(meta);
  }, []);

  // Return null as we're manipulating the document directly
  return null;
};

export default SitemapXML;
