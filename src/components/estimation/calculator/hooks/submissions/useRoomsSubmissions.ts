
import { FormData } from '../../types';

export const useRoomsSubmissions = (
  updateFormData: (data: Partial<FormData>) => void,
  setStep: (step: number) => void
) => {
  // Soumission du formulaire de cuisine
  const onCuisineSubmit = (data: {
    kitchenType: string;
  }) => {
    updateFormData({
      kitchenType: data.kitchenType,
    });
    
    // Déterminer l'étape suivante
    setStep(data.kitchenType !== "none" ? 28 : 36);
  };

  // Soumission du formulaire de salle de bain
  const onSalleDeBainSubmit = (data: {
    bathroomType: string;
    bathroomCount: string;
  }) => {
    updateFormData({
      bathroomType: data.bathroomType,
      bathroomCount: data.bathroomCount,
    });
    setStep(36); // Aller à la dernière étape (contact)
  };

  return {
    onCuisineSubmit,
    onSalleDeBainSubmit
  };
};
