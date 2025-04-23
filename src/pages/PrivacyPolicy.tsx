
import React from 'react';
import SEO from '../components/common/SEO';
import LegalHero from '../components/legal/LegalHero';
import LegalContent from '../components/legal/LegalContent';
import { motion } from 'framer-motion';
import SEOFooter from '../components/common/SEOFooter';
import { getBusinessStructuredData } from '../utils/googleBusiness';

const PrivacyPolicy = () => {
  // Structured data for WebPage using business data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Politique de confidentialité",
    "description": "Politique de confidentialité de Progineer, entreprise de maîtrise d'œuvre en région PACA. Protection de vos données conformément au RGPD.",
    "publisher": {
      "@type": "Organization",
      "name": "Progineer",
      "logo": {
        "@type": "ImageObject",
        "url": "https://progineer.fr/logo.png"
      }
    },
    "url": "https://progineer.fr/privacy-policy",
    "mainEntity": {
      "@type": "WebPageElement",
      "name": "Politique de confidentialité",
      "text": "Politique de confidentialité et traitement des données personnelles de Progineer."
    },
    "isPartOf": getBusinessStructuredData()
  };

  return (
    <>
      <SEO 
        title="Politique de confidentialité | Maître d'œuvre Progineer PACA"
        description="Notre politique de confidentialité détaille comment Progineer protège vos données personnelles conformément au RGPD pour tous vos projets en PACA."
        keywords="politique confidentialité RGPD, protection données maître d'œuvre, traitement données personnelles, confidentialité PACA, droits données clients"
        canonicalUrl="https://progineer.fr/privacy-policy"
        structuredData={structuredData}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <main>
          <h1 className="sr-only">Politique de confidentialité - Progineer, Maître d'œuvre en PACA</h1>
          <LegalHero title="Politique de confidentialité" />
          
          <LegalContent>
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Protection des données personnelles</h2>
                <p>
                  Conformément au Règlement Général sur la Protection des Données (RGPD), 
                  Progineer s'engage à respecter la confidentialité de vos données personnelles.
                  Cette politique de confidentialité explique comment nous recueillons, utilisons 
                  et protégeons vos informations lorsque vous utilisez notre site web ou nos services.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">Collecte des données</h2>
                <p>
                  Nous collectons uniquement les données nécessaires au bon fonctionnement 
                  de nos services et à l'amélioration de votre expérience utilisateur.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">Utilisation des données</h2>
                <p>
                  Les informations recueillies sont utilisées pour vous fournir nos services, 
                  traiter vos demandes et vous tenir informé de nos offres si vous y avez consenti.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">Vos droits</h2>
                <p>
                  Vous disposez d'un droit d'accès, de rectification et de suppression de vos données. 
                  Pour exercer ces droits, contactez-nous via notre formulaire de contact ou par email.
                </p>
              </section>
            </div>
          </LegalContent>
        </main>
      </motion.div>

      <SEOFooter text="Politique de confidentialité de Progineer. Nous respectons vos données personnelles et mettons tout en œuvre pour assurer leur protection conformément au RGPD. Notre entreprise de maîtrise d'œuvre intervient dans toute la région PACA pour vos projets de construction et rénovation." 
      additionalKeywords={["RGPD construction PACA", "protection données client", "confidentialité maître d'œuvre", "sécurité données personnelles", "droits RGPD bâtiment"]}
      />
    </>
  );
};

export default PrivacyPolicy;
