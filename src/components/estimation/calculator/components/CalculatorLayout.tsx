
import React, { ReactNode } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import FormNavigation from './FormNavigation';
import StepRenderer from './StepRenderer';
import { FormData } from '../types';

export interface CalculatorLayoutProps {
  children?: ReactNode;
  currentStep: number;
  totalSteps: number;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (step: number) => void;
  isSubmitting: boolean;
  isComplete: boolean;
  onComplete: () => void;
}

const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  children,
  currentStep,
  totalSteps,
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  goToStep,
  isSubmitting,
  isComplete,
  onComplete
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Step Indicator */}
      <div className="w-full mb-8">
        <div className="flex justify-between items-center">
          {Array.from({ length: totalSteps }).map((_, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && (
                <div 
                  className={`flex-1 h-1 ${idx < currentStep ? 'bg-blue-500' : 'bg-gray-200'}`}
                ></div>
              )}
              <div 
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${idx < currentStep 
                    ? 'bg-blue-500 text-white' 
                    : idx === currentStep 
                    ? 'bg-blue-100 text-blue-900 border-2 border-blue-500' 
                    : 'bg-gray-200 text-gray-400'
                  }
                `}
              >
                {idx + 1}
              </div>
            </React.Fragment>
          ))}
        </div>
        
        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <div>Information du projet</div>
          <div>Détails techniques</div>
          <div>Finitions & Options</div>
          <div>Résultats</div>
        </div>
      </div>

      {/* Main Calculator Card */}
      <Card className="border border-gray-200 shadow-sm mb-6">
        <CardContent className="p-6">
          {children || (
            <StepRenderer
              step={currentStep}
              totalSteps={totalSteps}
              formData={formData}
              updateFormData={updateFormData}
              goToNextStep={goToNextStep}
              goToPreviousStep={goToPreviousStep}
              isSubmitting={isSubmitting}
              goToStep={goToStep}
              onComplete={onComplete}
            />
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <FormNavigation
        step={currentStep}
        currentStep={currentStep}
        totalSteps={totalSteps}
        onPrevStep={goToPreviousStep}
        onNextStep={goToNextStep}
        isSubmitting={isSubmitting}
        isComplete={isComplete}
        onComplete={onComplete}
      />
    </div>
  );
};

export default CalculatorLayout;
