
import { EstimationFormData, EstimationResponseData } from '../types';

// Main calculation function for estimation
export const calculateEstimation = (formData: EstimationFormData): EstimationResponseData => {
  const surface = typeof formData.surface === 'string' 
    ? parseFloat(formData.surface) 
    : (formData.surface || 0);
  
  let basePrice = 1800; // Default price per m²
  
  // Adjust base price based on project type
  switch (formData.projectType) {
    case 'construction':
      basePrice = 1800;
      break;
    case 'renovation':
      basePrice = 1200;
      break;
    case 'extension':
      basePrice = 1600;
      break;
    case 'amenagement':
      basePrice = 900;
      break;
    case 'commercial':
      basePrice = 1500;
      break;
    case 'offices':
      basePrice = 1600;
      break;
    case 'industrial':
      basePrice = 1200;
      break;
    default:
      basePrice = 1800;
  }
  
  // Calculate total construction cost
  const constructionCost = surface * basePrice;
  
  // Calculate fees (10% of construction cost)
  const fees = constructionCost * 0.1;
  
  // Calculate other costs (5% of construction cost)
  const otherCosts = constructionCost * 0.05;
  
  // Calculate total amount
  const totalAmount = constructionCost + fees + otherCosts;
  
  return {
    constructionCosts: {
      structuralWork: constructionCost * 0.5,
      finishingWork: constructionCost * 0.3,
      technicalLots: constructionCost * 0.15,
      externalWorks: constructionCost * 0.05,
      total: constructionCost
    },
    fees: {
      architect: fees * 0.6,
      engineeringFees: fees * 0.2,
      architectFees: fees * 0.4,
      technicalStudies: fees * 0.3,
      other: fees * 0.1,
      total: fees
    },
    otherCosts: {
      insurance: otherCosts * 0.3,
      contingency: otherCosts * 0.4,
      taxes: otherCosts * 0.2,
      miscellaneous: otherCosts * 0.1,
      total: otherCosts
    },
    totalAmount: totalAmount,
    timeline: {
      design: 2,
      permits: 3,
      bidding: 1,
      construction: 10,
      total: 16
    }
  };
};
