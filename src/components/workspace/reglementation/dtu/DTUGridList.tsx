
import React from 'react';
import { DTUCard } from './DTUCard';
import { DTUEmptyState } from './DTUEmptyState';
import { DTU } from './types';

interface DTUGridListProps {
  dtus: DTU[];
  onViewDetails: (dtu: DTU) => void;
  searchTerm?: string;
}

export const DTUGridList: React.FC<DTUGridListProps> = ({ dtus, onViewDetails, searchTerm = '' }) => {
  if (dtus.length === 0) {
    return <DTUEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {dtus.map((dtu) => (
        <DTUCard 
          key={dtu.id} 
          dtu={dtu} 
          onViewDetails={onViewDetails} 
          searchTerm={searchTerm}
        />
      ))}
    </div>
  );
};
