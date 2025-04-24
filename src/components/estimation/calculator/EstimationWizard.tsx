
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEstimationCalculator } from './useEstimationCalculator';
import EstimationResult from './EstimationResult';
import { Card } from '@/components/ui/card';
import FormNavigation from './FormNavigation';

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
import MenuiseriesExtStep from './steps/MenuiseriesExtStep';
import ElectriciteStep from './steps/ElectriciteStep';
import PlomberieStep from './steps/PlomberieStep';
import ChauffageStep from './steps/ChauffageStep';
import PlatrerieStep from './steps/PlatrerieStep';
import MenuiseriesIntStep from './steps/MenuiseriesIntStep';
import CarrelageStep from './steps/CarrelageStep';
import ParquetStep from './steps/ParquetStep';
import PeintureStep from './steps/PeintureStep';
import EnergiesRenouvelablesStep from './steps/EnergiesRenouvelablesStep';
import SolutionsEnvironnementalesStep from './steps/SolutionsEnvironnementalesStep';
import AmenagementExterieursStep from './steps/AmenagementExterieursStep';
import AmenagementExterieursDetailsStep from './steps/AmenagementExterieursDetailsStep';
import CuisineStep from './steps/CuisineStep';
import SalleDeBainStep from './steps/SalleDeBainStep';
import ContactDetailsStep from './steps/ContactDetailsStep';
import QuickEstimationStep from './steps/QuickEstimationStep';
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
    finalizeEstimation,
    isSubmitting
  } = useEstimationCalculator();
  
  // Switch to results tab when estimation is calculated
  useEffect(() => {
    if (estimationResult) {
      setActiveTab('results');
    }
  }, [estimationResult]);

  // Function to render the current step component
  const renderCurrentStep = () => {
    console.log("Rendering step:", step, "Project Type:", formData.projectType, "Client Type:", formData.clientType);
    
    switch (step) {
      case 0: // Client Type Selection (Page 1)
        return (
          <ClientTypeStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            animationDirection={animationDirection}
          />
        );
      case 1: // Professional Project Details (Page 2)
        return (
          <ProfessionalProjectDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 2: // Individual Project Type (Page 3)
        return (
          <IndividualProjectTypeStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 3: // Estimation Type (Page 4)
        return (
          <EstimationTypeStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 4: // Construction Details (Page 5)
        return (
          <ConstructionDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 5: // Terrain (Page 6)
        return (
          <TerrainStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 6: // Demolition (Page 7)
        return (
          <DemolitionStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 7: // Gros Oeuvre (Page 8)
        return (
          <GrosOeuvreStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 8: // Charpente (Page 9)
        return (
          <CharpenteStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 9: // Combles (Page 10)
        return (
          <ComblesStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 10: // Couverture (Page 11)
        return (
          <CouvertureStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 11: // Isolation (Page 12)
        return (
          <IsolationStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 12: // Facade (Page 13)
        return (
          <FacadeStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 13: // Menuiseries exterieures (Page 14)
        return (
          <MenuiseriesExtStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 14: // Électricité (Page 15)
        return (
          <ElectriciteStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 15: // Plomberie (Page 16)
        return (
          <PlomberieStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 16: // Chauffage (Page 17)
        return (
          <ChauffageStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 17: // Plâtrerie (Page 18)
        return (
          <PlatrerieStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 18: // Menuiseries intérieures (Page 19)
        return (
          <MenuiseriesIntStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 19: // Carrelage (Page 20)
        return (
          <CarrelageStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 20: // Parquet (Page 21)
        return (
          <ParquetStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 21: // Peinture (Page 22)
        return (
          <PeintureStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 22: // Energies renouvelables (Page 23)
        return (
          <EnergiesRenouvelablesStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 23: // Solutions environnementales (Page 24)
        return (
          <SolutionsEnvironnementalesStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 24: // Aménagements extérieurs (Page 25)
        return (
          <AmenagementExterieursStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 25: // Aménagements extérieurs details (Page 26)
        return (
          <AmenagementExterieursDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 26: // Cuisine (Page 27)
        return (
          <CuisineStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 27: // Salle de bain (Page 28)
        return (
          <SalleDeBainStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 44: // Quick Estimation (Page 44)
        return (
          <QuickEstimationStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 45: // Contact Details (Page 45)
        return (
          <ContactDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={finalizeEstimation}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 46: // Thank You Step (Page 46)
        return (
          <ThankYouStep
            formData={formData}
            animationDirection={animationDirection}
          />
        );
      default:
        // For any other step number, default back to Client Type
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
  
  // Calculate progress percentage
  const progress = Math.round((step / totalSteps) * 100);
  
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
          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
            <div 
              className="h-2 rounded-full bg-khaki-600 transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mb-6 text-right">Étape {step + 1} sur {totalSteps}</p>
          
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
                
                {/* Navigation buttons */}
                <FormNavigation 
                  step={step}
                  totalSteps={totalSteps}
                  onPreviousClick={goToPreviousStep}
                  onNextClick={goToNextStep}
                  isSubmitting={isSubmitting}
                  formData={formData}
                />
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
