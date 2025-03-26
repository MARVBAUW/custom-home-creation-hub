
import React from 'react';
import ClientTypeForm from '../../FormSteps/ClientTypeForm';
import ProfessionalProjectForm from '../../FormSteps/ProfessionalProjectForm';
import IndividualProjectForm from '../../FormSteps/IndividualProjectForm';
import EstimationTypeForm from '../../FormSteps/EstimationTypeForm';
import ConstructionDetailsForm from '../../FormSteps/ConstructionDetailsForm';
import TerrainForm from '../../FormSteps/TerrainForm';
import GrosOeuvreForm from '../../FormSteps/GrosOeuvreForm';
import CharpenteForm from '../../FormSteps/CharpenteForm';
import CombleForm from '../../FormSteps/CombleForm';
import CouvertureForm from '../../FormSteps/CouvertureForm';
import IsolationForm from '../../FormSteps/IsolationForm';
import FacadeForm from '../../FormSteps/FacadeForm';
import MenuiseriesExtForm from '../../FormSteps/MenuiseriesExtForm';
import ElectriciteForm from '../../FormSteps/ElectriciteForm';
import PlomberieForm from '../../FormSteps/PlomberieForm';
import ChauffageForm from '../../FormSteps/ChauffageForm';
import PlatrerieForm from '../../FormSteps/PlatrerieForm';
import MenuiseriesIntForm from '../../FormSteps/MenuiseriesIntForm';
import CarrelageForm from '../../FormSteps/CarrelageForm';
import ParquetForm from '../../FormSteps/ParquetForm';
import PeintureForm from '../../FormSteps/PeintureForm';
import ContactForm from '../../FormSteps/ContactForm';
import DefaultStepContent from '../../DefaultStepContent';
import { FormData } from '../../types';

// Define types for the step components props
export interface StepComponentProps {
  animationDirection: 'forward' | 'backward';
  goToPreviousStep: () => void;
}

export interface DefaultStepProps extends StepComponentProps {
  step: number;
  visibleSteps: any[];
  goToNextStep: () => void;
  totalSteps: number;
}

// Type for forms that need default values
export interface FormStepProps<T = any> extends StepComponentProps {
  defaultValues: T;
  onSubmit: (data: T) => void;
}

// Step component registry
export type StepComponentRegistry = {
  [key: number]: (props: any) => JSX.Element;
};

// Factory function to create step components with their props
export const createStepComponent = (step: number, registry: StepComponentRegistry, props: any): JSX.Element => {
  const Component = registry[step];
  
  if (Component) {
    return <Component {...props} />;
  }
  
  return <DefaultStepContent {...props} />;
};
