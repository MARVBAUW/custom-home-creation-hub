
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

type BuildingAnimationProps = {
  step: number;
  totalSteps?: number;
};

const BuildingAnimation: React.FC<BuildingAnimationProps> = ({ 
  step, 
  totalSteps = 24 // Nombre total d'étapes attendu
}) => {
  // Calculer le pourcentage de progression pour la visualisation
  const progressPercentage = Math.min((step / totalSteps) * 100, 100);
  
  return (
    <div className="absolute bottom-0 left-0 right-0 mx-auto w-40 h-32">
      {/* Terrain/fondation - visible après l'étape 6 */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 mx-auto w-40 h-4 bg-gradient-to-r from-gray-400 to-gray-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: step >= 6 ? 1 : 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
      
      {/* Murs - visibles après l'étape 7 (structure des murs) */}
      <motion.div 
        className="absolute bottom-4 left-0 right-0 mx-auto w-32 h-20 bg-gradient-to-b from-gray-200 to-gray-300"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ 
          scaleY: step >= 7 ? 1 : 0,
          opacity: step >= 7 ? 1 : 0
        }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
      />
      
      {/* Toit - visible après l'étape 10 (couverture toiture) */}
      <motion.div 
        className="absolute bottom-24 left-0 right-0 mx-auto border-l-[16px] border-r-[16px] border-b-[8px] border-l-transparent border-r-transparent border-b-progineer-gold w-40 h-0"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: step >= 10 ? 1 : 0,
          opacity: step >= 10 ? 1 : 0
        }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      />
      
      {/* Fenêtres - visibles après l'étape 13 (menuiseries extérieures) */}
      <motion.div 
        className="absolute bottom-12 left-6 w-6 h-6 bg-sky-200"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: step >= 13 ? 1 : 0, 
          opacity: step >= 13 ? 1 : 0
        }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      />
      
      <motion.div 
        className="absolute bottom-12 right-6 w-6 h-6 bg-sky-200"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: step >= 13 ? 1 : 0,
          opacity: step >= 13 ? 1 : 0
        }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
      />
      
      {/* Porte - visible après l'étape 18 (menuiseries intérieures) */}
      <motion.div 
        className="absolute bottom-4 left-0 right-0 mx-auto w-8 h-12 bg-amber-800"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ 
          scaleY: step >= 18 ? 1 : 0,
          opacity: step >= 18 ? 1 : 0
        }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      />
      
      {/* Détails intérieurs - visibles après les étapes de finition (21+) */}
      {step >= 21 && (
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
