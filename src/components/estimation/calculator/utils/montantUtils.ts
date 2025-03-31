// Re-export the utility functions from typeConversions.ts
export { ensureNumber, toFormValue } from './typeConversions';

/**
 * Calculate the cost of kitchen based on type and unit count
 * @param kitchenType Type of kitchen
 * @param unitCount Number of units (dwellings)
 * @returns The calculated cost
 */
export const calculateKitchenCost = (kitchenType: string, unitCount: number): number => {
  const unitCountNum = ensureNumber(unitCount, 1);
  let baseCost = 0;
  
  switch (kitchenType) {
    case 'KITCHENETTE':
      baseCost = 2700;
      break;
    case 'CUISINE DE BASE':
      baseCost = 8500;
      break;
    case 'CUISINE +':
      baseCost = 13500;
      break;
    case 'CUISINIE PREMIUM':
      baseCost = 19000;
      break;
    case 'SANS CUISINE':
      baseCost = 0;
      break;
    default:
      baseCost = 0;
  }
  
  return baseCost * unitCountNum;
};

/**
 * Calculate the cost of bathroom based on quality and count
 * @param bathroomType Type/quality of bathroom
 * @param bathroomCount Number of bathrooms
 * @returns The calculated cost
 */
export const calculateBathroomCost = (bathroomType: string, bathroomCount: number | string): number => {
  const count = ensureNumber(bathroomCount, 1);
  let baseCost = 0;
  
  switch (bathroomType) {
    case 'BASE':
      baseCost = 2000;
      break;
    case 'MILIEU DE GAMME':
      baseCost = 3150;
      break;
    case 'PREMIUM':
      baseCost = 4200;
      break;
    case 'SANS OBJET':
    case 'NON CONCERNE':
      baseCost = 0;
      break;
    default:
      baseCost = 0;
  }
  
  return baseCost * count;
};

/**
 * Calculate demolition costs based on demolition types and surface
 * @param demolitionTypes Array of demolition types
 * @param percentages Object with demolition percentages
 * @param surface Total surface area
 * @returns The calculated cost
 */
export const calculateDemolitionCost = (
  demolitionTypes: string[], 
  percentages: { [key: string]: number },
  surface: number | string
): number => {
  const surfaceNum = ensureNumber(surface, 0);
  let totalCost = 0;
  
  const costCoefficients: { [key: string]: number } = {
    'REVETEMENT DE FACADE': 0.65,
    'PLATRERIE': 0.19,
    'REVETEMENTS DE SOL': 0.25,
    'MENUISERIES INTERIEURES': 0.1,
    'MENUISERIES EXTERIEURES': 0.08,
    'PLOMBERIE': 0.17,
    'EQUIPEMENTS SANITAIRES': 0.08,
    'ELECTRICITE': 0.18,
    'CLIMATISATION': 0.06,
    'VENTILATION': 0.06,
    'CHAUFFAGE': 0.12,
    'TOTALITE HORS GROS OEUVRE': 193
  };
  
  if (demolitionTypes.includes('TOTALITE HORS GROS OEUVRE')) {
    return costCoefficients['TOTALITE HORS GROS OEUVRE'] * surfaceNum;
  }
  
  if (demolitionTypes.includes('PAS DE DEMOLITION')) {
    return 0;
  }
  
  for (const demoType of demolitionTypes) {
    if (demoType === 'GROS OEUVRE (MACONNERIE, DALLE..)') {
      // Special calculation for structural work
      const percent = percentages[demoType] || 0;
      totalCost += 250 * surfaceNum * (percent / 100);
    } else if (costCoefficients[demoType]) {
      const percent = percentages[demoType] || 0;
      totalCost += costCoefficients[demoType] * surfaceNum * (percent / 100);
    }
  }
  
  return totalCost;
};

/**
 * Calculate structural renovation costs
 * @param createWalls Whether walls are being created
 * @param wallArea Wall area
 * @param createFloors Whether floors are being created
 * @param floorType Type of floor
 * @param floorArea Floor area
 * @param features Array of structural features
 * @param values Object with feature values
 * @returns The calculated cost
 */
export const calculateStructuralRenovCost = (
  createWalls: boolean,
  wallArea: number | string,
  createFloors: boolean,
  floorType: string,
  floorArea: number | string,
  features: string[],
  values: { [key: string]: number | string }
): number => {
  let totalCost = 0;
  
  // Calculate walls cost
  if (createWalls) {
    const area = ensureNumber(wallArea, 0);
    totalCost += 120 * area; // 120€ per m² for wall creation
  }
  
  // Calculate floors cost
  if (createFloors) {
    const area = ensureNumber(floorArea, 0);
    if (floorType === 'BOIS') {
      totalCost += 80 * area; // 80€ per m² for wooden floors
    } else if (floorType === 'BETON') {
      totalCost += 120 * area; // 120€ per m² for concrete floors
    }
  }
  
  // Calculate costs for special structural features
  const costCoefficients: { [key: string]: number } = {
    'RESEAUX EVACUATION A REPRENDRE / TRANCHEE / REBOUCHAGE': 120,
    'DEMOLITION MUR PORTEUR': 120,
    'POSE D\'UN IPN': 850,
    'OUVERTURE EN FACADE/MUR PORTEUR': 120,
    'CREATION D\'UNE TREMIE* (ouverture dans un plancher pour accéder à un étage supérieur)': 90,
    'FONDATION SEMELLE': 80,
    'FONDATION MASSIF': 110,
    'CHAPE': 22,
    'RACCORDEMENT SANTAIRE RESEAU URBAIN': 145
  };
  
  for (const feature of features) {
    if (costCoefficients[feature]) {
      const value = ensureNumber(values[feature], 0);
      totalCost += costCoefficients[feature] * value;
    }
  }
  
  return totalCost;
};

/**
 * Calculate roof framework (charpente) renovation costs
 * @param roofType Type of roof structure
 * @param area Surface area to renovate
 * @returns The calculated cost
 */
export const calculateRoofFrameworkRenovCost = (roofType: string, area: number | string): number => {
  const areaNum = ensureNumber(area, 0);
  let baseCost = 0;
  
  switch (roofType) {
    case 'TOITURE TERRASSE ACCESSIBLE':
      baseCost = 190;
      break;
    case 'TOITURE TERRASSE INACCESSIBLE':
      baseCost = 180;
      break;
    case 'CHARPENTE INDUSTRIELLE':
      baseCost = 160;
      break;
    case 'CHARPENTE TRADITIONNELLE':
      baseCost = 185;
      break;
    case 'NON CONCERNE':
      baseCost = 0;
      break;
    default:
      baseCost = 0;
  }
  
  return baseCost * areaNum;
};

/**
 * Calculate roofing (couverture) renovation costs
 * @param roofingType Type of roofing
 * @param area Surface area to renovate
 * @returns The calculated cost
 */
export const calculateRoofingRenovCost = (roofingType: string, area: number | string): number => {
  const areaNum = ensureNumber(area, 0);
  let baseCost = 0;
  
  switch (roofingType) {
    case 'TUILE PLATE':
      baseCost = 125;
      break;
    case 'TUILE RONDE':
      baseCost = 130;
      break;
    case 'ARDOISE':
      baseCost = 180;
      break;
    case 'ZINC JOINT DEBOUT':
      baseCost = 200;
      break;
    case 'TOIT DE CHAUME':
      baseCost = 250;
      break;
    case 'BAC ACIER':
      baseCost = 115;
      break;
    case 'ETANCHEITE BITUME (TOITURE PLATE)':
      baseCost = 125;
      break;
    case 'TOITURE VEGETALISE (TOITURE PLATE)':
      baseCost = 186;
      break;
    case 'TOITURE GRAVILLONNEE (TOITURE PLATE)':
      baseCost = 145;
      break;
    case 'NON CONCERNE':
      baseCost = 0;
      break;
    default:
      baseCost = 0;
  }
  
  return baseCost * areaNum;
};

/**
 * Calculate plumbing cost based on type
 * @param plumbingType Type of plumbing
 * @param area Surface area
 * @returns The calculated cost
 */
export const calculatePlumbingCost = (plumbingType: string, area: number | string): number => {
  const areaNum = ensureNumber(area, 0);
  let baseCost = 0;
  
  switch (plumbingType) {
    case 'base':
      baseCost = 80;
      break;
    case 'avancee':
      baseCost = 100;
      break;
    case 'hautDeGamme':
      baseCost = 125;
      break;
    default:
      baseCost = 80;
  }
  
  return baseCost * areaNum;
};

/**
 * Calculate cost for renewable energy systems
 * @param type Type of renewable energy
 * @param area Area or capacity
 * @returns The calculated cost
 */
export const calculateRenewableEnergyCost = (type: string, area: number | string): number => {
  const areaNum = ensureNumber(area, 0);
  let baseCost = 0;
  
  switch (type) {
    case 'solar':
      baseCost = 600;
      break;
    case 'geothermal':
      baseCost = 1200;
      break;
    case 'windTurbine':
      baseCost = 1500;
      break;
    default:
      baseCost = 0;
  }
  
  return baseCost * areaNum;
};

/**
 * Calculate cost for environmental solutions
 * @param type Type of environmental solution
 * @param area Affected area
 * @returns The calculated cost
 */
export const calculateEnvironmentalSolutionsCost = (type: string, area: number | string): number => {
  const areaNum = ensureNumber(area, 0);
  let baseCost = 0;
  
  switch (type) {
    case 'ecoMaterials':
      baseCost = 80;
      break;
    case 'rainwaterHarvesting':
      baseCost = 3500; // Fixed cost
      return baseCost;
    case 'greyWaterRecycling':
      baseCost = 4500; // Fixed cost
      return baseCost;
    default:
      baseCost = 0;
  }
  
  return baseCost * areaNum;
};

/**
 * Calculate painting costs
 * @param type Type of paint
 * @param surface Surface area
 * @returns The calculated cost
 */
export const calculatePaintingCost = (type: string, surface: number | string): number => {
  const surfaceNum = ensureNumber(surface, 0);
  let baseCost = 0;
  
  switch (type) {
    case 'basic':
      baseCost = 25;
      break;
    case 'medium':
      baseCost = 35;
      break;
    case 'premium':
      baseCost = 45;
      break;
    default:
      baseCost = 25;
  }
  
  return baseCost * surfaceNum;
};

/**
 * Calculate carport cost
 * @param type Type of carport (SIMPLE/DOUBLE)
 * @returns The calculated cost
 */
export const calculateCarportCost = (type: string): number => {
  switch (type) {
    case 'SIMPLE':
      return 4800;
    case 'DOUBLE':
      return 6700;
    default:
      return 0;
  }
};

/**
 * Calculate pool cost
 * @param type Type of pool
 * @param area Pool area in m²
 * @returns The calculated cost
 */
export const calculatePoolCost = (type: string, area: number | string): number => {
  const areaNum = ensureNumber(area, 0);
  let baseCost = 0;
  
  switch (type) {
    case 'COQUE POLYESTER':
      baseCost = 880;
      break;
    case 'BETON':
      baseCost = 1350;
      break;
    case 'PISCINE LAGON (HORS AMENAGEMENT PAYSAGER)':
      baseCost = 1950;
      break;
    default:
      baseCost = 0;
  }
  
  return baseCost * areaNum;
};

/**
 * Calculate pool heating cost
 * @param hasHeating Whether pool has heating
 * @param area Pool area in m²
 * @returns The calculated cost
 */
export const calculatePoolHeatingCost = (hasHeating: string, area: number | string): number => {
  if (hasHeating === 'AVEC') {
    return 120 * ensureNumber(area, 0);
  }
  return 0;
};

/**
 * Calculate jacuzzi cost
 * @param type Type of jacuzzi
 * @param area Jacuzzi area in m²
 * @returns The calculated cost
 */
export const calculateJacuzziCost = (type: string, area: number | string): number => {
  const areaNum = ensureNumber(area, 0);
  let baseCost = 0;
  
  switch (type) {
    case 'BASE':
      baseCost = 1500;
      break;
    case 'PLUS':
      baseCost = 2750;
      break;
    case 'PREMIUM':
      baseCost = 3550;
      break;
    default:
      baseCost = 0;
  }
  
  return baseCost * areaNum;
};

/**
 * Calculate landscaping costs
 * @param type Type of landscaping
 * @param area Landscaping area in m²
 * @returns The calculated cost
 */
export const calculateLandscapingCost = (type: string, area: number | string): number => {
  const areaNum = ensureNumber(area, 0);
  let baseCost = 0;
  
  switch (type) {
    case 'UN PEU':
      baseCost = 23;
      break;
    case 'BEAUCOUP':
      baseCost = 42;
      break;
    case 'PASSIONNEMENT':
      baseCost = 60;
      break;
    default:
      baseCost = 0;
  }
  
  return baseCost * areaNum;
};

/**
 * Calculate gate cost
 * @param length Length in ml
 * @returns The calculated cost
 */
export const calculateGateCost = (length: number | string): number => {
  return 1450 * ensureNumber(length, 0);
};

/**
 * Calculate fence cost
 * @param length Length in ml
 * @returns The calculated cost
 */
export const calculateFenceCost = (length: number | string): number => {
  return 85 * ensureNumber(length, 0);
};

/**
 * Calculate terrace cost
 * @param area Terrace area in m²
 * @returns The calculated cost
 */
export const calculateTerraceCost = (area: number | string): number => {
  return 90 * ensureNumber(area, 0);
};

/**
 * Calculate windows cost
 * @param type Type of windows
 * @param area Area of windows in m²
 * @returns The calculated cost
 */
export const calculateWindowsCost = (type: string, area: number | string): number => {
  const areaNum = ensureNumber(area, 0);
  let baseCost = 0;
  
  switch (type) {
    case 'bois':
      baseCost = 650;
      break;
    case 'pvc':
      baseCost = 390;
      break;
    case 'alu':
      baseCost = 620;
      break;
    case 'mixte':
      baseCost = 690;
      break;
    case 'pvcColore':
      baseCost = 410;
      break;
    default:
      baseCost = 400;
  }
  
  return baseCost * areaNum;
};

/**
 * Calculate new total montant by adding a cost
 * @param currentMontant Current montant value
 * @param additionalCost Cost to add
 * @returns The new total montant
 */
export const calculateNewMontantT = (currentMontant: number | undefined, additionalCost: number): number => {
  const current = currentMontant || 0;
  return current + additionalCost;
};

/**
 * Calculate component cost based on surface and rate
 * @param surface Surface area
 * @param rate Rate per square meter
 * @returns The calculated cost
 */
export const calculateComponentCost = (surface: number | string | undefined, rate: number): number => {
  const surfaceNum = ensureNumber(surface, 0);
  return surfaceNum * rate;
};

/**
 * Calculate insulation cost based on type and surface
 * @param surface Surface area
 * @param insulationType Type of insulation
 * @returns The calculated cost
 */
export const calculateInsulationCost = (surface: number | string | undefined, insulationType: string): number => {
  const surfaceNum = ensureNumber(surface, 0);
  let rate = 100; // Default to ISO+ (performance)
  
  switch (insulationType) {
    case 'base':
      rate = 80; // ISO DE BASE
      break;
    case 'performance':
      rate = 100; // ISO+
      break;
    case 'ultraPerformance':
      rate = 120; // ISO++
      break;
    case 'non_concerne':
      rate = 0; // No insulation
      break;
  }
  
  return surfaceNum * rate;
};

/**
 * Calculate electrical installation cost
 * @param type Type of electrical system
 * @param surface Surface area
 * @returns The calculated cost
 */
export const calculateElectricalCost = (type: string, surface: number | string): number => {
  const surfaceNum = ensureNumber(surface, 0);
  let baseCost = 0;
  
  switch (type) {
    case 'basic':
      baseCost = 45;
      break;
    case 'standard':
      baseCost = 60;
      break;
    case 'premium':
      baseCost = 80;
      break;
    case 'smart_home':
      baseCost = 120;
      break;
    default:
      baseCost = 50;
  }
  
  return baseCost * surfaceNum;
};

/**
 * Calculate facade materials cost
 * @param formData Form data containing surface
 * @param stonePercentage Stone percentage
 * @param plasterPercentage Plaster percentage
 * @param brickPercentage Brick percentage
 * @param metalCladdingPercentage Metal cladding percentage
 * @param woodCladdingPercentage Wood cladding percentage
 * @param stoneCladdingPercentage Stone cladding percentage
 * @returns The calculated cost
 */
export const calculateFacadeCost = (
  formData: any,
  stonePercentage: number | string,
  plasterPercentage: number | string,
  brickPercentage: number | string,
  metalCladdingPercentage: number | string,
  woodCladdingPercentage: number | string,
  stoneCladdingPercentage: number | string
): number => {
  const surface = ensureNumber(formData.surface, 0);
  
  // Calculate total facade surface (assuming 3m height per level)
  const levels = ensureNumber(formData.levels, 1);
  const facadeSurface = Math.sqrt(surface) * 4 * 3 * levels;
  
  // Calculate the cost of each material
  const stonePerc = ensureNumber(stonePercentage, 0) / 100;
  const plasterPerc = ensureNumber(plasterPercentage, 0) / 100;
  const brickPerc = ensureNumber(brickPercentage, 0) / 100;
  const metalPerc = ensureNumber(metalCladdingPercentage, 0) / 100;
  const woodPerc = ensureNumber(woodCladdingPercentage, 0) / 100;
  const stoneCladdingPerc = ensureNumber(stoneCladdingPercentage, 0) / 100;
  
  const stoneCost = stonePerc * facadeSurface * 180;
  const plasterCost = plasterPerc * facadeSurface * 60;
  const brickCost = brickPerc * facadeSurface * 90;
  const metalCost = metalPerc * facadeSurface * 120;
  const woodCost = woodPerc * facadeSurface * 150;
  const stoneCladdingCost = stoneCladdingPerc * facadeSurface * 160;
  
  return stoneCost + plasterCost + brickCost + metalCost + woodCost + stoneCladdingCost;
};

/**
 * Calculate masonry wall cost
 * @param area Wall area in m²
 * @returns The calculated cost
 */
export const calculateMasonryWallCost = (area: number | string): number => {
  return 120 * ensureNumber(area, 0);
};

/**
 * Calculate floor cost
 * @param type Type of floor
 * @param area Floor area in m²
 * @returns The calculated cost
 */
export const calculateFloorCost = (type: string, area: number | string): number => {
  const areaNum = ensureNumber(area, 0);
  
  if (type === 'BOIS') {
    return 80 * areaNum;
  } else if (type === 'BETON') {
    return 120 * areaNum;
  }
  
  return 0;
};

/**
 * Calculate structural feature cost
 * @param feature Feature name
 * @param value Feature value
 * @returns The calculated cost
 */
export const calculateStructuralFeatureCost = (feature: string, value: number | string): number => {
  const valueNum = ensureNumber(value, 0);
  
  const costCoefficients: { [key: string]: number } = {
    'RESEAUX EVACUATION A REPRENDRE / TRANCHEE / REBOUCHAGE': 120,
    'DEMOLITION MUR PORTEUR': 120,
    'POSE D\'UN IPN': 850,
    'OUVERTURE EN FACADE/MUR PORTEUR': 120,
    'CREATION D\'UNE TREMIE* (ouverture dans un plancher pour accéder à un étage supérieur)': 90,
    'FONDATION SEMELLE': 80,
    'FONDATION MASSIF': 110,
    'CHAPE': 22,
    'RACCORDEMENT SANTAIRE RESEAU URBAIN': 145
  };
  
  return (costCoefficients[feature] || 0) * valueNum;
};

/**
 * Calculate window cost
 * @param windowType Window type
 * @param area Window area
 * @returns The calculated cost
 */
export const calculateWindowCost = (windowType: string, area: number | string): number => {
  return calculateWindowsCost(windowType, area);
};

/**
 * Calculate floor tiling cost
 * @param type Type of floor tile
 * @param area Area in m²
 * @returns The calculated cost
 */
export const calculateFloorTilingCost = (type: string, area: number | string): number => {
  const areaNum = ensureNumber(area, 0);
  let baseCost = 0;
  
  switch (type) {
    case 'base':
      baseCost = 60;
      break;
    case 'mid':
      baseCost = 90;
      break;
    case 'premium':
      baseCost = 130;
      break;
    default:
      baseCost = 60;
  }
  
  return baseCost * areaNum;
};

/**
 * Calculate wall tiling cost
 * @param type Type of wall tile
 * @param area Area in m²
 * @returns The calculated cost
 */
export const calculateWallTilingCost = (type: string, area: number | string): number => {
  const areaNum = ensureNumber(area, 0);
  let baseCost = 0;
  
  switch (type) {
    case 'base':
      baseCost = 70;
      break;
    case 'mid':
      baseCost = 100;
      break;
    case 'premium':
      baseCost = 150;
      break;
    default:
      baseCost = 70;
  }
  
  return baseCost * areaNum;
};

/**
 * Calculate plastering cost
 * @param type Type of plastering
 * @param area Area in m²
 * @returns The calculated cost
 */
export const calculatePlasteringCost = (type: string, area: number | string): number => {
  const areaNum = ensureNumber(area, 0);
  let baseCost = 0;
  
  switch (type) {
    case 'basic':
      baseCost = 30;
      break;
    case 'standard':
      baseCost = 40;
      break;
    case 'premium':
      baseCost = 55;
      break;
    default:
      baseCost = 35;
  }
  
  return baseCost * areaNum;
};

/**
 * Calculate interior carpentry cost
 * @param type Type of carpentry
 * @param area Area in m²
 * @returns The calculated cost
 */
export const calculateInteriorCarpenteryCost = (type: string, area: number | string): number => {
  const areaNum = ensureNumber(area, 0);
  let baseCost = 0;
  
  switch (type) {
    case 'basic':
      baseCost = 120;
      break;
    case 'standard':
      baseCost = 180;
      break;
    case 'premium':
      baseCost = 250;
      break;
    default:
      baseCost = 150;
  }
  
  return baseCost * areaNum;
};

/**
 * Calculate heating cost
 * @param type Type of heating
 * @param area Area in m²
 * @returns The calculated cost
 */
export const calculateHeatingCost = (type: string, area: number | string): number => {
  const areaNum = ensureNumber(area, 0);
  let baseCost = 0;
  
  switch (type) {
    case 'electric':
      baseCost = 70;
      break;
    case 'gas':
      baseCost = 90;
      break;
    case 'heat_pump':
      baseCost = 150;
      break;
    default:
      baseCost = 80;
  }
  
  return baseCost * areaNum;
};

/**
 * Calculate fencing cost (renamed from calculateFencingCost for consistency)
 */
export const calculateFencingCost = calculateFenceCost;
