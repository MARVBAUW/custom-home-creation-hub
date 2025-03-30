
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
    
    // Create the XML document properly with DOMParser
    const xmlDoc = document.implementation.createDocument(null, 'urlset', null);
    const urlsetElement = xmlDoc.documentElement;
    urlsetElement.setAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
    
    // Add each route as a URL element
    publicRoutes
      .filter(route => route.path && route.path !== '/sitemap.xml')
      .forEach(route => {
        // Construct full URL and ensure it's properly encoded
        const fullUrl = `${baseUrl}${route.path}`;
        
        // Calculate priority based on route depth
        const pathSegments = route.path.split('/').filter(Boolean);
        const priority = pathSegments.length === 0 ? 1.0 : Math.max(0.3, 1.0 - (pathSegments.length * 0.2));
        const changefreq = priority > 0.6 ? 'monthly' : 'yearly';
        
        // Create URL element
        const urlElement = xmlDoc.createElement('url');
        
        // Add location
        const locElement = xmlDoc.createElement('loc');
        locElement.textContent = encodeXMLEntities(fullUrl);
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
    
    // Clear any existing content
    document.documentElement.innerHTML = '';
    document.body.innerHTML = '';
    
    // Set the content type with a meta tag
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Type';
    meta.content = 'text/xml; charset=utf-8';
    document.head.appendChild(meta);
    
    // Create a pre element to display the XML content properly
    const pre = document.createElement('pre');
    pre.textContent = xmlString;
    document.body.appendChild(pre);
    
    // Set the XML document type for proper XML rendering
    const doctype = document.implementation.createDocumentType('xml', '', '');
    document.insertBefore(doctype, document.documentElement);
    
    // Log success message
    console.log('Sitemap XML generated successfully');
  }, []);

  // Return null as we're manipulating the document directly
  return null;
};

export default SitemapXML;
