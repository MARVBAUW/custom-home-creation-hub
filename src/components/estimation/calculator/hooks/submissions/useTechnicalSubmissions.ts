
import { FormData } from '../../types';
import { ensureNumber } from '../../utils/typeConversions';
import { calculateElectricalCost, calculatePlumbingCost, calculatePlasteringCost } from '../../utils/montantUtils';

export const useTechnicalSubmissions = () => {
  // Function to handle electricite submission
  const handleElectriciteSubmit = (data: { electricalType: string }, formData: FormData) => {
    const surface = ensureNumber(formData.surface, 0);
    const additionalCost = calculateElectricalCost(data.electricalType, surface);
    
    return {
      electricalType: data.electricalType,
      montantT: (formData.montantT || 0) + additionalCost
    };
  };

  // Function to handle plomberie submission
  const handlePlomberieSubmit = (data: { plumbingType: string }, formData: FormData) => {
    const surface = ensureNumber(formData.surface, 0);
    const additionalCost = calculatePlumbingCost(data.plumbingType, surface);
    
    return {
      plumbingType: data.plumbingType,
      montantT: (formData.montantT || 0) + additionalCost
    };
  };

  // Function to handle platrerie submission
  const handlePlatrerieSubmit = (data: { plasteringType: string }, formData: FormData) => {
    const surface = ensureNumber(formData.surface, 0);
    const additionalCost = calculatePlasteringCost(data.plasteringType, surface);
    
    return {
      plasteringType: data.plasteringType,
      montantT: (formData.montantT || 0) + additionalCost
    };
  };

  return {
    handleElectriciteSubmit,
    handlePlomberieSubmit,
    handlePlatrerieSubmit,
  };
};
