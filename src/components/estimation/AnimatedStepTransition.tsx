
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedStepTransitionProps {
  children: React.ReactNode;
  direction: 'forward' | 'backward';
}

const variants = {
  hidden: (direction: 'forward' | 'backward') => ({
    x: direction === 'forward' ? 100 : -100,
    opacity: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: (direction: 'forward' | 'backward') => ({
    x: direction === 'forward' ? -100 : 100,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  }),
};

const AnimatedStepTransition: React.FC<AnimatedStepTransitionProps> = ({ children, direction }) => {
  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      key={direction}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedStepTransition;
