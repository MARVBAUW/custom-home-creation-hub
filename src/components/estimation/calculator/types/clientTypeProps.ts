
import { EstimationFormData } from './estimationFormData';

// Define client-specific step props with optional goToPreviousStep
export interface ClientTypeStepProps {
  formData: EstimationFormData;
  updateFormData: (data: Partial<EstimationFormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep?: () => void;  // Make this optional
  animationDirection: string;
}
