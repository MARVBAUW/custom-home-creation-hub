
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowLeft as ArrowLeftIcon, ArrowRight as ArrowRightIcon } from 'lucide-react';
import StepRenderer from './StepRenderer';
import { StepRendererProps } from '../types/formTypes';

interface CalculatorLayoutProps {
  steps: any[];
  currentStep: number;
  formData: any;
  updateFormData: (data: any) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  isSubmitting: boolean;
  goToStep: (step: number) => void;
  onComplete: () => void;
}

const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  steps,
  currentStep: step,
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  isSubmitting,
  goToStep,
  onComplete
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* Step content */}
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full"
          >
            {/* Render the current step using StepRenderer */}
            <StepRenderer 
              step={step} 
              formData={formData} 
              updateFormData={updateFormData}
              animationDirection="forward"
              goToNextStep={goToNextStep}
              goToPreviousStep={goToPreviousStep}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between items-center p-4">
        <Button
          variant="outline"
          onClick={goToPreviousStep}
          disabled={step === 0 || isSubmitting}
          className="w-auto"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Précédent
        </Button>
        <Button
          onClick={goToNextStep}
          disabled={step === steps.length - 1 || isSubmitting}
          className="w-auto"
        >
          Suivant
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CalculatorLayout;
