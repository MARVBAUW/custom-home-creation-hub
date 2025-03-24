import React, { useEffect, useState } from 'react';
import { 
  Building, Home, Eye, Paintbrush, Ruler, Building2, Landmark, 
  Construction, User, Users, Compass, 
  Sun, Calculator, Check, Bath, CookingPot, LampCeiling, Plug, Map
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type EstimationVisualizerProps = {
  step: number;
  formData: any;
  totalSteps: number;
};

const EstimationVisualizer: React.FC<EstimationVisualizerProps> = ({ step, formData, totalSteps }) => {
  const [buildingProgress, setBuildingProgress] = useState(0);
  const [showWorkers, setShowWorkers] = useState(false);
  const [showMaterials, setShowMaterials] = useState(false);

  // Mettre à jour la progression du bâtiment en fonction de l'étape
  useEffect(() => {
    const progress = Math.min(100, (step / totalSteps) * 100);
    setBuildingProgress(progress);

    // Afficher les travailleurs à partir de l'étape 5
    if (step >= 5 && !showWorkers) {
      setShowWorkers(true);
    }

    // Afficher les matériaux à partir de l'étape 8
    if (step >= 8 && !showMaterials) {
      setShowMaterials(true);
    }
  }, [step, totalSteps]);

  // Fonction pour sélectionner l'icône appropriée en fonction de l'étape
  const getStepIcon = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return <User className="text-progineer-gold" size={24} />;
      case 2:
      case 3: return <Compass className="text-progineer-gold" size={24} />;
      case 4: return <Eye className="text-progineer-gold" size={24} />;
      case 5: return <Building className="text-progineer-gold" size={24} />;
      case 6: return <Map className="text-progineer-gold" size={24} />;
      case 7: return <Building2 className="text-progineer-gold" size={24} />;
      case 8:
      case 9:
      case 10: return <Home className="text-progineer-gold" size={24} />;
      case 11: return <Sun className="text-progineer-gold" size={24} />;
      case 12:
      case 13: return <Landmark className="text-progineer-gold" size={24} />;
      case 14:
      case 15:
      case 16: return <Construction className="text-progineer-gold" size={24} />;
      case 17:
      case 18:
      case 19:
      case 20:
      case 21: return <Paintbrush className="text-progineer-gold" size={24} />;
      case 22: return <CookingPot className="text-progineer-gold" size={24} />; // Changed from ChefHat to CookingPot
      case 23: return <Bath className="text-progineer-gold" size={24} />;
      case 24: return <Users className="text-progineer-gold" size={24} />;
      default: return <Calculator className="text-progineer-gold" size={24} />;
    }
  };

  // Déterminer le titre de l'étape en fonction du numéro d'étape
  const getStepTitle = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return "Profil";
      case 2: return "Projet Pro";
      case 3: return "Projet Particulier";
      case 4: return "Type d'estimation";
      case 5: return "Détails construction";
      case 6: return "Terrain";
      case 7: return "Gros œuvre";
      case 8: return "Charpente";
      case 9: return "Combles";
      case 10: return "Couverture";
      case 11: return "Isolation";
      case 12: return "Façade";
      case 13: return "Menuiseries ext.";
      case 14: return "Électricité";
      case 15: return "Plomberie";
      case 16: return "Chauffage/Clim";
      case 17: return "Plâtrerie";
      case 18: return "Menuiseries int.";
      case 19: return "Carrelage";
      case 20: return "Parquet";
      case 21: return "Peinture";
      case 22: return "Cuisine";
      case 23: return "Salle de bain";
      case 24: return "Contact";
      default: return "Étape";
    }
  };

  // Animation d'illustration en fonction de l'étape
  const renderStepAnimation = () => {
    return (
      <div className="relative h-full w-full">
        {/* Icône principale de l'étape avec animation */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`icon-${step}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {getStepIcon(step)}
          </motion.div>
        </AnimatePresence>
        
        {/* Barre de progression */}
        <div className="absolute bottom-0 w-full h-2 bg-gray-200 rounded-full">
          <motion.div 
            className="h-full bg-progineer-gold rounded-full"
            initial={{ width: `${((step - 1) / totalSteps) * 100}%` }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        {/* Travailleurs animés */}
        <AnimatePresence>
          {showWorkers && (
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
          )}
        </AnimatePresence>
        
        {/* Matériaux animés */}
        <AnimatePresence>
          {showMaterials && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.7 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute top-12 right-12"
            >
              <div className="w-8 h-8 bg-amber-700/50 rounded-sm rotate-12 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Indicateur de progression d'étape */}
        <div className="absolute top-2 right-2 bg-gray-100/80 px-2 py-0.5 rounded-full text-xs font-medium">
          <AnimatePresence mode="wait">
            <motion.span
              key={`step-${step}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {getStepTitle(step)}
            </motion.span>
          </AnimatePresence>
        </div>
        
        {/* Petite construction qui s'anime en fonction des étapes complétées */}
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
        </div>
        
        {/* Indicateurs d'étapes spécifiques */}
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
            <CookingPot size={14} className="animate-pulse" /> {/* Changed from ChefHat to CookingPot */}
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

  return (
    <div className="hidden md:block bg-gradient-to-br from-white to-gray-100 rounded-lg p-6 shadow-inner h-60">
      <h3 className="text-lg font-medium text-progineer-gold mb-4 flex items-center">
        {getStepIcon(step)}
        <span className="ml-2">Visualisation de votre projet</span>
      </h3>
      
      <div className="h-40 w-full relative overflow-hidden bg-white/50 rounded-lg border border-gray-200">
        {renderStepAnimation()}
      </div>
    </div>
  );
};

export default EstimationVisualizer;
