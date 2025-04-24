import React, { useState } from 'react';
import { useEstimationCalculator } from './useEstimationCalculator';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ClientTypeStep from './steps/ClientTypeStep';
import ProjectDetailsForm from './FormSteps/ProjectDetailsForm';
import RoomsDetailsForm from './FormSteps/RoomsDetailsForm';
import EstimationTypeForm from './FormSteps/EstimationTypeForm';
import IndividualProjectForm from './FormSteps/IndividualProjectForm';
import StepIndicator from './components/StepIndicator';
import { determineNextStep, determinePreviousStep } from './utils/navigationPathUtils';
import { getVisibleSteps } from './steps/stepUtils';

const StructuredEstimator: React.FC = () => {
  const {
    step,
    setStep,
    totalSteps,
    formData,
    animationDirection,
    updateFormData,
  } = useEstimationCalculator();

  // Calculate visible steps based on current form data
  const visibleSteps = getVisibleSteps(formData);

  // Navigation functions with conditional logic
  const goToNextStep = () => {
    const nextStep = determineNextStep(step, formData);
    setStep(nextStep);
  };

  const goToPreviousStep = () => {
    const prevStep = determinePreviousStep(step, formData);
    setStep(prevStep);
  };

  // Animation variants
  const variants = {
    enter: (direction: string) => ({
      x: direction === 'forward' ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: string) => ({
      x: direction === 'forward' ? -100 : 100,
      opacity: 0
    })
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <ClientTypeStep 
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 1:
        // Professional project details
        return (
          <ProjectDetailsForm 
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 2:
        // Individual project type selection
        return (
          <IndividualProjectForm 
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 3:
        // Estimation type form (shown for both professional and individual)
        return (
          <EstimationTypeForm 
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 4:
        // Rooms details form
        return (
          <RoomsDetailsForm 
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      default:
        // For steps we haven't explicitly handled yet, show a placeholder
        return (
          <div className="p-4">
            <h3 className="text-lg font-medium mb-4">Étape {step + 1}</h3>
            <p>Cette étape est en cours d'implémentation.</p>
            <p className="text-sm text-gray-500 mt-2">Type de client: {formData.clientType}</p>
            <p className="text-sm text-gray-500">Type de projet: {formData.projectType}</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <StepIndicator 
        currentStep={step} 
        totalSteps={visibleSteps.length || totalSteps} 
      />
      
      <Card className="mt-6">
        <AnimatePresence mode="wait" initial={false} custom={animationDirection}>
          <motion.div
            key={step}
            custom={animationDirection}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.3 }}
            className="p-6"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Only show navigation buttons if they're not handled by the form component itself */}
        {step > 4 && (
          <div className="flex justify-between p-6 pt-0">
            <Button
              variant="outline"
              onClick={goToPreviousStep}
              disabled={step === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Précédent
            </Button>

            <Button
              onClick={goToNextStep}
              disabled={step === totalSteps - 1}
            >
              Suivant
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default StructuredEstimator;
