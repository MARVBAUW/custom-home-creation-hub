
import React, { useEffect, useRef } from 'react';
import Container from '@/components/common/Container';
import { Shield, Clock, Wrench, Users, CheckCircle, Building } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ExpertiseSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const expertiseItems = [
    {
      icon: Shield,
      title: "Expertise technique",
      description: "Notre maîtrise d'œuvre assure une expertise technique pointue pour chaque projet de construction ou rénovation.",
      delay: 0,
    },
    {
      icon: Users,
      title: "Coordination des corps de métier",
      description: "Nous coordonnons efficacement tous les corps de métier pour une réalisation harmonieuse de votre projet.",
      delay: 0.1,
    },
    {
      icon: Clock,
      title: "Respect des délais",
      description: "Notre engagement : respecter scrupuleusement les délais fixés pour votre projet de construction.",
      delay: 0.2,
    },
    {
      icon: Wrench,
      title: "Choix des matériaux",
      description: "Bénéficiez de notre expertise pour sélectionner les meilleurs matériaux adaptés à votre projet.",
      delay: 0.3,
    },
    {
      icon: Building,
      title: "Projets de rénovation",
      description: "Spécialiste de la rénovation à Marseille, nous transformons vos espaces avec expertise.",
      delay: 0.4,
    },
    {
      icon: CheckCircle,
      title: "Suivi de chantier",
      description: "Un maître d'ouvrage dédié suit votre chantier de A à Z pour garantir une réalisation parfaite.",
      delay: 0.5,
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
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

  return (
    <section className="py-20 bg-gradient-to-b from-stone-100 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 h-64 w-64 bg-khaki-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 h-96 w-96 bg-khaki-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-rare tracking-wide mb-4">
            Pourquoi faire appel à un maître d'œuvre à Marseille ?
          </h2>
          <p className="text-gray-600">
            Notre expertise technique et notre coordination des corps de métier garantissent la réussite de votre projet
          </p>
          <div className="mt-6 w-24 h-1 bg-khaki-500/40 mx-auto rounded-full"></div>
        </div>

        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {expertiseItems.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              custom={item.delay}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
              className="bg-white p-8 rounded-xl shadow-sm border border-stone-100 transition-all duration-300"
            >
              <div className="relative mb-6">
                <div className="absolute -left-2 -top-2 w-16 h-16 bg-khaki-100 rounded-lg rotate-6"></div>
                <div className="relative">
                  <item.icon className="w-12 h-12 text-khaki-700 mb-4" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="inline-block p-4 bg-khaki-50 rounded-lg border border-khaki-100"
          >
            <p className="text-khaki-800 font-medium">
              Faites confiance à notre équipe de professionnels qualifiés pour votre prochain projet en PACA.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default ExpertiseSection;
