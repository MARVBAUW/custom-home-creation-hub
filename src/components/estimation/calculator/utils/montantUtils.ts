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
    standard: 80,      // Standard heating system
    eco: 150,          // Eco-friendly heating system
    economic: 70,      // Economical heating system
    sans_avis: 80,     // No preference
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
 * @param formData Form data containing surface area
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
  // Get surface area from form data
  const surface = ensureNumber(formData.surface);
  
  // Convert percentages to decimal (if not already)
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
 * @param doorType Type of doors
 * @param doorCount Number of doors
 * @returns Cost estimate
 */
export const calculateInteriorCarpenteryCost = (doorType: string, doorCount: number): number => {
  const rates: Record<string, number> = {
    basic: 300,
    standard: 500,
    premium: 800
  };
  
  const rate = rates[doorType] || 500;
  return Math.round(doorCount * rate);
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
 * @param type Quality level of parquet
 * @param surface Surface area in square meters
 * @returns Cost estimate
 */
export const calculateParquetCost = (type: string, surface: number): number => {
  const rates: Record<string, number> = {
    basic: 60,
    standard: 90,
    premium: 150,
    luxury: 250,
    none: 0
  };
  
  const rate = rates[type] || 90;
  return Math.round(surface * rate);
};

/**
 * Calculate cost for soft floor coverings
 * @param type Type of soft floor covering
 * @param surface Surface area in square meters
 * @returns Cost estimate
 */
export const calculateSoftFloorCost = (type: string, surface: number): number => {
  const rates: Record<string, number> = {
    vinyl: 40,
    carpet: 50,
    linoleum: 45,
    none: 0
  };
  
  const rate = rates[type] || 45;
  return Math.round(surface * rate);
};

/**
 * Calculate cost for insulation work
 * @param type Type of insulation
 * @param surface Surface area in square meters
 * @returns Cost estimate
 */
export const calculateInsulationCost = (type: string, surface: number): number => {
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
 * @param type Type of windows
 * @param surface Surface area in square meters
 * @returns Cost estimate
 */
export const calculateWindowsCost = (type: string, surface: number): number => {
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
 * @param bathType Quality level of bathroom
 * @param count Number of bathrooms
 * @returns Cost estimate
 */
export const calculateBathroomCost = (bathType: string, count?: number): number => {
  const bathCount = count || 1;
  const rates: Record<string, number> = {
    basic: 5000,
    standard: 8000,
    premium: 12000,
    luxury: 20000
  };
  
  const rate = rates[bathType] || 8000;
  return Math.round(bathCount * rate);
};

/**
 * Calculate cost for painting work
 * @param ratePerSqm Rate per square meter
 * @param surface Surface area in square meters
 * @returns Cost estimate
 */
export const calculatePaintingCost = (ratePerSqm: number, surface: number): number => {
  return Math.round(ratePerSqm * surface);
};

/**
 * Calculate cost for kitchen
 * @param quality Quality level of kitchen
 * @returns Cost estimate
 */
export const calculateKitchenCost = (quality: string): number => {
  const rates: Record<string, number> = {
    basic: 4000,
    standard: 8000,
    premium: 15000,
    luxury: 25000
  };
  
  return rates[quality] || 8000;
};

/**
 * Calculate cost for floor tiling
 * @param type Quality level of tiles
 * @param percentage Percentage of the floor to be tiled
 * @param surface Surface area in square meters
 * @returns Cost estimate
 */
export const calculateFloorTilingCost = (type: string, percentage: number, surface: number): number => {
  if (type === 'non_concerne') return 0;
  
  const rates: Record<string, number> = {
    basic: 70,
    standard: 100,
    medium: 125,
    premium: 150,
    luxury: 250
  };
  
  const rate = rates[type] || 100;
  const tileArea = surface * (percentage / 100);
  return Math.round(tileArea * rate);
};

/**
 * Calculate cost for wall tiling
 * @param type Quality level of tiles
 * @param surface Surface area in square meters
 * @returns Cost estimate
 */
export const calculateWallTilingCost = (type: string, surface: number): number => {
  if (type === 'non_concerne') return 0;
  
  const rates: Record<string, number> = {
    basic: 75,
    standard: 110,
    premium: 160,
    luxury: 260
  };
  
  const rate = rates[type] || 110;
  // Typically wall tiling covers about 30% of the total surface area
  const wallTileArea = surface * 0.3;
  return Math.round(wallTileArea * rate);
};

/**
 * Calculate cost for demolition work
 * @param type Type of demolition work
 * @param surface Surface area in square meters
 * @returns Cost estimate
 */
export const calculateDemolitionCost = (type: string, surface: number): number => {
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
 * @returns Cost estimate
 */
export const calculateMasonryWallCost = (surface: number): number => {
  // Average rate for masonry walls
  const rate = 180;
  return Math.round(surface * rate);
};

/**
 * Calculate cost for floor work
 * @param type Type of floor
 * @param surface Surface area in square meters
 * @returns Cost estimate
 */
export const calculateFloorCost = (type: string, surface: number): number => {
  const rates: Record<string, number> = {
    BOIS: 150,
    BETON: 120,
    concrete: 90,
    wood: 150,
    composite: 120
  };
  
  const rate = rates[type] || 120;
  return Math.round(surface * rate);
};

/**
 * Calculate cost for structural features
 * @param type Type of structural feature
 * @param count Number of features
 * @returns Cost estimate
 */
export const calculateStructuralFeatureCost = (type: string, count: number): number => {
  // Base rates for different structural features
  const rates: Record<string, number> = {
    beam: 1500,
    column: 800,
    arch: 2000,
    opening: 1200,
    "RESEAUX EVACUATION A REPRENDRE / TRANCHEE / REBOUCHAGE": 150,
    "DEMOLITION MUR PORTEUR": 300,
    "POSE D'UN IPN": 500,
    "OUVERTURE EN FACADE/MUR PORTEUR": 800,
    "CREATION D'UNE TREMIE*": 900,
    "FONDATION SEMELLE": 200,
    "FONDATION MASSIF": 1000,
    "CHAPE": 80,
    "RACCORDEMENT SANTAIRE RESEAU URBAIN": 2000
  };
  
  const rate = rates[type] || 1000;
  return Math.round(count * rate);
};

/**
 * Calculate cost for roof framework renovation
 * @param type Type of renovation
 * @param roofArea Surface area in square meters
 * @returns Cost estimate
 */
export const calculateRoofFrameworkRenovCost = (type: string, roofArea: number | string): number => {
  if (type === 'NON CONCERNE') return 0;
  
  const rates: Record<string, number> = {
    "TOITURE TERRASSE ACCESSIBLE": 190,
    "TOITURE TERRASSE INACCESSIBLE": 180,
    "CHARPENTE INDUSTRIELLE": 160,
    "CHARPENTE TRADITIONNELLE": 185,
    light: 100,
    medium: 150,
    heavy: 200,
    complete: 300
  };
  
  const rate = rates[type] || 150;
  return Math.round(ensureNumber(roofArea) * rate);
};

export const calculateRoofCoveringRenovCost = (type: string, roofArea: number | string): number => {
  if (type === 'NON CONCERNE') return 0;
  
  const rates: Record<string, number> = {
    "TUILES PLATES": 160,
    "TUILES RONDES": 167,
    "ARDOISES": 240,
    "ZINC": 190,
    "CHAUME": 230,
    "BAC ACIER": 85,
    tuile_plate: 160,
    tuile_ronde: 167,
    ardoise: 240,
    zinc: 190,
    chaume: 230,
    bac_acier: 85,
    TUILES: 160,
    BACS_ACIER: 85
  };
  
  const rate = rates[type] || 160;
  return Math.round(ensureNumber(roofArea) * rate);
};

/**
 * Calculate cost for environmental solutions
 * @param type Type of environmental solution
 * @returns Cost estimate
 */
export const calculateEnvironmentalSolutionsCost = (type: string): number => {
  const rates: Record<string, number> = {
    none: 0,
    low: 0.018,
    medium: 0.038,
    high: 0.057,
    rainwater: 5000,
    solarPanels: 15000,
    greenRoof: 7000,
    compost: 1000
  };
  
  if (rates[type] < 1) {
    // If it's a percentage-based rate
    return Math.round(0);
  }
  return rates[type] || 0;
};

/**
 * Calculate cost for renewable energy systems
 * @param type Type of renewable energy system
 * @returns Cost estimate
 */
export const calculateRenewableEnergyCost = (type: string): number => {
  const rates: Record<string, number> = {
    standard: 0,
    optimized: 0.035,
    semiAutonomous: 0.07,
    autonomous: 0.11,
    solar: 12000,
    geothermal: 20000,
    biomass: 15000,
    windmill: 20000
  };
  
  if (rates[type] < 1) {
    // If it's a percentage-based rate
    return Math.round(0);
  }
  return rates[type] || 0;
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
    luxury: 200,
    "UN PEU": 50,
    "BEAUCOUP": 100,
    "PASSIONNEMENT": 150
  };
  
  const rate = rates[type] || 80;
  return Math.round(surface * rate);
};

/**
 * Calculate cost for fencing
 * @param length Length in meters
 * @returns Cost estimate
 */
export const calculateFencingCost = (length: number): number => {
  // Standard rate for fencing per meter
  const rate = 120;
  return Math.round(length * rate);
};

/**
 * Calculate cost for gate
 * @param width Width in meters
 * @returns Cost estimate
 */
export const calculateGateCost = (width: number): number => {
  // Base cost for a gate
  const baseCost = 1500;
  // Additional cost per meter of width
  const additionalCost = 500;
  
  return Math.round(baseCost + (width * additionalCost));
};

/**
 * Calculate cost for terrace
 * @param surface Surface area in square meters
 * @returns Cost estimate
 */
export const calculateTerraceCost = (surface: number): number => {
  // Standard rate for terrace per square meter
  const rate = 200;
  return Math.round(surface * rate);
};
