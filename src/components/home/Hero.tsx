import React from 'react';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import { ArrowRight } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { useTheme } from '@/hooks/use-theme';
const Hero = () => {
  const {
    theme
  } = useTheme();
  return <section className="relative min-h-screen flex items-center py-24 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50 z-10"></div>
        <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: theme === 'dark' ? 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop")' : 'url("https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop")',
        backgroundPosition: 'center'
      }}></div>
      </div>
      
      <Container className="relative z-10 mt-16">
        <div className="flex flex-col items-center animate-fade-in">
          {/* Logo centré en haut avec une taille ajustée */}
          <div className="mb-8 w-64 md:w-72 lg:w-80">
            <Logo variant="metallic" size="xl" asLink={false} />
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
    </section>;
};
export default Hero;