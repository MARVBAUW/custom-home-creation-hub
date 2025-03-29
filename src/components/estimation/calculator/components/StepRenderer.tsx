
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import ClientTypeForm from '../FormSteps/ClientTypeForm';
import DefaultStepContent from '../DefaultStepContent';
import { FormData } from '../types';
import AnimatedStepTransition from '@/components/estimation/AnimatedStepTransition';

type StepRendererProps = {
  step: number;
  totalSteps: number;
  animationDirection: 'forward' | 'backward';
  formData: FormData;
  visibleSteps: any[];
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  onClientTypeSubmit: (data: { clientType: string }) => void;
  onProfessionalProjectSubmit: (data: any) => void;
  onIndividualProjectSubmit: (data: { projectType: string }) => void;
  onEstimationTypeSubmit: (data: any) => void;
  onConstructionDetailsSubmit: (data: any) => void;
  onTerrainSubmit: (data: { terrainType: string }) => void;
  onGrosOeuvreSubmit: (data: { wallType: string }) => void;
  onCharpenteSubmit: (data: { roofType: string }) => void;
  onComblesSubmit: (data: { atticType: string }) => void;
  onCouvertureSubmit: (data: { roofingType: string }) => void;
  onIsolationSubmit: (data: { insulationType: string }) => void;
  onFacadeSubmit: (data: any) => void;
  onMenuiseriesExtSubmit: (data: any) => void;
  onElectriciteSubmit: (data: { electricalType: string }) => void;
  onPlomberieSubmit: (data: { plumbingType: string }) => void;
  onChauffageSubmit: (data: any) => void;
  onPlatrerieSubmit: (data: { plasteringType: string }) => void;
  onMenuiseriesIntSubmit: (data: any) => void;
  onCarrelageSubmit: (data: any) => void;
  onParquetSubmit: (data: any) => void;
  onPeintureSubmit: (data: any) => void;
  onContactSubmit: (data: any) => void;
};

const StepRenderer: React.FC<StepRendererProps> = ({
  step,
  totalSteps,
  animationDirection,
  formData,
  visibleSteps,
  goToNextStep,
  goToPreviousStep,
  onClientTypeSubmit,
  onProfessionalProjectSubmit,
  onIndividualProjectSubmit,
  onEstimationTypeSubmit,
  onConstructionDetailsSubmit,
  onTerrainSubmit,
  onGrosOeuvreSubmit,
  onCharpenteSubmit,
  onComblesSubmit,
  onCouvertureSubmit,
  onIsolationSubmit,
  onFacadeSubmit,
  onMenuiseriesExtSubmit,
  onElectriciteSubmit,
  onPlomberieSubmit,
  onChauffageSubmit,
  onPlatrerieSubmit,
  onMenuiseriesIntSubmit,
  onCarrelageSubmit,
  onParquetSubmit,
  onPeintureSubmit,
  onContactSubmit,
}) => {
  console.log("Current step:", step, "Total steps:", totalSteps);
  
  // Rendu conditionnel des formulaires en fonction de l'étape actuelle
  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <ClientTypeForm 
            onSubmit={onClientTypeSubmit} 
            animationDirection={animationDirection}
            defaultValues={{ clientType: formData.clientType }}
          />
        );
      // Pour l'instant, toutes les autres étapes utilisent le DefaultStepContent
      // À mesure que vous développez les autres formulaires d'étape, vous pouvez les ajouter ici
      default:
        return (
          <DefaultStepContent
            step={step}
            visibleSteps={visibleSteps}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            totalSteps={totalSteps}
            animationDirection={animationDirection}
          />
        );
    }
  };

  return (
    <AnimatePresence mode="wait">
      {renderFormStep()}
    </AnimatePresence>
  );
};

export default StepRenderer;
