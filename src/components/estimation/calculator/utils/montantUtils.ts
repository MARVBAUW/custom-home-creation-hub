
import { ensureNumber, ensureString } from './typeConversions';
import { 
  calculateElectricalCost,
  calculatePlumbingCost,
  calculateHeatingCost,
  calculateAirConditioningCost,
  calculateElectricityCost
} from './calculations/technical';

/**
 * Calculate a new total amount by adding a cost to the existing total
 */
export const calculateNewMontantT = (currentTotal: number | string | undefined, additionalCost: number): number => {
  return ensureNumber(currentTotal, 0) + additionalCost;
};

/**
 * Calculate masonry wall cost
 */
export const calculateMasonryWallCost = (area: number | string): number => {
  const surfaceNum = ensureNumber(area);
  return surfaceNum * 180; // 180€ per square meter
};

/**
 * Calculate floor cost based on type and area
 */
export const calculateFloorCost = (type: string, area: number | string): number => {
  const surfaceNum = ensureNumber(area);
  
  switch (type) {
    case 'BOIS':
      return surfaceNum * 150; // 150€ per square meter for wood floors
    case 'BETON':
      return surfaceNum * 200; // 200€ per square meter for concrete floors
    default:
      return surfaceNum * 180; // Default cost
  }
};

/**
 * Calculate structural feature cost
 */
export const calculateStructuralFeatureCost = (feature: string, value: number | string): number => {
  const valueNum = ensureNumber(value);
  
  switch (feature) {
    case 'RESEAUX EVACUATION A REPRENDRE / TRANCHEE / REBOUCHAGE':
      return valueNum * 120; // 120€ per linear meter
    case 'DEMOLITION MUR PORTEUR':
      return valueNum * 450; // 450€ per square meter
    case 'POSE D\'UN IPN':
      return valueNum * 650; // 650€ per linear meter
    case 'OUVERTURE EN FACADE/MUR PORTEUR':
      return valueNum * 1200; // 1200€ per square meter
    case 'CREATION D\'UNE TREMIE* (ouverture dans un plancher pour accéder à un étage supérieur)':
      return valueNum * 1500; // 1500€ per square meter
    case 'FONDATION SEMELLE':
      return valueNum * 350; // 350€ per linear meter
    case 'FONDATION MASSIF':
      return valueNum * 750; // 750€ per unit
    case 'CHAPE':
      return valueNum * 85; // 85€ per square meter
    case 'RACCORDEMENT SANTAIRE RESEAU URBAIN':
      return valueNum * 180; // 180€ per linear meter
    default:
      return 0;
  }
};

/**
 * Calculate roof framework renovation cost
 */
export const calculateRoofFrameworkRenovCost = (type: string, area: number | string): number => {
  const areaNum = ensureNumber(area);
  
  switch (type) {
    case 'TOITURE TERRASSE ACCESSIBLE':
      return areaNum * 190;
    case 'TOITURE TERRASSE INACCESSIBLE':
      return areaNum * 180;
    case 'CHARPENTE INDUSTRIELLE':
      return areaNum * 160;
    case 'CHARPENTE TRADITIONNELLE':
      return areaNum * 185;
    case 'NON CONCERNE':
      return 0;
    default:
      return 0;
  }
};

/**
 * Calculate roofing renovation cost
 */
export const calculateRoofingRenovCost = (type: string, area: number | string): number => {
  const areaNum = ensureNumber(area);
  
  switch (type) {
    case 'TUILES PLATES':
      return areaNum * 120;
    case 'TUILES MECANIQUES':
      return areaNum * 95;
    case 'ARDOISES':
      return areaNum * 150;
    case 'ZINC':
      return areaNum * 185;
    case 'BACS ACIER':
      return areaNum * 85;
    case 'ETANCHEITE':
      return areaNum * 110;
    case 'NON CONCERNE':
      return 0;
    default:
      return 0;
  }
};

/**
 * Calculate demolition cost
 */
export const calculateDemolitionCost = (types: string[], areas: { [key: string]: string }): number => {
  let totalCost = 0;
  
  // Define cost per square meter for each demolition type
  const costPerType: { [key: string]: number } = {
    'CLOISONS': 45,
    'REVETEMENTS DE SOL': 35,
    'PLAFONDS': 30,
    'MENUISERIES': 150, // per unit
    'APPAREILS SANITAIRES': 200, // per unit
    'INSTALLATIONS ELECTRIQUES': 25,
    'TOTAL': 100 // general demolition rate
  };
  
  // Calculate cost for each type
  types.forEach(type => {
    const area = ensureNumber(areas[type], 0);
    totalCost += area * costPerType[type];
  });
  
  return totalCost;
};

/**
 * Calculate detailed facade cost
 */
export const calculateDetailedFacadeCost = (
  formData: any,
  stonePercentage: string | number,
  plasterPercentage: string | number,
  brickPercentage: string | number,
  metalCladdingPercentage: string | number,
  woodCladdingPercentage: string | number,
  stoneCladdingPercentage: string | number
): number => {
  const surface = ensureNumber(formData.surface, 0);
  
  // Define cost per square meter for each facade type
  const costPerType: { [key: string]: number } = {
    'stone': 350,
    'plaster': 120,
    'brick': 180,
    'metalCladding': 200,
    'woodCladding': 230,
    'stoneCladding': 280
  };
  
  // Calculate area for each type
  const stoneArea = surface * (ensureNumber(stonePercentage) / 100);
  const plasterArea = surface * (ensureNumber(plasterPercentage) / 100);
  const brickArea = surface * (ensureNumber(brickPercentage) / 100);
  const metalCladdingArea = surface * (ensureNumber(metalCladdingPercentage) / 100);
  const woodCladdingArea = surface * (ensureNumber(woodCladdingPercentage) / 100);
  const stoneCladdingArea = surface * (ensureNumber(stoneCladdingPercentage) / 100);
  
  // Calculate cost for each type
  const stoneCost = stoneArea * costPerType['stone'];
  const plasterCost = plasterArea * costPerType['plaster'];
  const brickCost = brickArea * costPerType['brick'];
  const metalCladdingCost = metalCladdingArea * costPerType['metalCladding'];
  const woodCladdingCost = woodCladdingArea * costPerType['woodCladding'];
  const stoneCladdingCost = stoneCladdingArea * costPerType['stoneCladding'];
  
  // Calculate total cost
  return stoneCost + plasterCost + brickCost + metalCladdingCost + woodCladdingCost + stoneCladdingCost;
};

/**
 * Calculate landscaping cost
 */
export const calculateLandscapingCost = (type: string, area: number | string): number => {
  const areaNum = ensureNumber(area);
  
  switch (type) {
    case 'basic':
      return areaNum * 45;
    case 'standard':
      return areaNum * 70;
    case 'premium':
      return areaNum * 120;
    default:
      return 0;
  }
};

/**
 * Calculate fencing cost
 */
export const calculateFencingCost = (length: number | string): number => {
  return ensureNumber(length) * 85; // 85€ per linear meter
};

/**
 * Calculate gate cost
 */
export const calculateGateCost = (length: number | string): number => {
  return ensureNumber(length) * 350; // 350€ per linear meter
};

/**
 * Calculate terrace cost
 */
export const calculateTerraceCost = (area: number | string): number => {
  return ensureNumber(area) * 180; // 180€ per square meter
};

// Re-export technical calculation functions for backward compatibility
export {
  calculateElectricalCost,
  calculateElectricityCost,
  calculatePlumbingCost,
  calculateHeatingCost,
  calculateAirConditioningCost
};

// Add ensureNumber export for backward compatibility
export { ensureNumber };
