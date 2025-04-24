
import React from 'react';
import Container from '@/components/common/Container';
import { Link } from 'react-router-dom';

const SEOFooter = () => {
  return (
    <section className="py-12 bg-stone-100 border-t border-stone-200">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-sm text-stone-700/80 leading-relaxed">
            <p className="mb-4">
              <Link to="/" className="text-progineer-gold hover:underline">Progineer</Link>, ingénieur et maître d'œuvre à Marseille et en PACA – Spécialiste en <Link to="/prestations-maitre-oeuvre/construction-neuve" className="text-progineer-gold hover:underline">construction de maisons sur mesure</Link>, <Link to="/prestations-maitre-oeuvre/renovation" className="text-progineer-gold hover:underline">rénovation</Link> et <Link to="/prestations-maitre-oeuvre/extension" className="text-progineer-gold hover:underline">extension</Link>. Rejoignez notre réseau de partenaires artisans et professionnels du bâtiment pour collaborer sur des projets de qualité dans la région Provence-Alpes-Côte d'Azur.
            </p>
            
            <div className="mt-6 pt-4 border-t border-stone-200">
              <p className="text-sm text-stone-600/70">
                Pour trouver d'autres professionnels du secteur, consultez <a href="https://www.maitredoeuvre.com/" className="text-progineer-gold hover:underline" rel="noopener">Trouver un maitre d'œuvre</a> - annuaire des maîtres d'œuvre en France.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SEOFooter;
