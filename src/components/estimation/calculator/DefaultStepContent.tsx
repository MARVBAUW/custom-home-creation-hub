
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from 'lucide-react';
import AnimatedStepTransition from '@/components/estimation/AnimatedStepTransition';
import { getStepIcon, getStepTitle } from './steps/stepUtils';

interface DefaultStepContentProps {
  step: number;
  visibleSteps: any[];
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  totalSteps: number;
  animationDirection: 'forward' | 'backward';
}

const DefaultStepContent: React.FC<DefaultStepContentProps> = ({
  step,
  visibleSteps,
  goToNextStep,
  goToPreviousStep,
  totalSteps,
  animationDirection
}) => {
  // Obtenir le titre et l'icône de l'étape actuelle
  const stepTitle = getStepTitle(step);
  const stepIcon = getStepIcon(step);

  return (
    <AnimatedStepTransition direction={animationDirection}>
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-xl font-semibold">
          <div className="bg-blue-100 p-2 rounded-full">
            {stepIcon}
          </div>
          <h3>{stepTitle}</h3>
        </div>
        
        <p className="text-gray-600">
          Cette étape vous permet de préciser des détails importants pour votre projet.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="border p-4 rounded-lg shadow-sm bg-gray-50">
            <h4 className="font-medium mb-2">Pourquoi cette information est importante</h4>
            <p className="text-sm text-gray-600">
              Les détails que vous fournissez nous permettent de calculer une estimation plus précise 
              pour votre projet de construction ou rénovation.
            </p>
          </div>
          
          <div className="border p-4 rounded-lg shadow-sm bg-blue-50">
            <h4 className="font-medium mb-2">Ce que vous devez savoir</h4>
            <p className="text-sm text-gray-600">
              Prenez votre temps pour choisir les options qui correspondent le mieux à votre projet.
              Si vous n'êtes pas sûr, vous pouvez toujours revenir en arrière pour modifier vos choix.
            </p>
          </div>
        </div>
        
        <div className="flex justify-between">
          {step > 1 && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={goToPreviousStep}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Précédent
            </Button>
          )}
          <Button 
            type="button" 
            className="ml-auto flex items-center"
            onClick={goToNextStep}
          >
            Continuer <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </AnimatedStepTransition>
  );
};

export default DefaultStepContent;
