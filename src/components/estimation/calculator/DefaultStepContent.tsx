
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface DefaultStepProps {
  step: number;
  totalSteps: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
  visibleSteps: any[];
}

const DefaultStepContent: React.FC<DefaultStepProps> = ({
  step,
  totalSteps,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  visibleSteps,
}) => {
  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-4">
        <div className="text-center py-6">
          <h3 className="text-xl font-medium">Étape {step} sur {totalSteps}</h3>
          <p className="text-gray-500 mt-2">
            Cette étape est en cours de développement.
          </p>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={goToPreviousStep}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Précédent
          </Button>
          <Button onClick={goToNextStep}>
            Suivant
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DefaultStepContent;
