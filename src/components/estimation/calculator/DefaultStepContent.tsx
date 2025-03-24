
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from 'framer-motion';
import { slideVariants } from './animations';
import { FormData, EstimationStep } from './types';

type DefaultStepContentProps = {
  step: number;
  visibleSteps: EstimationStep[];
  goToPreviousStep: () => void;
  goToNextStep: () => void;
  totalSteps: number;
  animationDirection: 'forward' | 'backward';
};

const DefaultStepContent: React.FC<DefaultStepContentProps> = ({
  step,
  visibleSteps,
  goToPreviousStep,
  goToNextStep,
  totalSteps,
  animationDirection
}) => {
  // Cette étape est utilisée comme placeholder pour les étapes qui n'ont pas encore de formulaire spécifique
  return (
    <motion.div
      key={`step-${step}`}
      custom={animationDirection}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideVariants}
    >
      <div className="p-6 text-center space-y-6">
        <div className="flex justify-center mb-4">
          {visibleSteps[step - 1]?.icon || (
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-semibold">{step}</span>
            </div>
          )}
        </div>
        
        <h2 className="text-2xl font-semibold">
          {visibleSteps[step - 1]?.title || `Étape ${step}`}
        </h2>
        
        <p className="text-muted-foreground">
          {visibleSteps[step - 1]?.description || 
            "Cette étape est en cours de développement. Vous pouvez naviguer vers l'étape suivante."
          }
        </p>
        
        <div className="pt-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          {step > 1 && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={goToPreviousStep}
              className="w-full sm:w-auto group hover:border-progineer-gold/80"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
              Étape précédente
            </Button>
          )}
          
          {step < totalSteps && (
            <Button 
              onClick={goToNextStep} 
              className="w-full sm:w-auto group hover:bg-progineer-gold/90 bg-progineer-gold transition-all duration-300"
            >
              Continuer 
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DefaultStepContent;
