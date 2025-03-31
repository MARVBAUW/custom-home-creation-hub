
import { FormData } from '../../types';
import { ensureNumber } from '../../utils/typeConversions';
import { 
  calculateElectricityCost, 
  calculatePlumbingCost, 
  calculatePlasteringCost, 
  calculateInteriorCarpenteryCost 
} from '../../utils/montantUtils';

export const useTechnicalSubmissions = () => {
  // Function to handle electricite submission
  const handleElectriciteSubmit = (data: { electricalType: string }, formData: FormData) => {
    const surface = ensureNumber(formData.surface, 0);
    const additionalCost = calculateElectricityCost(surface, data.electricalType);
    
    return {
      electricalType: data.electricalType,
      montantT: (formData.montantT || 0) + additionalCost
    };
  };

  // Function to handle plomberie submission
  const handlePlomberieSubmit = (data: { plumbingType: string }, formData: FormData) => {
    const surface = ensureNumber(formData.surface, 0);
    const additionalCost = calculatePlumbingCost(surface, data.plumbingType);
    
    return {
      plumbingType: data.plumbingType,
      montantT: (formData.montantT || 0) + additionalCost
    };
  };

  // Function to handle platrerie submission
  const handlePlatrerieSubmit = (data: { plasteringType: string }, formData: FormData) => {
    const surface = ensureNumber(formData.surface, 0);
    const additionalCost = calculatePlasteringCost(surface, data.plasteringType);
    
    return {
      plasteringType: data.plasteringType,
      montantT: (formData.montantT || 0) + additionalCost
    };
  };

  // Function to handle menuiseries intérieures submission
  const handleMenuiseriesIntSubmit = (data: { 
    doorType: string, 
    hasMoldings: boolean,
    hasCustomFurniture: boolean 
  }, formData: FormData) => {
    const doorCount = ensureNumber(formData.doorCount, 0);
    const additionalCost = calculateInteriorCarpenteryCost(doorCount, data.doorType);
    
    return {
      doorType: data.doorType,
      hasMoldings: data.hasMoldings,
      hasCustomFurniture: data.hasCustomFurniture,
      montantT: (formData.montantT || 0) + additionalCost
    };
  };

  return {
    handleElectriciteSubmit,
    handlePlomberieSubmit,
    handlePlatrerieSubmit,
    handleMenuiseriesIntSubmit,
  };
};
