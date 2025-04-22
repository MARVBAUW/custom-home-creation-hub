
import { ensureNumber } from './typeConversions';

/**
 * Calculate roofing costs based on selected type and surface area
 */
export const calculateRoofingCost = (roofType: string, surface: number): number => {
  const area = ensureNumber(surface);
  let ratePerM2 = 120; // Default rate

  switch (roofType) {
    case 'TUILES':
      ratePerM2 = 120;
      break;
    case 'ARDOISES':
      ratePerM2 = 240;
      break;
    case 'ZINC':
      ratePerM2 = 180;
      break;
    case 'BACS ACIER':
      ratePerM2 = 110;
      break;
    default:
      ratePerM2 = 120;
  }

  return area * ratePerM2;
};

/**
 * Calculate roofing renovation costs
 */
export const calculateRoofingRenovCost = (roofType: string, surface: string | number): number => {
  const area = ensureNumber(surface);
  let ratePerM2 = 120; // Default rate

  switch (roofType) {
    case 'TUILES':
      ratePerM2 = 120;
      break;
    case 'ARDOISES':
      ratePerM2 = 240;
      break;
    case 'ZINC':
      ratePerM2 = 180;
      break;
    case 'BACS ACIER':
      ratePerM2 = 110;
      break;
    case 'NON CONCERNE':
      return 0;
    default:
      ratePerM2 = 120;
  }

  return area * ratePerM2;
};

/**
 * Calculate roof framework renovation costs
 */
export const calculateRoofFrameworkRenovCost = (roofType: string, surface: string | number): number => {
  const area = ensureNumber(surface);
  let ratePerM2 = 180; // Default rate

  switch (roofType) {
    case 'TOITURE TERRASSE ACCESSIBLE':
      ratePerM2 = 190;
      break;
    case 'TOITURE TERRASSE INACCESSIBLE':
      ratePerM2 = 180;
      break;
    case 'CHARPENTE INDUSTRIELLE':
      ratePerM2 = 160;
      break;
    case 'CHARPENTE TRADITIONNELLE':
      ratePerM2 = 185;
      break;
    case 'NON CONCERNE':
      return 0;
    default:
      ratePerM2 = 180;
  }

  return area * ratePerM2;
};

/**
 * Calculate windows cost based on type and area
 */
export const calculateWindowsCost = (windowType: string, area: number): number => {
  const surface = ensureNumber(area);
  
  if (windowType === 'non_concerne' || surface <= 0) {
    return 0;
  }
  
  let costPerSqMeter = 450; // Default value
  
  switch (windowType) {
    case 'bois':
      costPerSqMeter = 600;
      break;
    case 'pvc':
      costPerSqMeter = 450;
      break;
    case 'alu':
      costPerSqMeter = 650;
      break;
    case 'mixte':
      costPerSqMeter = 750;
      break;
    case 'pvc_colore':
      costPerSqMeter = 500;
      break;
    default:
      costPerSqMeter = 450;
  }
  
  return surface * costPerSqMeter;
};

/**
 * Calculate interior carpentry costs
 */
export const calculateInteriorCarpenteryCost = (
  doorType: string,
  hasMoldings: boolean,
  hasCustomFurniture: boolean,
  surface: number
): number => {
  if (doorType === 'non_concerne') {
    return 0;
  }
  
  let baseCost = 0;
  const area = ensureNumber(surface);
  
  // Door costs
  switch (doorType) {
    case 'base':
      baseCost += area * 30;
      break;
    case 'standing':
      baseCost += area * 45;
      break;
    case 'premium':
      baseCost += area * 70;
      break;
    default:
      baseCost += 0;
  }
  
  // Additional features
  if (hasMoldings) {
    baseCost += area * 25;
  }
  
  if (hasCustomFurniture) {
    baseCost += area * 120;
  }
  
  return baseCost;
};

/**
 * Calculate plastering costs
 */
export const calculatePlasteringCost = (surface: number, plasteringType: string): number => {
  const area = ensureNumber(surface);
  
  if (plasteringType === 'non_concerne') {
    return 0;
  }
  
  let costPerSqMeter = 35; // Base rate
  
  switch (plasteringType) {
    case 'base':
      costPerSqMeter = 35;
      break;
    case 'specific':
      costPerSqMeter = 50;
      break;
    case 'advanced':
      costPerSqMeter = 80;
      break;
    default:
      costPerSqMeter = 35;
  }
  
  return area * costPerSqMeter;
};

/**
 * Calculate plumbing costs
 */
export const calculatePlumbingCost = (plumbingType: string, surface: number): number => {
  const area = ensureNumber(surface);
  
  if (plumbingType === 'non_concerne') {
    return 0;
  }
  
  let costPerSqMeter = 40; // Basic rate
  
  switch (plumbingType) {
    case 'basic':
      costPerSqMeter = 40;
      break;
    case 'standard':
      costPerSqMeter = 60;
      break;
    case 'premium':
      costPerSqMeter = 90;
      break;
    default:
      costPerSqMeter = 40;
  }
  
  return area * costPerSqMeter;
};

/**
 * Calculate parquet flooring costs
 */
export const calculateParquetCost = (parquetType: string, area: number): number => {
  const surface = ensureNumber(area);
  
  if (parquetType === 'none') {
    return 0;
  }
  
  let costPerSqMeter = 50; // Base cost
  
  switch (parquetType) {
    case 'PARQUET DE BASE':
      costPerSqMeter = 50;
      break;
    case 'PARQUET MG':
      costPerSqMeter = 80;
      break;
    case 'PARQUET HG':
      costPerSqMeter = 120;
      break;
    default:
      costPerSqMeter = 50;
  }
  
  return surface * costPerSqMeter;
};

/**
 * Calculate soft flooring costs
 */
export const calculateSoftFloorCost = (floorType: string, area: number): number => {
  const surface = ensureNumber(area);
  
  if (floorType === 'none') {
    return 0;
  }
  
  let costPerSqMeter = 30; // Base cost
  
  switch (floorType) {
    case 'SOL SOUPLE BASE':
      costPerSqMeter = 30;
      break;
    case 'SOL SOUPLE MG':
      costPerSqMeter = 45;
      break;
    case 'SOL SOUPLE HG':
      costPerSqMeter = 70;
      break;
    default:
      costPerSqMeter = 30;
  }
  
  return surface * costPerSqMeter;
};

/**
 * Calculate floor tiling costs
 */
export const calculateFloorTilingCost = (tileType: string, area: number): number => {
  const surface = ensureNumber(area);
  
  if (tileType === 'none') {
    return 0;
  }
  
  let costPerSqMeter = 60; // Base cost
  
  switch (tileType) {
    case 'CARRELAGE DE BASE':
      costPerSqMeter = 60;
      break;
    case 'CARRELAGE MG':
      costPerSqMeter = 90;
      break;
    case 'CARRELAGE HG':
      costPerSqMeter = 150;
      break;
    default:
      costPerSqMeter = 60;
  }
  
  return surface * costPerSqMeter;
};

/**
 * Calculate wall tiling costs
 */
export const calculateWallTilingCost = (tileType: string, area: number): number => {
  const surface = ensureNumber(area);
  
  if (tileType === 'none') {
    return 0;
  }
  
  let costPerSqMeter = 70; // Base cost
  
  switch (tileType) {
    case 'FAIENCE DE BASE':
      costPerSqMeter = 70;
      break;
    case 'FAIENCE MG':
      costPerSqMeter = 100;
      break;
    case 'FAIENCE HG':
      costPerSqMeter = 160;
      break;
    default:
      costPerSqMeter = 70;
  }
  
  return surface * costPerSqMeter;
};

/**
 * Calculate painting costs
 */
export const calculatePaintingCost = (config: { 
  basicPaint: number, 
  decorativePaint: number, 
  wallpaper: number, 
  woodPaneling: number, 
  stoneCladding: number 
}): number => {
  let total = 0;
  
  // Basic paint (lowest cost per m²)
  total += config.basicPaint * 25;
  
  // Decorative paint
  total += config.decorativePaint * 45;
  
  // Wallpaper
  total += config.wallpaper * 35;
  
  // Wood paneling (higher cost)
  total += config.woodPaneling * 90;
  
  // Stone cladding (highest cost)
  total += config.stoneCladding * 120;
  
  return total;
};

/**
 * Calculate electricity costs
 */
export const calculateElectricityCost = (electricityType: string, surface: number): number => {
  const area = ensureNumber(surface);
  
  if (electricityType === 'non_concerne') {
    return 0;
  }
  
  let costPerSqMeter = 45; // Basic rate
  
  switch (electricityType) {
    case 'basic':
      costPerSqMeter = 45;
      break;
    case 'standard':
      costPerSqMeter = 70;
      break;
    case 'premium':
      costPerSqMeter = 120;
      break;
    default:
      costPerSqMeter = 45;
  }
  
  return area * costPerSqMeter;
};

/**
 * Calculate electrical costs (alias for electricity)
 */
export const calculateElectricalCost = calculateElectricityCost;

/**
 * Calculate heating costs
 */
export const calculateHeatingCost = (heatingType: string, surface: number): number => {
  const area = ensureNumber(surface);
  
  if (heatingType === 'non_concerne') {
    return 0;
  }
  
  let costPerSqMeter = 50; // Basic rate
  
  switch (heatingType) {
    case 'electric':
      costPerSqMeter = 50;
      break;
    case 'gas':
      costPerSqMeter = 85;
      break;
    case 'heat_pump':
      costPerSqMeter = 140;
      break;
    case 'oil':
      costPerSqMeter = 90;
      break;
    case 'wood':
      costPerSqMeter = 110;
      break;
    default:
      costPerSqMeter = 50;
  }
  
  return area * costPerSqMeter;
};

/**
 * Calculate air conditioning costs
 */
export const calculateAirConditioningCost = (acType: string, surface: number): number => {
  const area = ensureNumber(surface);
  
  if (acType === 'non_concerne') {
    return 0;
  }
  
  let costPerSqMeter = 90; // Basic rate
  
  switch (acType) {
    case 'split':
      costPerSqMeter = 90;
      break;
    case 'multi_split':
      costPerSqMeter = 120;
      break;
    case 'centralized':
      costPerSqMeter = 180;
      break;
    default:
      costPerSqMeter = 90;
  }
  
  return area * costPerSqMeter;
};

/**
 * Calculate demolition costs
 */
export const calculateDemolitionCost = (
  demolitionType: string, 
  surface: number, 
  options: string[] = []
): number => {
  const area = ensureNumber(surface);
  
  if (demolitionType === 'none' || area <= 0) {
    return 0;
  }
  
  let baseCost = 0;
  
  switch (demolitionType) {
    case 'partial':
      baseCost = area * 90;
      break;
    case 'complete':
      baseCost = area * 150;
      break;
    case 'selective':
      baseCost = area * 120;
      break;
    default:
      baseCost = area * 120;
  }
  
  // Additional options
  let optionsCost = 0;
  options.forEach(option => {
    switch (option) {
      case 'asbestos_removal':
        optionsCost += area * 80;
        break;
      case 'waste_management':
        optionsCost += area * 30;
        break;
      case 'structural_supports':
        optionsCost += area * 70;
        break;
    }
  });
  
  return baseCost + optionsCost;
};

/**
 * Calculate masonry wall costs
 */
export const calculateMasonryWallCost = (wallType: string, length: number): number => {
  const wallLength = ensureNumber(length);
  
  if (wallLength <= 0) {
    return 0;
  }
  
  let costPerMeter = 250; // Default rate
  
  switch (wallType) {
    case 'PORTEUR':
      costPerMeter = 350;
      break;
    case 'NON PORTEUR':
      costPerMeter = 250;
      break;
    default:
      costPerMeter = 250;
  }
  
  return wallLength * costPerMeter;
};

/**
 * Calculate floor costs
 */
export const calculateFloorCost = (floorType: string, surface: number): number => {
  const area = ensureNumber(surface);
  
  if (area <= 0) {
    return 0;
  }
  
  let costPerSqMeter = 120; // Default rate
  
  switch (floorType) {
    case 'BETON':
      costPerSqMeter = 120;
      break;
    case 'HOURDIS':
      costPerSqMeter = 140;
      break;
    case 'BOIS':
      costPerSqMeter = 180;
      break;
    default:
      costPerSqMeter = 120;
  }
  
  return area * costPerSqMeter;
};

/**
 * Calculate structural feature costs
 */
export const calculateStructuralFeatureCost = (featureType: string, quantity: number): number => {
  const count = ensureNumber(quantity);
  
  if (count <= 0) {
    return 0;
  }
  
  let costPerUnit = 800; // Default rate
  
  switch (featureType) {
    case 'ESCALIER':
      costPerUnit = 4500;
      break;
    case 'LINTEAU':
      costPerUnit = 800;
      break;
    case 'POTEAU':
      costPerUnit = 1200;
      break;
    case 'POUTRE':
      costPerUnit = 1800;
      break;
    default:
      costPerUnit = 1000;
  }
  
  return count * costPerUnit;
};

/**
 * Calculate insulation costs
 */
export const calculateInsulationCost = (insulationType: string, surface: number): number => {
  const area = ensureNumber(surface);
  
  if (insulationType === 'non_concerne' || area <= 0) {
    return 0;
  }
  
  let costPerSqMeter = 40; // Basic rate
  
  switch (insulationType) {
    case 'standard':
      costPerSqMeter = 40;
      break;
    case 'premium':
      costPerSqMeter = 70;
      break;
    case 'eco_friendly':
      costPerSqMeter = 90;
      break;
    default:
      costPerSqMeter = 40;
  }
  
  return area * costPerSqMeter;
};

/**
 * Calculate facade costs
 */
export const calculateFacadeCost = (facadeType: string, surface: number): number => {
  const area = ensureNumber(surface);
  
  if (facadeType === 'none' || area <= 0) {
    return 0;
  }
  
  let costPerSqMeter = 60; // Default rate
  
  switch (facadeType) {
    case 'paint':
      costPerSqMeter = 60;
      break;
    case 'render':
      costPerSqMeter = 80;
      break;
    case 'cladding':
      costPerSqMeter = 140;
      break;
    case 'stone':
      costPerSqMeter = 190;
      break;
    default:
      costPerSqMeter = 60;
  }
  
  return area * costPerSqMeter;
};

/**
 * Calculate detailed facade costs with multiple parameters
 */
export const calculateDetailedFacadeCost = (
  baseType: string, 
  insulation: boolean, 
  decorative: boolean, 
  surface: number, 
  options: string[] = [],
  renovation: boolean = false,
  specialCoating: boolean = false
): number => {
  const area = ensureNumber(surface);
  
  if (baseType === 'none' || area <= 0) {
    return 0;
  }
  
  // Start with the base facade cost
  let baseCost = calculateFacadeCost(baseType, area);
  
  // Add cost for insulation if selected
  if (insulation) {
    baseCost += 50 * area;
  }
  
  // Add cost for decorative elements
  if (decorative) {
    baseCost += 30 * area;
  }
  
  // Add cost for special coating
  if (specialCoating) {
    baseCost += 40 * area;
  }
  
  // Add additional costs for renovation work
  if (renovation) {
    baseCost *= 1.35; // 35% more for renovation work
  }
  
  // Add costs for additional options
  let optionsCost = 0;
  options.forEach(option => {
    switch (option) {
      case 'water_repellent':
        optionsCost += 15 * area;
        break;
      case 'anti_graffiti':
        optionsCost += 25 * area;
        break;
      case 'decorative_moldings':
        optionsCost += 35 * area;
        break;
    }
  });
  
  return baseCost + optionsCost;
};

/**
 * Calculate landscaping costs
 */
export const calculateLandscapingCost = (landscapingType: string, surface: number): number => {
  const area = ensureNumber(surface);
  
  if (landscapingType === 'none' || area <= 0) {
    return 0;
  }
  
  let costPerSqMeter = 50; // Basic rate
  
  switch (landscapingType) {
    case 'basic':
      costPerSqMeter = 50;
      break;
    case 'standard':
      costPerSqMeter = 120;
      break;
    case 'premium':
      costPerSqMeter = 250;
      break;
    default:
      costPerSqMeter = 50;
  }
  
  return area * costPerSqMeter;
};

/**
 * Calculate fencing costs
 */
export const calculateFencingCost = (fencingType: string, length: number): number => {
  const fenceLength = ensureNumber(length);
  
  if (fencingType === 'none' || fenceLength <= 0) {
    return 0;
  }
  
  let costPerMeter = 70; // Basic rate
  
  switch (fencingType) {
    case 'chain_link':
      costPerMeter = 70;
      break;
    case 'wooden':
      costPerMeter = 150;
      break;
    case 'concrete':
      costPerMeter = 220;
      break;
    case 'wrought_iron':
      costPerMeter = 280;
      break;
    default:
      costPerMeter = 70;
  }
  
  return fenceLength * costPerMeter;
};

/**
 * Calculate gate costs
 */
export const calculateGateCost = (gateType: string, width: number): number => {
  const gateWidth = ensureNumber(width);
  
  if (gateType === 'none' || gateWidth <= 0) {
    return 0;
  }
  
  let baseCost = 800; // Basic rate
  
  switch (gateType) {
    case 'manual_swing':
      baseCost = 800;
      break;
    case 'manual_sliding':
      baseCost = 1200;
      break;
    case 'automatic_swing':
      baseCost = 2500;
      break;
    case 'automatic_sliding':
      baseCost = 3200;
      break;
    default:
      baseCost = 800;
  }
  
  // Adjust cost based on width
  const widthFactor = gateWidth / 3.5; // Standard width is 3.5m
  
  return baseCost * widthFactor;
};

/**
 * Calculate terrace costs
 */
export const calculateTerraceCost = (terraceType: string, surface: number): number => {
  const area = ensureNumber(surface);
  
  if (terraceType === 'none' || area <= 0) {
    return 0;
  }
  
  let costPerSqMeter = 90; // Basic rate
  
  switch (terraceType) {
    case 'concrete':
      costPerSqMeter = 90;
      break;
    case 'wooden':
      costPerSqMeter = 180;
      break;
    case 'tiled':
      costPerSqMeter = 150;
      break;
    case 'composite':
      costPerSqMeter = 210;
      break;
    case 'stone':
      costPerSqMeter = 250;
      break;
    default:
      costPerSqMeter = 90;
  }
  
  return area * costPerSqMeter;
};

/**
 * Calculate renewable energy installation costs
 */
export const calculateRenewableEnergyCost = (energyType: string, capacity: number): number => {
  const energyCapacity = ensureNumber(capacity);
  
  if (energyType === 'none' || energyCapacity <= 0) {
    return 0;
  }
  
  let baseCost = 0;
  
  switch (energyType) {
    case 'solar_panels':
      // Cost per kW installed
      baseCost = 1500 * energyCapacity;
      break;
    case 'heat_pump':
      // Cost depends on the kW capacity
      baseCost = 2000 * energyCapacity;
      break;
    case 'geothermal':
      // Geothermal has a higher base cost
      baseCost = 3000 * energyCapacity;
      break;
    case 'wind_turbine':
      // Small residential wind turbines
      baseCost = 5000 * energyCapacity;
      break;
    default:
      baseCost = 1500 * energyCapacity;
  }
  
  return baseCost;
};

/**
 * Calculate environmental solutions costs
 */
export const calculateEnvironmentalSolutionsCost = (
  solutionType: string, 
  surface: number, 
  quantity: number = 1
): number => {
  const area = ensureNumber(surface);
  const qty = ensureNumber(quantity);
  
  if (solutionType === 'none' || (area <= 0 && qty <= 0)) {
    return 0;
  }
  
  let totalCost = 0;
  
  switch (solutionType) {
    case 'rainwater_harvesting':
      // Based on system capacity in liters (qty)
      totalCost = 2.5 * qty;
      break;
    case 'green_roof':
      // Based on roof area
      totalCost = 120 * area;
      break;
    case 'solar_water_heating':
      // Based on panel area
      totalCost = 800 * area;
      break;
    case 'home_automation':
      // Cost per m² of the building
      totalCost = 50 * area;
      break;
    case 'waste_composting':
      // Fixed cost per unit
      totalCost = 600 * qty;
      break;
    default:
      totalCost = 0;
  }
  
  return totalCost;
};

/**
 * Generic cost calculation function
 */
export const calculateCost = (
  type: string, 
  area: number, 
  baseRate: number = 100, 
  options: Record<string, number> = {}
): number => {
  const surface = ensureNumber(area);
  
  if (type === 'none' || surface <= 0) {
    return 0;
  }
  
  const rate = options[type] || baseRate;
  return surface * rate;
};

/**
 * Function to calculate and update montantT (total amount)
 */
export const calculateNewMontantT = (currentTotal: number, additionalCost: number): number => {
  const current = ensureNumber(currentTotal, 0);
  const additional = ensureNumber(additionalCost, 0);
  
  return current + additional;
};

/**
 * Calculate structural costs (overall building structure)
 */
export const calculateStructuralCost = (constructionType: string, surface: number): number => {
  const area = ensureNumber(surface);
  
  if (area <= 0) {
    return 0;
  }
  
  let costPerSqMeter = 600;
  
  switch (constructionType.toLowerCase()) {
    case 'luxury':
      costPerSqMeter = 900;
      break;
    case 'economic':
      costPerSqMeter = 400;
      break;
    case 'passive':
      costPerSqMeter = 700;
      break;
    case 'standard':
    default:
      costPerSqMeter = 600;
  }
  
  return area * costPerSqMeter;
};

// Export the ensureNumber function to make it accessible in other modules
export { ensureNumber };
