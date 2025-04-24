
import React, { useState, useEffect, useRef } from 'react';
import Container from '@/components/common/Container';
import { motion, useInView } from 'framer-motion';
import './animations.css';

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const stats = [
    {
      value: 5,
      prefix: '+',
      label: "Années d'expérience",
      description: "Dans la conception et réalisation",
      color: "from-amber-500 to-orange-500"
    },
    {
      value: 2,
      prefix: '',
      label: "Régions couvertes",
      description: "PACA et Auvergne-Rhône-Alpes",
      color: "from-emerald-500 to-teal-500"
    },
    {
      value: 100,
      prefix: '',
      suffix: '%',
      label: "Satisfaction client",
      description: "Notre priorité absolue",
      color: "from-sky-500 to-blue-500"
    }
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));
  
  useEffect(() => {
    if (!isInView) return;
    
    const counters = stats.map((stat, index) => {
      return {
        start: 0,
        end: stat.value,
        duration: 2000 + (index * 200),
        startTime: null
      };
    });
    
    const updateCount = (timestamp) => {
      if (!isInView) return;
      
      const newCounts = [...counts];
      let stillCounting = false;
      
      counters.forEach((counter, index) => {
        if (counter.startTime === null) {
          counter.startTime = timestamp;
        }
        
        const elapsed = timestamp - counter.startTime;
        const progress = Math.min(elapsed / counter.duration, 1);
        
        if (progress < 1) {
          stillCounting = true;
          newCounts[index] = Math.floor(counter.start + (counter.end - counter.start) * progress);
        } else {
          newCounts[index] = counter.end;
        }
      });
      
      setCounts(newCounts);
      
      if (stillCounting) {
        requestAnimationFrame(updateCount);
      }
    };
    
    requestAnimationFrame(updateCount);
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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
    <section ref={ref} className="py-24 bg-gradient-to-b from-white to-stone-50 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-stone-100/50 to-transparent"></div>
      <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-progineer-gold/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-progineer-gold/5 blur-3xl"></div>
      
      <Container>
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center p-8 rounded-xl text-center relative"
            >
              <div className="mb-6 relative">
                <svg className="w-32 h-32" viewBox="0 0 100 100">
                  {/* Cercle de fond */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    stroke="#E5E5E5" 
                    strokeWidth="8" 
                    fill="none"
                  />
                  
                  {/* Cercle de progression animé */}
                  <motion.circle 
                    cx="50" 
                    cy="50" 
                    r="40"
                    stroke={`url(#gradient-${index})`}
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
                  />
                  
                  {/* Définition des dégradés */}
                  <defs>
                    <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={`var(--${stat.color.split(' ')[0]})`} />
                      <stop offset="100%" stopColor={`var(--${stat.color.split(' ')[1]})`} />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Valeur au centre */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br via-gray-800 to-gray-600 from-gray-900">
                      {stat.prefix}{counts[index]}{stat.suffix}
                    </span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{stat.label}</h3>
              <p className="text-gray-600">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default StatsSection;
