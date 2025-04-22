
import { FormData } from '../types/formTypes';
import { EstimationResponseData } from '../types/estimationTypes';
import { ensureNumber, ensureString, ensureBoolean } from './typeConversions';

/**
 * Adapt form data to estimation response data
 * @param formData Form data
 * @returns Estimation response data
 */
export const adaptToEstimationResponseData = (formData: FormData): EstimationResponseData => {
  // Calculate basic metrics
  const surface = ensureNumber(formData.surface);
  const constructionType = ensureString(formData.constructionType);
  const projectType = ensureString(formData.projectType);
  const bedrooms = ensureNumber(formData.bedrooms);
  const bathrooms = ensureNumber(formData.bathrooms);
  const location = ensureString(formData.location);
  const city = ensureString(formData.city);
  
  // Create project details
  const projectDetails = {
    projectType,
    surface,
    location,
    constructionType,
    bedrooms,
    bathrooms,
    city
  };
  
  // Calculate estimated cost
  const baseRate = constructionType === 'neuf' ? 1500 : 1200;
  const estimatedCost = surface * baseRate;
  
  // Calculate construction costs
  const structuralWork = estimatedCost * 0.4;
  const finishingWork = estimatedCost * 0.3;
  const technicalLots = estimatedCost * 0.2;
  const externalWorks = estimatedCost * 0.1;
  const constructionCosts = {
    structuralWork,
    finishingWork,
    technicalLots,
    externalWorks,
    total: structuralWork + finishingWork + technicalLots + externalWorks
  };
  
  // Calculate fees
  const architectFees = estimatedCost * 0.08;
  const engineeringFees = estimatedCost * 0.05;
  const projectManagement = estimatedCost * 0.04;
  const officialFees = estimatedCost * 0.02;
  const inspectionFees = estimatedCost * 0.01;
  const technicalStudies = estimatedCost * 0.015;
  const permits = estimatedCost * 0.02;
  const insurance = estimatedCost * 0.02;
  const contingency = estimatedCost * 0.05;
  const taxes = estimatedCost * 0.03;
  const other = estimatedCost * 0.01;
  const feesTotal = architectFees + engineeringFees + projectManagement + officialFees + 
                    inspectionFees + technicalStudies + permits + insurance + 
                    contingency + taxes + other;
  const fees = {
    architect: architectFees,
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
    total: feesTotal
  };
  
  // Calculate other costs
  const land = ensureNumber(formData.landValue, 0);
  const demolition = ensureNumber(formData.demolitionCost, 0);
  const siteDevelopment = ensureNumber(formData.siteDevelopmentCost, 0);
  const otherInsurance = estimatedCost * 0.01;
  const otherContingency = estimatedCost * 0.02;
  const otherTaxes = estimatedCost * 0.01;
  const miscellaneous = estimatedCost * 0.005;
  const otherCostsTotal = land + demolition + siteDevelopment + otherInsurance + 
                          otherContingency + otherTaxes + miscellaneous;
  const otherCosts = {
    land,
    demolition,
    siteDevelopment,
    insurance: otherInsurance,
    contingency: otherContingency,
    taxes: otherTaxes,
    miscellaneous,
    total: otherCostsTotal
  };
  
  // Calculate timeline
  const designMonths = 2;
  const permitsMonths = 3;
  const biddingMonths = 1;
  const constructionMonths = Math.max(6, Math.ceil(surface / 100));
  const totalMonths = designMonths + permitsMonths + biddingMonths + constructionMonths;
  const timeline = {
    design: designMonths,
    permits: permitsMonths,
    bidding: biddingMonths,
    construction: constructionMonths,
    total: totalMonths,
    totalMonths: totalMonths
  };
  
  // Create categories
  const categories = [
    {
      name: "Gros œuvre",
      cost: structuralWork,
      percentage: (structuralWork / estimatedCost) * 100,
      category: "construction",
      amount: structuralWork
    },
    {
      name: "Second œuvre",
      cost: finishingWork,
      percentage: (finishingWork / estimatedCost) * 100,
      category: "construction",
      amount: finishingWork
    },
    {
      name: "Lots techniques",
      cost: technicalLots,
      percentage: (technicalLots / estimatedCost) * 100,
      category: "construction",
      amount: technicalLots
    },
    {
      name: "Aménagements extérieurs",
      cost: externalWorks,
      percentage: (externalWorks / estimatedCost) * 100,
      category: "construction",
      amount: externalWorks
    },
    {
      name: "Honoraires",
      cost: feesTotal,
      percentage: (feesTotal / estimatedCost) * 100,
      category: "fees",
      amount: feesTotal
    }
  ];
  
  // Calculate total amount
  const totalAmount = constructionCosts.total + fees.total + otherCosts.total;
  
  // Create estimation response data
  return {
    projectType,
    projectDetails,
    estimatedCost: {
      total: estimatedCost,
      perSquareMeter: estimatedCost / surface,
      breakdown: {
        materials: estimatedCost * 0.5,
        labor: estimatedCost * 0.4,
        fees: estimatedCost * 0.1
      }
    },
    constructionCosts,
    fees,
    otherCosts,
    totalAmount,
    dateGenerated: new Date().toISOString(),
    isComplete: true,
    timeline,
    categories
  };
};

/**
 * Adapt estimation response data to form data
 * @param estimationData Estimation response data
 * @returns Form data
 */
export const adaptToFormData = (estimationData: EstimationResponseData): FormData => {
  const { projectDetails, constructionCosts, fees, otherCosts, timeline } = estimationData;
  
  return {
    projectType: projectDetails.projectType,
    surface: projectDetails.surface,
    location: projectDetails.location,
    constructionType: projectDetails.constructionType,
    bedrooms: projectDetails.bedrooms,
    bathrooms: projectDetails.bathrooms,
    city: projectDetails.city,
    constructionCosts: JSON.stringify(constructionCosts),
    fees: JSON.stringify(fees),
    otherCosts: JSON.stringify(otherCosts),
    timeline: JSON.stringify(timeline),
    montantT: typeof estimationData.estimatedCost === 'number' 
              ? estimationData.estimatedCost 
              : estimationData.estimatedCost.total
  };
};

/**
 * Convert form data to estimation form data
 * This is a placeholder function that would normally have more implementation details
 */
export const adaptToEstimationFormData = (formData: FormData): FormData => {
  // For now, just return the original form data
  // This function would be expanded based on specific requirements
  return { ...formData };
};
