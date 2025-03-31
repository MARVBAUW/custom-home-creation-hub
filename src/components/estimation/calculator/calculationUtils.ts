
import { FormData, EstimationResponseData } from './types';

export const calculateEstimation = (formData: FormData): EstimationResponseData => {
  // Default base price per m² depending on project type
  let basePricePerSqm = 0;
  
  switch (formData.projectType) {
    case 'construction':
      basePricePerSqm = 1500;
      break;
    case 'renovation':
      basePricePerSqm = 800;
      break;
    case 'extension':
      basePricePerSqm = 1300;
      break;
    default:
      basePricePerSqm = 1000;
  }
  
  // Apply adjustments based on complexity
  const complexityMultipliers = {
    'simple': 0.8,
    'standard': 1.0,
    'complex': 1.3,
    'very-complex': 1.6,
  };
  
  // Apply adjustments based on quality standard
  const qualityMultipliers = {
    'basic': 0.8,
    'standard': 1.0,
    'premium': 1.5,
    'luxury': 2.0,
  };
  
  // Get multipliers (default to standard if not specified)
  const complexityMultiplier = formData.complexity ? 
    complexityMultipliers[formData.complexity as keyof typeof complexityMultipliers] || 1.0 : 1.0;
  
  const qualityMultiplier = formData.qualityStandard ? 
    qualityMultipliers[formData.qualityStandard as keyof typeof qualityMultipliers] || 1.0 : 1.0;
  
  // Apply size adjustment (smaller projects are more expensive per m²)
  const surface = typeof formData.surface === 'number' ? formData.surface : 
                  typeof formData.surface === 'string' ? parseFloat(formData.surface) : 100;
  
  let sizeMultiplier = 1.0;
  if (surface < 50) {
    sizeMultiplier = 1.4;
  } else if (surface < 100) {
    sizeMultiplier = 1.2;
  } else if (surface > 200) {
    sizeMultiplier = 0.9;
  } else if (surface > 500) {
    sizeMultiplier = 0.8;
  }
  
  // Calculate the adjusted price per m²
  const adjustedPricePerSqm = basePricePerSqm * complexityMultiplier * qualityMultiplier * sizeMultiplier;
  
  // Calculate construction cost
  const constructionCost = adjustedPricePerSqm * surface;
  
  // Distribute costs based on typical project breakdowns
  const structuralWorkPercentage = formData.projectType === 'renovation' ? 0.3 : 0.45;
  const finishingWorkPercentage = formData.projectType === 'renovation' ? 0.4 : 0.25;
  const technicalLotsPercentage = 0.2;
  const externalWorksPercentage = formData.projectType === 'renovation' ? 0.1 : 0.1;
  
  // Calculate construction costs breakdown
  const structuralWork = constructionCost * structuralWorkPercentage;
  const finishingWork = constructionCost * finishingWorkPercentage;
  const technicalLots = constructionCost * technicalLotsPercentage;
  const externalWorks = constructionCost * externalWorksPercentage;
  
  // Calculate fees (typically 10-15% of construction cost)
  const feesPercentage = surface < 100 ? 0.15 : surface < 200 ? 0.12 : 0.10;
  const fees = constructionCost * feesPercentage;
  
  // Distribute fees
  const architectFees = fees * 0.6;
  const technicalStudiesFees = fees * 0.3;
  const otherFees = fees * 0.1;
  
  // Calculate other costs (insurances, taxes, etc. - typically 5-8% of construction cost)
  const otherCostsPercentage = 0.07;
  const otherCosts = constructionCost * otherCostsPercentage;
  
  // Distribute other costs
  const insuranceCosts = otherCosts * 0.4;
  const taxesCosts = otherCosts * 0.3;
  const contingencyCosts = otherCosts * 0.3;
  
  // Calculate total amount
  const totalAmount = constructionCost + fees + otherCosts;
  
  // Calculate timeline (in months)
  let designDuration = 2;
  let permitsDuration = 3;
  let biddingDuration = 1;
  let constructionDuration = 0;
  
  // Adjust timeline based on project size and complexity
  if (surface < 100) {
    constructionDuration = 4;
  } else if (surface < 200) {
    constructionDuration = 6;
  } else if (surface < 500) {
    constructionDuration = 9;
  } else {
    constructionDuration = 12;
  }
  
  // Adjust for complexity
  if (complexityMultiplier > 1.2) {
    designDuration += 1;
    permitsDuration += 1;
    constructionDuration = Math.round(constructionDuration * 1.25);
  }
  
  // Renovation projects typically have shorter durations for permits
  if (formData.projectType === 'renovation') {
    permitsDuration = 2;
  }
  
  // Calculate total timeline
  const totalTimeline = designDuration + permitsDuration + biddingDuration + constructionDuration;
  
  // Create and return the estimation response
  return {
    constructionCosts: {
      structuralWork,
      finishingWork,
      technicalLots,
      externalWorks,
      total: constructionCost
    },
    fees: {
      architect: architectFees,
      technicalStudies: technicalStudiesFees,
      other: otherFees,
      total: fees
    },
    otherCosts: {
      insurance: insuranceCosts,
      taxes: taxesCosts,
      contingency: contingencyCosts,
      total: otherCosts
    },
    totalAmount,
    timeline: {
      design: designDuration,
      permits: permitsDuration,
      bidding: biddingDuration,
      construction: constructionDuration,
      total: totalTimeline
    }
  };
};

// Utility function to ensure we always get a valid estimation object
export const getSafeEstimation = (estimation: EstimationResponseData | number | null, formData: FormData): EstimationResponseData => {
  if (estimation === null) {
    return calculateEstimation(formData);
  }
  
  if (typeof estimation === 'number') {
    return calculateEstimation(formData);
  }
  
  return estimation;
};
