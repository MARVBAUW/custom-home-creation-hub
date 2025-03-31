
import React from 'react';
import { DTU } from './types';
import { DTUCard } from './DTUCard';
import { DTUEmptyState } from './DTUEmptyState';

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
  selectionMode = false,
}) => {
  // Show empty state if no results are found from a search
  if (dtus.length === 0 && searchTerm && searchTerm.trim() !== '') {
    return (
      <DTUEmptyState 
        type="noResults" 
        description={`Aucun résultat trouvé pour "${searchTerm}". Essayez d'autres termes de recherche.`}
      />
    );
  }

  // Show empty state if there are no DTUs at all
  if (dtus.length === 0) {
    return (
      <DTUEmptyState type="empty" />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {dtus.map((dtu) => (
        <DTUCard
          key={dtu.id}
          dtu={dtu}
          onViewDetails={onViewDetails}
          onSelect={onSelectDTU}
          selectionMode={selectionMode}
          searchTerm={searchTerm}
        />
      ))}
    </div>
  );
};
