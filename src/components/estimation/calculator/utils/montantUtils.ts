
import { ensureNumber } from './typeConversions';

// Export ensureNumber for direct use
export { ensureNumber } from './typeConversions';

/**
 * Convert percentage string to number
 * @param percentageStr Percentage string (e.g., "50%", "50")
 * @returns Percentage as number
 */
export const percentageToNumber = (percentageStr: string | number): number => {
  if (typeof percentageStr === 'number') return percentageStr;
  const cleanStr = String(percentageStr).replace('%', '');
  return parseFloat(cleanStr) || 0;
};

/**
 * Calculate roof covering renovation cost
 * @param type Roof type
 * @param area Roof area in m²
 * @returns Cost in euros
 */
export const calculateRoofCoveringRenovCost = (type: string, area: number | string): number => {
  const baseRate = type === 'TUILES' ? 120 : 
                  type === 'ARDOISES' ? 240 : 
                  type === 'ZINC' ? 180 : 
                  type === 'BACS ACIER' ? 110 : 
                  100; // default rate
  
  return baseRate * ensureNumber(area);
};

// Alias for calculateRoofCoveringRenovCost for compatibility
export const calculateRoofingRenovCost = calculateRoofCoveringRenovCost;

/**
 * Calculate roof frame renovation cost
 * @param type Roof type
 * @param area Roof area in m²
 * @returns Cost in euros
 */
export const calculateRoofFrameRenovCost = (type: string, area: number | string): number => {
  const baseRate = type === 'BOIS' ? 200 : 
                  type === 'METAL' ? 250 : 
                  type === 'MIXTE' ? 230 : 
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
  const baseRate = facadeType === 'ENDUIT' ? 80 : 
                  facadeType === 'PIERRE' ? 140 : 
                  facadeType === 'BRIQUE' ? 110 : 
                  facadeType === 'BOIS' ? 120 : 
                  90; // default rate
  
  return baseRate * ensureNumber(area);
};

// Alias for calculateFacadeRenovCost
export const calculateFacadeCost = calculateFacadeRenovCost;

/**
 * Calculate detailed facade cost based on percentages
 * @param surface Total surface area
 * @param percentages Object with percentages for each material
 * @returns Total cost
 */
export const calculateDetailedFacadeCost = (
  surface: number | string, 
  percentages: { [key: string]: number }
): number => {
  const area = ensureNumber(surface);
  let totalCost = 0;
  
  if (percentages.stone) {
    totalCost += calculateFacadeRenovCost('PIERRE', area * (percentages.stone / 100));
  }
  
  if (percentages.plaster) {
    totalCost += calculateFacadeRenovCost('ENDUIT', area * (percentages.plaster / 100));
  }
  
  if (percentages.brick) {
    totalCost += calculateFacadeRenovCost('BRIQUE', area * (percentages.brick / 100));
  }
  
  if (percentages.metalCladding) {
    totalCost += calculateFacadeRenovCost('METAL', area * (percentages.metalCladding / 100));
  }
  
  if (percentages.woodCladding) {
    totalCost += calculateFacadeRenovCost('BOIS', area * (percentages.woodCladding / 100));
  }
  
  if (percentages.stoneCladding) {
    totalCost += calculateFacadeRenovCost('PIERRE', area * (percentages.stoneCladding / 100));
  }
  
  return totalCost;
};

/**
 * Calculate masonry wall cost
 * @param type Type of wall
 * @param area Area in m²
 * @returns Cost in euros
 */
export const calculateMasonryWallCost = (type: string, area: number | string): number => {
  const baseRate = type === 'BRIQUE' ? 180 : 
                  type === 'PARPAING' ? 150 : 
                  type === 'BETON' ? 200 : 
                  165; // default rate
  
  return baseRate * ensureNumber(area);
};

/**
 * Calculate floor cost
 * @param type Type of floor
 * @param area Area in m²
 * @returns Cost in euros
 */
export const calculateFloorCost = (type: string, area: number | string): number => {
  const baseRate = type === 'BETON' ? 120 : 
                  type === 'BOIS' ? 150 : 
                  type === 'MIXTE' ? 135 : 
                  120; // default rate
  
  return baseRate * ensureNumber(area);
};

/**
 * Calculate structural feature cost
 * @param type Type of structural feature
 * @param quantity Quantity
 * @returns Cost in euros
 */
export const calculateStructuralFeatureCost = (type: string, quantity: number | string): number => {
  const baseRate = type === 'PILIER' ? 500 : 
                  type === 'POUTRE' ? 700 : 
                  type === 'LINTEAU' ? 350 : 
                  500; // default rate
  
  return baseRate * ensureNumber(quantity);
};

/**
 * Calculate grosses-oeuvres renovation cost
 * @param type Type of work
 * @param area Area in m²
 * @returns Cost in euros
 */
export const calculateGrosOeuvreRenovCost = (type: string, area: number | string): number => {
  const baseRate = type === 'MUR PORTEUR' ? 350 : 
                  type === 'FONDATION' ? 450 : 
                  type === 'DALLE' ? 200 : 
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
export const calculatePlumbingCost = (bathroomCount: number | string, kitchenCount: number | string = 1): number => {
  return (3500 * ensureNumber(bathroomCount)) + (2000 * ensureNumber(kitchenCount));
};

/**
 * Calculate heating system cost
 * @param type Heating system type
 * @param surface Surface in m²
 * @returns Cost in euros
 */
export const calculateHeatingCost = (type: string, surface: number | string): number => {
  const baseRate = type === 'standard' ? 100 : 
                  type === 'eco' ? 150 : 
                  type === 'economic' ? 80 : 
                  type === 'sans_avis' ? 100 :
                  type === 'non_concerne' ? 0 :
                  120; // default rate
  
  return baseRate * ensureNumber(surface);
};

/**
 * Calculate air conditioning cost
 * @param hasAirConditioning Whether air conditioning is included
 * @param surface Surface in m²
 * @returns Cost in euros
 */
export const calculateAirConditioningCost = (hasAirConditioning: boolean, surface: number | string): number => {
  if (!hasAirConditioning) return 0;
  return 150 * ensureNumber(surface);
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
 * @param percentage Percentage of the total area
 * @param surface Total surface area
 * @returns Cost in euros
 */
export const calculateFloorTilingCost = (type: string, percentage: number | string, surface: number | string): number => {
  const baseRate = type === 'standard' ? 80 : 
                  type === 'medium' ? 110 : 
                  type === 'premium' ? 150 : 
                  90; // default rate
  
  return baseRate * ensureNumber(surface) * (ensureNumber(percentage) / 100);
};

/**
 * Calculate wall tiling cost
 * @param type Tile type
 * @param surface Surface in m²
 * @returns Cost in euros
 */
export const calculateWallTilingCost = (type: string, surface: number | string): number => {
  const baseRate = type === 'standard' ? 70 : 
                  type === 'premium' ? 100 : 
                  type === 'luxury' ? 150 : 
                  type === 'non_concerne' ? 0 :
                  80; // default rate
  
  // Estimate wall area based on surface and standard room height
  const estimatedWallArea = ensureNumber(surface) * 0.4; // 40% of floor area as estimation
  
  return baseRate * estimatedWallArea;
};

/**
 * Calculate parquet cost
 * @param type Parquet type
 * @param surface Surface in m²
 * @returns Cost in euros
 */
export const calculateParquetCost = (type: string, surface: number | string): number => {
  const baseRate = type === 'standard' ? 60 : 
                  type === 'massif' ? 120 : 
                  type === 'contrecolle' ? 90 : 
                  70; // default rate
  
  return baseRate * ensureNumber(surface);
};

/**
 * Calculate soft floor cost
 * @param type Floor type
 * @param surface Surface in m²
 * @returns Cost in euros
 */
export const calculateSoftFloorCost = (type: string, surface: number | string): number => {
  const baseRate = type === 'moquette' ? 30 : 
                  type === 'linoleum' ? 40 : 
                  type === 'vinyle' ? 35 : 
                  35; // default rate
  
  return baseRate * ensureNumber(surface);
};

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
 * Calculate bathroom cost
 * @param type Bathroom type
 * @returns Cost in euros
 */
export const calculateBathroomCost = (type: string): number => {
  switch(type) {
    case 'standard': return 4000;
    case 'premium': return 9000;
    case 'luxury': return 18000;
    default: return 4000;
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
 * Calculate interior carpentry cost
 * @param doorCount Number of doors
 * @param type Type of carpentry
 * @returns Cost in euros
 */
export const calculateInteriorCarpenteryCost = (doorCount: number | string, type: string): number => {
  const doorRate = type === 'standard' ? 400 :
                  type === 'premium' ? 700 :
                  type === 'luxury' ? 1100 :
                  500; // default rate
  
  return doorRate * ensureNumber(doorCount);
};

/**
 * Calculate windows cost
 * @param windowCount Number of windows
 * @param type Type of windows
 * @returns Cost in euros
 */
export const calculateWindowsCost = (windowCount: number | string, type: string): number => {
  const windowRate = type === 'pvc' ? 600 :
                     type === 'aluminium' ? 800 :
                     type === 'bois' ? 950 :
                     700; // default rate
  
  return windowRate * ensureNumber(windowCount);
};

/**
 * Calculate insulation cost
 * @param surface Surface in m²
 * @param type Type of insulation
 * @returns Cost in euros
 */
export const calculateInsulationCost = (surface: number | string, type: string): number => {
  const baseRate = type === 'standard' ? 60 :
                  type === 'premium' ? 90 :
                  type === 'passive' ? 140 :
                  70; // default rate
  
  return baseRate * ensureNumber(surface);
};

/**
 * Calculate painting cost
 * @param surface Surface in m²
 * @param options Painting options
 * @returns Cost in euros
 */
export const calculatePaintingCost = (surface: number | string, options: string | { [key: string]: number }): number => {
  if (typeof options === 'string') {
    const baseRate = options === 'standard' ? 30 :
                    options === 'premium' ? 45 :
                    options === 'luxury' ? 70 :
                    35; // default rate
    
    return baseRate * ensureNumber(surface);
  } else {
    // If options is an object with percentages
    let totalCost = 0;
    const area = ensureNumber(surface);
    
    if (options.basicPaint) {
      totalCost += 30 * area * (options.basicPaint / 100);
    }
    
    if (options.decorativePaint) {
      totalCost += 45 * area * (options.decorativePaint / 100);
    }
    
    if (options.wallpaper) {
      totalCost += 40 * area * (options.wallpaper / 100);
    }
    
    if (options.woodPaneling) {
      totalCost += 80 * area * (options.woodPaneling / 100);
    }
    
    if (options.stoneCladding) {
      totalCost += 120 * area * (options.stoneCladding / 100);
    }
    
    return totalCost;
  }
};

/**
 * Calculate plastering cost
 * @param surface Surface in m²
 * @param thickness Thickness in cm
 * @returns Cost in euros
 */
export const calculatePlasteringCost = (surface: number | string, thickness: number | string = 1): number => {
  const baseRate = 35; // Base rate per m²
  return baseRate * ensureNumber(surface) * ensureNumber(thickness);
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
 * Calculate environmental solutions cost
 * @param type Type of environmental solution
 * @param surface Surface in m²
 * @returns Cost in euros
 */
export const calculateEnvironmentalSolutionsCost = (type: string, surface: number | string): number => {
  const baseRate = type === 'standard' ? 20 :
                  type === 'advanced' ? 40 :
                  type === 'premium' ? 70 :
                  30; // default rate
  
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
  return 150 * ensureNumber(area); // Average cost per square meter
};

/**
 * Update the montantT value with a new cost
 * @param currentTotal Current total
 * @param additionalCost Additional cost to add
 * @returns Updated total
 */
export const calculateNewMontantT = (currentTotal: number | string, additionalCost: number | string): number => {
  return ensureNumber(currentTotal) + ensureNumber(additionalCost);
};
