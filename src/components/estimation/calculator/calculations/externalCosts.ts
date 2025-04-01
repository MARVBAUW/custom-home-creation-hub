
import { EstimationFormData } from '../types/estimationFormData';
import { ensureNumber } from '../utils/typeConversions';

export function calculateExternalCosts(formData: EstimationFormData): number {
  const surface = ensureNumber(formData.surface, 0);
  
  // External costs are typically around 10-15% of the construction cost
  // For simplicity, we'll use 100€/m²
  const baseRate = 100;
  
  return surface * baseRate;
}
