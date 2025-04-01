
import { EstimationFormData } from '../types/estimationFormData';
import { ensureNumber } from '../utils/typeConversions';

export function calculateStructuralCosts(formData: EstimationFormData): number {
  const surface = ensureNumber(formData.surface, 0);
  const constructionType = formData.constructionType || 'standard';
  
  let baseRate = 800;
  switch (constructionType.toLowerCase()) {
    case 'luxury':
      baseRate = 1200;
      break;
    case 'economic':
      baseRate = 600;
      break;
    case 'passive':
      baseRate = 1000;
      break;
    default:
      baseRate = 800;
  }
  
  return surface * baseRate;
}
