
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AnimatedStepTransitionProps = {
  step?: number;
  direction?: 'forward' | 'backward';
  children: React.ReactNode;
};

const AnimatedStepTransition: React.FC<AnimatedStepTransitionProps> = ({ 
  step, 
  direction = 'forward',
  children 
}) => {
  const variants = {
    enter: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? 20 : -20,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? -20 : 20,
      opacity: 0
    })
  };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={step}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedStepTransition;
