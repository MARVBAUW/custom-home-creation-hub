
import { FormData, EstimationResponseData } from './types';

/**
 * Calculate estimation based on form data
 */
export const calculateEstimation = (formData: FormData): EstimationResponseData => {
  // Get square meters
  const squareMeters = formData.surface ? Number(formData.surface) : 100;
  
  // Base cost per square meter
  let baseCostPerSquareMeter = 1500;
  
  // Adjust cost based on construction type
  if (formData.constructionType === 'ossatureBois') {
    baseCostPerSquareMeter *= 1.1;
  } else if (formData.constructionType === 'modulaire') {
    baseCostPerSquareMeter *= 0.9;
  } else if (formData.constructionType === 'ecologique') {
    baseCostPerSquareMeter *= 1.15;
  }
  
  // Adjust cost based on quality standard
  if (formData.qualityStandard === 'premium') {
    baseCostPerSquareMeter *= 1.3;
  } else if (formData.qualityStandard === 'economique') {
    baseCostPerSquareMeter *= 0.8;
  }
  
  // Adjust cost based on complexity
  if (formData.complexity === 'complex') {
    baseCostPerSquareMeter *= 1.2;
  } else if (formData.complexity === 'veryComplex') {
    baseCostPerSquareMeter *= 1.4;
  }
  
  // Adjust for roofing type
  if (formData.roofingType === 'vegetalisee') {
    baseCostPerSquareMeter *= 1.15;
  } else if (formData.roofingType === 'zinc') {
    baseCostPerSquareMeter *= 1.1;
  }
  
  // Adjust for insulation type
  if (formData.insulationType === 'performante') {
    baseCostPerSquareMeter *= 1.08;
  } else if (formData.insulationType === 'ecologique') {
    baseCostPerSquareMeter *= 1.12;
  }
  
  // Calculate structural work cost (usually around 50% of total)
  const structuralWorkCost = squareMeters * baseCostPerSquareMeter * 0.5;
  
  // Calculate finishing work cost (around 30% of total)
  const finishingWorkCost = squareMeters * baseCostPerSquareMeter * 0.3;
  
  // Calculate technical lots cost (around 15% of total)
  const technicalLotsCost = squareMeters * baseCostPerSquareMeter * 0.15;
  
  // Calculate external works cost (around 5% of total)
  const externalWorksCost = squareMeters * baseCostPerSquareMeter * 0.05;
  
  // Calculate total construction cost
  const totalConstructionCost = structuralWorkCost + finishingWorkCost + technicalLotsCost + externalWorksCost;
  
  // Calculate architect fees (typically 10% of construction cost)
  const architectFees = totalConstructionCost * 0.1;
  
  // Calculate engineering fees (typically 3% of construction cost)
  const engineeringFees = totalConstructionCost * 0.03;
  
  // Calculate official fees (typically 2% of construction cost)
  const officialFees = totalConstructionCost * 0.02;
  
  // Calculate inspection fees (typically 1% of construction cost)
  const inspectionFees = totalConstructionCost * 0.01;
  
  // Calculate total fees
  const totalFees = architectFees + engineeringFees + officialFees + inspectionFees;
  
  // Calculate insurance costs (typically 3% of construction cost)
  const insuranceCost = totalConstructionCost * 0.03;
  
  // Calculate contingency (typically 5% of construction cost)
  const contingencyCost = totalConstructionCost * 0.05;
  
  // Calculate taxes (typically 2% of construction cost)
  const taxesCost = totalConstructionCost * 0.02;
  
  // Calculate miscellaneous costs (typically 1% of construction cost)
  const miscellaneousCost = totalConstructionCost * 0.01;
  
  // Calculate total other costs
  const totalOtherCosts = insuranceCost + contingencyCost + taxesCost + miscellaneousCost;
  
  // Calculate total amount
  const totalAmount = totalConstructionCost + totalFees + totalOtherCosts;
  
  // Calculate timeline based on square meters and complexity
  let designTime = 2; // Months
  let permitsTime = 3; // Months
  let biddingTime = 1; // Months
  let constructionTime = Math.max(6, Math.ceil(squareMeters / 50)); // Base: 6 months, +1 month per 50m²
  
  // Adjust timeline based on complexity
  if (formData.complexity === 'complex') {
    designTime += 1;
    permitsTime += 1;
    constructionTime = Math.ceil(constructionTime * 1.2);
  } else if (formData.complexity === 'veryComplex') {
    designTime += 2;
    permitsTime += 2;
    constructionTime = Math.ceil(constructionTime * 1.5);
  }
  
  // Calculate total timeline
  const totalTimeline = designTime + permitsTime + biddingTime + constructionTime;
  
  return {
    constructionCosts: {
      structuralWork: structuralWorkCost,
      finishingWork: finishingWorkCost,
      technicalLots: technicalLotsCost,
      externalWorks: externalWorksCost,
      total: totalConstructionCost
    },
    fees: {
      architectFees,
      engineeringFees,
      officialFees,
      inspectionFees,
      total: totalFees
    },
    otherCosts: {
      insurance: insuranceCost,
      contingency: contingencyCost,
      taxes: taxesCost,
      miscellaneous: miscellaneousCost,
      total: totalOtherCosts
    },
    totalAmount,
    timeline: {
      design: designTime,
      permits: permitsTime,
      bidding: biddingTime,
      construction: constructionTime,
      total: totalTimeline
    }
  };
};
