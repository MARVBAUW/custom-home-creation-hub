
import { FormData, EstimationResponseData } from '../types';
import { supabase } from '@/lib/supabase';

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
    // Convert estimation to the right format if needed
    const estimation = typeof estimationResult === 'number' 
      ? { totalAmount: estimationResult } 
      : estimationResult;
    
    // Call the Supabase edge function to send the email
    const { data, error } = await supabase.functions.invoke('send-estimation', {
      body: {
        email,
        formData,
        estimationResult: estimation,
        includeFullReport: true
      }
    });
    
    if (error) {
      console.error('Error calling send-estimation function:', error);
      throw error;
    }
    
    // Log for debugging
    console.log('Email sent successfully:', data);
    
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
