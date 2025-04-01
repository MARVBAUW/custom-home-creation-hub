
import React, { useEffect } from 'react';
import { MessageProcessorProps } from '../../types/conversationalTypes';

/**
 * Analyzes user intent from message content
 */
export function analyzeUserIntent(content: string) {
  // Simple intent analysis logic
  const intents = {
    projectType: null,
    surface: null,
    budget: null,
    location: null
  };
  
  // Check for project type mentions
  if (content.toLowerCase().includes('construction') || 
      content.toLowerCase().includes('maison neuve')) {
    intents.projectType = 'construction';
  } else if (content.toLowerCase().includes('renovation') || 
             content.toLowerCase().includes('rénov')) {
    intents.projectType = 'renovation';
  } else if (content.toLowerCase().includes('extension')) {
    intents.projectType = 'extension';
  }
  
  // Extract surface information
  const surfaceMatch = content.match(/(\d+)\s*m²/);
  if (surfaceMatch && surfaceMatch[1]) {
    intents.surface = parseInt(surfaceMatch[1], 10);
  }
  
  // Extract budget information
  const budgetMatch = content.match(/(\d+[\d\s]*)\s*€/);
  if (budgetMatch && budgetMatch[1]) {
    intents.budget = parseInt(budgetMatch[1].replace(/\s/g, ''), 10);
  }
  
  // Extract location information
  // This would require a more sophisticated NLP approach for accurate extraction
  
  return intents;
}

/**
 * Extracts form data from a message
 */
export function extractFormDataFromMessage(content: string) {
  const intents = analyzeUserIntent(content);
  const formData: Record<string, any> = {};
  
  if (intents.projectType) formData.projectType = intents.projectType;
  if (intents.surface) formData.surface = intents.surface;
  if (intents.budget) formData.budget = intents.budget;
  if (intents.location) formData.location = intents.location;
  
  return formData;
}

/**
 * Component that processes user messages and extracts relevant information
 */
const MessageProcessor: React.FC<MessageProcessorProps> = ({ 
  content, 
  onProcessed,
  updateFormData
}) => {
  useEffect(() => {
    if (!content) return;
    
    // Extract form data from the message
    const extractedData = extractFormDataFromMessage(content);
    
    // Update form data with extracted information
    if (Object.keys(extractedData).length > 0) {
      updateFormData(extractedData);
    }
    
    // Signal that processing is complete
    onProcessed(content);
  }, [content, updateFormData, onProcessed]);
  
  // This component doesn't render anything
  return null;
};

export default MessageProcessor;
