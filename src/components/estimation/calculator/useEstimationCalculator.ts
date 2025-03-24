
import { useEstimationSteps } from './hooks/useEstimationSteps';
import { useEstimationForm } from './hooks/useEstimationForm';
import { useEstimationResult } from './hooks/useEstimationResult';
import { useFormSubmissions } from './hooks/useFormSubmissions';

export const useEstimationCalculator = () => {
  // Utiliser les hooks décomposés
  const { formData, updateFormData } = useEstimationForm();
  const { step, setStep, totalSteps, animationDirection, visibleSteps, goToNextStep, goToPreviousStep } = useEstimationSteps(formData);
  const { estimationResult, showResultDialog, setShowResultDialog, finalizeEstimation } = useEstimationResult(formData);
  const { 
    onClientTypeSubmit, 
    onProfessionalProjectSubmit, 
    onIndividualProjectSubmit, 
    onEstimationTypeSubmit, 
    onConstructionDetailsSubmit,
    onContactSubmit 
  } = useFormSubmissions(formData, updateFormData, setStep, goToNextStep, finalizeEstimation);

  return {
    step,
    setStep,
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
    onContactSubmit,
    updateFormData,
  };
};
