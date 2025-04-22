
import { ensureNumber } from './typeConversions';

/**
 * Calculate demolition cost based on type, surface and percentage
 * @param type Type of demolition
 * @param surface Surface area in m²
 * @param percentage Percentage of the surface to demolish
 * @returns Demolition cost in euros
 */
export const calculateDemolitionCost = (type: string, surface: number, percentage: number): number => {
  // Base costs per m² for different demolition types
  const baseCosts: Record<string, number> = {
    'GROS OEUVRE (MACONNERIE, DALLE..)': 120,
    'REVETEMENT DE FACADE': 60,
    'PLATRERIE': 40,
    'REVETEMENTS DE SOL': 45,
    'MENUISERIES INTERIEURES': 80,
    'MENUISERIES EXTERIEURES': 100,
    'PLOMBERIE': 50,
    'EQUIPEMENTS SANITAIRES': 70,
    'ELECTRICITE': 45,
    'CLIMATISATION': 60,
    'VENTILATION': 40,
    'CHAUFFAGE': 55,
    'TOTALITE HORS GROS OEUVRE': 250
  };
  
  // Get the base cost for this type or use a default
  const baseCost = baseCosts[type] || 50;
  
  // Calculate the total cost based on surface and percentage
  const totalSurface = surface * (percentage / 100);
  const totalCost = totalSurface * baseCost;
  
  return Math.round(totalCost);
};

/**
 * Calculate landscape cost based on surface and options
 * @param surface Surface area in m²
 * @param options Landscaping options
 * @returns Landscaping cost in euros
 */
export const calculateLandscapingCost = (surface: number, options: string[]): number => {
  const baseCost = 80; // Base cost per m²
  
  // Apply multipliers based on selected options
  let multiplier = 1.0;
  
  if (options.includes('premium')) multiplier *= 1.5;
  if (options.includes('irrigation')) multiplier *= 1.2;
  if (options.includes('lighting')) multiplier *= 1.3;
  
  return Math.round(surface * baseCost * multiplier);
};

/**
 * Calculate fencing cost based on length and type
 * @param length Length in meters
 * @param type Type of fencing
 * @returns Fencing cost in euros
 */
export const calculateFencingCost = (length: number, type: string): number => {
  // Base costs per meter for different fence types
  const baseCosts: Record<string, number> = {
    'wire': 60,
    'wood': 120,
    'pvc': 150,
    'metal': 200,
    'stone': 350
  };
  
  const baseCost = baseCosts[type] || 100;
  
  return Math.round(length * baseCost);
};

/**
 * Calculate gate cost based on width and type
 * @param width Width in meters
 * @param type Type of gate
 * @returns Gate cost in euros
 */
export const calculateGateCost = (width: number, type: string): number => {
  // Base costs per meter for different gate types
  const baseCosts: Record<string, number> = {
    'simple': 800,
    'sliding': 1500,
    'automatic': 2500,
    'decorative': 3000
  };
  
  const baseCost = baseCosts[type] || 1000;
  
  return Math.round(width * baseCost);
};

/**
 * Calculate terrace cost based on surface and material
 * @param surface Surface area in m²
 * @param material Material type
 * @returns Terrace cost in euros
 */
export const calculateTerraceCost = (surface: number, material: string): number => {
  // Base costs per m² for different terrace materials
  const baseCosts: Record<string, number> = {
    'wood': 180,
    'composite': 250,
    'tiles': 150,
    'stone': 300,
    'concrete': 120
  };
  
  const baseCost = baseCosts[material] || 200;
  
  return Math.round(surface * baseCost);
};

/**
 * Calculate tile flooring cost based on surface and quality
 * @param surface Surface area in m²
 * @param quality Quality level
 * @returns Tile flooring cost in euros
 */
export const calculateTileFlooringCost = (surface: number, quality: string): number => {
  // Base costs per m² for different quality levels
  const baseCosts: Record<string, number> = {
    'basic': 80,
    'standard': 120,
    'premium': 200,
    'luxury': 350
  };
  
  const baseCost = baseCosts[quality] || 120;
  
  return Math.round(surface * baseCost);
};

/**
 * Calculate wall tiling cost based on surface and quality
 * @param surface Surface area in m²
 * @param quality Quality level
 * @returns Wall tiling cost in euros
 */
export const calculateWallTilingCost = (surface: number, quality: string): number => {
  // Base costs per m² for different quality levels
  const baseCosts: Record<string, number> = {
    'basic': 70,
    'standard': 100,
    'premium': 180,
    'luxury': 300
  };
  
  const baseCost = baseCosts[quality] || 100;
  
  return Math.round(surface * baseCost);
};

/**
 * Calculate roof frame renovation cost based on surface and condition
 * @param surface Surface area in m²
 * @param condition Condition of existing frame
 * @returns Roof frame renovation cost in euros
 */
export const calculateRoofFrameRenovCost = (surface: number, condition: string): number => {
  // Base costs per m² for different condition levels
  const baseCosts: Record<string, number> = {
    'good': 80,
    'average': 150,
    'poor': 250,
    'replace': 350
  };
  
  const baseCost = baseCosts[condition] || 150;
  
  return Math.round(surface * baseCost);
};

/**
 * Calculate heating cost based on system type and surface
 * @param type Heating system type
 * @param surface Surface area in m²
 * @returns Heating system cost in euros
 */
export const calculateHeatingCost = (type: string, surface: number): number => {
  // Base costs per m² for different heating systems
  const baseCosts: Record<string, number> = {
    'electric': 100,
    'gas': 150,
    'oil': 180,
    'heat-pump': 250,
    'geothermal': 350,
    'solar': 300,
    'wood': 200
  };
  
  const baseCost = baseCosts[type] || 150;
  const totalCost = surface * baseCost;
  
  // Add fixed equipment costs
  const equipmentCosts: Record<string, number> = {
    'electric': 1000,
    'gas': 3000,
    'oil': 4000,
    'heat-pump': 8000,
    'geothermal': 15000,
    'solar': 10000,
    'wood': 5000
  };
  
  const equipmentCost = equipmentCosts[type] || 3000;
  
  return Math.round(totalCost + equipmentCost);
};

/**
 * Calculate air conditioning cost
 * @param type AC system type
 * @param roomCount Number of rooms
 * @returns Air conditioning cost in euros
 */
export const calculateAirConditioningCost = (type: string, roomCount: number): number => {
  // Base costs per room for different AC systems
  const baseCosts: Record<string, number> = {
    'split': 1200,
    'multi-split': 1500,
    'central': 2500,
    'ducted': 3000
  };
  
  const baseCost = baseCosts[type] || 1500;
  
  return Math.round(roomCount * baseCost);
};

/**
 * Calculate roof covering renovation cost
 * @param surface Surface area in m²
 * @param material Roofing material
 * @returns Roof covering renovation cost in euros
 */
export const calculateRoofCoveringRenovCost = (surface: number, material: string): number => {
  // Base costs per m² for different roofing materials
  const baseCosts: Record<string, number> = {
    'tiles': 120,
    'slate': 180,
    'metal': 140,
    'flat': 200,
    'shingles': 100
  };
  
  const baseCost = baseCosts[material] || 150;
  
  return Math.round(surface * baseCost);
};

/**
 * Calculate kitchen cost based on type and size
 * @param type Kitchen type
 * @param size Kitchen size in m²
 * @returns Kitchen cost in euros
 */
export const calculateKitchenCost = (type: string, size: number): number => {
  // Base costs per m² for different kitchen types
  const baseCosts: Record<string, number> = {
    'basic': 500,
    'standard': 800,
    'premium': 1200,
    'luxury': 2000
  };
  
  const baseCost = baseCosts[type] || 800;
  
  // Calculate base cost based on size
  let totalCost = size * baseCost;
  
  // Add fixed costs for appliances
  const applianceCosts: Record<string, number> = {
    'basic': 2000,
    'standard': 4000,
    'premium': 8000,
    'luxury': 15000
  };
  
  totalCost += applianceCosts[type] || 4000;
  
  return Math.round(totalCost);
};

/**
 * Calculate electrical system cost based on type and surface
 * @param type Electrical system type
 * @param surface Surface area in m²
 * @returns Electrical system cost in euros
 */
export const calculateElectricalCost = (type: string, surface: number): number => {
  // Base costs per m² for different electrical systems
  const baseCosts: Record<string, number> = {
    'basic': 70,
    'standard': 100,
    'smart': 180,
    'luxury': 250
  };
  
  const baseCost = baseCosts[type] || 100;
  
  return Math.round(surface * baseCost);
};

/**
 * Calculate renewable energy system cost
 * @param type Renewable energy system type
 * @param size Size/capacity
 * @returns Renewable energy system cost in euros
 */
export const calculateRenewableEnergyCost = (type: string, size: number): number => {
  // Base costs for different renewable energy systems
  const baseCosts: Record<string, number> = {
    'solar-panels': 1000, // per kW
    'solar-thermal': 800, // per m²
    'wind': 2000, // per kW
    'geothermal': 1500 // per kW
  };
  
  const baseCost = baseCosts[type] || 1000;
  
  return Math.round(size * baseCost);
};

/**
 * Calculate masonry wall cost
 * @param surface Surface area in m²
 * @param type Wall type
 * @returns Masonry wall cost in euros
 */
export const calculateMasonryWallCost = (surface: number, type: string): number => {
  // Base costs per m² for different wall types
  const baseCosts: Record<string, number> = {
    'brick': 150,
    'concrete-block': 120,
    'stone': 300,
    'reinforced-concrete': 200
  };
  
  const baseCost = baseCosts[type] || 150;
  
  return Math.round(surface * baseCost);
};

/**
 * Calculate floor cost
 * @param surface Surface area in m²
 * @param type Floor type
 * @returns Floor cost in euros
 */
export const calculateFloorCost = (surface: number, type: string): number => {
  // Base costs per m² for different floor types
  const baseCosts: Record<string, number> = {
    'concrete': 100,
    'wood': 180,
    'steel': 250,
    'composite': 220
  };
  
  const baseCost = baseCosts[type] || 150;
  
  return Math.round(surface * baseCost);
};

/**
 * Calculate structural feature cost
 * @param type Feature type
 * @param size Size/extent
 * @returns Structural feature cost in euros
 */
export const calculateStructuralFeatureCost = (type: string, size: number): number => {
  // Base costs for different structural features
  const baseCosts: Record<string, number> = {
    'beam': 400, // per meter
    'column': 300, // per unit
    'slab': 200, // per m²
    'foundation': 300 // per m²
  };
  
  const baseCost = baseCosts[type] || 300;
  
  return Math.round(size * baseCost);
};

/**
 * Calculate insulation cost
 * @param surface Surface area in m²
 * @param type Insulation type
 * @returns Insulation cost in euros
 */
export const calculateInsulationCost = (surface: number, type: string): number => {
  // Base costs per m² for different insulation types
  const baseCosts: Record<string, number> = {
    'mineral-wool': 50,
    'foam': 70,
    'cellulose': 60,
    'natural': 80,
    'reflective': 40
  };
  
  const baseCost = baseCosts[type] || 60;
  
  return Math.round(surface * baseCost);
};

/**
 * Calculate windows cost
 * @param count Number of windows
 * @param type Window type
 * @returns Windows cost in euros
 */
export const calculateWindowsCost = (count: number, type: string): number => {
  // Base costs per window for different window types
  const baseCosts: Record<string, number> = {
    'single': 400,
    'double': 800,
    'triple': 1200,
    'aluminum': 1000,
    'wood': 1500,
    'pvc': 700
  };
  
  const baseCost = baseCosts[type] || 800;
  
  return Math.round(count * baseCost);
};

/**
 * Calculate interior carpentry cost
 * @param doorCount Number of doors
 * @param cabinetryArea Cabinetry area in m²
 * @param type Quality type
 * @returns Interior carpentry cost in euros
 */
export const calculateInteriorCarpenteryCost = (doorCount: number, type: string): number => {
  // Base costs for different quality types
  const doorCosts: Record<string, number> = {
    'basic': 300,
    'standard': 500,
    'premium': 800,
    'luxury': 1200
  };
  
  const doorCost = doorCosts[type] || 500;
  
  return Math.round(doorCount * doorCost);
};

/**
 * Calculate parquet flooring cost
 * @param surface Surface area in m²
 * @param type Parquet type
 * @returns Parquet flooring cost in euros
 */
export const calculateParquetCost = (surface: number, type: string): number => {
  // Base costs per m² for different parquet types
  const baseCosts: Record<string, number> = {
    'laminate': 40,
    'engineered': 80,
    'solid': 120,
    'luxury': 200
  };
  
  const baseCost = baseCosts[type] || 80;
  
  return Math.round(surface * baseCost);
};

/**
 * Calculate soft floor covering cost
 * @param surface Surface area in m²
 * @param type Floor covering type
 * @returns Soft floor covering cost in euros
 */
export const calculateSoftFloorCost = (surface: number, type: string): number => {
  // Base costs per m² for different soft floor covering types
  const baseCosts: Record<string, number> = {
    'carpet': 40,
    'vinyl': 30,
    'linoleum': 45,
    'cork': 60
  };
  
  const baseCost = baseCosts[type] || 40;
  
  return Math.round(surface * baseCost);
};

/**
 * Calculate painting cost
 * @param surface Surface area in m²
 * @param type Painting type
 * @returns Painting cost in euros
 */
export const calculatePaintingCost = (surface: number, type: string): number => {
  // Base costs per m² for different painting types
  const baseCosts: Record<string, number> = {
    'basic': 20,
    'premium': 35,
    'decorative': 60,
    'special': 80
  };
  
  const baseCost = baseCosts[type] || 30;
  
  return Math.round(surface * baseCost);
};

/**
 * Calculate plastering cost
 * @param surface Surface area in m²
 * @param type Plastering type
 * @returns Plastering cost in euros
 */
export const calculatePlasteringCost = (surface: number, type: string): number => {
  // Base costs per m² for different plastering types
  const baseCosts: Record<string, number> = {
    'basic': 30,
    'decorative': 50,
    'acoustic': 70,
    'thermal': 60
  };
  
  const baseCost = baseCosts[type] || 40;
  
  return Math.round(surface * baseCost);
};

/**
 * Calculate bathroom cost
 * @param size Bathroom size in m²
 * @param type Bathroom quality
 * @returns Bathroom cost in euros
 */
export const calculateBathroomCost = (size: number): number => {
  // Base cost per m²
  const baseCost = 1200;
  
  // Fixed equipment cost
  const equipmentCost = 5000;
  
  return Math.round(size * baseCost + equipmentCost);
};

/**
 * Calculate environmental solutions cost
 * @param type Solution type
 * @param size Size/capacity
 * @returns Environmental solutions cost in euros
 */
export const calculateEnvironmentalSolutionsCost = (type: string, size: number): number => {
  // Base costs for different environmental solutions
  const baseCosts: Record<string, number> = {
    'green-roof': 150, // per m²
    'rainwater': 3000, // fixed + per m³
    'greywater': 5000, // fixed
    'solar': 1000 // per kW
  };
  
  const baseCost = baseCosts[type] || 3000;
  
  if (type === 'green-roof' || type === 'solar') {
    return Math.round(size * baseCost);
  }
  
  if (type === 'rainwater') {
    return Math.round(baseCost + size * 500);
  }
  
  return baseCost;
};

/**
 * Calculate facade renovation cost
 * @param surface Surface area in m²
 * @param type Facade type
 * @returns Facade renovation cost in euros
 */
export const calculateFacadeRenovCost = (surface: number, type: string): number => {
  // Base costs per m² for different facade types
  const baseCosts: Record<string, number> = {
    'paint': 60,
    'render': 90,
    'cladding': 150,
    'brick': 180,
    'stone': 250
  };
  
  const baseCost = baseCosts[type] || 100;
  
  return Math.round(surface * baseCost);
};

/**
 * Calculate detailed facade cost
 * @param facades Record of facade types and percentages
 * @param totalSurface Total surface area in m²
 * @returns Detailed facade cost breakdown
 */
export const calculateDetailedFacadeCost = (
  facades: Record<string, number>,
  totalSurface: number
): Record<string, number> => {
  const costs: Record<string, number> = {};
  let totalCost = 0;
  
  Object.entries(facades).forEach(([type, percentage]) => {
    const surface = totalSurface * (percentage / 100);
    const cost = calculateFacadeRenovCost(surface, type);
    costs[type] = cost;
    totalCost += cost;
  });
  
  costs.total = totalCost;
  
  return costs;
};

/**
 * Calculate new total amount by adding a cost
 * @param currentTotal Current total amount
 * @param additionalCost Additional cost to add
 * @returns New total amount
 */
export const calculateNewMontantT = (currentTotal: number, additionalCost: number): number => {
  return ensureNumber(currentTotal) + ensureNumber(additionalCost);
};

/**
 * Calculate roof cost
 * @param surface Surface area in m²
 * @param type Roof type
 * @returns Roof cost in euros
 */
export const calculateRoofCost = (surface: number, type: string): number => {
  // Base costs per m² for different roof types
  const baseCosts: Record<string, number> = {
    'flat': 180,
    'pitched': 220,
    'mansard': 280,
    'dome': 350
  };
  
  const baseCost = baseCosts[type] || 220;
  
  return Math.round(surface * baseCost);
};
