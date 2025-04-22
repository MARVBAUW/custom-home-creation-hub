
import React from 'react';
import Container from '@/components/common/Container';
import { Link } from 'react-router-dom';

interface SEOFooterProps {
  text: string;
  additionalKeywords?: string[];
}

const SEOFooter = ({ text, additionalKeywords = [] }: SEOFooterProps) => {
  // Add location data to improve local SEO
  const locations = [
    "Marseille", "Nice", "Toulon", "Cannes", "Aix-en-Provence", "Antibes", 
    "Saint-Tropez", "Fréjus", "Saint-Raphaël", "La Ciotat", "Hyères", 
    "Six-Fours-les-Plages", "Cassis", "Bandol", "Sanary-sur-Mer"
  ];
  
  // Add service keywords
  const services = [
    "construction maison", "rénovation villa", "extension habitat", 
    "design d'intérieur", "maître d'œuvre", "architecte PACA",
    "optimisation espace", "aménagement intérieur", "rénovation énergétique",
    "coordination corps de métier", "respect des délais", "choix de matériaux"
  ];

  // Combine standard keywords with any additional ones
  const keywordsToUse = [...additionalKeywords];

  return (
    <section className="py-10 bg-stone-50 dark:bg-gray-900 border-t border-stone-200 dark:border-gray-800">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
            <p className="mb-3">{text}</p>
            
            <h2 className="text-base font-medium text-stone-700 dark:text-stone-300 mt-5 mb-2">Zones d'intervention en région PACA</h2>
            <p className="mb-3">
              Notre entreprise de maîtrise d'œuvre intervient dans toute la région PACA (Provence-Alpes-Côte d'Azur), notamment à {locations.slice(0, -1).join(', ')} et {locations[locations.length - 1]}.
              Que vous souhaitiez <Link to="/prestations-maitre-oeuvre/construction-neuve" className="text-progineer-gold hover:underline">construire</Link>, <Link to="/prestations-maitre-oeuvre/renovation" className="text-progineer-gold hover:underline">rénover</Link> ou <Link to="/prestations-maitre-oeuvre/extension" className="text-progineer-gold hover:underline">agrandir</Link> votre maison, notre équipe de professionnels vous accompagne tout au long de votre projet.
            </p>
            
            <h2 className="text-base font-medium text-stone-700 dark:text-stone-300 mt-5 mb-2">Nos services de maîtrise d'œuvre</h2>
            <p>
              <Link to="/" className="text-progineer-gold hover:underline">Progineer</Link> propose une gamme complète de services incluant {services.slice(0, -1).join(', ')} et {services[services.length - 1]}.
              Notre <Link to="/equipe-maitrise-oeuvre" className="text-progineer-gold hover:underline">expertise technique</Link> et notre connaissance approfondie des réglementations locales garantissent la réussite de votre <Link to="/estimation" className="text-progineer-gold hover:underline">projet immobilier</Link> en région PACA.
            </p>
            
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <Link to="/prestations-maitre-oeuvre" className="text-xs bg-stone-200 dark:bg-gray-800 px-2 py-1 rounded hover:bg-progineer-gold hover:text-white transition-colors">
                Nos prestations
              </Link>
              <Link to="/contact" className="text-xs bg-stone-200 dark:bg-gray-800 px-2 py-1 rounded hover:bg-progineer-gold hover:text-white transition-colors">
                Nous contacter
              </Link>
              <Link to="/estimation" className="text-xs bg-stone-200 dark:bg-gray-800 px-2 py-1 rounded hover:bg-progineer-gold hover:text-white transition-colors">
                Estimer mon projet
              </Link>
              <Link to="/realisations-architecte-maison" className="text-xs bg-stone-200 dark:bg-gray-800 px-2 py-1 rounded hover:bg-progineer-gold hover:text-white transition-colors">
                Voir nos réalisations
              </Link>
              <Link to="/faq" className="text-xs bg-stone-200 dark:bg-gray-800 px-2 py-1 rounded hover:bg-progineer-gold hover:text-white transition-colors">
                FAQ
              </Link>
              <Link to="/a-propos" className="text-xs bg-stone-200 dark:bg-gray-800 px-2 py-1 rounded hover:bg-progineer-gold hover:text-white transition-colors">
                À propos
              </Link>
              <Link to="/equipe-maitrise-oeuvre" className="text-xs bg-stone-200 dark:bg-gray-800 px-2 py-1 rounded hover:bg-progineer-gold hover:text-white transition-colors">
                Notre équipe
              </Link>
              <Link to="/sitemap" className="text-xs bg-stone-200 dark:bg-gray-800 px-2 py-1 rounded hover:bg-progineer-gold hover:text-white transition-colors">
                Plan du site
              </Link>
              <Link to="/sitemap.xml" className="text-xs bg-stone-200 dark:bg-gray-800 px-2 py-1 rounded hover:bg-progineer-gold hover:text-white transition-colors">
                Sitemap XML
              </Link>
            </div>
            
            {keywordsToUse.length > 0 && (
              <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-700">
                <p className="text-xs text-stone-500 dark:text-stone-500">
                  {keywordsToUse.join(' • ')}
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SEOFooter;
