
import React from 'react';
import { RenovationProcess } from '@/components/prestations/renovation/RenovationProcess';

const RenovationContent = () => {
  return (
    <>
      <div id="overview">
        <h2 className="text-3xl font-semibold mb-6">Rénovation complète de maisons et appartements</h2>
        <p className="mb-8 text-gray-700">
          Notre bureau d'études en <strong>maîtrise d'œuvre</strong> vous accompagne dans tous vos projets de rénovation en région PACA. Que vous souhaitiez moderniser votre logement, optimiser votre espace de vie ou améliorer les performances énergétiques de votre habitation, notre équipe d'experts vous propose des solutions personnalisées et adaptées à vos besoins.
        </p>

        <div className="mb-12">
          <img 
            src="/lovable-uploads/PROGINEER (4).png" 
            alt="Projet de rénovation réalisé par Progineer en PACA"
            className="w-full h-auto rounded-xl mb-4"
          />
          <p className="text-sm text-gray-500 text-center">Rénovation complète d'une maison à Marseille</p>
        </div>
      </div>

      <div id="services">
        <h3 className="text-2xl font-medium mb-4">Nos services de rénovation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
            <h4 className="font-medium text-lg mb-2">Rénovation complète</h4>
            <p className="text-gray-600">Transformation intégrale de votre bien immobilier, de la structure aux finitions.</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
            <h4 className="font-medium text-lg mb-2">Rénovation partielle</h4>
            <p className="text-gray-600">Modernisation ciblée de certaines pièces ou éléments de votre habitat.</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
            <h4 className="font-medium text-lg mb-2">Rénovation énergétique</h4>
            <p className="text-gray-600">Amélioration de l'isolation et des systèmes techniques pour réduire votre consommation.</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
            <h4 className="font-medium text-lg mb-2">Rénovation patrimoniale</h4>
            <p className="text-gray-600">Restauration respectueuse de biens anciens ou à caractère historique.</p>
          </div>
        </div>
      </div>

      <div id="process">
        <RenovationProcess />
      </div>

      <div id="energy">
        <h3 className="text-2xl font-medium mb-4">Rénovation énergétique</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
            <h4 className="font-medium text-lg mb-2">Isolation thermique</h4>
            <p className="text-gray-600">Solutions performantes pour murs, toiture et planchers adaptées au climat méditerranéen.</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
            <h4 className="font-medium text-lg mb-2">Menuiseries isolantes</h4>
            <p className="text-gray-600">Remplacement des fenêtres et portes pour une meilleure étanchéité et isolation.</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
            <h4 className="font-medium text-lg mb-2">Chauffage efficient</h4>
            <p className="text-gray-600">Installation de systèmes modernes et économes : pompe à chaleur, climatisation réversible, etc.</p>
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
                <strong className="font-medium">Matériaux écologiques</strong>
                <p className="text-gray-600 mt-1">Large choix de matériaux naturels et durables : chaux, terre cuite, bois local, etc.</p>
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
                <p className="text-gray-600 mt-1">Peintures, revêtements et menuiseries adaptés à vos goûts et au style de votre bien.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="flex-shrink-0 text-khaki-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <strong className="font-medium">Solutions innovantes</strong>
                <p className="text-gray-600 mt-1">Intégration de matériaux techniques pour répondre aux enjeux d'isolation, d'acoustique et de durabilité.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Sections pour les villes */}
      <div id="marseille">
        <h3 className="text-2xl font-medium mb-4 mt-8">Rénovation à Marseille</h3>
        <p className="text-gray-700">
          Spécialistes de la rénovation d'appartements et maisons à Marseille, nous connaissons parfaitement les spécificités du bâti marseillais, des appartements haussmanniens du centre-ville aux villas du Prado ou de la Corniche. Notre expertise locale nous permet de vous proposer des solutions adaptées à votre quartier et au style architectural de votre bien.
        </p>
      </div>

      <div id="marseille-appartement" className="mt-6">
        <h4 className="text-xl font-medium mb-2">Rénovation d'appartements à Marseille</h4>
        <p className="text-gray-700">
          Nous sommes experts dans la rénovation d'appartements marseillais, qu'il s'agisse de studios dans le Panier, d'appartements bourgeois à Castellane ou de lofts à la Joliette. Notre connaissance du bâti local, des contraintes de copropriété et des règles d'urbanisme spécifiques à chaque quartier nous permet d'optimiser votre projet.
        </p>
      </div>

      <div id="aix" className="mt-6">
        <h3 className="text-2xl font-medium mb-4">Rénovation à Aix-en-Provence</h3>
        <p className="text-gray-700">
          À Aix-en-Provence, nous intervenons sur des projets de rénovation variés : appartements du centre historique, bastides provençales ou villas contemporaines. Nous respectons l'héritage architectural de la ville tout en apportant le confort moderne que vous recherchez.
        </p>
      </div>

      <div id="aix-appartement" className="mt-6">
        <h4 className="text-xl font-medium mb-2">Rénovation d'appartements à Aix-en-Provence</h4>
        <p className="text-gray-700">
          La rénovation d'appartements à Aix-en-Provence requiert un savoir-faire spécifique, notamment dans le centre historique où les contraintes patrimoniales sont importantes. Notre expertise technique et notre connaissance des matériaux traditionnels nous permettent de réaliser des rénovations respectueuses et durables.
        </p>
      </div>

      <div id="toulon" className="mt-6">
        <h3 className="text-2xl font-medium mb-4">Rénovation à Toulon</h3>
        <p className="text-gray-700">
          À Toulon, nous accompagnons vos projets de rénovation en prenant en compte les spécificités de l'habitat varois. Du centre ancien aux quartiers résidentiels du Mourillon ou de la Serinette, nous adaptons nos solutions à chaque contexte.
        </p>
      </div>

      <div id="nice" className="mt-6">
        <h3 className="text-2xl font-medium mb-4">Rénovation à Nice</h3>
        <p className="text-gray-700">
          Notre équipe intervient également à Nice pour tous vos projets de rénovation. De la Promenade des Anglais au Vieux Nice, nous connaissons parfaitement l'architecture niçoise et ses contraintes spécifiques.
        </p>
      </div>

      <div id="cannes" className="mt-6">
        <h3 className="text-2xl font-medium mb-4">Rénovation à Cannes</h3>
        <p className="text-gray-700">
          À Cannes, nous mettons notre expertise au service de vos projets de rénovation, qu'il s'agisse d'appartements sur la Croisette ou de villas dans les quartiers résidentiels de la Californie ou de Super Cannes.
        </p>
      </div>

      <div id="appartement" className="mt-8">
        <h3 className="text-2xl font-medium mb-4">Rénovation d'appartements en PACA</h3>
        <p className="text-gray-700">
          Nous sommes spécialistes dans la rénovation d'appartements de toutes tailles. Notre approche tient compte des contraintes spécifiques liées aux copropriétés, aux espaces restreints et aux nécessités techniques particulières des appartements.
        </p>
      </div>

      <div id="isolation" className="mt-6">
        <h4 className="text-xl font-medium mb-2">Solutions d'isolation thermique</h4>
        <p className="text-gray-700">
          L'isolation thermique est un élément clé de toute rénovation en région PACA. Nous proposons des solutions adaptées au climat méditerranéen, efficaces aussi bien contre la chaleur estivale que contre le froid hivernal. Nos techniques d'isolation (murs, toiture, planchers, menuiseries) vous garantissent un confort optimal toute l'année.
        </p>
      </div>

      <div id="chauffage" className="mt-6">
        <h4 className="text-xl font-medium mb-2">Systèmes de chauffage et climatisation</h4>
        <p className="text-gray-700">
          De la pompe à chaleur à la climatisation réversible, en passant par les solutions solaires, nous vous conseillons sur les équipements les plus adaptés à votre habitation et à vos besoins énergétiques, dans le respect des normes environnementales.
        </p>
      </div>
    </>
  );
};

export default RenovationContent;
