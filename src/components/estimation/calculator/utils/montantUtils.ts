/**
 * Utility functions for cost calculations in the estimation calculator
 */

import { ensureNumber } from './typeConversions';

/**
 * Calculate heating system cost
 * @param surface Surface area in m²
 * @param heatingType Type of heating system
 * @returns Cost in euros
 */
export const calculateHeatingCost = (surface: number, heatingType: string): number => {
  const baseRates: Record<string, number> = {
    'standard': 75,
    'eco': 120,
    'economic': 60,
    'sans_avis': 80,
    'non_concerne': 0
  };
  
  const baseRate = baseRates[heatingType] || 0;
  return baseRate * ensureNumber(surface, 0);
};

/**
 * Calculate air conditioning cost
 * @param hasAirConditioning Whether air conditioning is included
 * @param surface Surface area in m²
 * @returns Cost in euros
 */
export const calculateAirConditioningCost = (hasAirConditioning: boolean, surface: number): number => {
  return hasAirConditioning ? 95 * ensureNumber(surface, 0) : 0;
};

/**
 * Calculate bathroom cost
 * @param bathroomType Type of bathroom
 * @param count Number of bathrooms (default: 1)
 * @returns Cost in euros
 */
export const calculateBathroomCost = (bathroomType: string, count: number = 1): number => {
  const baseRates: Record<string, number> = {
    'standard': 4500,
    'premium': 7500,
    'luxury': 12000
  };
  
  const baseRate = baseRates[bathroomType] || 0;
  return baseRate * ensureNumber(count, 1);
};

/**
 * Calculate floor tiling cost
 * @param tileType Type of floor tile
 * @param percentage Percentage of the surface to be tiled
 * @param surface Total surface area in m²
 * @returns Cost in euros
 */
export const calculateFloorTilingCost = (tileType: string, percentage: number, surface: number): number => {
  const baseRates: Record<string, number> = {
    'standard': 65,
    'medium': 85,
    'premium': 120,
    'non_concerne': 0
  };
  
  const baseRate = baseRates[tileType] || 0;
  const tiledSurface = (ensureNumber(percentage, 0) / 100) * ensureNumber(surface, 0);
  return baseRate * tiledSurface;
};

/**
 * Calculate wall tiling cost
 * @param tileType Type of wall tile
 * @param surface Surface area in m²
 * @returns Cost in euros
 */
export const calculateWallTilingCost = (tileType: string, surface: number): number => {
  const baseRates: Record<string, number> = {
    'standard': 45,
    'premium': 75,
    'luxury': 110,
    'non_concerne': 0
  };
  
  // Wall tiling typically covers about 30% of the total surface
  const baseRate = baseRates[tileType] || 0;
  const wallSurface = 0.3 * ensureNumber(surface, 0);
  return baseRate * wallSurface;
};

/**
 * Calculate roof frame renovation cost
 * @param roofType Type of roof frame
 * @param areaStr Roof area in m² (as string or number)
 * @returns Cost in euros
 */
export const calculateRoofFrameRenovCost = (roofType: string, areaStr: string | number): number => {
  const area = ensureNumber(areaStr, 0);
  const baseRates: Record<string, number> = {
    'TOITURE TERRASSE ACCESSIBLE': 190,
    'TOITURE TERRASSE INACCESSIBLE': 180,
    'CHARPENTE INDUSTRIELLE': 160,
    'CHARPENTE TRADITIONNELLE': 185,
    'NON CONCERNE': 0
  };
  
  const baseRate = baseRates[roofType] || 0;
  return baseRate * area;
};

// Alias for backward compatibility
export const calculateRoofFrameworkRenovCost = calculateRoofFrameRenovCost;

/**
 * Calculate roof covering renovation cost
 * @param roofingType Type of roofing
 * @param areaStr Roof area in m² (as string or number)
 * @returns Cost in euros
 */
export const calculateRoofCoveringRenovCost = (roofingType: string, areaStr: string | number): number => {
  const area = ensureNumber(areaStr, 0);
  const baseRates: Record<string, number> = {
    'TUILES': 120,
    'ARDOISES': 240,
    'ZINC': 180,
    'BACS ACIER': 110,
    'NON CONCERNE': 0
  };
  
  const baseRate = baseRates[roofingType] || 0;
  return baseRate * area;
};

// Alias for backward compatibility
export const calculateRoofingRenovCost = calculateRoofCoveringRenovCost;

/**
 * Calculate kitchen cost
 * @param kitchenType Type of kitchen
 * @param surface Kitchen surface area in m²
 * @returns Cost in euros
 */
export const calculateKitchenCost = (kitchenType: string, surface: number = 10): number => {
  const baseRates: Record<string, number> = {
    'standard': 350,
    'medium': 550,
    'luxury': 850,
    'premium': 1200,
    'non_concerne': 0
  };
  
  const baseRate = baseRates[kitchenType] || 0;
  return baseRate * ensureNumber(surface, 10);
};

/**
 * Calculate demolition cost
 * @param demolitionType Type of demolition
 * @param area Area to demolish in m²
 * @returns Cost in euros
 */
export const calculateDemolitionCost = (demolitionType: string, area: number): number => {
  const baseRates: Record<string, number> = {
    'PARTIELLE': 120,
    'TOTALE': 180,
    'NON CONCERNE': 0
  };
  
  const baseRate = baseRates[demolitionType] || 0;
  return baseRate * ensureNumber(area, 0);
};

/**
 * Calculate electrical system cost
 * @param surface Surface area in m²
 * @param electricalType Type of electrical system
 * @returns Cost in euros
 */
export const calculateElectricalCost = (surface: number, electricalType: string): number => {
  const baseRates: Record<string, number> = {
    'basic': 65,
    'standard': 75,
    'premium': 85,
    'smart_home': 110,
    'non_concerne': 0
  };
  
  const baseRate = baseRates[electricalType] || 0;
  return baseRate * ensureNumber(surface, 0);
};

// Alias for backward compatibility
export const calculateElectricityCost = calculateElectricalCost;

/**
 * Calculate renewable energy system cost
 * @param energyType Type of renewable energy system
 * @param surface Surface area in m²
 * @returns Cost in euros
 */
export const calculateRenewableEnergyCost = (energyType: string, surface: number): number => {
  const baseRates: Record<string, number> = {
    'solar': 350,
    'geothermal': 450,
    'windmill': 500,
    'non_concerne': 0
  };
  
  const baseRate = baseRates[energyType] || 0;
  // For renewable energy, we typically base calculations on a percentage of the total surface
  const relevantSurface = ensureNumber(surface, 0) * 0.5;
  return baseRate * relevantSurface;
};

/**
 * Calculate masonry wall cost
 * @param area Wall area in m²
 * @returns Cost in euros
 */
export const calculateMasonryWallCost = (area: number): number => {
  const baseRate = 210;
  return baseRate * ensureNumber(area, 0);
};

/**
 * Calculate floor cost
 * @param floorType Type of floor
 * @param area Floor area in m²
 * @returns Cost in euros
 */
export const calculateFloorCost = (floorType: string, area: number): number => {
  const baseRates: Record<string, number> = {
    'BOIS': 180,
    'BETON': 150
  };
  
  const baseRate = baseRates[floorType] || 0;
  return baseRate * ensureNumber(area, 0);
};

/**
 * Calculate structural feature cost
 * @param featureType Type of structural feature
 * @param value Quantity or dimension
 * @returns Cost in euros
 */
export const calculateStructuralFeatureCost = (featureType: string, value: number): number => {
  const baseRates: Record<string, number> = {
    'RESEAUX EVACUATION A REPRENDRE / TRANCHEE / REBOUCHAGE': 85,
    'DEMOLITION MUR PORTEUR': 320,
    'POSE D\'UN IPN': 450,
    'OUVERTURE EN FACADE/MUR PORTEUR': 1200,
    'CREATION D\'UNE TREMIE* (ouverture dans un plancher pour accéder à un étage supérieur)': 1500,
    'FONDATION SEMELLE': 110,
    'FONDATION MASSIF': 480,
    'CHAPE': 65,
    'RACCORDEMENT SANTAIRE RESEAU URBAIN': 95
  };
  
  const baseRate = baseRates[featureType] || 0;
  return baseRate * ensureNumber(value, 0);
};

/**
 * Calculate insulation cost
 * @param insulationType Type of insulation
 * @param surface Surface area in m²
 * @returns Cost in euros
 */
export const calculateInsulationCost = (insulationType: string, surface: number): number => {
  const baseRates: Record<string, number> = {
    'standard': 45,
    'premium': 65,
    'luxury': 85,
    'non_concerne': 0
  };
  
  const baseRate = baseRates[insulationType] || 0;
  return baseRate * ensureNumber(surface, 0);
};

/**
 * Calculate windows cost
 * @param windowType Type of windows
 * @param quantity Number of windows
 * @returns Cost in euros
 */
export const calculateWindowsCost = (windowType: string, quantity: number): number => {
  const baseRates: Record<string, number> = {
    'standard': 750,
    'premium': 1100,
    'luxury': 1600,
    'non_concerne': 0
  };
  
  const baseRate = baseRates[windowType] || 0;
  return baseRate * ensureNumber(quantity, 0);
};

/**
 * Calculate interior carpentry cost
 * @param doorCount Number of doors
 * @param carpentryType Type of interior carpentry
 * @returns Cost in euros
 */
export const calculateInteriorCarpenteryCost = (carpentryType: string, doorCount: number): number => {
  const baseRates: Record<string, number> = {
    'standard': 550,
    'premium': 850,
    'luxury': 1200,
    'non_concerne': 0
  };
  
  const baseRate = baseRates[carpentryType] || 0;
  return baseRate * ensureNumber(doorCount, 0);
};

/**
 * Calculate parquet flooring cost
 * @param parquetType Type of parquet
 * @param surface Surface area in m²
 * @returns Cost in euros
 */
export const calculateParquetCost = (parquetType: string, surface: number): number => {
  const baseRates: Record<string, number> = {
    'standard': 65,
    'premium': 95,
    'luxury': 140,
    'non_concerne': 0
  };
  
  const baseRate = baseRates[parquetType] || 0;
  return baseRate * ensureNumber(surface, 0);
};

/**
 * Calculate soft floor covering cost (carpet, vinyl, etc.)
 * @param floorType Type of soft floor covering
 * @param surface Surface area in m²
 * @returns Cost in euros
 */
export const calculateSoftFloorCost = (floorType: string, surface: number): number => {
  const baseRates: Record<string, number> = {
    'vinyl': 35,
    'carpet': 45,
    'linoleum': 40,
    'non_concerne': 0
  };
  
  const baseRate = baseRates[floorType] || 0;
  return baseRate * ensureNumber(surface, 0);
};

/**
 * Calculate painting cost
 * @param paintType Type of paint or wall covering
 * @param surface Surface area in m²
 * @returns Cost in euros
 */
export const calculatePaintingCost = (paintType: string | number, surface: number): number => {
  // If paintType is a number, it's already the cost
  if (typeof paintType === 'number') {
    return paintType * ensureNumber(surface, 0);
  }
  
  // Otherwise, determine based on string type
  const baseRates: Record<string, number> = {
    'basic': 25,
    'premium': 40,
    'luxury': 65,
    'non_concerne': 0
  };
  
  const baseRate = baseRates[paintType] || 0;
  return baseRate * ensureNumber(surface, 0);
};

/**
 * Calculate plastering cost
 * @param surface Surface area in m²
 * @param plasteringType Type of plastering
 * @returns Cost in euros
 */
export const calculatePlasteringCost = (surface: number, plasteringType: string): number => {
  const baseRates: Record<string, number> = {
    'base': 35,
    'standard': 40,
    'premium': 50,
    'specific': 55,
    'advanced': 70,
    'luxury': 75,
    'non_concerne': 0
  };
  
  const baseRate = baseRates[plasteringType] || 0;
  return baseRate * ensureNumber(surface, 0);
};

/**
 * Calculate plumbing cost
 * @param surface Surface area in m²
 * @param plumbingType Type of plumbing
 * @returns Cost in euros
 */
export const calculatePlumbingCost = (surface: number, plumbingType: string): number => {
  const baseRates: Record<string, number> = {
    'standard': 55,
    'premium': 75,
    'luxury': 95,
    'non_concerne': 0
  };
  
  const baseRate = baseRates[plumbingType] || 0;
  return baseRate * ensureNumber(surface, 0);
};

/**
 * Calculate environmental solutions cost
 * @param solutionType Type of environmental solution
 * @param quantity Quantity or dimension
 * @returns Cost in euros
 */
export const calculateEnvironmentalSolutionsCost = (solutionType: string, quantity: number): number => {
  const baseRates: Record<string, number> = {
    'waterHarvesting': 2500,
    'grayWaterRecycling': 3800,
    'greenRoof': 120, // per m²
    'energyEfficiency': 5000,
    'non_concerne': 0
  };
  
  const baseRate = baseRates[solutionType] || 0;
  return baseRate * ensureNumber(quantity, 0);
};

/**
 * Calculate landscaping cost
 * @param landscapingType Type of landscaping
 * @param area Area in m²
 * @returns Cost in euros
 */
export const calculateLandscapingCost = (landscapingType: string, area: number): number => {
  const baseRates: Record<string, number> = {
    'UN PEU': 45,
    'BEAUCOUP': 85,
    'PASSIONNEMENT': 120,
    'PAS DU TOUT': 0
  };
  
  const baseRate = baseRates[landscapingType] || 0;
  return baseRate * ensureNumber(area, 0);
};

/**
 * Calculate fencing cost
 * @param length Length in meters
 * @returns Cost in euros
 */
export const calculateFencingCost = (length: number): number => {
  const baseRate = 85; // per meter
  return baseRate * ensureNumber(length, 0);
};

/**
 * Calculate gate cost
 * @param width Width in meters
 * @returns Cost in euros
 */
export const calculateGateCost = (width: number): number => {
  const baseRate = 750; // per meter of width
  return baseRate * ensureNumber(width, 0);
};

/**
 * Calculate terrace cost
 * @param area Area in m²
 * @returns Cost in euros
 */
export const calculateTerraceCost = (area: number): number => {
  const baseRate = 180; // per m²
  return baseRate * ensureNumber(area, 0);
};

/**
 * Calculate facade renovation cost
 * @param facadeType Type of facade
 * @param surface Surface area in m²
 * @returns Cost in euros
 */
export const calculateFacadeRenovCost = (facadeType: string, surface: number): number => {
  const baseRates: Record<string, number> = {
    'standard': 75,
    'premium': 95,
    'luxury': 120,
    'non_concerne': 0
  };
  
  const baseRate = baseRates[facadeType] || 0;
  return baseRate * ensureNumber(surface, 0);
};

// Alias for backward compatibility
export const calculateFacadeCost = calculateFacadeRenovCost;

/**
 * Calculate detailed facade cost
 * @param formData Form data containing surface information
 * @param stonePercentage Stone percentage
 * @param plasterPercentage Plaster percentage
 * @param brickPercentage Brick percentage
 * @param metalCladdingPercentage Metal cladding percentage
 * @param woodCladdingPercentage Wood cladding percentage
 * @param stoneCladdingPercentage Stone cladding percentage
 * @returns Cost in euros
 */
export const calculateDetailedFacadeCost = (
  formData: any,
  stonePercentage: string,
  plasterPercentage: string,
  brickPercentage: string,
  metalCladdingPercentage: string,
  woodCladdingPercentage: string,
  stoneCladdingPercentage: string
): number => {
  const surface = ensureNumber(formData.surface, 0);
  const rates = {
    stone: 120,
    plaster: 75,
    brick: 95,
    metalCladding: 110,
    woodCladding: 90,
    stoneCladding: 130
  };
  
  let totalCost = 0;
  totalCost += rates.stone * surface * ensureNumber(stonePercentage) / 100;
  totalCost += rates.plaster * surface * ensureNumber(plasterPercentage) / 100;
  totalCost += rates.brick * surface * ensureNumber(brickPercentage) / 100;
  totalCost += rates.metalCladding * surface * ensureNumber(metalCladdingPercentage) / 100;
  totalCost += rates.woodCladding * surface * ensureNumber(woodCladdingPercentage) / 100;
  totalCost += rates.stoneCladding * surface * ensureNumber(stoneCladdingPercentage) / 100;
  
  return totalCost;
};

/**
 * Calculate a new total amount by adding a component cost
 * @param currentTotal Current total amount
 * @param componentCost Additional component cost
 * @returns New total amount
 */
export const calculateNewMontantT = (currentTotal: number, componentCost: number): number => {
  return ensureNumber(currentTotal, 0) + ensureNumber(componentCost, 0);
};

/**
 * Convert a percentage string to a number
 * @param percentage Percentage string (e.g. "50%", "50")
 * @returns Number between 0-100
 */
export const percentageToNumber = (percentage: string): number => {
  if (!percentage) return 0;
  
  // Remove % sign if present
  const cleaned = percentage.replace('%', '');
  const value = parseFloat(cleaned);
  
  if (isNaN(value)) return 0;
  
  // Ensure the value is between 0-100
  return Math.min(100, Math.max(0, value));
};
