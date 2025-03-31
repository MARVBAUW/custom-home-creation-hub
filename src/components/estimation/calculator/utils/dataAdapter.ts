
import { EstimationFormData, FormData } from '../types';
import { toBoolean, toNumber, toString } from './typeConversions';

// Convert boolean values to string for certain fields
export const adaptToEstimationFormData = (data: Partial<FormData>): Partial<EstimationFormData> => {
  const result: Partial<EstimationFormData> = { ...data };

  // Convert boolean values to strings where needed
  if (data.createWalls !== undefined) {
    result.createWalls = data.createWalls === true ? "OUI" : 
                        data.createWalls === false ? "NON" : 
                        String(data.createWalls);
  }

  if (data.createFloors !== undefined) {
    result.createFloors = data.createFloors === true ? "OUI" : 
                        data.createFloors === false ? "NON" : 
                        String(data.createFloors);
  }

  // Convert other boolean values to appropriate string representations
  for (const key of [
    'hasSwimmingPool', 'hasTerrace', 'hasSolarPanels',
    'hasGeothermalEnergy', 'hasAirConditioning', 'poolHeating',
    'commercialAccepted'
  ]) {
    if (data[key] !== undefined) {
      result[key] = typeof data[key] === 'boolean' ? 
                   (data[key] === true ? "OUI" : "NON") : 
                   data[key];
    }
  }

  // Handle terassementsViabilisation specifically
  if (data.terassementsViabilisation !== undefined) {
    if (typeof data.terassementsViabilisation === 'boolean') {
      result.terassementsViabilisation = data.terassementsViabilisation ? 1 : 0;
    } else {
      result.terassementsViabilisation = data.terassementsViabilisation;
    }
  }

  // Handle numeric values
  for (const key of [
    'surface', 'budget', 'landPrice', 'landArea', 'roofArea',
    'landscapingArea', 'fencingLength', 'gateLength', 'terraceArea',
    'wallArea', 'floorArea', 'windowRenovationArea', 'windowNewArea',
    'doorCount', 'bathroomCount', 'kitchenCost', 'poolArea',
    'montantT', 'totalAmount'
  ]) {
    if (data[key] !== undefined) {
      result[key] = typeof data[key] === 'number' ? 
                   data[key] : 
                   toString(data[key]);
    }
  }

  return result;
};

// Convert string values to appropriate types
export const adaptToFormData = (data: Partial<EstimationFormData>): Partial<FormData> => {
  const result: Partial<FormData> = { ...data };

  // Convert string OUI/NON values to boolean
  if (data.createWalls !== undefined) {
    result.createWalls = data.createWalls === "OUI" ? true : 
                        data.createWalls === "NON" ? false : 
                        data.createWalls;
  }

  if (data.createFloors !== undefined) {
    result.createFloors = data.createFloors === "OUI" ? true : 
                        data.createFloors === "NON" ? false : 
                        data.createFloors;
  }

  // Convert other string values to boolean
  for (const key of [
    'hasSwimmingPool', 'hasTerrace', 'hasSolarPanels',
    'hasGeothermalEnergy', 'hasAirConditioning', 'poolHeating',
    'commercialAccepted'
  ]) {
    if (data[key] !== undefined) {
      result[key] = data[key] === "OUI" || data[key] === true ? true : 
                   data[key] === "NON" || data[key] === false ? false : 
                   Boolean(data[key]);
    }
  }

  // Handle terassementsViabilisation specifically
  if (data.terassementsViabilisation !== undefined) {
    if (data.terassementsViabilisation === "1" || data.terassementsViabilisation === 1) {
      result.terassementsViabilisation = true;
    } else if (data.terassementsViabilisation === "0" || data.terassementsViabilisation === 0) {
      result.terassementsViabilisation = false;
    } else {
      result.terassementsViabilisation = toNumber(data.terassementsViabilisation);
    }
  }

  // Convert string values to numbers
  for (const key of [
    'surface', 'budget', 'landPrice', 'landArea', 'roofArea',
    'landscapingArea', 'fencingLength', 'gateLength', 'terraceArea',
    'wallArea', 'floorArea', 'windowRenovationArea', 'windowNewArea',
    'doorCount', 'bathroomCount', 'kitchenCost', 'poolArea',
    'montantT', 'totalAmount'
  ]) {
    if (data[key] !== undefined) {
      result[key] = typeof data[key] === 'string' ? 
                   toNumber(data[key]) : 
                   data[key];
    }
  }

  return result;
};

// Create an updater function that ensures type compatibility
export const createTypeAdaptingUpdater = (
  updateFunction: (data: Partial<EstimationFormData>) => void
) => {
  return (data: Partial<FormData>) => {
    const adaptedData = adaptToEstimationFormData(data);
    updateFunction(adaptedData);
  };
};
