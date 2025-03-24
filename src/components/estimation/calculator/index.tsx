
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import ProgressBar from './ProgressBar';
import ClientTypeForm from './FormSteps/ClientTypeForm';
import ProfessionalProjectForm from './FormSteps/ProfessionalProjectForm';
import IndividualProjectForm from './FormSteps/IndividualProjectForm';
import EstimationTypeForm from './FormSteps/EstimationTypeForm';
import ConstructionDetailsForm from './FormSteps/ConstructionDetailsForm';
import TerrainForm from './FormSteps/TerrainForm';
import GrosOeuvreForm from './FormSteps/GrosOeuvreForm';
import CharpenteForm from './FormSteps/CharpenteForm';
import CombleForm from './FormSteps/CombleForm';
import CouvertureForm from './FormSteps/CouvertureForm';
import IsolationForm from './FormSteps/IsolationForm';
import FacadeForm from './FormSteps/FacadeForm';
import MenuiseriesExtForm from './FormSteps/MenuiseriesExtForm';
import ElectriciteForm from './FormSteps/ElectriciteForm';
import PlomberieForm from './FormSteps/PlomberieForm';
import ChauffageForm from './FormSteps/ChauffageForm';
import PlatrerieForm from './FormSteps/PlatrerieForm';
import MenuiseriesIntForm from './FormSteps/MenuiseriesIntForm';
import CarrelageForm from './FormSteps/CarrelageForm';
import ParquetForm from './FormSteps/ParquetForm';
import PeintureForm from './FormSteps/PeintureForm';
import EnergiesRenouvelablesForm from './FormSteps/EnergiesRenouvelablesForm';
import SolutionsEnvironForm from './FormSteps/SolutionsEnvironForm';
import AmenagementPaysagerForm from './FormSteps/AmenagementPaysagerForm';
import OptionsForm from './FormSteps/OptionsForm';
import CuisineForm from './FormSteps/CuisineForm';
import SalleDeBainForm from './FormSteps/SalleDeBainForm';
import ContactForm from './FormSteps/ContactForm';
import DemolitionForm from './FormSteps/DemolitionForm';
import GrosOeuvreRenovForm from './FormSteps/GrosOeuvreRenovForm';
import CharpenteRenovForm from './FormSteps/CharpenteRenovForm';
import CouvertureRenovForm from './FormSteps/CouvertureRenovForm';
import FacadeRenovForm from './FormSteps/FacadeRenovForm';
import DefaultStepContent from './DefaultStepContent';
import EstimationResult from './EstimationResult';
import StepContext from './StepContext';
import { useEstimationCalculator } from './useEstimationCalculator';
import { getStepIcon, getStepTitle } from '../visualizer/visualizerUtils';

const EstimationCalculator: React.FC = () => {
  const {
    step,
    totalSteps,
    estimationResult,
    showResultDialog,
    setShowResultDialog,
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
    onEnergiesRenouvelablesSubmit,
    onSolutionsEnvironSubmit,
    onAmenagementPaysagerSubmit,
    onOptionsSubmit,
    onCuisineSubmit,
    onSalleDeBainSubmit,
    onDemolitionSubmit,
    onGrosOeuvreRenovSubmit,
    onCharpenteRenovSubmit,
    onCouvertureRenovSubmit,
    onFacadeRenovSubmit,
    onContactSubmit,
  } = useEstimationCalculator();

  // Rendu de l'étape actuelle avec animations
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
        // Étape projet professionnel
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
        // Étape projet particulier
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
        // Étape type d'estimation
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
        // Étape détails de construction
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
        // Étape terrain
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
        // Étape gros oeuvre
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
        // Étape charpente
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
        // Étape combles
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
        // Étape couverture
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
        // Étape isolation
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
        // Étape façade
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
        // Étape menuiseries extérieures
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
        
      case 14:
        // Étape électricité
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
        // Étape plomberie
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
        // Étape chauffage/climatisation
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
        
      case 17:
        // Étape plâtrerie
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
        // Étape menuiseries intérieures
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
        // Étape carrelage
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
        // Étape parquet
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
        // Étape peinture
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
        
      case 22:
        // Étape énergies renouvelables
        return (
          <EnergiesRenouvelablesForm
            defaultValues={{
              energyType: formData.energyType,
            }}
            onSubmit={onEnergiesRenouvelablesSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case 23:
        // Étape solutions environnementales
        return (
          <SolutionsEnvironForm
            defaultValues={{
              solutionType: formData.solutionType,
            }}
            onSubmit={onSolutionsEnvironSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case 24:
        // Étape aménagement paysager
        return (
          <AmenagementPaysagerForm
            defaultValues={{
              landscapeLevel: formData.landscapeLevel,
              fencingLength: formData.fencingLength,
              gateLength: formData.gateLength,
              terraceArea: formData.terraceArea,
              landscapeArea: formData.landscapeArea,
            }}
            onSubmit={onAmenagementPaysagerSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case 25:
        // Étape options (piscine, jacuzzi, carport)
        return (
          <OptionsForm
            defaultValues={{
              carport: formData.carport,
              pool: formData.pool,
              poolArea: formData.poolArea,
              poolHeating: formData.poolHeating,
              jacuzzi: formData.jacuzzi,
              jacuzziArea: formData.jacuzziArea,
            }}
            onSubmit={onOptionsSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case 26:
        // Étape cuisine
        return (
          <CuisineForm
            defaultValues={{
              kitchenType: formData.kitchenType,
            }}
            onSubmit={onCuisineSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case 27:
        // Étape salle de bain
        return (
          <SalleDeBainForm
            defaultValues={{
              bathroomType: formData.bathroomType,
              bathroomCount: formData.bathroomCount,
            }}
            onSubmit={onSalleDeBainSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case 28:
        // Étape démolition (rénovation)
        return (
          <DemolitionForm
            defaultValues={{
              demolitionItems: formData.demolitionItems || [],
              facadePercentage: formData.facadePercentage || "",
              plasteringPercentage: formData.plasteringPercentage || "",
              flooringPercentage: formData.flooringPercentage || "",
              interiorDoorsPercentage: formData.interiorDoorsPercentage || "",
              windowsPercentage: formData.windowsPercentage || "",
              plumbingPercentage: formData.plumbingPercentage || "",
              sanitaryPercentage: formData.sanitaryPercentage || "",
              electricalPercentage: formData.electricalPercentage || "",
              acPercentage: formData.acPercentage || "",
              ventilationPercentage: formData.ventilationPercentage || "",
              heatingPercentage: formData.heatingPercentage || "",
              entireNonStructuralPercentage: formData.entireNonStructuralPercentage || "",
              demolitionArea: formData.demolitionArea || "",
            }}
            onSubmit={onDemolitionSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case 29:
        // Étape gros oeuvre (rénovation)
        return (
          <GrosOeuvreRenovForm
            defaultValues={{}}
            onSubmit={onGrosOeuvreRenovSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case 30:
        // Étape charpente (rénovation)
        return (
          <CharpenteRenovForm
            defaultValues={{}}
            onSubmit={onCharpenteRenovSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case 31:
        // Étape couverture (rénovation)
        return (
          <CouvertureRenovForm
            defaultValues={{}}
            onSubmit={onCouvertureRenovSubmit}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
        
      case 32:
        // Étape façade (rénovation)
        return (
          <FacadeRenovForm
            defaultValues={{}}
            onSubmit={onFacadeRenovSubmit}
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
    <div className="w-full max-w-4xl mx-auto">
      {/* Barre de progression */}
      <ProgressBar currentStep={step} totalSteps={totalSteps} />

      {/* Contenu de l'étape avec visualisateur */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2 bg-white shadow-sm border rounded-lg p-6 estimation-form-container">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>
        
        <StepContext
          step={step}
          title={getStepTitle(step)}
          icon={getStepIcon(step)}
          formData={formData}
          totalSteps={totalSteps}
        />
      </div>
      
      {/* Résultat de l'estimation avec animation */}
      <EstimationResult
        showResultDialog={showResultDialog}
        setShowResultDialog={setShowResultDialog}
        estimationResult={estimationResult}
      />
    </div>
  );
};

export default EstimationCalculator;
