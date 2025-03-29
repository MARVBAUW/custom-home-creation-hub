
import { FormData } from './index';

// Base form step props that all form step components should extend
export interface BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
}

// Client type form props
export interface ClientTypeFormProps extends BaseFormStepProps {
  defaultValues?: { clientType: string };
  onSubmit?: (data: { clientType: string }) => void;
}

// Project details form props
export interface ProjectDetailsFormProps extends BaseFormStepProps {
  defaultValues?: { projectType: string; surface: number };
  onSubmit?: (data: { projectType: string; surface: number }) => void;
}

// Professional project form props
export interface ProfessionalProjectFormProps extends BaseFormStepProps {
  defaultValues?: { activity: string; projectType: string; startDate: string; endDate: string };
  onSubmit?: (data: any) => void;
}

// Individual project form props
export interface IndividualProjectFormProps extends BaseFormStepProps {
  defaultValues?: { projectType: string };
  onSubmit?: (data: { projectType: string }) => void;
}

// Estimation type form props
export interface EstimationTypeFormProps extends BaseFormStepProps {
  defaultValues?: { estimationType: string; termsAccepted: boolean };
  onSubmit?: (data: any) => void;
}

// Terrain form props
export interface TerrainFormProps extends BaseFormStepProps {
  defaultValues?: { terrainType: string; terrainAccess: string };
  onSubmit?: (data: any) => void;
}

// Gros oeuvre form props
export interface GrosOeuvreFormProps extends BaseFormStepProps {
  defaultValues?: { wallType: string };
  onSubmit?: (data: any) => void;
}

// Charpente form props
export interface CharpenteFormProps extends BaseFormStepProps {
  defaultValues?: { roofType: string };
  onSubmit?: (data: any) => void;
}

// Comble form props
export interface CombleFormProps extends BaseFormStepProps {
  defaultValues?: { atticType: string };
  onSubmit?: (data: any) => void;
}

// Couverture form props
export interface CouvertureFormProps extends BaseFormStepProps {
  defaultValues?: { roofingType: string };
  onSubmit?: (data: any) => void;
}

// Facade form props
export interface FacadeFormProps extends BaseFormStepProps {
  defaultValues?: { facadeMaterial: string };
  onSubmit?: (data: any) => void;
}

// Facade renovation form props
export interface FacadeRenovFormProps extends BaseFormStepProps {
  defaultValues?: { 
    metalCladdingPercentage: number; 
    woodCladdingPercentage: number; 
    stoneCladdingPercentage: number 
  };
  onSubmit?: (data: any) => void;
}

// Menuiseries extérieures form props
export interface MenuiseriesExtFormProps extends BaseFormStepProps {
  defaultValues?: { windowType: string };
  onSubmit?: (data: any) => void;
}

// Isolation form props
export interface IsolationFormProps extends BaseFormStepProps {
  defaultValues?: { insulationType: string };
  onSubmit?: (data: any) => void;
}

// Electricité form props
export interface ElectriciteFormProps extends BaseFormStepProps {
  defaultValues?: { electricalType: string };
  onSubmit?: (data: any) => void;
}

// Plomberie form props
export interface PlomberieFormProps extends BaseFormStepProps {
  defaultValues?: { plumbingType: string };
  onSubmit?: (data: any) => void;
}

// Chauffage form props
export interface ChauffageFormProps extends BaseFormStepProps {
  defaultValues?: { heatingType: string; hasAirConditioning: boolean };
  onSubmit?: (data: any) => void;
}

// Plâtrerie form props
export interface PlatrerieFormProps extends BaseFormStepProps {
  defaultValues?: { plasteringType: string };
  onSubmit?: (data: any) => void;
}

// Menuiseries intérieures form props
export interface MenuiseriesIntFormProps extends BaseFormStepProps {
  defaultValues?: { interiorDoorsType: string };
  onSubmit?: (data: any) => void;
}

// Carrelage form props
export interface CarrelageFormProps extends BaseFormStepProps {
  defaultValues?: { tileType: string };
  onSubmit?: (data: any) => void;
}

// Parquet form props
export interface ParquetFormProps extends BaseFormStepProps {
  defaultValues?: {
    floorTilePercentage: number;
    parquetPercentage: number;
    softFloorPercentage: number;
  };
  onSubmit?: (data: any) => void;
}

// Peinture form props
export interface PeintureFormProps extends BaseFormStepProps {
  defaultValues?: {
    basicPaintPercentage: number;
    decorativePaintPercentage: number;
    wallpaperPercentage: number;
    woodCladPercentage: number;
    stoneCladPercentage: number;
  };
  onSubmit?: (data: any) => void;
}

// Aménagement extérieur form props
export interface AmenagementExtFormProps extends BaseFormStepProps {
  defaultValues?: { exteriorFeatures: string[] };
  onSubmit?: (data: any) => void;
}

// Construction details form props
export interface ConstructionDetailsFormProps extends BaseFormStepProps {
  defaultValues?: {
    constructionType: string;
    constructionMode: string;
  };
  onSubmit?: (data: any) => void;
}

// Contact form props
export interface ContactFormProps extends BaseFormStepProps {
  defaultValues?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  onSubmit?: (data: any) => void;
}

// Results form props
export interface ResultsFormProps {
  formData: FormData;
  estimationResult: number | null;
  categoriesAmounts: { category: string; amount: number; }[];
  goToPreviousStep: () => void;
  animationDirection?: 'forward' | 'backward';
}

// Message processor props
export interface MessageProcessorProps {
  message: string;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}
