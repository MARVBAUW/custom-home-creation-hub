import { FormData } from '../types/formTypes';
import { EstimationResponseData } from '../types/estimationTypes';
import { ensureNumber } from './typeConversions';

/**
 * Adapts form data to the estimation response data format
 */
export function adaptToEstimationResponseData(formData: FormData): EstimationResponseData {
  const surface = ensureNumber(formData.surface);
  const budget = ensureNumber(formData.budget);
  
  // Calculate base cost (either from budget or surface * average price)
  const baseCost = budget > 0 ? budget : surface * 1500;
  
  // Calculate structural costs (30% of base cost)
  const structuralCosts = baseCost * 0.3;
  
  // Calculate finishing costs (40% of base cost)
  const finishingCosts = baseCost * 0.4;
  
  // Calculate technical costs (20% of base cost)
  const technicalCosts = baseCost * 0.2;
  
  // Calculate external costs (10% of base cost)
  const externalCosts = baseCost * 0.1;
  
  // Total construction costs
  const totalConstructionCosts = structuralCosts + finishingCosts + technicalCosts + externalCosts;
  
  // Calculate fees (15% of construction costs)
  const fees = {
    architect: totalConstructionCosts * 0.04,
    engineeringFees: totalConstructionCosts * 0.03,
    architectFees: totalConstructionCosts * 0.03,
    projectManagement: totalConstructionCosts * 0.04,
    officialFees: totalConstructionCosts * 0.01,
    inspectionFees: totalConstructionCosts * 0.01,
    technicalStudies: totalConstructionCosts * 0.02,
    permits: totalConstructionCosts * 0.01,
    insurance: totalConstructionCosts * 0.01,
    contingency: totalConstructionCosts * 0.03,
    taxes: totalConstructionCosts * 0.02,
    other: totalConstructionCosts * 0.01,
    total: totalConstructionCosts * 0.15
  };
  
  // Other costs
  const otherCosts = {
    insurance: totalConstructionCosts * 0.02,
    contingency: totalConstructionCosts * 0.05,
    taxes: totalConstructionCosts * 0.03,
    miscellaneous: totalConstructionCosts * 0.02,
    total: totalConstructionCosts * 0.12
  };
  
  // Total amount
  const totalAmount = totalConstructionCosts + fees.total + otherCosts.total;
  
  // Timeline estimation
  const timeline = {
    design: 2,
    permits: 3,
    bidding: 1,
    construction: 8,
    total: 14
  };
  
  // Categories for reporting
  const categories = [
    { category: 'Gros œuvre', amount: structuralCosts },
    { category: 'Second œuvre', amount: finishingCosts },
    { category: 'Lots techniques', amount: technicalCosts },
    { category: 'Extérieurs', amount: externalCosts }
  ];
  
  return {
    projectType: formData.projectType || 'construction',
    projectDetails: {
      surface: ensureNumber(formData.surface) || 0,
      location: formData.location || '',
      projectType: formData.projectType || 'construction',
      constructionType: formData.constructionType || 'traditional',
      bedrooms: ensureNumber(formData.bedrooms) || 0,
      bathrooms: ensureNumber(formData.bathrooms) || 0,
      city: formData.city || ''
    },
    estimatedCost: totalAmount,
    dateGenerated: new Date().toISOString(),
    isComplete: true,
    constructionCosts: {
      structuralWork: structuralCosts,
      finishingWork: finishingCosts,
      technicalLots: technicalCosts,
      externalWorks: externalCosts,
      total: totalConstructionCosts
    },
    fees,
    otherCosts,
    totalAmount,
    timeline,
    categories
  };
}

/**
 * Create an updater function that handles type conversions
 */
export function createTypeAdaptingUpdater(
  updateFn: (data: Partial<FormData>) => void
) {
  return (data: Partial<FormData>) => {
    // Convert data types as needed
    const adaptedData: Partial<FormData> = { ...data };
    
    // Ensure numeric fields are numbers
    if ('surface' in data) {
      adaptedData.surface = ensureNumber(data.surface);
    }
    
    if ('bedrooms' in data) {
      adaptedData.bedrooms = ensureNumber(data.bedrooms);
    }
    
    if ('bathrooms' in data) {
      adaptedData.bathrooms = ensureNumber(data.bathrooms);
    }
    
    if ('budget' in data) {
      adaptedData.budget = ensureNumber(data.budget);
    }
    
    // Pass the adapted data to the original updater
    updateFn(adaptedData);
  };
}

/**
 * Adapt form data for API calls
 */
export function adaptFormData(formData: FormData): Record<string, any> {
  // Convert form data to API-friendly format
  const apiData: Record<string, any> = {};
  
  // Map form fields to API fields
  Object.entries(formData).forEach(([key, value]) => {
    // Skip null/undefined values
    if (value === null || value === undefined) return;
    
    // Convert numeric strings to numbers
    if (typeof value === 'string' && !isNaN(Number(value))) {
      apiData[key] = Number(value);
    } else {
      apiData[key] = value;
    }
  });
  
  return apiData;
}
