
import { useState, useEffect } from 'react';
import { FormData } from '../../types';
import { getVisibleSteps } from '../../steps';

export const useStepCalculation = (formData: FormData, currentStep: number) => {
  const [totalSteps, setTotalSteps] = useState(36); // Valeur par défaut plus élevée
  
  // Obtenir les étapes visibles en fonction des données du formulaire
  const visibleSteps = getVisibleSteps(formData);
  
  // Calculer le nombre total d'étapes lorsque les données du formulaire changent
  useEffect(() => {
    // Calcul basé sur les étapes visibles et le chemin du formulaire
    let calculatedTotalSteps = visibleSteps.length;
    
    // Ajustements spécifiques au projet
    if (formData.projectType === "renovation") {
      if (!formData.includeEcoSolutions) {
        calculatedTotalSteps -= 1; // Supprimer l'étape des solutions écologiques
      }
      if (!formData.includeRenewableEnergy) {
        calculatedTotalSteps -= 1; // Supprimer l'étape des énergies renouvelables
      }
      if (!formData.includeLandscaping) {
        calculatedTotalSteps -= 1; // Supprimer l'étape d'aménagement paysager
      }
    } else if (formData.projectType === "construction") {
      if (!formData.includeOptions) {
        calculatedTotalSteps -= 1; // Supprimer l'étape des options
      }
      if (!formData.includeCuisine) {
        calculatedTotalSteps -= 1; // Supprimer l'étape cuisine
      }
      if (!formData.includeBathroom) {
        calculatedTotalSteps -= 1; // Supprimer l'étape salle de bain
      }
    }
    
    // Assurer un nombre minimum d'étapes
    calculatedTotalSteps = Math.max(calculatedTotalSteps, 14);
    
    setTotalSteps(calculatedTotalSteps);
  }, [visibleSteps.length, formData]);
  
  return {
    totalSteps,
    visibleSteps
  };
};
