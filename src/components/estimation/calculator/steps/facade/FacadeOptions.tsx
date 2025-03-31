
import React from 'react';
import FacadeOptionCard from './FacadeOptionCard';

export interface FacadeOption {
  id: string;
  label: string;
  image: string;
  percentage: string;
  setPercentage: (value: string) => void;
}

interface FacadeOptionsProps {
  options: FacadeOption[];
  selectedFacades: string[];
  onFacadeToggle: (id: string) => void;
}

const FacadeOptions: React.FC<FacadeOptionsProps> = ({ 
  options, 
  selectedFacades, 
  onFacadeToggle 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((option) => (
        <FacadeOptionCard
          key={option.id}
          id={option.id}
          label={option.label}
          image={option.image}
          percentage={option.percentage}
          isSelected={selectedFacades.includes(option.id)}
          onToggle={onFacadeToggle}
          onPercentageChange={option.setPercentage}
        />
      ))}
    </div>
  );
};

export default FacadeOptions;
