import { FormData } from '../types/formTypes';
import { EstimationFormData } from '../types/estimationFormData';
import { EstimationResponseData } from '../types/estimationTypes';
import { ensureNumber, ensureString } from './typeConversions';

/**
 * Adapts standard form data to estimation form data format
 */
export const adaptToEstimationFormData = (formData: FormData): EstimationFormData => {
  return {
    projectType: formData.projectType || '',
    surface: ensureNumber(formData.surface),
    location: formData.location || '',
    constructionType: formData.constructionType || 'standard',
    bedrooms: ensureNumber(formData.bedrooms),
    bathrooms: ensureNumber(formData.bathrooms),
    budget: ensureNumber(formData.budget),
    city: formData.city || '',
    clientType: formData.clientType || 'individual',
    ...formData // Include other properties that might be needed
  };
};

/**
 * Adapts estimation form data to standard form data format
 */
export const adaptToFormData = (estimationData: EstimationFormData): FormData => {
  return {
    projectType: estimationData.projectType || '',
    surface: ensureNumber(estimationData.surface),
    city: estimationData.city || '',
    location: estimationData.location || '',
    bedrooms: ensureNumber(estimationData.bedrooms),
    bathrooms: ensureNumber(estimationData.bathrooms),
    budget: ensureNumber(estimationData.budget),
    constructionType: estimationData.constructionType || 'standard',
    clientType: estimationData.clientType || 'individual',
    ...estimationData // Include other properties
  };
};

/**
 * Creates a function that adapts updates for form data
 */
export const createTypeAdaptingUpdater = (
  updateFunction: (data: Partial<FormData>) => void
) => {
  return (updates: Partial<FormData>) => {
    // Convert any numeric string values to numbers
    const processedUpdates: Partial<FormData> = {};
    
    Object.entries(updates).forEach(([key, value]) => {
      if (typeof value === 'string' && !isNaN(Number(value)) && value.trim() !== '') {
        // Convert numeric strings to numbers
        processedUpdates[key] = Number(value);
      } else {
        // Keep other values as is
        processedUpdates[key] = value;
      }
    });
    
    // Apply the updates
    updateFunction(processedUpdates);
  };
};

/**
 * Adapts calculation result to estimation response format
 */
export const adaptToEstimationResponseData = (
  formData: FormData
): EstimationResponseData => {
  // Extract necessary values
  const surface = ensureNumber(formData.surface, 0);
  const projectType = formData.projectType || 'construction';
  const constructionType = formData.constructionType || 'traditional';
  
  // Base cost per square meter based on project type
  let baseCostPerSqm = 1200;
  if (projectType === 'renovation') {
    baseCostPerSqm = 800;
  } else if (projectType === 'extension') {
    baseCostPerSqm = 1000;
  }
  
  // Calculate main construction costs
  const totalConstructionCost = surface * baseCostPerSqm;
  const structuralWork = totalConstructionCost * 0.4;
  const finishingWork = totalConstructionCost * 0.3;
  const technicalLots = totalConstructionCost * 0.2;
  const externalWorks = totalConstructionCost * 0.1;
  
  // Calculate fees
  const fees = {
    architect: totalConstructionCost * 0.07,
    engineeringFees: totalConstructionCost * 0.03,
    architectFees: totalConstructionCost * 0.06,
    projectManagement: totalConstructionCost * 0.04,
    officialFees: totalConstructionCost * 0.01,
    inspectionFees: totalConstructionCost * 0.01,
    technicalStudies: totalConstructionCost * 0.02,
    permits: totalConstructionCost * 0.02,
    insurance: totalConstructionCost * 0.02,
    contingency: totalConstructionCost * 0.05,
    taxes: totalConstructionCost * 0.02,
    other: totalConstructionCost * 0.01,
    total: totalConstructionCost * 0.30 // Approximation of total fees
  };
  
  // Calculate other costs
  const land = 0; // Not included in basic calculation
  const demolition = 0; // Not included in basic calculation
  const siteDevelopment = 0; // Not included in basic calculation
  const insurance = totalConstructionCost * 0.02;
  const contingency = totalConstructionCost * 0.05;
  const taxes = totalConstructionCost * 0.03;
  const miscellaneous = totalConstructionCost * 0.02;
  const totalOtherCosts = insurance + contingency + taxes + miscellaneous;
  
  // Total project cost
  const totalAmount = totalConstructionCost + fees.total + totalOtherCosts;
  
  return {
    projectType,
    projectDetails: {
      projectType,
      surface,
      location: formData.location || '',
      constructionType,
      bedrooms: ensureNumber(formData.bedrooms),
      bathrooms: ensureNumber(formData.bathrooms)
    },
    estimatedCost: totalAmount,
    constructionCosts: {
      structuralWork,
      finishingWork,
      technicalLots,
      externalWorks,
      total: totalConstructionCost
    },
    fees,
    otherCosts: {
      land,
      demolition,
      siteDevelopment,
      insurance,
      contingency,
      taxes,
      miscellaneous,
      total: totalOtherCosts
    },
    totalAmount,
    dateGenerated: new Date().toISOString(),
    isComplete: true,
    timeline: {
      design: 2,
      permits: 3,
      construction: projectType === 'renovation' ? 6 : (projectType === 'extension' ? 5 : 10),
      totalMonths: projectType === 'renovation' ? 12 : (projectType === 'extension' ? 11 : 16)
    },
    categories: [
      { name: 'Gros œuvre', cost: structuralWork, percentage: Math.round((structuralWork / totalAmount) * 100) },
      { name: 'Second œuvre', cost: finishingWork, percentage: Math.round((finishingWork / totalAmount) * 100) },
      { name: 'Lots techniques', cost: technicalLots, percentage: Math.round((technicalLots / totalAmount) * 100) },
      { name: 'Aménagements extérieurs', cost: externalWorks, percentage: Math.round((externalWorks / totalAmount) * 100) }
    ]
  };
};
