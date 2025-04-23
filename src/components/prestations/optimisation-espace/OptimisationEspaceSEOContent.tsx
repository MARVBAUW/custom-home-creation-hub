
import React from 'react';
import { Link } from 'react-router-dom';

const OptimisationEspaceSEOContent: React.FC = () => {
  return (
    <section className="mt-16 bg-gray-50 p-8 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Optimisation d'espace : maximiser chaque mètre carré</h2>
      
      <p className="mb-4">
        Fort de 5 années d'expérience dans des projets d'envergure, notre expertise en 
        <strong> optimisation d'espace</strong> vous permet de repenser votre intérieur pour créer 
        un habitat fonctionnel et agréable, même dans les petites surfaces.
      </p>

      <h3 className="text-xl font-medium my-4">Un aménagement intérieur intelligent</h3>
      <p className="mb-4">
        L'<strong>aménagement intérieur</strong> optimisé commence par une analyse approfondie de vos besoins. 
        Notre équipe élabore un <strong>plan fonctionnel</strong> qui privilégie la fluidité des circulations. 
        Découvrez nos solutions de <Link to="/prestations-maitre-oeuvre/design-interieur" className="text-khaki-700 hover:underline">design 
        d'intérieur</Link> pour un résultat harmonieux.
      </p>

      <h3 className="text-xl font-medium my-4">Solutions pour une maison compacte</h3>
      <p className="mb-4">
        Dans une <strong>maison compacte</strong>, le <strong>gain de place</strong> passe par des solutions 
        intelligentes comme les <strong>rangements intégrés</strong>. Si vous envisagez des travaux plus importants, 
        notre expertise en <Link to="/prestations-maitre-oeuvre/renovation" className="text-khaki-700 hover:underline">rénovation</Link> vous 
        accompagnera dans cette transformation.
      </p>

      <div className="bg-white p-6 rounded-lg my-6">
        <h3 className="text-xl font-medium mb-4">FAQ Optimisation d'Espace</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Comment optimiser un petit espace ?</h4>
            <p className="text-gray-600">
              Pour une étude personnalisée de votre projet, 
              <Link to="/estimation" className="text-khaki-700 hover:underline"> demandez une estimation</Link>.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Quelles solutions pour gagner de la place ?</h4>
            <p className="text-gray-600">
              Découvrez nos <Link to="/realisations-architecte-maison" className="text-khaki-700 hover:underline">réalisations</Link> pour 
              vous inspirer.
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-medium my-4">Des solutions adaptées à vos besoins</h3>
      <p className="mb-4">
        Si votre espace devient vraiment limité, une 
        <Link to="/prestations-maitre-oeuvre/extension" className="text-khaki-700 hover:underline"> extension</Link> peut 
        être envisagée. Pour les projets plus ambitieux, découvrez notre expertise en 
        <Link to="/prestations-maitre-oeuvre/construction-neuve" className="text-khaki-700 hover:underline"> construction neuve</Link>.
      </p>

      <p className="mb-4">
        Pour discuter de votre projet, n'hésitez pas à 
        <Link to="/contact" className="text-khaki-700 hover:underline"> nous contacter</Link>. Découvrez également notre 
        <Link to="/a-propos" className="text-khaki-700 hover:underline"> histoire et notre approche</Link>.
      </p>
    </section>
  );
};

export default OptimisationEspaceSEOContent;
