
import { useState, useEffect } from 'react';
import { FormData } from '../types';

export const useEstimationSteps = (formData: FormData) => {
  const [step, setStep] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<'next' | 'prev' | null>(null);
  
  // Déterminer le nombre total d'étapes en fonction du type de projet
  const determineStepCount = () => {
    let baseSteps = 20; // Client type + Project details + Terrain + 15 corps d'état + Contact + Results
    
    // Ajuster en fonction du type de projet
    if (formData.projectType?.toLowerCase().includes('rénov')) {
      baseSteps = 18; // Moins d'étapes pour rénovation
    } else if (formData.projectType?.toLowerCase().includes('aménagement')) {
      baseSteps = 15; // Encore moins pour aménagement
    }
    
    return baseSteps;
  };
  
  const totalSteps = determineStepCount();
  
  // Déterminer les étapes à afficher en fonction des choix précédents
  const determineVisibleSteps = () => {
    const steps = {
      clientType: 0,
      projectDetails: 1,
      terrain: 2,
      grosOeuvre: 3,
      charpente: 4,
      couverture: 5,
      facade: 6,
      menuiseriesExt: 7,
      isolation: 8,
      electricite: 9,
      plomberie: 10,
      chauffage: 11,
      platrerie: 12,
      menuiseriesInt: 13,
      carrelage: 14,
      parquet: 15,
      peinture: 16,
      amenagementExt: 17,
      contact: 18,
      results: 19
    };
    
    // Ajuster les étapes en fonction du type de projet
    if (formData.projectType?.toLowerCase().includes('rénov')) {
      // Pour rénovation, on a moins d'étapes
      return {
        ...steps,
        // Réorganiser les indices pour rénovation
      };
    } else if (formData.projectType?.toLowerCase().includes('aménagement')) {
      // Pour aménagement, encore moins d'étapes
      return {
        ...steps,
        // Réorganiser les indices pour aménagement
      };
    }
    
    return steps;
  };
  
  const visibleSteps = determineVisibleSteps();
  
  // Fonction pour aller à l'étape suivante avec animation
  const goToNextStep = () => {
    if (step < totalSteps - 1) {
      setAnimationDirection('next');
      setTimeout(() => {
        setStep(step + 1);
      }, 300);
    }
  };
  
  // Fonction pour aller à l'étape précédente avec animation
  const goToPreviousStep = () => {
    if (step > 0) {
      setAnimationDirection('prev');
      setTimeout(() => {
        setStep(step - 1);
      }, 300);
    }
  };
  
  // Réinitialiser l'animation après chaque changement d'étape
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationDirection(null);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [step]);
  
  return {
    step,
    setStep,
    totalSteps,
    animationDirection,
    visibleSteps,
    goToNextStep,
    goToPreviousStep
  };
};
