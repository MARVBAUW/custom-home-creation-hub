import React, { useEffect, useRef } from 'react';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import { ArrowRight, ChevronDown, Shield, Clock, Wrench, Users, CheckCircle, Building } from 'lucide-react';
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
    </>
  );
};

export default Hero;
