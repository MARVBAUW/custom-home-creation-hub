
import React, { useEffect, useState } from 'react';
import { publicRoutes } from '../routes/publicRoutes';
import { Helmet } from 'react-helmet';
import { Navigate, useLocation, Link } from 'react-router-dom';
import Container from '@/components/common/Container';

// This component handles the XML sitemap and redirects if necessary
const SitemapXML: React.FC = () => {
  const [xmlContent, setXmlContent] = useState<string>('');
  const location = useLocation();
  const currentPath = location.pathname;
  
  // If the URL has a trailing slash after "sitemap.xml", redirect to the version without slash
  if (currentPath.endsWith('/sitemap.xml/')) {
    return <Navigate to="/sitemap.xml" replace />;
  }
  
  useEffect(() => {
    // Generate the XML content immediately when the component is mounted
    generateSitemapXML();
  }, []);

  const generateSitemapXML = () => {
    try {
      // Current date in ISO format for lastmod
      const currentDate = new Date().toISOString().split('T')[0];
      const baseUrl = 'https://progineer.fr';
      
      // XML declaration and proper namespaces
      const xmlDeclaration = '<?xml version="1.0" encoding="UTF-8"?>\n';
      
      // Create the urlset element with proper namespace declarations
      let xmlString = xmlDeclaration + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' +
                     'xmlns:xhtml="http://www.w3.org/1999/xhtml" ' +
                     'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" ' +
                     'xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';
      
      // Add each route as URL element
      publicRoutes
        .filter(route => route.path && route.path !== '/sitemap.xml' && !route.path.includes('*'))
        .forEach(route => {
          // Route path cleanup
          const path = route.path.endsWith('/') ? route.path.slice(0, -1) : route.path;
          
          // Build full URL
          const fullUrl = `${baseUrl}${path}`;
          
          // Calculate priority based on route depth
          const pathSegments = path.split('/').filter(Boolean);
          const priority = pathSegments.length === 0 ? 1.0 : Math.max(0.3, 1.0 - (pathSegments.length * 0.2));
          const changefreq = priority > 0.6 ? 'monthly' : 'yearly';
          
          // Create URL element directly as string
          xmlString += '  <url>\n';
          xmlString += `    <loc>${fullUrl}</loc>\n`;
          xmlString += `    <lastmod>${currentDate}</lastmod>\n`;
          xmlString += `    <changefreq>${changefreq}</changefreq>\n`;
          xmlString += `    <priority>${priority.toFixed(1)}</priority>\n`;
          
          // Add canonical and hreflang references
          xmlString += `    <xhtml:link rel="alternate" hreflang="fr" href="${fullUrl}"/>\n`;
          xmlString += `    <xhtml:link rel="canonical" href="${fullUrl}"/>\n`;
          
          xmlString += '  </url>\n';
        });
      
      // Close urlset element
      xmlString += '</urlset>';
      
      // Set XML content to state
      setXmlContent(xmlString);
    } catch (error) {
      console.error('Error generating XML sitemap:', error);
      setXmlContent(`<!-- Error generating sitemap: ${error} -->`);
    }
  };

  // If accessing /sitemap.xml directly, serve as pure XML
  if (currentPath === '/sitemap.xml') {
    return (
      <>
        <Helmet>
          <meta httpEquiv="Content-Type" content="text/xml; charset=utf-8" />
          <meta name="robots" content="index, follow" />
          <title>Sitemap XML - Progineer</title>
        </Helmet>
        <pre 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            margin: 0,
            padding: 0,
            border: 'none',
            backgroundColor: 'white',
            color: 'black'
          }}
          dangerouslySetInnerHTML={{ __html: xmlContent }}
        />
      </>
    );
  }

  // Autrement, afficher comme une page normale avec l'UI autour
  return (
    <>
      <Helmet>
        <title>Plan du site XML - Progineer</title>
        <meta httpEquiv="Content-Type" content="text/xml; charset=utf-8" />
        <meta name="robots" content="noindex, follow" />
        <meta name="description" content="Plan du site XML pour Progineer, entreprise d'architecture et de maîtrise d'œuvre en PACA." />
      </Helmet>
      
      <Container className="py-16 min-h-screen">
        <div className="mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Plan du site</h1>
          <p className="mb-6">Consultez ci-dessous toutes les pages de notre site web :</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Pages principales</h2>
              <ul className="space-y-2">
                <li><Link to="/" className="text-progineer-gold hover:underline">Accueil</Link></li>
                <li><Link to="/estimation" className="text-progineer-gold hover:underline">Estimer mon projet</Link></li>
                <li><Link to="/contact" className="text-progineer-gold hover:underline">Nous contacter</Link></li>
                <li><Link to="/a-propos" className="text-progineer-gold hover:underline">À propos</Link></li>
                <li><Link to="/realisations-architecte-maison" className="text-progineer-gold hover:underline">Nos réalisations</Link></li>
                <li><Link to="/equipe-maitrise-oeuvre" className="text-progineer-gold hover:underline">Notre équipe</Link></li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Nos prestations</h2>
              <ul className="space-y-2">
                <li><Link to="/prestations-maitre-oeuvre" className="text-progineer-gold hover:underline">Prestations (aperçu)</Link></li>
                <li><Link to="/prestations-maitre-oeuvre/construction-neuve" className="text-progineer-gold hover:underline">Construction neuve</Link></li>
                <li><Link to="/prestations-maitre-oeuvre/renovation" className="text-progineer-gold hover:underline">Rénovation</Link></li>
                <li><Link to="/prestations-maitre-oeuvre/extension" className="text-progineer-gold hover:underline">Extension</Link></li>
                <li><Link to="/prestations-maitre-oeuvre/design-interieur" className="text-progineer-gold hover:underline">Design d'intérieur</Link></li>
                <li><Link to="/prestations-maitre-oeuvre/optimisation-espace" className="text-progineer-gold hover:underline">Optimisation d'espace</Link></li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Informations & Légal</h2>
              <ul className="space-y-2">
                <li><Link to="/faq" className="text-progineer-gold hover:underline">FAQ</Link></li>
                <li><Link to="/parrainage" className="text-progineer-gold hover:underline">Parrainage</Link></li>
                <li><Link to="/devenir-partenaire" className="text-progineer-gold hover:underline">Devenir partenaire</Link></li>
                <li><Link to="/mentions-legales" className="text-progineer-gold hover:underline">Mentions légales</Link></li>
                <li><Link to="/privacy-policy" className="text-progineer-gold hover:underline">Politique de confidentialité</Link></li>
                <li><Link to="/cgu" className="text-progineer-gold hover:underline">CGU</Link></li>
                <li><Link to="/cgv" className="text-progineer-gold hover:underline">CGV</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="bg-stone-100 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Fichier XML du plan du site</h2>
            <p className="mb-4">Pour une utilisation avec les moteurs de recherche, accédez à notre fichier XML via l'URL suivante :</p>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="inline-block bg-progineer-gold text-white px-4 py-2 rounded hover:bg-progineer-gold/90 transition-colors">
              Voir le sitemap.xml
            </a>
          </div>

          <pre className="font-mono text-xs p-4 bg-gray-800 text-gray-200 rounded-lg overflow-auto max-h-96">
            {xmlContent}
          </pre>
        </div>
      </Container>
    </>
  );
};

export default SitemapXML;
