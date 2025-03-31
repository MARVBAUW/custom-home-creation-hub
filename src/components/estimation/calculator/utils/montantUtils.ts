
import { FormData } from '../types';
import { ensureNumber } from './typeConversions';

/**
 * Calculate the cost of air conditioning based on surface area and type
 * @param type The type of air conditioning
 * @param surface The surface area in square meters
 * @returns The cost in euros
 */
export const calculateAirConditioningCost = (type: string, surface: number | string): number => {
  const surfaceNum = ensureNumber(surface);
  
  switch (type) {
    case 'split':
      return surfaceNum * 80;
    case 'centralized':
      return surfaceNum * 150;
    case 'vmc_double_flux':
      return surfaceNum * 100;
    case 'high_end':
      return surfaceNum * 200;
    default:
      return 0;
  }
};

/**
 * Calculate the cost of roofing based on type and area
 * @param formData The form data
 * @param roofingType The type of roofing material
 * @returns The cost in euros
 */
export const calculateRoofingCost = (formData: FormData, roofingType: string): number => {
  const surface = ensureNumber(formData.surface);
  
  // Base cost based on roof type
  switch (roofingType) {
    case 'tuiles':
      return surface * 120;
    case 'ardoise':
      return surface * 180;
    case 'zinc':
      return surface * 200;
    case 'bac_acier':
      return surface * 90;
    case 'shingle':
      return surface * 60;
    case 'toit_terrasse':
      return surface * 150;
    default:
      return 0;
  }
};

/**
 * Calculate the cost of facade work based on materials and percentages
 * @param formData The form data
 * @param stonePercentage Percentage of stone facade
 * @param plasterPercentage Percentage of plaster facade
 * @param brickPercentage Percentage of brick facade
 * @param metalCladdingPercentage Percentage of metal cladding
 * @param woodCladdingPercentage Percentage of wood cladding
 * @param stoneCladdingPercentage Percentage of stone cladding
 * @returns The cost in euros
 */
export const calculateFacadeCost = (
  formData: FormData, 
  stonePercentage: number | string = 0,
  plasterPercentage: number | string = 0,
  brickPercentage: number | string = 0,
  metalCladdingPercentage: number | string = 0,
  woodCladdingPercentage: number | string = 0,
  stoneCladdingPercentage: number | string = 0
): number => {
  const surface = ensureNumber(formData.surface);
  
  // Convert percentages to numbers and ensure they're between 0-100
  const stone = Math.min(100, Math.max(0, ensureNumber(stonePercentage)));
  const plaster = Math.min(100, Math.max(0, ensureNumber(plasterPercentage)));
  const brick = Math.min(100, Math.max(0, ensureNumber(brickPercentage)));
  const metal = Math.min(100, Math.max(0, ensureNumber(metalCladdingPercentage)));
  const wood = Math.min(100, Math.max(0, ensureNumber(woodCladdingPercentage)));
  const stoneClad = Math.min(100, Math.max(0, ensureNumber(stoneCladdingPercentage)));
  
  // Calculate cost based on material rates per m²
  const stoneCost = (surface * 0.3) * (stone / 100) * 220;
  const plasterCost = (surface * 0.3) * (plaster / 100) * 80;
  const brickCost = (surface * 0.3) * (brick / 100) * 150;
  const metalCost = (surface * 0.3) * (metal / 100) * 180;
  const woodCost = (surface * 0.3) * (wood / 100) * 170;
  const stoneCladCost = (surface * 0.3) * (stoneClad / 100) * 250;
  
  return stoneCost + plasterCost + brickCost + metalCost + woodCost + stoneCladCost;
};

/**
 * Calculate the cost of windows based on type and area
 * @param formData The form data
 * @param windowType The type of windows
 * @param renovationArea Area of windows to be renovated
 * @param newArea Area of new windows to be installed
 * @returns The cost in euros
 */
export const calculateWindowsCost = (
  formData: FormData,
  windowType: string,
  renovationArea: number | string = 0,
  newArea: number | string = 0
): number => {
  // Convert areas to numbers
  const renArea = ensureNumber(renovationArea);
  const nArea = ensureNumber(newArea);
  
  // Define cost per m² based on window type
  let costPerM2 = 0;
  switch (windowType) {
    case 'bois':
      costPerM2 = 800;
      break;
    case 'pvc':
      costPerM2 = 500;
      break;
    case 'alu':
      costPerM2 = 700;
      break;
    case 'mixte':
      costPerM2 = 900;
      break;
    case 'pvc_colore':
      costPerM2 = 600;
      break;
    default:
      return 0;
  }
  
  // Calculate renovation cost (slightly lower than new installation)
  const renovationCost = renArea * (costPerM2 * 0.8);
  
  // Calculate cost for new installations
  const newCost = nArea * costPerM2;
  
  return renovationCost + newCost;
};

/**
 * Calculate the cost of insulation based on type
 * @param formData The form data
 * @param insulationType The type of insulation
 * @returns The cost in euros
 */
export const calculateInsulationCost = (
  formData: FormData,
  insulationType: string
): number => {
  const surface = ensureNumber(formData.surface);
  
  switch (insulationType) {
    case 'basic':
      return surface * 40;
    case 'standard':
      return surface * 60;
    case 'premium':
      return surface * 90;
    case 'eco_friendly':
      return surface * 110;
    default:
      return 0;
  }
};

/**
 * Calculate the cost of electrical installation
 * @param electricalType The type of electrical installation
 * @param surface The surface area in square meters
 * @returns The cost in euros
 */
export const calculateElectricalCost = (electricalType: string, surface: number): number => {
  const baseCost = {
    'basic': 50,
    'standard': 80,
    'premium': 120,
    'smart_home': 180,
    'non_concerne': 0
  };
  
  const rate = baseCost[electricalType as keyof typeof baseCost] || 0;
  return surface * rate;
};

/**
 * Calculate the cost of plumbing installation
 * @param plumbingType The type of plumbing installation
 * @param surface The surface area in square meters
 * @returns The cost in euros
 */
export const calculatePlumbingCost = (plumbingType: string, surface: number): number => {
  const baseCost = {
    'basic': 40,
    'standard': 60,
    'premium': 90,
    'non_concerne': 0
  };
  
  const rate = baseCost[plumbingType as keyof typeof baseCost] || 0;
  return surface * rate;
};

/**
 * Calculate the cost of heating system
 * @param heatingType The type of heating system
 * @param surface The surface area in square meters
 * @returns The cost in euros
 */
export const calculateHeatingCost = (heatingType: string, surface: number): number => {
  const baseCost = {
    'electric': 50,
    'gas': 80,
    'heat_pump': 150,
    'geothermal': 250,
    'wood': 100,
    'solar': 200,
    'non_concerne': 0
  };
  
  const rate = baseCost[heatingType as keyof typeof baseCost] || 0;
  return surface * rate;
};

/**
 * Calculate the cost of plastering
 * @param plasteringType The type of plastering
 * @param surface The surface area in square meters
 * @returns The cost in euros
 */
export const calculatePlasteringCost = (plasteringType: string, surface: number): number => {
  const baseCost = {
    'basic': 35,
    'standard': 50,
    'premium': 80,
    'non_concerne': 0
  };
  
  const rate = baseCost[plasteringType as keyof typeof baseCost] || 0;
  return surface * rate;
};

/**
 * Calculate the cost of interior doors
 * @param doorType The type of doors
 * @param count The number of doors
 * @returns The cost in euros
 */
export const calculateDoorsCost = (doorType: string, count: number): number => {
  const baseCost = {
    'hollow_core': 250,
    'solid_core': 400,
    'panel': 350,
    'glass': 550,
    'custom': 800,
    'non_concerne': 0
  };
  
  const rate = baseCost[doorType as keyof typeof baseCost] || 0;
  return count * rate;
};

/**
 * Calculate the cost of flooring
 * @param floorType The type of flooring
 * @param area The area in square meters
 * @returns The cost in euros
 */
export const calculateFlooringCost = (floorType: string, area: number): number => {
  const baseCost = {
    'tile': 80,
    'wood': 100,
    'laminate': 40,
    'vinyl': 35,
    'carpet': 30,
    'natural_stone': 150,
    'non_concerne': 0
  };
  
  const rate = baseCost[floorType as keyof typeof baseCost] || 0;
  return area * rate;
};

/**
 * Calculate the cost of painting
 * @param paintType The type of paint
 * @param area The area in square meters
 * @returns The cost in euros
 */
export const calculatePaintingCost = (paintType: string, area: number): number => {
  const baseCost = {
    'basic': 20,
    'premium': 35,
    'eco_friendly': 45,
    'non_concerne': 0
  };
  
  const rate = baseCost[paintType as keyof typeof baseCost] || 0;
  return area * rate;
};

/**
 * Calculate the cost of kitchen installation
 * @param kitchenType The type of kitchen
 * @param surface The surface area of the kitchen in square meters
 * @returns The cost in euros
 */
export const calculateKitchenCost = (kitchenType: string, surface: number): number => {
  const baseCost = {
    'basic': 500,
    'standard': 800,
    'premium': 1200,
    'high_end': 2000,
    'non_concerne': 0
  };
  
  const rate = baseCost[kitchenType as keyof typeof baseCost] || 0;
  return surface * rate;
};

/**
 * Calculate the cost of bathroom installation
 * @param bathroomType The type of bathroom
 * @param count The number of bathrooms
 * @returns The cost in euros
 */
export const calculateBathroomCost = (bathroomType: string, count: number): number => {
  const baseCost = {
    'basic': 3000,
    'standard': 5000,
    'premium': 8000,
    'high_end': 12000,
    'non_concerne': 0
  };
  
  const rate = baseCost[bathroomType as keyof typeof baseCost] || 0;
  return count * rate;
};

/**
 * Calculate the cost of pool installation
 * @param poolType The type of pool
 * @param area The area of the pool in square meters
 * @returns The cost in euros
 */
export const calculatePoolCost = (poolType: string, area: number): number => {
  const baseCost = {
    'inground_concrete': 1200,
    'inground_fiberglass': 900,
    'semi_inground': 600,
    'above_ground': 300,
    'non_concerne': 0
  };
  
  const rate = baseCost[poolType as keyof typeof baseCost] || 0;
  return area * rate;
};

/**
 * Calculate the cost of pool heating system
 * @param heatingType The type of pool heating
 * @param poolArea The area of the pool in square meters
 * @returns The cost in euros
 */
export const calculatePoolHeatingCost = (heatingType: string, poolArea: number): number => {
  const baseCost = {
    'electric': 100,
    'heat_pump': 150,
    'solar': 120,
    'gas': 130,
    'non_concerne': 0
  };
  
  const rate = baseCost[heatingType as keyof typeof baseCost] || 0;
  return poolArea * rate;
};

/**
 * Calculate the cost of carport installation
 * @param carportType The type of carport
 * @param count The number of carports
 * @returns The cost in euros
 */
export const calculateCarportCost = (carportType: string, count: number): number => {
  const baseCost = {
    'metal': 3000,
    'wood': 4000,
    'premium': 6000,
    'non_concerne': 0
  };
  
  const rate = baseCost[carportType as keyof typeof baseCost] || 0;
  return count * rate;
};

/**
 * Calculate the cost of jacuzzi installation
 * @param jacuzziType The type of jacuzzi
 * @param area The area of the jacuzzi in square meters
 * @returns The cost in euros
 */
export const calculateJacuzziCost = (jacuzziType: string, area: number): number => {
  const baseCost = {
    'standard': 5000,
    'premium': 8000,
    'high_end': 12000,
    'non_concerne': 0
  };
  
  const rate = baseCost[jacuzziType as keyof typeof baseCost] || 0;
  return area > 0 ? rate : 0;
};

/**
 * Calculate the cost of demolition
 * @param demolitionType The type of demolition
 * @param area The area to be demolished in square meters
 * @param percentage The percentage of the area to be demolished (0-100)
 * @returns The cost in euros
 */
export const calculateDemolitionCost = (
  demolitionType: string,
  area: number,
  percentage: number = 100
): number => {
  // Ensure percentage is between 0 and 100
  const validPercentage = Math.min(100, Math.max(0, percentage));
  
  // Define base costs per square meter for different demolition types
  const baseCosts: { [key: string]: number } = {
    'GROS OEUVRE (MACONNERIE, DALLE..)': 250,
    'REVETEMENT DE FACADE': 80,
    'PLATRERIE': 40,
    'REVETEMENTS DE SOL': 30,
    'MENUISERIES INTERIEURES': 60,
    'MENUISERIES EXTERIEURES': 80,
    'PLOMBERIE': 70,
    'EQUIPEMENTS SANITAIRES': 150,
    'ELECTRICITE': 50,
    'CLIMATISATION': 100,
    'VENTILATION': 60,
    'CHAUFFAGE': 90,
    'TOTALITE HORS GROS OEUVRE': 400,
    'PAS DE DEMOLITION': 0
  };
  
  // Get the base cost for the specified demolition type
  const baseCost = baseCosts[demolitionType] || 0;
  
  // Calculate the total cost based on area and percentage
  return baseCost * area * (validPercentage / 100);
};

/**
 * Calculate the cost of landscaping
 * @param landscapingType The type of landscaping
 * @param area The area in square meters
 * @returns The cost in euros
 */
export const calculateLandscapingCost = (landscapingType: string, area: number): number => {
  const baseCost = {
    'basic': 30,
    'standard': 50,
    'premium': 80,
    'non_concerne': 0
  };
  
  const rate = baseCost[landscapingType as keyof typeof baseCost] || 0;
  return area * rate;
};

/**
 * Calculate the cost of fencing
 * @param length The length of fencing in meters
 * @returns The cost in euros
 */
export const calculateFencingCost = (length: number): number => {
  // Average cost per meter of fencing
  const costPerMeter = 100;
  return length * costPerMeter;
};

/**
 * Calculate the cost of gate installation
 * @param length The width of the gate in meters
 * @returns The cost in euros
 */
export const calculateGateCost = (length: number): number => {
  // Base cost for a gate
  const baseCost = 1500;
  // Additional cost per meter of gate width
  const additionalCostPerMeter = 300;
  return baseCost + (length * additionalCostPerMeter);
};

/**
 * Calculate the cost of terrace construction
 * @param area The area of the terrace in square meters
 * @returns The cost in euros
 */
export const calculateTerraceCost = (area: number): number => {
  // Average cost per square meter for a terrace
  const costPerSqm = 150;
  return area * costPerSqm;
};
