
import React, { useEffect, useState } from 'react';
import { publicRoutes } from '../routes/publicRoutes';
import { Helmet } from 'react-helmet';

// This component generates a standard XML sitemap following conventional format
const SitemapXML: React.FC = () => {
  const [xmlContent, setXmlContent] = useState<string>('');
  
  useEffect(() => {
    // Generate the XML content immediately when the component mounts
    generateSitemapXML();
  }, []);

  const generateSitemapXML = () => {
    // Get current date in ISO format for lastmod
    const currentDate = new Date().toISOString();
    const baseUrl = 'https://progineer.fr';
    
    // Create the XML document properly with DOM API
    const xmlDoc = document.implementation.createDocument(null, 'urlset', null);
    const urlsetElement = xmlDoc.documentElement;
    urlsetElement.setAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
    
    // Add each route as a URL element
    publicRoutes
      .filter(route => route.path && route.path !== '/sitemap.xml')
      .forEach(route => {
        // Construct full URL
        const fullUrl = `${baseUrl}${route.path}`;
        
        // Calculate priority based on route depth
        const pathSegments = route.path.split('/').filter(Boolean);
        const priority = pathSegments.length === 0 ? 1.0 : Math.max(0.3, 1.0 - (pathSegments.length * 0.2));
        const changefreq = priority > 0.6 ? 'monthly' : 'yearly';
        
        // Create URL element
        const urlElement = xmlDoc.createElement('url');
        
        // Add location
        const locElement = xmlDoc.createElement('loc');
        locElement.textContent = fullUrl;
        urlElement.appendChild(locElement);
        
        // Add lastmod
        const lastmodElement = xmlDoc.createElement('lastmod');
        lastmodElement.textContent = currentDate;
        urlElement.appendChild(lastmodElement);
        
        // Add changefreq
        const changefreqElement = xmlDoc.createElement('changefreq');
        changefreqElement.textContent = changefreq;
        urlElement.appendChild(changefreqElement);
        
        // Add priority
        const priorityElement = xmlDoc.createElement('priority');
        priorityElement.textContent = priority.toFixed(1);
        urlElement.appendChild(priorityElement);
        
        // Add URL to urlset
        urlsetElement.appendChild(urlElement);
      });
    
    // Serialize to XML string
    const serializer = new XMLSerializer();
    const xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n' + serializer.serializeToString(xmlDoc);
    
    // Set the XML content in state
    setXmlContent(xmlString);
  };

  // Create a style for displaying the XML content to make it readable
  const preStyle = {
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ddd',
    borderRadius: '4px',
    overflow: 'auto',
    maxHeight: '80vh'
  };

  return (
    <>
      <Helmet>
        <title>Sitemap XML - Progineer</title>
        <meta httpEquiv="Content-Type" content="text/xml; charset=utf-8" />
      </Helmet>
      <pre style={preStyle}>{xmlContent}</pre>
    </>
  );
};

export default SitemapXML;
