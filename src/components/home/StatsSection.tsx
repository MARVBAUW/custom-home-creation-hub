
import React, { useRef, useState, useEffect } from 'react';
import Container from '@/components/common/Container';
import { motion, useInView } from 'framer-motion';
import StatCard from './stats/StatCard';
import StatBackground from './stats/StatBackground';
import { statsData } from './stats/StatsData';
import './animations.css';

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [counts, setCounts] = useState(statsData.map(() => 0));
  
  // Handle animation of counts
  useEffect(() => {
    if (!isInView) return;
    
    const counters = statsData.map((stat, index) => {
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
  
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      }
    }
  };

  return (
    <section 
      ref={ref} 
      className="py-24 bg-gradient-to-b from-white to-stone-50 relative overflow-hidden"
    >
      {/* Background elements */}
      <StatBackground />
      
      <Container>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-800">
            Nos engagements
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Notre expertise et notre dévouement au service de votre projet de construction ou rénovation en PACA.
          </p>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {statsData.map((stat, index) => (
            <StatCard
              key={index}
              {...stat}
              index={index}
              animatedValue={counts[index]}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default StatsSection;
