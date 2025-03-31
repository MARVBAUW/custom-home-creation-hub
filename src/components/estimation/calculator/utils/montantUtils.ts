/**
 * Utility functions for calculating costs in the estimation calculator
 */

/**
 * Ensures a value is a number, converting strings to numbers if possible.
 * Returns 0 if the value cannot be converted to a number.
 */
export function ensureNumber(value: any, defaultValue = 0): number {
  if (typeof value === 'number') {
    return value;
  }
  
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? defaultValue : parsed;
  }
  
  return defaultValue;
}

/**
 * Calculate a generic component cost based on surface area and rate
 */
export function calculateComponentCost(surface: number, ratePerM2: number): number {
  return surface * ratePerM2;
}

/**
 * Calculate new total amount after adding a component cost
 */
export function calculateNewMontantT(currentTotal: number | undefined, additionalCost: number): number {
  const total = currentTotal || 0;
  return total + additionalCost;
}

/**
 * Calculate insulation cost based on type and surface area
 */
export function calculateInsulationCost(insulationType: string, surface: number): number {
  let costPerM2 = 0;
  
  // Determine cost per square meter based on insulation type
  switch (insulationType) {
    case 'standard':
      costPerM2 = 80; // RT2012 standard insulation
      break;
    case 'reinforced':
      costPerM2 = 100; // RT2020 reinforced insulation
      break;
    case 'passive':
      costPerM2 = 120; // Passive house insulation
      break;
    case 'ecological':
      costPerM2 = 110; // Ecological materials insulation
      break;
    case 'renovation':
      costPerM2 = 90; // Renovation-specific insulation
      break;
    case 'non_concerne':
    default:
      costPerM2 = 0; // No insulation
      break;
  }
  
  // Calculate total cost
  return costPerM2 * surface;
}

/**
 * Calculate electrical cost based on type and surface area
 */
export function calculateElectricalCost(electricalType: string, surface: number): number {
  let costPerM2 = 0;
  
  // Determine cost per square meter based on electrical type
  switch (electricalType) {
    case 'basic':
      costPerM2 = 70; // Basic electrical installation
      break;
    case 'standard':
      costPerM2 = 90; // Standard electrical installation
      break;
    case 'premium':
      costPerM2 = 120; // Premium electrical installation
      break;
    case 'smart_home':
      costPerM2 = 160; // Smart home electrical installation
      break;
    case 'non_concerne':
    default:
      costPerM2 = 0; // No electrical work
      break;
  }
  
  // Calculate total cost
  return costPerM2 * surface;
}

/**
 * Calculate interior carpentry cost based on selected options
 */
export function calculateInteriorCarpenteryCost(
  doorType: string,
  hasMoldings: boolean,
  hasCustomFurniture: boolean,
  surface: number
): number {
  // Base cost per door type (average per m²)
  let doorCostPerM2 = 0;
  switch (doorType) {
    case 'base':
      doorCostPerM2 = 60;
      break;
    case 'standing':
      doorCostPerM2 = 120;
      break;
    case 'premium':
      doorCostPerM2 = 180;
      break;
    case 'non_concerne':
      doorCostPerM2 = 0;
      break;
    default:
      doorCostPerM2 = 0;
  }
  
  // Calculate total door cost
  let totalCost = doorCostPerM2 * surface * 0.10; // Assuming doors cover about 10% of surface area
  
  // Add moldings cost
  if (hasMoldings) {
    totalCost += 35 * surface * 0.15; // Assuming moldings on 15% of surface
  }
  
  // Add custom furniture cost
  if (hasCustomFurniture) {
    totalCost += 350 * surface * 0.05; // Assuming custom furniture covers 5% of surface
  }
  
  return Math.round(totalCost);
}

/**
 * Calculate carport cost based on type
 */
export function calculateCarportCost(carportType: string): number {
  switch (carportType) {
    case 'SIMPLE':
      return 5000;
    case 'DOUBLE':
      return 8500;
    default:
      return 0;
  }
}

/**
 * Calculate pool cost based on type and area
 */
export function calculatePoolCost(poolType: string, area: number): number {
  let baseCostPerM2 = 0;
  
  switch (poolType) {
    case 'COQUE POLYESTER':
      baseCostPerM2 = 1200;
      break;
    case 'BETON':
      baseCostPerM2 = 1500;
      break;
    case 'PISCINE LAGON (HORS AMENAGEMENT PAYSAGER)':
      baseCostPerM2 = 2000;
      break;
    default:
      baseCostPerM2 = 0;
  }
  
  return baseCostPerM2 * area;
}

/**
 * Calculate plumbing cost based on type and surface area
 */
export function calculatePlumbingCost(plumbingType: string, surface: number): number {
  let costPerM2 = 0;
  
  // Determine cost per square meter based on plumbing type
  switch (plumbingType) {
    case 'basic':
      costPerM2 = 65; // Basic plumbing installation
      break;
    case 'standard':
      costPerM2 = 85; // Standard plumbing installation
      break;
    case 'premium':
      costPerM2 = 110; // Premium plumbing installation
      break;
    case 'renovation':
      costPerM2 = 90; // Renovation plumbing work
      break;
    case 'non_concerne':
    default:
      costPerM2 = 0; // No plumbing work
      break;
  }
  
  // Calculate total cost
  return costPerM2 * surface;
}

/**
 * Calculate jacuzzi cost based on type and area
 */
export function calculateJacuzziCost(jacuzziType: string, area: number): number {
  let baseCostPerM2 = 0;
  
  switch (jacuzziType) {
    case 'BASE':
      baseCostPerM2 = 2500;
      break;
    case 'PLUS':
      baseCostPerM2 = 3500;
      break;
    case 'PREMIUM':
      baseCostPerM2 = 5000;
      break;
    default:
      baseCostPerM2 = 0;
  }
  
  return baseCostPerM2 * area;
}

/**
 * Calculate parquet flooring cost based on type and area
 */
export function calculateParquetCost(parquetType: string, area: number): number {
  switch (parquetType) {
    case 'PARQUET DE BASE':
      return 55 * area;
    case 'PARQUET MG':
      return 66 * area;
    case 'PARQUET HG':
      return 108 * area;
    default:
      return 0;
  }
}

/**
 * Calculate soft floor cost based on type and area
 */
export function calculateSoftFloorCost(floorType: string, area: number): number {
  switch (floorType) {
    case 'SOL SOUPLE BASE':
      return 30 * area;
    case 'SOL SOUPLE MG':
      return 35 * area;
    case 'SOL SOUPLE HG':
      return 40 * area;
    default:
      return 0;
  }
}

/**
 * Calculate painting cost based on type, percentage, and total surface
 */
export function calculatePaintingCost(paintType: string, percentage: number, totalSurface: number): number {
  const surfaceArea = (percentage / 100) * totalSurface;
  
  switch (paintType) {
    case 'PEINTURE BASE (monochrome blanc)':
      return 0.58 * surfaceArea * totalSurface;
    case 'PEINTURE DECORATIVE (mixite de couleur et de matérialité)':
      return 0.606 * surfaceArea * totalSurface;
    case 'PAPIER PEINT...':
      return 0.6 * surfaceArea * totalSurface;
    case 'REVETEMENT MURAUX BOIS AJOURE':
      return 1.3 * surfaceArea * totalSurface;
    case 'REVETEMENTS MURAUX TYPE PIERRE NATURELLE':
      return 1.9 * surfaceArea * totalSurface;
    default:
      return 0;
  }
}

/**
 * Calculate heating cost based on heating type
 */
export function calculateHeatingCost(heatingType: string, surface: number): number {
  switch (heatingType) {
    case 'ÉLECTRIQUE':
    case 'electric':
    case 'standard':
      return surface * 60;
    case 'GAZ':
    case 'gas':
      return surface * 80;
    case 'POMPE À CHALEUR':
    case 'heat_pump':
    case 'eco':
      return surface * 120;
    case 'POÊLE À BOIS':
    case 'wood':
    case 'economic':
      return surface * 70;
    case 'sans_avis':
    case 'non_concerne':
    default:
      return 0;
  }
}

/**
 * Calculate air conditioning cost based on if it's installed and surface area
 */
export function calculateAirConditioningCost(hasAirConditioning: boolean, surface: number): number {
  if (!hasAirConditioning) {
    return 0;
  }
  
  // Base cost for air conditioning is approximately €100 per square meter for standard installation
  const baseCostPerM2 = 100;
  
  // We estimate that air conditioning covers about 50% of the living space
  const airConditionedArea = surface * 0.5;
  
  return baseCostPerM2 * airConditionedArea;
}

/**
 * Calculate facade cost based on facade type
 */
export function calculateFacadeCost(facadeType: string, surface: number): number {
  switch (facadeType) {
    case 'CRÉPI':
      return surface * 45;
    case 'PIERRE':
      return surface * 180;
    case 'BRIQUE':
      return surface * 120;
    case 'BOIS':
      return surface * 150;
    default:
      return 0;
  }
}

/**
 * Calculate roof framework cost based on roof type
 */
export function calculateRoofFrameworkCost(roofType: string, surface: number): number {
  switch (roofType) {
    case 'CHARPENTE TRADITIONNELLE':
      return surface * 110;
    case 'CHARPENTE FERMETTE':
      return surface * 80;
    default:
      return 0;
  }
}

/**
 * Calculate roofing cost based on roof type
 */
export function calculateRoofingCost(roofType: string, surface: number): number {
  switch (roofType) {
    case 'TUILES':
      return surface * 75;
    case 'ARDOISE':
      return surface * 95;
    case 'ZINC':
      return surface * 120;
    case 'TOIT TERRASSE':
      return surface * 140;
    default:
      return 0;
  }
}

/**
 * Calculate windows cost based on window type and area
 */
export function calculateWindowsCost(windowType: string, area: number): number {
  switch (windowType) {
    case 'PVC':
      return area * 350;
    case 'ALUMINIUM':
      return area * 550;
    case 'BOIS':
      return area * 650;
    default:
      return 0;
  }
}

/**
 * Calculate plastering cost based on type and surface area
 */
export function calculatePlasteringCost(plasteringType: string, surface: number): number {
  let costPerM2 = 0;
  
  // Determine cost per square meter based on plastering type
  switch (plasteringType) {
    case 'base':
      costPerM2 = 45; // Basic plastering
      break;
    case 'specific':
      costPerM2 = 60; // Plastering with specific features
      break;
    case 'advanced':
      costPerM2 = 90; // Advanced plastering with arches, niches, etc.
      break;
    case 'non_concerne':
    default:
      costPerM2 = 0; // No plastering work
      break;
  }
  
  // Calculate total cost
  return costPerM2 * surface;
}

/**
 * Calculate floor tiling cost based on type, percentage, and surface area
 */
export function calculateFloorTilingCost(tileType: string, percentage: number, surface: number): number {
  // Calculate the area to be tiled
  const tileArea = (percentage / 100) * surface;
  
  // Determine cost per square meter based on tile type
  let costPerM2 = 0;
  switch (tileType) {
    case 'standard':
      costPerM2 = 70; // Standard tiles
      break;
    case 'medium':
      costPerM2 = 100; // Medium quality tiles
      break;
    case 'premium':
      costPerM2 = 150; // Premium quality tiles
      break;
    case 'non_concerne':
    default:
      costPerM2 = 0; // No tiling
      break;
  }
  
  // Calculate total cost including installation
  return costPerM2 * tileArea;
}

/**
 * Calculate wall tiling cost based on type and surface area
 */
export function calculateWallTilingCost(tileType: string, surface: number): number {
  // We usually tile about 20% of walls (bathrooms, kitchen)
  const estimatedWallTileArea = surface * 0.2;
  
  // Determine cost per square meter based on tile type
  let costPerM2 = 0;
  switch (tileType) {
    case 'standard':
      costPerM2 = 65; // Standard wall tiles
      break;
    case 'medium':
      costPerM2 = 90; // Medium quality wall tiles
      break;
    case 'premium':
      costPerM2 = 130; // Premium quality wall tiles
      break;
    default:
      costPerM2 = 0; // No wall tiling
      break;
  }
  
  // Calculate total cost including installation
  return costPerM2 * estimatedWallTileArea;
}

/**
 * Calculate pool heating cost based on area
 */
export function calculatePoolHeatingCost(area: number): number {
  // Base cost for pool heating is approximately 6000€ for a standard pool
  const baseHeatingCost = 6000;
  
  // Adjust cost based on pool size (larger pools need more powerful heating)
  const sizeFactor = Math.max(1, area / 30); // 30m² is considered a standard pool
  
  return Math.round(baseHeatingCost * sizeFactor);
}

/**
 * Calculate landscaping cost based on type and area
 */
export function calculateLandscapingCost(landscapingType: string, area: number): number {
  let costPerM2 = 0;
  
  switch (landscapingType) {
    case 'basic':
      costPerM2 = 30; // Basic landscaping
      break;
    case 'medium':
      costPerM2 = 60; // Medium quality landscaping
      break;
    case 'premium':
      costPerM2 = 90; // Premium quality landscaping
      break;
    default:
      costPerM2 = 0;
  }
  
  return costPerM2 * area;
}

/**
 * Calculate fencing cost based on length
 */
export function calculateFencingCost(length: number): number {
  // Average cost per meter for standard fencing
  const costPerMeter = 80;
  
  return costPerMeter * length;
}

/**
 * Calculate gate cost based on length
 */
export function calculateGateCost(length: number): number {
  // Base cost for a gate
  const baseCost = 800;
  
  // Additional cost per meter
  const additionalCostPerMeter = 150;
  
  return baseCost + (additionalCostPerMeter * length);
}

/**
 * Calculate terrace cost based on area
 */
export function calculateTerraceCost(area: number): number {
  // Average cost per square meter for standard terrace
  const costPerM2 = 120;
  
  return costPerM2 * area;
}

/**
 * Calculate kitchen cost based on type
 */
export function calculateKitchenCost(kitchenType: string, surface: number): number {
  let costPerM2 = 0;
  
  switch (kitchenType) {
    case 'basic':
      costPerM2 = 400; // Basic kitchen
      break;
    case 'standard':
      costPerM2 = 600; // Standard kitchen
      break;
    case 'premium':
      costPerM2 = 900; // Premium kitchen
      break;
    case 'luxury':
      costPerM2 = 1200; // Luxury kitchen
      break;
    default:
      costPerM2 = 0;
  }
  
  // Assuming the kitchen is about 15% of the total surface area
  const kitchenArea = Math.max(10, surface * 0.15);
  
  return costPerM2 * kitchenArea;
}

/**
 * Calculate bathroom cost based on type and count
 */
export function calculateBathroomCost(bathroomType: string, count: number): number {
  let costPerBathroom = 0;
  
  switch (bathroomType) {
    case 'basic':
      costPerBathroom = 3500; // Basic bathroom
      break;
    case 'standard':
      costPerBathroom = 5500; // Standard bathroom
      break;
    case 'premium':
      costPerBathroom = 8000; // Premium bathroom
      break;
    case 'luxury':
      costPerBathroom = 12000; // Luxury bathroom
      break;
    default:
      costPerBathroom = 0;
  }
  
  return costPerBathroom * count;
}

/**
 * Calculate roof framework renovation cost based on roof type
 */
export function calculateRoofFrameworkRenovCost(roofType: string, surface: number): number {
  let factor = 1.25; // Renovation costs 25% more than new construction
  return calculateRoofFrameworkCost(roofType, surface) * factor;
}

/**
 * Calculate roofing renovation cost based on roofing type
 */
export function calculateRoofingRenovCost(roofingType: string, surface: number): number {
  let factor = 1.3; // Renovation costs 30% more than new construction
  return calculateRoofingCost(roofingType, surface) * factor;
}

/**
 * Calculate demolition cost based on demo types and areas
 */
export function calculateDemolitionCost(demolitionTypes: string[], areas: Record<string, number>): number {
  let totalCost = 0;
  
  for (const demoType of demolitionTypes) {
    const area = areas[demoType] || 0;
    switch (demoType) {
      case 'walls':
        totalCost += area * 45;
        break;
      case 'floors':
        totalCost += area * 35;
        break;
      case 'ceilings':
        totalCost += area * 30;
        break;
      case 'complete':
        totalCost += area * 120;
        break;
      default:
        totalCost += area * 40;
    }
  }
  
  return totalCost;
}

/**
 * Calculate masonry wall cost
 */
export function calculateMasonryWallCost(wallType: string, area: number): number {
  let costPerM2 = 0;
  
  switch (wallType) {
    case 'brick':
      costPerM2 = 110;
      break;
    case 'concrete_blocks':
      costPerM2 = 90;
      break;
    case 'drywall':
      costPerM2 = 65;
      break;
    default:
      costPerM2 = 80;
  }
  
  return costPerM2 * area;
}

/**
 * Calculate floor cost
 */
export function calculateFloorCost(floorType: string, area: number): number {
  let costPerM2 = 0;
  
  switch (floorType) {
    case 'concrete':
      costPerM2 = 85;
      break;
    case 'wood':
      costPerM2 = 120;
      break;
    case 'lightweight':
      costPerM2 = 70;
      break;
    default:
      costPerM2 = 80;
  }
  
  return costPerM2 * area;
}

/**
 * Calculate structural feature cost
 */
export function calculateStructuralFeatureCost(featureType: string, value: number): number {
  let costFactor = 0;
  
  switch (featureType) {
    case 'beam':
      costFactor = 95;
      break;
    case 'column':
      costFactor = 120;
      break;
    case 'arch':
      costFactor = 150;
      break;
    case 'opening':
      costFactor = 200;
      break;
    default:
      costFactor = 100;
  }
  
  return costFactor * value;
}

/**
 * Calculate renewable energy cost
 */
export function calculateRenewableEnergyCost(energyType: string, surface: number): number {
  let baseCost = 0;
  let costPerM2 = 0;
  
  switch (energyType) {
    case 'solar_panels':
      baseCost = 3000;
      costPerM2 = 450;
      break;
    case 'heat_pump':
      baseCost = 8000;
      costPerM2 = 0;
      break;
    case 'geothermal':
      baseCost = 15000;
      costPerM2 = 0;
      break;
    case 'wind':
      baseCost = 12000;
      costPerM2 = 0;
      break;
    default:
      return 0;
  }
  
  const totalCost = baseCost + (costPerM2 * (surface / 10)); // Solar panels typically cover 10% of the surface
  return Math.round(totalCost);
}

/**
 * Calculate environmental solutions cost
 */
export function calculateEnvironmentalSolutionsCost(solutionType: string, surface: number): number {
  let baseCost = 0;
  let costPerM2 = 0;
  
  switch (solutionType) {
    case 'rainwater_harvesting':
      baseCost = 3500;
      costPerM2 = 0;
      break;
    case 'eco_insulation':
      baseCost = 0;
      costPerM2 = 40;
      break;
    case 'greywater_recycling':
      baseCost = 5000;
      costPerM2 = 0;
      break;
    case 'green_roof':
      baseCost = 2000;
      costPerM2 = 120;
      break;
    default:
      return 0;
  }
  
  const totalCost = baseCost + (costPerM2 * surface);
  return Math.round(totalCost);
}
