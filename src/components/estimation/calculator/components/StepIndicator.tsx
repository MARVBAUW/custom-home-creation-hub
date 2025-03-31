
import React from 'react';

export interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  goToStep?: (index: number) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  currentStep, 
  totalSteps,
  goToStep
}) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i);

  return (
    <div className="flex justify-center mt-2 mb-6">
      <div className="flex items-center space-x-2">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div 
              className={`rounded-full ${
                index <= currentStep 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-500'
              } w-6 h-6 flex items-center justify-center text-xs font-medium cursor-pointer transition-colors`}
              onClick={() => goToStep && goToStep(index)}
              title={`Étape ${index + 1}`}
            >
              {index + 1}
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={`h-0.5 w-3 ${
                  index < currentStep ? 'bg-blue-500' : 'bg-gray-200'
                }`} 
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
