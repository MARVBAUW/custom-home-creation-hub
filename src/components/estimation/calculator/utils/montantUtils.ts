
import { ensureNumber } from './typeConversions';

/**
 * Calculate electricity cost based on type and surface
 */
export const calculateElectricityCost = (type: string, surface: number): number => {
  const baseCosts: Record<string, number> = {
    basic: 80,
    standard: 120,
    premium: 160,
    smart_home: 220,
    non_concerne: 0
  };
  
  // Return 0 if type is non_concerne or not found in baseCosts
  if (type === 'non_concerne' || !baseCosts[type]) return 0;
  
  return baseCosts[type] * surface;
};

/**
 * Calculate plumbing cost based on type and surface
 */
export const calculatePlumbingCost = (type: string, surface: number): number => {
  const baseCosts: Record<string, number> = {
    basic: 60,
    standard: 90,
    premium: 130,
    non_concerne: 0
  };
  
  // Return 0 if type is non_concerne or not found in baseCosts
  if (type === 'non_concerne' || !baseCosts[type]) return 0;
  
  return baseCosts[type] * surface;
};

/**
 * Calculate heating cost based on type and surface
 */
export const calculateHeatingCost = (type: string, surface: number): number => {
  const baseCosts: Record<string, number> = {
    electric: 80,
    gas: 100,
    heatPump: 150,
    geothermal: 200,
    wood: 90,
    solar: 180,
    non_concerne: 0
  };
  
  // Return 0 if type is non_concerne or not found in baseCosts
  if (type === 'non_concerne' || !baseCosts[type]) return 0;
  
  return baseCosts[type] * surface;
};

/**
 * Calculate air conditioning cost
 */
export const calculateAirConditioningCost = (hasAirConditioning: boolean, surface: number): number => {
  return hasAirConditioning ? 120 * surface : 0;
};

/**
 * Calculate roof framework renovation cost
 */
export const calculateRoofFrameworkRenovCost = (roofType: string, roofArea: string | number): number => {
  // Convert to number if it's a string
  const area = ensureNumber(roofArea);
  
  const baseCosts: Record<string, number> = {
    'TOITURE TERRASSE ACCESSIBLE': 190,
    'TOITURE TERRASSE INACCESSIBLE': 180,
    'CHARPENTE INDUSTRIELLE': 160,
    'CHARPENTE TRADITIONNELLE': 185,
    'NON CONCERNE': 0
  };
  
  // Return 0 if type is not found in baseCosts
  if (!baseCosts[roofType]) return 0;
  
  return baseCosts[roofType] * area;
};

/**
 * Calculate demolition cost
 */
export const calculateDemolitionCost = (type: string, surface: number, percentage: number): number => {
  const baseCosts: Record<string, number> = {
    'GROS OEUVRE (MACONNERIE, DALLE..)': 150,
    'REVETEMENT DE FACADE': 80,
    'PLATRERIE': 40,
    'REVETEMENTS DE SOL': 35,
    'MENUISERIES INTERIEURES': 50,
    'MENUISERIES EXTERIEURES': 65,
    'PLOMBERIE': 60,
    'EQUIPEMENTS SANITAIRES': 45,
    'ELECTRICITE': 55,
    'CLIMATISATION': 70,
    'VENTILATION': 50,
    'CHAUFFAGE': 65,
    'TOTALITE HORS GROS OEUVRE': 300,
    'PAS DE DEMOLITION': 0
  };
  
  // Return 0 if type is not found in baseCosts
  if (!baseCosts[type]) return 0;
  
  // Calculate cost: basePrice * surface * percentage/100
  return baseCosts[type] * surface * (percentage / 100);
};

/**
 * Calculate landscaping cost
 */
export const calculateLandscapingCost = (type: string, area: number): number => {
  const baseCosts: Record<string, number> = {
    'UN PEU': 40,
    'BEAUCOUP': 80,
    'PASSIONNEMENT': 120,
    'PAS DU TOUT': 0
  };
  
  // Return 0 if type is not found in baseCosts
  if (!baseCosts[type]) return 0;
  
  return baseCosts[type] * area;
};

/**
 * Calculate fencing cost
 */
export const calculateFencingCost = (length: number): number => {
  // Average price per meter for fencing
  const pricePerMeter = 150;
  return pricePerMeter * length;
};

/**
 * Calculate gate cost
 */
export const calculateGateCost = (length: number): number => {
  // Base cost for a gate
  const baseCost = 1200;
  // Additional cost per meter over 3 meters
  const extraPerMeter = 300;
  
  if (length <= 3) return baseCost;
  return baseCost + (length - 3) * extraPerMeter;
};

/**
 * Calculate terrace cost
 */
export const calculateTerraceCost = (area: number): number => {
  // Average price per square meter for a terrace
  const pricePerSqMeter = 180;
  return pricePerSqMeter * area;
};
