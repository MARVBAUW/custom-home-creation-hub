
import React, { useState } from 'react';
import Container from '@/components/common/Container';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { useInView } from 'react-intersection-observer';

// Testimonial data (preserved from original)
const testimonials = [{
  quote: "Progineer a su transformer notre vision en réalité. Leur équipe a été à l'écoute de nos besoins et a créé une maison qui correspond parfaitement à notre style de vie.",
  author: "Marie et Pierre",
  location: "Marseille",
  project: "Construction maison 180m²",
  rating: 5,
  image: "https://images.unsplash.com/photo-1600660344085-d8bd05bfb8a5?q=80&w=300&h=300&auto=format&fit=crop&crop=faces&faceindex=1"
}, {
  quote: "Un accompagnement sans faille de la conception à la livraison. Les équipes de Progineer ont su gérer les imprévus avec professionnalisme.",
  author: "Laurent M.",
  location: "Toulon",
  project: "Rénovation complète",
  rating: 5,
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&h=300&auto=format&fit=crop&crop=faces&faceindex=1"
}, {
  quote: "Excellente communication tout au long du projet. Le résultat final a dépassé nos attentes et le budget a été respecté à la lettre.",
  author: "Sophie D.",
  location: "Saint-Tropez",
  project: "Extension 45m²",
  rating: 5,
  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&h=300&auto=format&fit=crop&crop=faces&faceindex=1"
}];

const Testimonials = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section 
      className="relative py-24 text-white overflow-hidden" 
      ref={ref}
      style={{ 
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1600660344085-d8bd05bfb8a5?q=80&w=2070&auto=format&fit=crop')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay with subtle pattern */}
      <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
      
      <Container className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-sm">
            Témoignages
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-white/80 text-lg">
            Découvrez les retours d'expérience de nos clients satisfaits dans toute la région PACA.
          </p>
          <div className="mt-6 w-24 h-1 bg-white/40 mx-auto rounded-full"></div>
        </motion.div>

        <div className="relative overflow-hidden">
          <Carousel 
            className="w-full"
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star 
                              key={i} 
                              className="h-5 w-5 text-yellow-400 fill-yellow-400" 
                            />
                          ))}
                        </div>
                        <Quote className="h-8 w-8 text-white/30" />
                      </div>
                      
                      <p className="text-white mb-6 relative z-10 text-sm md:text-base">"{testimonial.quote}"</p>
                      
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white/20">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-white">{testimonial.author}</div>
                          <div className="text-sm text-white/70">
                            {testimonial.location} - {testimonial.project}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-white/20 hover:bg-white/30 border-white/10" />
            <CarouselNext className="bg-white/20 hover:bg-white/30 border-white/10" />
          </Carousel>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <p className="text-white/90">
              Rejoignez nos clients satisfaits et confiez-nous votre projet de construction ou rénovation.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Testimonials;
