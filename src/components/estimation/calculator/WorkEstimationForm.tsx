
import React, { useRef, useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { useEstimationCalculator } from './useEstimationCalculator';
import ConversationalEstimator from './ConversationalEstimator';
import ResultsSummary from './components/ResultsSummary';
import FormNavigation from './FormNavigation';
import { EstimationFormData, FormData } from './types/formTypes';
import { createTypeAdaptingUpdater } from './utils/dataAdapter';
import { calculateEstimationAmount, validateStep } from './utils/navigationPathUtils';
import { useToast } from '@/hooks/use-toast';

const WorkEstimationForm: React.FC = () => {
  const formWrapper = useRef<HTMLDivElement>(null);
  const [showSummary, setShowSummary] = useState(false);
  const { toast } = useToast();
  
  const {
    step,
    totalSteps,
    formData,
    estimationResult,
    animationDirection,
    goToNextStep,
    goToPreviousStep,
    updateFormData,
    setStep,
    isSubmitting,
    finalizeEstimation
  } = useEstimationCalculator();

  const adaptedUpdateFormData = createTypeAdaptingUpdater(updateFormData);
  
  // Function to handle client type submission from conversational estimator
  const onClientTypeSubmit = (data: { clientType: string }) => {
    if (data && typeof data === 'object' && 'clientType' in data) {
      adaptedUpdateFormData({ clientType: data.clientType as 'individual' | 'professional' });
      
      // Automatically move to next step when client type is selected
      setTimeout(() => {
        goToNextStep();
      }, 300);
    }
  };

  // Process user input from conversational estimator
  const processUserInput = (input: string) => {
    console.log('Input processed:', input);
    
    // Here we can add logic to extract data from conversational input
    // For example, detecting surface area, project type, etc.
    
    // Sample implementation to detect project type from conversation
    if (input.toLowerCase().includes('construction') || input.toLowerCase().includes('construire')) {
      adaptedUpdateFormData({ projectType: 'construction' });
    } else if (input.toLowerCase().includes('rénovation') || input.toLowerCase().includes('rénover')) {
      adaptedUpdateFormData({ projectType: 'renovation' });
    } else if (input.toLowerCase().includes('extension') || input.toLowerCase().includes('agrandir')) {
      adaptedUpdateFormData({ projectType: 'extension' });
    }
    
    // Detect surface information
    const surfaceMatch = input.match(/(\d+)\s*m²/);
    if (surfaceMatch && surfaceMatch[1]) {
      adaptedUpdateFormData({ surface: parseInt(surfaceMatch[1]) });
    }
  };

  // Extract numeric value from estimation result for FormNavigation
  const getNumericEstimation = () => {
    if (!estimationResult) return 0;
    return typeof estimationResult === 'number' 
      ? estimationResult 
      : (estimationResult as any).totalAmount;
  };

  // Handle form navigation with validation
  const handleNextClick = () => {
    // Validate current step
    const { isValid, errors } = validateStep(step, formData);
    
    if (!isValid) {
      // Show validation errors
      toast({
        title: "Formulaire incomplet",
        description: errors.join('. '),
        variant: "destructive"
      });
      return;
    }
    
    // If validation passes, continue to next step
    goToNextStep();
    
    // If this was the last regular step, calculate the estimation
    if (step === totalSteps - 2) {
      const calculatedAmount = calculateEstimationAmount(formData);
      adaptedUpdateFormData({ montantT: calculatedAmount });
    }
  };

  return (
    <div className="w-full" ref={formWrapper}>
      <Card className="border-0 shadow-none">
        <div className="overflow-hidden">
          <ConversationalEstimator 
            onUserInput={processUserInput}
            formData={formData}
            updateFormData={adaptedUpdateFormData}
            onClientTypeSubmit={onClientTypeSubmit}
            goToStep={setStep}
          />
        </div>
      </Card>

      <ResultsSummary 
        showSummary={showSummary} 
        estimationResult={getNumericEstimation()} 
        formData={formData} 
        onBackClick={() => setShowSummary(false)} 
      />
      
      <FormNavigation 
        step={step}
        totalSteps={totalSteps}
        estimationResult={getNumericEstimation()}
        showSummary={showSummary}
        onPreviousClick={goToPreviousStep}
        onNextClick={handleNextClick}
        onShowSummaryClick={() => setShowSummary(true)}
        formData={formData}
        isSubmitting={isSubmitting}
        onComplete={finalizeEstimation}
      />
    </div>
  );
};

export default WorkEstimationForm;
