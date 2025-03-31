
import { FormData, EstimationResponseData, EstimationTimeline } from './types';
import { ensureNumber } from './utils/typeConversions';

/**
 * Calculate the estimation based on form data
 * 
 * @param formData The form data used for calculation
 * @returns The estimation result
 */
export const calculateEstimation = (formData: FormData): EstimationResponseData => {
  // Extract surface and basic parameters
  const surface = ensureNumber(formData.surface);
  const projectType = formData.projectType || 'construction';
  
  // Base calculation for structural work
  const structuralWorkCost = calculateStructuralWork(formData);
  
  // Calculate finishing work
  const finishingWorkCost = calculateFinishingWork(formData);
  
  // Calculate technical lots
  const technicalLotsCost = calculateTechnicalLots(formData);
  
  // Calculate external works
  const externalWorksCost = calculateExternalWorks(formData);
  
  // Total construction costs
  const constructionCostsTotal = structuralWorkCost + finishingWorkCost + technicalLotsCost + externalWorksCost;
  
  // Calculate fees
  const architectFees = constructionCostsTotal * 0.10;
  const engineeringFees = constructionCostsTotal * 0.05;
  const masterBuilderFees = constructionCostsTotal * 0.08;
  const safetyCoordination = constructionCostsTotal * 0.01;
  const technicalControl = constructionCostsTotal * 0.02;
  const insurance = constructionCostsTotal * 0.03;
  const feesTotal = architectFees + engineeringFees + masterBuilderFees + safetyCoordination + technicalControl + insurance;
  
  // Calculate other costs
  const landRegistry = 2000;
  const urbanismTax = constructionCostsTotal * 0.03;
  const landTax = 1500;
  const connectionFees = 3000;
  const otherCostsTotal = landRegistry + urbanismTax + landTax + connectionFees;
  
  // Calculate total amount
  const totalAmount = constructionCostsTotal + feesTotal + otherCostsTotal;
  
  // Generate categories breakdown
  const categories = [
    { category: 'Gros œuvre', amount: structuralWorkCost * 0.6, details: `Surface: ${surface}m²` },
    { category: 'Charpente', amount: structuralWorkCost * 0.2, details: projectType },
    { category: 'Couverture', amount: structuralWorkCost * 0.2, details: projectType },
    { category: 'Menuiseries extérieures', amount: finishingWorkCost * 0.25, details: projectType },
    { category: 'Isolation', amount: finishingWorkCost * 0.15, details: projectType },
    { category: 'Plâtrerie', amount: finishingWorkCost * 0.15, details: projectType },
    { category: 'Électricité', amount: technicalLotsCost * 0.3, details: projectType },
    { category: 'Plomberie', amount: technicalLotsCost * 0.3, details: projectType },
    { category: 'Chauffage', amount: technicalLotsCost * 0.4, details: projectType },
    { category: 'Carrelage', amount: finishingWorkCost * 0.15, details: projectType },
    { category: 'Peinture', amount: finishingWorkCost * 0.1, details: projectType },
    { category: 'Aménagements extérieurs', amount: externalWorksCost, details: projectType },
    { category: 'Frais annexes', amount: otherCostsTotal, details: 'Frais administratifs et taxes' },
  ];
  
  // Calculate timeline based on project type and size
  let duration = 12; // Default duration in months
  if (projectType === 'construction') {
    duration = Math.max(12, Math.ceil(surface / 20));
  } else if (projectType === 'renovation') {
    duration = Math.max(6, Math.ceil(surface / 40));
  } else if (projectType === 'extension') {
    duration = Math.max(4, Math.ceil(surface / 50));
  }
  
  return {
    constructionCosts: {
      structuralWork: structuralWorkCost,
      finishingWork: finishingWorkCost,
      technicalLots: technicalLotsCost,
      externalWorks: externalWorksCost,
      total: constructionCostsTotal
    },
    fees: {
      architect: architectFees,
      engineeringFees: engineeringFees,
      architectFees: architectFees,
      masterBuilderFees: masterBuilderFees,
      safetyCoordination: safetyCoordination,
      technicalControl: technicalControl,
      insurance: insurance,
      total: feesTotal
    },
    otherCosts: {
      landRegistry,
      urbanismTax,
      landTax,
      connectionFees,
      total: otherCostsTotal
    },
    totalAmount,
    categories,
    timeline: {
      duration,
      type: EstimationTimeline.Standard
    }
  };
};

/**
 * Calculate the structural work cost
 */
const calculateStructuralWork = (formData: FormData): number => {
  const surface = ensureNumber(formData.surface);
  const projectType = formData.projectType || 'construction';
  
  let baseCost = 0;
  
  if (projectType === 'construction') {
    baseCost = surface * 800;
  } else if (projectType === 'renovation') {
    baseCost = surface * 500;
  } else if (projectType === 'extension') {
    baseCost = surface * 900;
  } else {
    baseCost = surface * 700;
  }
  
  return baseCost;
};

/**
 * Calculate the finishing work cost
 */
const calculateFinishingWork = (formData: FormData): number => {
  const surface = ensureNumber(formData.surface);
  const projectType = formData.projectType || 'construction';
  
  let baseCost = 0;
  
  if (projectType === 'construction') {
    baseCost = surface * 500;
  } else if (projectType === 'renovation') {
    baseCost = surface * 400;
  } else if (projectType === 'extension') {
    baseCost = surface * 550;
  } else {
    baseCost = surface * 450;
  }
  
  return baseCost;
};

/**
 * Calculate the technical lots cost
 */
const calculateTechnicalLots = (formData: FormData): number => {
  const surface = ensureNumber(formData.surface);
  const projectType = formData.projectType || 'construction';
  
  let baseCost = 0;
  
  if (projectType === 'construction') {
    baseCost = surface * 300;
  } else if (projectType === 'renovation') {
    baseCost = surface * 250;
  } else if (projectType === 'extension') {
    baseCost = surface * 320;
  } else {
    baseCost = surface * 280;
  }
  
  return baseCost;
};

/**
 * Calculate the external works cost
 */
const calculateExternalWorks = (formData: FormData): number => {
  const surface = ensureNumber(formData.surface);
  const projectType = formData.projectType || 'construction';
  
  let baseCost = 0;
  
  if (projectType === 'construction') {
    baseCost = surface * 200;
  } else if (projectType === 'renovation') {
    baseCost = surface * 100;
  } else if (projectType === 'extension') {
    baseCost = surface * 150;
  } else {
    baseCost = surface * 120;
  }
  
  return baseCost;
};
