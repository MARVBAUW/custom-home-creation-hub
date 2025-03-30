
import React, { useEffect, useState } from 'react';
import { publicRoutes } from '../routes/publicRoutes';
import { Helmet } from 'react-helmet-async';

// This component will generate and serve an XML sitemap directly from React
const SitemapXML: React.FC = () => {
  const [xmlContent, setXmlContent] = useState('');

  useEffect(() => {
    // Create XML string
    const baseUrl = 'https://progineer.fr';
    
    // Generate the XML content
    const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${publicRoutes.map(route => {
    // Skip any routes that don't have a path
    if (!route.path) return '';
    
    // Convert relative paths to full URLs
    const fullUrl = `${baseUrl}${route.path}`;
    
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
      {/* Set XML content type in the head */}
      <Helmet>
        <title>Sitemap XML - Progineer</title>
        <meta httpEquiv="Content-Type" content="application/xml; charset=utf-8" />
      </Helmet>
      
      {/* Display XML content in a pre tag for direct viewing */}
      <pre style={{ 
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        fontFamily: 'monospace',
        padding: '20px'
      }}>
        {xmlContent}
      </pre>
      
      {/* Hidden div with download option */}
      <div style={{ display: 'none' }}>
        {xmlContent && (
          <a
            href={`data:application/xml;charset=utf-8,${encodeURIComponent(xmlContent)}`}
            download="sitemap.xml"
            id="downloadSitemap"
          >
            Download Sitemap
          </a>
        )}
      </div>
    </>
  );
};

export default SitemapXML;
