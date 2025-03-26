
import React from 'react';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import { ArrowRight } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { useTheme } from '@/hooks/use-theme';

const Hero = () => {
  const { theme } = useTheme();
  
  return (
    <section className="relative min-h-screen flex items-center py-24 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50 z-10"></div>
        {theme === 'light' ? (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url('/lovable-uploads/301cd50b-4d12-403c-81c4-ef16c1deb588.png')`,
              backgroundPosition: 'center',
            }}
          ></div>
        ) : (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url('/lovable-uploads/54a0affa-2d4b-4a87-95da-bcf043f41c54.png')`,
              backgroundPosition: 'center',
            }}
          ></div>
        )}
      </div>
      
      <Container className="relative z-10 mt-16">
        <div className="flex flex-col items-center animate-fade-in">
          {/* Centered metallic logo - LARGER */}
          <div className="w-full flex justify-center mb-16">
            <Logo variant="metallic-full" size="xl" className="mx-auto scale-150 transform" withTagline={true} />
          </div>
          
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-progineer-gold/30 backdrop-blur-sm text-white text-sm font-medium">
            Architecte & Maître d'œuvre en PACA
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-rare tracking-wide text-white leading-tight mb-6 text-center">
            Design et construction <br className="hidden md:block" />
            <span className="text-progineer-gold">de maisons sur mesure</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl text-center">
            Progineer vous accompagne dans tous vos projets de construction, rénovation et extension à Marseille et dans toute la région PACA.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/estimation" size="lg" className="font-medium bg-progineer-gold hover:bg-progineer-gold/90 text-white shadow-lg">
              Estimer mon projet
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button href="/prestations-maitre-oeuvre" variant="outline" size="lg" className="bg-white/20 border-white/50 text-white hover:bg-white/30 shadow-lg">
              Découvrir nos prestations
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
