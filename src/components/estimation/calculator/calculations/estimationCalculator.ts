
import { EstimationFormData } from '../types/estimationFormData';
import { EstimationResponseData } from '../types/estimationTypes';
import { calculateStructuralCosts } from './structuralCosts';
import { calculateFeeCosts } from './feeCosts';
import { calculateExternalCosts } from './externalCosts';
import { calculateFinishingCosts } from './finishingCosts';
import { calculateTechnicalCosts } from './technicalCosts';
import { ensureNumber } from '../utils/typeConversions';

export function generateEstimationResult(formData: EstimationFormData): EstimationResponseData {
  // Calculate different cost sections
  const constructionCosts = calculateStructuralCosts(formData);
  const finishingCosts = calculateFinishingCosts(formData);
  const technicalCosts = calculateTechnicalCosts(formData);
  const externalCosts = calculateExternalCosts(formData);
  
  // Subtotal for construction
  const constructionSubtotal = constructionCosts.total + 
                               finishingCosts.total + 
                               technicalCosts.total + 
                               externalCosts.total;
  
  // Calculate fees based on construction subtotal
  const feeCosts = calculateFeeCosts(constructionSubtotal, formData);
  
  // Calculate total
  const totalAmount = constructionSubtotal + feeCosts.total + externalCosts.total;
  
  // Generate response object
  const result: EstimationResponseData = {
    projectType: formData.projectType,
    projectDetails: {
      surface: ensureNumber(formData.surface),
      location: formData.location || 'non spécifié',
      constructionType: formData.constructionType || 'standard',
      bedrooms: ensureNumber(formData.bedrooms),
      bathrooms: ensureNumber(formData.bathrooms)
    },
    estimatedCost: totalAmount,
    constructionCosts: {
      structuralWork: constructionCosts.total,
      finishingWork: finishingCosts.total,
      technicalLots: technicalCosts.total,
      externalWorks: externalCosts.total,
      total: constructionSubtotal
    },
    fees: feeCosts,
    otherCosts: {
      land: 0, // Not calculated here
      demolition: externalCosts.demolition || 0,
      siteDevelopment: externalCosts.siteDevelopment || 0,
      total: externalCosts.total,
      insurance: feeCosts.insurance || 0,
      contingency: feeCosts.contingency || 0,
      taxes: feeCosts.taxes || 0,
      miscellaneous: 0
    },
    totalAmount: totalAmount,
    dateGenerated: new Date().toISOString(),
    isComplete: true,
    timeline: {
      design: calculateDesignTime(formData),
      permits: calculatePermitTime(formData),
      construction: calculateConstructionTime(formData),
      totalMonths: 0 // Will be calculated below
    },
    categories: [
      { 
        name: 'Structure', 
        cost: constructionCosts.total, 
        percentage: (constructionCosts.total / totalAmount) * 100 
      },
      { 
        name: 'Finitions', 
        cost: finishingCosts.total, 
        percentage: (finishingCosts.total / totalAmount) * 100 
      },
      { 
        name: 'Lots techniques', 
        cost: technicalCosts.total, 
        percentage: (technicalCosts.total / totalAmount) * 100 
      },
      { 
        name: 'Travaux extérieurs', 
        cost: externalCosts.total, 
        percentage: (externalCosts.total / totalAmount) * 100 
      },
      { 
        name: 'Honoraires et frais', 
        cost: feeCosts.total, 
        percentage: (feeCosts.total / totalAmount) * 100 
      }
    ]
  };
  
  // Calculate total months
  result.timeline.totalMonths = 
    result.timeline.design + 
    result.timeline.permits + 
    result.timeline.construction;
  
  return result;
}

// Helper function to calculate design time
function calculateDesignTime(formData: EstimationFormData): number {
  const surface = ensureNumber(formData.surface);
  
  if (surface <= 0) return 1;
  
  if (surface < 100) return 1;
  if (surface < 200) return 2;
  if (surface < 300) return 3;
  return 4;
}

// Helper function to calculate permit time
function calculatePermitTime(formData: EstimationFormData): number {
  // Standard time for permits in France
  return 3;
}

// Helper function to calculate construction time
function calculateConstructionTime(formData: EstimationFormData): number {
  const surface = ensureNumber(formData.surface);
  
  if (surface <= 0) return 3;
  
  if (surface < 80) return 3;
  if (surface < 120) return 5;
  if (surface < 200) return 8;
  if (surface < 300) return 12;
  return 15;
}

// Make sure we export this function for the estimation calculator
export const calculateEstimation = generateEstimationResult;
