
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { motion } from 'framer-motion';
import { slideVariants } from './animations';

type DefaultStepContentProps = {
  step: number;
  totalSteps: number;
  visibleSteps: any[];
  goToPreviousStep: () => void;
  goToNextStep: () => void;
  animationDirection: 'forward' | 'backward';
};

const DefaultStepContent: React.FC<DefaultStepContentProps> = ({
  step,
  totalSteps,
  visibleSteps,
  goToPreviousStep,
  goToNextStep,
  animationDirection,
}) => {
  // Fonction pour obtenir le contenu du formulaire en fonction de l'étape
  const getStepContent = () => {
    // Les étapes 7 à totalSteps-1 utilisent le contenu par défaut
    if (step >= 6 && step < totalSteps) {
      const stepNumber = step; // L'index commence à 1
      
      return (
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-semibold">
            Étape {stepNumber} sur {totalSteps}
          </h2>
          <p className="text-gray-600 mb-6">
            Cette étape sera implémentée prochainement. Cliquez sur continuer pour avancer.
          </p>
          
          <div className="flex justify-center">
            <Info className="w-10 h-10 text-blue-500" />
          </div>
        </div>
      );
    }
    
    return (
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-semibold">
          Étape {step} sur {totalSteps}
        </h2>
        <p className="text-gray-600 mb-6">
          Contenu de l'étape non trouvé. Cliquez sur continuer pour avancer.
        </p>
      </div>
    );
  };
  
  return (
    <motion.div
      key={`step-default-${step}`}
      custom={animationDirection}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideVariants}
      className="space-y-8"
    >
      {getStepContent()}
      
      <div className="pt-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={goToPreviousStep}
          className="w-full md:w-auto group hover:border-progineer-gold/80"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
          Étape précédente
        </Button>
        
        <Button 
          type="button"
          onClick={goToNextStep}
          className="w-full md:w-auto group hover:bg-progineer-gold/90 bg-progineer-gold transition-all duration-300"
        >
          Continuer 
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
};

export default DefaultStepContent;
