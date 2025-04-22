
import React from 'react';
import Container from '@/components/common/Container';
import { Star, Quote } from 'lucide-react';

const testimonials = [{
  quote: "Progineer a su transformer notre vision en réalité. Leur équipe a été à l'écoute de nos besoins et a créé une maison qui correspond parfaitement à notre style de vie.",
  author: "Marie et Pierre",
  location: "Marseille",
  project: "Construction maison 180m²",
  rating: 5
}, {
  quote: "Un accompagnement sans faille de la conception à la livraison. Les équipes de Progineer ont su gérer les imprévus avec professionnalisme.",
  author: "Laurent M.",
  location: "Toulon",
  project: "Rénovation complète",
  rating: 5
}, {
  quote: "Excellente communication tout au long du projet. Le résultat final a dépassé nos attentes et le budget a été respecté à la lettre.",
  author: "Sophie D.",
  location: "Saint-Tropez",
  project: "Extension 45m²",
  rating: 5
}];

const Testimonials = () => {
  return (
    <section className="relative py-20 bg-cover bg-center text-white" 
      style={{ 
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1600660344085-d8bd05bfb8a5?q=80&w=2070&auto=format&fit=crop')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      <Container>
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-sm">
            Témoignages
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-white/80 text-lg">
            Découvrez les retours d'expérience de nos clients satisfaits dans toute la région PACA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 relative transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="absolute top-6 right-6 text-white/30">
                <Quote className="h-12 w-12" />
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="h-5 w-5 text-yellow-400 fill-yellow-400" 
                  />
                ))}
              </div>
              
              <p className="text-white mb-6 relative z-10">"{testimonial.quote}"</p>
              
              <div>
                <div className="font-semibold text-white">{testimonial.author}</div>
                <div className="text-sm text-white/70">
                  {testimonial.location} - {testimonial.project}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
