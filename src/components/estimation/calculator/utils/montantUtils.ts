import { FormData } from '../types';
import { ensureNumber } from './typeConversions';

// Function to calculate the cost of parquet flooring
export const calculateParquetCost = (parquetType: string, area: number): number => {
  if (!parquetType || parquetType === 'none') return 0;
  
  const basePrice = {
    'basic': 30,
    'medium': 50,
    'premium': 80,
    'luxury': 120
  }[parquetType] || 50;
  
  return Math.round(basePrice * area);
};

// Function to calculate the cost of soft flooring (carpet, vinyl, etc.)
export const calculateSoftFloorCost = (area: number, softFloorType: string): number => {
  if (!softFloorType || softFloorType === 'none') return 0;
  
  const basePrice = {
    'carpet': 25,
    'vinyl': 40,
    'laminate': 35
  }[softFloorType] || 30;
  
  return Math.round(basePrice * area);
};

// Function to calculate the cost of plastering
export const calculatePlasteringCost = (surface: number, plasteringType: string): number => {
  if (!plasteringType) return 0;
  
  const basePrice = {
    'traditional': 20,
    'plasterboard': 25,
    'mixed': 30
  }[plasteringType] || 20;
  
  return Math.round(basePrice * surface);
};

// Function to calculate the cost of interior carpentry (doors, moldings, etc.)
export const calculateInteriorCarpenteryCost = (doorCount: number, doorType: string): number => {
  if (!doorType) return 0;
  
  const basePrice = {
    'standard': 150,
    'premium': 300,
    'design': 500,
    'wood': 400
  }[doorType] || 150;
  
  return Math.round(basePrice * doorCount);
};

// Function to calculate the cost of a basic kitchen
export const calculateBasicKitchenCost = (kitchenType: string): number => {
    if (!kitchenType) return 0;

    const basePrice = {
        'basic': 3000,
        'standard': 5000,
        'premium': 8000,
        'luxury': 15000
    }[kitchenType] || 3000;

    return basePrice;
};

// Function to calculate the cost of a bathroom
export const calculateBathroomCost = (bathroomType: string): number => {
    if (!bathroomType) return 0;

    const basePrice = {
        'basic': 2000,
        'standard': 4000,
        'premium': 7000,
        'luxury': 12000
    }[bathroomType] || 2000;

    return basePrice;
};

// Function to calculate the cost of landscaping
export const calculateLandscapingCost = (landscapingType: string, area: number): number => {
    if (!landscapingType) return 0;

    const basePrice = {
        'garden': 50,
        'terrace': 80,
        'pool': 500,
        'driveway': 60
    }[landscapingType] || 50;

    return basePrice * area;
};

// Function to calculate the cost of demolition
export const calculateDemolitionCost = (demolitionType: string, area: number): number => {
    if (!demolitionType) return 0;

    const basePrice = {
        'wall': 30,
        'floor': 40,
        'roof': 50
    }[demolitionType] || 30;

    return basePrice * area;
};

// Function to calculate the cost of electricity
export const calculateElectricityCost = (electricalType: string, surface: number): number => {
    if (!electricalType) return 0;

    const basePrice = {
        'basic': 40,
        'standard': 60,
        'premium': 100,
        'smart_home': 150
    }[electricalType] || 40;

    return basePrice * surface;
};

// Function to calculate the cost of plumbing
export const calculatePlumbingCost = (plumbingType: string, surface: number): number => {
    if (!plumbingType) return 0;

    const basePrice = {
        'basic': 30,
        'standard': 50,
        'premium': 80
    }[plumbingType] || 30;

    return basePrice * surface;
};

// Function to calculate the cost of heating
export const calculateHeatingCost = (heatingType: string, surface: number): number => {
    if (!heatingType) return 0;

    const basePrice = {
        'standard': 120,
        'eco': 180,
        'economic': 90,
        'sans_avis': 130,
        'electric': 50,
        'gas': 70,
        'heat_pump': 90,
        'solar': 120
    }[heatingType] || 50;

    return basePrice * surface;
};

// Function to calculate air conditioning costs
export const calculateAirConditioningCost = (hasAirConditioning: boolean, area: number): number => {
    if (!hasAirConditioning) return 0;
    return 180 * ensureNumber(area);
};

// Function to calculate facade work
export const calculateFacadeCost = (facadeType: string, surface: number): number => {
    if (!facadeType) return 0;

    const basePrice = {
        'plaster': 60,
        'stone': 120,
        'brick': 80,
        'wood': 100
    }[facadeType] || 60;

    return basePrice * surface;
};

// Function to calculate roofing
export const calculateRoofingCost = (roofingType: string, area: number): number => {
    if (!roofingType) return 0;

    const basePrice = {
        'tiles': 70,
        'slate': 140,
        'metal': 90,
        'green_roof': 160
    }[roofingType] || 70;

    return basePrice * area;
};

// Function to calculate insulation
export const calculateInsulationCost = (insulationType: string, area: number): number => {
    if (!insulationType) return 0;

    const basePrice = {
        'standard': 40,
        'reinforced': 60,
        'ecological': 80
    }[insulationType] || 40;

    return basePrice * area;
};

// Function to calculate windows
export const calculateWindowsCost = (windowType: string, area: number): number => {
    if (!windowType) return 0;

    const basePrice = {
        'pvc': 200,
        'aluminum': 300,
        'wood': 400
    }[windowType] || 200;

    return basePrice * area;
};

// Function to calculate flooring
export const calculateFlooringCost = (flooringType: string, area: number): number => {
    if (!flooringType) return 0;

    const basePrice = {
        'tiles': 50,
        'parquet': 80,
        'carpet': 40
    }[flooringType] || 50;

    return basePrice * area;
};

// Function to calculate wall covering
export const calculateWallCoveringCost = (wallCoveringType: string, area: number): number => {
    if (!wallCoveringType) return 0;

    const basePrice = {
        'paint': 30,
        'wallpaper': 50,
        'wood_paneling': 80
    }[wallCoveringType] || 30;

    return basePrice * area;
};

// Function to calculate a terrace
export const calculateTerraceCost = (terraceType: string, area: number): number => {
    if (!terraceType) return 0;

    const basePrice = {
        'concrete': 60,
        'wood': 100,
        'tiles': 80
    }[terraceType] || 60;

    return basePrice * area;
};

// Function to calculate a pool
export const calculatePoolCost = (poolType: string, area: number): number => {
    if (!poolType) return 0;

    const basePrice = {
        'inground': 500,
        'above_ground': 300,
        'natural': 800
    }[poolType] || 500;

    return basePrice * area;
};

// Function to calculate fencing costs - unified into a single implementation
export function calculateFencingCost(fenceType: string, length: number): number {
    if (!fenceType) return 0;

    const basePrice = {
        'wood': 80,
        'concrete': 120,
        'metal': 100
    }[fenceType] || 80;

    return basePrice * length;
};

// Create an alias for backward compatibility
export const calculateFenceCost = calculateFencingCost;

// Function to calculate a gate
export const calculateGateCost = (gateType: string, length: number): number => {
    if (!gateType) return 0;

    const basePrice = {
        'wood': 150,
        'metal': 200,
        'automatic': 300
    }[gateType] || 150;

    return basePrice * length;
};

// Function to calculate a driveway
export const calculateDrivewayCost = (drivewayType: string, area: number): number => {
    if (!drivewayType) return 0;

    const basePrice = {
        'concrete': 50,
        'asphalt': 40,
        'paving_stones': 70
    }[drivewayType] || 50;

    return basePrice * area;
};

// Function to calculate demolition work
export const calculateDemolitionWorkCost = (demolitionType: string, area: number): number => {
    if (!demolitionType) return 0;

    const basePrice = {
        'light': 30,
        'medium': 50,
        'heavy': 70
    }[demolitionType] || 30;

    return basePrice * area;
};

// Function to calculate structural work
export const calculateStructuralWorkCost = (structuralWorkType: string, area: number): number => {
    if (!structuralWorkType) return 0;

    const basePrice = {
        'foundation': 200,
        'wall': 150,
        'roof': 250
    }[structuralWorkType] || 150;

    return basePrice * area;
};

// Function to calculate the cost of floor tiling
export const calculateFloorTilingCost = (floorTileType: string, floorTilePercentage: number, surface: number): number => {
  if (!floorTileType || floorTileType === 'none') return 0;
  
  const basePrice = {
    'standard': 40,
    'medium': 60,
    'premium': 90
  }[floorTileType] || 40;
  
  const tiledArea = surface * (floorTilePercentage / 100);
  return Math.round(basePrice * tiledArea);
};

// Function to calculate the cost of wall tiling
export const calculateWallTilingCost = (wallTileType: string, surface: number): number => {
  if (!wallTileType || wallTileType === 'none') return 0;
  
  const basePrice = {
    'standard': 50,
    'medium': 70,
    'premium': 100
  }[wallTileType] || 50;
  
  return Math.round(basePrice * surface);
};

// Function to calculate detailed facade cost
export const calculateDetailedFacadeCost = (
  formData: FormData,
  stonePercentage: string,
  plasterPercentage: string,
  brickPercentage: string,
  metalCladdingPercentage: string,
  woodCladdingPercentage: string,
  stoneCladdingPercentage: string
): number => {
  const surface = ensureNumber(formData.surface, 0);
  
  const stoneArea = surface * (ensureNumber(stonePercentage, 0) / 100);
  const plasterArea = surface * (ensureNumber(plasterPercentage, 0) / 100);
  const brickArea = surface * (ensureNumber(brickPercentage, 0) / 100);
  const metalCladdingArea = surface * (ensureNumber(metalCladdingPercentage, 0) / 100);
  const woodCladdingArea = surface * (ensureNumber(woodCladdingPercentage, 0) / 100);
  const stoneCladdingArea = surface * (ensureNumber(stoneCladdingPercentage, 0) / 100);
  
  const stoneCost = stoneArea * 120;
  const plasterCost = plasterArea * 60;
  const brickCost = brickArea * 80;
  const metalCladdingCost = metalCladdingArea * 100;
  const woodCladdingCost = woodCladdingArea * 90;
  const stoneCladdingCost = stoneCladdingArea * 110;
  
  return stoneCost + plasterCost + brickCost + metalCladdingCost + woodCladdingCost + stoneCladdingCost;
};

// Function to calculate new montantT
export const calculateNewMontantT = (oldMontantT: any, additionalCost: number): number => {
  const oldMontant = ensureNumber(oldMontantT, 0);
  return oldMontant + additionalCost;
};

// Calculate Jacuzzi cost (missing function)
export const calculateJacuzziCost = (type: string, area: number): number => {
  if (!type || type === 'none') return 0;
  
  const basePrice = {
    'basic': 3500,
    'standard': 5000,
    'premium': 8000,
    'luxury': 12000
  }[type] || 5000;
  
  // Area is typically used as a multiplier for sizing
  const sizeFactor = Math.max(1, area / 3); // 3 sqm is standard size
  
  return Math.round(basePrice * sizeFactor);
};

// Adding missing functions and ensuring all functions follow the same pattern
export const calculateCarrelageSubmit = (data: any, surface: number): number => {
  const floorTilingCost = data.floorTileType !== 'non_concerne' 
    ? calculateFloorTilingCost(data.floorTileType, data.floorTilePercentage, surface)
    : 0;
  
  const wallTilingCost = calculateWallTilingCost(data.wallTileType, surface);
  
  return floorTilingCost + wallTilingCost;
};

export const ensureProperType = (value: any, defaultValue: any) => {
  if (value === undefined || value === null) return defaultValue;
  return value;
};

// Fix any other missing functions or type inconsistencies
export const calculateElectricalCost = calculateElectricityCost;

// Function to calculate pool heating costs
export const calculatePoolHeatingCost = (hasHeating: boolean, area: number): number => {
    if (!hasHeating) return 0;
    return 120 * area; // Cost per square meter
};

// Function to calculate carport costs
export const calculateCarportCost = (type: string, area: number): number => {
    if (!type || type === 'none') return 0;
    
    const basePrice = {
        'basic': 200,
        'standard': 300,
        'premium': 450
    }[type] || 200;
    
    return basePrice * area;
};

// Function to calculate roof framework renovation costs
export const calculateRoofFrameworkRenovCost = (type: string, area: number): number => {
    if (!type || type === 'none') return 0;
    
    const basePrice = {
        'repair': 80,
        'partial_replacement': 150,
        'total_replacement': 250
    }[type] || 150;
    
    return basePrice * area;
};

// Function to calculate roofing renovation costs
export const calculateRoofingRenovCost = (type: string, area: number): number => {
    if (!type || type === 'none') return 0;
    
    const basePrice = {
        'tiles': 90,
        'slate': 160,
        'metal': 110,
        'green_roof': 180
    }[type] || 90;
    
    return basePrice * area;
};

// Function to calculate painting costs
export const calculatePaintingCost = (type: string, area: number): number => {
    if (!type || type === 'none') return 0;
    
    const basePrice = {
        'basic': 20,
        'standard': 35,
        'premium': 50
    }[type] || 35;
    
    return basePrice * area;
};

// Function to calculate environmental solutions costs
export const calculateEnvironmentalSolutionsCost = (type: string): number => {
    switch (type) {
        case 'rainwater': return 3000;
        case 'greywater': return 5000;
        case 'greenroof': return 8000;
        default: return 0;
    }
};

// Function to calculate renewable energy costs
export const calculateRenewableEnergyCost = (type: string, area: number): number => {
    switch (type) {
        case 'solar': return 300 * area;
        case 'geothermal': return 10000 + (100 * area);
        case 'windmill': return 15000;
        default: return 0;
    }
};

// Function to calculate masonry wall costs
export const calculateMasonryWallCost = (type: string, area: number): number => {
    if (!type || type === 'none') return 0;
    
    const basePrice = {
        'brick': 120,
        'concrete_block': 100,
        'stone': 180
    }[type] || 120;
    
    return basePrice * area;
};

// Function to calculate floor costs
export const calculateFloorCost = (type: string, area: number): number => {
    if (!type || type === 'none') return 0;
    
    const basePrice = {
        'concrete': 80,
        'wood': 120,
        'reinforced': 150
    }[type] || 100;
    
    return basePrice * area;
};

// Function to calculate structural feature costs
export const calculateStructuralFeatureCost = (type: string, area: number): number => {
    if (!type || type === 'none') return 0;
    
    const basePrice = {
        'beam': 200,
        'column': 180,
        'arch': 250
    }[type] || 200;
    
    return basePrice * area;
};

// Function to calculate kitchen costs including island options
export const calculateKitchenCost = (kitchenType: string, hasIsland: boolean = false): number => {
    if (!kitchenType) return 0;

    const basePrice = {
        'basic': 3000,
        'standard': 5000,
        'premium': 8000,
        'luxury': 15000
    }[kitchenType] || 3000;

    // Add cost for island if selected
    const islandCost = hasIsland ? 1500 : 0;
    
    return basePrice + islandCost;
};

// Export ensureNumber for use in other files
export { ensureNumber };
