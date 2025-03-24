
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { motion } from 'framer-motion';
import { EstimationStep } from './types';
import { slideVariants } from './animations';

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
  return (
    <motion.div
      key={`step-${step}`}
      custom={animationDirection}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideVariants}
    >
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold flex items-center justify-center">
          {visibleSteps[step - 1]?.icon}
          <span className="ml-2">{visibleSteps[step - 1]?.title || "Étape suivante"}</span>
        </h2>
        <p className="text-muted-foreground">{visibleSteps[step - 1]?.description || ""}</p>
        
        <div className="py-8">
          <p>Cette section est en cours de développement</p>
        </div>
        
        <div className="flex items-center justify-between pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={goToPreviousStep}
            className="group hover:border-progineer-gold/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
            Étape précédente
          </Button>
          
          <Button onClick={goToNextStep} className="group hover:bg-progineer-gold/90 bg-progineer-gold transition-all duration-300">
            {step < totalSteps ? (
              <>
                Continuer 
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            ) : (
              <>
                Finaliser 
                <Check className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default DefaultStepContent;
