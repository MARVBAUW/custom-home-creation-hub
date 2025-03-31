
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEstimationCalculator } from './useEstimationCalculator';
import EstimationResult from './EstimationResult';
import { Card } from '@/components/ui/card';

// Import all step components
import ClientTypeStep from './steps/ClientTypeStep';
import ProfessionalProjectDetailsStep from './steps/ProfessionalProjectDetailsStep';
import IndividualProjectTypeStep from './steps/IndividualProjectTypeStep';
import EstimationTypeStep from './steps/EstimationTypeStep';
import ConstructionDetailsStep from './steps/ConstructionDetailsStep';
import TerrainStep from './steps/TerrainStep';
import DemolitionStep from './steps/DemolitionStep';
import GrosOeuvreStep from './steps/GrosOeuvreStep';
import CharpenteStep from './steps/CharpenteStep';
import ComblesStep from './steps/ComblesStep';
import CouvertureStep from './steps/CouvertureStep';
import RenovationSpecificStep from './steps/RenovationSpecificStep';
import IsolationStep from './steps/IsolationStep';
import FacadeStep from './steps/FacadeStep';
import FinishDetailsStep from './steps/FinishDetailsStep';
import RoomsDetailsStep from './steps/RoomsDetailsStep';
import ExteriorFeaturesStep from './steps/ExteriorFeaturesStep';
import SpecialFeaturesStep from './steps/SpecialFeaturesStep';
import ContactDetailsStep from './steps/ContactDetailsStep';
import QuickEstimationStep from './steps/QuickEstimationStep';
import QuickEstimationFeaturesStep from './steps/QuickEstimationFeaturesStep';
import QuickContactStep from './steps/QuickContactStep';
import ThankYouStep from './steps/ThankYouStep';

// Animation variants for page transitions
const pageVariants = {
  initial: (direction: 'forward' | 'backward') => ({
    x: direction === 'forward' ? '100%' : '-100%',
    opacity: 0
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    }
  },
  exit: (direction: 'forward' | 'backward') => ({
    x: direction === 'forward' ? '-100%' : '100%',
    opacity: 0,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    }
  })
};

const EstimationWizard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('form');
  
  // Use the estimation calculator hook
  const {
    step,
    setStep,
    totalSteps,
    formData,
    estimationResult,
    animationDirection,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    calculateEstimationResult,
    finalizeEstimation
  } = useEstimationCalculator();
  
  // Switch to results tab when estimation is calculated
  useEffect(() => {
    if (estimationResult) {
      setActiveTab('results');
    }
  }, [estimationResult]);

  // Function to render the current step component
  const renderCurrentStep = () => {
    console.log("Rendering step:", step, "Project Type:", formData.projectType);
    
    switch (step) {
      case 0: // Type de client (première étape)
        return (
          <ClientTypeStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            animationDirection={animationDirection}
          />
        );
      case 1: // Professionnel - Infos projet (deuxième étape pour pro)
        return (
          <ProfessionalProjectDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 2: // Individual Project Type (troisième étape pour particulier)
        return (
          <IndividualProjectTypeStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 3: // Estimation Type (rapide/précise)
        return (
          <EstimationTypeStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 4: // Construction Details
        return (
          <ConstructionDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 5: // Terrain Details
        return (
          <TerrainStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 6: // Demolition
        return (
          <DemolitionStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 7: // Gros Oeuvre
        return (
          <GrosOeuvreStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 8: // Charpente
        return (
          <CharpenteStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 9: // Combles
        return (
          <ComblesStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 10: // Couverture
        return (
          <CouvertureStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 11: // Renovation Specific (for renovation projects)
        return (
          <RenovationSpecificStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 12: // Isolation
        return (
          <IsolationStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 13: // Facade
        return (
          <FacadeStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 14: // Rooms Details
        return (
          <RoomsDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 15: // Finish Details
        return (
          <FinishDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 16: // Exterior Features
        return (
          <ExteriorFeaturesStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 17: // Special Features
        return (
          <SpecialFeaturesStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 18: // Contact Details
        return (
          <ContactDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={finalizeEstimation}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 44: // Quick Estimation Features selection
        return (
          <QuickEstimationFeaturesStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 45: // Quick Contact Form
        return (
          <QuickContactStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
            finalizeEstimation={finalizeEstimation}
          />
        );
      case 46: // Thank You Page
        return (
          <ThankYouStep
            formData={formData}
            animationDirection={animationDirection}
          />
        );
      case 19: // Quick Estimation (for rapid estimates)
        return (
          <QuickEstimationStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      default:
        return (
          <ClientTypeStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            animationDirection={animationDirection}
          />
        );
    }
  };
  
  return (
    <div className="w-full">
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Formulaire d'estimation</TabsTrigger>
          <TabsTrigger value="results" disabled={!estimationResult}>Résultats</TabsTrigger>
        </TabsList>
        
        <TabsContent value="form" className="py-4">
          <AnimatePresence mode="wait" custom={animationDirection}>
            <motion.div
              key={step}
              custom={animationDirection}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <Card className="w-full shadow-md border p-6">
                {renderCurrentStep()}
              </Card>
            </motion.div>
          </AnimatePresence>
        </TabsContent>
        
        <TabsContent value="results" className="py-4">
          {estimationResult && (
            <EstimationResult 
              formData={formData}
              estimationResult={estimationResult}
              onBack={() => setActiveTab('form')}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EstimationWizard;
