
import { FormData } from '../../types';

export const useSpecialFeaturesSubmissions = (
  updateFormData: (data: Partial<FormData>) => void,
  setStep: (step: number) => void
) => {
const onEnergiesRenouvelablesSubmit = (data: {
  solarPanelType: string;
  windTurbineType: string;
}) => {
  updateFormData({
    solarPanelType: data.solarPanelType,
    windTurbineType: data.windTurbineType
  });
  setStep(23); // Solutions environnementales
};

const onSolutionsEnvironSubmit = (data: {
  rainwaterHarvesting: boolean;
  greywaterRecycling: boolean;
}) => {
  updateFormData({
    rainwaterHarvesting: data.rainwaterHarvesting,
    greywaterRecycling: data.greywaterRecycling
  });
  setStep(24); // Aménagement paysager
};

const onAmenagementPaysagerSubmit = (data: {
  landscapingType: string;
  landscapingBudget: string;
}) => {
  updateFormData({
    landscapingType: data.landscapingType,
    landscapingBudget: data.landscapingBudget
  });
  setStep(24); // Options
};

const onOptionsSubmit = (data: {
  pool: boolean;
  outdoorKitchen: boolean;
  terrace: boolean;
}) => {
  updateFormData({
    pool: data.pool,
    outdoorKitchen: data.outdoorKitchen,
    terrace: data.terrace
  });
  setStep(25); // Cuisine
};

return {
  onEnergiesRenouvelablesSubmit,
  onSolutionsEnvironSubmit,
  onAmenagementPaysagerSubmit,
  onOptionsSubmit
};
};
