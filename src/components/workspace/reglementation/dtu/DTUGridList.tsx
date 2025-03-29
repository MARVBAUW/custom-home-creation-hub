
import React from 'react';
import { DTU } from './types';
import { DTUCard } from './DTUCard';
import { FileText } from 'lucide-react';

interface DTUGridListProps {
  dtus: DTU[];
  onViewDetails: (dtu: DTU) => void;
  onSelectDTU?: (dtu: DTU, selected: boolean) => void;
  searchTerm?: string;
  selectionMode?: boolean;
}

export const DTUGridList: React.FC<DTUGridListProps> = ({ 
  dtus, 
  onViewDetails, 
  onSelectDTU,
  searchTerm,
  selectionMode = false
}) => {
  if (dtus.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-500">Aucun document trouvé</h3>
        <p className="text-gray-400 mt-2">
          Essayez de modifier votre recherche ou de changer de catégorie
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dtus.map((dtu) => (
        <DTUCard 
          key={dtu.id} 
          dtu={dtu} 
          onViewDetails={onViewDetails} 
          onSelect={selectionMode ? onSelectDTU : undefined}
          searchTerm={searchTerm}
        />
      ))}
    </div>
  );
};
