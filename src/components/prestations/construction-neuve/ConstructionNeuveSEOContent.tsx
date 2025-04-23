
import React from 'react';
import { Link } from 'react-router-dom';

const ConstructionNeuveSEOContent: React.FC = () => {
  return (
    <section className="mt-16 bg-gray-50 p-8 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Guide complet pour faire construire votre maison en PACA</h2>
      
      <p className="mb-4">
        Choisir un <strong>constructeur de maison</strong> compétent est la première étape cruciale pour 
        concrétiser votre projet de <strong>maison individuelle</strong>. En tant que maître d'œuvre en PACA, 
        nous accompagnons les particuliers qui souhaitent <strong>faire construire</strong> leur résidence principale 
        ou secondaire dans les meilleures conditions.
      </p>

      <h3 className="text-xl font-medium my-4">Les étapes clés pour faire construire votre maison</h3>
      <p className="mb-4">
        La construction d'une <strong>maison individuelle</strong> nécessite une préparation minutieuse. 
        La première étape consiste à trouver un <strong>terrain à bâtir</strong> adapté à votre projet. 
        Notre <Link to="/estimation" className="text-khaki-700 hover:underline">service d'estimation</Link> vous 
        aide à évaluer précisément le coût total de votre construction, y compris les frais liés au terrain.
      </p>

      <p className="mb-4">
        Une fois le terrain identifié, une <strong>entreprise de construction</strong> comme Progineer élabore 
        les plans de votre future maison en tenant compte de vos besoins, de votre budget et des contraintes 
        du terrain. Si vous envisagez des aménagements spécifiques, notre expertise en 
        <Link to="/prestations-maitre-oeuvre/design-interieur" className="text-khaki-700 hover:underline"> design d'intérieur</Link> vous 
        sera précieuse.
      </p>

      <h3 className="text-xl font-medium my-4">Les avantages de la construction neuve</h3>
      <p className="mb-4">
        Opter pour une construction neuve présente de nombreux avantages par rapport à l'achat d'un bien ancien. 
        Vous bénéficiez d'un logement aux normes actuelles, notamment en matière d'isolation thermique et acoustique. 
        De plus, vous avez la possibilité de personnaliser votre habitat selon vos goûts et vos besoins. Pour ceux 
        qui disposent d'un espace limité, notre service d'<Link to="/prestations-maitre-oeuvre/optimisation-espace" className="text-khaki-700 hover:underline">optimisation 
        d'espace</Link> permet de maximiser chaque mètre carré.
      </p>

      <div className="bg-white p-6 rounded-lg my-6">
        <h3 className="text-xl font-medium mb-4">FAQ Construction Neuve</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Quels sont les délais moyens de construction d'une maison individuelle ?</h4>
            <p className="text-gray-600">
              En moyenne, il faut compter entre 8 et 12 mois entre la signature du contrat et la livraison 
              de votre maison. Découvrez nos <Link to="/realisations-architecte-maison" className="text-khaki-700 hover:underline">réalisations</Link> pour 
              mieux visualiser nos projets.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Comment financer la construction d'une maison neuve ?</h4>
            <p className="text-gray-600">
              Plusieurs solutions de financement existent : prêt immobilier classique, PTZ (Prêt à Taux Zéro), 
              prêt action logement... <Link to="/contact" className="text-khaki-700 hover:underline">Contactez-nous</Link> pour 
              un accompagnement personnalisé.
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-medium my-4">Construction durable et écologique</h3>
      <p className="mb-4">
        La tendance actuelle est à la construction écologique et durable. De plus en plus de clients optent pour 
        des matériaux respectueux de l'environnement et des solutions énergétiques performantes. Si vous souhaitez 
        <Link to="/prestations-maitre-oeuvre/renovation" className="text-khaki-700 hover:underline"> rénover</Link> une maison existante plutôt que construire, 
        nous proposons également des solutions adaptées.
      </p>

      <p className="mb-4">
        Pour les propriétaires qui souhaitent agrandir leur maison sans déménager, notre service 
        d'<Link to="/prestations-maitre-oeuvre/extension" className="text-khaki-700 hover:underline">extension de maison</Link> offre 
        des solutions sur mesure adaptées à tous les types d'habitats.
      </p>

      <p className="mb-4">
        N'hésitez pas à consulter notre <Link to="/a-propos" className="text-khaki-700 hover:underline">page À propos</Link> pour 
        en savoir plus sur notre philosophie et notre approche de la construction.
      </p>
    </section>
  );
};

export default ConstructionNeuveSEOContent;
