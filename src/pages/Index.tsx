
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import CTASection from '@/components/home/CTASection';
import Testimonials from '@/components/home/Testimonials';
import LocationMap from '@/components/home/LocationMap';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';

const Index = () => {
  // Reveal animation for scrolling elements
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Progineer | Architecte & Maître d'oeuvre en PACA - Marseille, Nice, Toulon</title>
        <meta name="description" content="Progineer, entreprise d'architecture et de maîtrise d'œuvre spécialisée dans la construction, rénovation et extension de maisons sur mesure en région PACA." />
        <meta name="keywords" content="architecte Marseille, maître d'œuvre PACA, constructeur maison sur mesure, entreprise de travaux, rénovation, extension, optimisation énergétique, maîtrise d'ouvrage, accompagnement travaux" />
      </Helmet>

      <Hero />
      
      <Services />
      
      <CTASection />

      {/* Projects Preview Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16 max-w-2xl mx-auto reveal">
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Nos réalisations
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Découvrez nos projets récents
            </h2>
            <p className="text-gray-600 text-lg">
              Une sélection de nos réalisations en matière de construction, rénovation et extension dans la région PACA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal">
            {/* Project 1 */}
            <div className="group relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
                alt="Villa en bord de mer" 
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20">
                <div className="text-xs font-medium text-khaki-200 mb-2">Martignas sur Jalles</div>
                <h3 className="text-xl font-semibold text-white mb-1">Villa en bord de mer</h3>
                <p className="text-white/80 text-sm">Construction neuve</p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" 
                alt="Restructuration d'une friche" 
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20">
                <div className="text-xs font-medium text-khaki-200 mb-2">Lomme / Lille</div>
                <h3 className="text-xl font-semibold text-white mb-1">Restructuration d'une friche</h3>
                <p className="text-white/80 text-sm">Réhabilitation</p>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=2070&auto=format&fit=crop" 
                alt="Logements collectifs" 
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20">
                <div className="text-xs font-medium text-khaki-200 mb-2">Clermont-Ferrand</div>
                <h3 className="text-xl font-semibold text-white mb-1">Logements collectifs</h3>
                <p className="text-white/80 text-sm">Petit collectif</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button href="/realisations-architecte-maison" variant="outline">
              Voir toutes nos réalisations
            </Button>
          </div>
        </Container>
      </section>
      
      <Testimonials />
      
      <LocationMap />

      {/* Final CTA Section */}
      <section className="py-20 bg-khaki-600 text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Prêt à concrétiser votre projet ?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Contactez notre équipe d'architectes et de maîtres d'œuvre pour transformer votre vision en réalité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/estimation" className="bg-white text-khaki-800 hover:bg-white/90">
                Estimer mon projet
              </Button>
              <Button href="/contact" variant="outline" className="border-white/30 bg-transparent hover:bg-white/10">
                Nous contacter
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* SEO Section */}
      <section className="py-8 bg-stone-50 border-t border-stone-200">
        <Container>
          <div className="text-sm text-stone-500">
            <p className="mb-2">
              <strong>Progineer</strong> - Ingénieur, maître d'œuvre à Marseille et en PACA – Spécialiste en construction de maisons sur mesure, rénovation et extension. Nos architectes et ingénieurs vous accompagnent de A à Z.
            </p>
            <p>
              Nos zones d'intervention : Marseille, Saint-Tropez, Toulon, Nice, Cannes, Fréjus, toute la région Provence-Alpes-Côte d'Azur.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Index;
