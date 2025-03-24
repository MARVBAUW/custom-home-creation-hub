
import React from 'react';
import StepIndicator from './StepIndicator';
import BuildingAnimation from './BuildingAnimation';
import ProgressBar from './ProgressBar';
import AnimatedWorkers from './AnimatedWorkers';
import AnimatedMaterials from './AnimatedMaterials';
import InteriorDetails from './InteriorDetails';
import { useVisualizerState } from './useVisualizerState';

type EstimationVisualizerProps = {
  step: number;
  formData: any;
  totalSteps: number;
};

const EstimationVisualizer: React.FC<EstimationVisualizerProps> = ({ 
  step, 
  formData, 
  totalSteps 
}) => {
  const { 
    buildingProgress, 
    showWorkers, 
    showMaterials 
  } = useVisualizerState(step, totalSteps);

  return (
    <div className="hidden md:block bg-gradient-to-br from-white to-gray-100 rounded-lg p-6 shadow-inner h-60">
      <h3 className="text-lg font-medium text-progineer-gold mb-4 flex items-center">
        <StepIndicator step={step} iconOnly={true} />
        <span className="ml-2">Visualisation de votre projet</span>
      </h3>
      
      <div className="h-40 w-full relative overflow-hidden bg-white/50 rounded-lg border border-gray-200">
        <div className="relative h-full w-full">
          {/* Icône principale de l'étape avec animation */}
          <StepIndicator step={step} />
          
          {/* Barre de progression */}
          <ProgressBar 
            currentStep={step} 
            totalSteps={totalSteps} 
            buildingProgress={buildingProgress} 
          />
          
          {/* Travailleurs animés */}
          {showWorkers && <AnimatedWorkers />}
          
          {/* Matériaux animés */}
          {showMaterials && <AnimatedMaterials />}
          
          {/* Indicateur de progression d'étape */}
          <div className="absolute top-2 right-2 bg-gray-100/80 px-2 py-0.5 rounded-full text-xs font-medium">
            <StepIndicator step={step} titleOnly={true} animated={true} />
          </div>
          
          {/* Petite construction qui s'anime en fonction des étapes complétées */}
          <BuildingAnimation step={step} />
          
          {/* Indicateurs d'étapes spécifiques - les détails intérieurs */}
          <InteriorDetails step={step} />
        </div>
      </div>
    </div>
  );
};

export default EstimationVisualizer;
