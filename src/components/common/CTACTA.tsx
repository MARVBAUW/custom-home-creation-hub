
import React from 'react';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { useToast } from "@/components/ui/use-toast";

const CTACTA = () => {
  const { toast } = useToast();

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
    <section className="py-16 bg-khaki-600 text-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6">
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
              className="bg-white text-khaki-800 hover:bg-white/90 !text-khaki-800"
            >
              Estimer mon projet
            </Button>
            <Button 
              href="/contact" 
              onClick={handleContactClick}
              variant="outline" 
              className="border-white/30 bg-transparent hover:bg-white/10 !text-white"
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
