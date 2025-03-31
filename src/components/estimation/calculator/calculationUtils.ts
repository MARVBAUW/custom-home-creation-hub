
import { FormData } from './types/estimationFormData';

/**
 * Calculates the construction costs based on form data
 */
export const calculateConstructionCosts = (data: FormData) => {
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

/**
 * Calculates the fees based on form data and construction cost
 */
export const calculateFees = (data: FormData, constructionCost: number) => {
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

/**
 * Calculates other costs based on form data and construction cost
 */
export const calculateOtherCosts = (data: FormData, constructionCost: number) => {
  return {
    insurance: constructionCost * 0.02,
    contingency: constructionCost * 0.05,
    taxes: constructionCost * 0.01,
    miscellaneous: constructionCost * 0.01,
    total: constructionCost * 0.09
  };
};

/**
 * Calculates the timeline based on form data
 */
export const calculateTimeline = (data: FormData) => {
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

/**
 * Complete estimation calculation
 */
export const calculateEstimation = (data: FormData) => {
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
    timeline
  };
};
