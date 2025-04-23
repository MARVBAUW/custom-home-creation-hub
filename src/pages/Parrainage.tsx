
import React from 'react';
import SEO from '@/components/common/SEO';
import Container from '@/components/common/Container';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ParrainageContent from '@/components/parrainage/ParrainageContent';
import ParrainageForm from '@/components/parrainage/ParrainageForm';
import { motion } from 'framer-motion';
import SEOFooter from '@/components/common/SEOFooter';

const Parrainage = () => {
  return (
    <>
      <SEO 
        title="Programme de Parrainage | Maître d'œuvre Progineer en PACA"
        description="Participez à notre programme de parrainage et recevez jusqu'à 800€ en recommandant Progineer, votre maître d'œuvre pour vos projets en PACA."
        keywords="parrainage maître d'œuvre, programme recommandation PACA, prime parrainage construction, recommander artisan, bonus recommandation"
        canonicalUrl="https://progineer.fr/parrainage"
      />

      <Navbar />

      <main>
        <h1 className="sr-only">Programme de parrainage Progineer - Recommandez et gagnez des primes</h1>
        <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
          <Container>
            <div className="text-center">
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
                Programme de Parrainage
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold mb-6">
                Recommandez-nous et soyez récompensé
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Partagez votre expérience avec Progineer et recevez une prime pour chaque personne qui devient client grâce à vous.
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
            <ParrainageContent />
          </Container>
        </motion.section>

        <motion.section 
          className="py-16 bg-khaki-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Container size="sm">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <ParrainageForm />
            </div>
          </Container>
        </motion.section>
      </main>

      <SEOFooter text="Programme de parrainage Progineer - Maître d'œuvre en région PACA. Recommandez nos services de construction et rénovation à votre entourage et recevez une prime allant jusqu'à 800€ par projet concrétisé. Offre valable à Marseille, Nice, Toulon et dans toute la région PACA." 
      additionalKeywords={["prime parrainage construction", "bonus recommandation travaux", "offre parrainage PACA", "récompense recommandation ami", "programme fidélité bâtiment"]}
      />
      
      <Footer />
    </>
  );
};

export default Parrainage;
