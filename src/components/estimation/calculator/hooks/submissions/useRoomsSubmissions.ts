import { FormData } from '../../types';

export const useRoomsSubmissions = (
  updateFormData: (data: Partial<FormData>) => void,
  setStep: (step: number) => void
) => {
const onSalleDeBainSubmit = (data: {
  bathroomType: string;
  bathroomBudget: string;
}) => {
  updateFormData({
    bathroomType: data.bathroomType,
    bathroomBudget: data.bathroomBudget
  });
  setStep(27); // Contact
};

const onCuisineSubmit = (data: {
  kitchenType: string;
  kitchenBudget: string;
}) => {
  updateFormData({
    kitchenType: data.kitchenType,
    kitchenBudget: data.kitchenBudget
  });
  setStep(26); // Salle de bain
};

  return {
    onCuisineSubmit,
    onSalleDeBainSubmit
  };
};
