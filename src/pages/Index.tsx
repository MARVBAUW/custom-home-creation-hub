
import React, { useEffect } from 'react';
import SEO from '@/components/common/SEO';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import CTASection from '@/components/home/CTASection';
import Testimonials from '@/components/home/Testimonials';
import LocationMap from '@/components/home/LocationMap';
import AdvantagesSection from '@/components/home/AdvantagesSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import FinalCTASection from '@/components/home/FinalCTASection';
import SEOSection from '@/components/home/SEOSection';

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
      
      <AdvantagesSection />
      
      <Services />
      
      <CTASection />

      <ProjectsSection />
      
      <Testimonials />
      
      <LocationMap />

      <FinalCTASection />

      <SEOSection />
    </>
  );
};

export default Index;
