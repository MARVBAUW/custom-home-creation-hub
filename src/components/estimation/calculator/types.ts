
export interface FormData {
  projectType?: string;
  surface?: number | string;
  city?: string;
  landType?: string;
  complexity?: string;
  qualityStandard?: string;
  constructionType?: string;
  constructionStyle?: string;
  email?: string;
  name?: string;
  phone?: string;
  insulationType?: string;
  roofingType?: string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  landPrice?: number | string;
  budget?: number | string;
  clientType?: string;
  terrainType?: string;
  roofType?: string;
  basement?: boolean;
  garage?: boolean;
  heatingType?: string;
  hasAirConditioning?: boolean;
  finishLevel?: string;
  pool?: boolean;
  terrace?: boolean;
  solarPanels?: boolean;
  smartHome?: boolean;
  outdoorKitchen?: boolean;
  domotic?: boolean;
  alarm?: boolean;
  centralVacuum?: boolean;
  landIncluded?: boolean | string;
  levels?: number | string;
  roomCount?: number | string;
  bathroomCount?: number | string;
  bathroomType?: string;
  kitchenType?: string;
  livingRoomSize?: number | string;
  livingRoomStyle?: string;
  finishingLevel?: string;
  paintType?: string;
  floorTileType?: string;
  parquetType?: string;
  terrainSurface?: number | string;
  firstName?: string;
  lastName?: string;
  message?: string;
  termsAccepted?: boolean;
  activity?: string;
  startDate?: string;
  endDate?: string;
  estimationType?: string;
  includeEcoSolutions?: boolean;
  includeRenewableEnergy?: boolean;
  includeLandscaping?: boolean;
  includeOptions?: boolean;
  includeCuisine?: boolean;
  includeBathroom?: boolean;
  needsDemolition?: boolean;
  
  // Add missing properties that are causing TypeScript errors
  finishStandard?: string;
  rainwaterHarvesting?: boolean;
  homeAutomation?: boolean;
  energyEfficiency?: boolean;
  softFloorType?: string;
  parquetPercentage?: number | string;
  softFloorPercentage?: number | string;
  floorTilePercentage?: number | string;
  kitchens?: number | string;
  livingRooms?: number | string;
  
  // Properties for special features and submissions
  solarPanelType?: string;
  solarPanelSurface?: number | string;
  windTurbineType?: string;
  greywaterRecycling?: boolean;
  ecoFriendlyInsulation?: boolean;
  
  // Properties for exterior and landscaping
  landscapingType?: string;
  gardenSurface?: number | string;
  landscapingBudget?: number | string;
  exteriorFeatures?: string[];
  
  // Properties for construction details
  wallType?: string;
  foundationType?: string;
  units?: number | string;
  demolitionType?: string;
  atticType?: string;
  
  // Properties for facade
  stonePercentage?: number | string;
  plasterPercentage?: number | string;
  brickPercentage?: number | string;
  metalCladdingPercentage?: number | string;
  woodCladdingPercentage?: number | string;
  stoneCladdingPercentage?: number | string;
  
  // Properties for windows
  windowType?: string;
  windowNewArea?: number | string;
  windowRenovationArea?: number | string;
  
  // Properties for electrical
  electricalType?: string;
  plumbingType?: string;
}

export interface ConstructionCosts {
  structuralWork: number;
  finishingWork: number;
  technicalLots: number;
  externalWorks: number;
  total: number;
}

export interface FeeCosts {
  architect: number; // Make non-optional to match the requirement
  engineeringFees: number;
  architectFees: number;
  officialFees: number;
  inspectionFees: number;
  technicalStudies: number;
  other: number;
  total: number;
}

export interface OtherCosts {
  insurance: number;
  contingency: number;
  taxes: number;
  miscellaneous: number;
  total: number;
}

export interface EstimationTimeline {
  design: number;
  permits: number;
  bidding: number;
  construction: number;
  total: number;
}

export interface EstimationResponseData {
  constructionCosts: ConstructionCosts;
  fees: FeeCosts;
  otherCosts: OtherCosts;
  totalAmount: number;
  timeline: EstimationTimeline;
}

// Alias EstimationFormData to FormData for backwards compatibility
export type EstimationFormData = FormData;

// Define base form props
export interface BaseFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
}

// Message and conversational types
export interface Message {
  text: string;
  isUser: boolean;
  timestamp?: Date;
}

export interface ConversationalProps {
  onUserInput: (input: string) => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onClientTypeSubmit: (data: { clientType: string }) => void;
  goToStep: (step: number) => void;
}

export interface ExtractedInfo {
  projectType?: string;
  surface?: number | string;
  location?: string;
  budget?: number | string;
  roomCount?: number | string;
  bathroomCount?: number | string;
  [key: string]: any;
}
