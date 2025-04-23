
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { publicRoutes } from '../routes/publicRoutes';

const SitemapXML: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [xmlContent, setXmlContent] = useState<string | null>(null);
  
  // Redirection simple pour l'URL avec slash final
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
    }
    
    // Nettoyage lors du démontage du composant
    return () => {
      const metaTag = document.querySelector('meta[http-equiv="Content-Type"]');
      if (metaTag) metaTag.remove();
    };
  }, [currentPath]);

  // Style pour l'affichage du XML
  const codeStyle = {
    fontFamily: 'monospace',
    whiteSpace: 'pre' as 'pre',
    background: '#f5f5f5',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '15px',
    margin: '20px',
    overflowX: 'auto' as 'auto',
    maxWidth: '100%',
    color: '#333'
  };

  // Fonction simplifiée pour la coloration syntaxique
  const formatXML = (xml: string): JSX.Element => {
    // Échapper les caractères spéciaux pour un affichage HTML sécurisé
    const escapeHTML = (str: string) => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    // Transformer le XML en HTML colorisé
    const colorized = escapeHTML(xml)
      .replace(/&lt;\?.*?\?&gt;/g, '<span style="color:#999">&lt;?$&?&gt;</span>')
      .replace(/&lt;(\/?[a-zA-Z0-9:]+)(\s|&gt;)/g, '&lt;<span style="color:#0066cc">$1</span>$2')
      .replace(/=&quot;.*?&quot;/g, (match) => {
        return '=<span style="color:#cc6600">' + match.substring(1) + '</span>';
      });

    return <div dangerouslySetInnerHTML={{ __html: colorized }} />;
  };

  // Condition de rendu sécurisée avec fallback
  if (currentPath === '/sitemap.xml') {
    if (xmlContent) {
      return (
        <>
          {/* Ce div ne sera pas rendu car nous utilisons le type text/xml */}
          <div style={{ display: 'none' }}>
            <pre id="sitemap-xml-content">{xmlContent}</pre>
          </div>
          
          {/* Affichage visuel pour les navigateurs */}
          <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>Sitemap XML</h1>
            <div style={{ marginBottom: '20px' }}>
              <a 
                href="data:application/xml;charset=utf-8,{encodeURIComponent(xmlContent)}" 
                download="sitemap.xml"
                style={{
                  background: '#4caf50',
                  color: 'white',
                  padding: '10px 15px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  display: 'inline-block',
                  marginRight: '15px'
                }}
              >
                Télécharger le sitemap XML
              </a>
              <a 
                href="https://search.google.com/search-console" 
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#2196f3',
                  color: 'white',
                  padding: '10px 15px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                Soumettre à Google Search Console
              </a>
            </div>
            <div style={codeStyle}>
              {formatXML(xmlContent)}
            </div>
            <div style={{ marginTop: '20px', fontSize: '0.9em', color: '#666' }}>
              <p>Ce sitemap XML liste toutes les pages du site et est conforme au <a href="https://www.sitemaps.org/protocol.html" target="_blank" rel="noopener noreferrer" style={{ color: '#2196f3' }}>protocole sitemap standard</a>.</p>
            </div>
          </div>
          
          {/* Script pour corriger le Content-Type */}
          <script dangerouslySetInnerHTML={{
            __html: `
              // Vérifie si nous sommes sur la route /sitemap.xml exactement
              if (window.location.pathname === '/sitemap.xml') {
                // Obtenir le contenu XML
                const xmlContent = document.getElementById('sitemap-xml-content')?.textContent;
                if (xmlContent) {
                  // Crée un Blob avec le contenu XML
                  const blob = new Blob([xmlContent], { type: 'text/xml' });
                  const url = URL.createObjectURL(blob);
                  
                  // Si navigateur prend en charge l'API Document.write, remplacer le contenu
                  if (document.contentType) {
                    document.write('<?xml version="1.0" encoding="UTF-8"?>' + xmlContent);
                    document.close();
                  }
                }
              }
            `
          }} />
        </>
      );
    } else {
      // Afficher un état de chargement pendant la génération du XML
      return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Génération du sitemap XML en cours...</p>
        </div>
      );
    }
  }

  // Pour tout autre chemin que /sitemap.xml (et sans /sitemap.xml/ qui est redirigé)
  return null;
};

export default SitemapXML;
