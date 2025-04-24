
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StepRendererProps, EstimationFormData, FormData } from '../types/formTypes';
import ClientTypeStep from '../steps/ClientTypeStep';
import ProjectDetailsStep from '../steps/ProjectDetailsStep';
import TerrainDetailsStep from '../steps/TerrainDetailsStep';
import ConstructionDetailsStep from '../steps/ConstructionDetailsStep';
import RoomsDetailsStep from '../steps/RoomsDetailsStep';
import { useToast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";

// We'll create a simple placeholder component for steps that are not yet implemented
const PlaceholderStep: React.FC<any> = ({ 
  title, 
  formData, 
  goToNextStep, 
  goToPreviousStep, 
  isSubmitting 
}) => {
  return (
    <div className="py-8 text-center">
      <h3 className="text-lg font-medium mb-4">{title || "Étape en développement"}</h3>
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
};

// Define missing step components as placeholders
const LocationStep: React.FC<any> = (props) => (
  <PlaceholderStep title="Localisation" {...props} />
);

const PriceRangeStep: React.FC<any> = (props) => (
  <PlaceholderStep title="Gamme de prix" {...props} />
);

const FinalDetailsStep: React.FC<any> = (props) => (
  <PlaceholderStep title="Détails finaux" {...props} />
);

const ContactInfoStep: React.FC<any> = (props) => (
  <PlaceholderStep title="Coordonnées" {...props} />
);

const SummaryStep: React.FC<any> = (props) => (
  <PlaceholderStep title="Récapitulatif" {...props} />
);

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
        return <PlaceholderStep {...commonProps} title={`Étape ${step + 1}`} />;
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
