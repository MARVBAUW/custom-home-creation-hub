
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface FacadeOptionCardProps {
  id: string;
  label: string;
  image: string;
  percentage: string;
  isSelected: boolean;
  onToggle: (id: string) => void;
  onPercentageChange: (value: string) => void;
}

const FacadeOptionCard: React.FC<FacadeOptionCardProps> = ({
  id,
  label,
  image,
  percentage,
  isSelected,
  onToggle,
  onPercentageChange
}) => {
  return (
    <div 
      className={`border rounded-lg overflow-hidden transition-all ${
        isSelected ? 'border-blue-500 shadow-md' : 'border-gray-200'
      }`}
    >
      <div className="h-40 overflow-hidden">
        <img 
          src={image} 
          alt={label}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Checkbox 
            id={id}
            checked={isSelected}
            onCheckedChange={() => onToggle(id)}
          />
          <Label htmlFor={id} className="font-medium cursor-pointer">
            {label}
          </Label>
        </div>
        
        {isSelected && (
          <div className="mt-3 flex items-center space-x-2">
            <Input
              type="number"
              min="0"
              max="100"
              className="w-20"
              value={percentage}
              onChange={(e) => onPercentageChange(e.target.value)}
            />
            <span>%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacadeOptionCard;
