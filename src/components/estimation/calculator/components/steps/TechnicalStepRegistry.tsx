
import PlomberieForm from '../../FormSteps/PlomberieForm';
import ElectriciteForm from '../../FormSteps/ElectriciteForm';
import ChauffageForm from '../../FormSteps/ChauffageForm';
import { FormData } from '../../types';
import { StepComponentRegistry } from './StepComponents';

export const createTechnicalStepRegistry = (
  formData: FormData,
  onElectriciteSubmit: (data: { electricalType: string }) => void,
  onPlomberieSubmit: (data: { plumbingType: string }) => void,
  onChauffageSubmit: (data: any) => void,
  goToPreviousStep: () => void
): StepComponentRegistry => {
  return {
    14: (props) => (
      <ElectriciteForm
        formData={formData}
        updateFormData={onElectriciteSubmit}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
        defaultValues={{ electricalType: formData.electricalType || 'standard' }}
        onSubmit={onElectriciteSubmit}
      />
    ),
    15: (props) => (
      <PlomberieForm
        formData={formData}
        updateFormData={onPlomberieSubmit}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
        defaultValues={{ plumbingType: formData.plumbingType || 'standard' }}
        onSubmit={onPlomberieSubmit}
      />
    ),
    16: (props) => (
      <ChauffageForm
        formData={formData}
        updateFormData={onChauffageSubmit}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
        defaultValues={{ 
          heatingType: formData.heatingType || 'pompe', 
          hasAirConditioning: formData.hasAirConditioning || true 
        }}
        onSubmit={onChauffageSubmit}
      />
    )
  };
};
