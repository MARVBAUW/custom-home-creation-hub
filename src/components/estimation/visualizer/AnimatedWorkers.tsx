
import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const AnimatedWorkers: React.FC = () => {
  return (
    <>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="absolute bottom-6 left-1/4 transform"
      >
        <User className="text-progineer-gold animate-bounce" size={20} />
      </motion.div>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="absolute bottom-6 right-1/4 transform"
      >
        <User className="text-progineer-gold animate-pulse" size={20} />
      </motion.div>
    </>
  );
};

export default AnimatedWorkers;
