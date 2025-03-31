
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEstimationCalculator } from './useEstimationCalculator';
import { EstimationFormData } from './types/estimationFormData';
import EstimationResult from './EstimationResult';
import EstimationForm from './EstimationForm';

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
  React.useEffect(() => {
    if (estimationResult) {
      setActiveTab('results');
    }
  }, [estimationResult]);
  
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
              <EstimationForm 
                formData={formData}
                updateFormData={updateFormData}
                goToNextStep={goToNextStep}
                goToPreviousStep={goToPreviousStep}
                animationDirection={animationDirection}
              />
            </motion.div>
          </AnimatePresence>
        </TabsContent>
        
        <TabsContent value="results" className="py-4">
          {estimationResult && (
            <EstimationResult 
              formData={formData}
              estimationResult={estimationResult}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EstimationWizard;
