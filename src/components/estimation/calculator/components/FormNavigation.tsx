
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { FormNavigationProps } from '../types/formTypes';

const FormNavigation: React.FC<FormNavigationProps> = ({
  step,
  totalSteps,
  currentStep,
  estimationResult,
  showSummary,
  onPrevStep,
  onNextStep,
  isSubmitting,
  isComplete,
  onComplete,
  onPreviousClick,
  onNextClick,
  onShowSummaryClick
}) => {
  // Handle backward compatibility with both old and new prop naming
  const handlePrevious = onPrevStep || onPreviousClick;
  const handleNext = onNextStep || onNextClick;
  
  if (showSummary) {
    return null;
  }
  
  return (
    <div className="flex justify-between mt-6">
      {/* Previous button, shown for all steps except the first */}
      {(step !== undefined && step > 0) && (
        <Button
          type="button"
          variant="outline"
          onClick={handlePrevious}
          disabled={isSubmitting}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Précédent
        </Button>
      )}
      
      {/* For the first step, show just a spacer */}
      {(step !== undefined && step === 0) && <div></div>}
      
      {/* Next button, or Complete button for last step */}
      {!isComplete ? (
        <Button
          type="button"
          onClick={handleNext}
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-progineer-gold hover:bg-progineer-gold/90"
        >
          {isSubmitting ? 'Traitement...' : 'Suivant'}
          <ArrowRight className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onComplete}
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
        >
          <Check className="h-4 w-4" />
          Terminer
        </Button>
      )}
    </div>
  );
};

export default FormNavigation;
