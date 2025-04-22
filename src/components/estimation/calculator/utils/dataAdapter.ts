
import { EstimationResponseData, ProjectDetails, ConstructionCosts, FeeCosts, OtherCosts, EstimationTimeline } from '../types/estimationTypes';
import { FormData } from '../types/formTypes';
import { ensureNumber, ensureString, ensureBoolean } from './typeConversions';

/**
 * Adapt form data to the estimation response data structure
 */
export const adaptToEstimationResponseData = (formData: FormData): EstimationResponseData => {
  const currentDate = new Date().toISOString();
  
  // Extract project details
  const projectDetails: ProjectDetails = {
    projectType: ensureString(formData.projectType || 'construction'),
    surface: ensureNumber(formData.surface),
    location: ensureString(formData.location || ''),
    constructionType: ensureString(formData.constructionType || 'standard'),
    bedrooms: ensureNumber(formData.bedrooms),
    bathrooms: ensureNumber(formData.bathrooms),
    city: ensureString(formData.city || '')
  };
  
  // Calculate construction costs based on form data
  const constructionCosts: ConstructionCosts = calculateConstructionCosts(formData);
  
  // Calculate fee costs based on construction costs
  const fees: FeeCosts = calculateFeeCosts(constructionCosts.total, formData);
  
  // Calculate other costs
  const otherCosts: OtherCosts = calculateOtherCosts(formData);
  
  // Calculate total amount
  const totalAmount = constructionCosts.total + fees.total + otherCosts.total;
  
  // Generate timeline estimation
  const timeline: EstimationTimeline = generateTimeline(formData);
  
  // Generate categories for reporting
  const categories = generateCostCategories(constructionCosts, fees, otherCosts);
  
  return {
    projectType: ensureString(formData.projectType || 'construction'),
    projectDetails,
    estimatedCost: constructionCosts.total,
    constructionCosts,
    fees,
    otherCosts,
    totalAmount,
    dateGenerated: currentDate,
    isComplete: true,
    timeline,
    categories
  };
};

/**
 * Create an updater function that handles type conversion
 */
export const createTypeAdaptingUpdater = (updateFn: (data: any) => void) => {
  return (data: any) => {
    // Convert numeric fields
    const adaptedData = { ...data };
    
    // Process number fields
    ['surface', 'bedrooms', 'bathrooms', 'budget'].forEach(field => {
      if (field in adaptedData) {
        adaptedData[field] = ensureNumber(adaptedData[field]);
      }
    });
    
    // Process boolean fields
    ['termsAccepted', 'commercialAccepted', 'formCompleted'].forEach(field => {
      if (field in adaptedData) {
        adaptedData[field] = ensureBoolean(adaptedData[field]);
      }
    });
    
    // Process string fields
    ['firstName', 'lastName', 'email', 'phone', 'city', 'projectDescription', 
     'projectType', 'projectPurpose', 'location', 'constructionType'].forEach(field => {
      if (field in adaptedData) {
        adaptedData[field] = ensureString(adaptedData[field]);
      }
    });
    
    // Call the original update function with converted data
    updateFn(adaptedData);
  };
};

// Helper functions for cost calculations

const calculateConstructionCosts = (formData: FormData): ConstructionCosts => {
  const surface = ensureNumber(formData.surface);
  const constructionType = ensureString(formData.constructionType);
  
  // Base rates per square meter depending on construction type
  let structuralRate = 800; // Default
  let finishingRate = 600; // Default
  let technicalRate = 300; // Default
  let externalRate = 200; // Default
  
  // Adjust rates based on construction type
  if (constructionType === 'luxury') {
    structuralRate = 1200;
    finishingRate = 1000;
    technicalRate = 500;
    externalRate = 400;
  } else if (constructionType === 'eco') {
    structuralRate = 900;
    finishingRate = 700;
    technicalRate = 400;
    externalRate = 250;
  }
  
  // Calculate costs based on surface and rates
  const structuralWork = surface * structuralRate;
  const finishingWork = surface * finishingRate;
  const technicalLots = surface * technicalRate;
  const externalWorks = surface * externalRate;
  
  // Total construction cost
  const total = structuralWork + finishingWork + technicalLots + externalWorks;
  
  return {
    structuralWork,
    finishingWork,
    technicalLots,
    externalWorks,
    total
  };
};

const calculateFeeCosts = (constructionTotal: number, formData: FormData): FeeCosts => {
  // Calculate fee percentages based on construction cost
  const architectFeesPercent = 0.09; // 9%
  const engineeringFeesPercent = 0.05; // 5%
  const projectManagementPercent = 0.06; // 6%
  const officialFeesPercent = 0.02; // 2%
  const inspectionFeesPercent = 0.03; // 3%
  const technicalStudiesPercent = 0.04; // 4%
  const permitsPercent = 0.02; // 2%
  const insurancePercent = 0.03; // 3%
  const contingencyPercent = 0.05; // 5%
  const taxesPercent = 0.20; // 20% VAT
  const otherPercent = 0.01; // 1%
  
  // Calculate actual fees
  const architectFees = constructionTotal * architectFeesPercent;
  const engineeringFees = constructionTotal * engineeringFeesPercent;
  const projectManagement = constructionTotal * projectManagementPercent;
  const officialFees = constructionTotal * officialFeesPercent;
  const inspectionFees = constructionTotal * inspectionFeesPercent;
  const technicalStudies = constructionTotal * technicalStudiesPercent;
  const permits = constructionTotal * permitsPercent;
  const insurance = constructionTotal * insurancePercent;
  const contingency = constructionTotal * contingencyPercent;
  const taxes = constructionTotal * taxesPercent;
  const other = constructionTotal * otherPercent;
  
  // Total fees
  const total = architectFees + engineeringFees + projectManagement + officialFees +
                inspectionFees + technicalStudies + permits + insurance +
                contingency + taxes + other;
  
  return {
    architectFees,
    engineeringFees,
    projectManagement,
    officialFees,
    inspectionFees,
    technicalStudies,
    permits,
    insurance,
    contingency,
    taxes,
    other,
    total
  };
};

const calculateOtherCosts = (formData: FormData): OtherCosts => {
  const constructionType = ensureString(formData.constructionType);
  const surface = ensureNumber(formData.surface);
  
  // Base land cost per square meter
  let landCostPerSqm = 500; // Default
  
  // Adjust land cost based on construction type
  if (constructionType === 'luxury') {
    landCostPerSqm = 1000;
  } else if (constructionType === 'eco') {
    landCostPerSqm = 400;
  }
  
  // Calculate costs
  const land = landCostPerSqm * surface; // Land cost is typically based on the surface area
  const demolition = 0; // Default to 0, typically specified separately
  const siteDevelopment = surface * 100; // Site development is typically based on the surface area
  const insurance = surface * 20;
  const contingency = surface * 50;
  const taxes = (land + siteDevelopment) * 0.05; // 5% of land and site development costs
  const miscellaneous = surface * 30;
  
  // Total other costs
  const total = land + demolition + siteDevelopment + insurance + contingency + taxes + miscellaneous;
  
  return {
    land,
    demolition,
    siteDevelopment,
    insurance,
    contingency,
    taxes,
    miscellaneous,
    total
  };
};

const generateTimeline = (formData: FormData): EstimationTimeline => {
  const surface = ensureNumber(formData.surface);
  const constructionType = ensureString(formData.constructionType);
  
  // Base timeline in weeks
  let designWeeks = 4;
  let permitsWeeks = 12;
  let biddingWeeks = 4;
  let constructionWeeks = 24;
  
  // Adjust timeline based on construction type and surface
  if (constructionType === 'luxury') {
    designWeeks = 8;
    constructionWeeks = 40;
  } else if (constructionType === 'eco') {
    designWeeks = 6;
    constructionWeeks = 30;
  }
  
  // Adjust for surface area
  if (surface > 200) {
    constructionWeeks += 8;
    designWeeks += 2;
  } else if (surface < 100) {
    constructionWeeks -= 4;
    designWeeks -= 1;
  }
  
  // Total timeline in weeks
  const total = designWeeks + permitsWeeks + biddingWeeks + constructionWeeks;
  
  // Convert weeks to months (approximately 4.33 weeks per month)
  const totalMonths = Math.ceil(total / 4.33);
  
  return {
    design: designWeeks,
    permits: permitsWeeks,
    bidding: biddingWeeks,
    construction: constructionWeeks,
    total,
    totalMonths
  };
};

const generateCostCategories = (
  constructionCosts: ConstructionCosts,
  fees: FeeCosts,
  otherCosts: OtherCosts
) => {
  const totalCost = constructionCosts.total + fees.total + otherCosts.total;
  
  // Create categories for each major cost component
  return [
    {
      name: 'Gros œuvre',
      cost: constructionCosts.structuralWork,
      percentage: (constructionCosts.structuralWork / totalCost) * 100,
      category: 'construction'
    },
    {
      name: 'Second œuvre',
      cost: constructionCosts.finishingWork,
      percentage: (constructionCosts.finishingWork / totalCost) * 100,
      category: 'construction'
    },
    {
      name: 'Lots techniques',
      cost: constructionCosts.technicalLots,
      percentage: (constructionCosts.technicalLots / totalCost) * 100,
      category: 'construction'
    },
    {
      name: 'Aménagements extérieurs',
      cost: constructionCosts.externalWorks,
      percentage: (constructionCosts.externalWorks / totalCost) * 100,
      category: 'construction'
    },
    {
      name: 'Honoraires',
      cost: fees.total,
      percentage: (fees.total / totalCost) * 100,
      category: 'fees'
    },
    {
      name: 'Frais annexes',
      cost: otherCosts.total,
      percentage: (otherCosts.total / totalCost) * 100,
      category: 'other'
    }
  ];
};
