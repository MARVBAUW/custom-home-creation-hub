
import { EstimationFormData, FormData } from '../types/formTypes';
import { EstimationResponseData, ProjectDetails, EstimatedCost, CategoryCost } from '../types/estimationTypes';
import { calculateConstructionBaseCost, calculateKitchenCost, calculateBathroomCost, calculateWindowsCost, calculateEcoOptionsCost } from '../calculations/estimationCalculator';
import { ensureNumber } from './typeConversions';

// Adapts FormData to EstimationResponseData
export const adaptToEstimationResponseData = (formData: EstimationFormData | FormData): EstimationResponseData => {
  const {
    projectType,
    surface,
    location,
    constructionType,
    bedrooms,
    bathrooms,
    budget,
    city,
    clientType,
    kitchenType,
    bathroomType,
    bathroomCount,
    menuiseriesExtType,
    includeRenewableEnergy,
    includeEcoSolutions
  } = formData;

  // Perform calculations based on the form data
  const baseCost = calculateConstructionBaseCost(formData);
  const kitchenCost = calculateKitchenCost(formData);
  const bathroomCost = calculateBathroomCost(formData);
  const windowsCost = calculateWindowsCost(formData);
  const ecoOptionsCost = calculateEcoOptionsCost(formData);
  
  // Calculate costs for construction
  const structuralWork = baseCost * 0.4;
  const finishingWork = baseCost * 0.3;
  const technicalLots = baseCost * 0.2;
  const externalWorks = baseCost * 0.1;

  // Calculate fees
  const architectFees = baseCost * 0.05;
  const engineeringFees = baseCost * 0.03;
  const projectManagement = baseCost * 0.04;
  const officialFees = baseCost * 0.02;
  const inspectionFees = baseCost * 0.01;
  const technicalStudies = baseCost * 0.015;
  const permitsAndApprovals = baseCost * 0.025;
  const insurance = baseCost * 0.01;
  const contingency = baseCost * 0.03;
  const taxes = baseCost * 0.02;
  const other = baseCost * 0.005;

  // Calculate other costs
  const land = 0; // Land cost can be added if landIncluded is true
  const demolition = 0;
  const siteDevelopment = 0;
  const miscellaneous = 0;

  // Calculate total costs
  const constructionCostsTotal = structuralWork + finishingWork + technicalLots + externalWorks;
  const feesTotal = architectFees + engineeringFees + projectManagement + officialFees + inspectionFees + technicalStudies + permitsAndApprovals + insurance + contingency + taxes + other;
  const otherCostsTotal = land + demolition + siteDevelopment + insurance + contingency + taxes + miscellaneous;
  const totalAmount = constructionCostsTotal + feesTotal + otherCostsTotal + kitchenCost + bathroomCost + windowsCost + ecoOptionsCost;

  // Estimate timeline
  const design = 2;
  const permits = 3;
  const construction = 8;
  const totalMonths = design + permits + construction;

  // Define categories
  const categories: CategoryCost[] = [
    { name: 'Structure', cost: structuralWork, percentage: (structuralWork / totalAmount) * 100, amount: structuralWork },
    { name: 'Finishing', cost: finishingWork, percentage: (finishingWork / totalAmount) * 100, amount: finishingWork },
    { name: 'Technical', cost: technicalLots, percentage: (technicalLots / totalAmount) * 100, amount: technicalLots },
    { name: 'External Works', cost: externalWorks, percentage: (externalWorks / totalAmount) * 100, amount: externalWorks },
    { name: 'Fees', cost: feesTotal, percentage: (feesTotal / totalAmount) * 100, amount: feesTotal },
    { name: 'Kitchen', cost: kitchenCost, percentage: (kitchenCost / totalAmount) * 100, amount: kitchenCost },
    { name: 'Bathrooms', cost: bathroomCost, percentage: (bathroomCost / totalAmount) * 100, amount: bathroomCost },
    { name: 'Windows', cost: windowsCost, percentage: (windowsCost / totalAmount) * 100, amount: windowsCost },
    { name: 'Eco Options', cost: ecoOptionsCost, percentage: (ecoOptionsCost / totalAmount) * 100, amount: ecoOptionsCost }
  ];

  // Adapt the form data to the estimation response data structure
  const estimationResponseData: EstimationResponseData = {
    projectType: projectType || 'construction',
    projectDetails: {
      projectType: projectType || 'construction',
      surface: ensureNumber(surface),
      location: location || '',
      constructionType: constructionType || '',
      bedrooms: ensureNumber(bedrooms),
      bathrooms: ensureNumber(bathrooms),
      city: city || ''
    },
    estimatedCost: {
      total: totalAmount,
      perSquareMeter: surface ? totalAmount / surface : 0,
      breakdown: {
        materials: totalAmount * 0.6,
        labor: totalAmount * 0.3,
        fees: totalAmount * 0.1
      }
    },
    constructionCosts: {
      structuralWork: structuralWork,
      finishingWork: finishingWork,
      technicalLots: technicalLots,
      externalWorks: externalWorks,
      total: constructionCostsTotal
    },
    fees: {
      architect: architectFees,
      architectFees: architectFees,
      engineeringFees: engineeringFees,
      projectManagement: projectManagement,
      officialFees: officialFees,
      inspectionFees: inspectionFees,
      technicalStudies: technicalStudies,
      permits: permitsAndApprovals,
      insurance: insurance,
      contingency: contingency,
      taxes: taxes,
      other: other,
      total: feesTotal
    },
    otherCosts: {
      land: land,
      demolition: demolition,
      siteDevelopment: siteDevelopment,
      insurance: insurance,
      contingency: contingency,
      taxes: taxes,
      miscellaneous: miscellaneous,
      total: otherCostsTotal
    },
    totalAmount: totalAmount,
    dateGenerated: new Date().toLocaleDateString(),
    isComplete: true,
    timeline: {
      design: design,
      permits: permits,
      bidding: 1,
      construction: construction,
      total: totalMonths,
      totalMonths: totalMonths
    },
    categories: categories
  };

  return estimationResponseData;
};

// Add the alias function for useUnifiedFormData
export const adaptToEstimationData = adaptToEstimationResponseData;

// Utility function to adapt form data types
export const createTypeAdaptingUpdater = (updateFunction: (data: Partial<EstimationFormData>) => void) => {
  return (data: any) => {
    const adaptedData: Partial<EstimationFormData> = {};

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        let value = data[key];

        // Attempt to convert to number if the key suggests it should be a number
        if (typeof value === 'string' && !isNaN(Number(value))) {
          adaptedData[key] = Number(value);
        } else {
          adaptedData[key] = value;
        }
      }
    }

    updateFunction(adaptedData);
  };
};
