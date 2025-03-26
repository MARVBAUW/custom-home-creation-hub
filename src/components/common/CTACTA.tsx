
import React from 'react';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/hooks/use-theme";

const CTACTA = () => {
  const { toast } = useToast();
  const { theme } = useTheme();

  const handleEstimationClick = () => {
    toast({
      title: "Redirection vers la page d'estimation",
      description: "Vous êtes redirigé vers notre formulaire d'estimation.",
      duration: 3000,
    });
  };

  const handleContactClick = () => {
    toast({
      title: "Redirection vers la page de contact",
      description: "Vous êtes redirigé vers notre formulaire de contact.",
      duration: 3000,
    });
  };

  return (
    <section className="py-16 bg-khaki-600 relative overflow-hidden">
      {/* Arrière-plan avec image */}
      <div className="absolute inset-0 opacity-15 z-0">
        <img 
          src="/lovable-uploads/54a0affa-2d4b-4a87-95da-bcf043f41c54.png" 
          alt="" 
          className="w-full h-full object-cover" 
          aria-hidden="true"
        />
      </div>
      
      <Container>
        <div className="text-center max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl font-semibold mb-6 text-white">
            Prêt à concrétiser votre projet ?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Contactez-nous dès aujourd'hui pour discuter de votre vision et découvrir comment 
            notre expertise peut vous aider à la réaliser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              href="/estimation" 
              onClick={handleEstimationClick}
              className={theme === 'light' ? 'bg-progineer-gold text-white hover:bg-progineer-gold/90' : 'bg-black text-khaki-600 hover:bg-black/90'}
            >
              Estimer mon projet
            </Button>
            <Button 
              href="/contact" 
              onClick={handleContactClick}
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

export default CTACTA;
