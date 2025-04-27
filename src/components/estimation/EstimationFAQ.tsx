
import React from 'react';
import Container from '@/components/common/Container';
import TallyEstimationForm from './TallyEstimationForm';

const EstimationFAQ = () => {
  return (
    <section className="py-16 bg-white">
      <Container size="md">
        <h2 className="text-2xl md:text-3xl font-rare tracking-wide mb-10 text-center text-progineer-gold">
          Questions fréquentes sur nos estimations
        </h2>
        
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="border-b border-progineer-gold/20 pb-4">
            <h3 className="text-xl font-medium mb-2 text-progineer-dark">Comment est calculée l'estimation de mon projet ?</h3>
            <p className="text-progineer-dark/80">Notre équipe utilise des données précises du marché immobilier en PACA et prend en compte tous les aspects de votre projet : surface, matériaux, complexité, localisation, etc. pour vous fournir une estimation réaliste.</p>
          </div>
          
          <div className="border-b border-progineer-gold/20 pb-4">
            <h3 className="text-xl font-medium mb-2 text-progineer-dark">Combien de temps faut-il pour recevoir mon estimation ?</h3>
            <p className="text-progineer-dark/80">Vous recevrez votre estimation détaillée sous 24h ouvrées après réception de votre demande complète.</p>
          </div>
          
          <div className="border-b border-progineer-gold/20 pb-4">
            <h3 className="text-xl font-medium mb-2 text-progineer-dark">L'estimation est-elle vraiment gratuite ?</h3>
            <p className="text-progineer-dark/80">Oui, notre service d'estimation est 100% gratuit et sans engagement. C'est notre façon de vous aider à mieux planifier votre projet.</p>
          </div>
          
          <div className="border-b border-progineer-gold/20 pb-4">
            <h3 className="text-xl font-medium mb-2 text-progineer-dark">Dans quelles villes intervenez-vous en PACA ?</h3>
            <p className="text-progineer-dark/80">Nous intervenons dans toutes les principales villes de la région PACA : Marseille, Nice, Toulon, Aix-en-Provence, Cannes, Antibes, Fréjus, Saint-Raphaël, et bien d'autres.</p>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <TallyEstimationForm />
        </div>
      </Container>
    </section>
  );
};

export default EstimationFAQ;
