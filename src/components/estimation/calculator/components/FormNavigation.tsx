
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon, CheckCircle, ListChecks } from 'lucide-react';
import { FormNavigationProps } from '../types/formTypes';

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
  // Use either the direct click handlers or the step handlers
  const handlePrevious = onPreviousClick || onPrevStep;
  const handleNext = onNextClick || onNextStep;
  const handleComplete = onComplete || onShowSummaryClick;

  // Show different buttons based on whether we're showing the summary
  if (showSummary) {
    return (
      <div className="flex justify-between mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onPreviousClick}
          className="flex items-center gap-2"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Retour
        </Button>
      </div>
    );
  }

  // If we're at the last step and have a result
  if (step === totalSteps - 1 && estimationResult) {
    return (
      <div className="flex justify-between mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrevious}
          className="flex items-center gap-2"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Précédent
        </Button>
        <Button
          type="button"
          onClick={onShowSummaryClick}
          className="flex items-center gap-2 bg-progineer-gold hover:bg-progineer-gold/90"
        >
          <ListChecks className="w-4 h-4" />
          Voir le récapitulatif
        </Button>
      </div>
    );
  }

  // Default navigation buttons
  return (
    <div className="flex justify-between mt-6">
      <Button
        type="button"
        variant="outline"
        onClick={handlePrevious}
        className="flex items-center gap-2"
        disabled={step === 0}
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Précédent
      </Button>
      <Button
        type="button"
        onClick={isComplete ? handleComplete : handleNext}
        className="flex items-center gap-2 bg-progineer-gold hover:bg-progineer-gold/90"
        disabled={isSubmitting}
      >
        {isComplete ? (
          <>
            <CheckCircle className="w-4 h-4" />
            Terminer
          </>
        ) : (
          <>
            Suivant
            <ArrowRightIcon className="w-4 h-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default FormNavigation;
