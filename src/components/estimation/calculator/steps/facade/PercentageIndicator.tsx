
import React from 'react';

interface PercentageIndicatorProps {
  totalPercentage: number;
  error: string;
}

const PercentageIndicator: React.FC<PercentageIndicatorProps> = ({ totalPercentage, error }) => {
  return (
    <div className={`p-4 mt-4 rounded-lg ${
      totalPercentage > 100 ? 'bg-red-50 border border-red-200' : 'bg-gray-50 border border-gray-200'
    }`}>
      <div className="flex justify-between items-center">
        <span className="font-medium">Total:</span>
        <span className={`font-bold ${
          totalPercentage > 100 ? 'text-red-600' : totalPercentage === 100 ? 'text-green-600' : ''
        }`}>
          {totalPercentage}%
        </span>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {totalPercentage < 100 && totalPercentage > 0 && (
        <p className="text-amber-600 text-sm mt-2">
          La somme des pourcentages devrait être égale à 100%.
        </p>
      )}
    </div>
  );
};

export default PercentageIndicator;
