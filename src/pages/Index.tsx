
import React from 'react';
import Hero from '../components/home/Hero';
import ExpertiseSection from '../components/home/ExpertiseSection';
import Services from '../components/home/Services';
import Testimonials from '../components/home/Testimonials';
import CTASection from '../components/home/CTASection';
import StatsSection from '../components/home/StatsSection';
import LocationMap from '../components/home/LocationMap';
import { getBusinessStructuredData } from '../utils/googleBusiness';
import SEO from '../components/common/SEO';
import SEOFooter from '@/components/common/SEOFooter';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <>
      <SEO 
        title="Maître d'œuvre Marseille | Construction & Rénovation | Progineer PACA"
        description="Maître d'œuvre à Marseille expert en construction, rénovation et extension de maisons. Coordination des corps de métier, respect des délais et expertise technique pour vos projets en PACA."
        keywords="maître d'œuvre marseille, maîtrise d'œuvre, coordination chantier, corps de métier, expertise technique, respect des délais, projet de rénovation, maître d'ouvrage, maîtres d'œuvre"
        canonicalUrl="https://progineer.fr/"
        structuredData={getBusinessStructuredData()}
      />
      
      <main className="pt-16">
        <h1 className="sr-only">Maître d'œuvre à Marseille - Progineer Construction & Rénovation</h1>
        <Hero />
        <ExpertiseSection />
        <Services />
        <StatsSection />
        <Testimonials />
        <LocationMap />
        <CTASection />
        
        {/* Amélioration SEO - Ajout de liens internes supplémentaires */}
        <section className="py-8 bg-stone-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
              <div>
                <h2 className="text-xl font-semibold mb-4">Nos prestations</h2>
                <ul className="space-y-2">
                  <li><Link to="/prestations-maitre-oeuvre/construction-neuve" className="text-progineer-gold hover:underline">Construction neuve</Link></li>
                  <li><Link to="/prestations-maitre-oeuvre/renovation" className="text-progineer-gold hover:underline">Rénovation</Link></li>
                  <li><Link to="/prestations-maitre-oeuvre/extension" className="text-progineer-gold hover:underline">Extension</Link></li>
                  <li><Link to="/prestations-maitre-oeuvre/design-interieur" className="text-progineer-gold hover:underline">Design d'intérieur</Link></li>
                  <li><Link to="/prestations-maitre-oeuvre/optimisation-espace" className="text-progineer-gold hover:underline">Optimisation d'espace</Link></li>
                  <li><Link to="/sitemap.xml" className="text-progineer-gold hover:underline">Plan du site XML</Link></li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Notre entreprise</h2>
                <ul className="space-y-2">
                  <li><Link to="/a-propos" className="text-progineer-gold hover:underline">À propos</Link></li>
                  <li><Link to="/realisations-architecte-maison" className="text-progineer-gold hover:underline">Nos réalisations</Link></li>
                  <li><Link to="/equipe-maitrise-oeuvre" className="text-progineer-gold hover:underline">Notre équipe</Link></li>
                  <li><Link to="/parrainage" className="text-progineer-gold hover:underline">Programme de parrainage</Link></li>
                  <li><Link to="/devenir-partenaire" className="text-progineer-gold hover:underline">Devenir partenaire</Link></li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Informations</h2>
                <ul className="space-y-2">
                  <li><Link to="/estimation" className="text-progineer-gold hover:underline">Estimer mon projet</Link></li>
                  <li><Link to="/contact" className="text-progineer-gold hover:underline">Nous contacter</Link></li>
                  <li><Link to="/faq" className="text-progineer-gold hover:underline">FAQ</Link></li>
                  <li><Link to="/mentions-legales" className="text-progineer-gold hover:underline">Mentions légales</Link></li>
                  <li><Link to="/sitemap" className="text-progineer-gold hover:underline">Plan du site</Link></li>
                  <li><Link to="/cgu" className="text-progineer-gold hover:underline">CGU</Link></li>
                  <li><Link to="/cgv" className="text-progineer-gold hover:underline">CGV</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <SEOFooter 
        text="Votre maître d'œuvre à Marseille et en PACA. Progineer assure la coordination des corps de métier et le respect des délais pour vos projets de construction et rénovation. Notre expertise technique et notre maîtrise d'œuvre garantissent la réussite de votre projet immobilier en Provence-Alpes-Côte d'Azur."
        additionalKeywords={["maître d'œuvre marseille", "coordination corps de métier", "expertise technique construction", "respect délais chantier", "rénovation marseille", "maître d'ouvrage", "projet de rénovation", "maîtrise d'œuvre"]}
      />
    </>
  );
};

export default Index;
