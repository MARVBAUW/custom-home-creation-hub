
import React from 'react';

const ExtensionContent = () => {
  return (
    <>
      <div id="overview">
        <h2 className="text-3xl font-semibold mb-6">Extension sur mesure pour votre habitat</h2>
        <p className="mb-8 text-gray-700">
          Vous manquez d'espace dans votre maison ? Notre bureau d'études en <strong>maîtrise d'œuvre</strong> vous accompagne dans votre projet d'extension en région PACA. De la conception à la réalisation, nous vous proposons des solutions personnalisées pour agrandir votre espace de vie tout en valorisant votre patrimoine immobilier.
        </p>

        <div className="mb-12">
          <img 
            src="/lovable-uploads/PROGINEER (12).png" 
            alt="Exemple d'extension de maison réalisée par Progineer en PACA"
            className="w-full h-auto rounded-xl mb-4"
          />
          <p className="text-sm text-gray-500 text-center">Extension contemporaine d'une villa à Marseille</p>
        </div>
      </div>

      <div id="services">
        <h3 className="text-2xl font-medium mb-4">Nos services d'extension</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
            <h4 className="font-medium text-lg mb-2">Extension horizontale</h4>
            <p className="text-gray-600">Agrandissement de plain-pied pour créer de nouvelles pièces de vie (salon, cuisine, chambre) en harmonie avec l'existant.</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
            <h4 className="font-medium text-lg mb-2">Surélévation</h4>
            <p className="text-gray-600">Ajout d'un étage supplémentaire pour maximiser la surface habitable sans réduire votre espace extérieur.</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
            <h4 className="font-medium text-lg mb-2">Extension à toit plat</h4>
            <p className="text-gray-600">Solution contemporaine et épurée, idéale pour les maisons modernes et offrant la possibilité d'une toiture végétalisée.</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
            <h4 className="font-medium text-lg mb-2">Véranda et jardin d'hiver</h4>
            <p className="text-gray-600">Espace de transition entre intérieur et extérieur, baigné de lumière pour profiter de votre jardin toute l'année.</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
            <h4 className="font-medium text-lg mb-2">Extension en bois</h4>
            <p className="text-gray-600">Solution écologique et rapide à mettre en œuvre, offrant une excellente isolation thermique et un design chaleureux.</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
            <h4 className="font-medium text-lg mb-2">Extension modulaire</h4>
            <p className="text-gray-600">Système flexible et évolutif permettant d'agrandir votre espace selon vos besoins actuels et futurs.</p>
          </div>
        </div>
      </div>

      <div id="process">
        <h3 className="text-2xl font-medium mb-4">Notre processus d'extension</h3>
        <div className="bg-white p-6 rounded-lg shadow-sm mb-10">
          <ol className="space-y-6">
            <li className="flex gap-4">
              <div className="flex-shrink-0 bg-khaki-100 w-8 h-8 rounded-full flex items-center justify-center text-khaki-700 font-medium">1</div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">Étude de faisabilité</h4>
                <p className="text-gray-600">Analyse du terrain, de la structure existante et des contraintes réglementaires pour évaluer les possibilités d'extension.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 bg-khaki-100 w-8 h-8 rounded-full flex items-center justify-center text-khaki-700 font-medium">2</div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">Conception architecturale</h4>
                <p className="text-gray-600">Création de plans et esquisses pour visualiser le projet et définir les volumes, les ouvertures et les matériaux.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 bg-khaki-100 w-8 h-8 rounded-full flex items-center justify-center text-khaki-700 font-medium">3</div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">Démarches administratives</h4>
                <p className="text-gray-600">Préparation et dépôt des demandes d'autorisation (permis de construire, déclaration préalable) auprès des services d'urbanisme.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 bg-khaki-100 w-8 h-8 rounded-full flex items-center justify-center text-khaki-700 font-medium">4</div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">Consultation des entreprises</h4>
                <p className="text-gray-600">Sélection des artisans qualifiés et négociation des devis pour optimiser le budget tout en garantissant la qualité des prestations.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 bg-khaki-100 w-8 h-8 rounded-full flex items-center justify-center text-khaki-700 font-medium">5</div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">Suivi des travaux</h4>
                <p className="text-gray-600">Coordination des différents corps de métier, contrôle de la qualité d'exécution et respect des délais et du budget.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 bg-khaki-100 w-8 h-8 rounded-full flex items-center justify-center text-khaki-700 font-medium">6</div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">Réception de l'ouvrage</h4>
                <p className="text-gray-600">Vérification de la conformité des travaux et accompagnement pour la levée des réserves éventuelles.</p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <div id="options">
        <h3 className="text-2xl font-medium mb-4">Options d'extension populaires</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="rounded-lg overflow-hidden shadow-sm border border-gray-100">
            <div className="h-48 bg-gray-200 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1600607687126-8a3414349a51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Extension cuisine" className="object-cover w-full h-full" />
            </div>
            <div className="p-4">
              <h4 className="font-medium">Extension cuisine</h4>
              <p className="text-sm text-gray-600">Idéale pour créer une cuisine ouverte et conviviale, parfaite pour recevoir famille et amis.</p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-sm border border-gray-100">
            <div className="h-48 bg-gray-200 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Espace bureau" className="object-cover w-full h-full" />
            </div>
            <div className="p-4">
              <h4 className="font-medium">Espace bureau</h4>
              <p className="text-sm text-gray-600">Un espace de travail à domicile lumineux et isolé pour plus de confort et de concentration.</p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-sm border border-gray-100">
            <div className="h-48 bg-gray-200 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Suite parentale" className="object-cover w-full h-full" />
            </div>
            <div className="p-4">
              <h4 className="font-medium">Suite parentale</h4>
              <p className="text-sm text-gray-600">Une extension pour créer un espace privé avec chambre, dressing et salle de bain.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sections pour les villes */}
      <div id="marseille" className="mt-8">
        <h3 className="text-2xl font-medium mb-4">Extension de maison à Marseille</h3>
        <p className="text-gray-700">
          À Marseille, nos projets d'extension s'adaptent aux spécificités de l'habitat local : villas des quartiers sud, maisons de ville ou bastides provençales. Notre équipe connaît parfaitement les contraintes urbanistiques de chaque quartier et les particularités architecturales marseillaises.
        </p>
      </div>

      <div id="aix" className="mt-6">
        <h3 className="text-2xl font-medium mb-4">Extension de maison à Aix-en-Provence</h3>
        <p className="text-gray-700">
          À Aix-en-Provence, nous réalisons des extensions qui respectent le patrimoine architectural local tout en apportant une touche de modernité. Nos projets s'intègrent harmonieusement dans le paysage urbain et naturel aixois.
        </p>
      </div>

      <div id="toulon" className="mt-6">
        <h3 className="text-2xl font-medium mb-4">Extension de maison à Toulon</h3>
        <p className="text-gray-700">
          Dans la région toulonnaise, nous concevons des extensions adaptées au climat méditerranéen et aux spécificités du terrain, souvent en pente. Nos solutions architecturales tirent parti de la vue sur la rade et optimisent l'orientation pour maximiser la luminosité.
        </p>
      </div>

      <div id="nice" className="mt-6">
        <h3 className="text-2xl font-medium mb-4">Extension de maison à Nice</h3>
        <p className="text-gray-700">
          À Nice, nos extensions s'inspirent de l'architecture locale tout en répondant aux exigences contemporaines de confort et d'esthétique. Nous proposons des solutions sur mesure qui valorisent votre bien immobilier dans cette ville prisée de la Côte d'Azur.
        </p>
      </div>

      <div id="cannes" className="mt-6">
        <h3 className="text-2xl font-medium mb-4">Extension de maison à Cannes</h3>
        <p className="text-gray-700">
          Pour vos projets d'extension à Cannes et ses environs, nous créons des espaces élégants et fonctionnels qui s'intègrent parfaitement à l'architecture existante. Nos réalisations valorisent votre propriété tout en respectant l'identité architecturale cannoise.
        </p>
      </div>

      {/* Types d'extensions spécifiques */}
      <div id="veranda" className="mt-8">
        <h3 className="text-2xl font-medium mb-4">Création de vérandas</h3>
        <p className="text-gray-700">
          Spécialistes dans la conception de vérandas sur mesure, nous vous proposons des extensions lumineuses qui créent un véritable trait d'union entre votre intérieur et votre jardin. Nos vérandas sont conçues pour un confort thermique optimal été comme hiver.
        </p>
      </div>

      <div id="pergola" className="mt-6">
        <h3 className="text-2xl font-medium mb-4">Aménagement de pergolas</h3>
        <p className="text-gray-700">
          Nos pergolas bioclimatiques offrent un espace extérieur protégé et modulable, parfaitement adapté au climat méditerranéen. Une solution élégante pour profiter de votre terrasse tout au long de l'année.
        </p>
      </div>

      <div id="terrasse" className="mt-6">
        <h3 className="text-2xl font-medium mb-4">Extension de terrasses</h3>
        <p className="text-gray-700">
          Nous concevons et réalisons des extensions de terrasses qui s'intègrent parfaitement à votre habitat. Du choix des matériaux à la définition des niveaux et des garde-corps, chaque détail est pensé pour créer un espace extérieur convivial et esthétique.
        </p>
      </div>

      <div id="piscine" className="mt-6">
        <h3 className="text-2xl font-medium mb-4">Intégration de piscines et pool-houses</h3>
        <p className="text-gray-700">
          Nous vous accompagnons dans l'aménagement de vos espaces extérieurs avec l'intégration de piscines et la création de pool-houses. Des solutions sur mesure pour profiter pleinement de la douceur du climat méditerranéen.
        </p>
      </div>
    </>
  );
};

export default ExtensionContent;
