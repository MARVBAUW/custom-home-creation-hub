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
import { ArrowRight } from 'lucide-react';
import { InternalLinkText } from '@/utils/internalLinking';

const Index = () => {
  return (
    <>
      <SEO 
        forcedPageKey="home"
        structuredData={getBusinessStructuredData()}
      />
      
      <main className="pt-16">
        {/* h1 is now visible rather than using sr-only */}
        <h1 className="text-center px-4 py-6 bg-khaki-50 text-3xl md:text-4xl font-semibold text-gray-900">
          Maître d'œuvre à Marseille - Progineer Construction & Rénovation
        </h1>
        
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
                <InternalLinkText 
                  text="Explorez l'ensemble de nos services et ressources pour votre projet de construction ou rénovation."
                  maxOccurrences={2}
                />
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
        
        {/* Additional SEO content to increase word count */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6">Notre expertise en maîtrise d'œuvre à Marseille</h2>
              <div className="prose max-w-none text-gray-700">
                <p>
                  Progineer est votre <strong>maître d'œuvre à Marseille</strong> et en région PACA, spécialisé dans la 
                  <strong>construction de maisons individuelles</strong>, la <strong>rénovation d'appartements</strong> et
                  l'<strong>extension de bâtiments</strong>. Notre équipe d'experts vous accompagne à chaque étape de votre projet, 
                  de la conception initiale à la livraison finale, en passant par toutes les phases intermédiaires essentielles.
                </p>
                
                <p className="mt-4">
                  En tant que <strong>maître d'œuvre professionnel</strong>, nous assurons une <strong>coordination efficace des corps de métier</strong> 
                  impliqués dans votre chantier. Cette expertise garantit une harmonie parfaite entre les différents artisans et entreprises, 
                  pour un résultat final à la hauteur de vos attentes. Notre engagement pour le <strong>respect des délais</strong> est 
                  primordial dans notre démarche, vous permettant de planifier sereinement votre projet immobilier.
                </p>
                
                <p className="mt-4">
                  L'<strong>expertise technique</strong> est au cœur de notre métier. Nos ingénieurs et architectes possèdent une connaissance 
                  approfondie des normes de construction et des innovations du secteur, vous garantissant des solutions durables et 
                  parfaitement adaptées à votre projet en <strong>Provence-Alpes-Côte d'Azur</strong>.
                </p>
                
                <h3 className="text-xl font-medium mt-8 mb-4">Construction neuve en PACA</h3>
                <p>
                  Pour votre <strong>construction de maison neuve</strong>, nous vous proposons un accompagnement global : études préliminaires, 
                  conception architecturale personnalisée, plans détaillés, permis de construire, et suivi rigoureux du chantier. 
                  Notre objectif est de concrétiser la maison de vos rêves, en respectant votre budget et vos exigences spécifiques.
                </p>
                
                <h3 className="text-xl font-medium mt-8 mb-4">Rénovation d'intérieur à Marseille</h3>
                <p>
                  La <strong>rénovation d'appartement ou de maison</strong> nécessite une expertise particulière pour transformer votre 
                  espace existant tout en préservant son caractère. À Marseille et dans toute la région PACA, nos services de rénovation 
                  incluent le diagnostic complet, les recommandations d'optimisation, et la mise en œuvre de solutions adaptées à votre 
                  habitat et à vos besoins.
                </p>
                
                <h3 className="text-xl font-medium mt-8 mb-4">Extension et agrandissement</h3>
                <p>
                  L'<strong>extension de maison</strong> représente une excellente solution pour gagner de l'espace sans déménager. 
                  Notre équipe conçoit des extensions parfaitement intégrées à votre bâti existant, en harmonie architecturale et 
                  fonctionnelle. Nous gérons l'ensemble du processus, des démarches administratives à la livraison de votre nouvel espace.
                </p>
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
