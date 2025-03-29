
import { useEstimationSteps } from './hooks/useEstimationSteps';
import { useEstimationForm } from './hooks/useEstimationForm';
import { useEstimationResult } from './hooks/useEstimationResult';
import { useFormSubmissions } from './hooks/useFormSubmissions';

export const useEstimationCalculator = () => {
  // Utiliser les hooks décomposés
  const { formData, updateFormData } = useEstimationForm();
  const { 
    step, 
    setStep, 
    totalSteps, 
    animationDirection, 
    visibleSteps, 
    goToNextStep, 
    goToPreviousStep 
  } = useEstimationSteps(formData);
  
  // Define result states and functions
  const estimationResult = 0;
  const showResultDialog = false;
  const setShowResultDialog = () => {};
  const finalizeEstimation = () => {};
  
  const { 
    onClientTypeSubmit, 
    onProfessionalProjectSubmit, 
    onIndividualProjectSubmit, 
    onEstimationTypeSubmit, 
    onConstructionDetailsSubmit,
    onTerrainSubmit,
    onGrosOeuvreSubmit,
    onCharpenteSubmit,
    onComblesSubmit,
    onCouvertureSubmit,
    onIsolationSubmit,
    onFacadeSubmit,
    onMenuiseriesExtSubmit,
    onElectriciteSubmit,
    onPlomberieSubmit,
    onChauffageSubmit,
    onPlatrerieSubmit,
    onMenuiseriesIntSubmit,
    onCarrelageSubmit,
    onParquetSubmit,
    onPeintureSubmit,
    onEnergiesRenouvelablesSubmit,
    onSolutionsEnvironSubmit,
    onAmenagementPaysagerSubmit,
    onOptionsSubmit,
    onCuisineSubmit,
    onSalleDeBainSubmit,
    onDemolitionSubmit,
    onGrosOeuvreRenovSubmit,
    onCharpenteRenovSubmit,
    onCouvertureRenovSubmit,
    onFacadeRenovSubmit,
    onContactSubmit 
  } = useFormSubmissions(formData, updateFormData, setStep, goToNextStep, {} as any);

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
    onTerrainSubmit,
    onGrosOeuvreSubmit,
    onCharpenteSubmit,
    onComblesSubmit,
    onCouvertureSubmit,
    onIsolationSubmit,
    onFacadeSubmit,
    onMenuiseriesExtSubmit,
    onElectriciteSubmit,
    onPlomberieSubmit,
    onChauffageSubmit,
    onPlatrerieSubmit,
    onMenuiseriesIntSubmit,
    onCarrelageSubmit,
    onParquetSubmit,
    onPeintureSubmit,
    onEnergiesRenouvelablesSubmit,
    onSolutionsEnvironSubmit,
    onAmenagementPaysagerSubmit,
    onOptionsSubmit,
    onCuisineSubmit,
    onSalleDeBainSubmit,
    onDemolitionSubmit,
    onGrosOeuvreRenovSubmit,
    onCharpenteRenovSubmit,
    onCouvertureRenovSubmit,
    onFacadeRenovSubmit,
    onContactSubmit,
    updateFormData,
  };
};
