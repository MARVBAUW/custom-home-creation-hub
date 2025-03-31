
import { FormData, EstimationResponseData } from '../types';

// Result interface for email sending operations
export interface EmailResult {
  success: boolean;
  message: string;
}

/**
 * Sends the estimation details to the specified email address
 * 
 * @param email The recipient's email address
 * @param formData The form data with project details
 * @param estimationResult The calculated estimation results
 * @returns A promise that resolves to the result of the email operation
 */
export const sendEstimationByEmail = async (
  email: string,
  formData: FormData,
  estimationResult: EstimationResponseData | number
): Promise<EmailResult> => {
  try {
    // For demo purposes, we're just returning a success message
    // In a real application, this would make an API call to a backend service
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Convert estimation to the right format if needed
    const estimation = typeof estimationResult === 'number' 
      ? { totalAmount: estimationResult } 
      : estimationResult;
    
    // Log for debugging
    console.log('Sending email with estimation:', {
      to: email,
      formData,
      estimation
    });
    
    // Return success result
    return {
      success: true,
      message: `L'estimation a été envoyée avec succès à ${email}.`
    };
    
  } catch (error) {
    console.error('Error sending estimation email:', error);
    
    // Return error result
    return {
      success: false,
      message: 'Une erreur est survenue lors de l\'envoi de l\'email. Veuillez réessayer plus tard.'
    };
  }
};

// Alias for backward compatibility
export const sendEstimationEmail = sendEstimationByEmail;
