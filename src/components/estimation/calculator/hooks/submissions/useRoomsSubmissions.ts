
import { FormData } from '../../types';

export const useRoomsSubmissions = (
  updateFormData: (data: Partial<FormData>) => void,
  setStep: (step: number) => void
) => {
const onSalleDeBainSubmit = (data: {
  bathroomType: string;
  bathroomBudget: string;
}) => {
  const updatedData: Partial<FormData> = {
    bathroomType: data.bathroomType,
    bathroomBudget: data.bathroomBudget
  };
  
  updateFormData(updatedData);
  setStep(27); // Contact
};

const onCuisineSubmit = (data: {
  kitchenType: string;
  kitchenBudget: string;
}) => {
  const updatedData: Partial<FormData> = {
    kitchenType: data.kitchenType,
    kitchenBudget: data.kitchenBudget
  };
  
  updateFormData(updatedData);
  setStep(26); // Salle de bain
};

  return {
    onCuisineSubmit,
    onSalleDeBainSubmit
  };
};
