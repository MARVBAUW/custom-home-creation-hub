
import React from 'react';
import { motion } from 'framer-motion';

type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
  buildingProgress: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  currentStep, 
  totalSteps, 
  buildingProgress 
}) => {
  return (
    <div className="absolute bottom-0 w-full h-2 bg-gray-200 rounded-full">
      <motion.div 
        className="h-full bg-progineer-gold rounded-full"
        initial={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
        animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

export default ProgressBar;
