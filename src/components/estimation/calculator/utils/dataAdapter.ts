
import { FormData } from '../types/formTypes';
import { EstimationResponseData, ProjectDetails } from '../types/estimationTypes';
import { ensureNumber, ensureBoolean, ensureString, ensureStringArray } from './typeConversions';

/**
 * Adapter function to convert form data to the expected estimation response format
 */
export const adaptToEstimationResponseData = (formData: FormData): EstimationResponseData => {
  // Create project details object
  const projectDetails: ProjectDetails = {
    surface: ensureNumber(formData.surface),
    location: ensureString(formData.city),
    projectType: ensureString(formData.projectType),
    constructionType: ensureString(formData.constructionType)
  };
  
  // Return a minimal valid EstimationResponseData object
  return {
    constructionCosts: {
      structuralWork: ensureNumber(formData.structuralWorkTotal),
      finishingWork: ensureNumber(formData.floorCost),
      technicalLots: 0,
      externalWorks: 0,
      total: ensureNumber(formData.montantT, 0) * 0.7 // Estimate that 70% of total is construction costs
    },
    fees: {
      architect: ensureNumber(formData.montantT, 0) * 0.05,
      engineeringFees: ensureNumber(formData.montantT, 0) * 0.03,
      architectFees: ensureNumber(formData.montantT, 0) * 0.04,
      officialFees: ensureNumber(formData.montantT, 0) * 0.02,
      inspectionFees: ensureNumber(formData.montantT, 0) * 0.01,
      technicalStudies: ensureNumber(formData.montantT, 0) * 0.015,
      other: ensureNumber(formData.montantT, 0) * 0.005,
      total: ensureNumber(formData.montantT, 0) * 0.15 // Estimate that 15% of total is fees
    },
    otherCosts: {
      insurance: ensureNumber(formData.montantT, 0) * 0.03,
      contingency: ensureNumber(formData.montantT, 0) * 0.05,
      taxes: ensureNumber(formData.montantT, 0) * 0.03,
      miscellaneous: ensureNumber(formData.montantT, 0) * 0.04,
      total: ensureNumber(formData.montantT, 0) * 0.15 // Estimate that 15% of total is other costs
    },
    totalAmount: ensureNumber(formData.montantT, 0),
    timeline: {
      design: 2,
      permits: 3,
      bidding: 1,
      construction: 6,
      total: 12
    },
    categories: [
      { category: 'Gros œuvre', amount: ensureNumber(formData.montantT, 0) * 0.3 },
      { category: 'Second œuvre', amount: ensureNumber(formData.montantT, 0) * 0.25 },
      { category: 'Lots techniques', amount: ensureNumber(formData.montantT, 0) * 0.2 },
      { category: 'Finitions', amount: ensureNumber(formData.montantT, 0) * 0.1 },
      { category: 'Honoraires', amount: ensureNumber(formData.montantT, 0) * 0.15 }
    ],
    projectType: ensureString(formData.projectType),
    projectDetails,
    estimatedCost: ensureNumber(formData.montantT, 0),
    dateGenerated: new Date().toISOString(),
    isComplete: ensureBoolean(formData.formCompleted)
  };
};

/**
 * Ensure that all values in the form data are of the correct type
 */
export const adaptFormData = (formData: FormData): FormData => {
  // Create a copy of formData with type conversions
  const adaptedData: any = { ...formData };
  
  // Convert string numbers to actual numbers
  if (adaptedData.surface) adaptedData.surface = ensureNumber(adaptedData.surface);
  if (adaptedData.montantT) adaptedData.montantT = ensureNumber(adaptedData.montantT);
  if (adaptedData.doorCount) adaptedData.doorCount = ensureNumber(adaptedData.doorCount);
  if (adaptedData.bedrooms) adaptedData.bedrooms = ensureNumber(adaptedData.bedrooms);
  if (adaptedData.bathrooms) adaptedData.bathrooms = ensureNumber(adaptedData.bathrooms);
  if (adaptedData.flooringArea) adaptedData.flooringArea = ensureNumber(adaptedData.flooringArea);
  if (adaptedData.paintSurface) adaptedData.paintSurface = ensureNumber(adaptedData.paintSurface);
  if (adaptedData.kitchenSize) adaptedData.kitchenSize = ensureNumber(adaptedData.kitchenSize);
  if (adaptedData.bathroomCount) adaptedData.bathroomCount = ensureNumber(adaptedData.bathroomCount);
  if (adaptedData.terraceArea) adaptedData.terraceArea = ensureNumber(adaptedData.terraceArea);
  if (adaptedData.landscapingArea) adaptedData.landscapingArea = ensureNumber(adaptedData.landscapingArea);
  if (adaptedData.fencingLength) adaptedData.fencingLength = ensureNumber(adaptedData.fencingLength);
  if (adaptedData.gateLength) adaptedData.gateLength = ensureNumber(adaptedData.gateLength);
  if (adaptedData.budget) adaptedData.budget = ensureNumber(adaptedData.budget);
  if (adaptedData.landPrice) adaptedData.landPrice = ensureNumber(adaptedData.landPrice);
  
  // Convert percentage values to numbers
  if (adaptedData.stonePercentage) adaptedData.stonePercentage = ensureNumber(adaptedData.stonePercentage);
  if (adaptedData.plasterPercentage) adaptedData.plasterPercentage = ensureNumber(adaptedData.plasterPercentage);
  if (adaptedData.brickPercentage) adaptedData.brickPercentage = ensureNumber(adaptedData.brickPercentage);
  if (adaptedData.metalCladdingPercentage) adaptedData.metalCladdingPercentage = ensureNumber(adaptedData.metalCladdingPercentage);
  if (adaptedData.woodCladdingPercentage) adaptedData.woodCladdingPercentage = ensureNumber(adaptedData.woodCladdingPercentage);
  if (adaptedData.stoneCladdingPercentage) adaptedData.stoneCladdingPercentage = ensureNumber(adaptedData.stoneCladdingPercentage);
  
  // Convert boolean values
  if (adaptedData.hasAirConditioning !== undefined) adaptedData.hasAirConditioning = ensureBoolean(adaptedData.hasAirConditioning);
  if (adaptedData.hasSmartHome !== undefined) adaptedData.hasSmartHome = ensureBoolean(adaptedData.hasSmartHome);
  if (adaptedData.hasDressingRoom !== undefined) adaptedData.hasDressingRoom = ensureBoolean(adaptedData.hasDressingRoom);
  if (adaptedData.hasCustomClosets !== undefined) adaptedData.hasCustomClosets = ensureBoolean(adaptedData.hasCustomClosets);
  if (adaptedData.hasElevator !== undefined) adaptedData.hasElevator = ensureBoolean(adaptedData.hasElevator);
  if (adaptedData.hasHomeAutomation !== undefined) adaptedData.hasHomeAutomation = ensureBoolean(adaptedData.hasHomeAutomation);
  if (adaptedData.hasSecuritySystem !== undefined) adaptedData.hasSecuritySystem = ensureBoolean(adaptedData.hasSecuritySystem);
  if (adaptedData.hasHeatRecovery !== undefined) adaptedData.hasHeatRecovery = ensureBoolean(adaptedData.hasHeatRecovery);
  if (adaptedData.pool !== undefined) adaptedData.pool = ensureBoolean(adaptedData.pool);
  if (adaptedData.terrace !== undefined) adaptedData.terrace = ensureBoolean(adaptedData.terrace);
  if (adaptedData.outdoorKitchen !== undefined) adaptedData.outdoorKitchen = ensureBoolean(adaptedData.outdoorKitchen);
  if (adaptedData.formCompleted !== undefined) adaptedData.formCompleted = ensureBoolean(adaptedData.formCompleted);
  if (adaptedData.termsAccepted !== undefined) adaptedData.termsAccepted = ensureBoolean(adaptedData.termsAccepted);
  if (adaptedData.commercialAccepted !== undefined) adaptedData.commercialAccepted = ensureBoolean(adaptedData.commercialAccepted);
  
  // Convert arrays
  if (adaptedData.environmentalSolutions) adaptedData.environmentalSolutions = ensureStringArray(adaptedData.environmentalSolutions);
  if (adaptedData.structuralFeatures) adaptedData.structuralFeatures = ensureStringArray(adaptedData.structuralFeatures);
  if (adaptedData.demolitionTypes) adaptedData.demolitionTypes = ensureStringArray(adaptedData.demolitionTypes);
  
  return adaptedData;
};

/**
 * Creates a type-adapting updater function that ensures all data is properly typed
 */
export const createTypeAdaptingUpdater = (
  updateFormData: (data: Partial<FormData>) => void
) => {
  // Return a wrapped function that adapts types before updating
  return (data: Partial<FormData>) => {
    const adaptedData = adaptFormData(data as FormData);
    updateFormData(adaptedData);
  };
};
