
import React, { useEffect } from 'react';
import SEO from '@/components/common/SEO';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import CTASection from '@/components/home/CTASection';
import Testimonials from '@/components/home/Testimonials';
import LocationMap from '@/components/home/LocationMap';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import { Building, Users, ArrowRight, Home, Clock, Award } from 'lucide-react';

const Index = () => {
  // Structured data for LocalBusiness
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Progineer",
    "description": "Entreprise d'architecture et de maîtrise d'œuvre spécialisée dans la construction, rénovation et extension de maisons sur mesure en région PACA.",
    "url": "https://progineer.fr",
    "telephone": "+33783762156",
    "email": "progineer.moe@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Marseille",
      "addressRegion": "PACA",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "43.296482",
      "longitude": "5.369780"
    },
    "areaServed": ["Marseille", "Nice", "Toulon", "Cannes", "Fréjus", "PACA"],
    "sameAs": [
      "https://facebook.com/progineer",
      "https://instagram.com/progineer",
      "https://linkedin.com/company/progineer"
    ],
    "priceRange": "€€€",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "image": "https://progineer.fr/og-image.jpg"
  };

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
      <SEO 
        title="Progineer | Architecte & Maître d'oeuvre en PACA - Marseille, Nice, Toulon"
        description="Progineer, entreprise d'architecture et de maîtrise d'œuvre spécialisée dans la construction, rénovation et extension de maisons sur mesure en région PACA."
        keywords="architecte Marseille, maître d'œuvre PACA, constructeur maison sur mesure, entreprise de travaux, rénovation, extension, optimisation énergétique, maîtrise d'ouvrage, accompagnement travaux"
        canonicalUrl="https://progineer.fr/"
        structuredData={structuredData}
      />

      <Hero />
      
      {/* Avantages Section */}
      <section className="py-16 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-300/50 to-transparent"></div>
        
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Avantage 1 */}
            <div className="flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 hover:shadow-md hover:bg-stone-50">
              <div className="w-16 h-16 bg-progineer-gold/10 rounded-full flex items-center justify-center mb-4">
                <Home className="h-8 w-8 text-progineer-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Construction sur mesure</h3>
              <p className="text-gray-600">Des maisons personnalisées selon vos besoins et votre style de vie</p>
            </div>
            
            {/* Avantage 2 */}
            <div className="flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 hover:shadow-md hover:bg-stone-50">
              <div className="w-16 h-16 bg-progineer-gold/10 rounded-full flex items-center justify-center mb-4">
                <Building className="h-8 w-8 text-progineer-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expertise architecturale</h3>
              <p className="text-gray-600">Une équipe d'architectes et d'ingénieurs qualifiés à votre service</p>
            </div>
            
            {/* Avantage 3 */}
            <div className="flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 hover:shadow-md hover:bg-stone-50">
              <div className="w-16 h-16 bg-progineer-gold/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-progineer-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Suivi personnalisé</h3>
              <p className="text-gray-600">Un accompagnement constant tout au long de votre projet de construction</p>
            </div>
            
            {/* Avantage 4 */}
            <div className="flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 hover:shadow-md hover:bg-stone-50">
              <div className="w-16 h-16 bg-progineer-gold/10 rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-progineer-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Qualité garantie</h3>
              <p className="text-gray-600">Des matériaux et finitions de haute qualité pour un résultat exceptionnel</p>
            </div>
          </div>
        </Container>
      </section>
      
      <Services />
      
      <CTASection />

      {/* Projects Preview Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-300/50 to-transparent"></div>
        
        <Container>
          <div className="text-center mb-16 max-w-2xl mx-auto reveal">
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-progineer-gold/10 text-progineer-gold text-sm font-medium">
              Nos réalisations
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Découvrez nos projets récents
            </h2>
            <div className="h-1 w-16 bg-progineer-gold mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">
              Une sélection de nos réalisations en matière de construction, rénovation et extension dans la région PACA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal">
            {/* Project 1 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
                alt="Villa contemporaine à Martigues" 
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20">
                <div className="text-xs font-medium text-progineer-gold mb-2">Martigues</div>
                <h3 className="text-xl font-semibold text-white mb-1">Villa Contemporaine</h3>
                <p className="text-white/80 text-sm mb-3">Construction neuve</p>
                <Button 
                  href="/realisations-architecte-maison/villa-contemporaine" 
                  className="text-xs px-3 py-1 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30"
                >
                  Voir le projet
                </Button>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" 
                alt="Rénovation d'un appartement haussmannien à Marseille" 
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20">
                <div className="text-xs font-medium text-progineer-gold mb-2">Marseille</div>
                <h3 className="text-xl font-semibold text-white mb-1">Appartement Haussmannien</h3>
                <p className="text-white/80 text-sm mb-3">Rénovation complète</p>
                <Button 
                  href="/realisations-architecte-maison/appartement-haussmannien" 
                  className="text-xs px-3 py-1 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30"
                >
                  Voir le projet
                </Button>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=2070&auto=format&fit=crop" 
                alt="Extension moderne à Aix-en-Provence" 
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20">
                <div className="text-xs font-medium text-progineer-gold mb-2">Aix-en-Provence</div>
                <h3 className="text-xl font-semibold text-white mb-1">Extension Moderne</h3>
                <p className="text-white/80 text-sm mb-3">Extension & rénovation</p>
                <Button 
                  href="/realisations-architecte-maison/extension-moderne" 
                  className="text-xs px-3 py-1 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30"
                >
                  Voir le projet
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              href="/realisations-architecte-maison" 
              variant="outline"
              className="bg-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              Voir toutes nos réalisations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>
      
      <Testimonials />
      
      <LocationMap />

      {/* Final CTA Section */}
      <section className="py-20 bg-progineer-dark text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23D4AF37\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <Container>
          <div className="text-center max-w-3xl mx-auto relative z-10">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Prêt à concrétiser votre projet ?
            </h2>
            <div className="h-1 w-20 bg-progineer-gold mx-auto mb-6"></div>
            <p className="text-lg text-white/90 mb-8">
              Contactez notre équipe d'architectes et de maîtres d'œuvre pour transformer votre vision en réalité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="/estimation" 
                className="bg-progineer-gold text-white hover:bg-progineer-gold/90 shadow-lg border border-progineer-gold/50 text-lg py-3"
              >
                Estimer mon projet
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                href="/contact" 
                variant="outline" 
                className="border-white/40 bg-white/10 hover:bg-white/20 shadow-lg text-lg py-3"
              >
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
            <h2 className="text-base font-medium mb-2 text-stone-700">Entreprise d'architecture et de maîtrise d'œuvre en PACA</h2>
            <p className="mb-2">
              <strong>Progineer</strong> - Ingénieur, maître d'œuvre à Marseille et en PACA – Spécialiste en construction de maisons sur mesure, rénovation et extension. Nos architectes et ingénieurs vous accompagnent de A à Z dans tous vos projets de construction et rénovation.
            </p>
            <p>
              Nos zones d'intervention : <strong>Marseille</strong>, <strong>Saint-Tropez</strong>, <strong>Toulon</strong>, <strong>Nice</strong>, <strong>Cannes</strong>, <strong>Fréjus</strong>, toute la région <strong>Provence-Alpes-Côte d'Azur</strong>.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Index;
