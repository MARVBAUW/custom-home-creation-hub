
import React from 'react';
import { Helmet } from 'react-helmet';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';

const Estimation = () => {
  return (
    <>
      <Helmet>
        <title>Estimer votre projet de construction ou rénovation | Progineer</title>
        <meta name="description" content="Estimez gratuitement votre projet de construction, rénovation ou extension avec Progineer, maître d'œuvre en région PACA." />
        <meta name="keywords" content="estimation projet construction, devis travaux PACA, coût maison sur mesure, estimation rénovation Marseille" />
      </Helmet>

      {/* Hero section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="md">
          <div className="text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Estimation
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              Estimez votre projet en quelques clics
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Notre outil d'estimation vous donne une idée du budget nécessaire pour votre projet 
              de construction, rénovation ou extension en région PACA.
            </p>
          </div>
        </Container>
      </section>

      {/* Estimation form placeholder section */}
      <section className="py-16">
        <Container size="md">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Formulaire d'estimation
            </h2>
            
            <div className="text-center text-gray-500 p-12">
              <p className="mb-4">Le formulaire d'estimation interactif sera bientôt disponible.</p>
              <p>En attendant, contactez-nous pour obtenir une estimation personnalisée.</p>
            </div>
            
            <div className="mt-8 flex justify-center">
              <Button href="/contact">Nous contacter</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* SEO Footer */}
      <section className="py-8 bg-stone-50 border-t border-stone-200 mt-16">
        <Container>
          <div className="text-sm text-stone-500">
            <p>
              Ingénieur, maître d'œuvre à Marseille et en PACA – Spécialiste en construction de maisons sur mesure, rénovation et extension. Estimation précise de vos projets par nos architectes et ingénieurs.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Estimation;
