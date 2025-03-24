
import { Variants } from 'framer-motion';

// Animations pour les transitions de slides
export const slideVariants: Variants = {
  hidden: (direction: 'forward' | 'backward') => ({
    x: direction === 'forward' ? 50 : -50,
    opacity: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      type: 'spring',
      stiffness: 100,
      damping: 15,
    }
  },
  exit: (direction: 'forward' | 'backward') => ({
    x: direction === 'forward' ? -50 : 50,
    opacity: 0,
    transition: {
      duration: 0.2,
    }
  }),
};

// Animations pour les fades
export const fadeVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    }
  },
};

// Animations pour les cartes et sélections
export const cardVariants: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.2,
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    }
  },
  selected: {
    scale: 1.03,
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
    transition: {
      duration: 0.3,
    }
  }
};
