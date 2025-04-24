
import React from 'react';
import Container from '@/components/common/Container';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const testimonials = [{
  quote: "Progineer a su transformer notre vision en réalité. Leur équipe a été à l'écoute de nos besoins et a créé une maison qui correspond parfaitement à notre style de vie.",
  author: "Marie et Pierre",
  location: "Marseille",
  project: "Construction maison 180m²",
  image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
  rating: 5
}, {
  quote: "Un accompagnement sans faille de la conception à la livraison. Les équipes de Progineer ont su gérer les imprévus avec professionnalisme.",
  author: "Laurent M.",
  location: "Toulon",
  project: "Rénovation complète",
  image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
  rating: 5
}, {
  quote: "Excellente communication tout au long du projet. Le résultat final a dépassé nos attentes et le budget a été respecté à la lettre.",
  author: "Sophie D.",
  location: "Saint-Tropez",
  project: "Extension 45m²",
  image: "https://images.unsplash.com/photo-1600573472591-ee9d0678075d?q=80&w=2070&auto=format&fit=crop",
  rating: 5
}];

const Testimonials = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="relative py-20 bg-cover bg-center text-white overflow-hidden" 
      ref={ref}
      style={{ 
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop')`,
        backgroundAttachment: 'fixed'
      }}
    >
      <Container>
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-3 py-1 mb-4 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-sm"
          >
            Témoignages
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl font-semibold mb-4"
          >
            Ce que disent nos clients
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/80 text-lg"
          >
            Découvrez les retours d'expérience de nos clients satisfaits dans toute la région PACA.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 relative transition-all duration-500 hover:scale-105 hover:shadow-xl group"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              
              <div className="absolute top-6 right-6 text-white/30">
                <Quote className="h-12 w-12" />
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: index * 0.2 + i * 0.1 }}
                  >
                    <Star 
                      className="h-5 w-5 text

-yellow-400 fill-yellow-400" 
                    />
                  </motion.div>
                ))}
              </div>
              
              <p className="text-white mb-6 relative z-10">"{testimonial.quote}"</p>
              
              <div className="relative z-10">
                <div className="font-semibold text-white">{testimonial.author}</div>
                <div className="text-sm text-white/70">
                  {testimonial.location} - {testimonial.project}
                </div>
              </div>

              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-khaki-400 to-khaki-600"
                initial={{ width: 0 }}
                animate={inView ? { width: '100%' } : {}}
                transition={{ duration: 1, delay: index * 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
