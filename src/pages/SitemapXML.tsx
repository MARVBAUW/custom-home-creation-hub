
import React, { useEffect, useState } from 'react';
import { publicRoutes } from '../routes/publicRoutes';
import { Helmet } from 'react-helmet-async';
import { Navigate, useLocation, Link } from 'react-router-dom';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';

// This component handles the XML sitemap and redirects if necessary
const SitemapXML: React.FC = () => {
  const [xmlContent, setXmlContent] = useState<string>('');
  const location = useLocation();
  const currentPath = location.pathname;
  
  // If the URL has a trailing slash after "sitemap.xml", redirect to the version without slash
  if (currentPath.match(/\/sitemap\.xml\/?\/$/)) {
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
        .filter(route => route.path && route.path !== '*' && !route.path.includes('*'))
        .forEach(route => {
          // Route path cleanup - ensure no trailing slash
          const path = route.path.replace(/\/$/, '');
          
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

  // If accessing /sitemap.xml directly (with or without trailing slash), serve as pure XML
  if (currentPath === '/sitemap.xml' || currentPath === '/sitemap.xml/') {
    useEffect(() => {
      // Only proceed if we have XML content
      if (!xmlContent) return;
      
      try {
        // Replace the entire HTML with XML content
        document.open();
        document.write(xmlContent);
        document.close();
        
        // Set the proper Content-Type via meta tag
        const meta = document.createElement('meta');
        meta.httpEquiv = 'Content-Type';
        meta.content = 'text/xml; charset=utf-8';
        document.head.appendChild(meta);
      } catch (e) {
        console.error('Error serving XML:', e);
      }
    }, [xmlContent]);
    
    // Return empty React fragment
    return <></>;
  }

  // For other routes, display as a normal page with UI
  return (
    <>
      <SEO 
        title="Plan du site XML - Progineer | Architecture et maîtrise d'oeuvre en PACA"
        description="Consultez le plan du site XML de Progineer, fichier sitemap.xml pour les moteurs de recherche. Notre entreprise d'architecture et de maîtrise d'œuvre en PACA."
        keywords="sitemap xml, plan du site xml, progineer sitemap, xml sitemap progineer, seo xml"
        canonicalUrl="https://progineer.fr/sitemap.xml"
      />
      
      <Container className="py-16 min-h-screen">
        <div className="mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Plan du site XML</h1>
          <p className="mb-6">Consultez ci-dessous toutes les pages de notre site web au format XML pour les moteurs de recherche :</p>
          
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
          
          <div className="mt-8 flex justify-between items-center">
            <Link to="/" className="text-progineer-gold hover:underline flex items-center">
              ← Retour à la page d'accueil
            </Link>
            <Link to="/contact" className="text-progineer-gold hover:underline flex items-center">
              Nous contacter →
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SitemapXML;
