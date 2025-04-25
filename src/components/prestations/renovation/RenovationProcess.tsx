
import React from 'react';

export const RenovationProcess = () => {
  return (
    <>
      <h3 className="text-2xl font-medium mb-4">Notre processus de rénovation</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="border border-gray-200 rounded-lg p-5">
          <h4 className="text-xl font-medium mb-3">1. Diagnostic & Conception</h4>
          <ul className="text-gray-700 space-y-2">
            <li>• État des lieux complet</li>
            <li>• Diagnostic technique</li>
            <li>• Analyse des contraintes</li>
            <li>• Plans et esquisses</li>
          </ul>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-5">
          <h4 className="text-xl font-medium mb-3">2. Planification</h4>
          <ul className="text-gray-700 space-y-2">
            <li>• Élaboration du planning</li>
            <li>• Sélection des artisans</li>
            <li>• Obtention des autorisations</li>
            <li>• Validation du budget</li>
          </ul>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-5">
          <h4 className="text-xl font-medium mb-3">3. Travaux & Suivi</h4>
          <ul className="text-gray-700 space-y-2">
            <li>• Coordination des entreprises</li>
            <li>• Contrôle qualité</li>
            <li>• Réunions de chantier</li>
            <li>• Gestion des imprévus</li>
          </ul>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-5">
          <h4 className="text-xl font-medium mb-3">4. Livraison</h4>
          <ul className="text-gray-700 space-y-2">
            <li>• Réception des travaux</li>
            <li>• Levée des réserves</li>
            <li>• Documentation technique</li>
            <li>• Service après-livraison</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default RenovationProcess;
