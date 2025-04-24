
import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/common/Container';

const steps = [
  {
    title: "Consultation initiale",
    description: "Analyse approfondie de vos besoins et objectifs pour votre projet.",
  },
  {
    title: "Étude et conception",
    description: "Élaboration des plans et des solutions techniques adaptées.",
  },
  {
    title: "Planification détaillée",
    description: "Organisation du chantier et coordination des intervenants.",
  },
  {
    title: "Réalisation",
    description: "Suivi rigoureux des travaux et contrôle qualité constant.",
  },
  {
    title: "Livraison",
    description: "Vérification finale et remise des clés de votre projet terminé.",
  }
];

const ExpertiseTimeline = () => {
  return (
    <section className="py-24 bg-khaki-50">
      <Container>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-4 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium"
          >
            Notre processus
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-semibold mb-6"
          >
            Une expertise éprouvée à chaque étape
          </motion.h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-khaki-200" />

          {/* Timeline steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`flex items-center ${
                  index % 2 === 0 ? 'flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-xl font-semibold mb-2 text-khaki-800">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-khaki-500 rounded-full border-4 border-white" />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ExpertiseTimeline;
