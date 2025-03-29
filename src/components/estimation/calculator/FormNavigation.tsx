
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

interface FormNavigationProps {
  step: number;
  estimationResult: number | null;
  showSummary: boolean;
  onPreviousClick: () => void;
  onNextClick: () => void;
  onShowSummaryClick: () => void;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  step,
  estimationResult,
  showSummary,
  onPreviousClick,
  onNextClick,
  onShowSummaryClick
}) => {
  if (showSummary) return null;
  
  return (
    <div className="flex justify-between mt-4">
      {step > 1 && (
        <Button 
          type="button" 
          variant="outline" 
          onClick={onPreviousClick}
          className="flex items-center"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" /> 
          Précédent
        </Button>
      )}
      {estimationResult && estimationResult > 0 ? (
        <Button 
          type="button"
          onClick={onShowSummaryClick}
          className="ml-auto bg-progineer-gold hover:bg-progineer-gold/90"
        >
          Voir le résumé
        </Button>
      ) : (
        <Button 
          type="button"
          onClick={onNextClick}
          className="ml-auto flex items-center bg-progineer-gold hover:bg-progineer-gold/90"
        >
          Suivant
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default FormNavigation;
