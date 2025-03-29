
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
  updateFormData: (data: Partial<FormData>) => void; // Adding the missing property
  visibleSteps: any[];
  animationDirection: 'forward' | 'backward';
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  // All submit handlers
  onClientTypeSubmit: (data: { clientType: string }) => void;
  onProfessionalProjectSubmit: (data: any) => void;
  onIndividualProjectSubmit: (data: { projectType: string }) => void;
  onEstimationTypeSubmit: (data: any) => void;
  onConstructionDetailsSubmit: (data: any) => void;
  onTerrainSubmit: (data: { terrainType: string }) => void;
  onGrosOeuvreSubmit: (data: { wallType: string }) => void;
  onCharpenteSubmit: (data: { roofType: string }) => void;
  onComblesSubmit: (data: { atticType: string }) => void;
  onCouvertureSubmit: (data: { roofingType: string }) => void;
  onIsolationSubmit: (data: { insulationType: string }) => void;
  onFacadeSubmit: (data: any) => void;
  onMenuiseriesExtSubmit: (data: any) => void;
  onElectriciteSubmit: (data: { electricalType: string }) => void;
  onPlomberieSubmit: (data: { plumbingType: string }) => void;
  onChauffageSubmit: (data: any) => void;
  onPlatrerieSubmit: (data: { plasteringType: string }) => void;
  onMenuiseriesIntSubmit: (data: any) => void;
  onCarrelageSubmit: (data: any) => void;
  onParquetSubmit: (data: any) => void;
  onPeintureSubmit: (data: any) => void;
  onContactSubmit: (data: any) => void;
}

// Fix the technicalStepRegistry creation
export const useStepRendererManager = (props: StepRendererManagerProps) => {
  const {
    step,
    totalSteps,
    formData,
    visibleSteps,
    animationDirection,
    goToNextStep,
    goToPreviousStep,
    updateFormData, // Use the added property 
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

  // Fix: Add the missing goToNextStep parameter to createTechnicalStepRegistry
  const technicalStepRegistry = createTechnicalStepRegistry(
    formData,
    updateFormData,
    goToPreviousStep,
    goToNextStep // Add the missing argument
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
      // Pass 'contact' as string key - now allowed by updated StepComponentRegistry type
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
        // Return the DefaultStepContent component with the props
        return <DefaultStepContent {...props} />;
      },
    }, defaultProps);
  };

  return { renderStep };
};
