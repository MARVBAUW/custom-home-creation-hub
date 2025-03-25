
import { useState, useEffect } from 'react';
import { FormData } from '../../types';
import { getVisibleSteps } from '../../steps';

export const useStepCalculation = (formData: FormData, currentStep: number) => {
  const [totalSteps, setTotalSteps] = useState(28); // Valeur par défaut
  
  // Obtenir les étapes visibles en fonction des données du formulaire
  const visibleSteps = getVisibleSteps(formData);
  
  // Calculer le nombre total d'étapes lorsque les données du formulaire changent
  useEffect(() => {
    // Calcul basé sur les étapes visibles et le chemin du formulaire
    let calculatedTotalSteps = visibleSteps.length;
    
    // Vérification de base pour s'assurer que toutes les étapes obligatoires sont incluses
    if (formData.clientType === "individual") {
      calculatedTotalSteps = Math.max(calculatedTotalSteps, 22); // Au moins jusqu'à l'étape de peinture pour particuliers
    } else if (formData.clientType === "professional") {
      calculatedTotalSteps = Math.max(calculatedTotalSteps, 22); // Au moins jusqu'à l'étape de peinture pour pros
    }
    
    // Ajustements spécifiques au type de projet
    if (formData.projectType === "renovation") {
      // Compter les étapes additionnelles activées
      let additionalSteps = 0;
      if (formData.includeEcoSolutions) additionalSteps++;
      if (formData.includeRenewableEnergy) additionalSteps++;
      if (formData.includeLandscaping) additionalSteps++;
      
      calculatedTotalSteps = 22 + additionalSteps; // Base + étapes supplémentaires
    } else if (formData.projectType === "construction") {
      // Compter les étapes additionnelles activées
      let additionalSteps = 0;
      if (formData.includeOptions) additionalSteps++;
      if (formData.includeCuisine) additionalSteps++;
      if (formData.includeBathroom) additionalSteps++;
      
      calculatedTotalSteps = 22 + additionalSteps; // Base + étapes supplémentaires
    }
    
    // Toujours ajouter l'étape finale (contact)
    calculatedTotalSteps = Math.min(Math.max(calculatedTotalSteps, 22) + 1, 28);
    
    setTotalSteps(calculatedTotalSteps);
    
    console.log("Calculated total steps:", calculatedTotalSteps, "Current step:", currentStep);
  }, [visibleSteps.length, formData, currentStep]);
  
  return {
    totalSteps,
    visibleSteps
  };
};
