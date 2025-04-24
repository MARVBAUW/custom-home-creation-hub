
import React from 'react';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const features = [
  "Écoute attentive de vos besoins", 
  "Solutions innovantes et durables", 
  "Respect strict des délais", 
  "Communication fluide tout au long du projet", 
  "Maîtrise des coûts et transparence", 
  "Accompagnement administratif complet"
];

const CTASection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
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
        damping: 10
      }
    }
  };

  const imageVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        delay: 0.4
      }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with decorative shape */}
      <div className="absolute inset-0 bg-gradient-to-br from-khaki-50 to-white"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full">
        <svg className="h-full w-full text-khaki-100/50" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor">
          <path d="M0,0 L100,0 C80,50 80,50 100,100 L0,100 Z"></path>
        </svg>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-khaki-200/20 rounded-full opacity-40 transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-khaki-200/30 rounded-full opacity-30 transform -translate-x-1/3 translate-y-1/3"></div>
      
      <Container className="relative z-10">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={containerVariants}>
            <motion.div variants={itemVariants} className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Notre approche
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-rare tracking-wide mb-6 text-gray-900">
              Un accompagnement sur mesure pour votre projet
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-gray-700 text-lg mb-8">
              Chez Progineer, nous croyons qu'un projet réussi commence par une écoute attentive de vos besoins. 
              Notre équipe d'experts vous accompagne à chaque étape, de la conception à la livraison.
            </motion.p>
            
            <motion.div variants={containerVariants} className="mb-8">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <motion.li key={index} variants={itemVariants} className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-khaki-100 flex items-center justify-center mt-1 mr-3">
                      <Check className="h-3 w-3 text-khaki-700" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div variants={containerVariants} className="flex flex-col sm:flex-row gap-4">
              <motion.div variants={itemVariants}>
                <Button 
                  href="/estimation" 
                  className="bg-khaki-700 hover:bg-khaki-800 text-white !text-white group flex items-center gap-2"
                >
                  Estimer mon projet
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Button 
                  href="/contact" 
                  variant="outline" 
                  className="border-khaki-300 bg-transparent text-khaki-700 hover:bg-khaki-50"
                >
                  Prendre rendez-vous
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="mt-6 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                    <img 
                      src={`https://randomuser.me/api/portraits/men/${20 + i}.jpg`} 
                      alt="Client" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-khaki-700">50+ clients</span> nous ont fait confiance
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div variants={imageVariants} className="relative lg:h-[500px]">
            <div className="relative h-full rounded-xl overflow-hidden shadow-2xl border-8 border-white">
              <img 
                alt="Maison contemporaine avec grande baie vitrée" 
                className="w-full h-full object-cover" 
                src="/lovable-uploads/2ab0f303-213f-43c9-94dc-75e0e8e55718.png" 
              />
            </div>
            
            <motion.div 
              variants={itemVariants}
              className="absolute -bottom-8 -right-8 p-6 bg-white rounded-xl shadow-xl border border-khaki-100 max-w-xs"
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-500">Projet livré</div>
                <div className="px-2 py-1 text-xs bg-khaki-100 text-khaki-800 rounded-full">Marseille</div>
              </div>
              <h3 className="text-lg font-semibold mb-1 text-gray-800">Villa contemporaine</h3>
              <p className="text-sm text-gray-600">Construction neuve avec piscine et vue panoramique</p>
            </motion.div>
            
            <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-khaki-500/5 rounded-full"></div>
            <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-khaki-500/10 rounded-full"></div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default CTASection;
