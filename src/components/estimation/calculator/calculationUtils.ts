
import { FormData } from './types/formTypes';
import { EstimationResponseData, FeeCosts } from './types/estimationTypes';

/**
 * Calculate the estimation results based on form data
 */
export function calculateEstimation(formData: FormData): EstimationResponseData {
  // Extract necessary values
  const surface = formData.surface || 0;
  const projectType = formData.projectType || 'construction';
  const constructionType = formData.constructionType || 'traditional';
  
  // Base cost per square meter based on project type
  let baseCostPerSqm = 1200;
  if (projectType === 'renovation') {
    baseCostPerSqm = 800;
  } else if (projectType === 'extension') {
    baseCostPerSqm = 1000;
  }
  
  // Calculate main construction costs
  const totalConstructionCost = surface * baseCostPerSqm;
  const structuralWork = totalConstructionCost * 0.4;
  const finishingWork = totalConstructionCost * 0.3;
  const technicalLots = totalConstructionCost * 0.2;
  const externalWorks = totalConstructionCost * 0.1;
  
  // Calculate fees
  const fees: FeeCosts = {
    architect: totalConstructionCost * 0.07,
    engineeringFees: totalConstructionCost * 0.03,
    architectFees: totalConstructionCost * 0.06,
    projectManagement: totalConstructionCost * 0.04,
    officialFees: totalConstructionCost * 0.01,
    inspectionFees: totalConstructionCost * 0.01,
    technicalStudies: totalConstructionCost * 0.02,
    permits: totalConstructionCost * 0.02,
    insurance: totalConstructionCost * 0.02,
    contingency: totalConstructionCost * 0.05,
    taxes: totalConstructionCost * 0.02,
    other: totalConstructionCost * 0.01,
    masterBuilderFees: totalConstructionCost * 0.03,
    safetyCoordination: totalConstructionCost * 0.01,
    technicalControl: totalConstructionCost * 0.01,
    total: totalConstructionCost * 0.30 // Approximation of total fees
  };
  
  // Calculate other costs
  const insurance = totalConstructionCost * 0.02;
  const contingency = totalConstructionCost * 0.05;
  const taxes = totalConstructionCost * 0.03;
  const miscellaneous = totalConstructionCost * 0.02;
  const totalOtherCosts = insurance + contingency + taxes + miscellaneous;
  
  // Total project cost
  const totalAmount = totalConstructionCost + fees.total + totalOtherCosts;
  
  // Result object
  return {
    projectType,
    projectDetails: {
      surface,
      location: formData.city || '',
      projectType,
      constructionType,
      bedrooms: formData.bedrooms || 0,
      bathrooms: formData.bathrooms || 0,
      city: formData.city || ''
    },
    estimatedCost: {
      total: totalAmount,
      perSquareMeter: totalAmount / surface,
      breakdown: {
        materials: totalConstructionCost * 0.6,
        labor: totalConstructionCost * 0.4,
        fees: fees.total
      }
    },
    constructionCosts: {
      structuralWork,
      finishingWork,
      technicalLots,
      externalWorks,
      total: totalConstructionCost
    },
    fees,
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
      construction: projectType === 'renovation' ? 6 : (projectType === 'extension' ? 5 : 10),
      total: projectType === 'renovation' ? 12 : (projectType === 'extension' ? 11 : 16)
    },
    categories: [
      { category: 'Gros œuvre', amount: structuralWork },
      { category: 'Second œuvre', amount: finishingWork },
      { category: 'Lots techniques', amount: technicalLots },
      { category: 'Aménagements extérieurs', amount: externalWorks }
    ],
    dateGenerated: new Date().toISOString(),
    isComplete: true
  };
}
