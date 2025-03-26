
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import DefaultStepContent from '../DefaultStepContent';
import { FormData } from '../types';
import AnimatedStepTransition from '@/components/estimation/AnimatedStepTransition';
import { useStepRendererManager } from './steps/StepRendererManager';

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

const StepRenderer: React.FC<StepRendererProps> = (props) => {
  console.log("Current step:", props.step, "Total steps:", props.totalSteps);
  
  // Use the step renderer manager to handle step rendering
  const { renderStep } = useStepRendererManager(props);

  return (
    <AnimatePresence mode="wait">
      {renderStep()}
    </AnimatePresence>
  );
};

export default StepRenderer;
