
import React from 'react';
import Container from '@/components/common/Container';
import TallyEstimationForm from './TallyEstimationForm';

const EstimationTrustMetrics = () => {
  return (
    <section className="py-16 bg-progineer-light/70">
      <Container size="md">
        <h2 className="text-2xl md:text-3xl font-rare tracking-wide mb-6 text-center text-progineer-gold">
          Notre expertise en chiffres
        </h2>
        
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="text-center p-4">
            <p className="text-4xl font-bold text-progineer-gold mb-2">+50</p>
            <p className="text-progineer-dark/80 px-[10px] font-thin">Références de projets réalisés</p>
          </div>
          
          <div className="text-center p-4">
            <p className="text-4xl font-bold text-progineer-gold mb-2">98%</p>
            <p className="text-progineer-dark/80">Clients satisfaits</p>
          </div>
          
          <div className="text-center p-4">
            <p className="text-4xl font-bold text-progineer-gold mb-2">5+</p>
            <p className="text-progineer-dark/80">Années d'expérience</p>
          </div>
          
          <div className="text-center p-4">
            <p className="text-4xl font-bold text-progineer-gold mb-2">+10</p>
            <p className="text-progineer-dark/80">Villes couvertes</p>
          </div>
        </div>
        
        <div className="text-center">
          <p className="mb-6 text-progineer-dark/80 max-w-2xl mx-auto">
            Faites confiance à notre équipe d'experts pour vous accompagner dans votre projet de construction ou de rénovation en région PACA.
          </p>
          <TallyEstimationForm />
        </div>
      </Container>
    </section>
  );
};

export default EstimationTrustMetrics;
