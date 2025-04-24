
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
            className="relative group perspective-1000"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-khaki-500/20 to-khaki-600/10 rounded-xl transform group-hover:scale-105 transition-transform duration-300" />
            <motion.div 
              className="relative p-6 bg-white rounded-xl border border-khaki-200 shadow-lg hover:shadow-xl transition-all duration-300 transform-gpu group-hover:-rotate-y-2 group-hover:translate-y-[-4px]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-khaki-100 to-khaki-200 text-khaki-600 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-6 h-6 transform group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <motion.h3 
                className="text-3xl font-bold text-khaki-800 mb-2"
                initial={{ scale: 1 }}
                animate={inView ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                {stat.value}
              </motion.h3>
              <p className="font-semibold text-gray-900 mb-1">{stat.label}</p>
              <p className="text-sm text-gray-600">{stat.description}</p>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsGrid;
