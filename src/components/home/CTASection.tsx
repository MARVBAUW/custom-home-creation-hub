
import React from 'react';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { Check } from 'lucide-react';

const features = [
  "Écoute attentive de vos besoins",
  "Solutions innovantes et durables",
  "Respect strict des délais",
  "Communication fluide tout au long du projet",
  "Maîtrise des coûts et transparence",
  "Accompagnement administratif complet"
];

const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-khaki-50 to-white"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-khaki-100 rounded-full opacity-40 transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-khaki-200 rounded-full opacity-30 transform -translate-x-1/3 translate-y-1/3"></div>
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Notre approche
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Un accompagnement sur mesure pour votre projet
            </h2>
            <p className="text-gray-700 text-lg mb-8">
              Chez Progineer, nous croyons qu'un projet réussi commence par une écoute attentive de vos besoins. Notre équipe d'experts vous accompagne à chaque étape, de la conception à la livraison.
            </p>
            
            <div className="mb-8">
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-khaki-100 flex items-center justify-center mt-1 mr-3">
                      <Check className="h-3 w-3 text-khaki-700" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/estimation">Estimer mon projet</Button>
              <Button href="/contact" variant="outline">Prendre rendez-vous</Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1600566753376-12c8ab8e17a5?q=80&w=2070&auto=format&fit=crop" 
                alt="Maison contemporaine avec grande baie vitrée" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 p-6 bg-white rounded-xl shadow-lg border border-gray-100 max-w-xs">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-500">Projet livré</div>
                <div className="px-2 py-1 text-xs bg-khaki-100 text-khaki-800 rounded-full">Marseille</div>
              </div>
              <h3 className="text-lg font-semibold mb-1">Villa contemporaine</h3>
              <p className="text-sm text-gray-600">Construction neuve avec piscine et vue panoramique</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CTASection;
