
import { FormData } from './index';

// All form step components should extend BaseFormStepProps
export interface BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
  defaultValues?: any;
}

// Client type form props
export interface ClientTypeFormProps extends BaseFormStepProps {
  defaultValues?: { clientType: string };
}

// Project details form props
export interface ProjectDetailsFormProps extends BaseFormStepProps {
  defaultValues?: { projectType: string; surface: number };
}

// Professional project form props
export interface ProfessionalProjectFormProps extends BaseFormStepProps {
  defaultValues?: { activity: string; projectType: string; startDate: string; endDate: string };
}

// Individual project form props
export interface IndividualProjectFormProps extends BaseFormStepProps {
  defaultValues?: { projectType: string };
}

// Estimation type form props
export interface EstimationTypeFormProps extends BaseFormStepProps {
  defaultValues?: { estimationType: string; termsAccepted: boolean };
}

// Construction details form props
export interface ConstructionDetailsFormProps extends BaseFormStepProps {
  defaultValues?: {
    surface: string;
    levels: string;
    units: string;
    constructionType?: string;
    constructionMode?: string;
  };
}

// Terrain form props
export interface TerrainFormProps extends BaseFormStepProps {
  defaultValues?: { terrainType: string; terrainAccess: string };
}

// Gros oeuvre form props
export interface GrosOeuvreFormProps extends BaseFormStepProps {
  defaultValues?: { wallType: string };
}

// Charpente form props
export interface CharpenteFormProps extends BaseFormStepProps {
  defaultValues?: { roofType: string };
}

// Comble form props
export interface CombleFormProps extends BaseFormStepProps {
  defaultValues?: { atticType: string };
}

// Couverture form props
export interface CouvertureFormProps extends BaseFormStepProps {
  defaultValues?: { roofingType: string };
}

// Facade form props
export interface FacadeFormProps extends BaseFormStepProps {
  defaultValues?: { 
    stonePercentage?: number | string;
    plasterPercentage?: number | string;
    brickPercentage?: number | string;
    metalCladdingPercentage?: number | string;
    woodCladdingPercentage?: number | string;
    stoneCladdingPercentage?: number | string;
  };
}

// Menuiseries extérieures form props
export interface MenuiseriesExtFormProps extends BaseFormStepProps {
  defaultValues?: { 
    windowType?: string;
    windowRenovationArea?: string;
    windowNewArea?: string;
  };
}

// Isolation form props
export interface IsolationFormProps extends BaseFormStepProps {
  defaultValues?: { insulationType: string };
}

// Electricité form props
export interface ElectriciteFormProps extends BaseFormStepProps {
  defaultValues?: { electricalType: string };
}

// Plomberie form props
export interface PlomberieFormProps extends BaseFormStepProps {
  defaultValues?: { plumbingType: string };
}

// Chauffage form props
export interface ChauffageFormProps extends BaseFormStepProps {
  defaultValues?: { heatingType: string; hasAirConditioning: boolean | string };
}

// Plâtrerie form props
export interface PlatrerieFormProps extends BaseFormStepProps {
  defaultValues?: { plasteringType: string };
}

// Menuiseries intérieures form props
export interface MenuiseriesIntFormProps extends BaseFormStepProps {
  defaultValues?: { 
    doorType?: string;
    interiorFittings?: string[];
  };
}

// Carrelage form props
export interface CarrelageFormProps extends BaseFormStepProps {
  defaultValues?: { 
    floorTileType?: string;
    wallTileType?: string;
    floorTilePercentage?: number | string;
  };
}

// Parquet form props
export interface ParquetFormProps extends BaseFormStepProps {
  defaultValues?: {
    floorTilePercentage?: number | string;
    parquetPercentage?: number | string;
    softFloorPercentage?: number | string;
    parquetType?: string;
    softFloorType?: string;
  };
}

// Peinture form props
export interface PeintureFormProps extends BaseFormStepProps {
  defaultValues?: {
    basicPaintPercentage?: number | string;
    decorativePaintPercentage?: number | string;
    wallpaperPercentage?: number | string;
    woodCladPercentage?: number | string;
    stoneCladPercentage?: number | string;
  };
}

// Aménagement extérieur form props
export interface AmenagementExtFormProps extends BaseFormStepProps {
  defaultValues?: { exteriorFeatures: string[] };
}

// Contact form props
export interface ContactFormProps extends BaseFormStepProps {
  defaultValues?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

// Results form props
export interface ResultsFormProps {
  formData: FormData;
  estimationResult: number | null;
  categoriesAmounts: { category: string; amount: number; }[];
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
}

// Message processor props
export interface MessageProcessorProps {
  message: string;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}
