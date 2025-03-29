
import { ReactNode } from 'react';
import { FormData } from './index';

// Base interface for all form step components
export interface BaseFormStepProps {
  animationDirection: 'forward' | 'backward';
  goToPreviousStep?: () => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

// Interface for form steps with default values and submit handler
export interface FormStepProps<T = any> extends BaseFormStepProps {
  defaultValues?: T;
  onSubmit?: (data: T) => void;
}

// Form component interfaces - all inheriting from BaseFormStepProps for consistency
export interface ClientTypeFormProps extends BaseFormStepProps {
  defaultValues?: { clientType: string };
  onSubmit?: (data: { clientType: string }) => void;
}
export interface ProjectDetailsFormProps extends BaseFormStepProps {}
export interface TerrainFormProps extends BaseFormStepProps {}
export interface GrosOeuvreFormProps extends BaseFormStepProps {}
export interface CharpenteFormProps extends BaseFormStepProps {
  defaultValues?: { roofType: string };
  formData: FormData;
}
export interface CombleFormProps extends BaseFormStepProps {
  defaultValues?: { atticType: string };
  formData: FormData;
}
export interface CouvertureFormProps extends BaseFormStepProps {
  defaultValues?: { roofingType: string };
  formData: FormData;
}
export interface FacadeFormProps extends BaseFormStepProps {
  formData: FormData;
}
export interface MenuiseriesExtFormProps extends BaseFormStepProps {
  defaultValues?: {
    windowType?: string;
    windowRenovationArea?: string;
    windowNewArea?: string;
  };
  formData: FormData;
}
export interface IsolationFormProps extends BaseFormStepProps {
  defaultValues?: { insulationType: string };
  formData: FormData;
}
export interface ElectriciteFormProps extends BaseFormStepProps {
  defaultValues?: { electricalType: string };
  formData: FormData;
}
export interface PlomberieFormProps extends BaseFormStepProps {
  defaultValues?: { plumbingType: string };
  formData: FormData;
}
export interface ChauffageFormProps extends BaseFormStepProps {
  defaultValues?: { heatingType: string; hasAirConditioning: boolean };
  formData: FormData;
}
export interface PlatrerieFormProps extends BaseFormStepProps {
  defaultValues?: { plasteringType: string };
  formData: FormData;
}
export interface MenuiseriesIntFormProps extends BaseFormStepProps {
  defaultValues?: { doorType: string; interiorFittings: string[] };
  formData: FormData;
}
export interface CarrelageFormProps extends BaseFormStepProps {
  defaultValues?: { floorTileType: string; wallTileType: string; floorTilePercentage: number };
  formData: FormData;
}
export interface ParquetFormProps extends BaseFormStepProps {
  defaultValues?: { 
    parquetType: string; 
    parquetPercentage: number;
    softFloorType: string;
    softFloorPercentage: number;
  };
  formData: FormData;
}
export interface PeintureFormProps extends BaseFormStepProps {
  defaultValues?: {
    basicPaintPercentage: number;
    decorativePaintPercentage: number;
    wallpaperPercentage: number;
    woodCladPercentage: number;
    stoneCladPercentage: number;
  };
  formData: FormData;
}
export interface ContactFormProps extends BaseFormStepProps {
  animationDirection: 'forward' | 'backward';
}
export interface AmenagementExtFormProps extends BaseFormStepProps {
  animationDirection: 'forward' | 'backward';
}
export interface ConstructionDetailsFormProps extends BaseFormStepProps {
  formData: FormData;
}
export interface ResultsFormProps extends BaseFormStepProps {
  estimationResult: number;
  categoriesAmounts: { category: string; amount: number; }[];
  animationDirection: 'forward' | 'backward';
}

// Additional interfaces for professional and individual project forms
export interface ProfessionalProjectFormProps extends BaseFormStepProps {
  defaultValues?: {
    activity: string;
    projectType: string;
    startDate: string;
    endDate: string;
  };
  onSubmit?: (data: any) => void;
  formData: FormData;
}

export interface IndividualProjectFormProps extends BaseFormStepProps {
  defaultValues?: {
    projectType: string;
  };
  onSubmit?: (data: {projectType: string}) => void;
  formData: FormData;
}

export interface EstimationTypeFormProps extends BaseFormStepProps {
  defaultValues?: {
    estimationType: string;
    termsAccepted: boolean;
  };
  onSubmit?: (data: any) => void;
  formData: FormData;
}
