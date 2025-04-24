
import React, { useState, useEffect, useRef } from 'react';
import Container from '@/components/common/Container';
import { motion, useInView } from 'framer-motion';
import { Shield, Award, HeartHandshake } from 'lucide-react';

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const stats = [
    {
      icon: Shield,
      value: 5,
      prefix: '+',
      label: "Années d'expérience",
      description: "Dans la conception et réalisation",
    },
    {
      icon: HeartHandshake,
      value: 2,
      prefix: '',
      label: "Régions couvertes",
      description: "PACA et Auvergne-Rhône-Alpes",
    },
    {
      icon: Award,
      value: 100,
      prefix: '',
      suffix: '%',
      label: "Satisfaction client",
      description: "Notre priorité absolue",
    }
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));
  
  useEffect(() => {
    if (!isInView) return;
    
    const counters = stats.map((stat, index) => ({
      start: 0,
      end: stat.value,
      duration: 2000 + (index * 200),
      startTime: null
    }));
    
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

  return (
    <section ref={ref} className="py-24 relative overflow-hidden bg-gradient-to-br from-stone-50 via-white to-stone-50">
      <Container className="relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-semibold text-stone-800 mb-4"
          >
            Nos engagements
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-stone-600 max-w-2xl mx-auto"
          >
            Découvrez ce qui fait notre différence et notre engagement envers l'excellence
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group relative"
              >
                <div className="relative h-full bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-khaki-50 to-stone-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="mb-6 flex flex-col items-center">
                      <div className="p-3 rounded-full bg-khaki-50 mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-khaki-700" />
                      </div>
                      <div className="text-4xl font-bold bg-gradient-to-r from-stone-700 to-stone-900 bg-clip-text text-transparent">
                        {stat.prefix}{counts[index]}{stat.suffix}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-stone-800 mb-2 group-hover:text-khaki-700 transition-colors">
                        {stat.label}
                      </h3>
                      <p className="text-stone-600 group-hover:text-stone-700 transition-colors">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default StatsSection;
