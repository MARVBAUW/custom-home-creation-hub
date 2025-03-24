
import React from 'react';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center py-24 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop')`,
            backgroundPosition: 'center',
          }}
        ></div>
      </div>
      
      <Container className="relative z-10 mt-16">
        <div className="max-w-3xl animate-fade-in">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-200/90 backdrop-blur-sm text-khaki-900 text-sm font-medium">
            Architecte & Maître d'œuvre en PACA
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
            Design et construction <br className="hidden md:block" />
            <span className="text-khaki-300">de maisons sur mesure</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
            Progineer vous accompagne dans tous vos projets de construction, rénovation et extension à Marseille et dans toute la région PACA.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/estimation" size="lg" className="font-medium">
              Estimer mon projet
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button href="/prestations-maitre-oeuvre" variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              Découvrir nos prestations
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
