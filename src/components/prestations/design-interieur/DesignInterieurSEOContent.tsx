
import React from 'react';
import { Link } from 'react-router-dom';

const DesignInterieurSEOContent: React.FC = () => {
  return (
    <section className="mt-16 bg-gray-50 p-8 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Design d'intérieur : créer un habitat qui vous ressemble</h2>
      
      <p className="mb-4">
        Avec 5 années d'expertise dans des projets d'envergure, notre approche en tant 
        qu'<strong>architecte d'intérieur</strong> vous garantit un résultat à la hauteur de vos attentes. 
        Notre maîtrise du <strong>design d'espace</strong> permet de créer un intérieur qui reflète votre 
        personnalité.
      </p>

      <h3 className="text-xl font-medium my-4">L'importance de la décoration intérieure</h3>
      <p className="mb-4">
        La <strong>décoration</strong> joue un rôle essentiel dans votre bien-être quotidien. Elle crée une 
        <strong> ambiance moderne</strong> propice à la détente. Pour un aménagement optimal, découvrez nos solutions 
        d'<Link to="/prestations-maitre-oeuvre/optimisation-espace" className="text-khaki-700 hover:underline">optimisation d'espace</Link>.
      </p>

      <h3 className="text-xl font-medium my-4">Matériaux et harmonie</h3>
      <p className="mb-4">
        L'<strong>harmonie intérieure</strong> repose sur un choix judicieux des <strong>matériaux</strong>. 
        Si votre projet nécessite des travaux plus importants, notre expertise en 
        <Link to="/prestations-maitre-oeuvre/renovation" className="text-khaki-700 hover:underline"> rénovation</Link> vous 
        accompagnera dans cette transformation.
      </p>

      <div className="bg-white p-6 rounded-lg my-6">
        <h3 className="text-xl font-medium mb-4">FAQ Design d'Intérieur</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Quelle est la première étape d'un projet de design d'intérieur ?</h4>
            <p className="text-gray-600">
              Commencez par <Link to="/estimation" className="text-khaki-700 hover:underline">estimer votre projet</Link> pour 
              avoir une vision claire du budget.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Comment choisir son style de décoration ?</h4>
            <p className="text-gray-600">
              Inspirez-vous de nos <Link to="/realisations-architecte-maison" className="text-khaki-700 hover:underline">réalisations</Link> 
              pour définir votre style.
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-medium my-4">Une approche globale du design</h3>
      <p className="mb-4">
        Pour les projets plus ambitieux, découvrez nos services d'
        <Link to="/prestations-maitre-oeuvre/extension" className="text-khaki-700 hover:underline">extension</Link> ou de 
        <Link to="/prestations-maitre-oeuvre/construction-neuve" className="text-khaki-700 hover:underline"> construction neuve</Link>.
      </p>

      <p className="mb-4">
        Pour en savoir plus sur notre approche, consultez notre page 
        <Link to="/a-propos" className="text-khaki-700 hover:underline"> À propos</Link> ou 
        <Link to="/contact" className="text-khaki-700 hover:underline"> contactez-nous</Link>.
      </p>
    </section>
  );
};

export default DesignInterieurSEOContent;
