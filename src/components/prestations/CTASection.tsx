
import React from 'react';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';

const CTASection = () => {
  return (
    <section className="py-16 bg-khaki-600">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6 text-white">
            Prêt à concrétiser votre projet ?
          </h2>
          <p className="text-xl opacity-90 mb-8 text-white">
            Contactez notre équipe pour discuter de vos besoins et obtenir un devis personnalisé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              href="/estimation" 
              className="bg-white text-khaki-800 hover:bg-white/90"
            >
              Estimer mon projet
            </Button>
            <Button 
              href="/contact" 
              variant="outline" 
              className="border-white/30 bg-transparent hover:bg-white/10 text-white"
            >
              Nous contacter
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CTASection;
