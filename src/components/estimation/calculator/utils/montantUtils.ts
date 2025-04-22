
// Utility functions for calculating amounts and costs

/**
 * Calculate plumbing cost based on surface area and plumbing type
 * @param surface Surface area in square meters
 * @param plumbingType Type of plumbing installation
 * @returns Plumbing cost estimate
 */
export const calculatePlumbingCost = (surface: number, plumbingType: string): number => {
  // Base values for plumbing costs per square meter
  const baseCosts = {
    basic: 50,       // Basic plumbing amenities
    standard: 80,    // Standard plumbing with additional points
    premium: 120,    // Premium quality plumbing with optimized networks
    non_concerne: 0  // No plumbing required
  };

  // Get the cost per square meter based on plumbing type
  const costPerSqm = baseCosts[plumbingType as keyof typeof baseCosts] || 0;
  
  // Calculate total cost based on surface area
  // The factor 0.25 adjusts the cost as plumbing doesn't scale linearly with total surface
  return Math.round(surface * costPerSqm * 0.25);
};

/**
 * Calculate heating cost based on surface area and heating type
 * @param surface Surface area in square meters
 * @param heatingType Type of heating system
 * @returns Heating cost estimate
 */
export const calculateHeatingCost = (surface: number, heatingType: string): number => {
  // Base costs for different heating systems per square meter
  const baseCosts = {
    electric: 60,       // Electric heating system
    gas: 80,           // Gas heating system
    heat_pump: 150,    // Heat pump system
    solar: 200,        // Solar heating system
    geothermal: 250,   // Geothermal heating system
    non_concerne: 0    // No heating system required
  };

  // Get the cost per square meter based on heating type
  const costPerSqm = baseCosts[heatingType as keyof typeof baseCosts] || 0;
  
  // Calculate total cost based on surface area
  // The factor 0.3 adjusts the cost as heating doesn't scale linearly with total surface
  return Math.round(surface * costPerSqm * 0.3);
};

/**
 * Calculate air conditioning cost based on whether it's included and surface area
 * @param hasAirConditioning Boolean indicating if air conditioning is requested
 * @param surface Surface area in square meters
 * @returns Air conditioning cost estimate
 */
export const calculateAirConditioningCost = (hasAirConditioning: boolean, surface: number): number => {
  if (!hasAirConditioning) return 0;
  
  // Base cost for air conditioning per square meter
  const baseAcCost = 100;
  
  // Calculate total cost based on surface area
  // The factor 0.4 adjusts the cost as air conditioning doesn't scale linearly with total surface
  return Math.round(surface * baseAcCost * 0.4);
};

/**
 * Helper function to ensure a value is a number
 * @param value Value to convert to number
 * @param defaultValue Default value if conversion fails
 * @returns Number value
 */
export const ensureNumber = (value: any, defaultValue: number = 0): number => {
  if (value === undefined || value === null) return defaultValue;
  const num = Number(value);
  return isNaN(num) ? defaultValue : num;
};

/**
 * Convert percentage to a number (e.g. "50%" -> 0.5)
 * @param percentage Percentage string or number
 * @returns Number representation (0-1)
 */
export const percentageToNumber = (percentage: string | number): number => {
  if (typeof percentage === 'number') return percentage / 100;
  
  if (typeof percentage === 'string') {
    const cleanPercentage = percentage.replace('%', '');
    const num = parseFloat(cleanPercentage);
    if (!isNaN(num)) return num / 100;
  }
  
  return 0;
};

/**
 * Calculate facade cost based on detailed material percentages and surface area
 * @param formData Form data containing surface information
 * @param stonePercentage Percentage of stone facade
 * @param plasterPercentage Percentage of plaster facade
 * @param brickPercentage Percentage of brick facade
 * @param metalCladdingPercentage Percentage of metal cladding
 * @param woodCladdingPercentage Percentage of wood cladding
 * @param stoneCladdingPercentage Percentage of stone cladding
 * @returns Total facade cost
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
  const surface = ensureNumber(formData.surface);
  
  // Convert percentages to numbers (0-1)
  const stone = ensureNumber(stonePercentage) / 100;
  const plaster = ensureNumber(plasterPercentage) / 100;
  const brick = ensureNumber(brickPercentage) / 100;
  const metalCladding = ensureNumber(metalCladdingPercentage) / 100;
  const woodCladding = ensureNumber(woodCladdingPercentage) / 100;
  const stoneCladding = ensureNumber(stoneCladdingPercentage) / 100;
  
  // Base costs per square meter for each material
  const rates = {
    stone: 320,          // Stone facade
    plaster: 120,        // Plaster facade
    brick: 200,          // Brick facade
    metalCladding: 250,  // Metal cladding
    woodCladding: 180,   // Wood cladding
    stoneCladding: 280   // Stone cladding
  };
  
  // Calculate the cost for each material based on percentage and surface
  const stoneCost = stone * surface * rates.stone;
  const plasterCost = plaster * surface * rates.plaster;
  const brickCost = brick * surface * rates.brick;
  const metalCladdingCost = metalCladding * surface * rates.metalCladding;
  const woodCladdingCost = woodCladding * surface * rates.woodCladding;
  const stoneCladdingCost = stoneCladding * surface * rates.stoneCladding;
  
  // Calculate total cost
  const totalCost = stoneCost + plasterCost + brickCost + 
                    metalCladdingCost + woodCladdingCost + stoneCladdingCost;
  
  return Math.round(totalCost);
};

/**
 * Calculate renovation cost for facades
 * @param type Material type
 * @param surface Surface area in square meters
 * @returns Cost estimate
 */
export const calculateFacadeRenovCost = (type: string, surface: number): number => {
  // Base rates for renovation per square meter
  const rates: Record<string, number> = {
    basic: 120,
    standard: 180,
    premium: 240,
    luxury: 320
  };
  
  const rate = rates[type] || 180;
  return Math.round(surface * rate);
};

/**
 * Updates the total amount with a new cost
 * @param currentTotal Current total amount
 * @param newCost Cost to add
 * @returns Updated total amount
 */
export const calculateNewMontantT = (currentTotal: number, newCost: number): number => {
  return ensureNumber(currentTotal) + ensureNumber(newCost);
};

/**
 * Calculate electrical installation cost
 * @param surface Surface area in square meters
 * @param type Type of electrical installation
 * @returns Cost estimate
 */
export const calculateElectricalCost = (surface: number, type: string): number => {
  const rates: Record<string, number> = {
    base: 70,
    advanced: 100,
    premium: 150,
    domotique: 200
  };
  
  const rate = rates[type] || 100;
  return Math.round(surface * rate * 0.4);
};

/**
 * Calculate cost for interior carpentry work
 * @param surface Surface area in square meters
 * @param quality Quality level of carpentry
 * @returns Cost estimate
 */
export const calculateInteriorCarpenteryCost = (surface: number, quality: string): number => {
  const rates: Record<string, number> = {
    basic: 80,
    standard: 120,
    premium: 200
  };
  
  const rate = rates[quality] || 120;
  return Math.round(surface * rate * 0.25);
};

/**
 * Calculate cost for plastering work
 * @param surface Surface area in square meters
 * @param quality Quality level of plastering
 * @returns Cost estimate
 */
export const calculatePlasteringCost = (surface: number, quality: string): number => {
  const rates: Record<string, number> = {
    basic: 40,
    standard: 60,
    premium: 90
  };
  
  const rate = rates[quality] || 60;
  return Math.round(surface * rate * 0.6);
};

/**
 * Calculate cost for parquet flooring
 * @param surface Surface area in square meters
 * @param quality Quality level of parquet
 * @returns Cost estimate
 */
export const calculateParquetCost = (surface: number, quality: string): number => {
  const rates: Record<string, number> = {
    basic: 60,
    standard: 90,
    premium: 150,
    luxury: 250
  };
  
  const rate = rates[quality] || 90;
  return Math.round(surface * rate);
};

/**
 * Calculate cost for soft floor coverings
 * @param surface Surface area in square meters
 * @param type Type of soft floor covering
 * @returns Cost estimate
 */
export const calculateSoftFloorCost = (surface: number, type: string): number => {
  const rates: Record<string, number> = {
    vinyl: 40,
    carpet: 50,
    linoleum: 45
  };
  
  const rate = rates[type] || 45;
  return Math.round(surface * rate);
};

/**
 * Calculate cost for insulation work
 * @param surface Surface area in square meters
 * @param type Type of insulation
 * @returns Cost estimate
 */
export const calculateInsulationCost = (surface: number, type: string): number => {
  const rates: Record<string, number> = {
    base: 40,
    performance: 60,
    ultraPerformance: 90,
    sansAvis: 50
  };
  
  const rate = rates[type] || 50;
  return Math.round(surface * rate);
};

/**
 * Calculate cost for windows
 * @param surface Surface area in square meters
 * @param type Type of windows
 * @returns Cost estimate
 */
export const calculateWindowsCost = (surface: number, type: string): number => {
  const rates: Record<string, number> = {
    pvc: 350,
    aluminum: 500,
    wood: 600,
    mixedMaterial: 650
  };
  
  const rate = rates[type] || 500;
  return Math.round(surface * rate);
};

/**
 * Calculate cost for bathrooms
 * @param count Number of bathrooms
 * @param quality Quality level
 * @returns Cost estimate
 */
export const calculateBathroomCost = (count: number, quality: string): number => {
  const rates: Record<string, number> = {
    basic: 5000,
    standard: 8000,
    premium: 12000,
    luxury: 20000
  };
  
  const rate = rates[quality] || 8000;
  return Math.round(count * rate);
};

/**
 * Calculate cost for painting work
 * @param surface Surface area in square meters
 * @param quality Quality level of paint
 * @returns Cost estimate
 */
export const calculatePaintingCost = (surface: number, quality: string): number => {
  const rates: Record<string, number> = {
    basic: 25,
    standard: 35,
    premium: 50
  };
  
  const rate = rates[quality] || 35;
  return Math.round(surface * rate);
};

/**
 * Calculate cost for kitchen
 * @param surface Surface area in square meters
 * @param quality Quality level of kitchen
 * @returns Cost estimate
 */
export const calculateKitchenCost = (surface: number, quality: string): number => {
  const rates: Record<string, number> = {
    basic: 4000,
    standard: 8000,
    premium: 15000,
    luxury: 25000
  };
  
  const baseRate = rates[quality] || 8000;
  // Adjust based on kitchen size
  const sizeMultiplier = Math.min(Math.max(surface / 10, 0.8), 1.5);
  
  return Math.round(baseRate * sizeMultiplier);
};

/**
 * Calculate cost for floor tiling
 * @param surface Surface area in square meters
 * @param quality Quality level of tiles
 * @returns Cost estimate
 */
export const calculateFloorTilingCost = (surface: number, quality: string): number => {
  const rates: Record<string, number> = {
    basic: 70,
    standard: 100,
    premium: 150,
    luxury: 250
  };
  
  const rate = rates[quality] || 100;
  return Math.round(surface * rate);
};

/**
 * Calculate cost for wall tiling
 * @param surface Surface area in square meters
 * @param quality Quality level of tiles
 * @returns Cost estimate
 */
export const calculateWallTilingCost = (surface: number, quality: string): number => {
  const rates: Record<string, number> = {
    basic: 75,
    standard: 110,
    premium: 160,
    luxury: 260
  };
  
  const rate = rates[quality] || 110;
  return Math.round(surface * rate);
};

/**
 * Calculate cost for demolition work
 * @param surface Surface area in square meters
 * @param type Type of demolition work
 * @returns Cost estimate
 */
export const calculateDemolitionCost = (surface: number, type: string): number => {
  const rates: Record<string, number> = {
    light: 50,
    medium: 100,
    heavy: 200,
    complete: 300
  };
  
  const rate = rates[type] || 100;
  return Math.round(surface * rate);
};

/**
 * Calculate cost for masonry wall work
 * @param surface Surface area in square meters
 * @param type Type of masonry
 * @returns Cost estimate
 */
export const calculateMasonryWallCost = (surface: number, type: string): number => {
  const rates: Record<string, number> = {
    brick: 180,
    concrete: 150,
    stone: 250,
    aac: 140
  };
  
  const rate = rates[type] || 150;
  return Math.round(surface * rate);
};

/**
 * Calculate cost for floor work
 * @param surface Surface area in square meters
 * @param type Type of floor
 * @returns Cost estimate
 */
export const calculateFloorCost = (surface: number, type: string): number => {
  const rates: Record<string, number> = {
    concrete: 90,
    wood: 150,
    composite: 120
  };
  
  const rate = rates[type] || 100;
  return Math.round(surface * rate);
};

/**
 * Calculate cost for structural features
 * @param type Type of structural feature
 * @param count Number of features
 * @returns Cost estimate
 */
export const calculateStructuralFeatureCost = (type: string, count: number): number => {
  const rates: Record<string, number> = {
    beam: 1500,
    column: 800,
    arch: 2000,
    opening: 1200
  };
  
  const rate = rates[type] || 1000;
  return Math.round(count * rate);
};

/**
 * Calculate cost for roof framework renovation
 * @param type Type of renovation
 * @param surface Surface area in square meters
 * @returns Cost estimate
 */
export const calculateRoofFrameworkRenovCost = (type: string, surface: number): number => {
  const rates: Record<string, number> = {
    light: 100,
    medium: 150,
    heavy: 200,
    complete: 300
  };
  
  const rate = rates[type] || 150;
  return Math.round(surface * rate);
};

/**
 * Calculate cost for roof covering renovation
 * @param type Type of roof covering
 * @param surface Surface area in square meters
 * @returns Cost estimate
 */
export const calculateRoofCoveringRenovCost = (type: string, surface: number): number => {
  const rates: Record<string, number> = {
    tuile_plate: 160,
    tuile_ronde: 167,
    ardoise: 240,
    zinc: 190,
    chaume: 230,
    bac_acier: 85
  };
  
  const rate = rates[type] || 160;
  return Math.round(surface * rate);
};

/**
 * Calculate cost for environmental solutions
 * @param type Type of environmental solution
 * @param surface Surface area in square meters
 * @returns Cost estimate
 */
export const calculateEnvironmentalSolutionsCost = (type: string, surface: number): number => {
  const rates: Record<string, number> = {
    rainwater: 5000,
    solarPanels: 15000,
    greenRoof: 200,
    compost: 1000
  };
  
  if (type === "greenRoof") {
    return Math.round(surface * rates[type]);
  }
  
  return rates[type] || 5000;
};

/**
 * Calculate cost for renewable energy systems
 * @param type Type of renewable energy system
 * @param surface Surface area in square meters
 * @returns Cost estimate
 */
export const calculateRenewableEnergyCost = (type: string, surface: number): number => {
  const rates: Record<string, number> = {
    solar: 1200,
    geothermal: 2000,
    biomass: 1500,
    windmill: 20000
  };
  
  if (type === "windmill") {
    return rates[type];
  }
  
  // Surface based calculation for solar, geothermal, biomass
  const baseCost = rates[type] || 1500;
  return Math.round(surface * 0.1 * baseCost);
};

/**
 * Calculate cost for landscaping
 * @param type Type of landscaping
 * @param surface Surface area in square meters
 * @returns Cost estimate
 */
export const calculateLandscapingCost = (type: string, surface: number): number => {
  const rates: Record<string, number> = {
    basic: 50,
    standard: 80,
    premium: 120,
    luxury: 200
  };
  
  const rate = rates[type] || 80;
  return Math.round(surface * rate);
};

/**
 * Calculate cost for fencing
 * @param type Type of fencing
 * @param length Length in meters
 * @returns Cost estimate
 */
export const calculateFencingCost = (type: string, length: number): number => {
  const rates: Record<string, number> = {
    wood: 100,
    chain: 80,
    wrought: 300,
    composite: 150
  };
  
  const rate = rates[type] || 100;
  return Math.round(length * rate);
};

/**
 * Calculate cost for gate
 * @param type Type of gate
 * @returns Cost estimate
 */
export const calculateGateCost = (type: string): number => {
  const rates: Record<string, number> = {
    manual: 1500,
    automatic: 3500,
    smart: 5000
  };
  
  return rates[type] || 2500;
};

/**
 * Calculate cost for terrace
 * @param type Type of terrace
 * @param surface Surface area in square meters
 * @returns Cost estimate
 */
export const calculateTerraceCost = (type: string, surface: number): number => {
  const rates: Record<string, number> = {
    wood: 200,
    composite: 350,
    stone: 300,
    tile: 180,
    concrete: 120
  };
  
  const rate = rates[type] || 200;
  return Math.round(surface * rate);
};
