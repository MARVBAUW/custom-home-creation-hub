
import React from 'react';
import { Search } from 'lucide-react';

export const DTUEmptyState: React.FC = () => {
  return (
    <div className="text-center py-10 bg-gray-50 rounded-lg">
      <Search className="h-10 w-10 text-gray-400 mx-auto mb-3" />
      <h3 className="text-lg font-medium text-gray-700">Aucun DTU trouvé</h3>
      <p className="text-gray-500 mt-1">Essayez de modifier vos critères de recherche</p>
    </div>
  );
};
