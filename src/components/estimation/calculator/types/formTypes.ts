
import { FormData } from './index';

// Base form step props that all form step components should extend
export interface BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
}

// Form step props for components that use defaultValues and onSubmit pattern
export interface FormStepProps<T = any> {
  defaultValues?: T;
  onSubmit?: (data: T) => void;
  animationDirection: 'forward' | 'backward';
  goToPreviousStep: () => void;
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
export interface ProfessionalProjectFormProps extends FormStepProps {
  defaultValues?: { activity: string; projectType: string; startDate: string; endDate: string };
}

// Individual project form props
export interface IndividualProjectFormProps extends FormStepProps {
  defaultValues?: { projectType: string };
}

// Estimation type form props
export interface EstimationTypeFormProps extends FormStepProps {
  defaultValues?: { estimationType: string; termsAccepted: boolean };
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
export interface CharpenteFormProps extends FormStepProps {
  defaultValues?: { roofType: string };
}

// Comble form props
export interface CombleFormProps extends FormStepProps {
  defaultValues?: { atticType: string };
}

// Couverture form props
export interface CouvertureFormProps extends FormStepProps {
  defaultValues?: { roofingType: string };
}

// Facade form props
export interface FacadeFormProps extends FormStepProps {
  defaultValues?: { facadeMaterial: string };
}

// Facade renovation form props
export interface FacadeRenovFormProps extends FormStepProps {
  defaultValues?: { 
    metalCladdingPercentage: number; 
    woodCladdingPercentage: number; 
    stoneCladdingPercentage: number 
  };
}

// Menuiseries extérieures form props
export interface MenuiseriesExtFormProps extends FormStepProps {
  defaultValues?: { windowType: string };
}

// Isolation form props
export interface IsolationFormProps extends FormStepProps {
  defaultValues?: { insulationType: string };
}

// Electricité form props
export interface ElectriciteFormProps extends FormStepProps {
  defaultValues?: { electricalType: string };
}

// Plomberie form props
export interface PlomberieFormProps extends FormStepProps {
  defaultValues?: { plumbingType: string };
}

// Chauffage form props
export interface ChauffageFormProps extends FormStepProps {
  defaultValues?: { heatingType: string; hasAirConditioning: boolean };
}

// Plâtrerie form props
export interface PlatrerieFormProps extends FormStepProps {
  defaultValues?: { plasteringType: string };
}

// Menuiseries intérieures form props
export interface MenuiseriesIntFormProps extends FormStepProps {
  defaultValues?: { interiorDoorsType: string };
}

// Carrelage form props
export interface CarrelageFormProps extends FormStepProps {
  defaultValues?: { tileType: string };
}

// Parquet form props
export interface ParquetFormProps extends FormStepProps {
  defaultValues?: {
    floorTilePercentage: number;
    parquetPercentage: number;
    softFloorPercentage: number;
    parquetType?: string;
    softFloorType?: string;
  };
}

// Peinture form props
export interface PeintureFormProps extends FormStepProps {
  defaultValues?: {
    basicPaintPercentage: number | string;
    decorativePaintPercentage: number | string;
    wallpaperPercentage: number | string;
    woodCladPercentage: number | string;
    stoneCladPercentage: number | string;
  };
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
