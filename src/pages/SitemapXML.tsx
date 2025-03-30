
import React, { useEffect } from 'react';
import { publicRoutes } from '../routes/publicRoutes';

// This component will generate and serve an XML sitemap directly from React
const SitemapXML: React.FC = () => {
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

    // Set the document content type to XML
    const blob = new Blob([xmlString], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);

    // Force download or display
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    
    // Clean up
    URL.revokeObjectURL(url);
  }, []);

  return (
    <div>
      <h1>Generating Sitemap XML...</h1>
      <p>If your download doesn't start automatically, please check the console for any errors.</p>
    </div>
  );
};

export default SitemapXML;
