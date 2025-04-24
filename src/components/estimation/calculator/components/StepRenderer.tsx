
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormData } from '../types';
import ClientTypeStep from '../steps/ClientTypeStep';
import ProjectDetailsStep from '../steps/ProjectDetailsStep';
import TerrainDetailsStep from '../steps/TerrainDetailsStep';
import ConstructionDetailsStep from '../steps/ConstructionDetailsStep';

interface StepRendererProps {
  step: number;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  animationDirection: 'forward' | 'backward';
}

const StepRenderer: React.FC<StepRendererProps> = ({
  step,
  formData,
  updateFormData,
  animationDirection
}) => {
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

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <ClientTypeStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 1:
        return (
          <ProjectDetailsStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 2:
        return (
          <TerrainDetailsStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <ConstructionDetailsStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      // Additional cases for other steps...
      default:
        return <div>Étape non implémentée</div>;
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
