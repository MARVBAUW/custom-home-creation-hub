
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SitemapXML: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Create correct URLs for the XML files
    const baseUrl = window.location.origin;
    
    // Handle direct navigation to XML files
    const handleSitemapRedirect = () => {
      const path = location.pathname;
      
      if (path === '/' || path === '/sitemap.xml' || path === '/sitemap') {
        window.location.href = `${baseUrl}/sitemap.xml`;
      } else if (path === '/sitemap.xsl') {
        window.location.href = `${baseUrl}/sitemap.xsl`;
      }
    };
    
    handleSitemapRedirect();
  }, [location.pathname]);

  // This component doesn't render anything as it just redirects
  return null;
};

export default SitemapXML;
