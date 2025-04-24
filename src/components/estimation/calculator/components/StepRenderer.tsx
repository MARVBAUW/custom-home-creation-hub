
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StepRendererProps } from '../types/formTypes';
import ClientTypeStep from '../steps/ClientTypeStep';
import ProjectDetailsStep from '../steps/ProjectDetailsStep';
import TerrainDetailsStep from '../steps/TerrainDetailsStep';
import ConstructionDetailsStep from '../steps/ConstructionDetailsStep';
import RoomsDetailsStep from '../steps/RoomsDetailsStep';
import LocationStep from '../steps/LocationStep';
import PriceRangeStep from '../steps/PriceRangeStep';
import FinalDetailsStep from '../steps/FinalDetailsStep';
import ContactInfoStep from '../steps/ContactInfoStep';
import SummaryStep from '../steps/SummaryStep';
import { useToast } from '@/hooks/use-toast';

const StepRenderer: React.FC<StepRendererProps> = ({
  step,
  formData,
  updateFormData,
  animationDirection,
  goToNextStep,
  goToPreviousStep,
  isSubmitting,
  onComplete
}) => {
  const { toast } = useToast();
  
  const variants = {
    enter: (direction: string) => ({
      x: direction === 'forward' ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: string) => ({
      x: direction === 'forward' ? -100 : 100,
      opacity: 0
    })
  };

  // Ensure all required props are passed to step components
  const commonProps = {
    formData,
    updateFormData,
    animationDirection,
    goToNextStep: () => {
      if (goToNextStep) goToNextStep();
    },
    goToPreviousStep: () => {
      if (goToPreviousStep) goToPreviousStep();
    },
    isSubmitting,
    onComplete
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return <ClientTypeStep {...commonProps} />;
      case 1:
        return <ProjectDetailsStep {...commonProps} />;
      case 2:
        return <ConstructionDetailsStep {...commonProps} />;
      case 3:
        return <TerrainDetailsStep {...commonProps} />;
      case 4:
        return <RoomsDetailsStep {...commonProps} />;
      case 5:
        return <LocationStep {...commonProps} />;
      case 6:
        return <PriceRangeStep {...commonProps} />;
      case 7:
        return <FinalDetailsStep {...commonProps} />;
      case 8:
        return <ContactInfoStep {...commonProps} />;
      case 9:
        return <SummaryStep {...commonProps} />;
      default:
        // For steps not yet implemented
        return (
          <div className="py-8 text-center">
            <h3 className="text-lg font-medium mb-4">Étape {step + 1}</h3>
            <p className="text-muted-foreground">
              Cette étape est en cours d'implémentation. Nous travaillons à améliorer votre expérience.
            </p>
            <div className="mt-4 flex justify-center gap-4">
              {goToPreviousStep && (
                <Button
                  onClick={goToPreviousStep}
                  variant="outline"
                  disabled={isSubmitting}
                >
                  Retour
                </Button>
              )}
              {goToNextStep && (
                <Button
                  onClick={goToNextStep}
                  disabled={isSubmitting}
                >
                  Continuer
                </Button>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <AnimatePresence mode="wait" custom={animationDirection}>
      <motion.div
        key={step}
        custom={animationDirection}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ type: "tween", duration: 0.3 }}
      >
        {renderStepContent()}
      </motion.div>
    </AnimatePresence>
  );
};

export default StepRenderer;

// Helper button component for the not-yet-implemented steps
const Button = ({ 
  children, 
  onClick, 
  variant = 'default',
  disabled = false 
}: { 
  children: React.ReactNode; 
  onClick: () => void;
  variant?: 'default' | 'outline';
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md ${
        variant === 'outline' 
          ? 'border border-gray-300 text-gray-700 hover:bg-gray-50' 
          : 'bg-blue-600 text-white hover:bg-blue-700'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
};
