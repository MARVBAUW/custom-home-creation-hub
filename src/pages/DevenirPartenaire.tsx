
import React from 'react';
import SEO from '@/components/common/SEO';
import Container from '@/components/common/Container';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PartenairesContent from '@/components/partenaires/PartenairesContent';
import { motion } from 'framer-motion';
import SEOFooter from '@/components/common/SEOFooter';
import CTACTA from '@/components/common/CTACTA';

const DevenirPartenaire = () => {
  return (
    <>
      <SEO 
        title="Devenir Partenaire | Progineer - Architecte & Maître d'œuvre en PACA"
        description="Rejoignez le réseau de partenaires professionnels de Progineer. Opportunités pour artisans, professionnels du BTP et experts de la construction en PACA."
        keywords="partenariat architecte, réseau artisans PACA, collaboration maître d'œuvre, opportunités BTP, partenaire construction"
        canonicalUrl="https://progineer.fr/devenir-partenaire"
      />

      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container>
          <div className="text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Réseau de Partenaires
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              Rejoignez notre réseau de partenaires
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Développez votre activité en vous associant à Progineer. Bénéficiez d'opportunités de projets et d'une visibilité accrue.
            </p>
          </div>
        </Container>
      </section>

      <motion.section 
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container>
          <PartenairesContent />
        </Container>
      </motion.section>

      <CTACTA />

      <SEOFooter text="Programme de partenariat Progineer - Architecte et maître d'œuvre en région PACA. Rejoignez notre réseau de professionnels du bâtiment et bénéficiez d'opportunités business, d'une visibilité accrue et d'une collaboration privilégiée pour vos projets de construction et rénovation en Provence-Alpes-Côte d'Azur." />
      
      <Footer />
    </>
  );
};

export default DevenirPartenaire;
