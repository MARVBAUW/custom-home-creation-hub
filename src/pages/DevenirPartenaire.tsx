import React from 'react';
import SEO from '@/components/common/SEO';
import Container from '@/components/common/Container';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PartenairesContent from '@/components/partenaires/PartenairesContent';
import PartenairesHero from '@/components/partenaires/PartenairesHero';
import BenefitsSection from '@/components/partenaires/BenefitsSection';
import PartnersSection from '@/components/partenaires/PartnersSection';
import { motion } from 'framer-motion';
import SEOFooter from '@/components/common/SEOFooter';

const DevenirPartenaire = () => {
  return (
    <>
      <SEO 
        title="Devenir Partenaire | Maître d'œuvre Progineer en PACA"
        description="Rejoignez le réseau de partenaires Progineer. Opportunités de collaboration pour artisans, professionnels du BTP et experts de la construction en PACA."
        keywords="partenariat maître d'œuvre, réseau artisans PACA, collaboration construction, artisans bâtiment Marseille, opportunités BTP"
        canonicalUrl="https://progineer.fr/devenir-partenaire"
      />

      <Navbar />

      <main>
        <h1 className="sr-only">Devenir partenaire de Progineer - Réseau de professionnels du bâtiment en PACA</h1>
        <PartenairesHero />

        <motion.section 
          className="py-16 bg-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Container>
            <BenefitsSection />
          </Container>
        </motion.section>

        <motion.section
          className="py-16 bg-stone-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Container>
            <PartnersSection />
          </Container>
        </motion.section>

        <motion.section 
          className="py-16 bg-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Container>
            <PartenairesContent />
          </Container>
        </motion.section>
      </main>

      <SEOFooter text="Programme de partenariat Progineer - Maître d'œuvre en région PACA. Rejoignez notre réseau de professionnels du bâtiment et bénéficiez d'opportunités business, d'une visibilité accrue et d'une collaboration privilégiée pour vos projets en Provence-Alpes-Côte d'Azur." 
      additionalKeywords={["réseau artisans PACA", "partenaires construction Marseille", "collaboration maître d'œuvre", "opportunités sous-traitants bâtiment", "artisans qualifiés Méditerranée"]}
      />
      
      <Footer />
    </>
  );
};

export default DevenirPartenaire;
