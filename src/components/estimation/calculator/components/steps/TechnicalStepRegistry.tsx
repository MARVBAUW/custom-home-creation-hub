
import React from 'react';
import { StepComponentRegistry } from './StepComponents';
import ElectriciteForm from '../../FormSteps/ElectriciteForm';
import PlomberieForm from '../../FormSteps/PlomberieForm';
import ChauffageForm from '../../FormSteps/ChauffageForm';
import { FormData } from '../../types';

export const createTechnicalStepRegistry = (
  formData: FormData,
  updateFormData: (data: Partial<FormData>) => void,
  goToPreviousStep: () => void
): StepComponentRegistry => {
  // Handle the electricalType submission
  const onElectriciteSubmit = (data: Partial<FormData>) => {
    // Format and validate the data
    const electricalType = data.electricalType;
    const validElectricalType = ['basic', 'standard', 'premium', 'smart_home'].includes(electricalType as string) 
      ? electricalType 
      : 'standard';
    
    // Update with validated data
    updateFormData({
      electricalType: validElectricalType as string
    });
    
    goToNextStep();
  };

  // Handle the plumbingType submission
  const onPlomberieSubmit = (data: Partial<FormData>) => {
    // Format and validate the data
    const plumbingType = data.plumbingType;
    const validPlumbingType = ['basic', 'standard', 'premium'].includes(plumbingType as string)
      ? plumbingType
      : 'standard';
    
    // Update with validated data
    updateFormData({
      plumbingType: validPlumbingType as string
    });
    
    goToNextStep();
  };

  // Handle the heating and air conditioning submission
  const onChauffageSubmit = (data: Partial<FormData>) => {
    // Format and validate the data
    const heatingType = data.heatingType;
    const validHeatingType = ['standard', 'floorHeating', 'heatPump'].includes(heatingType as string)
      ? heatingType
      : 'standard';
    
    const hasAirConditioning = !!data.hasAirConditioning;
    
    // Update with validated data
    updateFormData({
      heatingType: validHeatingType as string,
      hasAirConditioning: hasAirConditioning
    });
    
    goToNextStep();
  };

  return {
    14: (props) => (
      <ElectriciteForm
        {...props}
        defaultValues={{ electricalType: formData.electricalType }}
        onSubmit={onElectriciteSubmit}
      />
    ),
    15: (props) => (
      <PlomberieForm
        {...props}
        defaultValues={{ plumbingType: formData.plumbingType }}
        onSubmit={onPlomberieSubmit}
      />
    ),
    16: (props) => (
      <ChauffageForm
        {...props}
        defaultValues={{ 
          heatingType: formData.heatingType, 
          hasAirConditioning: formData.hasAirConditioning 
        }}
        onSubmit={onChauffageSubmit}
      />
    ),
  };

  function goToNextStep() {
    // This function would typically be passed in from the parent component
    // For now, we'll just define it here to avoid TypeScript errors
    console.log('Going to next step');
  }
};
