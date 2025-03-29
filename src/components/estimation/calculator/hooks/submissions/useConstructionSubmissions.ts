import { FormData } from '../../types';

export const useConstructionSubmissions = (
  updateFormData: (data: Partial<FormData>) => void,
  setStep: (step: number) => void
) => {
  // Soumission du formulaire de détails de construction
  const onConstructionDetailsSubmit = (data: {
    surface: string;
    city: string;
    levels: string;
    roomCount: string;
  }) => {
    updateFormData({
      surface: data.surface,
      city: data.city,
      levels: data.levels,
      roomCount: data.roomCount
    });
    setStep(6); // Type de terrain
  };

  // Soumission du formulaire de type de terrain
  const onTerrainSubmit = (data: { terrainType: string }) => {
    updateFormData({ terrainType: data.terrainType });
    setStep(7); // Structure des murs
  };

  // Soumission du formulaire de structure des murs
  const onGrosOeuvreSubmit = (data: { wallType: string }) => {
    updateFormData({ wallType: data.wallType });
    setStep(8); // Type de toiture
  };

  // Soumission du formulaire de type de charpente
  const onCharpenteSubmit = (data: { roofType: string }) => {
    updateFormData({ roofType: data.roofType });
    setStep(9); // Type de combles
  };

  // Soumission du formulaire de type de combles
  const onComblesSubmit = (data: { atticType: string }) => {
    updateFormData({ atticType: data.atticType });
    setStep(10); // Couverture toiture
  };

  return {
    onConstructionDetailsSubmit,
    onTerrainSubmit,
    onGrosOeuvreSubmit,
    onCharpenteSubmit,
    onComblesSubmit
  };
};
