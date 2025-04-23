
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SitemapXML: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Handle direct navigation to XML files
    const handleSitemapRedirect = () => {
      const path = location.pathname;
      
      if (path === '/sitemap.xml' || path === '/sitemap') {
        window.location.href = '/sitemap.xml';
      } else if (path === '/sitemap.xsl') {
        window.location.href = '/sitemap.xsl';
      }
    };
    
    handleSitemapRedirect();
  }, [location.pathname]);

  // This component doesn't render anything as it just redirects
  return null;
};

export default SitemapXML;
