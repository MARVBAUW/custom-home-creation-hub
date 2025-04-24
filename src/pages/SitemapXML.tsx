
import React from 'react';
import { Navigate } from 'react-router-dom';

const SitemapXML: React.FC = () => {
  // Redirect to the static sitemap.xml file
  return <Navigate to="/sitemap.xml" replace />;
};

export default SitemapXML;
