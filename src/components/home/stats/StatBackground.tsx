
import React from 'react';
import { motion } from 'framer-motion';

const StatBackground: React.FC = () => {
  return (
    <>
      {/* Top gradient */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-stone-100/50 to-transparent"></div>
      
      {/* Decoration circles */}
      <motion.div 
        className="absolute top-1/4 left-1/6 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl"
        animate={{ 
          x: [0, 10, 0], 
          y: [0, -10, 0] 
        }} 
        transition={{ 
          repeat: Infinity, 
          duration: 8,
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/6 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl"
        animate={{ 
          x: [0, -15, 0], 
          y: [0, 15, 0] 
        }} 
        transition={{ 
          repeat: Infinity, 
          duration: 10,
          ease: "easeInOut"  
        }}
      />
      <motion.div 
        className="absolute top-2/3 left-1/3 w-72 h-72 rounded-full bg-sky-500/5 blur-3xl"
        animate={{ 
          x: [0, 20, 0], 
          y: [0, 5, 0] 
        }} 
        transition={{ 
          repeat: Infinity, 
          duration: 9,
          ease: "easeInOut"  
        }}
      />
      
      {/* Decorative shapes */}
      <div className="absolute left-10 top-10 w-6 h-6 border-2 border-amber-300/30 rounded-sm rotate-12"></div>
      <div className="absolute right-1/4 top-1/3 w-4 h-4 border-2 border-emerald-300/30 rounded-full"></div>
      <div className="absolute left-1/3 bottom-10 w-8 h-8 border-2 border-sky-300/30 rounded-md rotate-45"></div>
    </>
  );
};

export default StatBackground;
