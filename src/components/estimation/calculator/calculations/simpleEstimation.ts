import { FormData } from '../types';

// Define base price per square meter for different project types
const basePricePerSqM = {
  newConstruction: 1500,
  renovation: 800,
  design: 500,
};

// Define factors for different construction types
const constructionTypeFactors = {
  traditional: 1.0,
  wooden: 1.1,
  modern: 1.2,
  ecological: 1.3,
};

// Define factors for different finish levels
const finishLevelFactors = {
  basic: 0.8,
  standard: 1.0,
  premium: 1.2,
  luxury: 1.5,
};

// Define factors for terrain types
const terrainTypeFactors = {
  flat: 1.0,
  sloping: 1.1,
  verySloping: 1.2,
  irregular: 1.3,
};

// Define factors for wall types
const wallTypeFactors = {
  brick: 1.0,
  block: 1.1,
  wood: 1.2,
};

// Define factors for roofing types
const roofingTypeFactors = {
  tile: 1.0,
  slate: 1.1,
  metal: 1.2,
};

// Define factors for heating types
const heatingTypeFactors = {
  electric: 1.0,
  gas: 1.1,
  oil: 1.2,
};

// Define factors for insulation types
const insulationTypeFactors = {
  mineralWool: 1.0,
  synthetic: 1.1,
  natural: 1.2,
};

// Define factors for exterior joinery types
const exteriorJoineryTypeFactors = {
  pvc: 1.0,
  aluminum: 1.1,
  wood: 1.2,
};

// Define factors for plumbing types
const plumbingTypeFactors = {
  standard: 1.0,
  premium: 1.1,
  luxury: 1.2,
};

// Define factors for electrical types
const electricalTypeFactors = {
  standard: 1.0,
  premium: 1.1,
  luxury: 1.2,
};

// Define factors for plastering types
const plasteringTypeFactors = {
  standard: 1.0,
  premium: 1.1,
  luxury: 1.2,
};

// Define factors for flooring types
const flooringTypeFactors = {
  tile: 1.0,
  parquet: 1.1,
  carpet: 1.2,
};

// Define factors for painting types
const paintingTypeFactors = {
  standard: 1.0,
  premium: 1.1,
  luxury: 1.2,
};

// Define factors for renewable energy options
const renewableEnergyFactors = {
  solar: 1.1,
  wind: 1.2,
  geothermal: 1.3,
};

// Define factors for eco-friendly solutions
const ecoFriendlyFactors = {
  insulation: 1.1,
  materials: 1.2,
  waterSaving: 1.3,
};

// Define factors for landscaping options
const landscapingFactors = {
  garden: 1.1,
  pool: 1.2,
  terrace: 1.3,
};

// Define factors for additional options
const additionalOptionsFactors = {
  kitchen: 1.1,
  bathroom: 1.2,
  furniture: 1.3,
};

// Change the type casting for these fields
const calculateBaseSurface = (formData: FormData): number => {
  // Convert surface to number explicitly
  const surface = typeof formData.surface === 'string' 
    ? parseInt(formData.surface) 
    : formData.surface || 0;
  
  // Convert levels to number explicitly
  const levels = typeof formData.levels === 'string' 
    ? parseInt(formData.levels) 
    : formData.levels || 1;
  
  // Convert units to number explicitly
  const units = typeof formData.units === 'string' 
    ? parseInt(formData.units) 
    : formData.units || 1;
  
  return surface * levels * units;
};

// Function to calculate the base price
const calculateBasePrice = (formData: FormData): number => {
  const projectType = formData.projectType || 'newConstruction';
  const baseSurface = calculateBaseSurface(formData);
  
  let basePrice = basePricePerSqM[projectType.replace(/ /g, '') as keyof typeof basePricePerSqM] * baseSurface;
  
  return basePrice;
};

// Function to apply construction type factor
const applyConstructionTypeFactor = (basePrice: number, formData: FormData): number => {
  const constructionType = formData.constructionType || 'traditional';
  const factor = constructionTypeFactors[constructionType as keyof typeof constructionTypeFactors] || 1.0;
  return basePrice * factor;
};

// Function to apply finish level factor
const applyFinishLevelFactor = (basePrice: number, formData: FormData): number => {
  const finishLevel = formData.finishLevel || 'standard';
  const factor = finishLevelFactors[finishLevel as keyof typeof finishLevelFactors] || 1.0;
  return basePrice * factor;
};

// Function to apply terrain type factor
const applyTerrainTypeFactor = (basePrice: number, formData: FormData): number => {
  const terrainType = formData.terrainType || 'flat';
  const factor = terrainTypeFactors[terrainType as keyof typeof terrainTypeFactors] || 1.0;
  return basePrice * factor;
};

// Function to apply wall type factor
const applyWallTypeFactor = (basePrice: number, formData: FormData): number => {
  const wallType = formData.wallType || 'brick';
  const factor = wallTypeFactors[wallType as keyof typeof wallTypeFactors] || 1.0;
  return basePrice * factor;
};

// Function to apply roofing type factor
const applyRoofingTypeFactor = (basePrice: number, formData: FormData): number => {
  const roofingType = formData.roofingType || 'tile';
  const factor = roofingTypeFactors[roofingType as keyof typeof roofingTypeFactors] || 1.0;
  return basePrice * factor;
};

// Function to apply heating type factor
const applyHeatingTypeFactor = (basePrice: number, formData: FormData): number => {
  const heatingType = formData.heatingType || 'electric';
  const factor = heatingTypeFactors[heatingType as keyof typeof heatingTypeFactors] || 1.0;
  return basePrice * factor;
};

// Function to apply insulation type factor
const applyInsulationTypeFactor = (basePrice: number, formData: FormData): number => {
  const insulationType = formData.insulationType || 'mineralWool';
  const factor = insulationTypeFactors[insulationType as keyof typeof insulationTypeFactors] || 1.0;
  return basePrice * factor;
};

// Function to apply exterior joinery type factor
const applyExteriorJoineryTypeFactor = (basePrice: number, formData: FormData): number => {
  const windowType = formData.windowType || 'pvc';
  const factor = exteriorJoineryTypeFactors[windowType as keyof typeof exteriorJoineryTypeFactors] || 1.0;
  return basePrice * factor;
};

// Function to apply plumbing type factor
const applyPlumbingTypeFactor = (basePrice: number, formData: FormData): number => {
  const plumbingType = formData.plumbingType || 'standard';
  const factor = plumbingTypeFactors[plumbingType as keyof typeof plumbingTypeFactors] || 1.0;
  return basePrice * factor;
};

// Function to apply electrical type factor
const applyElectricalTypeFactor = (basePrice: number, formData: FormData): number => {
  const electricalType = formData.electricalType || 'standard';
  const factor = electricalTypeFactors[electricalType as keyof typeof electricalTypeFactors] || 1.0;
  return basePrice * factor;
};

// Function to apply plastering type factor
const applyPlasteringTypeFactor = (basePrice: number, formData: FormData): number => {
  const plasteringType = formData.plasteringType || 'standard';
  const factor = plasteringTypeFactors[plasteringType as keyof typeof plasteringTypeFactors] || 1.0;
  return basePrice * factor;
};

// Function to apply flooring type factor
const applyFlooringTypeFactor = (basePrice: number, formData: FormData): number => {
  const flooringType = formData.flooringType || 'tile';
  const factor = flooringTypeFactors[flooringType as keyof typeof flooringTypeFactors] || 1.0;
  return basePrice * factor;
};

// Function to apply painting type factor
const applyPaintingTypeFactor = (basePrice: number, formData: FormData): number => {
  const paintingType = formData.paintType || 'standard';
  const factor = paintingTypeFactors[paintingType as keyof typeof paintingTypeFactors] || 1.0;
  return basePrice * factor;
};

// Function to apply renewable energy factor
const applyRenewableEnergyFactor = (basePrice: number, formData: FormData): number => {
  if (formData.includeRenewableEnergy) {
    let factor = 1.0;
    if (formData.solarPanelSurface) {
      factor += renewableEnergyFactors.solar * 0.1;
    }
    return basePrice * factor;
  }
  return basePrice;
};

// Function to apply eco-friendly factor
const applyEcoFriendlyFactor = (basePrice: number, formData: FormData): number => {
  if (formData.includeEcoSolutions) {
    let factor = 1.0;
    if (formData.ecoFriendlyInsulation) {
      factor += ecoFriendlyFactors.insulation * 0.1;
    }
    return basePrice * factor;
  }
  return basePrice;
};

// Function to apply landscaping factor
const applyLandscapingFactor = (basePrice: number, formData: FormData): number => {
  if (formData.includeLandscaping) {
    let factor = 1.0;
    if (formData.gardenSurface) {
      factor += landscapingFactors.garden * 0.1;
    }
    return basePrice * factor;
  }
  return basePrice;
};

// Function to apply additional options factor
const applyAdditionalOptionsFactor = (basePrice: number, formData: FormData): number => {
  if (formData.includeOptions) {
    let factor = 1.0;
    if (formData.includeCuisine) {
      factor += additionalOptionsFactors.kitchen * 0.1;
    }
    return basePrice * factor;
  }
  return basePrice;
};

const applyAirConditioningFactor = (basePrice: number, formData: FormData): number => {
  // Convert hasAirConditioning to boolean if it's a string
  const hasAC = typeof formData.hasAirConditioning === 'string'
    ? formData.hasAirConditioning === 'true'
    : !!formData.hasAirConditioning;
  
  return hasAC ? basePrice * 1.05 : basePrice;
};

// Main function to calculate the estimation
export const calculateEstimation = (formData: FormData): number => {
  let basePrice = calculateBasePrice(formData);
  
  basePrice = applyConstructionTypeFactor(basePrice, formData);
  basePrice = applyFinishLevelFactor(basePrice, formData);
  basePrice = applyTerrainTypeFactor(basePrice, formData);
  basePrice = applyWallTypeFactor(basePrice, formData);
  basePrice = applyRoofingTypeFactor(basePrice, formData);
  basePrice = applyHeatingTypeFactor(basePrice, formData);
  basePrice = applyInsulationTypeFactor(basePrice, formData);
  basePrice = applyExteriorJoineryTypeFactor(basePrice, formData);
  basePrice = applyPlumbingTypeFactor(basePrice, formData);
  basePrice = applyElectricalTypeFactor(basePrice, formData);
  basePrice = applyPlasteringTypeFactor(basePrice, formData);
  basePrice = applyFlooringTypeFactor(basePrice, formData);
  basePrice = applyPaintingTypeFactor(basePrice, formData);
  basePrice = applyRenewableEnergyFactor(basePrice, formData);
  basePrice = applyEcoFriendlyFactor(basePrice, formData);
  basePrice = applyLandscapingFactor(basePrice, formData);
  basePrice = applyAdditionalOptionsFactor(basePrice, formData);
  basePrice = applyAirConditioningFactor(basePrice, formData);
  
  return basePrice;
};
