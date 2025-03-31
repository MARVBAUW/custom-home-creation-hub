
import { FormData } from '../types/formTypes';
import { ensureNumber, ensureBoolean } from './typeConversions';

/**
 * Create a function that updates form data while handling type conversions
 */
export function createTypeAdaptingUpdater(
  updateFn: (data: Partial<FormData>) => void
): (data: Partial<FormData>) => void {
  return (data: Partial<FormData>) => {
    // Create a copy we can modify
    const adaptedData = { ...data };
    
    // Handle numeric fields
    if ('surface' in adaptedData) {
      adaptedData.surface = ensureNumber(adaptedData.surface);
    }
    
    if ('bedrooms' in adaptedData) {
      adaptedData.bedrooms = ensureNumber(adaptedData.bedrooms);
    }
    
    if ('bathrooms' in adaptedData) {
      adaptedData.bathrooms = ensureNumber(adaptedData.bathrooms);
    }
    
    if ('budget' in adaptedData) {
      adaptedData.budget = ensureNumber(adaptedData.budget);
    }
    
    if ('terraceArea' in adaptedData) {
      adaptedData.terraceArea = ensureNumber(adaptedData.terraceArea);
    }
    
    if ('landscapingArea' in adaptedData) {
      adaptedData.landscapingArea = ensureNumber(adaptedData.landscapingArea);
    }
    
    if ('fencingLength' in adaptedData) {
      adaptedData.fencingLength = ensureNumber(adaptedData.fencingLength);
    }
    
    if ('stonePercentage' in adaptedData) {
      adaptedData.stonePercentage = ensureNumber(adaptedData.stonePercentage);
    }
    
    if ('plasterPercentage' in adaptedData) {
      adaptedData.plasterPercentage = ensureNumber(adaptedData.plasterPercentage);
    }
    
    if ('brickPercentage' in adaptedData) {
      adaptedData.brickPercentage = ensureNumber(adaptedData.brickPercentage);
    }
    
    if ('metalCladdingPercentage' in adaptedData) {
      adaptedData.metalCladdingPercentage = ensureNumber(adaptedData.metalCladdingPercentage);
    }
    
    if ('woodCladdingPercentage' in adaptedData) {
      adaptedData.woodCladdingPercentage = ensureNumber(adaptedData.woodCladdingPercentage);
    }
    
    if ('stoneCladdingPercentage' in adaptedData) {
      adaptedData.stoneCladdingPercentage = ensureNumber(adaptedData.stoneCladdingPercentage);
    }
    
    // Handle boolean fields
    if ('hasAirConditioning' in adaptedData) {
      adaptedData.hasAirConditioning = ensureBoolean(adaptedData.hasAirConditioning);
    }
    
    if ('hasSmartHome' in adaptedData) {
      adaptedData.hasSmartHome = ensureBoolean(adaptedData.hasSmartHome);
    }
    
    if ('hasDressingRoom' in adaptedData) {
      adaptedData.hasDressingRoom = ensureBoolean(adaptedData.hasDressingRoom);
    }
    
    if ('hasCustomClosets' in adaptedData) {
      adaptedData.hasCustomClosets = ensureBoolean(adaptedData.hasCustomClosets);
    }
    
    if ('hasElevator' in adaptedData) {
      adaptedData.hasElevator = ensureBoolean(adaptedData.hasElevator);
    }
    
    if ('hasHomeAutomation' in adaptedData) {
      adaptedData.hasHomeAutomation = ensureBoolean(adaptedData.hasHomeAutomation);
    }
    
    if ('hasSecuritySystem' in adaptedData) {
      adaptedData.hasSecuritySystem = ensureBoolean(adaptedData.hasSecuritySystem);
    }
    
    if ('hasHeatRecovery' in adaptedData) {
      adaptedData.hasHeatRecovery = ensureBoolean(adaptedData.hasHeatRecovery);
    }
    
    if ('pool' in adaptedData) {
      adaptedData.pool = ensureBoolean(adaptedData.pool);
    }
    
    if ('terrace' in adaptedData) {
      adaptedData.terrace = ensureBoolean(adaptedData.terrace);
    }
    
    if ('outdoorKitchen' in adaptedData) {
      adaptedData.outdoorKitchen = ensureBoolean(adaptedData.outdoorKitchen);
    }
    
    // Pass the properly typed data to the update function
    updateFn(adaptedData);
  };
}

/**
 * Adapt form data to estimation response data
 */
export function adaptToEstimationResponseData(formData: FormData) {
  const totalEstimation = formData.budget || 250000; // Default if budget not set
  
  return {
    projectType: formData.projectType || 'construction',
    projectDetails: {
      surface: formData.surface || 0,
      bedrooms: formData.bedrooms || 0,
      bathrooms: formData.bathrooms || 0,
      city: formData.city || '',
      constructionType: formData.constructionType || 'traditional',
      clientType: formData.clientType || 'individual'
    },
    estimatedCost: totalEstimation,
    dateGenerated: new Date().toISOString(),
    isComplete: true,
    
    constructionCosts: {
      structuralWork: totalEstimation * 0.4,
      finishingWork: totalEstimation * 0.3,
      technicalLots: totalEstimation * 0.2,
      externalWorks: totalEstimation * 0.1,
      total: totalEstimation
    },
    
    fees: {
      architect: totalEstimation * 0.08,
      engineeringFees: totalEstimation * 0.03,
      projectManagement: totalEstimation * 0.05,
      permits: totalEstimation * 0.02,
      insurance: totalEstimation * 0.02,
      contingency: totalEstimation * 0.05,
      taxes: totalEstimation * 0.03,
      total: totalEstimation * 0.28
    },
    
    otherCosts: {
      insurance: totalEstimation * 0.02,
      contingency: totalEstimation * 0.05,
      taxes: totalEstimation * 0.03,
      miscellaneous: totalEstimation * 0.02,
      total: totalEstimation * 0.12
    },
    
    totalAmount: totalEstimation * 1.4,
    
    timeline: {
      planning: { duration: '2 mois', startOffset: 0 },
      permits: { duration: '3 mois', startOffset: 2 },
      foundation: { duration: '1 mois', startOffset: 5 },
      structure: { duration: '2 mois', startOffset: 6 },
      envelope: { duration: '1.5 mois', startOffset: 8 },
      interiors: { duration: '3 mois', startOffset: 9.5 },
      finishing: { duration: '1.5 mois', startOffset: 12.5 },
      total: '14 mois'
    },
    
    categories: [
      { name: 'Gros œuvre', amount: totalEstimation * 0.4 },
      { name: 'Second œuvre', amount: totalEstimation * 0.3 },
      { name: 'Lots techniques', amount: totalEstimation * 0.2 },
      { name: 'Extérieurs', amount: totalEstimation * 0.1 }
    ]
  };
}

/**
 * Adapt form data from another format (compatibility layer)
 */
export function adaptFormData(externalData: any): Partial<FormData> {
  const adaptedData: Partial<FormData> = {};
  
  // Map fields based on common naming patterns
  if (externalData.area || externalData.surface || externalData.surfaceArea) {
    adaptedData.surface = ensureNumber(externalData.area || externalData.surface || externalData.surfaceArea);
  }
  
  if (externalData.city || externalData.location) {
    adaptedData.city = externalData.city || externalData.location;
  }
  
  if (externalData.budget || externalData.cost || externalData.price) {
    adaptedData.budget = ensureNumber(externalData.budget || externalData.cost || externalData.price);
  }
  
  if (externalData.type || externalData.projectType) {
    adaptedData.projectType = externalData.type || externalData.projectType;
  }
  
  return adaptedData;
}
