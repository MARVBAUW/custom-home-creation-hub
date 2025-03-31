
import { FormData } from '../types';
import { EstimationResponseData, EstimationTimeline } from '../types/estimationTypes';

/**
 * Converts an estimation response to the required format
 */
export const convertEstimationResponseData = (data: any): EstimationResponseData => {
  // Ensure the data has all required properties
  const response: EstimationResponseData = {
    projectType: data.projectType || '',
    projectDetails: {
      surface: data.surface || 0,
      city: data.city || '',
      bedrooms: data.bedrooms || 0,
      bathrooms: data.bathrooms || 0,
    },
    estimatedCost: {
      total: data.totalAmount || 0,
      perSquareMeter: (data.totalAmount || 0) / (data.surface || 1),
      breakdown: {
        materials: (data.totalAmount || 0) * 0.5,
        labor: (data.totalAmount || 0) * 0.4,
        fees: (data.totalAmount || 0) * 0.1,
      }
    },
    constructionCosts: {
      structuralWork: data.constructionCosts?.structuralWork || 0,
      finishingWork: data.constructionCosts?.finishingWork || 0,
      technicalLots: data.constructionCosts?.technicalLots || 0,
      externalWorks: data.constructionCosts?.externalWorks || 0,
      total: data.constructionCosts?.total || 0
    },
    otherCosts: {
      insurance: data.otherCosts?.insurance || 0,
      contingency: data.otherCosts?.contingency || 0,
      taxes: data.otherCosts?.taxes || 0,
      miscellaneous: data.otherCosts?.miscellaneous || 0,
      total: data.otherCosts?.total || 0
    },
    totalAmount: data.totalAmount || 0,
    categories: data.categories || [],
    timeline: data.timeline || {
      design: 0,
      permits: 0,
      bidding: 0,
      construction: 0,
      total: 0
    },
    fees: data.fees || {
      architect: 0,
      engineeringFees: 0,
      architectFees: 0,
      officialFees: 0,
      inspectionFees: 0,
      technicalStudies: 0,
      other: 0,
      total: 0
    },
    dateGenerated: data.dateGenerated || new Date().toISOString(),
    isComplete: data.isComplete || false
  };
  
  return response;
};

/**
 * Safely get a value from an object with type checking
 */
export const safeGet = <T>(obj: any, path: string, defaultValue: T): T => {
  if (!obj) return defaultValue;
  
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current === null || current === undefined) {
      return defaultValue;
    }
    current = current[key];
  }
  
  return (current !== null && current !== undefined) ? current as T : defaultValue;
};
