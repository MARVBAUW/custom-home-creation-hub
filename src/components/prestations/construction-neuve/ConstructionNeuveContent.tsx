
import React from 'react';
import { RenovationProcess } from '@/components/prestations/renovation/RenovationProcess';

const ConstructionNeuveContent = () => {
  return (
    <>
      <div id="overview">
        <h2 className="text-3xl font-semibold mb-6">Construction sur mesure de votre maison</h2>
        <p className="mb-8 text-gray-700">
          Notre bureau d'études en <strong>maîtrise d'œuvre</strong> vous accompagne dans votre projet de construction de maison sur mesure en région PACA. De la conception des plans à la livraison des clés, nous prenons en charge toutes les étapes de votre projet pour vous offrir une maison qui vous ressemble, adaptée à vos besoins et à votre style de vie.
        </p>

        <div className="mb-12">
          <img 
            src="/lovable-uploads/PROGINEER (1).png" 
            alt="Exemple de maison contemporaine construite par Progineer en PACA"
            className="w-full h-auto rounded-xl mb-4"
          />
          <p className="text-sm text-gray-500 text-center">Villa contemporaine réalisée à Marseille</p>
        </div>
      </div>

      <div id="services">
        <h3 className="text-2xl font-medium mb-4">Nos services de construction</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
            <h4 className="font-medium text-lg mb-2">Conception architecturale</h4>
            <p className="text-gray-600">Plans personnalisés adaptés à vos besoins, votre terrain et vos contraintes budgétaires.</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
            <h4 className="font-medium text-lg mb-2">Dépôt du permis de construire</h4>
            <p className="text-gray-600">Préparation et suivi de votre dossier auprès des services d'urbanisme.</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
            <h4 className="font-medium text-lg mb-2">Coordination des travaux</h4>
            <p className="text-gray-600">Gestion et suivi du chantier pour garantir qualité et respect des délais.</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
            <h4 className="font-medium text-lg mb-2">Assistance à la réception</h4>
            <p className="text-gray-600">Contrôle final de la construction et accompagnement pour la levée des réserves.</p>
          </div>
        </div>
      </div>

      <div id="process">
        <h3 className="text-2xl font-medium mb-4">Notre processus de construction</h3>
        <RenovationProcess />
      </div>

      <div id="options">
        <h3 className="text-2xl font-medium mb-4">Options et personnalisation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
            <h4 className="font-medium text-lg mb-2">Domotique</h4>
            <p className="text-gray-600">Systèmes intelligents pour contrôler éclairage, chauffage et sécurité de votre maison.</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
            <h4 className="font-medium text-lg mb-2">Énergies renouvelables</h4>
            <p className="text-gray-600">Solutions écologiques pour réduire votre empreinte carbone et vos factures.</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
            <h4 className="font-medium text-lg mb-2">Piscine & spa</h4>
            <p className="text-gray-600">Conception et intégration d'espaces de détente et de bien-être dans votre projet.</p>
          </div>
        </div>
      </div>

      <div id="materials">
        <h3 className="text-2xl font-medium mb-4">Matériaux et finitions</h3>
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="flex-shrink-0 text-khaki-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <strong className="font-medium">Matériaux durables</strong>
                <p className="text-gray-600 mt-1">Sélection rigoureuse de matériaux respectueux de l'environnement et adaptés au climat méditerranéen.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="flex-shrink-0 text-khaki-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <strong className="font-medium">Isolation performante</strong>
                <p className="text-gray-600 mt-1">Solutions thermiques adaptées pour garantir confort été comme hiver et économies d'énergie.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="flex-shrink-0 text-khaki-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <strong className="font-medium">Finitions personnalisées</strong>
                <p className="text-gray-600 mt-1">Large choix de revêtements, menuiseries et équipements pour personnaliser votre intérieur selon vos goûts.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Sections pour les villes */}
      <div id="marseille" className="mt-8">
        <h3 className="text-2xl font-medium mb-4">Construction de maison à Marseille</h3>
        <p className="text-gray-700">
          À Marseille, nous réalisons de nombreux projets de construction de maisons contemporaines et traditionnelles. Notre équipe connaît parfaitement les spécificités du terrain, les contraintes urbanistiques et les particularités architecturales de chaque quartier marseillais, des Calanques au Panier en passant par les quartiers résidentiels.
        </p>
      </div>

      <div id="aix" className="mt-6">
        <h3 className="text-2xl font-medium mb-4">Construction de maison à Aix-en-Provence</h3>
        <p className="text-gray-700">
          Notre bureau d'études intervient à Aix-en-Provence et ses environs pour des projets de construction alliant tradition provençale et modernité. Nous vous proposons des solutions architecturales parfaitement intégrées au paysage aixois, dans le respect des contraintes réglementaires locales.
        </p>
      </div>

      <div id="toulon" className="mt-6">
        <h3 className="text-2xl font-medium mb-4">Construction de maison à Toulon</h3>
        <p className="text-gray-700">
          Dans la région toulonnaise, nous concevons des maisons adaptées au climat méditerranéen et aux spécificités du terrain, souvent en pente. Nos solutions architecturales tirent parti de la vue sur la rade et optimisent l'orientation pour maximiser la luminosité et le confort thermique.
        </p>
      </div>

      <div id="nice" className="mt-6">
        <h3 className="text-2xl font-medium mb-4">Construction de maison à Nice</h3>
        <p className="text-gray-700">
          À Nice, nos constructions s'inspirent de l'architecture locale tout en répondant aux exigences contemporaines de confort et d'esthétique. Nous proposons des solutions sur mesure qui s'intègrent harmonieusement dans le paysage azuréen.
        </p>
      </div>

      <div id="cannes" className="mt-6">
        <h3 className="text-2xl font-medium mb-4">Construction de maison à Cannes</h3>
        <p className="text-gray-700">
          Pour vos projets de construction à Cannes et ses environs, nous créons des villas élégantes et fonctionnelles qui reflètent le prestige de la Côte d'Azur. Du design à la réalisation, chaque détail est pensé pour vous offrir une maison d'exception.
        </p>
      </div>

      {/* Types de bâtiments */}
      <div id="maison-individuelle" className="mt-8">
        <h3 className="text-2xl font-medium mb-4">Maisons individuelles</h3>
        <p className="text-gray-700">
          Nous concevons des maisons individuelles entièrement personnalisées selon vos souhaits, votre budget et les contraintes de votre terrain. Chaque projet est unique et reflète la personnalité de ses futurs habitants.
        </p>
      </div>

      <div id="villa" className="mt-6">
        <h3 className="text-2xl font-medium mb-4">Villas contemporaines</h3>
        <p className="text-gray-700">
          Nos villas contemporaines se distinguent par leurs lignes épurées, leurs volumes généreux et leurs grandes ouvertures. Nous privilégions l'intégration au paysage et l'optimisation des apports solaires pour un confort optimal tout au long de l'année.
        </p>
      </div>

      <div id="maison-traditionnelle" className="mt-6">
        <h3 className="text-2xl font-medium mb-4">Maisons traditionnelles provençales</h3>
        <p className="text-gray-700">
          Nous réalisons également des maisons de style provençal, caractérisées par leurs toitures en tuiles, leurs façades aux teintes chaudes et leurs volets en bois. Un style intemporel parfaitement adapté au climat méditerranéen et à l'identité régionale.
        </p>
      </div>

      <div id="petit-collectif" className="mt-6">
        <h3 className="text-2xl font-medium mb-4">Petits collectifs résidentiels</h3>
        <p className="text-gray-700">
          Notre expertise s'étend aux projets de petits collectifs résidentiels : immeubles de quelques appartements, résidences privées ou habitats participatifs. Des projets à taille humaine qui favorisent la qualité de vie et le lien social.
        </p>
      </div>
    </>
  );
};

export default ConstructionNeuveContent;
