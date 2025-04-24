
import React, { useEffect } from 'react';

const SitemapXML: React.FC = () => {
  useEffect(() => {
    // Direct browser to the XML file
    window.location.href = '/sitemap.xml';
  }, []);

  return (
    // This is just a fallback that should never be visible
    <div className="hidden">Redirection vers sitemap.xml...</div>
  );
};

export default SitemapXML;
