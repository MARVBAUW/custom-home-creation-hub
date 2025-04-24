
import React, { useState, useEffect, useRef } from 'react';
import Container from '@/components/common/Container';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Shield, Award, HeartHandshake, CircleCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  
  const stats = [
    {
      icon: Shield,
      value: 5,
      prefix: '+',
      label: "Années d'expérience",
      description: "Dans la conception et réalisation",
      color: "from-amber-300 to-amber-600",
    },
    {
      icon: HeartHandshake,
      value: 2,
      prefix: '',
      label: "Régions couvertes",
      description: "PACA et Auvergne-Rhône-Alpes",
      color: "from-khaki-400 to-khaki-700",
    },
    {
      icon: Award,
      value: 100,
      prefix: '',
      suffix: '%',
      label: "Satisfaction client",
      description: "Notre priorité absolue",
      color: "from-khaki-500 to-stone-700",
    }
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      
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
          
          // Using easeOutQuad for smoother animation
          const easeProgress = 1 - (1 - progress) * (1 - progress);
          
          if (progress < 1) {
            stillCounting = true;
            newCounts[index] = Math.floor(counter.start + (counter.end - counter.start) * easeProgress);
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
    }
  }, [isInView]);

  // Geometric patterns for background
  const Pattern = () => (
    <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div 
          key={i}
          className={cn(
            "absolute rounded-full bg-gradient-to-tr from-khaki-400 to-khaki-600",
            i % 2 === 0 ? "animate-float-slow" : "animate-float-slower"
          )}
          style={{
            width: `${Math.random() * 200 + 100}px`,
            height: `${Math.random() * 200 + 100}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.4 + 0.1,
          }}
        />
      ))}
    </div>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  const calculateProgress = (index) => {
    const max = stats[index]?.value || 0;
    const current = counts[index] || 0;
    return (current / max) * 100;
  };

  return (
    <section 
      ref={ref}
      className="py-32 relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #f9f6f0 0%, #efe9df 100%)"
      }}
    >
      {/* Decorative patterns */}
      <Pattern />
      
      {/* Content */}
      <Container className="relative z-10">
        <div className="text-center mb-20">
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

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10, 
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="group perspective-700"
              >
                <Card className="h-full transform-style-3d group-hover:rotate-y-5 transition-all duration-500 overflow-visible">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/80 to-white/20 backdrop-blur-sm border border-white/30 shadow-xl group-hover:shadow-2xl group-hover:border-white/60 transition-all duration-500" />
                  
                  <CardContent className="p-8 relative z-10">
                    <div className="flex flex-col items-center">
                      {/* Circular Progress */}
                      <div className="relative mb-6">
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br ${stat.color} p-5 group-hover:scale-105 transition-all duration-500`}>
                          <Icon className="w-10 h-10 text-white drop-shadow-md" />
                        </div>
                        
                        <svg className="absolute -inset-2 w-28 h-28 rotate-[-90deg]" viewBox="0 0 100 100">
                          <motion.circle 
                            cx="50" 
                            cy="50" 
                            r="45"
                            stroke="rgba(255, 255, 255, 0.3)"
                            strokeWidth="4"
                            fill="none"
                          />
                          <motion.circle 
                            cx="50" 
                            cy="50" 
                            r="45"
                            stroke="white"
                            strokeWidth="4"
                            fill="none"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={isInView ? { pathLength: calculateProgress(index) / 100 } : { pathLength: 0 }}
                            transition={{ duration: 2, delay: index * 0.2, ease: "easeOut" }}
                            className="drop-shadow-lg"
                          />
                        </svg>
                      </div>
                      
                      {/* Stats Value */}
                      <motion.div 
                        className="text-4xl font-bold mb-2"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                        transition={{ delay: index * 0.3, duration: 0.5, type: "spring" }}
                      >
                        <span className="bg-gradient-to-r from-stone-700 to-stone-900 bg-clip-text text-transparent">
                          {stat.prefix}{counts[index]}{stat.suffix}
                        </span>
                      </motion.div>
                      
                      {/* Label & Description */}
                      <h3 className="text-xl font-semibold text-stone-800 mb-2 group-hover:text-khaki-700 transition-colors">
                        {stat.label}
                      </h3>
                      <p className="text-stone-600 text-center">
                        {stat.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
      
      {/* Parallax effect bottom decoration */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-stone-100/50 to-transparent"
        initial={{ y: 20 }}
        animate={isInView ? { y: 0 } : { y: 20 }}
        transition={{ duration: 1.2 }}
      />
    </section>
  );
};

export default StatsSection;
