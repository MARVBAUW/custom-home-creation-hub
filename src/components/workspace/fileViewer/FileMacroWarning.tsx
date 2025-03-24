
import React from 'react';

interface FileMacroWarningProps {
  macroNote: string;
}

const FileMacroWarning: React.FC<FileMacroWarningProps> = ({ macroNote }) => {
  return (
    <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
      <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-md mb-2">
        <p className="text-sm text-yellow-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">Fichier Excel avec macros</span>
        </p>
        <p className="text-xs text-yellow-700 ml-5.5 mt-1">
          {macroNote}
        </p>
      </div>
      <p className="text-xs text-gray-500">
        Le contenu affiché est un aperçu générique. Téléchargez le fichier Excel complet pour accéder à toutes les fonctionnalités.
      </p>
    </div>
  );
};

export default FileMacroWarning;
