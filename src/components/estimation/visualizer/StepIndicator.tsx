
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getStepIcon, getStepTitle } from './visualizerUtils';

type StepIndicatorProps = {
  step: number;
  titleOnly?: boolean;
  iconOnly?: boolean;
  animated?: boolean;
};

const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  step, 
  titleOnly = false, 
  iconOnly = false,
  animated = false 
}) => {
  if (titleOnly) {
    if (animated) {
      return (
        <AnimatePresence mode="wait">
          <motion.span
            key={`step-${step}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {getStepTitle(step)}
          </motion.span>
        </AnimatePresence>
      );
    }
    return <span>{getStepTitle(step)}</span>;
  }

  if (iconOnly) {
    return getStepIcon(step);
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={`icon-${step}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {getStepIcon(step)}
      </motion.div>
    </AnimatePresence>
  );
};

export default StepIndicator;
