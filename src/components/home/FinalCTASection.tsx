
import React from 'react';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const FinalCTASection = () => {
  const { theme } = useTheme();
  
  return (
    <section className={`py-24 relative overflow-hidden ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 to-black' 
        : 'bg-gradient-to-br from-progineer-dark to-progineer-dark/80'
    } text-white`}>
      {/* Background avec pattern */}
      <div 
        className="absolute inset-0 opacity-5 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: "150px",
        }}
      ></div>
      
      <Container>
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <div className="w-20 h-1 bg-progineer-gold mx-auto mb-10"></div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 font-rare tracking-wide">
            Prêt à concrétiser votre projet ?
          </h2>
          
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto">
            Contactez-nous dès aujourd'hui pour discuter de votre vision et découvrir comment 
            notre expertise peut vous aider à la réaliser.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
            <Button 
              href="/estimation" 
              className={`
                px-8 py-6 rounded-lg text-lg group
                ${theme === 'light' 
                  ? 'bg-progineer-gold text-white hover:bg-progineer-gold/90 shadow-lg shadow-black/20' 
                  : 'bg-progineer-gold text-white hover:bg-progineer-gold/90 shadow-lg shadow-black/40'
                }
              `}
              aria-label="Estimer mon projet de construction"
            >
              <span className="mr-2">Estimer mon projet</span>
              <ArrowRight className="inline-block transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            
            <Button 
              href="/contact" 
              variant="outline" 
              className={`
                px-8 py-6 rounded-lg text-lg
                ${theme === 'light' 
                  ? 'bg-white/10 backdrop-blur-sm border-white/40 text-white hover:bg-white/20' 
                  : 'bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10'
                }
              `}
              aria-label="Contacter notre équipe"
            >
              Nous contacter
            </Button>
          </div>
          
          {/* Ajout d'informations de contact directes */}
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <a 
              href="tel:+33491000000" 
              className="flex items-center gap-2 text-white/90 hover:text-white group transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-progineer-gold/20 transition-all duration-300">
                <Phone size={18} className="text-progineer-gold" />
              </div>
              <span>+33 4 91 00 00 00</span>
            </a>
            
            <a 
              href="mailto:contact@progineer.fr" 
              className="flex items-center gap-2 text-white/90 hover:text-white group transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-progineer-gold/20 transition-all duration-300">
                <Mail size={18} className="text-progineer-gold" />
              </div>
              <span>contact@progineer.fr</span>
            </a>
          </div>
        </div>
      </Container>
      
      {/* Élément décoratif */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/20 to-transparent"></div>
    </section>
  );
};

export default FinalCTASection;
