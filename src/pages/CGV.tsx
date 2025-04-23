
import React from 'react';
import SEO from '../components/common/SEO';
import LegalHero from '../components/legal/LegalHero';
import LegalContent from '../components/legal/LegalContent';
import { motion } from 'framer-motion';
import SEOFooter from '../components/common/SEOFooter';
import { getBusinessStructuredData } from '../utils/googleBusiness';
import CGVSections from '../components/legal/CGVSections';

const CGV = () => {
  // Structured data for WebPage with business data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Conditions Générales de Vente",
    "description": "Conditions Générales de Vente de Progineer, entreprise d'architecture et de maîtrise d'œuvre en région PACA.",
    "publisher": {
      "@type": "Organization",
      "name": "Progineer",
      "logo": {
        "@type": "ImageObject",
        "url": "https://progineer.fr/logo.png"
      }
    },
    "url": "https://progineer.fr/cgv",
    "mainEntity": {
      "@type": "WebPageElement",
      "name": "Conditions Générales de Vente",
      "text": "Les présentes Conditions Générales de Vente (CGV) constituent le socle de la relation commerciale entre la société Progineer (ci-après \"le Prestataire\") et ses clients professionnels ou particuliers (ci-après \"le Client\")."
    },
    "isPartOf": getBusinessStructuredData()
  };

  return (
    <>
      <SEO 
        title="Conditions Générales de Vente | Maître d'œuvre Progineer PACA"
        description="Conditions Générales de Vente de Progineer, entreprise de maîtrise d'œuvre en PACA. Modalités contractuelles pour nos services de construction et rénovation."
        keywords="CGV maître d'œuvre, conditions générales vente Progineer, contrat construction PACA, conditions services rénovation, clauses contractuelles"
        canonicalUrl="https://progineer.fr/cgv"
        structuredData={structuredData}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <main>
          <h1 className="sr-only">Conditions Générales de Vente - Progineer, Maître d'œuvre en PACA</h1>
          <LegalHero title="Conditions Générales de Vente" />
          
          <LegalContent>
            <CGVSections />
          </LegalContent>
        </main>
      </motion.div>

      <SEOFooter text="Conditions Générales de Vente de Progineer, maître d'œuvre et architecte en région PACA. Ces CGV régissent les relations contractuelles entre notre société et ses clients pour tous les services de construction, rénovation, extension et aménagement dans les Bouches-du-Rhône, le Var, les Alpes-Maritimes et toute la région PACA." 
      additionalKeywords={["clauses contractuelles construction", "conditions rénovation PACA", "engagements maître d'œuvre", "contrat prestation bâtiment", "modalités paiement travaux"]}
      />
    </>
  );
};

export default CGV;
