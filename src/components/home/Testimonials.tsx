
import React, { useState, useEffect } from 'react';
import Container from '@/components/common/Container';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './animations.css';

const testimonials = [
  {
    quote: "Progineer a su transformer notre vision en réalité. Leur équipe a été à l'écoute de nos besoins et a créé une maison qui correspond parfaitement à notre style de vie.",
    author: "Marie et Pierre",
    location: "Marseille",
    project: "Construction maison 180m²",
    rating: 5
  }, 
  {
    quote: "Un accompagnement sans faille de la conception à la livraison. Les équipes de Progineer ont su gérer les imprévus avec professionnalisme.",
    author: "Laurent M.",
    location: "Toulon",
    project: "Rénovation complète",
    rating: 5
  }, 
  {
    quote: "Excellente communication tout au long du projet. Le résultat final a dépassé nos attentes et le budget a été respecté à la lettre.",
    author: "Sophie D.",
    location: "Saint-Tropez",
    project: "Extension 45m²",
    rating: 5
  },
  {
    quote: "Une expertise rare dans le domaine de la construction écologique. Progineer nous a guidés vers des solutions innovantes et durables.",
    author: "Jean-Philippe R.",
    location: "Nice",
    project: "Villa bioclimatique",
    rating: 5
  },
  {
    quote: "Service exceptionnel et résultats à la hauteur de nos attentes. Nous recommandons Progineer sans hésitation pour tout projet d'envergure.",
    author: "Caroline et Thomas",
    location: "Cannes",
    project: "Rénovation appartement",
    rating: 5
  }
];

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  // Autoplay
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

  // Variantes pour les animations
  const slideVariants = {
    enter: (direction) => ({
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
    exit: (direction) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    })
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
      {/* Overlay pattern */}
      <div 
        className="absolute inset-0 opacity-20" 
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
          {/* Contrôles de navigation */}
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
                className="flex flex-col md:flex-row gap-8 items-center"
              >
                {/* Image du client ou illustration */}
                <div className="md:w-1/3">
                  <div className="relative">
                    <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white/10 shadow-xl mx-auto">
                      <div className="w-full h-full bg-gradient-to-br from-progineer-gold/30 to-khaki-800/30 backdrop-blur-sm flex items-center justify-center">
                        <Quote className="w-20 h-20 text-white/30" />
                      </div>
                    </div>
                    {/* Badges de projet */}
                    <div className="absolute -bottom-4 -right-4 bg-progineer-gold text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      {testimonials[active].location}
                    </div>
                  </div>
                </div>
                
                {/* Contenu du témoignage */}
                <div className="md:w-2/3 bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 relative">
                  <div className="flex mb-4">
                    {[...Array(testimonials[active].rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-5 w-5 text-yellow-400 fill-yellow-400" 
                      />
                    ))}
                  </div>
                  
                  <p className="text-white text-lg md:text-xl mb-6 italic relative z-10">
                    "{testimonials[active].quote}"
                  </p>
                  
                  <div>
                    <div className="font-semibold text-white text-lg">{testimonials[active].author}</div>
                    <div className="text-sm text-white/70 mt-1">
                      {testimonials[active].project}
                    </div>
                  </div>
                  
                  {/* Decoration */}
                  <div className="absolute top-6 right-6 text-white/10">
                    <Quote className="h-16 w-16" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation par points */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > active ? 1 : -1);
                  setActive(index);
                  setAutoplay(false);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === active 
                    ? "bg-white scale-125" 
                    : "bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
