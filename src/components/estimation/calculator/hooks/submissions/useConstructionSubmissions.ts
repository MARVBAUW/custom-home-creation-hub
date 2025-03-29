
import { FormData } from '../../types';

export const useConstructionSubmissions = (
  updateFormData: (data: Partial<FormData>) => void,
  goToNextStep: () => void
) => {
  // Soumission du formulaire de détails de construction
  const onConstructionDetailsSubmit = (data: {
    surface: string;
    levels: string;
    units: string;
  }) => {
    updateFormData({
      surface: Number(data.surface),
      levels: Number(data.levels),
      units: Number(data.units),
    });
    goToNextStep(); // Passer à l'étape terrain (6)
  };

  // Soumission du formulaire de terrain
  const onTerrainSubmit = (data: {
    terrainType: string;
  }) => {
    updateFormData({
      terrainType: data.terrainType,
    });
    goToNextStep(); // Passer à l'étape gros oeuvre (7)
  };

  // Soumission du formulaire de gros oeuvre
  const onGrosOeuvreSubmit = (data: {
    wallType: string;
  }) => {
    updateFormData({
      wallType: data.wallType,
    });
    goToNextStep(); // Passer à l'étape charpente (8)
  };

  // Soumission du formulaire de charpente
  const onCharpenteSubmit = (data: {
    roofType: string;
  }) => {
    updateFormData({
      roofType: data.roofType,
    });
    goToNextStep(); // Passer à l'étape combles (9)
  };

  // Soumission du formulaire de combles
  const onComblesSubmit = (data: {
    atticType: string;
  }) => {
    updateFormData({
      atticType: data.atticType,
    });
    goToNextStep(); // Passer à l'étape couverture (10)
  };

  return {
    onConstructionDetailsSubmit,
    onTerrainSubmit,
    onGrosOeuvreSubmit,
    onCharpenteSubmit,
    onComblesSubmit
  };
};
