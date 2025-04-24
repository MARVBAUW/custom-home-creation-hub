
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  onClick: () => void;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ onClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, 10, 0] }}
      transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatType: "loop" }}
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col items-center">
        <span className="text-white mb-2 text-sm">Découvrir</span>
        <ChevronDown className="text-white h-6 w-6" />
      </div>
    </motion.div>
  );
};

export default ScrollIndicator;
