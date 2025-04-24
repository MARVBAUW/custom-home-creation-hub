
import { FormData } from '../types/formTypes';

/**
 * Adapts form data to the format expected by the estimation API
 */
export const adaptToEstimationData = (formData: FormData) => {
  return {
    clientType: formData.clientType || 'particular',
    projectType: formData.projectType || 'construction',
    surface: formData.surface || 0,
    location: formData.location || '',
    constructionType: formData.constructionType || 'traditional',
    quality: formData.quality || 'standard',
    // Add other necessary fields based on your form data structure
  };
};

/**
 * Adapts form data to the format needed for estimation response
 */
export const adaptToEstimationResponseData = (formData: FormData) => {
  const baseData = adaptToEstimationData(formData);
  
  return {
    totalAmount: calculateTotalAmount(formData),
    constructionCosts: {
      total: calculateConstructionCosts(formData)
    },
    fees: {
      total: calculateFeeCosts(formData)
    },
    projectType: formData.projectType || 'construction',
    projectDetails: {
      surface: formData.surface || 0,
      location: formData.location || '',
      city: formData.city || '',
      constructionType: formData.constructionType || 'traditional'
    },
    categories: generateCategories(formData),
    timeline: calculateTimeline(formData),
    estimatedCost: {
      perSquareMeter: calculateCostPerSquareMeter(formData)
    }
  };
};

// Helper functions to calculate different aspects of the estimation
function calculateTotalAmount(formData: FormData): number {
  const baseCost = (formData.surface || 0) * getCostMultiplier(formData);
  return Math.round(baseCost);
}

function calculateConstructionCosts(formData: FormData): number {
  return Math.round(calculateTotalAmount(formData) * 0.85);
}

function calculateFeeCosts(formData: FormData): number {
  return Math.round(calculateTotalAmount(formData) * 0.15);
}

function calculateCostPerSquareMeter(formData: FormData): number {
  const surface = formData.surface || 1; // Prevent division by zero
  return Math.round(calculateTotalAmount(formData) / surface);
}

function getCostMultiplier(formData: FormData): number {
  // Base multiplier
  let multiplier = 1500;
  
  // Adjust based on project type
  if (formData.projectType === 'renovation') {
    multiplier = 1200;
  } else if (formData.projectType === 'extension') {
    multiplier = 1800;
  }
  
  // Adjust based on construction type
  if (formData.constructionType === 'premium') {
    multiplier *= 1.3;
  } else if (formData.constructionType === 'ecological') {
    multiplier *= 1.2;
  }
  
  return multiplier;
}

function generateCategories(formData: FormData): {name: string; cost: number; percentage: number}[] {
  const totalAmount = calculateTotalAmount(formData);
  
  return [
    { name: 'Gros œuvre', cost: totalAmount * 0.35, percentage: 35 },
    { name: 'Second œuvre', cost: totalAmount * 0.30, percentage: 30 },
    { name: 'Lots techniques', cost: totalAmount * 0.20, percentage: 20 },
    { name: 'Honoraires et études', cost: totalAmount * 0.15, percentage: 15 }
  ];
}

function calculateTimeline(formData: FormData): {design: number; permits: number; construction: number; totalMonths: number} {
  // Basic timeline calculation
  const designMonths = 2;
  const permitMonths = 3;
  const constructionMonths = Math.ceil((formData.surface || 0) / 50); // 1 month per 50 m²
  
  return {
    design: designMonths,
    permits: permitMonths,
    construction: constructionMonths,
    totalMonths: designMonths + permitMonths + constructionMonths
  };
}

/**
 * Creates a function that updates form data while handling type conversions
 * This is useful for ensuring consistent data types across the application
 */
export const createTypeAdaptingUpdater = (updateFunction: (data: any) => void) => {
  return (data: any) => {
    // Process the data before passing it to the update function
    // This could include type conversions, validation, etc.
    const processedData = { ...data };
    
    // Call the original update function with the processed data
    updateFunction(processedData);
  };
};
