
import { EstimationFormData } from './estimationFormData';

/**
 * Base props for all form components
 */
export interface BaseFormProps {
  formData: EstimationFormData;
  updateFormData: (data: Partial<EstimationFormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
  defaultValues?: any;
  onSubmit?: (data: any) => void;
}

/**
 * Props for form components with extended properties
 */
export interface ExtendedFormProps extends BaseFormProps {
  [key: string]: any;
}

/**
 * Props for the results form
 */
export interface ResultsFormProps extends BaseFormProps {
  estimationResult: any;
  categoriesAmounts?: Array<{ category: string; amount: number }>;
}

/**
 * Props for the main estimation calculator component
 */
export interface EstimationCalculatorProps {
  onComplete?: (formData: EstimationFormData) => void;
  initialData?: Partial<EstimationFormData>;
}

/**
 * Props for form navigation components
 */
export interface FormNavigationProps {
  step: number;
  totalSteps: number;
  estimationResult?: number;
  showSummary?: boolean;
  onPreviousClick: () => void;
  onNextClick: () => void;
  onShowSummaryClick?: () => void;
}

/**
 * Structure for validation errors
 */
export interface EstimationValidationError {
  field: string;
  message: string;
}

/**
 * Context for form submission
 */
export interface FormSubmitContext {
  isSubmitting: boolean;
  errors: EstimationValidationError[];
  submit: () => Promise<void>;
}

/**
 * Props for the construction details step
 */
export interface ConstructionDetailsStepProps extends BaseFormProps {
  estimationType?: string;
}

/**
 * Props for step renderer
 */
export interface StepRendererProps {
  step: number;
  totalSteps?: number;
  formData: EstimationFormData;
  updateFormData: (data: Partial<EstimationFormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
  isSubmitting?: boolean;
  goToStep?: (step: number) => void;
  onComplete?: () => void;
}

/**
 * Props for client type step
 */
export interface ClientTypeStepProps extends BaseFormProps {
  clientType?: string;
}

/**
 * Props for contact details step
 */
export interface ContactDetailsStepProps extends BaseFormProps {
  onFinalize?: () => void;
}

/**
 * Props for detailed estimation report
 */
export interface DetailedEstimationReportProps {
  formData: EstimationFormData;
  estimationResult: number;
  categories?: Array<{ category: string; amount: number }>;
}

/**
 * Options for PDF generation
 */
export interface PDFGenerationOptions {
  includeLogo?: boolean;
  includeBreakdown?: boolean;
  includeContactInfo?: boolean;
  includeTimeline?: boolean;
  preventDownload?: boolean;
}
