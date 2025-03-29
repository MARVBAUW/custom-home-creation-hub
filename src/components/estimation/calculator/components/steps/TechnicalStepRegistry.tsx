
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
  // Define the function for moving to the next step
  const goToNextStep = () => {
    console.log('Going to next step');
  };

  // Handle the electricalType submission
  const onElectriciteSubmit = (data: Partial<FormData>) => {
    // Format and validate the data
    const electricalType = data.electricalType;
    
    // Validate that electricalType is one of the expected values
    const validElectricalTypes = ['basic', 'standard', 'premium', 'smart_home'];
    const validElectricalType = validElectricalTypes.includes(electricalType as string) 
      ? electricalType 
      : 'standard';
    
    // Update with validated data
    updateFormData({
      electricalType: validElectricalType as string
    });
    
    // Log the update for debugging
    console.log('Updated electricalType:', validElectricalType);
    
    // Continue to the next step
    goToNextStep();
  };

  // Handle the plumbingType submission
  const onPlomberieSubmit = (data: Partial<FormData>) => {
    // Format and validate the data
    const plumbingType = data.plumbingType;
    
    // Validate that plumbingType is one of the expected values
    const validPlumbingTypes = ['basic', 'standard', 'premium'];
    const validPlumbingType = validPlumbingTypes.includes(plumbingType as string)
      ? plumbingType
      : 'standard';
    
    // Update with validated data
    updateFormData({
      plumbingType: validPlumbingType as string
    });
    
    // Log the update for debugging
    console.log('Updated plumbingType:', validPlumbingType);
    
    // Continue to the next step
    goToNextStep();
  };

  // Handle the heating and air conditioning submission
  const onChauffageSubmit = (data: Partial<FormData>) => {
    // Format and validate the data
    const heatingType = data.heatingType;
    
    // Validate that heatingType is one of the expected values
    const validHeatingTypes = ['standard', 'floorHeating', 'heatPump'];
    const validHeatingType = validHeatingTypes.includes(heatingType as string)
      ? heatingType
      : 'standard';
    
    // Ensure hasAirConditioning is a boolean
    const hasAirConditioning = data.hasAirConditioning === true;
    
    // Update with validated data
    updateFormData({
      heatingType: validHeatingType as string,
      hasAirConditioning: hasAirConditioning
    });
    
    // Log the update for debugging
    console.log('Updated heatingType:', validHeatingType);
    console.log('Updated hasAirConditioning:', hasAirConditioning);
    
    // Continue to the next step
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
};
