
import { FormData, EstimationResponseData, EstimationTimeline } from './types';

/**
 * Calculate a complete estimation based on the provided form data
 * @param data The form data
 * @returns The estimated amount and breakdown
 */
export const calculateEstimation = (data: FormData): EstimationResponseData => {
  // Calculate construction costs
  const constructionCosts = calculateConstructionCosts(data);
  
  // Calculate fees
  const fees = calculateFees(data, constructionCosts.total);
  
  // Calculate other costs
  const otherCosts = calculateOtherCosts(data, constructionCosts.total);
  
  // Calculate total amount
  const totalAmount = constructionCosts.total + fees.total + otherCosts.total;
  
  // Calculate timeline
  const timeline = calculateTimeline(data);
  
  return {
    constructionCosts,
    fees,
    otherCosts,
    totalAmount,
    timeline,
    categories: [ // Add categories to match EstimationResponseData interface
      { category: 'Structural Work', amount: constructionCosts.structuralWork },
      { category: 'Finishing Work', amount: constructionCosts.finishingWork },
      { category: 'Technical Lots', amount: constructionCosts.technicalLots },
      { category: 'External Works', amount: constructionCosts.externalWorks },
      { category: 'Fees', amount: fees.total },
      { category: 'Other Costs', amount: otherCosts.total }
    ]
  };
};

const calculateConstructionCosts = (data: FormData) => {
  const surface = typeof data.surface === 'string' ? parseFloat(data.surface) : (data.surface || 0);
  
  // Base costs per square meter
  let baseCostPerSqm = 1500;
  
  // Apply adjustments based on project type
  if (data.projectType === 'renovation') {
    baseCostPerSqm = 1200;
  } else if (data.projectType === 'extension') {
    baseCostPerSqm = 1400;
  }
  
  // Calculate the components
  const structuralWork = surface * baseCostPerSqm * 0.4;
  const finishingWork = surface * baseCostPerSqm * 0.3;
  const technicalLots = surface * baseCostPerSqm * 0.2;
  const externalWorks = surface * baseCostPerSqm * 0.1;
  
  return {
    structuralWork,
    finishingWork,
    technicalLots,
    externalWorks,
    total: structuralWork + finishingWork + technicalLots + externalWorks
  };
};

const calculateFees = (data: FormData, constructionCost: number) => {
  const architectFee = constructionCost * 0.05;
  const engineeringFees = constructionCost * 0.025;
  const officialFees = constructionCost * 0.015;
  const inspectionFees = constructionCost * 0.01;
  const technicalStudies = constructionCost * 0.02;
  const otherFees = constructionCost * 0.01;
  
  return {
    architect: architectFee,
    engineeringFees,
    architectFees: architectFee, // Duplicate for backward compatibility
    officialFees,
    inspectionFees,
    technicalStudies,
    other: otherFees,
    // Include properties from both versions of the type
    masterBuilderFees: architectFee, // Set to the same as architectFees for compatibility
    safetyCoordination: inspectionFees, // Set to the same as inspectionFees for compatibility
    technicalControl: technicalStudies, // Set to the same as technicalStudies for compatibility
    insurance: otherFees, // Set to the same as other for compatibility
    total: architectFee + engineeringFees + officialFees + inspectionFees + technicalStudies + otherFees
  };
};

const calculateOtherCosts = (data: FormData, constructionCost: number) => {
  const insurance = constructionCost * 0.02;
  const contingency = constructionCost * 0.05;
  const taxes = constructionCost * 0.01;
  const miscellaneous = constructionCost * 0.01;
  
  return {
    insurance,
    contingency,
    taxes,
    miscellaneous,
    // Include properties from both versions of the type
    landRegistry: taxes * 0.3, // A portion of taxes
    urbanismTax: taxes * 0.4, // A portion of taxes
    landTax: taxes * 0.2, // A portion of taxes
    connectionFees: miscellaneous * 0.5, // A portion of miscellaneous
    total: insurance + contingency + taxes + miscellaneous
  };
};

const calculateTimeline = (data: FormData) => {
  const design = 2;
  const permits = 3;
  const bidding = 1;
  const construction = 6;
  const total = design + permits + bidding + construction;
  
  return {
    design,
    permits,
    bidding,
    construction,
    total,
    // Include properties from both versions of the type
    duration: total,
    type: 'standard' as EstimationTimeline // Type assertion to match the enum
  };
};

// Export additional calculation functions for use in components
export { calculateConstructionCosts, calculateFees, calculateOtherCosts, calculateTimeline };
