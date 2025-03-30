
import React, { useEffect, useState } from 'react';
import { publicRoutes } from '../routes/publicRoutes';
import { Helmet } from 'react-helmet-async';

// This component will generate and serve an XML sitemap directly from React
const SitemapXML: React.FC = () => {
  const [xmlContent, setXmlContent] = useState('');

  useEffect(() => {
    // Create XML string
    const baseUrl = 'https://progineer.fr';
    
    // Generate the XML content - escape any ampersands with &amp;
    const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${publicRoutes.map(route => {
    // Skip any routes that don't have a path
    if (!route.path) return '';
    
    // Convert relative paths to full URLs and ensure ampersands are escaped
    const fullUrl = `${baseUrl}${route.path}`.replace(/&/g, '&amp;');
    
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

  // Set the correct content type for XML
  useEffect(() => {
    document.contentType = "application/xml; charset=utf-8";
  }, []);

  return (
    <>
      {/* Set XML content type in the head */}
      <Helmet>
        <title>Sitemap XML - Progineer</title>
        <meta httpEquiv="Content-Type" content="application/xml; charset=utf-8" />
      </Helmet>
      
      {/* Render the XML content directly, not in a pre tag to avoid HTML escaping */}
      <div dangerouslySetInnerHTML={{ __html: xmlContent }} />
    </>
  );
};

export default SitemapXML;
