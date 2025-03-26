
import React from 'react';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { ArrowRight } from 'lucide-react';

const ProjectsSection = () => {
  return (
    <section className="py-20 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-300/50 to-transparent"></div>
      
      <Container>
        <div className="text-center mb-16 max-w-2xl mx-auto reveal">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-progineer-gold/10 text-progineer-gold text-sm font-medium">
            Nos réalisations
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Découvrez nos projets récents
          </h2>
          <div className="h-1 w-16 bg-progineer-gold mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">
            Une sélection de nos réalisations en matière de construction, rénovation et extension dans la région PACA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal">
          {/* Project 1 */}
          <div className="group relative overflow-hidden rounded-xl shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
              alt="Villa contemporaine à Martigues" 
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <div className="text-xs font-medium text-progineer-gold mb-2">Martigues</div>
              <h3 className="text-xl font-semibold text-white mb-1">Villa Contemporaine</h3>
              <p className="text-white/80 text-sm mb-3">Construction neuve</p>
              <Button 
                href="/realisations-architecte-maison/villa-contemporaine" 
                className="text-xs px-3 py-1 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30"
              >
                Voir le projet
              </Button>
            </div>
          </div>

          {/* Project 2 */}
          <div className="group relative overflow-hidden rounded-xl shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" 
              alt="Rénovation d'un appartement haussmannien à Marseille" 
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <div className="text-xs font-medium text-progineer-gold mb-2">Marseille</div>
              <h3 className="text-xl font-semibold text-white mb-1">Appartement Haussmannien</h3>
              <p className="text-white/80 text-sm mb-3">Rénovation complète</p>
              <Button 
                href="/realisations-architecte-maison/appartement-haussmannien" 
                className="text-xs px-3 py-1 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30"
              >
                Voir le projet
              </Button>
            </div>
          </div>

          {/* Project 3 */}
          <div className="group relative overflow-hidden rounded-xl shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=2070&auto=format&fit=crop" 
              alt="Extension moderne à Aix-en-Provence" 
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <div className="text-xs font-medium text-progineer-gold mb-2">Aix-en-Provence</div>
              <h3 className="text-xl font-semibold text-white mb-1">Extension Moderne</h3>
              <p className="text-white/80 text-sm mb-3">Extension & rénovation</p>
              <Button 
                href="/realisations-architecte-maison/extension-moderne" 
                className="text-xs px-3 py-1 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30"
              >
                Voir le projet
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button 
            href="/realisations-architecte-maison" 
            variant="outline"
            className="bg-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            Voir toutes nos réalisations
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default ProjectsSection;
