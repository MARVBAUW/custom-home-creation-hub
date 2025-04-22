
import React from 'react';
import Button from '@/components/common/Button';
import { InternalLinkText } from '@/utils/internalLinking';

const ConstructionNeuveContent = () => {
  return (
    <>
      <h2 className="text-3xl font-semibold mb-6">Notre approche de la construction</h2>
      <p className="mb-8 text-gray-700">
        Chez Progineer, nous considérons chaque projet de <strong>construction sur mesure</strong> comme unique. Notre approche combine rigueur technique, créativité architecturale et maîtrise des coûts pour vous offrir une maison parfaitement adaptée à vos besoins et à votre mode de vie.
      </p>

      <div className="mb-12">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
          alt="Exemple de construction neuve réalisée par Progineer en PACA"
          className="w-full h-auto rounded-xl mb-4"
        />
        <p className="text-sm text-gray-500 text-center">Villa contemporaine à Marseille</p>
      </div>

      <h3 className="text-2xl font-medium mb-4">Notre processus de construction</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-khaki-100 text-khaki-700 font-semibold mb-4">1</span>
          <h4 className="text-xl font-medium mb-2">Conception du projet</h4>
          <p className="text-gray-600">
            <InternalLinkText 
              text="Nous étudions vos besoins, vos contraintes et votre budget pour élaborer les plans de votre future maison."
              maxOccurrences={1}
            />
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-khaki-100 text-khaki-700 font-semibold mb-4">2</span>
          <h4 className="text-xl font-medium mb-2">Démarches administratives</h4>
          <p className="text-gray-600">
            <InternalLinkText 
              text="Nous nous chargeons de l'obtention du permis de construire et de toutes les autorisations nécessaires."
              maxOccurrences={1}
            />
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-khaki-100 text-khaki-700 font-semibold mb-4">3</span>
          <h4 className="text-xl font-medium mb-2">Réalisation des travaux</h4>
          <p className="text-gray-600">
            <InternalLinkText 
              text="Nous coordonnons tous les corps de métier et assurons un suivi régulier du chantier."
              maxOccurrences={1}
            />
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-khaki-100 text-khaki-700 font-semibold mb-4">4</span>
          <h4 className="text-xl font-medium mb-2">Livraison et garanties</h4>
          <p className="text-gray-600">
            <InternalLinkText 
              text="Nous effectuons la réception des travaux et vous accompagnons dans la prise en main de votre nouvelle maison."
              maxOccurrences={1}
            />
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-medium mb-4">Nos services en construction neuve</h3>
      <ul className="bg-gray-50 p-6 rounded-lg mb-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <li className="flex items-start">
          <span className="text-khaki-600 mr-2">•</span>
          <span>Étude de faisabilité complète</span>
        </li>
        <li className="flex items-start">
          <span className="text-khaki-600 mr-2">•</span>
          <span>Conception architecturale personnalisée</span>
        </li>
        <li className="flex items-start">
          <span className="text-khaki-600 mr-2">•</span>
          <span>Optimisation des coûts et des délais</span>
        </li>
        <li className="flex items-start">
          <span className="text-khaki-600 mr-2">•</span>
          <span>Coordination des artisans</span>
        </li>
        <li className="flex items-start">
          <span className="text-khaki-600 mr-2">•</span>
          <span>Gestion administrative complète</span>
        </li>
        <li className="flex items-start">
          <span className="text-khaki-600 mr-2">•</span>
          <span>Suivi de chantier rigoureux</span>
        </li>
        <li className="flex items-start">
          <span className="text-khaki-600 mr-2">•</span>
          <span>Respect des normes RE2020</span>
        </li>
        <li className="flex items-start">
          <span className="text-khaki-600 mr-2">•</span>
          <span>Garantie de livraison dans les délais</span>
        </li>
      </ul>

      <div className="bg-khaki-50 p-6 rounded-lg">
        <h3 className="text-2xl font-medium mb-4">Vous avez un projet de construction ?</h3>
        <p className="mb-6">
          <InternalLinkText 
            text="Contactez-nous pour un premier échange sans engagement. Nous serons ravis d'étudier votre projet et de vous proposer des solutions adaptées à vos besoins et à votre budget."
            maxOccurrences={1}
          />
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/estimation" className="bg-khaki-700 hover:bg-khaki-800 text-white">
            Estimer mon projet
          </Button>
          <Button href="/contact" variant="outline" className="border-khaki-300 hover:bg-khaki-50">
            Prendre rendez-vous
          </Button>
        </div>
      </div>
    </>
  );
};

export default ConstructionNeuveContent;
