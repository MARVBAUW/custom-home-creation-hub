
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import StepIndicator from './StepIndicator';
import StepRenderer from './StepRenderer';
import FormNavigation from './FormNavigation';
import { FormData } from '../types/estimationFormData';

interface CalculatorLayoutProps {
  step: number;
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
  step,
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
  // Calculate progress percentage
  const progress = ((step + 1) / totalSteps) * 100;
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
        <div 
          className="h-2 rounded-full bg-blue-600 transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Step indicator */}
      <StepIndicator 
        currentStep={step} 
        totalSteps={totalSteps} 
      />
      
      {/* Main content */}
      <Card className="mt-4 border-0 shadow-none">
        <CardContent className="p-0">
          <StepRenderer
            step={step}
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection="forward"
            isSubmitting={isSubmitting}
            goToStep={goToStep}
            onComplete={onComplete}
          />
        </CardContent>
      </Card>
      
      {/* Navigation buttons */}
      <FormNavigation 
        step={step} 
        totalSteps={totalSteps} 
        onPreviousClick={goToPreviousStep} 
        onNextClick={goToNextStep}
        currentStep={currentStep}
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
