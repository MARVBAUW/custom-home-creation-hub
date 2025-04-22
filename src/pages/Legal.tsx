
import React from 'react';
import SEO from '@/components/common/SEO';
import LegalHero from '@/components/legal/LegalHero';
import LegalContent from '@/components/legal/LegalContent';
import { motion } from 'framer-motion';
import SEOFooter from '@/components/common/SEOFooter';
import { getBusinessStructuredData } from '@/utils/googleBusiness';
import LegalSections from '@/components/legal/LegalSections';

const Legal = () => {
  // Structured data for WebPage using business data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Mentions légales",
    "description": "Mentions légales de Progineer, entreprise d'architecture et de maîtrise d'œuvre en région PACA.",
    "publisher": {
      "@type": "Organization",
      "name": "Progineer",
      "logo": {
        "@type": "ImageObject",
        "url": "https://progineer.fr/logo.png"
      }
    },
    "url": "https://progineer.fr/mentions-legales",
    "mainEntity": {
      "@type": "WebPageElement",
      "name": "Mentions légales",
      "text": "Informations légales de Progineer, SARL d'architecture et de maîtrise d'œuvre."
    },
    "isPartOf": getBusinessStructuredData()
  };

  return (
    <>
      <SEO 
        title="Mentions légales | Progineer - Architecte & Maître d'œuvre en PACA"
        description="Mentions légales de Progineer, entreprise d'architecture et de maîtrise d'œuvre en région PACA. Informations légales sur notre société."
        keywords="mentions légales Progineer, informations légales architecte, données juridiques maître d'œuvre PACA"
        canonicalUrl="https://progineer.fr/mentions-legales"
        structuredData={structuredData}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <main>
          <h1 className="sr-only">Mentions légales - Progineer, Architecte et Maître d'œuvre en PACA</h1>
          <LegalHero title="Mentions légales" />
          
          <LegalContent>
            <LegalSections />
          </LegalContent>
        </main>
      </motion.div>

      <SEOFooter 
        text="Mentions légales de Progineer. Retrouvez toutes les informations juridiques concernant notre société de maîtrise d'œuvre et d'architecture basée en région PACA. Nous intervenons à Marseille, Nice, Toulon, Cannes et dans toute la région pour vos projets de construction, rénovation et extension."
        additionalKeywords={["informations légales Progineer", "mentions juridiques architecte", "données société maître d'œuvre", "conditions légales PACA", "informations réglementaires construction"]}
      />
    </>
  );
};

export default Legal;
