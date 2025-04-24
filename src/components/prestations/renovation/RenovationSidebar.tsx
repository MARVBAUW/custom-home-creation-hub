
import React from 'react';
import Button from '@/components/common/Button';

const RenovationSidebar = () => {
  return (
    <div className="sticky top-24 bg-stone-50 rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Pourquoi nous choisir ?</h2>
      <ul className="space-y-4">
        <li className="flex items-start">
          <span className="text-khaki-600 mr-2 mt-1 text-lg">✓</span>
          <div>
            <h3 className="font-medium text-lg">Diagnostic complet</h3>
            <p className="text-sm text-gray-600">Analyse approfondie de votre bien pour identifier les points d'amélioration.</p>
          </div>
        </li>
        <li className="flex items-start">
          <span className="text-khaki-600 mr-2 mt-1 text-lg">✓</span>
          <div>
            <h3 className="font-medium text-lg">Optimisation des espaces</h3>
            <p className="text-sm text-gray-600">Reconception intelligente pour maximiser le potentiel de votre habitat.</p>
          </div>
        </li>
        <li className="flex items-start">
          <span className="text-khaki-600 mr-2 mt-1 text-lg">✓</span>
          <div>
            <h3 className="font-medium text-lg">Performance énergétique</h3>
            <p className="text-sm text-gray-600">Amélioration significative de l'isolation et de l'efficacité énergétique.</p>
          </div>
        </li>
        <li className="flex items-start">
          <span className="text-khaki-600 mr-2 mt-1 text-lg">✓</span>
          <div>
            <h3 className="font-medium text-lg">Valorisation patrimoniale</h3>
            <p className="text-sm text-gray-600">Augmentation de la valeur de votre bien immobilier.</p>
          </div>
        </li>
      </ul>
      <div className="mt-8 space-y-4">
        <Button href="/estimation" className="w-full justify-center">
          Estimer mon projet
        </Button>
        <Button href="/contact" variant="outline" className="w-full justify-center">
          Prendre rendez-vous
        </Button>
      </div>
    </div>
  );
};

export default RenovationSidebar;
