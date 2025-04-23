
import React from 'react';
import { Link } from 'react-router-dom';

const ConstructionNeuveSEOContent: React.FC = () => {
  return (
    <section className="mt-16 bg-gray-50 p-8 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Guide complet pour faire construire votre maison</h2>
      
      <p className="mb-4">
        Fort de 5 années d'expérience dans des projets d'envergure, notre rôle de 
        <strong> constructeur de maison</strong> est de vous accompagner pour 
        <strong> faire construire</strong> dans les meilleures conditions. La construction d'une 
        <strong> maison individuelle</strong> nécessite une expertise que nous mettons à votre service.
      </p>

      <h3 className="text-xl font-medium my-4">Les étapes clés de votre projet</h3>
      <p className="mb-4">
        La première étape consiste à trouver un <strong>terrain à bâtir</strong> adapté. Notre 
        <Link to="/estimation" className="text-khaki-700 hover:underline"> service d'estimation</Link> vous aide à 
        évaluer précisément le coût total, incluant les frais liés au terrain.
      </p>

      <h3 className="text-xl font-medium my-4">Une expertise complète</h3>
      <p className="mb-4">
        Une <strong>entreprise de construction</strong> comme la nôtre vous accompagne de la conception à la 
        livraison. Pour les aspects esthétiques, notre service de 
        <Link to="/prestations-maitre-oeuvre/design-interieur" className="text-khaki-700 hover:underline"> design d'intérieur</Link> vous 
        guidera dans vos choix.
      </p>

      <div className="bg-white p-6 rounded-lg my-6">
        <h3 className="text-xl font-medium mb-4">FAQ Construction Neuve</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Quels sont les délais moyens de construction ?</h4>
            <p className="text-gray-600">
              Découvrez nos <Link to="/realisations-architecte-maison" className="text-khaki-700 hover:underline">réalisations</Link> pour 
              mieux comprendre nos délais.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Comment financer son projet ?</h4>
            <p className="text-gray-600">
              <Link to="/contact" className="text-khaki-700 hover:underline">Contactez-nous</Link> pour un 
              accompagnement personnalisé.
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-medium my-4">Des solutions adaptées</h3>
      <p className="mb-4">
        Si vous préférez rénover plutôt que construire, découvrez notre expertise en 
        <Link to="/prestations-maitre-oeuvre/renovation" className="text-khaki-700 hover:underline"> rénovation</Link>. 
        Pour agrandir votre espace, explorez nos solutions d'
        <Link to="/prestations-maitre-oeuvre/extension" className="text-khaki-700 hover:underline">extension</Link> et 
        d'<Link to="/prestations-maitre-oeuvre/optimisation-espace" className="text-khaki-700 hover:underline">optimisation d'espace</Link>.
      </p>

      <p className="mb-4">
        Pour en savoir plus sur notre philosophie, consultez notre page 
        <Link to="/a-propos" className="text-khaki-700 hover:underline"> À propos</Link>.
      </p>
    </section>
  );
};

export default ConstructionNeuveSEOContent;
