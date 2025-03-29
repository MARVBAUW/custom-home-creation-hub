
import { FormData } from '../../types';

export const useSpecialFeaturesSubmissions = (
  updateFormData: (data: Partial<FormData>) => void,
  setStep: (step: number) => void
) => {
const onEnergiesRenouvelablesSubmit = (data: {
  solarPanelType: string;
  windTurbineType: string;
}) => {
  const updatedData: Partial<FormData> = {
    solarPanelType: data.solarPanelType,
    windTurbineType: data.windTurbineType
  };
  
  updateFormData(updatedData);
  setStep(23); // Solutions environnementales
};

const onSolutionsEnvironSubmit = (data: {
  rainwaterHarvesting: boolean;
  greywaterRecycling: boolean;
}) => {
  const updatedData: Partial<FormData> = {
    rainwaterHarvesting: data.rainwaterHarvesting,
    greywaterRecycling: data.greywaterRecycling
  };
  
  updateFormData(updatedData);
  setStep(24); // Aménagement paysager
};

const onAmenagementPaysagerSubmit = (data: {
  landscapingType: string;
  landscapingBudget: string;
}) => {
  const updatedData: Partial<FormData> = {
    landscapingType: data.landscapingType,
    landscapingBudget: data.landscapingBudget
  };
  
  updateFormData(updatedData);
  setStep(24); // Options
};

const onOptionsSubmit = (data: {
  pool: boolean;
  outdoorKitchen: boolean;
  terrace: boolean;
}) => {
  const updatedData: Partial<FormData> = {
    pool: data.pool,
    outdoorKitchen: data.outdoorKitchen,
    terrace: data.terrace
  };
  
  updateFormData(updatedData);
  setStep(25); // Cuisine
};

return {
  onEnergiesRenouvelablesSubmit,
  onSolutionsEnvironSubmit,
  onAmenagementPaysagerSubmit,
  onOptionsSubmit
};
};
