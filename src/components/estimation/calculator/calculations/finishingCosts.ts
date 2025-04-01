
import { EstimationFormData } from '../types/estimationFormData';
import { ensureNumber } from '../utils/typeConversions';

export function calculateFinishingCosts(formData: EstimationFormData): number {
  const surface = ensureNumber(formData.surface, 0);
  const constructionType = formData.constructionType || 'standard';
  
  let baseRate = 600;
  switch (constructionType.toLowerCase()) {
    case 'luxury':
      baseRate = 900;
      break;
    case 'economic':
      baseRate = 400;
      break;
    case 'passive':
      baseRate = 700;
      break;
    default:
      baseRate = 600;
  }
  
  return surface * baseRate;
}
