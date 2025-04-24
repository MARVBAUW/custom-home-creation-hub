
import React, { useEffect, useRef } from 'react';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { motion } from 'framer-motion';

const Hero = () => {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!particlesRef.current) return;

    const createParticles = () => {
      const container = particlesRef.current;
      if (!container) return;

      container.innerHTML = '';
      const particleCount = window.innerWidth < 768 ? 30 : 60;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full bg-white/30 pointer-events-none';
        
        // Tailles variées
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Positions aléatoires
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Animation avec délai
        particle.style.animation = `floatParticle ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.opacity = `${Math.random() * 0.5 + 0.2}`;
        
        container.appendChild(particle);
      }
    };

    createParticles();
    window.addEventListener('resize', createParticles);

    return () => {
      window.removeEventListener('resize', createParticles);
    };
  }, []);

  const scrollToNextSection = () => {
    const expertiseSection = document.getElementById('expertise-section');
    if (expertiseSection) {
      expertiseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="relative min-h-[100vh] flex items-center py-24 overflow-hidden">
        {/* Particles */}
        <div ref={particlesRef} className="absolute inset-0 z-10 overflow-hidden pointer-events-none" />
        
        {/* Background with modern gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')`,
              backgroundPosition: 'center',
            }}
          ></div>
        </div>
        
        <Container className="relative z-20 mt-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start"
          >
            <div className="w-full flex justify-center mb-12">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Logo variant="metallic-full" size="lg" className="mx-auto logo-3d-effect" />
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-block px-3 py-1 mb-6 rounded-full bg-progineer-gold/30 backdrop-blur-sm text-white text-sm font-medium"
            >
              Maître d'œuvre à Marseille
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-rare tracking-wide text-white leading-tight mb-6 text-left"
            >
              Votre maître d'œuvre expert à <br className="hidden md:block" />
              <span className="text-progineer-gold bg-clip-text">Marseille et en PACA</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl text-left speakable"
            >
              Coordination des corps de métier, respect des délais et expertise technique pour vos projets 
              de construction et rénovation. Un accompagnement sur mesure par votre maître d'ouvrage à Marseille.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                href="/estimation" 
                size="lg" 
                variant="estimation" 
                className="font-medium backdrop-blur-sm border-white/10 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300"
              >
                Estimer mon projet
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                href="/prestations-maitre-oeuvre" 
                variant="outline" 
                size="lg" 
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                Découvrir nos prestations
              </Button>
            </motion.div>
          </motion.div>
        </Container>

        {/* Scroll down indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatType: "loop" }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToNextSection}
        >
          <div className="flex flex-col items-center">
            <span className="text-white mb-2 text-sm">Découvrir</span>
            <ChevronDown className="text-white h-6 w-6" />
          </div>
        </motion.div>
      </section>

      {/* Key features section - Completely redesigned */}
      <section id="expertise-section" className="py-16 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(120,115,70,0.1),_transparent_70%)]"></div>
        
        <Container>
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-gradient-to-br from-black/40 to-black/20 border border-white/10 shadow-2xl relative z-10 backdrop-blur-md"
          >
            <div className="p-8">
              <div className="text-white/90 font-medium mb-8 text-center relative">
                <motion.span 
                  initial={{ y: -20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 px-6 py-2 bg-progineer-gold/20 rounded-full text-sm backdrop-blur-sm border border-progineer-gold/30"
                >
                  Expertise & Qualité
                </motion.span>
                <h2 className="text-2xl">Nos engagements pour votre projet</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Coordination des corps de métier",
                    description: "Gestion experte de tous les intervenants pour une exécution harmonieuse de votre projet"
                  },
                  {
                    title: "Respect des délais garantis",
                    description: "Planification rigoureuse et suivi constant pour livrer votre projet dans les temps"
                  },
                  {
                    title: "Expertise technique",
                    description: "Solutions innovantes et conformes aux normes pour des résultats durables"
                  },
                  {
                    title: "Maîtrise d'œuvre complète",
                    description: "Accompagnement global de la conception à la réalisation de votre projet"
                  },
                  {
                    title: "Sélection des matériaux",
                    description: "Choix minutieux des matériaux pour une qualité et une durabilité optimales"
                  },
                  {
                    title: "Innovation durable",
                    description: "Solutions éco-responsables pour des projets respectueux de l'environnement"
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                      zIndex: 20
                    }}
                    className="group perspective-700 h-full"
                  >
                    <div className="transform-style-3d relative h-full">
                      <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 
                      hover:-translate-y-1 hover:bg-black/30 border border-white/5 hover:border-progineer-gold/20
                      group-hover:shadow-[0_0_20px_rgba(120,115,70,0.3)] h-full transform transition-transform group-hover:rotate-y-10 group-hover:rotate-x-10">
                        <div className="flex items-start space-x-4">
                          <div className="w-2 h-2 bg-progineer-gold rounded-full flex-shrink-0 mt-2 
                          group-hover:scale-150 transition-transform duration-300"></div>
                          <div>
                            <h4 className="text-white/90 font-medium mb-2 group-hover:text-progineer-gold transition-colors duration-300">
                              {item.title}
                            </h4>
                            <p className="text-sm text-white/70">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Layered graphic elements */}
            <div className="hidden md:block absolute -bottom-8 -left-8 w-64 h-64 border border-white/10 rounded-full opacity-20"></div>
            <div className="hidden md:block absolute -top-12 -right-12 w-80 h-80 border border-white/5 rounded-full opacity-10"></div>
            <div className="hidden md:block absolute top-1/2 left-1/3 w-20 h-20 border border-progineer-gold/20 rounded-full opacity-30"></div>
          </motion.div>
        </Container>
      </section>
    </>
  );
};

export default Hero;
