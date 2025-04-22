
import React from 'react';
import Container from '@/components/common/Container';
import { Link } from 'react-router-dom';

const SEOFooter = () => {
  return (
    <section className="py-8 bg-stone-50 border-t border-stone-200">
      <Container>
        <div className="text-sm text-stone-500">
          <p className="mb-4">
            <Link to="/" className="text-progineer-gold hover:underline">Progineer</Link>, ingénieur et maître d'œuvre à Marseille et en PACA – Spécialiste en <Link to="/prestations-maitre-oeuvre/construction-neuve" className="text-progineer-gold hover:underline">construction de maisons sur mesure</Link>, <Link to="/prestations-maitre-oeuvre/renovation" className="text-progineer-gold hover:underline">rénovation</Link> et <Link to="/prestations-maitre-oeuvre/extension" className="text-progineer-gold hover:underline">extension</Link>. Rejoignez notre réseau de partenaires artisans et professionnels du bâtiment pour collaborer sur des projets de qualité dans la région Provence-Alpes-Côte d'Azur.
          </p>
          
          <div className="flex flex-wrap gap-3 mt-4">
            <Link to="/prestations-maitre-oeuvre" className="text-xs bg-stone-200 px-2 py-1 rounded hover:bg-progineer-gold hover:text-white transition-colors">
              Nos prestations
            </Link>
            <Link to="/contact" className="text-xs bg-stone-200 px-2 py-1 rounded hover:bg-progineer-gold hover:text-white transition-colors">
              Nous contacter
            </Link>
            <Link to="/realisations-architecte-maison" className="text-xs bg-stone-200 px-2 py-1 rounded hover:bg-progineer-gold hover:text-white transition-colors">
              Nos réalisations
            </Link>
            <Link to="/equipe-maitrise-oeuvre" className="text-xs bg-stone-200 px-2 py-1 rounded hover:bg-progineer-gold hover:text-white transition-colors">
              Notre équipe
            </Link>
            <Link to="/sitemap" className="text-xs bg-stone-200 px-2 py-1 rounded hover:bg-progineer-gold hover:text-white transition-colors">
              Plan du site
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SEOFooter;
