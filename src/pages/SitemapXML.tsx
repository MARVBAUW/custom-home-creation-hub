
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
    // Diviser le contenu XML en parties pour pouvoir appliquer des styles différents
    const parts: JSX.Element[] = [];
    
    // Expression régulière pour trouver les balises XML
    const regex = /(<\?xml[^?]*\?>)|(<\/?[a-zA-Z0-9:]+)([^<>]*)(\/>|>)|([^<>]+)/g;
    let match;
    let index = 0;
    
    while ((match = regex.exec(xml)) !== null) {
      if (match[1]) {
        // Déclaration XML
        parts.push(<span key={`decl-${index}`} style={declStyle}>{match[1]}</span>);
      } else if (match[2]) {
        // Balise ouvrante ou fermante
        parts.push(<span key={`tag-${index}`} style={tagStyle}>{match[2]}</span>);
        
        // Attributs
        if (match[3]) {
          // Trouver les attributs et leurs valeurs
          const attrRegex = /\s+([a-zA-Z0-9:]+)=("([^"]*)"|'([^']*)')/g;
          let attrMatch;
          let attrParts = match[3];
          let lastIndex = 0;
          const attrElements: JSX.Element[] = [];
          
          while ((attrMatch = attrRegex.exec(match[3])) !== null) {
            // Partie avant l'attribut (espace)
            if (attrMatch.index > lastIndex) {
              attrElements.push(
                <span key={`attr-space-${index}-${lastIndex}`}>
                  {match[3].substring(lastIndex, attrMatch.index)}
                </span>
              );
            }
            
            // Nom de l'attribut
            attrElements.push(
              <span key={`attr-name-${index}-${attrMatch.index}`} style={attrStyle}>
                {attrMatch[1]}=
              </span>
            );
            
            // Valeur de l'attribut
            const quote = attrMatch[2][0]; // " ou '
            const value = attrMatch[3] || attrMatch[4];
            attrElements.push(
              <span key={`attr-value-${index}-${attrMatch.index}`} style={valueStyle}>
                {quote}{value}{quote}
              </span>
            );
            
            lastIndex = attrMatch.index + attrMatch[0].length;
          }
          
          // Partie restante
          if (lastIndex < match[3].length) {
            attrElements.push(
              <span key={`attr-rest-${index}`}>
                {match[3].substring(lastIndex)}
              </span>
            );
          }
          
          parts.push(<>{attrElements}</>);
        }
        
        // Fermeture de balise
        parts.push(<span key={`close-${index}`} style={tagStyle}>{match[4]}</span>);
      } else if (match[5]) {
        // Contenu entre les balises
        parts.push(<span key={`content-${index}`}>{match[5]}</span>);
      }
      
      index++;
    }
    
    return <>{parts}</>;
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
