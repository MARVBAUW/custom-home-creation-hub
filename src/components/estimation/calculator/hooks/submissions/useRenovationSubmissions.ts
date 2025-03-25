
import { FormData } from '../../types';

export const useRenovationSubmissions = (
  updateFormData: (data: Partial<FormData>) => void,
  goToNextStep: () => void
) => {
  // Pour la rénovation - Soumission demolition
  const onDemolitionSubmit = (data: any) => {
    updateFormData(data);
    goToNextStep();
  };

  // Soumission gros oeuvre renovation
  const onGrosOeuvreRenovSubmit = (data: any) => {
    updateFormData(data);
    goToNextStep();
  };

  // Soumission charpente renovation
  const onCharpenteRenovSubmit = (data: any) => {
    updateFormData(data);
    goToNextStep();
  };

  // Soumission couverture renovation
  const onCouvertureRenovSubmit = (data: any) => {
    updateFormData(data);
    goToNextStep();
  };

  // Soumission façade renovation
  const onFacadeRenovSubmit = (data: any) => {
    updateFormData(data);
    goToNextStep();
  };

  return {
    onDemolitionSubmit,
    onGrosOeuvreRenovSubmit,
    onCharpenteRenovSubmit,
    onCouvertureRenovSubmit,
    onFacadeRenovSubmit
  };
};
