
import React from 'react';
import { Link } from 'react-router-dom';

const RenovationSEOContent: React.FC = () => {
  return (
    <section className="mt-16 bg-gray-50 p-8 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Guide complet de la rénovation de maison en PACA</h2>
      
      <p className="mb-4">
        La <strong>rénovation énergétique</strong> est devenue une priorité pour de nombreux propriétaires en région PACA. 
        Que vous envisagiez une <strong>rénovation maison ancienne</strong> ou une <strong>rénovation globale</strong>, 
        il est essentiel de bien comprendre les enjeux et les étapes clés de votre projet.
      </p>

      <h3 className="text-xl font-medium my-4">L'importance de l'audit énergétique</h3>
      <p className="mb-4">
        Avant d'entamer tout projet de rénovation, un <strong>audit énergétique</strong> approfondi est recommandé. 
        Cette étape cruciale permet d'identifier les points faibles de votre habitat et de définir les travaux prioritaires. 
        Notre <Link to="/estimation" className="text-khaki-700 hover:underline">service d'estimation gratuite</Link> vous 
        aide à évaluer précisément le coût de vos travaux.
      </p>

      <h3 className="text-xl font-medium my-4">Les différents types de rénovation</h3>
      <p className="mb-4">
        Une <strong>entreprise rénovation</strong> comme Progineer peut vous accompagner dans différents types de projets. 
        Si vous envisagez d'agrandir votre espace, notre expertise en <Link to="/prestations-maitre-oeuvre/extension" className="text-khaki-700 hover:underline">extension de maison</Link> vous 
        sera précieuse. Pour optimiser vos espaces intérieurs, découvrez nos solutions d'<Link to="/prestations-maitre-oeuvre/optimisation-espace" className="text-khaki-700 hover:underline">optimisation d'espace</Link>.
      </p>

      <div className="bg-white p-6 rounded-lg my-6">
        <h3 className="text-xl font-medium mb-4">FAQ Rénovation</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Quand faire appel à un professionnel pour sa rénovation ?</h4>
            <p className="text-gray-600">
              Il est recommandé de faire appel à une <strong>entreprise de rénovation</strong> dès la phase de conception. 
              Consultez notre page <Link to="/a-propos" className="text-khaki-700 hover:underline">à propos</Link> pour 
              en savoir plus sur notre approche professionnelle.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Comment financer sa rénovation ?</h4>
            <p className="text-gray-600">
              Plusieurs aides sont disponibles pour la rénovation énergétique. Contactez nos experts via notre 
              <Link to="/contact" className="text-khaki-700 hover:underline"> page de contact</Link> pour un accompagnement personnalisé.
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-medium my-4">Solutions esthétiques et fonctionnelles</h3>
      <p className="mb-4">
        Au-delà de l'aspect technique, une rénovation réussie doit aussi être esthétique. Notre service de 
        <Link to="/prestations-maitre-oeuvre/design-interieur" className="text-khaki-700 hover:underline"> design d'intérieur</Link> vous 
        aide à créer un espace harmonieux. Pour ceux qui préfèrent partir de zéro, notre expertise en 
        <Link to="/prestations-maitre-oeuvre/construction-neuve" className="text-khaki-700 hover:underline"> construction neuve</Link> est 
        également disponible.
      </p>

      <p className="mb-4">
        Découvrez nos <Link to="/realisations-architecte-maison" className="text-khaki-700 hover:underline">réalisations en rénovation</Link> pour 
        vous inspirer et visualiser le potentiel de transformation de votre habitat.
      </p>
    </section>
  );
};

export default RenovationSEOContent;
