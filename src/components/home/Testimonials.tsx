
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/common/Container';
import { TestimonialCard } from './testimonials/TestimonialCard';
import { TestimonialDots } from './testimonials/TestimonialDots';
import { testimonials } from './testimonials/testimonialData';
import './animations.css';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 500 : -500,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 }
    }
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -500 : 500,
    opacity: 0,
    scale: 0.9,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 }
    }
  })
};

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [active, autoplay]);

  const nextSlide = () => {
    setDirection(1);
    setActive(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setActive(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleDotClick = (index: number, currentActive: number) => {
    setDirection(index > currentActive ? 1 : -1);
    setActive(index);
  };

  return (
    <section className="relative py-28 text-white overflow-hidden" 
      style={{ 
        background: `linear-gradient(to right, rgba(30,30,35,0.97), rgba(30,30,35,0.9)), url('https://images.unsplash.com/photo-1600660344085-d8bd05bfb8a5?q=80&w=2070&auto=format&fit=crop')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 opacity-20" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
  
      <Container>
        <div className="text-center mb-12 max-w-2xl mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 mb-4 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-sm"
          >
            Témoignages
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-semibold mb-4"
          >
            Ce que disent nos clients
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/80 text-lg"
          >
            Découvrez les retours d'expérience de nos clients satisfaits dans toute la région PACA.
          </motion.p>
        </div>

        <div className="relative px-8">
          <button
            onClick={() => {
              prevSlide();
              setAutoplay(false);
            }}
            className="absolute left-0 z-10 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => {
              nextSlide();
              setAutoplay(false);
            }}
            className="absolute right-0 z-10 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          <div className="overflow-hidden py-8">
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <TestimonialCard 
                  testimonial={testimonials[active]}
                  direction={direction}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          
          <TestimonialDots
            total={testimonials.length}
            active={active}
            onDotClick={handleDotClick}
            setAutoplay={setAutoplay}
          />
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
