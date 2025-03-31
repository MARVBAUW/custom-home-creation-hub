
// FormData interface - main interface for form data
export interface FormData {
  // General project data
  clientType?: string;
  projectType?: string;
  estimationType?: string;
  surface?: number | string;
  budget?: number | string;
  
  // Contact information
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
  acceptTerms?: boolean;
  termsAccepted?: boolean;
  activity?: string;
  startDate?: string;
  endDate?: string;
  
  // Project details
  terassementsViabilisation?: boolean | number;
  name?: string;
  constructionType?: string;
  constructionStyle?: string;
  roofType?: string;
  roofArea?: number | string;
  atticType?: string;
  roofingType?: string;
  roofingArea?: number | string;
  wallType?: string;
  foundationType?: string;
  electricalType?: string;
  plumbingType?: string;
  heatingType?: string;
  plasteringType?: string;
  doorType?: string;
  interiorDoorType?: string;
  interiorDoorsType?: string;
  
  // Property details
  levels?: number | string;
  finishLevel?: string;
  finishStandard?: string;
  finishingLevel?: string;
  units?: number | string;
  complexity?: string;
  qualityStandard?: string;
  
  // Room counts
  bedrooms?: number | string;
  bathrooms?: number | string;
  bathroomType?: string;
  bathroomCount?: number | string;
  bathroomCost?: number;
  kitchens?: number | string;
  kitchenType?: string;
  kitchenCost?: number;
  livingRooms?: number | string;
  livingRoomSize?: number | string;
  livingRoomStyle?: string;
  
  // Plastering details
  plastering?: string;
  
  // Interior carpentry details
  hasMoldings?: boolean;
  hasCustomFurniture?: boolean;
  
  // Tiling and flooring details
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
  
  // Painting and wall coverings
  paintType?: string;
  basicPaint?: string | number;
  basicPaintPercentage?: number | string;
  decorativePaintPercentage?: number | string;
  wallpaperPercentage?: number | string;
  woodPanelingPercentage?: number | string;
  stonePanelingPercentage?: number | string;
  paintSurface?: number | string;
  
  // Windows details
  windowType?: string;
  windowRenovationArea?: number | string;
  windowNewArea?: number | string;
  
  // Exterior features
  pool?: boolean;
  poolType?: string;
  poolArea?: number | string;
  poolHeating?: string;
  terrace?: boolean;
  outdoorKitchen?: boolean;
  carportType?: string;
  jacuzziType?: string;
  jacuzziArea?: number | string;
  
  // Landscaping
  landscapingType?: string | string[];
  landscapingArea?: number | string;
  landscapingBudget?: number | string;
  fencingLength?: number | string;
  gateLength?: number | string;
  terraceArea?: number | string;
  gardenSurface?: number | string;
  
  // Air conditioning
  hasAirConditioning?: boolean;
  
  // Current total amount for the project
  montantT?: number;
  
  // Quick Estimation Navigation
  selectedFeatures?: string[];
  nextPage?: number;
  
  // Feature flags for controlling navigation
  includeEcoSolutions?: boolean;
  includeRenewableEnergy?: boolean;
  includeLandscaping?: boolean;
  includeOptions?: boolean;
  includeCuisine?: boolean;
  includeBathroom?: boolean;
  
  // For location information
  city?: string;
  
  // For terrain details
  landPrice?: number | string;
  landIncluded?: boolean | string;
  landType?: string;
  terrainType?: string;
  terrainSurface?: number | string;
  viabilisation?: number;
  
  // For special features
  solarPanels?: boolean;
  solarPanelType?: string;
  solarPanelSurface?: number | string;
  windTurbineType?: string;
  rainwaterHarvesting?: boolean;
  homeAutomation?: boolean;
  energyEfficiency?: boolean;
  greywaterRecycling?: boolean;
  ecoFriendlyInsulation?: boolean;
  
  // Renewable energy and environmental solutions
  renewableEnergyType?: string;
  environmentalSolutionType?: string;
  
  // For demolition details
  needsDemolition?: boolean;
  demolitionType?: string;
  demolitionTypes?: string[];
  demolitionPercentages?: { [key: string]: number };
  demolitionTotalArea?: number | string;
  existingSurface?: number | string;
  surfaceDemo?: number;
  demoCost?: number;
  demolitionCost?: number;
  
  // For attic details
  
  // For insulation
  insulationType?: string;
  
  // Structural renovation
  createWalls?: boolean;
  wallArea?: number | string;
  createFloors?: boolean;
  floorType?: string;
  floorArea?: number | string;
  structuralFeatures?: string[];
  structuralFeatureValues?: { [key: string]: number | string };
  
  // Facade details
  stonePercentage?: number | string;
  plasterPercentage?: number | string;
  brickPercentage?: number | string;
  metalCladdingPercentage?: number | string;
  woodCladdingPercentage?: number | string;
  stoneCladdingPercentage?: number | string;
  
  // Additional properties
  basement?: boolean;
  garage?: boolean;
  hasPool?: boolean;
  hasTerrace?: boolean;
  domotic?: boolean;
  alarm?: boolean;
  centralVacuum?: boolean;
  smartHome?: boolean;
  
  // Renovation specific
  buildingCondition?: string;
  renovationScope?: string;
  
  // For skip navigation
  skipToContact?: boolean;
  
  // Additional external features
  exteriorFeatures?: string[];
  interiorFittings?: string;
  tileSurface?: number | string;
}

// Base form props that all form steps will use
export interface BaseFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
  defaultValues?: Partial<FormData>;
  onSubmit?: (data: Partial<FormData>) => void;
}

// Define additional prop types here
export interface FormStepProps extends BaseFormProps {
  // Add any additional props for form steps
}

export interface ExtendedFormProps extends BaseFormProps {
  // Add additional props for extended forms
}

export interface ResultsFormProps extends BaseFormProps {
  estimationResult: number | { totalAmount: number; [key: string]: any };
}

export interface EstimationCalculatorProps {
  // Props for the calculator component
}

export interface FormNavigationProps {
  step: number;
  totalSteps: number;
  estimationResult: number;
  showSummary: boolean;
  onPreviousClick: () => void;
  onNextClick: () => void;
  onShowSummaryClick: () => void;
}

export interface EstimationValidationError {
  field: string;
  message: string;
}

export interface FormSubmitContext {
  isPending: boolean;
  isSuccess: boolean;
  error: string | null;
}

export interface ConstructionDetailsStepProps extends BaseFormProps {
  // Additional props specific to construction details step
}

export interface StepRendererProps {
  step: number;
  formData: FormData;
  animationDirection: 'forward' | 'backward';
}

export interface ClientTypeStepProps extends BaseFormProps {
  // Additional props specific to client type step
}

export interface ContactDetailsStepProps extends BaseFormProps {
  // Additional props specific to contact details step
}

export interface DetailedEstimationReportProps {
  formData: FormData;
  estimationResult: any;
}

export interface PDFGenerationOptions {
  includeDetails: boolean;
  includeTimeline: boolean;
}
