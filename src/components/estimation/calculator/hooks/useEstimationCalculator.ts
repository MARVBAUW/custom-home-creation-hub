
import { useState, useEffect } from 'react';
import { FormData } from '../types';
import { calculateEstimation } from '../calculationUtils';
import { useStepCalculation } from './steps/useStepCalculation';

// Hook centralisé pour gérer l'estimation
export const useEstimationCalculator = () => {
  // État pour les données du formulaire
  const [formData, setFormData] = useState<FormData>({});
  
  // État pour l'étape actuelle
  const [step, setStep] = useState(0);
  
  // État pour la direction de l'animation
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');
  
  // État pour stocker le résultat de l'estimation
  const [estimationResult, setEstimationResult] = useState<number | null>(null);
  
  // État pour la boîte de dialogue des résultats
  const [showResultDialog, setShowResultDialog] = useState(false);
  
  // Calculer le nombre total d'étapes
  const { totalSteps, visibleSteps } = useStepCalculation(formData, step);
  
  // Mise à jour des données du formulaire
  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
    
    console.log("Mise à jour des données du formulaire:", data);
  };
  
  // Aller à l'étape suivante
  const goToNextStep = () => {
    if (step < totalSteps - 1) {
      setAnimationDirection('forward');
      setTimeout(() => {
        setStep(prevStep => prevStep + 1);
      }, 300);
    }
  };
  
  // Aller à l'étape précédente
  const goToPreviousStep = () => {
    if (step > 0) {
      setAnimationDirection('backward');
      setTimeout(() => {
        setStep(prevStep => prevStep - 1);
      }, 300);
    }
  };
  
  // Finaliser l'estimation
  const finalizeEstimation = () => {
    // Calculer l'estimation en fonction des données du formulaire
    const result = calculateEstimation(formData);
    
    // Définir le résultat
    setEstimationResult(result);
    
    // Afficher la boîte de dialogue des résultats
    setShowResultDialog(true);
  };
  
  return {
    step,
    setStep,
    totalSteps,
    visibleSteps,
    formData,
    updateFormData,
    estimationResult,
    showResultDialog,
    setShowResultDialog,
    animationDirection,
    goToNextStep,
    goToPreviousStep,
    finalizeEstimation
  };
};
