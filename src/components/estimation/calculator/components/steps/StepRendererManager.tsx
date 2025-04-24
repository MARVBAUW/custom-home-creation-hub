
import { StepComponentRegistry, createStepComponent, DefaultStepProps } from './StepComponents';
import { createClientStepRegistry } from './ClientStepRegistry';
import { createConstructionStepRegistry } from './ConstructionStepRegistry';
import { createEnvelopeStepRegistry } from './EnvelopeStepRegistry';
import { createTechnicalStepRegistry } from './TechnicalStepRegistry';
import { createInteriorStepRegistry } from './InteriorStepRegistry';
import { createContactStepRegistry } from './ContactStepRegistry';
import { EstimationFormData, FormData } from '../../types/formTypes';
import DefaultStepContent from '../../DefaultStepContent';

export interface StepRendererManagerProps {
  step: number;
  totalSteps: number;
  formData: EstimationFormData | FormData;
  updateFormData: (data: Partial<EstimationFormData | FormData>) => void; 
  visibleSteps: any[];
  animationDirection: 'forward' | 'backward';
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  // All submit handlers
  onClientTypeSubmit: (data: Partial<EstimationFormData | FormData>) => void;
  onProfessionalProjectSubmit: (data: Partial<EstimationFormData | FormData>) => void;
  onIndividualProjectSubmit: (data: Partial<EstimationFormData | FormData>) => void;
  onEstimationTypeSubmit: (data: Partial<EstimationFormData | FormData>) => void;
  onConstructionDetailsSubmit: (data: Partial<EstimationFormData | FormData>) => void;
  onTerrainSubmit: (data: Partial<EstimationFormData | FormData>) => void;
  onGrosOeuvreSubmit: (data: Partial<EstimationFormData | FormData>) => void;
  onCharpenteSubmit: (data: Partial<EstimationFormData | FormData>) => void;
  onComblesSubmit: (data: Partial<EstimationFormData | FormData>) => void;
  onCouvertureSubmit: (data: Partial<EstimationFormData | FormData>) => void;
  onIsolationSubmit: (data: Partial<EstimationFormData | FormData>) => void;
  onFacadeSubmit: (data: Partial<EstimationFormData | FormData>) => void;
  onMenuiseriesExtSubmit: (data: Partial<EstimationFormData | FormData>) => void;
  onElectriciteSubmit: (data: Partial<EstimationFormData | FormData>) => void;
  onPlomberieSubmit: (data: Partial<EstimationFormData | FormData>) => void;
  onChauffageSubmit: (data: Partial<EstimationFormData | FormData>) => void;
  onPlatrerieSubmit: (data: Partial<EstimationFormData | FormData>) => void;
  onMenuiseriesIntSubmit: (data: Partial<EstimationFormData | FormData>) => void;
  onCarrelageSubmit: (data: Partial<EstimationFormData | FormData>) => void;
  onParquetSubmit: (data: Partial<EstimationFormData | FormData>) => void;
  onPeintureSubmit: (data: Partial<EstimationFormData | FormData>) => void;
  onContactSubmit: (data: Partial<EstimationFormData | FormData>) => void;
}

export const useStepRendererManager = (props: StepRendererManagerProps) => {
  const {
    step,
    totalSteps,
    formData,
    visibleSteps,
    animationDirection,
    goToNextStep,
    goToPreviousStep,
    updateFormData,
    // Submit handlers
    onClientTypeSubmit,
    onProfessionalProjectSubmit,
    onIndividualProjectSubmit,
    onEstimationTypeSubmit,
    onConstructionDetailsSubmit,
    onTerrainSubmit,
    onGrosOeuvreSubmit,
    onCharpenteSubmit,
    onComblesSubmit,
    onCouvertureSubmit,
    onIsolationSubmit,
    onFacadeSubmit,
    onMenuiseriesExtSubmit,
    onElectriciteSubmit,
    onPlomberieSubmit,
    onChauffageSubmit,
    onPlatrerieSubmit,
    onMenuiseriesIntSubmit,
    onCarrelageSubmit,
    onParquetSubmit,
    onPeintureSubmit,
    onContactSubmit,
  } = props;

  // Create all registry sections
  const clientStepRegistry = createClientStepRegistry(
    formData,
    onClientTypeSubmit,
    onProfessionalProjectSubmit,
    onIndividualProjectSubmit,
    onEstimationTypeSubmit,
    goToPreviousStep
  );

  const constructionStepRegistry = createConstructionStepRegistry(
    formData,
    onConstructionDetailsSubmit,
    onTerrainSubmit,
    onGrosOeuvreSubmit,
    onCharpenteSubmit,
    onComblesSubmit,
    goToPreviousStep
  );

  const envelopeStepRegistry = createEnvelopeStepRegistry(
    formData,
    onCouvertureSubmit,
    onIsolationSubmit,
    onFacadeSubmit,
    onMenuiseriesExtSubmit,
    goToPreviousStep
  );

  // Create technical registry with all required parameters
  const technicalStepRegistry = createTechnicalStepRegistry(
    formData,
    updateFormData,
    goToPreviousStep,
    goToNextStep
  );

  const interiorStepRegistry = createInteriorStepRegistry(
    formData,
    onPlatrerieSubmit,
    onMenuiseriesIntSubmit,
    onCarrelageSubmit,
    onParquetSubmit,
    onPeintureSubmit,
    goToPreviousStep
  );

  const contactStepRegistry = createContactStepRegistry(
    formData,
    onContactSubmit,
    goToPreviousStep
  );

  // Combine all registries into a single complete registry
  const completeStepRegistry: StepComponentRegistry = {
    ...clientStepRegistry,
    ...constructionStepRegistry,
    ...envelopeStepRegistry,
    ...technicalStepRegistry,
    ...interiorStepRegistry,
  };

  // Function to render the appropriate step component
  const renderStep = () => {
    // Check if this is the final step (contact)
    const isLastStep = step === totalSteps;

    if (isLastStep) {
      return createStepComponent('contact' as any, contactStepRegistry, {
        animationDirection,
        goToPreviousStep,
      });
    }

    // For all other steps, check if we have a component in the registry
    if (completeStepRegistry[step]) {
      return createStepComponent(step, completeStepRegistry, {
        animationDirection,
        goToPreviousStep,
      });
    }

    // Default case - render default step component
    const defaultProps: DefaultStepProps = {
      step,
      visibleSteps,
      goToNextStep,
      goToPreviousStep,
      totalSteps,
      animationDirection,
    };

    return createStepComponent('default' as any, {
      default: (props: DefaultStepProps) => {
        return <DefaultStepContent {...props} />;
      },
    }, defaultProps);
  };

  return { renderStep };
};
