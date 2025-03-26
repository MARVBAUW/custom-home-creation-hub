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
  return <section className="py-20 bg-zinc-300">
      <Container>
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
            Témoignages
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-gray-600 text-lg">
            Découvrez les retours d'expérience de nos clients satisfaits dans toute la région PACA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative">
              <div className="absolute top-6 right-6 text-khaki-200 opacity-30">
                <Quote className="h-12 w-12" />
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
              </div>
              
              <p className="text-gray-700 mb-6 relative z-10">"{testimonial.quote}"</p>
              
              <div>
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-gray-500">{testimonial.location} - {testimonial.project}</div>
              </div>
            </div>)}
        </div>
      </Container>
    </section>;
};
export default Testimonials;