
import React from 'react';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const FinalCTASection = () => {
  const { theme } = useTheme();
  
  return (
    <section className="py-20 bg-progineer-dark text-white relative overflow-hidden">
      {/* Background avec image */}
      <div className="absolute inset-0 opacity-15 z-0">
        <img 
          src="/lovable-uploads/301cd50b-4d12-403c-81c4-ef16c1deb588.png" 
          alt="" 
          className="w-full h-full object-cover" 
          aria-hidden="true"
        />
      </div>
      
      <Container>
        <div className="text-center max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Prêt à concrétiser votre projet ?
          </h2>
          <div className="h-1 w-20 bg-progineer-gold mx-auto mb-6"></div>
          <p className="text-lg text-white/90 mb-8">
            Contactez-nous dès aujourd'hui pour discuter de votre vision et découvrir comment notre expertise peut vous aider à la réaliser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              href="/estimation" 
              className={theme === 'light' ? 'bg-progineer-gold text-white hover:bg-progineer-gold/90' : 'bg-white text-progineer-dark hover:bg-white/90'}
              aria-label="Estimer mon projet de construction"
            >
              Estimer mon projet
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              href="/contact" 
              variant="outline" 
              className={theme === 'light' ? 'border-white/40 bg-transparent text-white hover:bg-white/10' : 'border-white/40 bg-transparent text-white hover:bg-white/20'}
              aria-label="Contacter notre équipe"
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
