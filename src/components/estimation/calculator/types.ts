import { z } from 'zod';

export interface FormData {
  clientType?: string;
  projectType?: string;
  estimationType?: string;
  companyName?: string;
  companyType?: string;
  projectSize?: string;
  projectBudget?: string;
  projectLocation?: string;
  surface?: number | string;
  terrainType?: string;
  wallType?: string;
  roofType?: string;
  atticType?: string;
  roofingType?: string;
  insulationType?: string;
  electricalType?: string;
  plumbingType?: string;
  existingSurface?: number | string;
  buildingCondition?: string;
  renovationScope?: string;
  terassementsViabilisation?: boolean | number;
  
  // Properties from FormTypes
  city?: string;
  landPrice?: number | string;
  levels?: number | string;
  finishLevel?: string;
  finishStandard?: string;
  finishingLevel?: string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  kitchens?: number | string;
  livingRooms?: number | string;
  pool?: boolean;
  terrace?: boolean;
  outdoorKitchen?: boolean;
  solarPanels?: boolean;
  rainwaterHarvesting?: boolean;
  homeAutomation?: boolean;
  energyEfficiency?: boolean;
  complexity?: string;
  qualityStandard?: string;
  landIncluded?: boolean | string;
  
  // Facade percentages
  stonePercentage?: string | number;
  plasterPercentage?: string | number;
  brickPercentage?: string | number;
  metalCladdingPercentage?: string | number;
  woodCladdingPercentage?: string | number;
  stoneCladdingPercentage?: string | number;
  
  // Windows
  windowType?: string;
  windowRenovationArea?: string | number;
  windowNewArea?: string | number;
  
  // Skip navigation flag
  skipToContact?: boolean;
  
  // Montant total (total cost) used in many components
  montantT?: number;
  
  // Contact information
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
  
  // Additional fields from formTypes
  doorType?: string;
  interiorDoorType?: string;
  interiorDoorsType?: string;
  foundationType?: string;
  carportType?: string;
  poolType?: string;
  poolArea?: number | string;
  poolHeating?: string;
  jacuzziType?: string;
  jacuzziArea?: number | string;
  landscapingType?: string;
  landscapingArea?: number | string;
  fencingLength?: number | string;
  gateLength?: number | string;
  terraceArea?: number | string;
  roofArea?: number | string;
  roofingArea?: number | string;
  bathroomType?: string;
  bathroomCount?: number | string;
  kitchenType?: string;
  kitchenCost?: number;
  
  // Demolition fields
  demolitionTypes?: string[];
  demolitionPercentages?: { [key: string]: number };
  demolitionTotalArea?: number | string;
  demolitionType?: string;
  demolitionCost?: number;
  
  // Structural fields
  createWalls?: boolean;
  wallArea?: number | string;
  createFloors?: boolean;
  floorType?: string;
  floorArea?: number | string;
  structuralFeatures?: string[];
  structuralFeatureValues?: { [key: string]: number | string };
  
  // Flooring fields
  floorTileType?: string;
  floorTilePercentage?: number | string;
  floorTileArea?: number | string;
  wallTileType?: string;
  parquetType?: string;
  parquetPercentage?: number | string;
  parquetArea?: number | string;
  softFloorType?: string;
  softFloorPercentage?: number | string;
  softFloorArea?: number | string;
  
  // Painting fields
  paintType?: string;
  basicPaintPercentage?: number | string;
  decorativePaintPercentage?: number | string;
  wallpaperPercentage?: number | string;
  woodPanelingPercentage?: number | string;
  stonePanelingPercentage?: number | string;
  paintSurface?: number | string;
  
  // Special features
  renewableEnergyType?: string;
  environmentalSolutionType?: string;
  
  // Project requirements
  needsDemolition?: boolean;
  
  // Additional properties
  basement?: boolean;
  garage?: boolean;
  hasAirConditioning?: boolean;
  heatingType?: string;
  smartHome?: boolean;
  hasMoldings?: boolean;
  hasCustomFurniture?: boolean;
  
  // Options for steps logic
  includeEcoSolutions?: boolean;
  includeRenewableEnergy?: boolean;
  includeLandscaping?: boolean;
  includeOptions?: boolean;
  includeCuisine?: boolean;
  includeBathroom?: boolean;
  
  // Professional specific
  activity?: string;
  startDate?: string;
  endDate?: string;
  termsAccepted?: boolean;
  
  // Other properties
  name?: string;
  constructionType?: string;
  constructionStyle?: string;
  units?: number | string;
  plasteringType?: string;
  livingRoomSize?: number | string;
  livingRoomStyle?: string;
  viabilisation?: number;
  demoCost?: number;
  bathroomBudget?: number | string;
  kitchenBudget?: number | string;
  landscapingBudget?: number | string;
  solarPanelType?: string;
  solarPanelSurface?: number | string;
  windTurbineType?: string;
  greywaterRecycling?: boolean;
  ecoFriendlyInsulation?: boolean;
  gardenSurface?: number | string;
  exteriorFeatures?: string[];
  interiorFittings?: string;
  tileSurface?: number | string;
  hasPool?: boolean;
  hasTerrace?: boolean;
  domotic?: boolean;
  alarm?: boolean;
  centralVacuum?: boolean;
}

// EstimationFormData is an alias of FormData for compatibility
export type EstimationFormData = FormData;

// Define EstimationTimeline for use in EstimationTimeline.tsx
export interface EstimationTimeline {
  design: number;
  permits: number;
  bidding: number;
  construction: number;
  total: number;
}

export interface EstimationResponseData {
  totalAmount: number;
  categories: Array<{ name: string; amount: number }> | Array<{ category: string; amount: number; details?: string }>;
  constructionCosts: {
    structuralWork: number;
    finishingWork: number;
    technicalLots: number;
    externalWorks: number;
    total: number;
  };
  fees: {
    architect: number;
    engineeringFees: number;
    architectFees: number;
    officialFees: number;
    inspectionFees: number;
    technicalStudies: number;
    other: number;
    total: number;
  };
  otherCosts: {
    insurance: number;
    contingency: number;
    taxes: number;
    miscellaneous: number;
    total: number;
  };
  timeline: {
    design: number;
    permits: number;
    bidding: number;
    construction: number;
    total: number;
  };
}

// Define FeeCosts for compatibility
export interface FeeCosts {
  architect: number;
  engineeringFees: number;
  architectFees: number;
  officialFees: number;
  inspectionFees: number;
  technicalStudies: number;
  other: number;
  total: number;
}

// Add BaseFormProps
export interface BaseFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
  defaultValues?: Partial<FormData>;
  onSubmit?: (data: Partial<FormData>) => void;
}
