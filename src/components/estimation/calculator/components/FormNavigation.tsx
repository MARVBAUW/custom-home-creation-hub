
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon, Check } from 'lucide-react';

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
  onComplete
}) => {
  // Is this the first step?
  const isFirstStep = step === 0;
  
  // Is this the last step?
  const isLastStep = step === totalSteps - 1;
  
  return (
    <div className="flex justify-between mt-8">
      {/* Previous button (hidden on first step) */}
      <div>
        {!isFirstStep && (
          <Button 
            variant="outline" 
            onClick={onPreviousClick}
            disabled={isSubmitting}
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Précédent
          </Button>
        )}
      </div>
      
      {/* Next/Complete button */}
      <div>
        {isLastStep ? (
          <Button 
            onClick={onComplete} 
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700"
          >
            <Check className="mr-2 h-4 w-4" />
            Terminer
          </Button>
        ) : (
          <Button 
            onClick={onNextClick}
            disabled={isSubmitting}
          >
            Suivant
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormNavigation;
