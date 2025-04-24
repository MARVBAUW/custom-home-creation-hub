
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface NavigationControlsProps {
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoBack: boolean;
  isLastStep: boolean;
  onComplete: () => void;
  isSubmitting?: boolean;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  onNext,
  onPrevious,
  canGoNext,
  canGoBack,
  isLastStep,
  onComplete,
  isSubmitting = false
}) => {
  return (
    <div className="flex justify-between mt-6">
      {canGoBack && (
        <Button
          variant="outline"
          onClick={onPrevious}
          className="flex items-center"
          disabled={isSubmitting}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Précédent
        </Button>
      )}
      
      {!canGoBack && <div />}

      <div className="ml-auto">
        {isLastStep ? (
          <Button
            onClick={onComplete}
            className="flex items-center bg-green-600 hover:bg-green-700"
            disabled={isSubmitting}
          >
            <Check className="mr-2 h-4 w-4" />
            Terminer
          </Button>
        ) : (
          <Button
            onClick={onNext}
            disabled={!canGoNext || isSubmitting}
            className="flex items-center"
          >
            Suivant
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavigationControls;
