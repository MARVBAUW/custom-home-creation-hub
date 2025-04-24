
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
import StepIndicator from './components/StepIndicator';

const StructuredEstimator: React.FC = () => {
  const {
    step,
    totalSteps,
    formData,
    animationDirection,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
  } = useEstimationCalculator();

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
            animationDirection={animationDirection}
          />
        );
      case 1:
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
        return (
          <RoomsDetailsForm 
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 3:
        return (
          <EstimationTypeForm 
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <StepIndicator 
        currentStep={step} 
        totalSteps={totalSteps} 
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
      </Card>
    </div>
  );
};

export default StructuredEstimator;
