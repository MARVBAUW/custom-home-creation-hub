
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEstimationCalculator } from './useEstimationCalculator';
import EstimationResult from './EstimationResult';
import { Card } from '@/components/ui/card';
import ClientTypeStep from './steps/ClientTypeStep';
import ProjectDetailsStep from './steps/ProjectDetailsStep';
import TerrainDetailsStep from './steps/TerrainDetailsStep';
import FinishDetailsStep from './steps/FinishDetailsStep';
import RoomsDetailsStep from './steps/RoomsDetailsStep';
import ExteriorFeaturesStep from './steps/ExteriorFeaturesStep';
import SpecialFeaturesStep from './steps/SpecialFeaturesStep';
import ContactDetailsStep from './steps/ContactDetailsStep';

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
    console.log("Rendering step:", step);
    
    switch (step) {
      case 0: // Type de projet (première étape)
        return (
          <ClientTypeStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            animationDirection={animationDirection}
          />
        );
      case 1: // Professionnel - Infos projet
        return (
          <ProjectDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 2: // Individual Project Type (hidden in new flow)
        return (
          <ProjectDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 3: // Estimation Type (rapide/précise)
        return (
          <RoomsDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 4: // Construction Details
        return (
          <FinishDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 5: // Terrain Details
        return (
          <TerrainDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 6: // Options and more details
        return (
          <ExteriorFeaturesStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 7: // Contact Form
        return (
          <ContactDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 8: // Results
        return (
          <SpecialFeaturesStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={finalizeEstimation}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 29: // Demolition (for renovation)
        return (
          <FinishDetailsStep
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
