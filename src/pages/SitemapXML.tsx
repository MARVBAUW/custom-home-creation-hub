
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { publicRoutes } from '../routes/publicRoutes';

const SitemapXML: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [xmlContent, setXmlContent] = useState<string | null>(null);
  
  // Si l'URL a un slash à la fin après "sitemap.xml", rediriger vers la version sans slash
  if (currentPath.endsWith('/sitemap.xml/')) {
    return <Navigate to="/sitemap.xml" replace />;
  }

  useEffect(() => {
    if (currentPath === '/sitemap.xml') {
      const currentDate = new Date().toISOString().split('T')[0];
      const baseUrl = 'https://progineer.fr';
      
      let xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xmlString += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
      xmlString += 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ';
      xmlString += 'xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 ';
      xmlString += 'http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';

      // Ajouter chaque route
      publicRoutes
        .filter(route => route.path && route.path !== '*' && !route.path.includes('*'))
        .forEach(route => {
          const path = route.path.replace(/\/$/, '');
          const fullUrl = `${baseUrl}${path}`;
          
          xmlString += '  <url>\n';
          xmlString += `    <loc>${fullUrl}</loc>\n`;
          xmlString += `    <lastmod>${currentDate}</lastmod>\n`;
          xmlString += '    <changefreq>monthly</changefreq>\n';
          xmlString += '    <priority>0.8</priority>\n';
          xmlString += '  </url>\n';
        });
      
      xmlString += '</urlset>';
      
      setXmlContent(xmlString);

      // Définir le titre de la page
      document.title = 'Sitemap XML - Progineer';
      
      // Configurer les en-têtes HTTP pour indiquer que c'est du XML
      const metaContentType = document.createElement('meta');
      metaContentType.httpEquiv = 'Content-Type';
      metaContentType.content = 'application/xml; charset=utf-8';
      document.head.appendChild(metaContentType);
    }
  }, [currentPath]);

  // Style pour simuler un éditeur de code
  const codeEditorStyle = {
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    fontSize: '14px',
    lineHeight: '1.5',
    background: '#282c34',
    color: '#abb2bf',
    padding: '20px',
    borderRadius: '4px',
    overflow: 'auto',
    margin: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    whiteSpace: 'pre' as 'pre',
  };

  // Styles pour la coloration syntaxique
  const tagStyle = { color: '#e06c75' }; // rouge pour les balises
  const attrStyle = { color: '#d19a66' }; // orange pour les attributs
  const valueStyle = { color: '#98c379' }; // vert pour les valeurs
  const declStyle = { color: '#56b6c2' }; // cyan pour les déclarations

  // Fonction pour formater le XML avec coloration syntaxique
  const formatXmlWithSyntaxHighlighting = (xml: string) => {
    return xml
      .replace(/(&lt;|<)(\/?)([\w:-]+)(\s|\/|\s[\w=-]+|\s\w+:[\w=-]+|\s+xmlns(?::\w+)?=)([^&]*?)(\/?)(>|&gt;)/g, 
        (match, open, slash, tag, attrs, attrContent, closeSlash, close) => {
          // Formater les balises et les attributs
          return <React.Fragment key={match + Math.random()}>
            <span style={tagStyle}>{open}{slash}{tag}</span>{attrs}
            <span style={valueStyle}>{attrContent}</span>
            <span style={tagStyle}>{closeSlash}{close}</span>
          </React.Fragment>;
        }
      );
  };

  if (xmlContent && currentPath === '/sitemap.xml') {
    return (
      <div style={{ padding: '20px' }}>
        <h1 style={{ marginBottom: '20px', color: '#333' }}>Sitemap XML</h1>
        <div style={codeEditorStyle}>
          {formatXmlWithSyntaxHighlighting(xmlContent)}
        </div>
      </div>
    );
  }

  // Renvoyer un fragment vide si on n'est pas sur la route du sitemap
  return <></>;
};

export default SitemapXML;
