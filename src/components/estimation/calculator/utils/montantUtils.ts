
import { ensureNumber } from './typeConversions';

/**
 * Calculate roof covering renovation cost
 * @param type Roof type
 * @param area Roof area in m²
 * @returns Cost in euros
 */
export const calculateRoofCoveringRenovCost = (type: string, area: number | string): number => {
  const baseRate = type === 'tuiles' ? 120 : 
                  type === 'ardoise' ? 150 : 
                  type === 'zinc' ? 180 : 
                  type === 'toit-terrasse' ? 200 : 
                  100; // default rate
  
  return baseRate * ensureNumber(area);
};

/**
 * Calculate roof frame renovation cost
 * @param type Roof type
 * @param area Roof area in m²
 * @returns Cost in euros
 */
export const calculateRoofFrameRenovCost = (type: string, area: number | string): number => {
  const baseRate = type === 'bois' ? 200 : 
                  type === 'metal' ? 250 : 
                  type === 'mixte' ? 230 : 
                  180; // default rate
  
  return baseRate * ensureNumber(area);
};

/**
 * Alias for calculateRoofFrameRenovCost for compatibility
 */
export const calculateRoofFrameworkRenovCost = calculateRoofFrameRenovCost;

/**
 * Calculate façade renovation cost
 * @param facadeType Facade type
 * @param area Facade area in m²
 * @returns Cost in euros
 */
export const calculateFacadeRenovCost = (facadeType: string, area: number | string): number => {
  const baseRate = facadeType === 'enduit' ? 80 : 
                  facadeType === 'pierre' ? 140 : 
                  facadeType === 'brique' ? 110 : 
                  facadeType === 'bois' ? 120 : 
                  90; // default rate
  
  return baseRate * ensureNumber(area);
};

/**
 * Calculate grosses-oeuvres renovation cost
 * @param type Type of work
 * @param area Area in m²
 * @returns Cost in euros
 */
export const calculateGrosOeuvreRenovCost = (type: string, area: number | string): number => {
  const baseRate = type === 'mur-porteur' ? 350 : 
                  type === 'fondation' ? 450 : 
                  type === 'dalle' ? 200 : 
                  300; // default rate
  
  return baseRate * ensureNumber(area);
};

/**
 * Calculate electrical installation cost
 * @param surface Surface in m²
 * @returns Cost in euros
 */
export const calculateElectricalCost = (surface: number | string): number => {
  return 85 * ensureNumber(surface);
};

/**
 * Calculate plumbing installation cost
 * @param bathroomCount Number of bathrooms
 * @param kitchenCount Number of kitchens
 * @returns Cost in euros
 */
export const calculatePlumbingCost = (bathroomCount: number | string, kitchenCount: number | string): number => {
  return (3500 * ensureNumber(bathroomCount)) + (2000 * ensureNumber(kitchenCount));
};

/**
 * Calculate heating system cost
 * @param type Heating system type
 * @param surface Surface in m²
 * @returns Cost in euros
 */
export const calculateHeatingCost = (type: string, surface: number | string): number => {
  const baseRate = type === 'gaz' ? 100 : 
                  type === 'electrique' ? 80 : 
                  type === 'pompe-chaleur' ? 150 : 
                  type === 'chauffage-solaire' ? 200 : 
                  120; // default rate
  
  return baseRate * ensureNumber(surface);
};

/**
 * Calculate roof cost
 * @param type Roof type
 * @param surface Surface in m²
 * @returns Cost in euros
 */
export const calculateRoofCost = (type: string, surface: number | string): number => {
  const baseRate = type === 'tuiles' ? 150 : 
                  type === 'ardoise' ? 200 : 
                  type === 'zinc' ? 180 : 
                  type === 'toit-terrasse' ? 220 : 
                  160; // default rate
  
  return baseRate * ensureNumber(surface);
};

/**
 * Calculate tile flooring cost
 * @param type Tile type
 * @param surface Surface in m²
 * @returns Cost in euros
 */
export const calculateTileFlooringCost = (type: string, surface: number | string): number => {
  const baseRate = type === 'ceramique' ? 80 : 
                  type === 'gres' ? 100 : 
                  type === 'pierre' ? 150 : 
                  type === 'marbre' ? 200 : 
                  90; // default rate
  
  return baseRate * ensureNumber(surface);
};

// Additional functions required by various form components
/**
 * Calculate kitchen cost
 * @param type Kitchen type
 * @returns Cost in euros
 */
export const calculateKitchenCost = (type: string): number => {
  switch(type) {
    case 'standard': return 5000;
    case 'premium': return 12000;
    case 'luxury': return 25000;
    default: return 5000;
  }
};

/**
 * Calculate demolition cost
 * @param type Type of demolition
 * @param area Area in m²
 * @param percentage Percentage of the area to be demolished (0-100)
 * @returns Cost in euros
 */
export const calculateDemolitionCost = (type: string, area: number | string, percentage: number | string = 100): number => {
  const baseRate = type === 'GROS OEUVRE (MACONNERIE, DALLE..)' ? 300 :
                  type === 'REVETEMENT DE FACADE' ? 70 :
                  type === 'PLATRERIE' ? 40 :
                  type === 'REVETEMENTS DE SOL' ? 30 :
                  type === 'MENUISERIES INTERIEURES' ? 50 :
                  type === 'MENUISERIES EXTERIEURES' ? 60 :
                  type === 'PLOMBERIE' ? 45 :
                  type === 'EQUIPEMENTS SANITAIRES' ? 40 :
                  type === 'ELECTRICITE' ? 35 :
                  type === 'CLIMATISATION' ? 55 :
                  type === 'VENTILATION' ? 45 :
                  type === 'CHAUFFAGE' ? 50 :
                  type === 'TOTALITE HORS GROS OEUVRE' ? 200 :
                  50; // default rate
  
  return baseRate * ensureNumber(area) * (ensureNumber(percentage) / 100);
};

/**
 * Calculate electricity upgrade cost
 * @param surface Surface in m²
 * @param type Type of electrical installation
 * @returns Cost in euros
 */
export const calculateElectricityCost = (surface: number | string, type: string): number => {
  const baseRate = type === 'basic' ? 50 :
                  type === 'standard' ? 80 :
                  type === 'premium' ? 120 :
                  type === 'smart_home' ? 200 :
                  type === 'non_concerne' ? 0 :
                  80; // default rate
  
  return baseRate * ensureNumber(surface);
};

/**
 * Calculate renewable energy cost
 * @param type Type of renewable energy
 * @param currentTotal Current total cost
 * @returns Cost in euros
 */
export const calculateRenewableEnergyCost = (type: string, currentTotal: number | string): number => {
  const totalAmount = ensureNumber(currentTotal);
  
  switch(type) {
    case 'standard': return 0;
    case 'optimized': return totalAmount * 0.035;
    case 'semiAutonomous': return totalAmount * 0.07;
    case 'autonomous': return totalAmount * 0.11;
    default: return 0;
  }
};

/**
 * Calculate air conditioning cost
 * @param type Type of air conditioning system
 * @param surface Surface in m²
 * @returns Cost in euros
 */
export const calculateAirConditioningCost = (type: string, surface: number | string): number => {
  const baseRate = type === 'split' ? 150 :
                  type === 'central' ? 200 :
                  type === 'vrf' ? 250 :
                  type === 'non_concerne' ? 0 :
                  150; // default rate
  
  return baseRate * ensureNumber(surface);
};

/**
 * Calculate landscaping cost
 * @param type Type of landscaping
 * @param area Area in m²
 * @returns Cost in euros
 */
export const calculateLandscapingCost = (type: string, area: number | string): number => {
  const costPerSquareMeter = type === 'UN PEU' ? 40 :
                            type === 'BEAUCOUP' ? 80 :
                            type === 'PASSIONNEMENT' ? 120 :
                            0; // default
  
  return costPerSquareMeter * ensureNumber(area);
};

/**
 * Calculate fencing cost
 * @param length Length in meters
 * @returns Cost in euros
 */
export const calculateFencingCost = (length: number | string): number => {
  return 85 * ensureNumber(length); // Average cost per linear meter
};

/**
 * Calculate gate cost
 * @param length Length in meters
 * @returns Cost in euros
 */
export const calculateGateCost = (length: number | string): number => {
  return 300 * ensureNumber(length); // Base cost plus per-meter cost
};

/**
 * Calculate terrace cost
 * @param area Area in m²
 * @returns Cost in euros
 */
export const calculateTerraceCost = (area: number | string): number => {
  return 200 * ensureNumber(area); // Cost per square meter
};

/**
 * Calculate floor tiling cost
 * @param type Type of floor tile
 * @param percentage Percentage of floor to tile
 * @param surface Total surface area
 * @returns Cost in euros
 */
export const calculateFloorTilingCost = (type: string, percentage: number | string, surface: number | string): number => {
  const tileArea = ensureNumber(surface) * (ensureNumber(percentage) / 100);
  return calculateTileFlooringCost(type, tileArea);
};

/**
 * Calculate wall tiling cost
 * @param type Type of wall tile
 * @param surface Total surface area
 * @returns Cost in euros
 */
export const calculateWallTilingCost = (type: string, surface: number | string): number => {
  const wallArea = ensureNumber(surface) * 0.8; // Approximate wall area based on floor area
  
  const baseRate = type === 'standard' ? 70 :
                  type === 'premium' ? 110 :
                  type === 'luxury' ? 180 :
                  type === 'non_concerne' ? 0 :
                  70; // default rate
  
  return baseRate * wallArea;
};

/**
 * Calculate roofing renovation cost
 * @param type Type of roof
 * @param area Area in m²
 * @returns Cost in euros
 */
export const calculateRoofingRenovCost = (type: string, area: number | string): number => {
  return calculateRoofCoveringRenovCost(type, area);
};

/**
 * Calculate insulation cost
 * @param type Type of insulation
 * @param surface Surface in m²
 * @returns Cost in euros
 */
export const calculateInsulationCost = (type: string, surface: number | string): number => {
  const baseRate = type === 'standard' ? 40 :
                  type === 'premium' ? 70 :
                  type === 'high_performance' ? 100 :
                  type === 'non_concerne' ? 0 :
                  40; // default rate
  
  return baseRate * ensureNumber(surface);
};

/**
 * Calculate windows cost
 * @param type Type of windows
 * @param count Number of windows
 * @returns Cost in euros
 */
export const calculateWindowsCost = (type: string, count: number | string): number => {
  const baseCost = type === 'standard' ? 500 :
                  type === 'premium' ? 800 :
                  type === 'high_performance' ? 1200 :
                  500; // default
  
  return baseCost * ensureNumber(count);
};

/**
 * Calculate interior carpentry cost
 * @param type Type of interior carpentry
 * @param count Number of items
 * @returns Cost in euros
 */
export const calculateInteriorCarpenteryCost = (type: string, count: number | string): number => {
  const baseCost = type === 'standard' ? 400 :
                  type === 'premium' ? 700 :
                  type === 'luxury' ? 1000 :
                  400; // default
  
  return baseCost * ensureNumber(count);
};

/**
 * Calculate parquet flooring cost
 * @param type Type of parquet
 * @param surface Surface in m²
 * @returns Cost in euros
 */
export const calculateParquetCost = (type: string, surface: number | string): number => {
  const baseRate = type === 'standard' ? 60 :
                  type === 'premium' ? 100 :
                  type === 'luxury' ? 150 :
                  60; // default
  
  return baseRate * ensureNumber(surface);
};

/**
 * Calculate soft floor (carpet, vinyl, etc.) cost
 * @param type Type of soft flooring
 * @param surface Surface in m²
 * @returns Cost in euros
 */
export const calculateSoftFloorCost = (type: string, surface: number | string): number => {
  const baseRate = type === 'vinyl' ? 30 :
                  type === 'carpet' ? 40 :
                  type === 'linoleum' ? 35 :
                  30; // default
  
  return baseRate * ensureNumber(surface);
};

/**
 * Calculate painting cost
 * @param type Type of paint
 * @param surface Surface in m²
 * @returns Cost in euros
 */
export const calculatePaintingCost = (type: string, surface: number | string): number => {
  const baseRate = type === 'standard' ? 25 :
                  type === 'premium' ? 40 :
                  type === 'eco' ? 35 :
                  25; // default
  
  return baseRate * ensureNumber(surface) * 2.6; // Approximate wall area based on floor area
};

/**
 * Calculate plastering cost
 * @param type Type of plastering
 * @param surface Surface in m²
 * @returns Cost in euros
 */
export const calculatePlasteringCost = (type: string, surface: number | string): number => {
  const baseRate = type === 'standard' ? 35 :
                  type === 'premium' ? 50 :
                  type === 'decorative' ? 70 :
                  35; // default
  
  return baseRate * ensureNumber(surface) * 2.6; // Approximate wall area based on floor area
};

/**
 * Calculate bathroom cost
 * @param type Type of bathroom
 * @returns Cost in euros
 */
export const calculateBathroomCost = (type: string): number => {
  switch(type) {
    case 'standard': return 6000;
    case 'premium': return 12000;
    case 'luxury': return 20000;
    default: return 6000;
  }
};

/**
 * Calculate environmental solutions cost
 * @param type Type of environmental solution
 * @param surface Surface in m²
 * @returns Cost in euros
 */
export const calculateEnvironmentalSolutionsCost = (type: string, surface: number | string): number => {
  const baseRate = type === 'standard' ? 50 :
                  type === 'advanced' ? 100 :
                  type === 'comprehensive' ? 150 :
                  50; // default
  
  return baseRate * ensureNumber(surface);
};

/**
 * Calculate masonry wall cost
 * @param type Type of wall
 * @param area Area in m²
 * @returns Cost in euros
 */
export const calculateMasonryWallCost = (type: string, area: number | string): number => {
  const baseRate = type === 'brick' ? 180 :
                  type === 'cinder_block' ? 150 :
                  type === 'stone' ? 250 :
                  type === 'concrete' ? 200 :
                  150; // default
  
  return baseRate * ensureNumber(area);
};

/**
 * Calculate floor structure cost
 * @param type Type of floor
 * @param area Area in m²
 * @returns Cost in euros
 */
export const calculateFloorCost = (type: string, area: number | string): number => {
  const baseRate = type === 'concrete' ? 150 :
                  type === 'wood' ? 180 :
                  type === 'composite' ? 200 :
                  150; // default
  
  return baseRate * ensureNumber(area);
};

/**
 * Calculate structural feature cost
 * @param type Type of structural feature
 * @param quantity Quantity of features
 * @returns Cost in euros
 */
export const calculateStructuralFeatureCost = (type: string, quantity: number | string): number => {
  const baseCost = type === 'beam' ? 1000 :
                  type === 'column' ? 800 :
                  type === 'arch' ? 1500 :
                  1000; // default
  
  return baseCost * ensureNumber(quantity);
};
