
import { EstimationFormData, EstimationResponseData } from '../types/estimationFormData';
import { FormData } from '../types/formTypes';
import { ensureNumber } from './typeConversions';

/**
 * Adapts form data to estimation response data format
 */
export function adaptToEstimationResponseData(formData: EstimationFormData): EstimationResponseData {
  // Extract basic project data
  const surface = ensureNumber(formData.surface);
  const bedrooms = ensureNumber(formData.bedrooms);
  const bathrooms = ensureNumber(formData.bathrooms);
  const constructionType = formData.constructionType || 'standard';
  const location = formData.location || 'urban';
  
  // Calculate base construction costs based on surface area
  const structuralWorkCost = surface * 800;
  const finishingWorkCost = surface * 600;
  const technicalLotsCost = surface * 350;
  const externalWorksCost = surface * 250;
  const constructionTotal = structuralWorkCost + finishingWorkCost + technicalLotsCost + externalWorksCost;
  
  // Calculate fees
  const architectFee = constructionTotal * 0.08;
  const engineeringFees = constructionTotal * 0.04;
  const projectManagement = constructionTotal * 0.05;
  const officialFees = constructionTotal * 0.01;
  const inspectionFees = constructionTotal * 0.02;
  const permits = constructionTotal * 0.02;
  const insurance = constructionTotal * 0.01;
  const contingency = constructionTotal * 0.05;
  const taxes = constructionTotal * 0.2;
  const technicalStudies = constructionTotal * 0.02;
  const otherFees = constructionTotal * 0.01;
  const totalFees = architectFee + engineeringFees + projectManagement + officialFees + 
                    inspectionFees + permits + insurance + contingency + taxes + 
                    technicalStudies + otherFees;
  
  // Calculate other costs
  const landCost = 0; // This would be provided by user
  const demolitionCost = 0; // This would be provided by user
  const siteDevelopmentCost = surface * 50;
  const otherCostsTotal = landCost + demolitionCost + siteDevelopmentCost;
  
  // Calculate total amount
  const totalAmount = constructionTotal + totalFees + otherCostsTotal;
  
  // Calculate timeline (rough estimates)
  const designMonths = Math.max(2, Math.ceil(surface / 200));
  const permitMonths = 3;
  const constructionMonths = Math.max(6, Math.ceil(surface / 50));
  const totalMonths = designMonths + permitMonths + constructionMonths;
  
  // Generate categories for charts/breakdown
  const categories = [
    { name: 'Structural Work', cost: structuralWorkCost, percentage: (structuralWorkCost / totalAmount) * 100 },
    { name: 'Finishing Work', cost: finishingWorkCost, percentage: (finishingWorkCost / totalAmount) * 100 },
    { name: 'Technical Lots', cost: technicalLotsCost, percentage: (technicalLotsCost / totalAmount) * 100 },
    { name: 'External Works', cost: externalWorksCost, percentage: (externalWorksCost / totalAmount) * 100 },
    { name: 'Fees', cost: totalFees, percentage: (totalFees / totalAmount) * 100 },
    { name: 'Other Costs', cost: otherCostsTotal, percentage: (otherCostsTotal / totalAmount) * 100 }
  ];
  
  // Generate the response
  return {
    projectType: formData.projectType || 'construction',
    projectDetails: {
      surface,
      location,
      constructionType,
      bedrooms,
      bathrooms
    },
    estimatedCost: totalAmount,
    constructionCosts: {
      structuralWork: structuralWorkCost,
      finishingWork: finishingWorkCost,
      technicalLots: technicalLotsCost,
      externalWorks: externalWorksCost,
      total: constructionTotal
    },
    fees: {
      architect: architectFee,
      engineeringFees,
      architectFees: architectFee, // Duplicate to match the interface
      projectManagement,
      officialFees,
      inspectionFees,
      technicalStudies,
      permits,
      insurance,
      contingency,
      taxes,
      other: otherFees,
      total: totalFees
    },
    otherCosts: {
      land: landCost,
      demolition: demolitionCost,
      siteDevelopment: siteDevelopmentCost,
      total: otherCostsTotal,
      insurance: 0,
      contingency: 0,
      taxes: 0,
      miscellaneous: 0
    },
    totalAmount,
    dateGenerated: new Date().toISOString(),
    isComplete: true,
    timeline: {
      design: designMonths,
      permits: permitMonths,
      construction: constructionMonths,
      totalMonths
    },
    categories
  };
}

/**
 * Adapts form data to standardized FormData format
 */
export function adaptToFormData(data: any): FormData {
  return {
    clientType: data.clientType || '',
    projectType: data.projectType || '',
    surface: ensureNumber(data.surface),
    city: data.city || '',
    location: data.location || '',
    bedrooms: ensureNumber(data.bedrooms),
    bathrooms: ensureNumber(data.bathrooms),
    budget: ensureNumber(data.budget),
    constructionType: data.constructionType || ''
  };
}

/**
 * Adapts standard FormData to EstimationFormData
 */
export function adaptToEstimationFormData(formData: Partial<FormData>): EstimationFormData {
  return {
    projectType: formData.projectType || 'construction',
    surface: ensureNumber(formData.surface),
    location: formData.location || '',
    constructionType: formData.constructionType || 'standard',
    bedrooms: ensureNumber(formData.bedrooms),
    bathrooms: ensureNumber(formData.bathrooms),
    budget: ensureNumber(formData.budget),
    city: formData.city || '',
    clientType: formData.clientType || ''
  };
}

/**
 * Creates an updater function that handles type conversions
 * This solves the issue of type mismatches between different form data formats
 */
export function createTypeAdaptingUpdater(originalUpdateFn: (data: any) => void) {
  return (data: any) => {
    // Convert types before updating
    const processedData: any = { ...data };
    
    // Handle numbers
    if ('surface' in data) processedData.surface = ensureNumber(data.surface);
    if ('bedrooms' in data) processedData.bedrooms = ensureNumber(data.bedrooms);
    if ('bathrooms' in data) processedData.bathrooms = ensureNumber(data.bathrooms);
    if ('budget' in data) processedData.budget = ensureNumber(data.budget);
    
    // Pass the processed data to the original update function
    originalUpdateFn(processedData);
  };
}

/**
 * For compatibility with older code
 */
export const adaptFormData = adaptToFormData;
