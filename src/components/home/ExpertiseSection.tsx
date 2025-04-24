
import React from 'react';
import Container from '@/components/common/Container';
import { Shield, Clock, Wrench, Users, CheckCircle, Building } from 'lucide-react';
import { motion } from 'framer-motion';
import './animations.css';

const ExpertiseSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <section className="py-28 bg-gradient-to-b from-stone-50 to-white relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-gray-900 to-transparent opacity-5"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-progineer-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-progineer-gold/5 rounded-full blur-3xl"></div>
      
      <Container>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-block px-4 py-1 mb-4 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium"
          >
            Notre expertise
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-rare tracking-wide mb-4"
          >
            Pourquoi faire appel à un maître d'œuvre à Marseille ?
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-600"
          >
            Notre expertise technique et notre coordination des corps de métier garantissent 
            la réussite de votre projet
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            {
              icon: Shield,
              title: "Expertise technique",
              description: "Notre maîtrise d'œuvre assure une expertise technique pointue pour chaque projet de construction ou rénovation."
            },
            {
              icon: Users,
              title: "Coordination des corps de métier",
              description: "Nous coordonnons efficacement tous les corps de métier pour une réalisation harmonieuse de votre projet."
            },
            {
              icon: Clock,
              title: "Respect des délais",
              description: "Notre engagement : respecter scrupuleusement les délais fixés pour votre projet de construction."
            },
            {
              icon: Wrench,
              title: "Choix des matériaux",
              description: "Bénéficiez de notre expertise pour sélectionner les meilleurs matériaux adaptés à votre projet."
            },
            {
              icon: Building,
              title: "Projets de rénovation",
              description: "Spécialiste de la rénovation à Marseille, nous transformons vos espaces avec expertise."
            },
            {
              icon: CheckCircle,
              title: "Suivi de chantier",
              description: "Un maître d'ouvrage dédié suit votre chantier de A à Z pour garantir une réalisation parfaite."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03, 
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                zIndex: 10
              }}
              className="card-3d-effect"
            >
              <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100 h-full relative overflow-hidden group">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-stone-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                
                {/* Icon with animated background */}
                <div className="relative z-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-progineer-gold/10 rounded-full scale-150 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"></div>
                    <item.icon className="w-12 h-12 text-progineer-gold mb-4 relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-progineer-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default ExpertiseSection;
