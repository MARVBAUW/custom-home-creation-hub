
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AnimatedStepTransitionProps = {
  step: number;
  children: React.ReactNode;
};

const AnimatedStepTransition: React.FC<AnimatedStepTransitionProps> = ({ step, children }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedStepTransition;
