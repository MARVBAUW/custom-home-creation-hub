
import React from 'react';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import { ArrowRight } from 'lucide-react';
import Logo from '@/components/common/Logo';

const Hero = () => {
  return (
    <>
      <section className="relative min-h-[90vh] flex items-center py-24 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')`,
              backgroundPosition: 'center',
            }}
          ></div>
        </div>
        
        <Container className="relative z-10 mt-16">
          <div className="flex flex-col items-start animate-fade-in">
            <div className="w-full flex justify-center mb-12">
              <Logo variant="metallic-full" size="lg" className="mx-auto" />
            </div>
            
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-progineer-gold/30 backdrop-blur-sm text-white text-sm font-medium">
              Maître d'œuvre à Marseille
            </div>
            
            {/* Use h2 here since h1 is already in Index.tsx */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-rare tracking-wide text-white leading-tight mb-6 text-left">
              Votre maître d'œuvre expert à <br className="hidden md:block" />
              <span className="text-progineer-gold">Marseille et en PACA</span>
            </h2>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl text-left">
              Coordination des corps de métier, respect des délais et expertise technique pour vos projets de construction et rénovation. Un accompagnement sur mesure par votre maître d'ouvrage à Marseille.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/estimation" size="lg" variant="estimation" className="font-medium">
                Estimer mon projet
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button href="/prestations-maitre-oeuvre" variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                Découvrir nos prestations
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Key features section - Moved outside of the hero section */}
      <section className="py-16 bg-gray-900">
        <Container>
          <div className="rounded-2xl bg-gradient-to-br from-black/40 to-black/20 border border-white/10 shadow-2xl">
            <div className="p-8">
              <h3 className="text-white/90 font-medium mb-8 text-center relative">
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-4 py-1 bg-progineer-gold/20 rounded-full text-sm backdrop-blur-sm border border-progineer-gold/30">
                  Expertise & Qualité
                </span>
                Nos engagements pour votre projet
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="group bg-black/20 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-black/30 border border-white/5 hover:border-progineer-gold/20">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-progineer-gold rounded-full flex-shrink-0 mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                    <div>
                      <h4 className="text-white/90 font-medium mb-2 group-hover:text-progineer-gold transition-colors duration-300">Coordination des corps de métier</h4>
                      <p className="text-sm text-white/70">Gestion experte de tous les intervenants pour une exécution harmonieuse de votre projet</p>
                    </div>
                  </div>
                </div>
                
                <div className="group bg-black/20 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-black/30 border border-white/5 hover:border-progineer-gold/20">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-progineer-gold rounded-full flex-shrink-0 mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                    <div>
                      <h4 className="text-white/90 font-medium mb-2 group-hover:text-progineer-gold transition-colors duration-300">Respect des délais garantis</h4>
                      <p className="text-sm text-white/70">Planification rigoureuse et suivi constant pour livrer votre projet dans les temps</p>
                    </div>
                  </div>
                </div>
                
                <div className="group bg-black/20 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-black/30 border border-white/5 hover:border-progineer-gold/20">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-progineer-gold rounded-full flex-shrink-0 mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                    <div>
                      <h4 className="text-white/90 font-medium mb-2 group-hover:text-progineer-gold transition-colors duration-300">Expertise technique</h4>
                      <p className="text-sm text-white/70">Solutions innovantes et conformes aux normes pour des résultats durables</p>
                    </div>
                  </div>
                </div>
                
                <div className="group bg-black/20 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-black/30 border border-white/5 hover:border-progineer-gold/20">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-progineer-gold rounded-full flex-shrink-0 mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                    <div>
                      <h4 className="text-white/90 font-medium mb-2 group-hover:text-progineer-gold transition-colors duration-300">Maîtrise d'œuvre complète</h4>
                      <p className="text-sm text-white/70">Accompagnement global de la conception à la réalisation de votre projet</p>
                    </div>
                  </div>
                </div>
                
                <div className="group bg-black/20 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-black/30 border border-white/5 hover:border-progineer-gold/20">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-progineer-gold rounded-full flex-shrink-0 mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                    <div>
                      <h4 className="text-white/90 font-medium mb-2 group-hover:text-progineer-gold transition-colors duration-300">Sélection des matériaux</h4>
                      <p className="text-sm text-white/70">Choix minutieux des matériaux pour une qualité et une durabilité optimales</p>
                    </div>
                  </div>
                </div>
                
                <div className="group bg-black/20 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-black/30 border border-white/5 hover:border-progineer-gold/20">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-progineer-gold rounded-full flex-shrink-0 mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                    <div>
                      <h4 className="text-white/90 font-medium mb-2 group-hover:text-progineer-gold transition-colors duration-300">Innovation durable</h4>
                      <p className="text-sm text-white/70">Solutions éco-responsables pour des projets respectueux de l'environnement</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Hero;
