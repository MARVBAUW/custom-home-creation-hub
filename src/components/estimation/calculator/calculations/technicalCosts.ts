
import { EstimationFormData } from '../types/estimationFormData';
import { ensureNumber } from '../utils/typeConversions';

export function calculateTechnicalCosts(formData: EstimationFormData): number {
  const surface = ensureNumber(formData.surface, 0);
  const constructionType = formData.constructionType || 'standard';
  
  let baseRate = 300;
  switch (constructionType.toLowerCase()) {
    case 'luxury':
      baseRate = 450;
      break;
    case 'economic':
      baseRate = 200;
      break;
    case 'passive':
      baseRate = 400;
      break;
    default:
      baseRate = 300;
  }
  
  return surface * baseRate;
}
