
import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/common/Container';
import { useInView } from 'react-intersection-observer';

const steps = [
  {
    title: "Consultation initiale",
    description: "Analyse approfondie de vos besoins et objectifs pour votre projet.",
    icon: "🏠",
  },
  {
    title: "Étude et conception",
    description: "Élaboration des plans et des solutions techniques adaptées.",
    icon: "📝",
  },
  {
    title: "Planification détaillée",
    description: "Organisation du chantier et coordination des intervenants.",
    icon: "📅",
  },
  {
    title: "Réalisation",
    description: "Suivi rigoureux des travaux et contrôle qualité constant.",
    icon: "🏗️",
  },
  {
    title: "Livraison",
    description: "Vérification finale et remise des clés de votre projet terminé.",
    icon: "🔑",
  }
];

const ExpertiseTimeline = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="py-24 bg-khaki-50" ref={ref}>
      <Container>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 mb-4 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium"
          >
            Notre processus
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl font-semibold mb-6"
          >
            Une expertise éprouvée à chaque étape
          </motion.h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-khaki-200"
            initial={{ height: 0 }}
            animate={inView ? { height: '100%' } : {}}
            transition={{ duration: 1.5 }}
          />

          {/* Timeline steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex items-center ${
                  index % 2 === 0 ? 'flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                  <motion.div 
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 transform-gpu hover:scale-105"
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="flex items-center justify-center mb-4">
                      <span className="text-4xl">{step.icon}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-khaki-800">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </motion.div>
                </div>

                {/* Timeline dot */}
                <motion.div 
                  className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-khaki-500 rounded-full border-4 border-white shadow-md"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.2 + 0.5 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ExpertiseTimeline;
