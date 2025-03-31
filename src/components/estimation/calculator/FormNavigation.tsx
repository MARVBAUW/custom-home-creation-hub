
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

interface FormNavigationProps {
  step: number;
  totalSteps: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  step,
  totalSteps,
  goToNextStep,
  goToPreviousStep
}) => {
  return (
    <div className="flex justify-between mt-4">
      {step > 1 && (
        <Button 
          type="button" 
          variant="outline" 
          onClick={goToPreviousStep}
          className="flex items-center"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" /> 
          Précédent
        </Button>
      )}
      
      {step < totalSteps && (
        <Button 
          type="button"
          onClick={goToNextStep}
          className="ml-auto flex items-center"
        >
          Suivant
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default FormNavigation;
