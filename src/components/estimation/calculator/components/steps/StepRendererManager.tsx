
import { StepComponentRegistry, createStepComponent, DefaultStepProps } from './StepComponents';
import { createClientStepRegistry } from './ClientStepRegistry';
import { createConstructionStepRegistry } from './ConstructionStepRegistry';
import { createEnvelopeStepRegistry } from './EnvelopeStepRegistry';
import { createTechnicalStepRegistry } from './TechnicalStepRegistry';
import { createInteriorStepRegistry } from './InteriorStepRegistry';
import { createContactStepRegistry } from './ContactStepRegistry';
import { FormData } from '../../types';
import DefaultStepContent from '../../DefaultStepContent';

export interface StepRendererManagerProps {
  step: number;
  totalSteps: number;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void; 
  visibleSteps: any[];
  animationDirection: 'forward' | 'backward';
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  // All submit handlers
  onClientTypeSubmit: (data: Partial<FormData>) => void;
  onProfessionalProjectSubmit: (data: Partial<FormData>) => void;
  onIndividualProjectSubmit: (data: Partial<FormData>) => void;
  onEstimationTypeSubmit: (data: Partial<FormData>) => void;
  onConstructionDetailsSubmit: (data: Partial<FormData>) => void;
  onTerrainSubmit: (data: Partial<FormData>) => void;
  onGrosOeuvreSubmit: (data: Partial<FormData>) => void;
  onCharpenteSubmit: (data: Partial<FormData>) => void;
  onComblesSubmit: (data: Partial<FormData>) => void;
  onCouvertureSubmit: (data: Partial<FormData>) => void;
  onIsolationSubmit: (data: Partial<FormData>) => void;
  onFacadeSubmit: (data: Partial<FormData>) => void;
  onMenuiseriesExtSubmit: (data: Partial<FormData>) => void;
  onElectriciteSubmit: (data: Partial<FormData>) => void;
  onPlomberieSubmit: (data: Partial<FormData>) => void;
  onChauffageSubmit: (data: Partial<FormData>) => void;
  onPlatrerieSubmit: (data: Partial<FormData>) => void;
  onMenuiseriesIntSubmit: (data: Partial<FormData>) => void;
  onCarrelageSubmit: (data: Partial<FormData>) => void;
  onParquetSubmit: (data: Partial<FormData>) => void;
  onPeintureSubmit: (data: Partial<FormData>) => void;
  onContactSubmit: (data: Partial<FormData>) => void;
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
