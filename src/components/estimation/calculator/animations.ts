
// Animations pour framer-motion
export const slideVariants = {
  hidden: (direction: 'forward' | 'backward') => ({
    x: direction === 'forward' ? 50 : -50,
    opacity: 0
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: (direction: 'forward' | 'backward') => ({
    x: direction === 'forward' ? -50 : 50,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  })
};
