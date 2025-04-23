import React from 'react';
import { formatCityName } from '@/utils/localSEOUtils';
import Button from '@/components/common/Button';
import { InternalLinkText } from '@/utils/internalLinking';

interface DesignInterieurSidebarProps {
  city?: string;
}

const DesignInterieurSidebar: React.FC<DesignInterieurSidebarProps> = ({ city }) => {
  const cityDisplay = city ? formatCityName(city) : '';
  
  return (
    <div className="space-y-8">
      <div className="bg-khaki-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Nos services de design d'intérieur{cityDisplay ? ` à ${cityDisplay}` : ''}</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Conception d'espaces sur mesure</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Aménagement intérieur complet</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Sélection de mobilier et décoration</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Plans d'éclairage personnalisés</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Choix des matériaux et finitions</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Visualisation 3D des projets</span>
          </li>
        </ul>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Pourquoi choisir Progineer{cityDisplay ? ` à ${cityDisplay}` : ''} ?</h3>
        <p className="text-gray-600 mb-4">
          <InternalLinkText 
            text={`Notre équipe de designers d'intérieur${cityDisplay ? ` à ${cityDisplay}` : ''} combine créativité et expertise technique pour transformer vos espaces.`}
            maxOccurrences={1}
          />
        </p>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">•</span>
            <span>Approche personnalisée pour chaque client</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">•</span>
            <span>Connaissance approfondie des tendances</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">•</span>
            <span>Réseau d'artisans et fournisseurs de qualité</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">•</span>
            <span>Suivi rigoureux de chaque projet</span>
          </li>
        </ul>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Types de projets</h3>
        <div className="space-y-3">
          <div className="bg-white p-3 rounded border border-gray-100">
            <h4 className="font-medium">Résidentiel</h4>
            <p className="text-sm text-gray-600">Appartements, maisons, villas</p>
          </div>
          <div className="bg-white p-3 rounded border border-gray-100">
            <h4 className="font-medium">Commercial</h4>
            <p className="text-sm text-gray-600">Boutiques, restaurants, bureaux</p>
          </div>
          <div className="bg-white p-3 rounded border border-gray-100">
            <h4 className="font-medium">Espaces spécifiques</h4>
            <p className="text-sm text-gray-600">Cuisines, salles de bain, dressings</p>
          </div>
        </div>
      </div>
      
      <div className="bg-khaki-700 p-6 rounded-lg text-white">
        <h3 className="text-xl font-semibold mb-4">Besoin d'un devis ?</h3>
        <p className="mb-4 text-khaki-50">
          <InternalLinkText 
            text={`Contactez-nous pour discuter de votre projet de design d'intérieur${cityDisplay ? ` à ${cityDisplay}` : ''} et obtenir un devis personnalisé.`}
            maxOccurrences={1}
            className="text-khaki-50"
          />
        </p>
        <Button href="/contact" className="w-full bg-white text-khaki-700 hover:bg-khaki-50">
          Demander un devis gratuit
        </Button>
      </div>
    </div>
  );
};

export default DesignInterieurSidebar;
