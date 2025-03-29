
import { Variants } from "framer-motion";

// Animations for sliding transitions between form steps
export const slideVariants: Variants = {
  hidden: (direction: 'forward' | 'backward') => ({
    x: direction === 'forward' ? '100%' : '-100%',
    opacity: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: (direction: 'forward' | 'backward') => ({
    x: direction === 'forward' ? '-100%' : '100%',
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  }),
};

// Fade in animation for form elements
export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

// Staggered fade in for lists
export const staggeredFadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Item animation for staggered lists
export const staggeredItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};
