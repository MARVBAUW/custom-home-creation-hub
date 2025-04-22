
import { ensureNumber, percentageToNumber } from './typeConversions';
import { FormData } from '../types';

// Base calculation function with adjustable factors
export const calculateCost = (
  basePrice: number, 
  surface: number, 
  qualityFactor: number = 1, 
  complexityFactor: number = 1
): number => {
  return basePrice * surface * qualityFactor * complexityFactor;
};

// Structural costs calculations
export const calculateStructuralCost = (
  formData: FormData, 
  qualityFactor: number = 1, 
  complexityFactor: number = 1
): number => {
  const baseCost = 1200; // Base cost per m²
  return calculateCost(baseCost, formData.surface, qualityFactor, complexityFactor);
};

export const calculateMasonryWallCost = (
  length: number = 0, 
  height: number = 0, 
  material: string = 'standard'
): number => {
  const baseRate = material === 'premium' ? 450 : material === 'standard' ? 350 : 250;
  return baseRate * length * height;
};

export const calculateFloorCost = (
  surface: number = 0,
  material: string = 'standard'
): number => {
  const baseRate = material === 'premium' ? 180 : material === 'standard' ? 120 : 80;
  return baseRate * surface;
};

export const calculateRoofFrameworkCost = (
  surface: number = 0, 
  type: string = 'standard'
): number => {
  const baseRate = type === 'complex' ? 190 : type === 'standard' ? 140 : 100;
  return baseRate * surface;
};

export const calculateRoofFrameworkRenovCost = (
  surface: number = 0, 
  condition: string = 'good'
): number => {
  const baseRate = condition === 'poor' ? 220 : condition === 'average' ? 160 : 110;
  return baseRate * surface;
};

export const calculateRoofingCost = (
  surface: number = 0, 
  material: string = 'tiles'
): number => {
  const rates: Record<string, number> = {
    'tiles': 85,
    'slate': 120,
    'metal': 95,
    'flat': 140,
    'green': 180
  };
  const baseRate = rates[material] || 85;
  return baseRate * surface;
};

export const calculateRoofingRenovCost = (
  surface: number = 0, 
  material: string = 'tiles'
): number => {
  const rates: Record<string, number> = {
    'tiles': 110,
    'slate': 150,
    'metal': 120,
    'flat': 180,
    'green': 220
  };
  const baseRate = rates[material] || 110;
  return baseRate * surface;
};

export const calculateFacadeCost = (
  formData: FormData,
  renderType: string = 'standard',
  insulation: boolean = false,
  percentages: {
    render: number,
    stone: number,
    brick: number,
    wood: number,
    other: number
  } = { render: 100, stone: 0, brick: 0, wood: 0, other: 0 }
): number => {
  // Base costs per m² for different facade materials
  const costs: Record<string, number> = {
    'render': insulation ? 95 : 65,
    'stone': 280,
    'brick': 160,
    'wood': 210,
    'other': 120
  };
  
  // Quality adjustments
  if (renderType === 'premium') {
    costs.render *= 1.3;
  } else if (renderType === 'basic') {
    costs.render *= 0.8;
  }
  
  // Calculate facade area (approximate)
  const height = 2.8; // Average height per floor
  const floors = Math.max(1, Math.ceil(formData.surface / 120)); // Estimate floors
  const perimeterFactor = 3.5; // Perimeter to area ratio factor
  const estimatedPerimeter = Math.sqrt(formData.surface) * perimeterFactor;
  const facadeArea = estimatedPerimeter * height * floors;
  
  // Calculate weighted cost based on material percentages
  let totalCost = 0;
  totalCost += (percentages.render / 100) * costs.render * facadeArea;
  totalCost += (percentages.stone / 100) * costs.stone * facadeArea;
  totalCost += (percentages.brick / 100) * costs.brick * facadeArea;
  totalCost += (percentages.wood / 100) * costs.wood * facadeArea;
  totalCost += (percentages.other / 100) * costs.other * facadeArea;
  
  return totalCost;
};

// Interior costs calculations
export const calculatePlasteringCost = (
  surface: number = 0, 
  quality: string = 'standard'
): number => {
  const rates: Record<string, number> = {
    'premium': 45,
    'standard': 35,
    'basic': 25
  };
  const baseRate = rates[quality] || 35;
  return baseRate * surface;
};

export const calculatePaintingCost = (
  surface: number = 0, 
  quality: string = 'standard',
  coats: number = 2
): number => {
  const rates: Record<string, number> = {
    'premium': 28,
    'standard': 22,
    'basic': 16
  };
  const baseRate = rates[quality] || 22;
  return baseRate * surface * coats;
};

export const calculateFloorTilingCost = (
  surface: number = 0, 
  tileQuality: string = 'standard'
): number => {
  const rates: Record<string, number> = {
    'premium': 110,
    'standard': 85,
    'basic': 60
  };
  const baseRate = rates[tileQuality] || 85;
  return baseRate * surface;
};

export const calculateWallTilingCost = (
  surface: number = 0, 
  tileQuality: string = 'standard'
): number => {
  const rates: Record<string, number> = {
    'premium': 95,
    'standard': 75,
    'basic': 55
  };
  const baseRate = rates[tileQuality] || 75;
  return baseRate * surface;
};

export const calculateSoftFloorCost = (
  surface: number = 0, 
  floorType: string = 'laminate'
): number => {
  const rates: Record<string, number> = {
    'laminate': 45,
    'vinyl': 55,
    'carpet': 40,
    'hardwood': 120,
    'engineered': 95
  };
  const baseRate = rates[floorType] || 45;
  return baseRate * surface;
};

export const calculateInteriorCarpenteryCost = (
  doors: number = 0, 
  builtIns: number = 0, 
  quality: string = 'standard'
): number => {
  const doorRates: Record<string, number> = {
    'premium': 900,
    'standard': 650,
    'basic': 450
  };
  const builtInRates: Record<string, number> = {
    'premium': 1200,
    'standard': 800,
    'basic': 500
  };
  
  const doorRate = doorRates[quality] || 650;
  const builtInRate = builtInRates[quality] || 800;
  
  return (doorRate * doors) + (builtInRate * builtIns);
};

// Technical costs calculations
export const calculateElectricityCost = (
  surface: number = 0, 
  quality: string = 'standard',
  renovation: boolean = false
): number => {
  const rates: Record<string, number> = {
    'premium': renovation ? 110 : 85,
    'standard': renovation ? 90 : 65,
    'basic': renovation ? 75 : 50
  };
  const baseRate = rates[quality] || (renovation ? 90 : 65);
  return baseRate * surface;
};

export const calculateElectricalCost = (surface: number, quality: string = 'standard'): number => {
  return calculateElectricityCost(surface, quality);
};

export const calculatePlumbingCost = (
  surface: number = 0, 
  fixtures: number = 0, 
  quality: string = 'standard'
): number => {
  const baseSurfaceRate = quality === 'premium' ? 75 : quality === 'standard' ? 60 : 45;
  const fixtureRate = quality === 'premium' ? 800 : quality === 'standard' ? 600 : 400;
  
  return (baseSurfaceRate * surface) + (fixtureRate * fixtures);
};

export const calculateHeatingCost = (
  surface: number = 0, 
  system: string = 'radiators',
  energyEfficient: boolean = false
): number => {
  const rates: Record<string, number> = {
    'radiators': 80,
    'underfloor': 120,
    'heatpump': 150,
    'centralgas': 90,
    'electric': 60
  };
  
  const baseRate = rates[system] || 80;
  const efficiencyMultiplier = energyEfficient ? 1.3 : 1;
  
  return baseRate * surface * efficiencyMultiplier;
};

export const calculateAirConditioningCost = (
  surface: number = 0, 
  type: string = 'split'
): number => {
  const rates: Record<string, number> = {
    'split': 110,
    'ducted': 190,
    'multi': 150,
    'vrf': 230
  };
  
  const baseRate = rates[type] || 110;
  return baseRate * surface;
};

// Bathroom and kitchen costs
export const calculateBathroomCost = (
  size: string = 'medium',
  quality: string = 'standard',
  hasShower: boolean = true, 
  hasBath: boolean = false
): number => {
  // Base costs for different bathroom sizes
  const baseCosts: Record<string, number> = {
    'small': 5500,
    'medium': 8500,
    'large': 12000
  };
  
  // Quality multipliers
  const qualityMultipliers: Record<string, number> = {
    'basic': 0.8,
    'standard': 1,
    'premium': 1.4,
    'luxury': 1.8
  };
  
  // Feature additions
  const showerCost = hasShower ? (quality === 'premium' ? 2500 : 1500) : 0;
  const bathCost = hasBath ? (quality === 'premium' ? 3000 : 1800) : 0;
  
  const baseRate = baseCosts[size] || 8500;
  const qualityMultiplier = qualityMultipliers[quality] || 1;
  
  return (baseRate * qualityMultiplier) + showerCost + bathCost;
};

export const calculateKitchenCost = (
  size: string = 'medium',
  quality: string = 'standard',
  hasIsland: boolean = false,
  appliances: string = 'standard'
): number => {
  // Base costs for different kitchen sizes
  const baseCosts: Record<string, number> = {
    'small': 7000,
    'medium': 12000,
    'large': 18000
  };
  
  // Quality multipliers
  const qualityMultipliers: Record<string, number> = {
    'basic': 0.7,
    'standard': 1,
    'premium': 1.5,
    'luxury': 2.2
  };
  
  // Feature additions
  const islandCost = hasIsland ? 3500 : 0;
  
  // Appliance quality costs
  const applianceCosts: Record<string, number> = {
    'basic': 3000,
    'standard': 5000,
    'premium': 8000,
    'luxury': 12000
  };
  
  const baseRate = baseCosts[size] || 12000;
  const qualityMultiplier = qualityMultipliers[quality] || 1;
  const applianceCost = applianceCosts[appliances] || 5000;
  
  return (baseRate * qualityMultiplier) + islandCost + applianceCost;
};

// External works calculations
export const calculateLandscapingCost = (
  surface: number = 0, 
  complexity: string = 'medium'
): number => {
  const rates: Record<string, number> = {
    'simple': 45,
    'medium': 75,
    'complex': 120
  };
  
  const baseRate = rates[complexity] || 75;
  return baseRate * surface;
};

export const calculateFencingCost = (
  length: number = 0, 
  type: string = 'standard'
): number => {
  const rates: Record<string, number> = {
    'simple': 80,
    'standard': 120,
    'premium': 220
  };
  
  const baseRate = rates[type] || 120;
  return baseRate * length;
};

export const calculateGateCost = (
  width: number = 0, 
  automated: boolean = false,
  quality: string = 'standard'
): number => {
  const baseRates: Record<string, number> = {
    'basic': 800,
    'standard': 1200,
    'premium': 2000
  };
  
  const automationCost = automated ? 1500 : 0;
  const baseRate = baseRates[quality] || 1200;
  return (baseRate * width) + automationCost;
};

export const calculateTerraceCost = (
  surface: number = 0, 
  material: string = 'concrete'
): number => {
  const rates: Record<string, number> = {
    'concrete': 120,
    'wood': 180,
    'composite': 250,
    'stone': 320,
    'tile': 280
  };
  
  const baseRate = rates[material] || 120;
  return baseRate * surface;
};

// Specialty calculations
export const calculateDemolitionCost = (
  surface: number = 0, 
  type: string = 'partial',
  structureType: string = 'standard'
): number => {
  const rates: Record<string, number> = {
    'partial': 120,
    'complete': 180,
    'selective': 150
  };
  
  // Structure type multipliers
  const structureMultipliers: Record<string, number> = {
    'light': 0.8,
    'standard': 1,
    'heavy': 1.3
  };
  
  const baseRate = rates[type] || 120;
  const multiplier = structureMultipliers[structureType] || 1;
  
  return baseRate * surface * multiplier;
};

export const calculateRenewableEnergyCost = (
  system: string = 'solar',
  capacity: number = 0
): number => {
  const rates: Record<string, number> = {
    'solar': 1500,
    'heatpump': 1200,
    'biomass': 1800,
    'thermal': 900
  };
  
  const baseRate = rates[system] || 1500;
  return baseRate * capacity;
};

export const calculateEnvironmentalSolutionsCost = (
  solution: string = 'insulation',
  surface: number = 0
): number => {
  const rates: Record<string, number> = {
    'insulation': 65,
    'windows': 450,
    'ventilation': 80,
    'waterrecycling': 120
  };
  
  const baseRate = rates[solution] || 65;
  return baseRate * surface;
};

export const calculateInsulationCost = (
  surface: number = 0, 
  type: string = 'standard',
  location: string = 'walls'
): number => {
  const typeRates: Record<string, number> = {
    'basic': 35,
    'standard': 50,
    'premium': 70
  };
  
  const locationMultipliers: Record<string, number> = {
    'walls': 1,
    'roof': 0.9,
    'floor': 1.1
  };
  
  const baseRate = typeRates[type] || 50;
  const multiplier = locationMultipliers[location] || 1;
  
  return baseRate * surface * multiplier;
};

export const calculateStructuralFeatureCost = (
  feature: string = 'beam',
  size: number = 0
): number => {
  const rates: Record<string, number> = {
    'beam': 350,
    'column': 400,
    'archway': 600,
    'stairs': 1200
  };
  
  const baseRate = rates[feature] || 350;
  return baseRate * size;
};

// Fix issue with empty form data by providing default Form Data
export const getDefaultFormData = (): FormData => {
  return {
    clientType: 'individual',
    projectType: 'construction',
    surface: 0,
    city: '',
    location: '',
    bedrooms: 0,
    bathrooms: 0,
    constructionType: 'standard',
    estimatedCost: 0,
    structuralWork: 0,
    finishingWork: 0,
    technicalLots: 0,
    externalWorks: 0,
    architectFees: 0,
    engineeringFees: 0,
    projectManagement: 0,
    officialFees: 0,
    inspectionFees: 0,
    technicalStudies: 0,
    permits: 0,
    insurance: 0,
    contingency: 0,
    taxes: 0,
    other: 0,
    land: 0,
    demolition: 0,
    siteDevelopment: 0,
    miscellaneous: 0,
    designTime: 0,
    permitsTime: 0,
    biddingTime: 0,
    constructionTime: 0,
    totalTimeMonths: 0
  };
};
