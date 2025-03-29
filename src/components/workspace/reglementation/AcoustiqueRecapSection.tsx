
import React, { useState } from 'react';
import { DTU } from './dtu/types';
import { Volume } from 'lucide-react';

export const AcoustiqueRecapSection = () => {
  return (
    <div className="p-8 border rounded-lg">
      <div className="flex items-center space-x-3 mb-4">
        <Volume className="h-6 w-6 text-indigo-500" />
        <h2 className="text-2xl font-semibold">Réglementation acoustique</h2>
      </div>
      <p className="text-gray-600 mb-8">
        Cette section présentera les règles, normes et données techniques relatives à l'acoustique du bâtiment.
        Le contenu est en cours de développement.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border p-4 rounded-lg">
          <h3 className="font-medium mb-2">Normes en habitation</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Nouvelle réglementation acoustique (NRA)</li>
            <li>Isolement des façades</li>
            <li>Bruits de chocs et d'impact</li>
          </ul>
        </div>
        
        <div className="border p-4 rounded-lg">
          <h3 className="font-medium mb-2">Réglementation en ERP</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Établissements d'enseignement</li>
            <li>Établissements de santé</li>
            <li>Hôtellerie et restauration</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-gray-500">
          Module complet en cours de développement.
          De nouveaux contenus seront ajoutés prochainement.
        </p>
      </div>
    </div>
  );
};
