
import React, { useEffect, useRef } from 'react';
import Container from '@/components/common/Container';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, MapPin, Heart } from 'lucide-react';

const StatsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const stats = [
    {
      icon: Award,
      value: '+5',
      label: "Années d'expérience",
      description: "Dans la conception et réalisation",
      color: "text-amber-500",
      background: "bg-amber-50",
      border: "border-amber-200"
    },
    {
      icon: MapPin,
      value: '2',
      label: "Régions couvertes",
      description: "PACA et Auvergne-Rhône-Alpes",
      color: "text-khaki-700",
      background: "bg-khaki-50",
      border: "border-khaki-200"
    },
    {
      icon: Heart,
      value: '100%',
      label: "Satisfaction client",
      description: "Notre priorité absolue",
      color: "text-rose-500",
      background: "bg-rose-50",
      border: "border-rose-200"
    }
  ];

  const counterRefs = useRef<Array<HTMLSpanElement | null>>(new Array(stats.length).fill(null));

  useEffect(() => {
    if (inView) {
      counterRefs.current.forEach((ref, index) => {
        if (!ref) return;
        
        const stat = stats[index];
        const finalValue = stat.value;
        
        // Skip animation for non-numeric values
        if (finalValue.includes('%') || finalValue.includes('+')) {
          ref.textContent = finalValue;
          return;
        }
        
        // For numeric values, animate
        const finalNum = parseInt(finalValue);
        let startValue = 0;
        const duration = 2000;
        const startTime = Date.now();
        
        const updateCounter = () => {
          const currentTime = Date.now();
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          const currentValue = Math.floor(progress * finalNum);
          ref.textContent = currentValue.toString();
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            ref.textContent = finalValue;
          }
        };
        
        requestAnimationFrame(updateCounter);
      });
    }
  }, [inView, stats]);

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
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative backdrop */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-khaki-300/50 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_40%,rgba(249,245,238,0.5),rgba(255,255,255,0))]"></div>
      
      <Container>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative flex flex-col items-center p-8 rounded-xl ${stat.background} border ${stat.border} text-center transition-all duration-500 hover:shadow-md`}
            >
              {/* Circular background for icon */}
              <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mb-6 ${stat.border}`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              
              <span 
                ref={el => counterRefs.current[index] = el}
                className={`text-5xl font-bold ${stat.color} mb-2 tabular-nums`}
              >
                {stat.value}
              </span>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{stat.label}</h3>
              <p className="text-gray-600">{stat.description}</p>
              
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className={`absolute top-0 right-0 w-4 h-4 -mt-2 -mr-2 rounded-full ${stat.background} shadow-inner transform rotate-45`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Notre expertise et notre engagement envers l'excellence font de Progineer 
            votre partenaire idéal pour tous vos projets de construction et rénovation en PACA.
          </p>
        </motion.div>
      </Container>
    </section>
  );
};

export default StatsSection;
