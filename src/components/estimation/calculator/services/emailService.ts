
import { FormData, EstimationResponseData } from '../types';
import { generateEstimationReport } from '../utils/generateEstimationReport';

// Function to send estimation results by email
export const sendEstimationByEmail = async (
  email: string,
  formData: FormData,
  estimationResult: EstimationResponseData
) => {
  try {
    // Generate a report for the email
    const report = generateEstimationReport(formData, estimationResult);
    
    // In a real implementation, this would call an API to send the email
    console.log('Sending estimation to email:', email);
    console.log('Estimation report:', report);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: `Estimation envoyée avec succès à ${email}`
    };
  } catch (error) {
    console.error('Error sending estimation by email:', error);
    return {
      success: false,
      message: 'Une erreur est survenue lors de l\'envoi de l\'email'
    };
  }
};

// Function to generate a shareable link for the estimation
export const generateShareableLink = (estimationId: string) => {
  // In a real implementation, this would generate a unique, secure link
  return `https://progineer.fr/estimation/share/${estimationId}`;
};
