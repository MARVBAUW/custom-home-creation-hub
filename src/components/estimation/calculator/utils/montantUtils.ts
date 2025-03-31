
// Utility functions for calculating different costs in the estimation process

// Common utility to ensure numerical values
export const ensureNumber = (value: string | number | undefined | null): number => {
  if (value === undefined || value === null) return 0;
  if (typeof value === 'number') return value;
  return parseFloat(value) || 0;
};

// Basic surface cost calculations
export const calculateBaseSurfaceCost = (surface: string | number, baseRate: number): number => {
  return ensureNumber(surface) * baseRate;
};

// Construction-specific costs
export const calculateStructuralWorkCost = (surface: string | number, quality: string = 'standard'): number => {
  const base = ensureNumber(surface) * (quality === 'premium' ? 700 : quality === 'luxury' ? 900 : 500);
  return Math.round(base);
};

// Masonry wall calculation
export const calculateMasonryWallCost = (area: string | number, type: string = 'standard'): number => {
  const base = ensureNumber(area) * (type === 'premium' ? 180 : type === 'luxury' ? 250 : 120);
  return Math.round(base);
};

// Floor construction calculation
export const calculateFloorCost = (area: string | number, type: string = 'BETON'): number => {
  const base = ensureNumber(area) * (type === 'BOIS' ? 150 : 200);
  return Math.round(base);
};

// Structural feature calculation
export const calculateStructuralFeatureCost = (
  features: string[] | string | undefined, 
  values: Record<string, string | number> = {}
): number => {
  if (!features) return 0;
  
  const featureList = Array.isArray(features) ? features : [features];
  return featureList.reduce((total, feature) => {
    const value = ensureNumber(values[feature] || 0);
    switch (feature) {
      case 'beam': return total + value * 150;
      case 'column': return total + value * 200;
      case 'arch': return total + value * 300;
      case 'staircase': return total + value * 2500;
      default: return total;
    }
  }, 0);
};

// Roofing calculation
export const calculateRoofingCost = (area: string | number, type: string = 'standard'): number => {
  const base = ensureNumber(area) * (
    type === 'tile' ? 120 :
    type === 'slate' ? 180 :
    type === 'metal' ? 100 :
    type === 'flat' ? 150 : 120
  );
  return Math.round(base);
};

// Roof framework calculation for renovation
export const calculateRoofFrameworkRenovCost = (area: string | number, type: string = 'standard'): number => {
  const base = ensureNumber(area) * (
    type === 'complex' ? 250 :
    type === 'simple' ? 150 : 200
  );
  return Math.round(base);
};

// Roofing renovation calculation
export const calculateRoofingRenovCost = (area: string | number, type: string = 'standard'): number => {
  const base = ensureNumber(area) * (
    type === 'tile' ? 150 :
    type === 'slate' ? 210 :
    type === 'metal' ? 120 :
    type === 'flat' ? 180 : 150
  );
  return Math.round(base);
};

// Facade calculation
export const calculateDetailedFacadeCost = (area: string | number, type: string = 'standard'): number => {
  const base = ensureNumber(area) * (
    type === 'painted' ? 60 :
    type === 'stone' ? 200 :
    type === 'brick' ? 150 :
    type === 'wood' ? 180 : 100
  );
  return Math.round(base);
};

// Windows calculation
export const calculateWindowsCost = (area: string | number, type: string = 'standard'): number => {
  const base = ensureNumber(area) * (
    type === 'double-glazed' ? 350 :
    type === 'triple-glazed' ? 500 :
    type === 'aluminum' ? 600 :
    type === 'pvc' ? 300 : 400
  );
  return Math.round(base);
};

// Isolation calculation
export const calculateIsolationCost = (area: string | number, type: string = 'standard'): number => {
  const base = ensureNumber(area) * (
    type === 'high-performance' ? 80 :
    type === 'ecological' ? 100 :
    type === 'standard' ? 60 : 70
  );
  return Math.round(base);
};

// Plumbing calculation
export const calculatePlumbingCost = (surface: string | number, quality: string = 'standard'): number => {
  const base = ensureNumber(surface) * (
    quality === 'premium' ? 120 :
    quality === 'luxury' ? 180 : 80
  );
  return Math.round(base);
};

// Electricity calculation
export const calculateElectricityCost = (surface: string | number, quality: string = 'standard'): number => {
  const base = ensureNumber(surface) * (
    quality === 'premium' ? 100 :
    quality === 'luxury' ? 150 : 70
  );
  return Math.round(base);
};

// Heating calculation
export const calculateHeatingCost = (surface: string | number, type: string = 'standard'): number => {
  const base = ensureNumber(surface) * (
    type === 'heat-pump' ? 180 :
    type === 'geothermal' ? 250 :
    type === 'solar' ? 200 :
    type === 'gas' ? 120 : 100
  );
  return Math.round(base);
};

// Air conditioning calculation
export const calculateAirConditioningCost = (surface: string | number): number => {
  return ensureNumber(surface) * 100;
};

// Plastering calculation
export const calculatePlasteringCost = (surface: string | number, quality: string = 'standard'): number => {
  const base = ensureNumber(surface) * (
    quality === 'premium' ? 60 :
    quality === 'luxury' ? 90 : 40
  );
  return Math.round(base);
};

// Interior carpentry calculation
export const calculateInteriorCarpenteryCost = (doorCount: string | number, type: string = 'standard'): number => {
  const count = ensureNumber(doorCount);
  const unitPrice = 
    type === 'premium' ? 600 :
    type === 'luxury' ? 1000 : 400;
  return count * unitPrice;
};

// Soft flooring calculation (parquet, carpet, vinyl)
export const calculateSoftFloorCost = (area: string | number, type: string = 'standard'): number => {
  const base = ensureNumber(area) * (
    type === 'parquet' ? 90 :
    type === 'carpet' ? 40 :
    type === 'vinyl' ? 30 : 60
  );
  return Math.round(base);
};

// Hard flooring calculation (tile, stone)
export const calculateHardFloorCost = (area: string | number, type: string = 'standard'): number => {
  const base = ensureNumber(area) * (
    type === 'ceramic' ? 80 :
    type === 'porcelain' ? 100 :
    type === 'stone' ? 150 :
    type === 'marble' ? 200 : 90
  );
  return Math.round(base);
};

// Painting calculation
export const calculatePaintingCost = (area: string | number, quality: string = 'standard'): number => {
  const base = ensureNumber(area) * (
    quality === 'premium' ? 35 :
    quality === 'luxury' ? 50 : 25
  );
  return Math.round(base);
};

// Kitchen calculation
export const calculateKitchenCost = (type: string = 'standard'): number => {
  return type === 'premium' ? 12000 :
    type === 'luxury' ? 25000 : 6000;
};

// Bathroom calculation
export const calculateBathroomCost = (type: string = 'standard', count: string | number = 1): number => {
  const unitPrice = 
    type === 'premium' ? 8000 :
    type === 'luxury' ? 15000 : 5000;
  return ensureNumber(count) * unitPrice;
};

// Pool calculation
export const calculatePoolCost = (area: string | number, type: string = 'standard'): number => {
  const base = ensureNumber(area) * (
    type === 'in-ground' ? 1500 :
    type === 'infinity' ? 2500 :
    type === 'indoor' ? 3000 : 1200
  );
  return Math.round(base);
};

// Pool heating calculation
export const calculatePoolHeatingCost = (area: string | number, type: string = 'standard'): number => {
  const base = ensureNumber(area) * (
    type === 'heat-pump' ? 150 :
    type === 'solar' ? 120 : 100
  );
  return Math.round(base);
};

// Terrace calculation
export const calculateTerraceCost = (area: string | number, type: string = 'standard'): number => {
  const base = ensureNumber(area) * (
    type === 'wood' ? 200 :
    type === 'composite' ? 250 :
    type === 'stone' ? 180 :
    type === 'concrete' ? 120 : 150
  );
  return Math.round(base);
};

// Carport calculation
export const calculateCarportCost = (type: string = 'standard'): number => {
  return type === 'premium' ? 8000 :
    type === 'luxury' ? 12000 : 5000;
};

// Fencing calculation
export const calculateFencingCost = (length: string | number, type: string = 'standard'): number => {
  const base = ensureNumber(length) * (
    type === 'wood' ? 120 :
    type === 'metal' ? 150 :
    type === 'vinyl' ? 100 : 80
  );
  return Math.round(base);
};

// Gate calculation
export const calculateGateCost = (length: string | number, type: string = 'standard'): number => {
  const base = ensureNumber(length) * (
    type === 'automatic' ? 2000 :
    type === 'manual' ? 1000 : 1500
  );
  return Math.round(base);
};

// Landscaping calculation
export const calculateLandscapingCost = (area: string | number, type: string = 'standard'): number => {
  const base = ensureNumber(area) * (
    type === 'premium' ? 80 :
    type === 'luxury' ? 120 : 50
  );
  return Math.round(base);
};

// Renewable energy calculation
export const calculateRenewableEnergyCost = (type: string = 'solar-panels', surface: string | number = 0): number => {
  const area = ensureNumber(surface);
  return type === 'solar-panels' ? 15000 + (area * 100) :
    type === 'geothermal' ? 25000 :
    type === 'wind-turbine' ? 20000 : 10000;
};

// Environmental solutions calculation
export const calculateEnvironmentalSolutionsCost = (
  type: string = 'standard', 
  surface: string | number = 0
): number => {
  const area = ensureNumber(surface);
  return type === 'green-roof' ? area * 150 :
    type === 'rainwater-harvesting' ? 5000 :
    type === 'greywater-system' ? 7000 : 3000;
};

// Calculate a new global amount for project
export const calculateNewMontantT = (formData: any, newItemCost: number): number => {
  // Start with existing montantT or 0
  let montantT = typeof formData.montantT === 'number' 
    ? formData.montantT 
    : (parseFloat(formData.montantT as string) || 0);
  
  // Add the new cost
  montantT += newItemCost;
  
  return montantT;
};
