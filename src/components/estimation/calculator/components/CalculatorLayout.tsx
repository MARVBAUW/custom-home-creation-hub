
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormNavigation } from './FormNavigation';
import { StepRenderer } from './StepRenderer';
import { FormData } from '../types';

interface CalculatorLayoutProps {
  step: number;
  totalSteps: number;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  isSubmitting: boolean;
  isComplete?: boolean;
  onComplete?: () => void;
  goToStep?: (step: number) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  step,
  totalSteps,
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  isSubmitting,
  isComplete = false,
  onComplete,
  goToStep,
  title = "Estimation de projet",
  description = "Renseignez les informations pour obtenir une estimation détaillée",
  children
}) => {
  return (
    <Card className="shadow-sm border">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children ? (
          <div className="space-y-6">
            {children}
          </div>
        ) : (
          <div className="space-y-6">
            <StepRenderer 
              step={step}
              totalSteps={totalSteps}
              formData={formData}
              updateFormData={updateFormData}
              goToNextStep={goToNextStep}
              goToPreviousStep={goToPreviousStep}
              isSubmitting={isSubmitting}
              goToStep={goToStep}
              onComplete={onComplete}
            />
            
            <FormNavigation 
              step={step}
              currentStep={step}
              totalSteps={totalSteps}
              onPrevStep={goToPreviousStep}
              onNextStep={goToNextStep}
              isSubmitting={isSubmitting}
              isComplete={isComplete}
              onComplete={onComplete}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CalculatorLayout;
