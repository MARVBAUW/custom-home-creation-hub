import React from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '../components/common/Container';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';

const Sitemap = () => {
  // Structure des liens du site
  const siteStructure = [
    {
      title: 'Pages Principales',
      links: [
        { href: '/', name: 'Accueil' },
        { href: '/prestations-maitre-oeuvre', name: 'Prestations' },
        { href: '/realisations-architecte-maison', name: 'Réalisations' },
        { href: '/equipe-maitrise-oeuvre', name: 'Équipe' },
        { href: '/estimation', name: 'Estimation' },
        { href: '/contact', name: 'Contact' },
      ]
    },
    {
      title: 'Services',
      links: [
        { href: '/parrainage', name: 'Parrainage' },
        { href: '/devenir-partenaire', name: 'Devenir Partenaire' },
        { href: '/workspace', name: 'Espace de Travail' },
      ]
    },
    {
      title: 'Calculateurs',
      links: [
        { href: '/workspace', name: 'Tous les calculateurs' },
        { href: '/workspace/calculateurs', name: 'Calculateurs financiers' },
        { href: '/workspace/calculateurs/eurocode', name: 'Calculateurs Eurocode' },
      ]
    },
    {
      title: 'Mentions Légales',
      links: [
        { href: '/mentions-legales', name: 'Mentions Légales' },
        { href: '/privacy-policy', name: 'Politique de Confidentialité' },
        { href: '/cgu', name: 'Conditions Générales d\'Utilisation' },
        { href: '/cgv', name: 'Conditions Générales de Vente' },
        { href: '/faq', name: 'Foire Aux Questions' },
      ]
    }
  ];

  return (
    <>
      <SEO 
        title="Plan du site Progineer | Architecture et maîtrise d'oeuvre en PACA"
        description="Consultez le plan du site Progineer et accédez facilement à toutes nos pages. Services de maîtrise d'oeuvre, architecture, calculateurs et outils professionnels."
        keywords="plan du site, sitemap, progineer, maître d'oeuvre PACA, architecture, calculateurs structures, eurocode"
        canonicalUrl="https://progineer.fr/sitemap"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": "https://progineer.fr/",
          "name": "Progineer - Architecture et Maîtrise d'Œuvre",
          "description": "Entreprise d'architecture et de maîtrise d'œuvre en PACA proposant des services de construction, rénovation et extension.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://progineer.fr/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "hasPart": [
            ...siteStructure.flatMap(section => 
              section.links.map(link => ({
                "@type": "WebPage",
                "url": `https://progineer.fr${link.href}`,
                "name": link.name,
                "isPartOf": {
                  "@type": "WebSite",
                  "url": "https://progineer.fr/"
                }
              }))
            )
          ]
        }}
      />

      <section className="py-16 bg-white dark:bg-gray-950">
        <Container size="lg">
          <h1 className="text-3xl md:text-4xl font-semibold mb-8 text-gray-900 dark:text-white">
            Plan du site
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {siteStructure.map((section, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-medium mb-4 text-gray-800 dark:text-gray-100">{section.title}</h2>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        to={link.href} 
                        className="text-khaki-600 hover:text-khaki-800 dark:text-khaki-400 dark:hover:text-khaki-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-sm">
            <h2 className="text-xl font-medium mb-4 text-gray-800 dark:text-gray-100">Ressources XML</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Pour les moteurs de recherche et l'indexation automatique, nous proposons également une version XML du sitemap.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="/sitemap.xml" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block px-4 py-2 rounded bg-khaki-600 text-white hover:bg-khaki-700 transition-colors"
              >
                Voir le sitemap XML
              </a>
              <a 
                href="/sitemap.xml"
                download="sitemap.xml"
                className="inline-block px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Télécharger le sitemap XML
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Sitemap;
