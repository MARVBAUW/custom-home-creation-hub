
import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroContent = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center lg:text-left">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="space-y-8 max-w-3xl mx-auto lg:mx-0"
      >
        <h1 className="font-rare tracking-wide text-white text-4xl md:text-5xl lg:text-6xl">
          Maître d'œuvre à 
          <span className="text-progineer-gold relative inline-flex mx-2">
            Marseille
            <span className="absolute bottom-0 left-0 w-full h-1 bg-progineer-gold/40 mt-1"></span>
          </span> 
          et en PACA
        </h1>
        
        <p className="text-gray-100 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0">
          Votre projet immobilier mérite une expertise sur mesure. De la conception à la livraison, nous vous accompagnons pour donner vie à vos idées.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 pt-2">
          <Button 
            href="/estimation" 
            variant="primary"
            size="lg"
            className="group"
          >
            <span className="flex items-center">
              Estimer mon projet
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Button>
          
          <Button 
            href="/prestations-maitre-oeuvre" 
            variant="outline"
            size="lg"
            className="bg-white/10 text-white border-white/30 backdrop-blur-sm"
          >
            Découvrir nos services
          </Button>
        </div>
        
        {/* Tags SEO */}
        <div className="sr-only">
          <h2>Construction et rénovation de maisons en PACA</h2>
          <p>
            Expert en maîtrise d'œuvre spécialisé en construction neuve, extension et rénovation à Marseille et dans toute la région PACA.
            Votre partenaire de confiance pour tous vos projets immobiliers sur mesure à Marseille.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroContent;
