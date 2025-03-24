
import React from 'react';
import { motion } from 'framer-motion';
import { Plug, Sun, CookingPot, Bath } from 'lucide-react';

type InteriorDetailsProps = {
  step: number;
};

const InteriorDetails: React.FC<InteriorDetailsProps> = ({ step }) => {
  return (
    <>
      {step >= 14 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-1/3 right-1/4 text-progineer-gold/70"
        >
          <Plug size={14} className="animate-pulse" />
        </motion.div>
      )}
      
      {step >= 16 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-2/3 left-1/4 text-progineer-gold/70"
        >
          <Sun size={14} className="animate-pulse" />
        </motion.div>
      )}
      
      {step >= 22 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-1/2 left-1/3 text-progineer-gold/70"
        >
          <CookingPot size={14} className="animate-pulse" />
        </motion.div>
      )}
      
      {step >= 23 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-1/3 left-1/4 text-progineer-gold/70"
        >
          <Bath size={14} className="animate-pulse" />
        </motion.div>
      )}
    </>
  );
};

export default InteriorDetails;
