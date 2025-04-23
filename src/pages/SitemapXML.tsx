
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { publicRoutes } from '../routes/publicRoutes';

const SitemapXML: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [xmlContent, setXmlContent] = useState<string | null>(null);
  
  // Gestion de la redirection pour l'URL avec slash final
  if (currentPath === '/sitemap.xml/') {
    return <Navigate to="/sitemap.xml" replace />;
  }

  useEffect(() => {
    // Ne générer le contenu XML que si nous sommes sur la page sitemap.xml (sans slash final)
    if (currentPath === '/sitemap.xml') {
      const currentDate = new Date().toISOString().split('T')[0];
      const baseUrl = 'https://progineer.fr';
      
      let xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xmlString += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

      // Ajouter chaque route avec une indentation appropriée
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

      // Configurer le titre de la page et le type de contenu
      document.title = 'Sitemap XML - Progineer';
      
      // Supprimer l'ancien meta tag s'il existe
      const existingMeta = document.querySelector('meta[http-equiv="Content-Type"]');
      if (existingMeta) {
        existingMeta.remove();
      }
      
      // Ajouter le nouveau meta tag
      const metaContentType = document.createElement('meta');
      metaContentType.httpEquiv = 'Content-Type';
      metaContentType.content = 'application/xml; charset=utf-8';
      document.head.appendChild(metaContentType);
      
      // Ajouter un lien pour télécharger le sitemap
      const downloadLink = document.createElement('link');
      downloadLink.rel = 'alternate';
      downloadLink.type = 'application/xml';
      downloadLink.href = `${baseUrl}/sitemap.xml`;
      document.head.appendChild(downloadLink);
    }
    
    // Nettoyage lors du démontage du composant
    return () => {
      const metaTag = document.querySelector('meta[http-equiv="Content-Type"]');
      if (metaTag) metaTag.remove();
      
      const downloadLink = document.querySelector('link[rel="alternate"][type="application/xml"]');
      if (downloadLink) downloadLink.remove();
    };
  }, [currentPath]);

  // Style pour l'apparence de l'éditeur de code
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

  // Styles pour la coloration syntaxique
  const xmlStyles = {
    tag: { color: '#569cd6' },         // Bleu pour les balises
    attribute: { color: '#9cdcfe' },    // Bleu clair pour les attributs
    value: { color: '#ce9178' },        // Orange pour les valeurs
    content: { color: '#d4d4d4' },      // Blanc pour le contenu
    declaration: { color: '#808080' }    // Gris pour la déclaration XML
  };

  // Fonction simplifiée pour la coloration syntaxique
  const formatXmlWithSyntaxHighlighting = (xml: string): JSX.Element[] => {
    if (!xml) return [];
    
    const lines = xml.split('\n');
    return lines.map((line, index) => {
      // Coloration syntaxique avec des regexes plus simples
      let formattedLine = line;
      
      // Colorer la déclaration XML
      formattedLine = formattedLine.replace(
        /(&lt;\?.*?\?&gt;|<\?.*?\?>)/g, 
        `<span style="color: ${xmlStyles.declaration.color}">$1</span>`
      );
      
      // Colorer les balises
      formattedLine = formattedLine.replace(
        /(&lt;\/.*?&gt;|&lt;.*?&gt;|<\/.*?>|<.*?>)/g,
        match => `<span style="color: ${xmlStyles.tag.color}">${match}</span>`
      );
      
      // Colorer les attributs (noms seulement)
      formattedLine = formattedLine.replace(
        /\s([a-zA-Z:]+)=/g,
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

  // Rendu conditionnel basé sur le contenu XML et le chemin actuel
  if (xmlContent && currentPath === '/sitemap.xml') {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ marginBottom: '20px', color: '#333' }}>Sitemap XML</h1>
        <div className="xml-actions" style={{ marginBottom: '20px' }}>
          <a 
            href="/sitemap.xml" 
            download="sitemap.xml" 
            className="bg-progineer-gold text-white px-4 py-2 rounded hover:bg-progineer-gold/80 transition-colors inline-block mr-4"
          >
            Télécharger le sitemap XML
          </a>
          <a 
            href="https://search.google.com/search-console" 
            target="_blank"
            rel="noopener noreferrer" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors inline-block"
          >
            Soumettre à Google Search Console
          </a>
        </div>
        <pre style={codeEditorStyle}>
          {formatXmlWithSyntaxHighlighting(xmlContent)}
        </pre>
        <p style={{ marginTop: '20px', color: '#666', fontSize: '14px' }}>
          Ce sitemap est généré automatiquement à partir des routes de l'application et est conforme au 
          <a href="https://www.sitemaps.org/protocol.html" target="_blank" rel="noopener noreferrer" style={{ color: '#569cd6', marginLeft: '4px' }}>
            protocole sitemap standard
          </a>.
        </p>
      </div>
    );
  }

  // Si nous sommes sur /sitemap.xml/ mais la redirection n'a pas fonctionné, 
  // afficher un message d'erreur plutôt qu'une page blanche
  if (currentPath === '/sitemap.xml/') {
    return (
      <div style={{ maxWidth: '600px', margin: '100px auto', textAlign: 'center' }}>
        <h1>Redirection en cours...</h1>
        <p>Si vous n'êtes pas automatiquement redirigé vers le sitemap, <a href="/sitemap.xml">cliquez ici</a>.</p>
      </div>
    );
  }

  // Pour tout autre chemin où ce composant pourrait être rendu
  return null;
};

export default SitemapXML;
