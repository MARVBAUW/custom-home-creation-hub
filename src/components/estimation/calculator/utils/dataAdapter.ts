
import { FormData } from '../types/formTypes';
import { EstimationResponseData } from '../types/estimationTypes';

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
 * Ensures that a value is converted to a number safely
 */
const ensureNumberValue = (value: any): number => {
  if (value === undefined || value === null) return 0;
  const num = Number(value);
  return isNaN(num) ? 0 : num;
};

/**
 * Adapts form data to the format needed for estimation response
 */
export const adaptToEstimationResponseData = (formData: FormData): EstimationResponseData => {
  const baseData = adaptToEstimationData(formData);
  
  // Ensure surface is a number
  const surface = ensureNumberValue(formData.surface);
  
  return {
    totalAmount: calculateTotalAmount(formData),
    constructionCosts: {
      structuralWork: calculateConstructionCosts(formData) * 0.4,
      finishingWork: calculateConstructionCosts(formData) * 0.3,
      technicalLots: calculateConstructionCosts(formData) * 0.2,
      externalWorks: calculateConstructionCosts(formData) * 0.1,
      total: calculateConstructionCosts(formData)
    },
    fees: {
      architect: calculateFeeCosts(formData) * 0.4,
      architectFees: calculateFeeCosts(formData) * 0.3,
      engineeringFees: calculateFeeCosts(formData) * 0.2,
      projectManagement: calculateFeeCosts(formData) * 0.05,
      officialFees: calculateFeeCosts(formData) * 0.01,
      inspectionFees: calculateFeeCosts(formData) * 0.01,
      technicalStudies: calculateFeeCosts(formData) * 0.01,
      permits: calculateFeeCosts(formData) * 0.01,
      insurance: calculateFeeCosts(formData) * 0.005,
      contingency: calculateFeeCosts(formData) * 0.005,
      taxes: calculateFeeCosts(formData) * 0.005,
      other: calculateFeeCosts(formData) * 0.005,
      total: calculateFeeCosts(formData)
    },
    otherCosts: {
      land: 0,
      demolition: 0,
      siteDevelopment: 0,
      insurance: calculateTotalAmount(formData) * 0.01,
      contingency: calculateTotalAmount(formData) * 0.02,
      taxes: calculateTotalAmount(formData) * 0.01,
      miscellaneous: calculateTotalAmount(formData) * 0.005,
      total: calculateTotalAmount(formData) * 0.045
    },
    projectType: formData.projectType || 'construction',
    projectDetails: {
      surface: surface,
      location: formData.location || '',
      city: formData.city || '',
      constructionType: formData.constructionType || 'traditional',
      bedrooms: ensureNumberValue(formData.bedrooms),
      bathrooms: ensureNumberValue(formData.bathrooms),
    },
    categories: generateCategories(formData),
    timeline: calculateTimeline(formData),
    estimatedCost: {
      total: calculateTotalAmount(formData),
      perSquareMeter: calculateCostPerSquareMeter(formData),
      breakdown: {
        materials: calculateTotalAmount(formData) * 0.5,
        labor: calculateTotalAmount(formData) * 0.4,
        fees: calculateTotalAmount(formData) * 0.1
      }
    },
    dateGenerated: new Date().toISOString(),
    isComplete: true
  };
};

// Helper functions to calculate different aspects of the estimation
function calculateTotalAmount(formData: FormData): number {
  const surface = ensureNumberValue(formData.surface);
  const baseCost = surface * getCostMultiplier(formData);
  return Math.round(baseCost);
}

function calculateConstructionCosts(formData: FormData): number {
  return Math.round(calculateTotalAmount(formData) * 0.85);
}

function calculateFeeCosts(formData: FormData): number {
  return Math.round(calculateTotalAmount(formData) * 0.15);
}

function calculateCostPerSquareMeter(formData: FormData): number {
  const surface = ensureNumberValue(formData.surface);
  if (surface <= 0) return 0;
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

function generateCategories(formData: FormData): {name: string; cost: number; percentage: number; category?: string; amount: number}[] {
  const totalAmount = calculateTotalAmount(formData);
  
  return [
    { name: 'Gros œuvre', cost: totalAmount * 0.35, percentage: 35, category: 'construction', amount: totalAmount * 0.35 },
    { name: 'Second œuvre', cost: totalAmount * 0.30, percentage: 30, category: 'construction', amount: totalAmount * 0.30 },
    { name: 'Lots techniques', cost: totalAmount * 0.20, percentage: 20, category: 'technical', amount: totalAmount * 0.20 },
    { name: 'Honoraires et études', cost: totalAmount * 0.15, percentage: 15, category: 'fees', amount: totalAmount * 0.15 }
  ];
}

function calculateTimeline(formData: FormData): {design: number; permits: number; construction: number; totalMonths: number; bidding?: number; total: number} {
  // Basic timeline calculation
  const designMonths = 2;
  const permitMonths = 3;
  const surface = ensureNumberValue(formData.surface);
  const constructionMonths = Math.ceil(surface / 50); // 1 month per 50 m²
  const biddingMonths = 1;
  const totalMonths = designMonths + permitMonths + constructionMonths;
  
  return {
    design: designMonths,
    permits: permitMonths,
    bidding: biddingMonths,
    construction: constructionMonths,
    total: totalMonths,
    totalMonths: totalMonths
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
