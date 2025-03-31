
import { FormData } from '../../types';
import { ensureNumber } from '../../utils/typeConversions';
import { calculateElectricalCost, calculatePlumbingCost } from '../../utils/montantUtils';

export const useTechnicalSubmissions = () => {
  // Function to handle electricite submission
  const handleElectriciteSubmit = (data: { electricalType: string }) => {
    return {
      electricalType: data.electricalType,
    };
  };

  // Function to handle plomberie submission
  const handlePlomberieSubmit = (data: { plumbingType: string }) => {
    return {
      plumbingType: data.plumbingType,
    };
  };

  return {
    handleElectriciteSubmit,
    handlePlomberieSubmit,
  };
};
