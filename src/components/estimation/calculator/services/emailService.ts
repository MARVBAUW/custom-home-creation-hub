
import { FormData, EstimationResponseData } from '../types';
import { generateEstimationReport } from '../calculationUtils';

/**
 * Send estimation results via email
 */
export const sendEstimationEmail = async (
  formData: FormData,
  estimation: EstimationResponseData,
  recipientEmail: string
): Promise<boolean> => {
  try {
    // In a real implementation, this would use an API endpoint to send the email
    console.log('Sending estimation email to:', recipientEmail);
    const emailContent = generateEstimationReport(formData, estimation);
    console.log('Email content:', emailContent);
    
    // Mock successful email sending
    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending estimation email:', error);
    return false;
  }
};

/**
 * Send a contact request email
 */
export const sendContactEmail = async (
  name: string,
  email: string,
  phone: string,
  message: string
): Promise<boolean> => {
  try {
    // In a real implementation, this would use an API endpoint to send the email
    console.log('Sending contact email from:', email);
    console.log('Contact name:', name);
    console.log('Contact phone:', phone);
    console.log('Contact message:', message);
    
    // Mock successful email sending
    console.log('Contact email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending contact email:', error);
    return false;
  }
};
