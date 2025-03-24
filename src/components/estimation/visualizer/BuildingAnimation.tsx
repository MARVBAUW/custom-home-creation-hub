
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

type BuildingAnimationProps = {
  step: number;
  totalSteps?: number;
};

const BuildingAnimation: React.FC<BuildingAnimationProps> = ({ 
  step, 
  totalSteps = 36 
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 mx-auto w-40 h-32">
      {/* Terrain/fondation - visible après l'étape 6 */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 mx-auto w-40 h-4 bg-gray-400"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: step > 6 ? 1 : 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
      
      {/* Murs - visibles après l'étape 11 */}
      <motion.div 
        className="absolute bottom-4 left-0 right-0 mx-auto w-32 h-20 bg-gradient-to-b from-gray-200 to-gray-300"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ 
          scaleY: step > 11 ? 1 : 0,
          opacity: step > 11 ? 1 : 0
        }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
      />
      
      {/* Toit - visible après l'étape 15 */}
      <motion.div 
        className="absolute bottom-24 left-0 right-0 mx-auto border-l-[16px] border-r-[16px] border-b-[8px] border-l-transparent border-r-transparent border-b-progineer-gold w-40 h-0"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: step > 15 ? 1 : 0,
          opacity: step > 15 ? 1 : 0
        }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      />
      
      {/* Fenêtres - visibles après l'étape 18 */}
      <motion.div 
        className="absolute bottom-12 left-6 w-6 h-6 bg-sky-200"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: step > 18 ? 1 : 0, 
          opacity: step > 18 ? 1 : 0
        }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      />
      
      <motion.div 
        className="absolute bottom-12 right-6 w-6 h-6 bg-sky-200"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: step > 18 ? 1 : 0,
          opacity: step > 18 ? 1 : 0
        }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
      />
      
      {/* Porte - visible après l'étape 20 */}
      <motion.div 
        className="absolute bottom-4 left-0 right-0 mx-auto w-8 h-12 bg-amber-800"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ 
          scaleY: step > 20 ? 1 : 0,
          opacity: step > 20 ? 1 : 0
        }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      />
      
      {/* Détails intérieurs - visibles après l'étape 22 */}
      {step > 22 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute bottom-16 left-0 right-0 mx-auto w-2 h-2 bg-yellow-400 rounded-full"
        />
      )}
      
      {/* Effet de complétion lorsqu'on atteint la dernière étape */}
      {step === totalSteps && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="bg-white/60 rounded-full p-2">
            <Check className="text-green-500" size={30} />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BuildingAnimation;
