import { FormData } from '../types';
import { EstimationResponseData } from '../types/estimationTypes';
import { ensureNumber, ensureBoolean } from './typeConversions';

/**
 * Creates a function that allows updating formData with automatic type conversions
 */
export function createTypeAdaptingUpdater(
  updater: (data: Partial<FormData>) => void
) {
  return (data: Partial<FormData>) => {
    // Convert numeric fields
    const adaptedData: Partial<FormData> = { ...data };
    
    // Numeric fields to convert
    const numericFields = [
      'surface', 'budget', 'bedrooms', 'bathrooms', 'doorCount',
      'montantT', 'kitchenSize', 'bathroomCount'
    ];
    
    // Boolean fields to convert
    const booleanFields = [
      'hasSmartHome', 'hasAirConditioning', 'hasDressingRoom',
      'hasCustomClosets', 'hasElevator', 'hasHomeAutomation',
      'hasSecuritySystem', 'hasHeatRecovery', 'pool', 'terrace',
      'outdoorKitchen', 'formCompleted', 'termsAccepted',
      'commercialAccepted'
    ];
    
    // Convert numeric fields if they exist in the data
    numericFields.forEach(field => {
      if (field in adaptedData) {
        adaptedData[field] = ensureNumber(adaptedData[field]);
      }
    });
    
    // Convert boolean fields if they exist in the data
    booleanFields.forEach(field => {
      if (field in adaptedData) {
        adaptedData[field] = ensureBoolean(adaptedData[field]);
      }
    });
    
    updater(adaptedData);
  };
}

/**
 * Adapt FormData to EstimationFormData format
 */
export function adaptToEstimationFormData(data: Partial<FormData>): any {
  // Convert FormData to EstimationFormData
  const adaptedData = { ...data };
  
  // Handle specific conversions here if needed
  
  return adaptedData;
}

/**
 * Adapt EstimationFormData to FormData format
 */
export function adaptToFormData(data: any): Partial<FormData> {
  // Convert EstimationFormData to FormData
  const adaptedData = { ...data };
  
  // Handle specific conversions here if needed
  
  return adaptedData;
}

/**
 * Converts FormData to EstimationResponseData
 */
export function adaptToEstimationResponseData(formData: FormData): EstimationResponseData {
  const surface = ensureNumber(formData.surface);
  const budget = ensureNumber(formData.budget);
  
  // Calculate base cost (either from budget or surface * average price)
  const baseCost = budget > 0 ? budget : surface * 1500;
  
  // Example calculations - these should be replaced with actual logic
  const structuralCosts = baseCost * 0.4;
  const finishingCosts = baseCost * 0.3;
  const technicalCosts = baseCost * 0.2;
  const externalCosts = baseCost * 0.1;
  
  // Total construction costs
  const totalConstructionCosts = structuralCosts + finishingCosts + technicalCosts + externalCosts;
  
  // Fees calculation
  const architectFees = totalConstructionCosts * 0.05;
  const engineeringFees = totalConstructionCosts * 0.03;
  const projectManagement = totalConstructionCosts * 0.04;
  const permits = totalConstructionCosts * 0.02;
  const feesInsurance = totalConstructionCosts * 0.01;
  const feesContingency = totalConstructionCosts * 0.03;
  const feesTaxes = totalConstructionCosts * 0.02;
  
  const totalFees = architectFees + engineeringFees + projectManagement + 
                   permits + feesInsurance + feesContingency + feesTaxes;
  
  // Other costs
  const insurance = totalConstructionCosts * 0.02;
  const contingency = totalConstructionCosts * 0.05;
  const taxes = totalConstructionCosts * 0.03;
  const miscellaneous = totalConstructionCosts * 0.02;
  
  const totalOtherCosts = insurance + contingency + taxes + miscellaneous;
  
  // Total amount
  const totalAmount = totalConstructionCosts + totalFees + totalOtherCosts;
  
  return {
    projectType: formData.projectType || 'construction',
    projectDetails: {
      surface: ensureNumber(formData.surface) || 0,
      location: formData.city || '',
      projectType: formData.projectType || 'construction',
      bedrooms: ensureNumber(formData.bedrooms) || 0,
      bathrooms: ensureNumber(formData.bathrooms) || 0,
      city: formData.city || '',
      constructionType: formData.constructionType || 'traditional'
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
    fees: {
      architect: architectFees,
      engineeringFees: engineeringFees,
      architectFees: architectFees * 0.8, // Example calculation
      projectManagement: projectManagement,
      officialFees: permits * 0.5, // Example calculation
      inspectionFees: permits * 0.3, // Example calculation
      technicalStudies: engineeringFees * 0.5, // Example calculation
      permits: permits,
      insurance: feesInsurance,
      contingency: feesContingency,
      taxes: feesTaxes,
      other: totalFees * 0.02, // Example calculation
      total: totalFees
    },
    otherCosts: {
      insurance,
      contingency,
      taxes,
      miscellaneous,
      total: totalOtherCosts
    },
    totalAmount,
    timeline: {
      design: 2,
      permits: 3,
      bidding: 1,
      construction: 8,
      total: 14
    },
    categories: [
      { category: 'Gros œuvre', amount: structuralCosts },
      { category: 'Second œuvre', amount: finishingCosts },
      { category: 'Lots techniques', amount: technicalCosts },
      { category: 'Extérieurs', amount: externalCosts }
    ]
  };
}

/**
 * Applies default values or type conversions to FormData
 */
export function adaptFormData(data: FormData): FormData {
  // Create a copy of the data
  const adaptedData = { ...data };
  
  // Apply default values for required fields
  if (!adaptedData.surface) adaptedData.surface = 0;
  if (!adaptedData.bedrooms) adaptedData.bedrooms = 0;
  if (!adaptedData.bathrooms) adaptedData.bathrooms = 0;
  if (!adaptedData.budget) adaptedData.budget = 0;
  
  // Convert types for certain fields
  adaptedData.surface = ensureNumber(adaptedData.surface);
  adaptedData.bedrooms = ensureNumber(adaptedData.bedrooms);
  adaptedData.bathrooms = ensureNumber(adaptedData.bathrooms);
  adaptedData.budget = ensureNumber(adaptedData.budget);
  
  return adaptedData;
}
