import { FormData } from '../types';

/**
 * Calculate a simple estimation based on the provided form data
 * @param data The form data
 * @returns The estimated amount
 */
export const calculateSimpleEstimation = (data: FormData): number => {
  let total = 50000; // Base amount

  // Project type
  if (data.projectType === 'renovation') {
    total += 20000;
  } else if (data.projectType === 'extension') {
    total += 30000;
  }

  // Surface area
  if (typeof data.surface === 'number') {
    total += data.surface * 500;
  } else if (typeof data.surface === 'string') {
    const surface = parseFloat(data.surface);
    if (!isNaN(surface)) {
      total += surface * 500;
    }
  }

  // Complexity
  if (data.complexity === 'complex') {
    total *= 1.3;
  } else if (data.complexity === 'moderate') {
    total *= 1.15;
  }

  // Quality standard
  if (data.qualityStandard === 'high') {
    total *= 1.2;
  } else if (data.qualityStandard === 'premium') {
    total *= 1.35;
  }

  // Number of bedrooms and bathrooms
  if (typeof data.bedrooms === 'number') {
    total += data.bedrooms * 10000;
  } else if (typeof data.bedrooms === 'string') {
    const bedrooms = parseInt(data.bedrooms, 10);
    if (!isNaN(bedrooms)) {
      total += bedrooms * 10000;
    }
  }

  if (typeof data.bathrooms === 'number') {
    total += data.bathrooms * 15000;
  } else if (typeof data.bathrooms === 'string') {
    const bathrooms = parseInt(data.bathrooms, 10);
    if (!isNaN(bathrooms)) {
      total += bathrooms * 15000;
    }
  }

  // Check if land is included (convert string 'true'/'false' to boolean if needed)
  const landIncludedValue = 
    typeof data.landIncluded === 'string' 
      ? data.landIncluded.toLowerCase() === 'true'
      : !!data.landIncluded;
  
  // If land is included and there's a land price, add it to the total
  if (landIncludedValue && data.landPrice) {
    const landPrice = typeof data.landPrice === 'string' 
      ? parseFloat(data.landPrice) 
      : data.landPrice;
    
    if (!isNaN(landPrice)) {
      total += landPrice;
    }
  }
  
  return total;
};
