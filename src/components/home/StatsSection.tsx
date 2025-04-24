
import React from 'react';
import Container from '@/components/common/Container';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const StatsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const stats = [
    {
      value: '+5',
      label: "Années d'expérience",
      description: "Dans la conception et réalisation"
    },
    {
      value: '2',
      label: "Régions couvertes",
      description: "PACA et Auvergne-Rhône-Alpes"
    },
    {
      value: '100%',
      label: "Satisfaction client",
      description: "Notre priorité absolue"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  return (
    <section className="py-16 bg-white">
      <Container>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center p-6 rounded-lg text-center"
            >
              <span className="text-4xl md:text-5xl font-bold text-khaki-800 mb-2">{stat.value}</span>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{stat.label}</h3>
              <p className="text-gray-600">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default StatsSection;
