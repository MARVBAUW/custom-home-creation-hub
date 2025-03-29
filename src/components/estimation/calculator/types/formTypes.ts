
import { FormData } from './index';
import { ReactNode } from 'react';

export interface BaseFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
  defaultValues?: any;
  onSubmit?: (data: any) => void;
}

// All form components now extend BaseFormProps
export type ClientTypeFormProps = BaseFormProps;
export type ProfessionalProjectFormProps = BaseFormProps;
export type IndividualProjectFormProps = BaseFormProps;
export type EstimationTypeFormProps = BaseFormProps;
export type ConstructionDetailsFormProps = BaseFormProps;
export type TerrainFormProps = BaseFormProps;
export type GrosOeuvreFormProps = BaseFormProps;
export type CharpenteFormProps = BaseFormProps;
export type ComblesFormProps = BaseFormProps;
export type CouvertureFormProps = BaseFormProps;
export type FacadeFormProps = BaseFormProps;
export type MenuiseriesExtFormProps = BaseFormProps;
export type IsolationFormProps = BaseFormProps;
export type ElectriciteFormProps = BaseFormProps;
export type PlomberieFormProps = BaseFormProps;
export type ChauffageFormProps = BaseFormProps;
export type PlatrerieFormProps = BaseFormProps;
export type MenuiseriesIntFormProps = BaseFormProps;
export type CarrelageFormProps = BaseFormProps;
export type ParquetFormProps = BaseFormProps;
export type PeintureFormProps = BaseFormProps;
export type AmenagementExtFormProps = BaseFormProps;
export type ContactFormProps = BaseFormProps;

export interface BaseFormStepProps {
  step: number;
  totalSteps: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
}

export interface ResultsFormProps {
  estimationResult: number | null;
  formData: FormData;
  categoriesAmounts: Array<{category: string; amount: number}>;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
}

export interface EstimationReportProps {
  estimation: {
    totalHT: number;
    totalTTC: number;
    vat: number;
    coutGlobalHT: number;
    coutGlobalTTC: number;
    honorairesHT: number;
    taxeAmenagement: number;
    garantieDecennale: number;
    etudesGeotechniques: number;
    etudeThermique: number;
    corpsEtat: Record<string, {
      montantHT: number;
      details: string[];
    }>;
  };
  formData: FormData;
  includeTerrainPrice: boolean;
  estimationResult?: number;
}
