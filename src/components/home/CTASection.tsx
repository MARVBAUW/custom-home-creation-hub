
import React from 'react';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './animations.css';

const features = [
  "Écoute attentive de vos besoins", 
  "Solutions innovantes et durables", 
  "Respect strict des délais", 
  "Communication fluide tout au long du projet", 
  "Maîtrise des coûts et transparence", 
  "Accompagnement administratif complet"
];

const CTASection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section className="py-28 relative overflow-hidden">
      {/* Arrière-plan dynamique */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-white to-khaki-50"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-progineer-gold/5 rounded-full opacity-40 blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-progineer-gold/10 rounded-full opacity-30 blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
      
      <Container className="relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={itemVariants}>
            <motion.div variants={itemVariants} className="inline-block px-4 py-1 mb-6 rounded-full bg-progineer-gold/10 text-progineer-gold text-sm font-medium">
              Notre approche
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-rare tracking-wide mb-6 text-progineer-dark">
              Un accompagnement sur mesure pour votre projet
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-gray-700 text-lg mb-8">
              Chez Progineer, nous croyons qu'un projet réussi commence par une écoute attentive de vos besoins. 
              Notre équipe d'experts vous accompagne à chaque étape, de la conception à la livraison.
            </motion.p>
            
            <motion.div variants={itemVariants} className="mb-8">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <motion.li 
                    key={index} 
                    variants={itemVariants}
                    custom={index}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-progineer-gold/30 to-progineer-gold/10 flex items-center justify-center mt-0.5 mr-3 border border-progineer-gold/30">
                      <Check className="h-3 w-3 text-progineer-gold" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button 
                href="/estimation" 
                className="bg-khaki-700 hover:bg-khaki-800 text-white !text-white group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Estimer mon projet
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-khaki-800 to-khaki-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
              
              <Button 
                href="/contact" 
                variant="outline" 
                className="border-progineer-gold/50 bg-transparent text-progineer-gold hover:bg-progineer-gold/10 group"
              >
                <span className="flex items-center">
                  Prendre rendez-vous
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="relative perspective-700">
            <div className="transform-style-3d">
              <motion.div 
                whileHover={{ 
                  rotateY: -5,
                  rotateX: 5,
                  translateZ: 30
                }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-100"
              >
                <img 
                  alt="Maison contemporaine avec grande baie vitrée" 
                  className="w-full h-auto object-fill" 
                  src="/lovable-uploads/2ab0f303-213f-43c9-94dc-75e0e8e55718.png" 
                />
                
                {/* Overlay subtil pour améliorer la lisibilité */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                
                {/* Bulle d'information avec effet 3D */}
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
                  className="absolute right-6 bottom-6 p-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/80 max-w-xs transform rotate-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-gray-500">Projet livré</div>
                    <div className="px-2 py-1 text-xs bg-progineer-gold/10 text-progineer-gold rounded-full">Marseille</div>
                  </div>
                  <h3 className="text-lg font-semibold mb-1 text-progineer-dark">Villa contemporaine</h3>
                  <p className="text-sm text-gray-600">Construction neuve avec piscine et vue panoramique</p>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Éléments décoratifs */}
            <div className="absolute -z-10 -top-6 -left-6 w-32 h-32 rounded-full bg-progineer-gold/10 blur-xl"></div>
            <div className="absolute -z-10 -bottom-10 -right-10 w-48 h-48 rounded-full bg-progineer-gold/5 blur-xl"></div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default CTASection;
