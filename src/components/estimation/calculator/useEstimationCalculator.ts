
import { useState, useEffect } from 'react';
import { FormData, EstimationResponseData } from './types';
import { determineNextStep, determinePreviousStep, recalculateEstimation } from './utils/navigationPathUtils';
import { calculateEstimation } from './calculations/estimationCalculator';
import { useToast } from '@/hooks/use-toast';

export const useEstimationCalculator = () => {
  const [step, setStep] = useState<number>(0);
  const [totalSteps, setTotalSteps] = useState<number>(8); // Set fixed number of steps
  const [formData, setFormData] = useState<FormData>({});
  const [estimationResult, setEstimationResult] = useState<EstimationResponseData | null>(null);
  const [showResultDialog, setShowResultDialog] = useState<boolean>(false);
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();
  
  // Function to update form data
  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prevData => {
      const newData = {
        ...prevData,
        ...data
      };
      console.log("Form data updated:", data);
      return newData;
    });
  };
  
  // Calculate the estimation result
  const calculateEstimationResult = () => {
    try {
      setIsSubmitting(true);
      
      // Calculate the estimation based on the form data
      const result = calculateEstimation(formData);
      
      // Update the estimation result
      setEstimationResult(result);
      
      // Show the result dialog
      setShowResultDialog(true);
      
      toast({
        title: "Estimation calculée",
        description: `Total estimé : ${result.totalAmount.toLocaleString()} €`,
      });
      
      return result;
    } catch (error) {
      console.error("Error calculating estimation:", error);
      
      toast({
        title: "Erreur de calcul",
        description: "Une erreur est survenue lors du calcul de l'estimation.",
        variant: "destructive",
      });
      
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Finalize the estimation process
  const finalizeEstimation = () => {
    // Only calculate if no result exists yet
    if (!estimationResult) {
      return calculateEstimationResult();
    }
    return estimationResult;
  };
  
  // Function to go to the next step
  const goToNextStep = () => {
    const nextStep = determineNextStep(step, formData);
    setAnimationDirection('forward');
    
    // If we're already at the next step, don't animate
    if (nextStep === step) {
      return;
    }
    
    // Delay to allow animation
    setTimeout(() => {
      setStep(nextStep);
    }, 200);
  };
  
  // Function to go to the previous step
  const goToPreviousStep = () => {
    const prevStep = determinePreviousStep(step, formData);
    setAnimationDirection('backward');
    
    // If we're already at the previous step, don't animate
    if (prevStep === step) {
      return;
    }
    
    // Delay to allow animation
    setTimeout(() => {
      setStep(prevStep);
    }, 200);
  };
  
  // Log current step changes for debugging
  useEffect(() => {
    console.log(`Current step: ${step}, Client Type: ${formData.clientType}, Project Type: ${formData.projectType}`);
  }, [step, formData.clientType, formData.projectType]);
  
  return {
    step,
    setStep,
    totalSteps,
    formData,
    estimationResult,
    showResultDialog,
    animationDirection,
    isSubmitting,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    calculateEstimationResult,
    finalizeEstimation
  };
};
