
import React, { useEffect } from 'react';
import SEO from '@/components/common/SEO';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import CTASection from '@/components/home/CTASection';
import Testimonials from '@/components/home/Testimonials';
import LocationMap from '@/components/home/LocationMap';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';

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
    "sameAs": ["https://facebook.com/progineer", "https://instagram.com/progineer", "https://linkedin.com/company/progineer"],
    "priceRange": "€€€",
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }],
    "image": "https://progineer.fr/og-image.jpg"
  };

  // Reveal animation for scrolling elements
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1
    });
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
              <img 
                alt="Villa en bord de mer à Martignas sur Jalles" 
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105" 
                src="/lovable-uploads/732fa99d-df25-4869-9ca9-b49ccf6f51a4.png" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
              <div className="absolute bottom-0 left-0 p-6 z-20">
                <div className="text-xs font-medium text-khaki-200 mb-2">Martignas sur Jalles</div>
                <h3 className="text-xl font-semibold text-white mb-1">Villa en bord de mer</h3>
                <p className="text-white/80 text-sm">Construction neuve</p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group relative overflow-hidden rounded-xl">
              <img 
                alt="Restructuration d'une friche industrielle à Lomme / Lille" 
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105" 
                src="/lovable-uploads/2443b8c7-2cec-45ef-becc-407fb5078cf6.jpg" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
              <div className="absolute bottom-0 left-0 p-6 z-20">
                <div className="text-xs font-medium text-khaki-200 mb-2">Lomme / Lille</div>
                <h3 className="text-xl font-semibold text-white mb-1">Restructuration d'une friche</h3>
                <p className="text-white/80 text-sm">Réhabilitation</p>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group relative overflow-hidden rounded-xl">
              <img 
                alt="Logements collectifs à Clermont-Ferrand" 
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105" 
                src="/lovable-uploads/32221f3f-9469-4804-9663-067d2065aa7e.png" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
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
