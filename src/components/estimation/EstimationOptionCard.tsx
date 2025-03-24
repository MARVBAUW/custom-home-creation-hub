
import React from 'react';
import { cn } from '@/lib/utils';

type EstimationOptionCardProps = {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
};

const EstimationOptionCard: React.FC<EstimationOptionCardProps> = ({
  icon,
  title,
  description,
  isSelected,
  onClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center space-x-3 space-y-0 border rounded-lg p-4 cursor-pointer transition-all duration-300",
        isSelected 
          ? "border-progineer-gold bg-progineer-gold/10 shadow-md transform scale-[1.02]" 
          : "border-gray-200 hover:bg-muted/50 hover:border-gray-300",
        className
      )}
    >
      {icon && (
        <div className={cn(
          "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
          isSelected 
            ? "bg-progineer-gold text-white" 
            : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
        )}>
          {icon}
        </div>
      )}
      
      <div className="flex-1">
        <div className={cn(
          "font-medium transition-colors duration-300",
          isSelected ? "text-progineer-gold" : "text-gray-900"
        )}>
          {title}
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default EstimationOptionCard;
