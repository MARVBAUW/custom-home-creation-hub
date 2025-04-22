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
import { ArrowRight } from 'lucide-react';  // Add this import

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
        <section className="py-16 bg-gradient-to-b from-stone-100 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold mb-6 text-gray-900">
                Tout ce dont vous avez besoin
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explorez l'ensemble de nos services et ressources pour votre projet de construction ou rénovation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Nos prestations</h3>
                <ul className="space-y-3">
                  <li><Link to="/prestations-maitre-oeuvre/construction-neuve" className="text-khaki-600 hover:text-khaki-800 transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Construction neuve
                  </Link></li>
                  <li><Link to="/prestations-maitre-oeuvre/renovation" className="text-khaki-600 hover:text-khaki-800 transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Rénovation
                  </Link></li>
                  <li><Link to="/prestations-maitre-oeuvre/extension" className="text-khaki-600 hover:text-khaki-800 transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Extension
                  </Link></li>
                  <li><Link to="/prestations-maitre-oeuvre/design-interieur" className="text-khaki-600 hover:text-khaki-800 transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Design d'intérieur
                  </Link></li>
                  <li><Link to="/prestations-maitre-oeuvre/optimisation-espace" className="text-khaki-600 hover:text-khaki-800 transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Optimisation d'espace
                  </Link></li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Notre entreprise</h3>
                <ul className="space-y-3">
                  <li><Link to="/a-propos" className="text-khaki-600 hover:text-khaki-800 transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    À propos
                  </Link></li>
                  <li><Link to="/realisations-architecte-maison" className="text-khaki-600 hover:text-khaki-800 transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Nos réalisations
                  </Link></li>
                  <li><Link to="/equipe-maitrise-oeuvre" className="text-khaki-600 hover:text-khaki-800 transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Notre équipe
                  </Link></li>
                  <li><Link to="/parrainage" className="text-khaki-600 hover:text-khaki-800 transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Programme de parrainage
                  </Link></li>
                  <li><Link to="/devenir-partenaire" className="text-khaki-600 hover:text-khaki-800 transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Devenir partenaire
                  </Link></li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Informations</h3>
                <ul className="space-y-3">
                  <li><Link to="/estimation" className="text-khaki-600 hover:text-khaki-800 transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Estimer mon projet
                  </Link></li>
                  <li><Link to="/contact" className="text-khaki-600 hover:text-khaki-800 transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Nous contacter
                  </Link></li>
                  <li><Link to="/faq" className="text-khaki-600 hover:text-khaki-800 transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    FAQ
                  </Link></li>
                  <li><Link to="/mentions-legales" className="text-khaki-600 hover:text-khaki-800 transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Mentions légales
                  </Link></li>
                  <li><Link to="/sitemap" className="text-khaki-600 hover:text-khaki-800 transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Plan du site
                  </Link></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <SEOFooter 
        text="Votre maître d'œuvre à Marseille et en PACA. Progineer assure la coordination des corps de métier et le respect des délais pour vos projets de construction et rénovation. Notre expertise technique et notre maîtrise d'œuvre garantissent la réussite de votre projet immobilier en Provence-Alpes-Côte d'Azur."
        additionalKeywords={[
          "maître d'œuvre marseille", 
          "coordination corps de métier", 
          "expertise technique construction", 
          "respect délais chantier", 
          "rénovation marseille", 
          "maître d'ouvrage", 
          "projet de rénovation", 
          "maîtrise d'œuvre"
        ]}
      />

      {/* Discreet backlink section */}
      <div className="sr-only">
        <a 
          href="https://www.maitredoeuvre.com/" 
          rel="nofollow" 
          target="_blank"
        >
          Annuaire de maitres d'oeuvre
        </a>
      </div>
    </>
  );
};

export default Index;
