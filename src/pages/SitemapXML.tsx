
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
      
      // Handle exact matches to redirect to the static XML files in the public folder
      if (path === '/sitemap.xml' || path === '/sitemap' || path === '/sitemap.xml/') {
        // Use direct navigation to the static file, bypassing React router
        window.location.replace(`${baseUrl}/sitemap.xml`);
      } else if (path === '/sitemap.xsl' || path === '/sitemap.xsl/') {
        window.location.replace(`${baseUrl}/sitemap.xsl`);
      }
    };
    
    handleSitemapRedirect();
  }, [location.pathname]);

  // This component doesn't render anything as it just redirects
  return null;
};

export default SitemapXML;
