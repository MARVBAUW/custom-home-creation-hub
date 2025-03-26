
import React from 'react';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { ArrowRight } from 'lucide-react';

const FinalCTASection = () => {
  return (
    <section className="py-20 bg-progineer-dark text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23D4AF37\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <Container>
        <div className="text-center max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Prêt à concrétiser votre projet ?
          </h2>
          <div className="h-1 w-20 bg-progineer-gold mx-auto mb-6"></div>
          <p className="text-lg text-white/90 mb-8">
            Contactez notre équipe d'architectes et de maîtres d'œuvre pour transformer votre vision en réalité.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              href="/estimation" 
              className="bg-progineer-gold text-white hover:bg-progineer-gold/90 shadow-lg border border-progineer-gold/50 text-lg py-3"
            >
              Estimer mon projet
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              href="/contact" 
              variant="outline" 
              className="border-white/40 bg-white/10 hover:bg-white/20 shadow-lg text-lg py-3"
            >
              Nous contacter
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FinalCTASection;
