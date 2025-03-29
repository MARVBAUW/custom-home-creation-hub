
import { FormData } from '../../types';
import { ensureNumber } from '../../utils/typeConversions';

export const useEnvelopeSubmissions = () => {
  // Function to handle couverture submission
  const handleCouvertureSubmit = (data: { roofingType: string }) => {
    return {
      roofingType: data.roofingType,
    };
  };

  // Function to handle isolation submission
  const handleIsolationSubmit = (data: { insulationType: string }) => {
    return {
      insulationType: data.insulationType,
    };
  };

  // Function to handle facade submission
  const handleFacadeSubmit = (data: any) => {
    return {
      facadeType: data.facadeType,
      stonePercentage: ensureNumber(data.stonePercentage),
      plasterPercentage: ensureNumber(data.plasterPercentage),
      brickPercentage: ensureNumber(data.brickPercentage),
      metalCladdingPercentage: 0,
      woodCladdingPercentage: 0,
      stoneCladdingPercentage: 0,
    };
  };

  // Function to handle menuiseries extérieures submission
  const handleMenuiseriesExtSubmit = (data: any) => {
    return {
      windowType: data.windowType,
      windowRenovationArea: ensureNumber(data.windowRenovationArea),
      windowNewArea: ensureNumber(data.windowNewArea),
    };
  };

  return {
    handleCouvertureSubmit,
    handleIsolationSubmit,
    handleFacadeSubmit,
    handleMenuiseriesExtSubmit,
  };
};
