
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const SitemapXML: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Redirect to the static sitemap.xml file in the public folder
    if (location.pathname === '/sitemap.xml') {
      window.location.href = '/sitemap.xml';
    }
  }, [location.pathname]);

  // This component doesn't render anything as it just redirects
  return null;
};

export default SitemapXML;
