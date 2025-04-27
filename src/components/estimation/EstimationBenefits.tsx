
import React from 'react';
import Container from '@/components/common/Container';
import { Button } from "@/components/ui/button";
import { scrollToForm } from './utils/scrollToForm';

const EstimationBenefits = () => {
  return (
    <section className="py-16 bg-white">
      <Container size="md">
        <h2 className="text-2xl md:text-3xl font-rare tracking-wide mb-10 text-center text-progineer-gold">
          Pourquoi demander une estimation à Progineer ?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-progineer-light/50 p-6 rounded-lg border border-progineer-gold/20 hover:border-progineer-gold/50 transition-all">
            <h3 className="text-xl font-medium mb-3 text-progineer-dark">Estimation précise</h3>
            <p className="text-progineer-dark/80">Nos experts analysent en détail votre projet pour vous fournir un chiffrage réaliste et transparent.</p>
          </div>
          
          <div className="bg-progineer-light/50 p-6 rounded-lg border border-progineer-gold/20 hover:border-progineer-gold/50 transition-all">
            <h3 className="text-xl font-medium mb-3 text-progineer-dark">Réponse rapide</h3>
            <p className="text-progineer-dark/80">Recevez votre estimation détaillée sous 24h pour avancer rapidement dans la réalisation de votre projet.</p>
          </div>
          
          <div className="bg-progineer-light/50 p-6 rounded-lg border border-progineer-gold/20 hover:border-progineer-gold/50 transition-all">
            <h3 className="text-xl font-medium mb-3 text-progineer-dark">Sans engagement</h3>
            <p className="text-progineer-dark/80">Notre service d'estimation est totalement gratuit et ne vous engage à rien. Vous restez libre de votre décision.</p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            onClick={scrollToForm}
            className="bg-progineer-gold hover:bg-progineer-gold/90 text-white"
          >
            Estimer mon projet
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default EstimationBenefits;
