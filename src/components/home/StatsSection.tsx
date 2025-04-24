
import React, { useState, useEffect, useRef } from 'react';
import Container from '@/components/common/Container';
import { motion, useInView } from 'framer-motion';

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const stats = [
    {
      value: 5,
      prefix: '+',
      label: "Années d'expérience",
      description: "Dans la conception et réalisation",
      gradientFrom: "from-khaki-400",
      gradientTo: "to-khaki-600"
    },
    {
      value: 2,
      prefix: '',
      label: "Régions couvertes",
      description: "PACA et Auvergne-Rhône-Alpes",
      gradientFrom: "from-stone-400",
      gradientTo: "to-stone-600"
    },
    {
      value: 100,
      prefix: '',
      suffix: '%',
      label: "Satisfaction client",
      description: "Notre priorité absolue",
      gradientFrom: "from-khaki-500",
      gradientTo: "to-khaki-700"
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
    <section 
      ref={ref} 
      className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-stone-50 to-white"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-khaki-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-khaki-200/20 rounded-full blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-100/80 transition-all duration-500 hover:shadow-xl hover:scale-[1.02]">
                {/* Gradient background */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradientFrom} ${stat.gradientTo} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Stat circle */}
                  <div className="mb-6 relative mx-auto w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="60"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-stone-100"
                      />
                      <motion.circle
                        cx="64"
                        cy="64"
                        r="60"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        className={`text-khaki-600`}
                        initial={{ pathLength: 0 }}
                        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: 2, delay: index * 0.2 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold bg-gradient-to-br from-stone-700 to-stone-900 bg-clip-text text-transparent">
                        {stat.prefix}{counts[index]}{stat.suffix}
                      </span>
                    </div>
                  </div>
                  
                  {/* Text content */}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-stone-800 mb-2">
                      {stat.label}
                    </h3>
                    <p className="text-stone-600">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default StatsSection;
