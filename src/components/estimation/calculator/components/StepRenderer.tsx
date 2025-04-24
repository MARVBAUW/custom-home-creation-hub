
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StepRendererProps } from '../types/formTypes';
import ClientTypeStep from '../steps/ClientTypeStep';
import ProjectDetailsStep from '../steps/ProjectDetailsStep';
import TerrainDetailsStep from '../steps/TerrainDetailsStep';
import ConstructionDetailsStep from '../steps/ConstructionDetailsStep';

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
    const commonProps = {
      formData,
      updateFormData,
      animationDirection
    };

    switch (step) {
      case 0:
        return <ClientTypeStep {...commonProps} />;
      case 1:
        return <ProjectDetailsStep {...commonProps} />;
      case 2:
        return <TerrainDetailsStep {...commonProps} />;
      case 3:
        return <ConstructionDetailsStep {...commonProps} />;
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
