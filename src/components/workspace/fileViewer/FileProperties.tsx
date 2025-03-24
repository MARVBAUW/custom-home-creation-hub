
import React from 'react';

interface FilePropertiesProps {
  file: {
    title: string;
    filename: string;
    version: string;
    lastUpdate: string;
  };
}

const FileProperties: React.FC<FilePropertiesProps> = ({ file }) => {
  return (
    <div className="bg-white p-6 rounded-md border border-gray-200">
      <h3 className="text-lg font-medium mb-4">Informations sur le fichier</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-3">
          <div className="text-sm font-medium text-gray-500">Nom du fichier</div>
          <div className="col-span-2 text-sm text-gray-900">{file.filename}</div>
        </div>
        <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-3">
          <div className="text-sm font-medium text-gray-500">Version</div>
          <div className="col-span-2 text-sm text-gray-900">{file.version}</div>
        </div>
        <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-3">
          <div className="text-sm font-medium text-gray-500">Dernière mise à jour</div>
          <div className="col-span-2 text-sm text-gray-900">{file.lastUpdate}</div>
        </div>
        <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-3">
          <div className="text-sm font-medium text-gray-500">Type de fichier</div>
          <div className="col-span-2 text-sm text-gray-900">Microsoft Excel avec macros (.xlsm)</div>
        </div>
        <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-3">
          <div className="text-sm font-medium text-gray-500">Créé par</div>
          <div className="col-span-2 text-sm text-gray-900">Progineer</div>
        </div>
        <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-3">
          <div className="text-sm font-medium text-gray-500">Compatibilité</div>
          <div className="col-span-2 text-sm text-gray-900">Excel 2016 et versions ultérieures</div>
        </div>
        <div className="grid grid-cols-3 gap-4 pb-3">
          <div className="text-sm font-medium text-gray-500">Macros</div>
          <div className="col-span-2 text-sm text-gray-900">Activées (Niveau de sécurité recommandé : Moyen)</div>
        </div>
      </div>
    </div>
  );
};

export default FileProperties;
