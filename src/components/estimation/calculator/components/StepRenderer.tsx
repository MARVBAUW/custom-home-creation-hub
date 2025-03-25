
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import ClientTypeForm from '../FormSteps/ClientTypeForm';
import ProfessionalProjectForm from '../FormSteps/ProfessionalProjectForm';
import IndividualProjectForm from '../FormSteps/IndividualProjectForm';
import EstimationTypeForm from '../FormSteps/EstimationTypeForm';
import ConstructionDetailsForm from '../FormSteps/ConstructionDetailsForm';
import TerrainForm from '../FormSteps/TerrainForm';
import GrosOeuvreForm from '../FormSteps/GrosOeuvreForm';
import CharpenteForm from '../FormSteps/CharpenteForm';
import CombleForm from '../FormSteps/CombleForm';
import CouvertureForm from '../FormSteps/CouvertureForm';
import IsolationForm from '../FormSteps/IsolationForm';
import FacadeForm from '../FormSteps/FacadeForm';
import MenuiseriesExtForm from '../FormSteps/MenuiseriesExtForm';
import ContactForm from '../FormSteps/ContactForm';
import DefaultStepContent from '../DefaultStepContent';
import { FormData } from '../types';

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
  onContactSubmit,
}) => {
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <ClientTypeForm
            defaultValues={{ clientType: formData.clientType }}
            onSubmit={onClientTypeSubmit}
            animationDirection={animationDirection}
          />
        );
        
      case 2:
        return (
          <ProfessionalProjectForm
            defaultValues={{
              activity: formData.activity,
              projectType: formData.projectType,
              startDate: formData.startDate,
              endDate: formData.endDate,
            }}
            onSubmit={onProfessionalProjectSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case 3:
        return (
          <IndividualProjectForm
            defaultValues={{
              projectType: formData.projectType,
            }}
            onSubmit={onIndividualProjectSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case 4:
        return (
          <EstimationTypeForm
            defaultValues={{
              estimationType: formData.estimationType,
              termsAccepted: formData.termsAccepted,
            }}
            onSubmit={onEstimationTypeSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case 5:
        return (
          <ConstructionDetailsForm
            defaultValues={{
              surface: formData.surface,
              levels: formData.levels,
              units: formData.units,
            }}
            onSubmit={onConstructionDetailsSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case 6:
        return (
          <TerrainForm
            defaultValues={{
              terrainType: formData.terrainType,
            }}
            onSubmit={onTerrainSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case 7:
        return (
          <GrosOeuvreForm
            defaultValues={{
              wallType: formData.wallType,
            }}
            onSubmit={onGrosOeuvreSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case 8:
        return (
          <CharpenteForm
            defaultValues={{
              roofType: formData.roofType,
            }}
            onSubmit={onCharpenteSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case 9:
        return (
          <CombleForm
            defaultValues={{
              atticType: formData.atticType,
            }}
            onSubmit={onComblesSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case 10:
        return (
          <CouvertureForm
            defaultValues={{
              roofingType: formData.roofingType,
            }}
            onSubmit={onCouvertureSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case 11:
        return (
          <IsolationForm
            defaultValues={{
              insulationType: formData.insulationType,
            }}
            onSubmit={onIsolationSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case 12:
        return (
          <FacadeForm
            defaultValues={{
              stonePercentage: formData.stonePercentage,
              plasterPercentage: formData.plasterPercentage,
              brickPercentage: formData.brickPercentage,
              metalCladdingPercentage: formData.metalCladdingPercentage,
              woodCladdingPercentage: formData.woodCladdingPercentage,
              stoneCladdingPercentage: formData.stoneCladdingPercentage,
            }}
            onSubmit={onFacadeSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case 13:
        return (
          <MenuiseriesExtForm
            defaultValues={{
              windowType: formData.windowType,
              windowRenovationArea: formData.windowRenovationArea,
              windowNewArea: formData.windowNewArea,
            }}
            onSubmit={onMenuiseriesExtSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case totalSteps:
        return (
          <ContactForm
            defaultValues={{
              firstName: formData.firstName,
              lastName: formData.lastName,
              phone: formData.phone,
              email: formData.email,
            }}
            onSubmit={onContactSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      
      default:
        return (
          <DefaultStepContent
            step={step}
            visibleSteps={visibleSteps}
            goToPreviousStep={goToPreviousStep}
            goToNextStep={goToNextStep}
            totalSteps={totalSteps}
            animationDirection={animationDirection}
          />
        );
    }
  };

  return (
    <AnimatePresence mode="wait">
      {renderStep()}
    </AnimatePresence>
  );
};

export default StepRenderer;
