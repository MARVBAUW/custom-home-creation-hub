
import { FormData } from '../types/formTypes';
import { EstimationResponseData } from '../types/estimationTypes';
import { ensureNumber, ensureString, ensureBoolean } from './typeConversions';

/**
 * Adapts raw form data to properly typed estimation response data
 */
export const adaptToEstimationResponseData = (data: any): EstimationResponseData => {
  return {
    constructionCosts: {
      structuralWork: ensureNumber(data.constructionCosts?.structuralWork),
      finishingWork: ensureNumber(data.constructionCosts?.finishingWork),
      technicalLots: ensureNumber(data.constructionCosts?.technicalLots),
      externalWorks: ensureNumber(data.constructionCosts?.externalWorks),
      total: ensureNumber(data.constructionCosts?.total)
    },
    fees: {
      architect: ensureNumber(data.fees?.architect),
      engineeringFees: ensureNumber(data.fees?.engineeringFees),
      architectFees: ensureNumber(data.fees?.architectFees),
      officialFees: ensureNumber(data.fees?.officialFees),
      inspectionFees: ensureNumber(data.fees?.inspectionFees),
      technicalStudies: ensureNumber(data.fees?.technicalStudies),
      other: ensureNumber(data.fees?.other),
      total: ensureNumber(data.fees?.total)
    },
    otherCosts: {
      insurance: ensureNumber(data.otherCosts?.insurance),
      contingency: ensureNumber(data.otherCosts?.contingency),
      taxes: ensureNumber(data.otherCosts?.taxes),
      miscellaneous: ensureNumber(data.otherCosts?.miscellaneous),
      total: ensureNumber(data.otherCosts?.total)
    },
    totalAmount: ensureNumber(data.totalAmount),
    categories: Array.isArray(data.categories) ? data.categories : [],
    timeline: {
      design: ensureNumber(data.timeline?.design),
      permits: ensureNumber(data.timeline?.permits),
      bidding: ensureNumber(data.timeline?.bidding),
      construction: ensureNumber(data.timeline?.construction),
      total: ensureNumber(data.timeline?.total)
    },
    projectType: ensureString(data.projectType),
    projectDetails: {
      surface: ensureNumber(data.projectDetails?.surface),
      location: ensureString(data.projectDetails?.location || data.city),
      projectType: ensureString(data.projectDetails?.projectType || data.projectType),
      city: ensureString(data.projectDetails?.city || data.city),
      bedrooms: ensureNumber(data.projectDetails?.bedrooms),
      bathrooms: ensureNumber(data.projectDetails?.bathrooms)
    },
    estimatedCost: ensureNumber(data.estimatedCost),
    dateGenerated: ensureString(data.dateGenerated || new Date().toISOString()),
    isComplete: ensureBoolean(data.isComplete)
  };
};

/**
 * Adapts form data between different types or formats
 */
export const adaptFormData = (data: any): FormData => {
  return {
    ...data,
    surface: ensureNumber(data.surface),
    bedrooms: ensureNumber(data.bedrooms),
    bathrooms: ensureNumber(data.bathrooms),
    budget: ensureNumber(data.budget),
    terraceArea: ensureNumber(data.terraceArea),
    landscapingArea: ensureNumber(data.landscapingArea),
    fencingLength: ensureNumber(data.fencingLength),
    gateLength: ensureNumber(data.gateLength),
    stonePercentage: ensureNumber(data.stonePercentage),
    plasterPercentage: ensureNumber(data.plasterPercentage),
    brickPercentage: ensureNumber(data.brickPercentage),
    metalCladdingPercentage: ensureNumber(data.metalCladdingPercentage),
    woodCladdingPercentage: ensureNumber(data.woodCladdingPercentage),
    stoneCladdingPercentage: ensureNumber(data.stoneCladdingPercentage),
    termsAccepted: ensureBoolean(data.termsAccepted),
    commercialAccepted: ensureBoolean(data.commercialAccepted),
    hasElevator: ensureBoolean(data.hasElevator),
    hasHomeAutomation: ensureBoolean(data.hasHomeAutomation),
    hasSecuritySystem: ensureBoolean(data.hasSecuritySystem),
    hasHeatRecovery: ensureBoolean(data.hasHeatRecovery)
  };
};
