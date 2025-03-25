
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
import ElectriciteForm from '../FormSteps/ElectriciteForm'; // Ajout du composant manquant
import PlomberieForm from '../FormSteps/PlomberieForm'; // Ajout du composant manquant
import ChauffageForm from '../FormSteps/ChauffageForm'; // Ajout du composant manquant
import PlatrerieForm from '../FormSteps/PlatrerieForm'; // Ajout du composant manquant
import MenuiseriesIntForm from '../FormSteps/MenuiseriesIntForm'; // Ajout du composant manquant
import CarrelageForm from '../FormSteps/CarrelageForm'; // Ajout du composant manquant
import ParquetForm from '../FormSteps/ParquetForm'; // Ajout du composant manquant
import PeintureForm from '../FormSteps/PeintureForm'; // Ajout du composant manquant
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
  onElectriciteSubmit: (data: any) => void; // Ajout de la fonction de soumission
  onPlomberieSubmit: (data: any) => void; // Ajout de la fonction de soumission
  onChauffageSubmit: (data: any) => void; // Ajout de la fonction de soumission
  onPlatrerieSubmit: (data: any) => void; // Ajout de la fonction de soumission
  onMenuiseriesIntSubmit: (data: any) => void; // Ajout de la fonction de soumission
  onCarrelageSubmit: (data: any) => void; // Ajout de la fonction de soumission
  onParquetSubmit: (data: any) => void; // Ajout de la fonction de soumission
  onPeintureSubmit: (data: any) => void; // Ajout de la fonction de soumission
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
        
      // Ajout des étapes techniques (14-16)
      case 14:
        return (
          <ElectriciteForm
            defaultValues={{
              electricalType: formData.electricalType,
            }}
            onSubmit={onElectriciteSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case 15:
        return (
          <PlomberieForm
            defaultValues={{
              plumbingType: formData.plumbingType,
            }}
            onSubmit={onPlomberieSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case 16:
        return (
          <ChauffageForm
            defaultValues={{
              heatingType: formData.heatingType,
              hasAirConditioning: formData.hasAirConditioning,
            }}
            onSubmit={onChauffageSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      // Ajout des étapes d'intérieur (17-21)
      case 17:
        return (
          <PlatrerieForm
            defaultValues={{
              plasteringType: formData.plasteringType,
            }}
            onSubmit={onPlatrerieSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case 18:
        return (
          <MenuiseriesIntForm
            defaultValues={{
              doorType: formData.doorType,
              interiorFittings: formData.interiorFittings,
            }}
            onSubmit={onMenuiseriesIntSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case 19:
        return (
          <CarrelageForm
            defaultValues={{
              floorTileType: formData.floorTileType,
              wallTileType: formData.wallTileType,
              floorTilePercentage: formData.floorTilePercentage,
            }}
            onSubmit={onCarrelageSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case 20:
        return (
          <ParquetForm
            defaultValues={{
              parquetType: formData.parquetType,
              parquetPercentage: formData.parquetPercentage,
              softFloorType: formData.softFloorType,
              softFloorPercentage: formData.softFloorPercentage,
            }}
            onSubmit={onParquetSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case 21:
        return (
          <PeintureForm
            defaultValues={{
              basicPaintPercentage: formData.basicPaintPercentage,
              decorativePaintPercentage: formData.decorativePaintPercentage,
              wallpaperPercentage: formData.wallpaperPercentage,
              woodCladPercentage: formData.woodCladPercentage,
              stoneCladPercentage: formData.stoneCladPercentage,
            }}
            onSubmit={onPeintureSubmit}
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
