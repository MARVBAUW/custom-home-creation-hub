
import { FormData } from '.';

// Interface de base pour tous les formulaires
export interface BaseFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
}

// Interface pour les formulaires avec valeurs par défaut et soumission
export interface FormWithDefaultsProps extends BaseFormProps {
  defaultValues: any;
  onSubmit: (data: any) => void;
}

// Interface spécifique pour chaque étape du formulaire
export interface ClientTypeFormProps extends BaseFormProps {}

export interface ProfessionalProjectFormProps extends BaseFormProps {
  defaultValues: {
    activity: string;
    projectType: string;
    startDate: string;
    endDate: string;
  };
  onSubmit: (data: any) => void;
}

export interface IndividualProjectFormProps extends BaseFormProps {
  defaultValues: {
    projectType: string;
  };
  onSubmit: (data: { projectType: string }) => void;
}

export interface EstimationTypeFormProps extends BaseFormProps {
  defaultValues: {
    estimationType: string;
    termsAccepted: boolean;
  };
  onSubmit: (data: any) => void;
}

export interface ProjectDetailsFormProps extends BaseFormProps {}

export interface TerrainFormProps extends BaseFormProps {}

export interface ConstructionDetailsFormProps extends BaseFormProps {}

export interface CharpenteFormProps extends BaseFormProps {}

export interface CouvertureFormProps extends BaseFormProps {}

export interface FacadeFormProps extends BaseFormProps {}

export interface MenuiseriesExtFormProps extends BaseFormProps {}

export interface IsolationFormProps extends BaseFormProps {}

export interface ElectriciteFormProps extends BaseFormProps {
  defaultValues: {
    electricalType: string;
  };
  onSubmit: (data: { electricalType: string }) => void;
}

export interface PlomberieFormProps extends BaseFormProps {}

export interface ChauffageFormProps extends BaseFormProps {}

export interface PlatrerieFormProps extends BaseFormProps {}

export interface MenuiseriesIntFormProps extends BaseFormProps {}

export interface CarrelageFormProps extends BaseFormProps {}

export interface ParquetFormProps extends BaseFormProps {}

export interface PeintureFormProps extends BaseFormProps {}

export interface AmenagementExtFormProps extends BaseFormProps {}

export interface ContactFormProps extends BaseFormProps {
  defaultValues: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    message: string;
    termsAccepted: boolean;
  };
  onSubmit: (data: any) => void;
}

export interface ResultsFormProps extends BaseFormProps {
  estimationResult: number;
  categoriesAmounts?: Array<{ category: string; amount: number; details?: string }>;
}
