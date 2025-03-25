
import React from 'react';
import SEO from '@/components/common/SEO';
import LegalHero from '@/components/legal/LegalHero';
import LegalContent from '@/components/legal/LegalContent';
import { motion } from 'framer-motion';
import SEOFooter from '@/components/common/SEOFooter';
import { getBusinessStructuredData } from '@/utils/googleBusiness';
import CGVSections from '@/components/legal/CGVSections';

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
        title="Conditions Générales de Vente | Progineer - Architecte & Maître d'œuvre en PACA"
        description="Conditions Générales de Vente de Progineer, entreprise d'architecture et de maîtrise d'œuvre en région PACA. Découvrez les modalités de nos prestations."
        keywords="CGV Progineer, conditions générales vente architecte, CGV maître d'œuvre PACA, contrat architecture, conditions prestation construction"
        canonicalUrl="https://progineer.fr/cgv"
        structuredData={structuredData}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <LegalHero title="Conditions Générales de Vente" />
        
        <LegalContent>
          <CGVSections />
        </LegalContent>
      </motion.div>

      <SEOFooter text="Conditions Générales de Vente de Progineer, maître d'œuvre et architecte en région PACA. Ces CGV régissent les relations contractuelles entre notre société et ses clients pour tous les services de construction, rénovation, extension et aménagement dans les Bouches-du-Rhône, le Var, les Alpes-Maritimes et toute la région PACA." />
    </>
  );
};

export default CGV;
