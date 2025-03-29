
import { FormData } from '../types';

/**
 * A helper function to ensure prop types are correctly passed to form components
 * This will help avoid TypeScript errors when passing props to form components
 */
export const ensureFormProps = <T extends keyof FormData>(
  formData: FormData,
  updateFormData: (data: Partial<FormData>) => void,
  goToNextStep: () => void,
  goToPreviousStep: () => void,
  animationDirection: 'forward' | 'backward',
  defaultValues?: any,
  onSubmit?: (data: any) => void
) => {
  return {
    formData,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    animationDirection,
    ...(defaultValues ? { defaultValues } : {}),
    ...(onSubmit ? { onSubmit } : {})
  };
};

/**
 * Helper function to convert any form values to a structured form data object
 * This ensures all values are properly typed when updating form data
 */
export const convertFormValues = <T extends Partial<FormData>>(values: any): T => {
  // Basic conversion logic
  const formattedValues: Partial<FormData> = {};
  
  // Add conversion logic as needed for specific fields
  Object.entries(values).forEach(([key, value]) => {
    // Handle specific value types
    if (typeof value === 'string' && value.trim() === '') {
      // Skip empty strings
      return;
    }
    
    // Add to formatted values
    (formattedValues as any)[key] = value;
  });
  
  return formattedValues as T;
};
