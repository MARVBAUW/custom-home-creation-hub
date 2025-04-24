
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon, Check } from 'lucide-react';
import { validateStep } from './utils/navigationPathUtils';
import { FormData } from './types';
import { useToast } from '@/hooks/use-toast';

export interface FormNavigationProps {
  step: number;
  totalSteps: number;
  estimationResult?: number;
  showSummary?: boolean;
  onPreviousClick: () => void;
  onNextClick: () => void;
  onShowSummaryClick?: () => void;
  currentStep?: number;
  onPrevStep?: () => void;
  onNextStep?: () => void;
  isSubmitting?: boolean;
  isComplete?: boolean;
  onComplete?: () => void;
  formData: FormData;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  step,
  totalSteps,
  estimationResult,
  showSummary,
  onPreviousClick,
  onNextClick,
  onShowSummaryClick,
  currentStep,
  onPrevStep,
  onNextStep,
  isSubmitting,
  isComplete,
  onComplete,
  formData
}) => {
  const { toast } = useToast();
  const isFirstStep = step === 0;
  const isLastStep = step === totalSteps - 1;
  const isContactStep = step === 45;
  const isResultStep = step === 46;
  
  // Get step label based on current step
  const getStepLabel = () => {
    if (isContactStep) return "Finaliser";
    if (isLastStep) return "Terminer";
    return "Suivant";
  };
  
  // Handle the next button click with validation
  const handleNextClick = () => {
    // Validate the current step
    const { isValid, errors } = validateStep(step, formData);
    
    if (!isValid) {
      // Show error toast with validation messages
      toast({
        title: "Formulaire incomplet",
        description: errors.join('. '),
        variant: "destructive"
      });
      return;
    }
    
    // If valid, proceed to the next step
    onNextClick();
  };
  
  // Handle the complete button click
  const handleCompleteClick = () => {
    if (onComplete) {
      onComplete();
    } else if (onNextClick) {
      onNextClick();
    }
  };

  return (
    <div className="flex justify-between mt-8">
      {/* Previous button (hidden on first step) */}
      <div>
        {!isFirstStep && !isResultStep && (
          <Button 
            variant="outline" 
            onClick={onPreviousClick}
            disabled={isSubmitting}
            className="flex items-center"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Précédent
          </Button>
        )}
      </div>
      
      {/* Next/Complete button */}
      <div>
        {isResultStep ? (
          // On the final thank you page, show a button to restart
          <Button 
            onClick={() => window.location.reload()}
            className="bg-green-600 hover:bg-green-700"
          >
            <Check className="mr-2 h-4 w-4" />
            Nouvelle estimation
          </Button>
        ) : isContactStep ? (
          // On the contact step, show a complete button
          <Button 
            onClick={handleCompleteClick}
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 flex items-center"
          >
            <Check className="mr-2 h-4 w-4" />
            Obtenir mon estimation
          </Button>
        ) : (
          // On other steps, show the next button
          <Button 
            onClick={handleNextClick}
            disabled={isSubmitting}
            className="flex items-center"
          >
            {getStepLabel()}
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormNavigation;
