
import React from 'react';

const OptimisationEspaceContent = () => {
  return (
    <>
      <div id="overview">
        <h2 className="text-3xl font-semibold mb-6">Optimisez chaque mètre carré de votre espace</h2>
        <p className="mb-8 text-gray-700">
          Vous souhaitez tirer le meilleur parti de votre surface habitable ? Notre bureau d'études en <strong>maîtrise d'œuvre</strong> vous propose des solutions ingénieuses pour optimiser l'espace de votre logement en région PACA. De la conception à la réalisation, nous mettons notre expertise au service de votre confort quotidien.
        </p>

        <div className="mb-12">
          <img 
            src="/lovable-uploads/PROGINEER (9).png" 
            alt="Exemple d'optimisation d'espace réalisée par Progineer en PACA"
            className="w-full h-auto rounded-xl mb-4"
          />
          <p className="text-sm text-gray-500 text-center">Optimisation d'un appartement à Marseille</p>
        </div>
      </div>

      <div id="services">
        <h3 className="text-2xl font-medium mb-4">Nos services d'optimisation d'espace</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
            <h4 className="font-medium text-lg mb-2">Réaménagement complet</h4>
            <p className="text-gray-600">Restructuration totale de votre intérieur pour créer des espaces plus fonctionnels et optimisés selon vos besoins spécifiques.</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
            <h4 className="font-medium text-lg mb-2">Mobilier sur mesure</h4>
            <p className="text-gray-600">Création de solutions de rangement personnalisées et adaptées à votre espace pour maximiser chaque recoin.</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
            <h4 className="font-medium text-lg mb-2">Aménagement de combles</h4>
            <p className="text-gray-600">Transformation de vos combles en espace habitable fonctionnel : chambre, bureau, salle de jeux ou espace de stockage.</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
            <h4 className="font-medium text-lg mb-2">Création de mezzanines</h4>
            <p className="text-gray-600">Conception et installation de mezzanines pour exploiter la hauteur sous plafond et créer un niveau supplémentaire.</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
            <h4 className="font-medium text-lg mb-2">Solutions pour petits espaces</h4>
            <p className="text-gray-600">Astuces et aménagements spécifiques pour les studios et petits appartements afin de les rendre plus spacieux et fonctionnels.</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
            <h4 className="font-medium text-lg mb-2">Valorisation des espaces perdus</h4>
            <p className="text-gray-600">Transformation des espaces sous-exploités (sous-escaliers, recoins, niches) en zones utiles et esthétiques.</p>
          </div>
        </div>
      </div>

      <div id="techniques">
        <h3 className="text-2xl font-medium mb-4">Techniques d'optimisation d'espace</h3>
        <div className="bg-white p-6 rounded-lg shadow-sm mb-10">
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="flex-shrink-0 text-khaki-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <strong className="font-medium">Décloisonnement</strong>
                <p className="text-gray-600 mt-1">Création d'espaces ouverts et multifonctionnels pour gagner en fluidité et en lumière naturelle.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="flex-shrink-0 text-khaki-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <strong className="font-medium">Mobilier modulable</strong>
                <p className="text-gray-600 mt-1">Utilisation de meubles transformables et multifonctions pour s'adapter aux différents moments de la journée.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="flex-shrink-0 text-khaki-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <strong className="font-medium">Rangements intégrés</strong>
                <p className="text-gray-600 mt-1">Intégration de solutions de rangement dans les murs, sous les escaliers ou dans les combles pour libérer l'espace au sol.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="flex-shrink-0 text-khaki-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <strong className="font-medium">Jeux de miroirs</strong>
                <p className="text-gray-600 mt-1">Utilisation stratégique des miroirs pour créer une sensation d'espace et multiplier la lumière naturelle.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="flex-shrink-0 text-khaki-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <strong className="font-medium">Exploitation de la hauteur</strong>
                <p className="text-gray-600 mt-1">Création de mezzanines, d'étagères en hauteur ou de lits surélevés pour optimiser l'espace vertical.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="flex-shrink-0 text-khaki-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <strong className="font-medium">Portes coulissantes</strong>
                <p className="text-gray-600 mt-1">Remplacement des portes battantes par des portes coulissantes pour économiser l'espace perdu lors de l'ouverture.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div id="process">
        <h3 className="text-2xl font-medium mb-4">Notre méthode d'optimisation</h3>
        <div className="relative pb-12">
          {/* Timeline vertical line */}
          <div className="absolute left-6 top-2 bottom-0 w-1 bg-khaki-200"></div>
          
          {/* Timeline items */}
          <div className="relative pl-16 mb-8">
            <div className="absolute left-0 rounded-full bg-khaki-600 text-white w-12 h-12 flex items-center justify-center font-medium">01</div>
            <h4 className="text-lg font-medium mb-2">Analyse de vos besoins</h4>
            <p className="text-gray-600">Nous prenons le temps de comprendre votre mode de vie, vos contraintes et vos attentes pour définir un programme adapté à vos besoins spécifiques.</p>
          </div>
          
          <div className="relative pl-16 mb-8">
            <div className="absolute left-0 rounded-full bg-khaki-600 text-white w-12 h-12 flex items-center justify-center font-medium">02</div>
            <h4 className="text-lg font-medium mb-2">Diagnostic de l'existant</h4>
            <p className="text-gray-600">Étude approfondie de votre logement pour identifier ses contraintes, ses atouts et les opportunités d'optimisation.</p>
          </div>
          
          <div className="relative pl-16 mb-8">
            <div className="absolute left-0 rounded-full bg-khaki-600 text-white w-12 h-12 flex items-center justify-center font-medium">03</div>
            <h4 className="text-lg font-medium mb-2">Proposition de solutions</h4>
            <p className="text-gray-600">Élaboration de plusieurs scénarios d'aménagement avec plans 2D, vues 3D et échantillons de matériaux pour vous aider à visualiser les transformations.</p>
          </div>
          
          <div className="relative pl-16 mb-8">
            <div className="absolute left-0 rounded-full bg-khaki-600 text-white w-12 h-12 flex items-center justify-center font-medium">04</div>
            <h4 className="text-lg font-medium mb-2">Planification détaillée</h4>
            <p className="text-gray-600">Organisation du chantier, coordination des différents corps de métier et établissement d'un calendrier précis des travaux.</p>
          </div>
          
          <div className="relative pl-16">
            <div className="absolute left-0 rounded-full bg-khaki-600 text-white w-12 h-12 flex items-center justify-center font-medium">05</div>
            <h4 className="text-lg font-medium mb-2">Suivi et réalisation</h4>
            <p className="text-gray-600">Supervision de toutes les étapes du chantier pour garantir la qualité des finitions et le respect des délais.</p>
          </div>
        </div>
      </div>

      {/* Sections pour les villes */}
      <div id="marseille" className="mt-8">
        <h3 className="text-2xl font-medium mb-4">Optimisation d'espace à Marseille</h3>
        <p className="text-gray-700">
          À Marseille, nous intervenons sur tous types de biens, des appartements haussmanniens du centre-ville aux villas des quartiers résidentiels. Notre expertise locale nous permet de proposer des solutions adaptées aux spécificités architecturales marseillaises.
        </p>
      </div>

      <div id="aix" className="mt-6">
        <h3 className="text-2xl font-medium mb-4">Optimisation d'espace à Aix-en-Provence</h3>
        <p className="text-gray-700">
          Pour vos projets à Aix-en-Provence, nous proposons des solutions d'optimisation qui respectent le caractère patrimonial des bâtiments anciens tout en apportant un confort moderne et fonctionnel à votre intérieur.
        </p>
      </div>

      <div id="toulon" className="mt-6">
        <h3 className="text-2xl font-medium mb-4">Optimisation d'espace à Toulon</h3>
        <p className="text-gray-700">
          Dans la région toulonnaise, nous transformons vos intérieurs pour les rendre plus fonctionnels et adaptés à votre mode de vie, qu'il s'agisse d'appartements en centre-ville ou de maisons individuelles.
        </p>
      </div>

      <div id="nice" className="mt-6">
        <h3 className="text-2xl font-medium mb-4">Optimisation d'espace à Nice</h3>
        <p className="text-gray-700">
          À Nice, nous proposons des solutions ingénieuses pour optimiser les petites surfaces, très répandues sur ce marché immobilier tendu, et créer des espaces de vie agréables et fonctionnels.
        </p>
      </div>

      <div id="cannes" className="mt-6">
        <h3 className="text-2xl font-medium mb-4">Optimisation d'espace à Cannes</h3>
        <p className="text-gray-700">
          Pour vos projets à Cannes, nous concevons des aménagements qui allient esthétique et fonctionnalité, parfaits pour valoriser votre bien immobilier dans cette ville prisée de la Côte d'Azur.
        </p>
      </div>
    </>
  );
};

export default OptimisationEspaceContent;
