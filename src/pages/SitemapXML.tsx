
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { publicRoutes } from '../routes/publicRoutes';

const SitemapXML: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [xmlContent, setXmlContent] = useState<string | null>(null);
  
  // Check if the URL ends with a trailing slash - moved outside of the component body
  if (currentPath === '/sitemap.xml/') {
    return <Navigate to="/sitemap.xml" replace />;
  }

  useEffect(() => {
    if (currentPath === '/sitemap.xml') {
      const currentDate = new Date().toISOString().split('T')[0];
      const baseUrl = 'https://progineer.fr';
      
      let xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xmlString += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

      // Add each route with proper indentation
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

      // Set page title and content type
      document.title = 'Sitemap XML - Progineer';
      const metaContentType = document.createElement('meta');
      metaContentType.httpEquiv = 'Content-Type';
      metaContentType.content = 'application/xml; charset=utf-8';
      document.head.appendChild(metaContentType);
    }
  }, [currentPath]);

  // Style for code editor look
  const codeEditorStyle = {
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    fontSize: '14px',
    lineHeight: '1.5',
    background: '#1e1e1e',
    color: '#d4d4d4',
    padding: '20px',
    borderRadius: '4px',
    overflow: 'auto',
    margin: '20px',
    whiteSpace: 'pre' as 'pre',
  };

  // Styles for syntax highlighting
  const xmlStyles = {
    tag: { color: '#569cd6' },         // Bleu pour les balises
    attribute: { color: '#9cdcfe' },    // Bleu clair pour les attributs
    value: { color: '#ce9178' },        // Orange pour les valeurs
    content: { color: '#d4d4d4' },      // Blanc pour le contenu
    declaration: { color: '#808080' }    // Gris pour la déclaration XML
  };

  const formatXmlWithSyntaxHighlighting = (xml: string): JSX.Element[] => {
    const lines = xml.split('\n');
    return lines.map((line, index) => {
      // Utiliser un système plus simple pour la coloration syntaxique
      let formattedLine = line;
      
      // Colorer la déclaration XML
      formattedLine = formattedLine.replace(
        /(<\?.*?\?>)/g,
        `<span style="color: ${xmlStyles.declaration.color}">$1</span>`
      );
      
      // Colorer les balises d'ouverture et de fermeture
      formattedLine = formattedLine.replace(
        /(<\/[a-zA-Z]+>|<[a-zA-Z]+>|<[a-zA-Z]+\s|<\/|<|\/>)/g,
        `<span style="color: ${xmlStyles.tag.color}">$1</span>`
      );
      
      // Colorer les attributs
      formattedLine = formattedLine.replace(
        /\s([a-zA-Z]+)=/g,
        ` <span style="color: ${xmlStyles.attribute.color}">$1</span>=`
      );
      
      // Colorer les valeurs des attributs
      formattedLine = formattedLine.replace(
        /(=["'].*?["'])/g,
        `<span style="color: ${xmlStyles.value.color}">$1</span>`
      );

      return (
        <div 
          key={index} 
          dangerouslySetInnerHTML={{ __html: formattedLine }}
          style={{ padding: '0 4px' }}
        />
      );
    });
  };

  // Si l'URL est /sitemap.xml ou /sitemap.xml/ avec ou sans slash final
  if (xmlContent && (currentPath === '/sitemap.xml' || currentPath === '/sitemap.xml/')) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ marginBottom: '20px', color: '#333' }}>Sitemap XML</h1>
        <pre style={codeEditorStyle}>
          {formatXmlWithSyntaxHighlighting(xmlContent)}
        </pre>
      </div>
    );
  }

  return null;
};

export default SitemapXML;
