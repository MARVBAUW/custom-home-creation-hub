
import { FormData } from '../../types';

export const useSpecialFeaturesSubmissions = (
  formData: FormData,
  updateFormData: (data: Partial<FormData>) => void,
  setStep: (step: number) => void
) => {
  // Soumission du formulaire d'énergies renouvelables
  const onEnergiesRenouvelablesSubmit = (data: {
    energyType: string;
  }) => {
    updateFormData({
      energyType: data.energyType,
    });
    
    // Déterminer l'étape suivante en fonction du projet
    // Si cuisine équipée est sélectionnée
    if (formData.includeCuisine) {
      setStep(27); // Aller à l'étape cuisine
    } 
    // Si salle de bain est sélectionnée
    else if (formData.includeBathroom) {
      setStep(28); // Aller à l'étape salle de bain
    }
    // Sinon, on finalise
    else {
      setStep(36); // Aller à la dernière étape (contact)
    }
  };

  // Soumission du formulaire de solutions environnementales
  const onSolutionsEnvironSubmit = (data: {
    solutionType: string;
  }) => {
    updateFormData({
      solutionType: data.solutionType,
    });
    
    // Logique similaire pour déterminer l'étape suivante
    if (formData.includeCuisine) {
      setStep(27);
    } else if (formData.includeBathroom) {
      setStep(28);
    } else {
      setStep(36);
    }
  };

  // Soumission du formulaire d'aménagements paysagers
  const onAmenagementPaysagerSubmit = (data: {
    landscapeLevel: string;
    fencingLength: string;
    gateLength: string;
    terraceArea: string;
    landscapeArea: string;
  }) => {
    updateFormData({
      landscapeLevel: data.landscapeLevel,
      fencingLength: data.fencingLength,
      gateLength: data.gateLength,
      terraceArea: data.terraceArea,
      landscapeArea: data.landscapeArea,
    });
    
    // Déterminer l'étape suivante
    if (formData.includeOptions) {
      setStep(26); // Aller à l'étape options (piscine, jacuzzi, carport)
    } else if (formData.includeCuisine) {
      setStep(27);
    } else if (formData.includeBathroom) {
      setStep(28);
    } else {
      setStep(36);
    }
  };

  // Soumission du formulaire d'options
  const onOptionsSubmit = (data: {
    carport: string;
    pool: string;
    poolArea: string;
    poolHeating: string;
    jacuzzi: string;
    jacuzziArea: string;
  }) => {
    updateFormData({
      carport: data.carport,
      pool: data.pool,
      poolArea: data.poolArea,
      poolHeating: data.poolHeating,
      jacuzzi: data.jacuzzi,
      jacuzziArea: data.jacuzziArea,
    });
    
    // Déterminer l'étape suivante
    if (formData.includeCuisine) {
      setStep(27);
    } else if (formData.includeBathroom) {
      setStep(28);
    } else {
      setStep(36);
    }
  };

  return {
    onEnergiesRenouvelablesSubmit,
    onSolutionsEnvironSubmit,
    onAmenagementPaysagerSubmit,
    onOptionsSubmit
  };
};
