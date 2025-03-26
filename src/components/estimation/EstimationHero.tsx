
import React from 'react';
import Container from '@/components/common/Container';
import Logo from '@/components/common/Logo';
import EstimationForm from './EstimationForm';

const EstimationHero = () => {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-b from-progineer-light to-white">
      <Container size="md">
        <div className="text-center">
          <Logo variant="metallic" size="lg" className="mx-auto mb-6" withTagline />
          
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-progineer-gold/10 text-progineer-gold text-sm font-medium">
            Estimation Gratuite
          </div>
          
          <h1 className="text-4xl md:text-5xl font-rare tracking-wide mb-6 text-progineer-dark">
            Estimez gratuitement votre projet<br className="hidden md:block" /> 
            <span className="text-progineer-gold">de construction en PACA</span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 speakable">
            Notre outil d'estimation vous donne une idée précise du budget nécessaire pour votre projet 
            de construction, rénovation ou extension en région PACA. Recevez un devis détaillé en 24h.
          </p>
          
          <EstimationForm />
        </div>
      </Container>
    </section>
  );
};

export default EstimationHero;
