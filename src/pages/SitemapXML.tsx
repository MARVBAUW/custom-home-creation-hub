
import React, { useEffect, useState } from 'react';
import { publicRoutes } from '../routes/publicRoutes';
import { Helmet } from 'react-helmet';
import { Navigate, useLocation } from 'react-router-dom';

// This component handles the XML sitemap and redirects if necessary
const SitemapXML: React.FC = () => {
  const [xmlContent, setXmlContent] = useState<string>('');
  const location = useLocation();
  const currentPath = location.pathname;
  
  // If the URL has a trailing slash after "sitemap.xml", redirect to the version without slash
  if (currentPath.endsWith('/sitemap.xml/')) {
    return <Navigate to="/sitemap.xml" replace />;
  }
  
  useEffect(() => {
    // Generate the XML content immediately when the component is mounted
    generateSitemapXML();
  }, []);

  const generateSitemapXML = () => {
    try {
      // Current date in ISO format for lastmod
      const currentDate = new Date().toISOString().split('T')[0];
      const baseUrl = 'https://progineer.fr';
      
      // XML declaration
      const xmlDeclaration = '<?xml version="1.0" encoding="UTF-8"?>\n';
      
      // Create the urlset element with proper namespace declaration
      let xmlString = xmlDeclaration + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
      
      // Add each route as URL element
      publicRoutes
        .filter(route => route.path && route.path !== '/sitemap.xml')
        .forEach(route => {
          // Build full URL
          const fullUrl = `${baseUrl}${route.path}`;
          
          // Calculate priority based on route depth
          const pathSegments = route.path.split('/').filter(Boolean);
          const priority = pathSegments.length === 0 ? 1.0 : Math.max(0.3, 1.0 - (pathSegments.length * 0.2));
          const changefreq = priority > 0.6 ? 'monthly' : 'yearly';
          
          // Create URL element directly as string
          xmlString += '  <url>\n';
          xmlString += `    <loc>${fullUrl}</loc>\n`;
          xmlString += `    <lastmod>${currentDate}</lastmod>\n`;
          xmlString += `    <changefreq>${changefreq}</changefreq>\n`;
          xmlString += `    <priority>${priority.toFixed(1)}</priority>\n`;
          xmlString += '  </url>\n';
        });
      
      // Close urlset element
      xmlString += '</urlset>';
      
      // Set XML content to state
      setXmlContent(xmlString);
    } catch (error) {
      console.error('Error generating XML sitemap:', error);
      setXmlContent(`<!-- Error generating sitemap: ${error} -->`);
    }
  };

  // If accessing /sitemap.xml directly, serve as pure XML
  if (currentPath === '/sitemap.xml') {
    return (
      <>
        <Helmet>
          <meta httpEquiv="Content-Type" content="text/xml; charset=utf-8" />
        </Helmet>
        <pre 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            margin: 0,
            padding: 0,
            border: 'none',
            backgroundColor: 'white',
            color: 'black'
          }}
        >{xmlContent}</pre>
      </>
    );
  }

  // Autrement, afficher comme une page normale avec l'UI autour
  return (
    <>
      <Helmet>
        <title>Plan du site XML - Progineer</title>
        <meta httpEquiv="Content-Type" content="text/xml; charset=utf-8" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Plan du site XML</h1>
        <p className="mb-4">Ce sitemap XML est généré dynamiquement à partir des routes de l'application.</p>
        <p className="mb-4">Pour une utilisation avec les moteurs de recherche, utilisez plutôt l'URL: <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">/sitemap.xml</a></p>
        <pre style={{
          fontFamily: 'monospace',
          whiteSpace: 'pre-wrap',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          border: '1px solid #ddd',
          borderRadius: '4px',
          overflow: 'auto',
          maxHeight: '80vh'
        }}>{xmlContent}</pre>
      </div>
    </>
  );
};

export default SitemapXML;
