
import React, { useEffect } from 'react';
import { publicRoutes } from '../routes/publicRoutes';

// This component generates a standard XML sitemap following conventional format
const SitemapXML: React.FC = () => {
  useEffect(() => {
    // Get current date in ISO format for lastmod
    const currentDate = new Date().toISOString();
    const baseUrl = 'https://progineer.fr';
    
    // Helper function to ensure proper XML entity encoding
    const encodeXMLEntities = (text: string) => {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    };
    
    // Create a properly formatted XML sitemap
    const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicRoutes
  .filter(route => route.path && route.path !== '/sitemap.xml') // Filter out the XML sitemap itself and routes without paths
  .map(route => {
    // Construct full URL and ensure it's properly encoded
    const fullUrl = encodeXMLEntities(`${baseUrl}${route.path}`);
    
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

    // Clear any existing content
    document.documentElement.innerHTML = '';
    
    // Create the XML document structure
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    
    // Append the XML document to the DOM
    document.appendChild(document.importNode(xmlDoc.documentElement, true));
    
    // Ensure the document is treated as XML by setting the appropriate content type meta tag
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Type';
    meta.content = 'text/xml; charset=utf-8';
    document.head.appendChild(meta);
    
    // Set the XML MIME type using the correct method for document creation
    const xmlHeader = document.createProcessingInstruction('xml', 'version="1.0" encoding="UTF-8"');
    document.insertBefore(xmlHeader, document.documentElement);
    
    // Check for parsing errors
    const parseError = xmlDoc.getElementsByTagName('parsererror');
    if (parseError.length > 0) {
      console.error("XML parsing error:", parseError[0].textContent);
    }
  }, []);

  // Return null as we're manipulating the document directly
  return null;
};

export default SitemapXML;
