import { FormData } from '../types';

// Base function for calculating a new total with a component cost
export const calculateNewMontantT = (currentMontantT: number | undefined, componentCost: number): number => {
  const montantT = currentMontantT || 0;
  return montantT + componentCost;
};

// Generic component cost calculation
export const calculateComponentCost = (
  formData: FormData,
  componentType: string,
  baseCostPerSqm: number
): number => {
  const surface = typeof formData.surface === 'string' ? parseFloat(formData.surface) : (formData.surface || 0);
  
  let costMultiplier = 1;
  
  // Apply quality adjustments
  if (componentType === 'premium') {
    costMultiplier = 1.5;
  } else if (componentType === 'luxury') {
    costMultiplier = 2;
  } else if (componentType === 'economic') {
    costMultiplier = 0.8;
  }
  
  return surface * baseCostPerSqm * costMultiplier;
};

// Calculate facade cost based on percentages
export const calculateFacadeCost = (
  formData: FormData,
  stonePercentage: string | number = 0,
  plasterPercentage: string | number = 0,
  brickPercentage: string | number = 0,
  metalCladdingPercentage: string | number = 0,
  woodCladdingPercentage: string | number = 0,
  stoneCladdingPercentage: string | number = 0
): number => {
  const surface = typeof formData.surface === 'string' ? parseFloat(formData.surface) : (formData.surface || 0);
  
  // Convert percentages to numbers between 0 and 1
  const stonePercent = typeof stonePercentage === 'string' ? parseFloat(stonePercentage) / 100 : (stonePercentage as number) / 100;
  const plasterPercent = typeof plasterPercentage === 'string' ? parseFloat(plasterPercentage) / 100 : (plasterPercentage as number) / 100;
  const brickPercent = typeof brickPercentage === 'string' ? parseFloat(brickPercentage) / 100 : (brickPercentage as number) / 100;
  const metalPercent = typeof metalCladdingPercentage === 'string' ? parseFloat(metalCladdingPercentage) / 100 : (metalCladdingPercentage as number) / 100;
  const woodPercent = typeof woodCladdingPercentage === 'string' ? parseFloat(woodCladdingPercentage) / 100 : (woodCladdingPercentage as number) / 100;
  const stoneCladdingPercent = typeof stoneCladdingPercentage === 'string' ? parseFloat(stoneCladdingPercentage) / 100 : (stoneCladdingPercentage as number) / 100;
  
  // Cost per square meter for each material
  const stoneCost = 250;
  const plasterCost = 120;
  const brickCost = 180;
  const metalCost = 200;
  const woodCost = 220;
  const stoneCladdingCost = 230;
  
  // Calculate facade area (approximately 3 times the floor area for a single-story building)
  const facadeArea = surface * 3;
  
  // Calculate total cost
  const totalCost = facadeArea * (
    stonePercent * stoneCost +
    plasterPercent * plasterCost +
    brickPercent * brickCost +
    metalPercent * metalCost +
    woodPercent * woodCost +
    stoneCladdingPercent * stoneCladdingCost
  );
  
  return totalCost;
};

// Calculate windows cost
export const calculateWindowsCost = (
  formData: FormData,
  windowType: string,
  renovationArea: number | string = 0,
  newArea: number | string = 0
): number => {
  // Convert areas to numbers
  const renovArea = typeof renovationArea === 'string' ? parseFloat(renovationArea) : renovationArea;
  const newWindowArea = typeof newArea === 'string' ? parseFloat(newArea) : newArea;
  
  // Base cost per square meter
  let baseCost = 400;
  
  // Adjust cost based on window type
  if (windowType === 'double') {
    baseCost = 500;
  } else if (windowType === 'triple') {
    baseCost = 700;
  } else if (windowType === 'premium') {
    baseCost = 900;
  }
  
  // Calculate total cost
  const renovationCost = renovArea * baseCost * 1.2; // 20% extra for renovation
  const newCost = newWindowArea * baseCost;
  
  return renovationCost + newCost;
};

// Other utility functions
export const calculateElectricalCost = (formData: FormData, type: string): number => {
  const surface = typeof formData.surface === 'string' ? parseFloat(formData.surface) : (formData.surface || 0);
  let baseCost = 70; // cost per m²
  
  if (type === 'premium') {
    baseCost = 100;
  } else if (type === 'luxury') {
    baseCost = 150;
  } else if (type === 'economic') {
    baseCost = 50;
  }
  
  return surface * baseCost;
};

export const calculatePlumbingCost = (formData: FormData, type: string): number => {
  const surface = typeof formData.surface === 'string' ? parseFloat(formData.surface) : (formData.surface || 0);
  let baseCost = 80; // cost per m²
  
  if (type === 'premium') {
    baseCost = 120;
  } else if (type === 'luxury') {
    baseCost = 180;
  } else if (type === 'economic') {
    baseCost = 60;
  }
  
  return surface * baseCost;
};

export const calculateHeatingCost = (type: string, surface: number): number => {
  let baseCost = 90; // cost per m²
  
  if (type === 'eco') {
    baseCost = 120;
  } else if (type === 'economic') {
    baseCost = 70;
  } else if (type === 'standard') {
    baseCost = 90;
  }
  
  return surface * baseCost;
};

export const calculateAirConditioningCost = (hasAirConditioning: boolean, surface: number): number => {
  if (!hasAirConditioning) {
    return 0;
  }
  
  // Base cost per square meter for air conditioning
  const baseCost = 150;
  
  return surface * baseCost;
};

export const calculateInsulationCost = (formData: FormData, type: string): number => {
  const surface = typeof formData.surface === 'string' ? parseFloat(formData.surface) : (formData.surface || 0);
  let baseCost = 60; // cost per m²
  
  if (type === 'premium') {
    baseCost = 90;
  } else if (type === 'eco') {
    baseCost = 120;
  } else if (type === 'standard') {
    baseCost = 60;
  }
  
  return surface * baseCost;
};

export const calculateRoofingCost = (formData: FormData, type: string): number => {
  const surface = typeof formData.surface === 'string' ? parseFloat(formData.surface) : (formData.surface || 0);
  let baseCost = 100; // cost per m²
  
  if (type === 'premium') {
    baseCost = 150;
  } else if (type === 'slate') {
    baseCost = 200;
  } else if (type === 'tile') {
    baseCost = 100;
  }
  
  return surface * 0.7 * baseCost; // Assume roof area is 70% of floor area
};

export const calculateRoofFrameworkCost = (formData: FormData, type: string): number => {
  const surface = typeof formData.surface === 'string' ? parseFloat(formData.surface) : (formData.surface || 0);
  let baseCost = 120; // cost per m²
  
  if (type === 'complex') {
    baseCost = 180;
  } else if (type === 'simple') {
    baseCost = 120;
  } else if (type === 'flat') {
    baseCost = 100;
  }
  
  return surface * 0.7 * baseCost; // Assume roof area is 70% of floor area
};

export const calculateRoofFrameworkRenovCost = (formData: FormData, type: string, area: number | string): number => {
  const roofArea = typeof area === 'string' ? parseFloat(area) : area;
  let baseCost = 150; // cost per m² for renovation
  
  if (type === 'complex') {
    baseCost = 200;
  } else if (type === 'simple') {
    baseCost = 150;
  } else if (type === 'flat') {
    baseCost = 120;
  }
  
  return roofArea * baseCost;
};

export const calculateRoofingRenovCost = (formData: FormData, type: string, area: number | string): number => {
  const roofingArea = typeof area === 'string' ? parseFloat(area) : area;
  let baseCost = 120; // cost per m² for renovation
  
  if (type === 'premium') {
    baseCost = 180;
  } else if (type === 'slate') {
    baseCost = 240;
  } else if (type === 'tile') {
    baseCost = 120;
  }
  
  return roofingArea * baseCost;
};

export const calculatePaintingCost = (
  formData: FormData, 
  type: string,
  surface: number | string = 0
): number => {
  const surfaceArea = typeof surface === 'string' ? parseFloat(surface) : surface;
  let baseCost = 25; // cost per m²
  
  if (type === 'premium') {
    baseCost = 40;
  } else if (type === 'decorative') {
    baseCost = 60;
  } else if (type === 'standard') {
    baseCost = 25;
  }
  
  return surfaceArea * baseCost;
};

export const calculateTileCost = (formData: FormData, type: string): number => {
  const surface = typeof formData.surface === 'string' ? parseFloat(formData.surface) : (formData.surface || 0);
  let baseCost = 80; // cost per m²
  
  if (type === 'premium') {
    baseCost = 120;
  } else if (type === 'luxury') {
    baseCost = 200;
  } else if (type === 'standard') {
    baseCost = 80;
  }
  
  return surface * 0.4 * baseCost; // Assume tile area is 40% of floor area
};

export const calculateParquetCost = (formData: FormData, type: string): number => {
  const surface = typeof formData.surface === 'string' ? parseFloat(formData.surface) : (formData.surface || 0);
  let baseCost = 100; // cost per m²
  
  if (type === 'premium') {
    baseCost = 150;
  } else if (type === 'luxury') {
    baseCost = 250;
  } else if (type === 'standard') {
    baseCost = 100;
  }
  
  return surface * 0.5 * baseCost; // Assume parquet area is 50% of floor area
};

export const calculateSoftFloorCost = (formData: FormData, type: string): number => {
  const surface = typeof formData.surface === 'string' ? parseFloat(formData.surface) : (formData.surface || 0);
  let baseCost = 40; // cost per m²
  
  if (type === 'premium') {
    baseCost = 70;
  } else if (type === 'luxury') {
    baseCost = 120;
  } else if (type === 'standard') {
    baseCost = 40;
  }
  
  return surface * 0.3 * baseCost; // Assume soft floor area is 30% of floor area
};

// Utility function to convert values to numbers safely
export const ensureNumber = (value: any, defaultValue: number = 0): number => {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? defaultValue : parsed;
  }
  return defaultValue;
};

// Add missing floor tiling cost calculation function
export const calculateFloorTilingCost = (type: string, percentage: number, surface: number): number => {
  let baseCost = 80; // cost per m²
  
  if (type === 'medium') {
    baseCost = 120;
  } else if (type === 'premium') {
    baseCost = 180;
  } else if (type === 'standard') {
    baseCost = 80;
  }
  
  // Calculate area based on percentage
  const area = surface * (percentage / 100);
  
  return area * baseCost;
};

// Add missing wall tiling cost calculation function
export const calculateWallTilingCost = (type: string, surface: number): number => {
  let baseCost = 90; // cost per m²
  
  if (type === 'medium') {
    baseCost = 130;
  } else if (type === 'premium') {
    baseCost = 200;
  } else if (type === 'standard') {
    baseCost = 90;
  }
  
  // Assume bathroom and kitchen walls are about 20% of total surface
  const wallArea = surface * 0.2;
  
  return wallArea * baseCost;
};

// Add missing interior carpentry cost calculation function
export const calculateInteriorCarpenteryCost = (type: string, surface: number): number => {
  let baseCost = 150; // cost per m²
  
  if (type === 'medium') {
    baseCost = 200;
  } else if (type === 'premium') {
    baseCost = 300;
  } else if (type === 'standard') {
    baseCost = 150;
  }
  
  // Assume doors and interior carpentry represent about 15% of total surface
  const carpentryArea = surface * 0.15;
  
  return carpentryArea * baseCost;
};

// Add missing plastering cost calculation function
export const calculatePlasteringCost = (type: string, surface: number): number => {
  let baseCost = 40; // cost per m²
  
  if (type === 'medium') {
    baseCost = 55;
  } else if (type === 'premium') {
    baseCost = 70;
  } else if (type === 'standard') {
    baseCost = 40;
  }
  
  // Assume walls and ceilings represent about 2.5 times the floor area
  const plasterArea = surface * 2.5;
  
  return plasterArea * baseCost;
};

// Additional necessary functions for other components
export const calculateBathroomCost = (type: string, count: number = 1): number => {
  let baseCost = 8000; // cost per bathroom
  
  if (type === 'premium') {
    baseCost = 12000;
  } else if (type === 'luxury') {
    baseCost = 20000;
  } else if (type === 'standard') {
    baseCost = 8000;
  }
  
  return count * baseCost;
};

export const calculateKitchenCost = (type: string): number => {
  let baseCost = 10000; // cost for a standard kitchen
  
  if (type === 'premium') {
    baseCost = 18000;
  } else if (type === 'luxury') {
    baseCost = 30000;
  } else if (type === 'standard') {
    baseCost = 10000;
  }
  
  return baseCost;
};

export const calculatePoolCost = (type: string, area: number = 0): number => {
  let baseCost = 1000; // cost per m²
  
  if (type === 'premium') {
    baseCost = 1500;
  } else if (type === 'infinity') {
    baseCost = 2500;
  } else if (type === 'standard') {
    baseCost = 1000;
  }
  
  return area * baseCost;
};

export const calculateDemolitionCost = (types: string[], area: number = 0): number => {
  let baseCost = 80; // cost per m²
  
  // Add complexity based on demolition types
  if (types.includes('structural')) {
    baseCost += 100;
  }
  if (types.includes('loadbearing')) {
    baseCost += 150;
  }
  if (types.includes('asbestos')) {
    baseCost += 200;
  }
  
  return area * baseCost;
};

// Additional functions needed for other components
export const calculateLandscapingCost = (type: string, area: number = 0): number => {
  let baseCost = 50; // cost per m²
  
  if (type === 'premium') {
    baseCost = 100;
  } else if (type === 'luxury') {
    baseCost = 200;
  } else if (type === 'standard') {
    baseCost = 50;
  }
  
  return area * baseCost;
};

export const calculateFencingCost = (length: number = 0): number => {
  const baseCost = 80; // cost per m
  return length * baseCost;
};

export const calculateGateCost = (length: number = 0): number => {
  const baseCost = 500; // cost per m
  return length * baseCost;
};

export const calculateTerraceCost = (area: number = 0): number => {
  const baseCost = 120; // cost per m²
  return area * baseCost;
};

export const calculateRenewableEnergyCost = (type: string): number => {
  let baseCost = 0;
  
  if (type === 'solar') {
    baseCost = 10000;
  } else if (type === 'geothermal') {
    baseCost = 15000;
  } else if (type === 'wind') {
    baseCost = 8000;
  }
  
  return baseCost;
};

export const calculateEnvironmentalSolutionsCost = (type: string): number => {
  let baseCost = 0;
  
  if (type === 'rainwater') {
    baseCost = 5000;
  } else if (type === 'greywater') {
    baseCost = 7500;
  } else if (type === 'ecoInsulation') {
    baseCost = 5000;
  }
  
  return baseCost;
};

export const calculateMasonryWallCost = (area: number = 0): number => {
  const baseCost = 180; // cost per m²
  return area * baseCost;
};

export const calculateFloorCost = (type: string, area: number = 0): number => {
  let baseCost = 120; // cost per m²
  
  if (type === 'concrete') {
    baseCost = 120;
  } else if (type === 'wood') {
    baseCost = 180;
  } else if (type === 'steel') {
    baseCost = 220;
  }
  
  return area * baseCost;
};

export const calculateStructuralFeatureCost = (features: string[]): number => {
  let totalCost = 0;
  
  features.forEach(feature => {
    switch (feature) {
      case 'beams':
        totalCost += 5000;
        break;
      case 'columns':
        totalCost += 3000;
        break;
      case 'lintels':
        totalCost += 2000;
        break;
      case 'arches':
        totalCost += 4000;
        break;
      default:
        totalCost += 1000; // Default cost for unknown features
    }
  });
  
  return totalCost;
};
