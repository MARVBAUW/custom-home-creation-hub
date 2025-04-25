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
    "description": "Mentions légales de Progineer, entreprise de maîtrise d'œuvre en région PACA. Informations juridiques et réglementaires.",
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
      "text": "Informations légales de Progineer, SARL de maîtrise d'œuvre en PACA."
    },
    "isPartOf": getBusinessStructuredData()
  };

  return (
    <>
      <SEO 
        title="Mentions légales | Maître d'œuvre Progineer PACA"
        description="Mentions légales de Progineer, entreprise de maîtrise d'œuvre à Marseille et en PACA. Informations juridiques obligatoires concernant notre entreprise."
        keywords="mentions légales maître d'œuvre, informations juridiques Progineer, statut entreprise PACA, responsabilité éditoriale, informations société construction"
        canonicalUrl="https://progineer.fr/mentions-legales"
        structuredData={structuredData}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <main>
          <h1 className="sr-only">Mentions légales - Progineer, Maître d'œuvre en PACA</h1>
          <LegalHero title="Mentions légales" />
          
          <LegalContent>
            <LegalSections />
          </LegalContent>
        </main>
      </motion.div>

      <SEOFooter 
        text="Mentions légales de Progineer. Retrouvez toutes les informations juridiques concernant notre société de maîtrise d'œuvre basée en région PACA. Nous intervenons à Marseille, Nice, Toulon, Cannes et dans toute la région pour vos projets de construction, rénovation et extension."
        additionalKeywords={["informations légales entreprise", "statut juridique maître d'œuvre", "dirigeants société construction", "hébergement site PACA", "données entreprise bâtiment"]}
      />
    </>
  );
};

export default Legal;
