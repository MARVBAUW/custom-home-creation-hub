
import React from 'react';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { useTheme } from '@/hooks/use-theme';

const CTASection = () => {
  const { theme } = useTheme();
  
  return (
    <section className="py-20 bg-gradient-to-r from-progineer-dark to-progineer-dark/90 text-white relative overflow-hidden">
      {/* Background pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}
      ></div>
      
      <Container>
        <div className="bg-white/10 backdrop-blur-sm p-10 rounded-2xl border border-white/20 shadow-2xl max-w-3xl mx-auto relative z-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-white">
              Prêt à concrétiser votre projet ?
            </h2>
            <div className="h-1 w-20 bg-progineer-gold mx-auto mb-6"></div>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Contactez-nous dès aujourd'hui pour discuter de votre vision et découvrir comment 
              notre expertise peut vous aider à la réaliser.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="/estimation" 
                className={`${theme === 'light' ? 'bg-progineer-gold hover:bg-progineer-gold/90 text-white' : 'bg-white hover:bg-white/90 text-progineer-dark'} shadow-lg border border-progineer-gold/50 text-lg py-3`}
              >
                Estimer mon projet
              </Button>
              <Button 
                href="/contact" 
                variant="outline" 
                className={`${theme === 'light' ? 'bg-transparent border-white text-white hover:bg-white/10' : 'bg-transparent border-white text-white hover:bg-white/10'} shadow-lg text-lg py-3`}
              >
                Nous contacter
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CTASection;
