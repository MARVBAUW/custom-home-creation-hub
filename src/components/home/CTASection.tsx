
import React from 'react';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { Check } from 'lucide-react';

const features = ["Écoute attentive de vos besoins", "Solutions innovantes et durables", "Respect strict des délais", "Communication fluide tout au long du projet", "Maîtrise des coûts et transparence", "Accompagnement administratif complet"];

const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-progineer-light to-white"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-progineer-gold/10 rounded-full opacity-40 transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-progineer-gold/20 rounded-full opacity-30 transform -translate-x-1/3 translate-y-1/3"></div>
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-zinc-100">
          <div>
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-progineer-gold/10 text-progineer-gold text-sm font-medium">
              Notre approche
            </div>
            <h2 className="text-3xl md:text-4xl font-rare tracking-wide mb-6 text-progineer-dark">
              Un accompagnement sur mesure pour votre projet
            </h2>
            <p className="text-gray-700 text-lg mb-8">
              Chez Progineer, nous croyons qu'un projet réussi commence par une écoute attentive de vos besoins. Notre équipe d'experts vous accompagne à chaque étape, de la conception à la livraison.
            </p>
            
            <div className="mb-8">
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-progineer-gold/20 flex items-center justify-center mt-1 mr-3">
                      <Check className="h-3 w-3 text-progineer-gold" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/estimation" className="bg-progineer-gold hover:bg-progineer-gold/90 text-white">
                Estimer mon projet
              </Button>
              <Button href="/contact" variant="outline" className="border-progineer-gold/50 bg-transparent text-progineer-gold hover:bg-progineer-gold/10">
                Prendre rendez-vous
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="cellule">
              <img 
                alt="Maison contemporaine avec grande baie vitrée" 
                className="w-full h-auto object-cover rounded-xl" 
                src="/lovable-uploads/2ab0f303-213f-43c9-94dc-75e0e8e55718.png" 
              />
            </div>
            <div className="absolute -bottom-6 -right-20 p-6 bg-white rounded-xl shadow-lg border border-progineer-gold/10 max-w-xs">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-500">Projet livré</div>
                <div className="px-2 py-1 text-xs bg-progineer-gold/10 text-progineer-gold rounded-full">Marseille</div>
              </div>
              <h3 className="text-lg font-semibold mb-1 text-progineer-dark">Villa contemporaine</h3>
              <p className="text-sm text-gray-600">Construction neuve avec piscine et vue panoramique</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CTASection;
