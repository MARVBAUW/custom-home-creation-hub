
import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  completedSteps?: number[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  completedSteps = [],
}) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isCompleted = completedSteps.includes(index) || index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <React.Fragment key={index}>
              {/* Step circle */}
              <div 
                className={`
                  flex items-center justify-center w-8 h-8 rounded-full 
                  ${isCompleted 
                    ? 'bg-progineer-gold text-white' 
                    : isCurrent 
                      ? 'bg-white border-2 border-progineer-gold text-progineer-gold' 
                      : 'bg-gray-100 border border-gray-300 text-gray-400'
                  }
                  transition-all duration-300
                `}
              >
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              
              {/* Connector line (except for last item) */}
              {index < totalSteps - 1 && (
                <div className="flex-1 h-1 mx-2 bg-gray-200">
                  <div 
                    className="h-full bg-progineer-gold transition-all duration-300"
                    style={{ 
                      width: isCompleted ? '100%' : '0%' 
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
