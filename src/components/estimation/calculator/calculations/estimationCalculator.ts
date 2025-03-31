
import { FormData, EstimationResponseData, FeeCosts } from '../types';

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

const calculateFees = (data: FormData, constructionCost: number): FeeCosts => {
  // Ensure all required properties are included and not undefined
  return {
    architect: constructionCost * 0.05,
    engineeringFees: constructionCost * 0.025,
    architectFees: constructionCost * 0.05,
    officialFees: constructionCost * 0.015,
    inspectionFees: constructionCost * 0.01,
    technicalStudies: constructionCost * 0.02,
    other: constructionCost * 0.01,
    total: constructionCost * 0.12
  };
};

const calculateOtherCosts = (data: FormData, constructionCost: number) => {
  return {
    insurance: constructionCost * 0.02,
    contingency: constructionCost * 0.05,
    taxes: constructionCost * 0.01,
    miscellaneous: constructionCost * 0.01,
    total: constructionCost * 0.09
  };
};

const calculateTimeline = (data: FormData) => {
  const baseTimeMonths = 12;
  let design = 2;
  let permits = 3;
  let bidding = 1;
  let construction = 6;
  
  // Adjust based on project size
  const surface = typeof data.surface === 'string' ? parseFloat(data.surface) : (data.surface || 0);
  if (surface > 200) {
    construction += 3;
  } else if (surface > 100) {
    construction += 1;
  }
  
  // Adjust based on project type
  if (data.projectType === 'renovation') {
    permits -= 1;
    construction -= 1;
  } else if (data.projectType === 'extension') {
    permits -= 0.5;
  }
  
  const total = design + permits + bidding + construction;
  
  return {
    design,
    permits,
    bidding,
    construction,
    total
  };
};
