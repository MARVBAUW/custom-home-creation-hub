
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedMaterials: React.FC = () => {
  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.7 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="absolute top-12 right-12"
    >
      <div className="w-8 h-8 bg-amber-700/50 rounded-sm rotate-12 animate-pulse" />
    </motion.div>
  );
};

export default AnimatedMaterials;
