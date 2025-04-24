
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/common/Button';
import Logo from '@/components/common/Logo';

const HeroContent = () => {
  return (
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
  );
};

export default HeroContent;
