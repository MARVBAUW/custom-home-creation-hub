
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building2, Users, Clock, CheckCircle } from 'lucide-react';

const stats = [
  {
    value: '5+',
    label: "Années d'expertise",
    description: "En maîtrise d'œuvre",
    icon: Clock,
  },
  {
    value: '100%',
    label: "Satisfaction client",
    description: "Projets livrés avec succès",
    icon: CheckCircle,
  },
  {
    value: '500+',
    label: "Clients satisfaits",
    description: "En PACA",
    icon: Users,
  },
  {
    value: '1000+',
    label: "Projets réalisés",
    description: "Construction & Rénovation",
    icon: Building2,
  }
];

const StatsGrid = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-khaki-500/10 to-khaki-600/5 rounded-xl transform group-hover:scale-105 transition-transform duration-300" />
            <div className="relative p-6 text-center">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-khaki-100 text-khaki-600">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-khaki-800 mb-2">{stat.value}</h3>
              <p className="font-semibold text-gray-900 mb-1">{stat.label}</p>
              <p className="text-sm text-gray-600">{stat.description}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsGrid;
