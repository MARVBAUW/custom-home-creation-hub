
import { FormData, EstimationResponseData } from '../types/estimationTypes';
import { ensureNumber, ensureBoolean, ensureString } from './typeConversions';

/**
 * Adapts the form data to the estimation response data format
 * @param formData The form data to adapt
 * @returns The adapted estimation response data
 */
export const adaptToEstimationResponseData = (formData: FormData): EstimationResponseData => {
  // Create a default estimation response
  const response: EstimationResponseData = {
    projectType: formData.projectType || 'Construction',
    projectDetails: {
      projectType: formData.projectType || 'Construction',
      surface: ensureNumber(formData.surface),
      location: formData.location || formData.city || 'PACA',
      constructionType: formData.constructionType || 'Standard',
      bedrooms: ensureNumber(formData.bedrooms),
      bathrooms: ensureNumber(formData.bathrooms),
      city: formData.city || 'Non spécifiée',
    },
    estimatedCost: ensureNumber(formData.budget) || 0,
    constructionCosts: {
      structuralWork: 0,
      finishingWork: 0,
      technicalLots: 0,
      externalWorks: 0,
      total: 0
    },
    fees: {
      architectFees: 0,
      engineeringFees: 0,
      projectManagement: 0,
      officialFees: 0,
      inspectionFees: 0,
      technicalStudies: 0,
      permits: 0,
      insurance: 0,
      contingency: 0,
      taxes: 0,
      other: 0,
      total: 0
    },
    otherCosts: {
      land: 0,
      demolition: 0,
      siteDevelopment: 0,
      insurance: 0,
      contingency: 0,
      taxes: 0,
      miscellaneous: 0,
      total: 0
    },
    totalAmount: ensureNumber(formData.montantT) || 0,
    dateGenerated: new Date().toISOString(),
    isComplete: !!formData.formCompleted,
    timeline: {
      design: 2,
      permits: 3,
      bidding: 1,
      construction: 8,
      total: 14,
      totalMonths: 14
    },
    categories: []
  };

  return response;
};

/**
 * Creates a type-adapting updater function to ensure proper data types
 * @param updateFunction The original update function
 * @returns A type-adapting update function
 */
export const createTypeAdaptingUpdater = (updateFunction: (data: Partial<FormData>) => void) => {
  return (data: Partial<FormData>) => {
    const adaptedData: Partial<FormData> = {};
    
    // Convert each property to the correct type
    Object.entries(data).forEach(([key, value]) => {
      if (key.includes('surface') || key.includes('Area') || key.includes('Length') || 
          key.includes('Count') || key.includes('budget') || key.includes('montantT') ||
          key === 'bedrooms' || key === 'bathrooms') {
        adaptedData[key] = ensureNumber(value);
      } else if (key.includes('has') || key.includes('include') || key.includes('Accepted') || 
                key.includes('Needed') || key.includes('Upgrade') || 
                key === 'pool' || key === 'terrace') {
        adaptedData[key] = ensureBoolean(value);
      } else {
        adaptedData[key] = value;
      }
    });
    
    updateFunction(adaptedData);
  };
};
