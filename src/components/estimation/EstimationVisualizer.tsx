
import React from 'react';
import { 
  Building, Home, Eye, Paintbrush, Ruler, Building2, Landmark, 
  Construction, LayoutGrid, HardHat, User, Users, Compass, 
  Sun, Calculator, Check, Bath, ChefHat, LampCeiling, Plug, Map
} from 'lucide-react';

type EstimationVisualizerProps = {
  step: number;
  formData: any;
  totalSteps: number;
};

const EstimationVisualizer: React.FC<EstimationVisualizerProps> = ({ step, formData, totalSteps }) => {
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
      case 22: return <ChefHat className="text-progineer-gold" size={24} />;
      case 23: return <Bath className="text-progineer-gold" size={24} />;
      case 24: return <Users className="text-progineer-gold" size={24} />;
      default: return <Calculator className="text-progineer-gold" size={24} />;
    }
  };

  // Animation d'illustration en fonction de l'étape
  const renderStepAnimation = () => {
    // Affiche une animation différente selon l'étape actuelle
    return (
      <div className="relative h-full w-full">
        <div className="absolute inset-0 flex items-center justify-center">
          {getStepIcon(step)}
        </div>
        
        <div className="absolute bottom-0 w-full h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-progineer-gold rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
        
        {/* Petits personnages animés */}
        <div className={`absolute bottom-4 left-1/4 transform transition-all duration-500 ${step > 5 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <HardHat className="text-progineer-gold animate-bounce" size={20} />
        </div>
        
        <div className={`absolute bottom-4 right-1/4 transform transition-all duration-500 ${step > 10 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <HardHat className="text-progineer-gold animate-pulse" size={20} />
        </div>
        
        <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${step > 15 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <Check className="text-green-500 animate-pulse" size={20} />
        </div>
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
        
        {/* Petite construction qui s'anime en fonction des étapes complétées */}
        <div className="absolute bottom-0 left-0 right-0 mx-auto w-40 h-32">
          {/* Fondation - visible après l'étape 6 */}
          <div 
            className={`absolute bottom-0 left-0 right-0 mx-auto w-40 h-4 bg-gray-400 transition-all duration-700 ease-out ${
              step > 6 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
          />
          
          {/* Murs - visibles après l'étape 11 */}
          <div 
            className={`absolute bottom-4 left-0 right-0 mx-auto w-32 h-20 bg-gradient-to-b from-gray-200 to-gray-300 transition-all duration-700 delay-100 ease-out ${
              step > 11 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
          />
          
          {/* Toit - visible après l'étape 15 */}
          <div 
            className={`absolute bottom-24 left-0 right-0 mx-auto border-l-[16px] border-r-[16px] border-b-[8px] border-l-transparent border-r-transparent border-b-progineer-gold w-40 h-0 transition-all duration-700 delay-200 ease-out ${
              step > 15 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
          />
          
          {/* Fenêtres - visibles après l'étape 18 */}
          <div 
            className={`absolute bottom-12 left-6 w-6 h-6 bg-sky-200 transition-all duration-500 delay-300 ease-out ${
              step > 18 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
          />
          
          <div 
            className={`absolute bottom-12 right-6 w-6 h-6 bg-sky-200 transition-all duration-500 delay-400 ease-out ${
              step > 18 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
          />
          
          {/* Porte - visible après l'étape 20 */}
          <div 
            className={`absolute bottom-4 left-0 right-0 mx-auto w-8 h-12 bg-amber-800 transition-all duration-500 delay-500 ease-out ${
              step > 20 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default EstimationVisualizer;
