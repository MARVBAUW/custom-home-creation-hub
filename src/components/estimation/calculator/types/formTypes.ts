
/**
 * Base form props interface used by all form components
 */
export interface BaseFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
  // Additional props for form components that need them
  defaultValues?: any;
  onSubmit?: (data: any) => void;
}

/**
 * Main form data structure used throughout the application
 */
export interface FormData {
  // Base project information
  estimationType?: string;
  projectType?: string;
  surface?: number;
  city?: string;
  clientType?: string;
  
  // Client information
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  companyName?: string;
  budget?: number;
  
  // Project description
  projectDescription?: string;
  projectPurpose?: string;
  
  // Construction details
  constructionType?: string;
  foundationType?: string;
  wallType?: string;
  roofType?: string;
  atticType?: string;
  doorCount?: number;
  bedrooms?: number;
  bathrooms?: number;
  
  // Technical systems
  electricalType?: string;
  plumbingType?: string;
  heatingType?: string;
  hasAirConditioning?: boolean;
  hasSmartHome?: boolean;
  
  // Interior finishes
  flooringType?: string;
  flooringArea?: number;
  plasteringType?: string;
  paintSurface?: number;
  
  // Special features
  hasDressingRoom?: boolean;
  hasCustomClosets?: boolean;
  hasElevator?: boolean;
  hasHomeAutomation?: boolean;
  hasSecuritySystem?: boolean;
  hasHeatRecovery?: boolean;
  
  // Exterior features
  pool?: boolean;
  terrace?: boolean;
  outdoorKitchen?: boolean;
  terraceArea?: number;
  landscapingType?: string | string[];
  landscapingArea?: number;
  fencingLength?: number;
  gateLength?: number;
  
  // Facade information
  stonePercentage?: number;
  plasterPercentage?: number;
  brickPercentage?: number;
  metalCladdingPercentage?: number;
  woodCladdingPercentage?: number;
  stoneCladdingPercentage?: number;
  
  // Demolition & renovation specifics
  createWalls?: "OUI" | "NON";
  wallArea?: number;
  createFloors?: "OUI" | "NON";
  floorType?: "BOIS" | "BETON";
  floorArea?: number;
  wallCost?: number;
  floorCost?: number;
  structuralFeatures?: string[];
  structuralFeatureValues?: { [key: string]: string | number };
  structuralFeatureCosts?: { [key: string]: number };
  structuralFeaturesTotal?: number;
  structuralWorkTotal?: number;
  demolitionTypes?: string[];
  demolitionPercentages?: { [key: string]: string | number };
  demolitionTotalArea?: number;
  demolitionCost?: number;
  demolitionDetailedCosts?: { [key: string]: number };
  
  // Environment & energy
  environmentalSolutions?: string[];
  
  // Form state
  formCompleted?: boolean;
  termsAccepted?: boolean;
  commercialAccepted?: boolean;
  
  // Kitchen & bathroom specifics
  kitchenQuality?: string;
  kitchenSize?: number;
  bathroomQuality?: string;
  bathroomCount?: number;
  
  // Paint information
  paintTypes?: {
    basicPaint: number;
    decorativePaint: number;
    wallpaper: number;
    woodPaneling: number;
    stoneCladding: number;
  };
  
  // Project timing
  projectStart?: Date;
  projectEnd?: Date;
  startDate?: string;
  
  // Cost and budget tracking
  montantT?: number;
  landPrice?: number;
  
  // Allow for additional dynamic fields
  [key: string]: string | number | boolean | string[] | { [key: string]: string | number } | undefined | Date;
}
