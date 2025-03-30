
import React, { useEffect, useState } from 'react';
import { publicRoutes } from '../routes/publicRoutes';
import { Helmet } from 'react-helmet-async';

// This component will generate and serve an XML sitemap directly from React
const SitemapXML: React.FC = () => {
  const [xmlContent, setXmlContent] = useState('');

  useEffect(() => {
    // Create XML string
    const baseUrl = 'https://progineer.fr';
    
    // We need to create a properly escaped XML string
    // Convert special XML characters to their entities
    const escapeXml = (unsafe: string): string => {
      return unsafe.replace(/[&<>"']/g, (match) => {
        switch (match) {
          case '&': return '&amp;';
          case '<': return '&lt;';
          case '>': return '&gt;';
          case '"': return '&quot;';
          case "'": return '&apos;';
          default: return match;
        }
      });
    };
    
    // Generate the XML content with proper XML escaping
    const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicRoutes.map(route => {
  // Skip any routes that don't have a path
  if (!route.path) return '';
  
  // Ensure the URL is properly escaped for XML
  const fullUrl = escapeXml(`${baseUrl}${route.path}`);
  
  // Determine priority based on route depth
  const pathSegments = route.path.split('/').filter(Boolean);
  const priority = pathSegments.length === 0 ? 1.0 : Math.max(0.3, 1.0 - (pathSegments.length * 0.2));
  
  return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>2023-06-01</lastmod>
    <changefreq>${priority > 0.6 ? 'monthly' : 'yearly'}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

    setXmlContent(xmlString);
  }, []);

  return (
    <>
      {/* Set XML content type in the head - this is crucial for proper XML serving */}
      <Helmet>
        <title>Sitemap XML - Progineer</title>
        <meta httpEquiv="Content-Type" content="text/xml; charset=utf-8" />
      </Helmet>
      
      {/* Render the XML content directly, not in a pre tag to avoid HTML escaping */}
      <div dangerouslySetInnerHTML={{ __html: xmlContent }} />
    </>
  );
};

export default SitemapXML;
