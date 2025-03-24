
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
import ContactForm from './FormSteps/ContactForm';
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
    onContactSubmit,
    updateFormData,
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
