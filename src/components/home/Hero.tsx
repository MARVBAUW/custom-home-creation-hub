import React from 'react';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import { ArrowRight } from 'lucide-react';
import Logo from '@/components/common/Logo';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center py-24 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')`,
            backgroundPosition: 'center',
          }}
        ></div>
      </div>
      
      <Container className="relative z-10 mt-16">
        <div className="flex flex-col items-start animate-fade-in">
          <div className="w-full flex justify-center mb-12">
            <Logo variant="metallic-full" size="lg" className="mx-auto" />
          </div>
          
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-progineer-gold/30 backdrop-blur-sm text-white text-sm font-medium">
            Maître d'œuvre à Marseille
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-rare tracking-wide text-white leading-tight mb-6 text-left">
            Votre maître d'œuvre expert à <br className="hidden md:block" />
            <span className="text-progineer-gold">Marseille et en PACA</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl text-left">
            Coordination des corps de métier, respect des délais et expertise technique pour vos projets de construction et rénovation. Un accompagnement sur mesure par votre maître d'ouvrage à Marseille.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/estimation" size="lg" variant="estimation" className="font-medium">
              Estimer mon projet
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button href="/prestations-maitre-oeuvre" variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              Découvrir nos prestations
            </Button>
          </div>

          {/* Key features section - Updated layout and visual hierarchy */}
          <div className="w-full mt-16 p-8 rounded-2xl bg-gradient-to-br from-black/30 to-black/10 backdrop-blur-sm border border-white/20 shadow-lg">
            <h3 className="text-white/90 font-medium mb-8 text-center">Nos engagements pour votre projet</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="group flex items-center space-x-3 text-white/80 hover:text-white transition-all duration-300 hover:-translate-y-1">
                <div className="w-2 h-2 bg-progineer-gold rounded-full flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                <span className="group-hover:text-progineer-gold transition-colors duration-300">Coordination des corps de métier</span>
              </div>
              <div className="group flex items-center space-x-3 text-white/80 hover:text-white transition-all duration-300 hover:-translate-y-1">
                <div className="w-2 h-2 bg-progineer-gold rounded-full flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                <span className="group-hover:text-progineer-gold transition-colors duration-300">Respect des délais garantis</span>
              </div>
              <div className="group flex items-center space-x-3 text-white/80 hover:text-white transition-all duration-300 hover:-translate-y-1">
                <div className="w-2 h-2 bg-progineer-gold rounded-full flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                <span className="group-hover:text-progineer-gold transition-colors duration-300">Expertise technique</span>
              </div>
              <div className="group flex items-center space-x-3 text-white/80 hover:text-white transition-all duration-300 hover:-translate-y-1">
                <div className="w-2 h-2 bg-progineer-gold rounded-full flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                <span className="group-hover:text-progineer-gold transition-colors duration-300">Maîtrise d'œuvre complète</span>
              </div>
              <div className="group flex items-center space-x-3 text-white/80 hover:text-white transition-all duration-300 hover:-translate-y-1">
                <div className="w-2 h-2 bg-progineer-gold rounded-full flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                <span className="group-hover:text-progineer-gold transition-colors duration-300">Choix des matériaux</span>
              </div>
              <div className="group flex items-center space-x-3 text-white/80 hover:text-white transition-all duration-300 hover:-translate-y-1">
                <div className="w-2 h-2 bg-progineer-gold rounded-full flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                <span className="group-hover:text-progineer-gold transition-colors duration-300">Projets de rénovation</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
