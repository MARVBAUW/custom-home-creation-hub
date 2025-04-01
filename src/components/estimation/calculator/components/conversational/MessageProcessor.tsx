
import React, { useState, useEffect } from 'react';
import { FormData } from '../../types/formTypes';
import { MessageProcessorProps } from '../../types/conversationalTypes';

const MessageProcessor: React.FC<MessageProcessorProps> = ({
  content,
  onProcessed,
  onUserInput,
  formData,
  updateFormData
}) => {
  const [processedContent, setProcessedContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    // Process the content - here we could extract data, parse for special commands, etc.
    // Example: check for surface information
    const surfaceMatch = content.match(/(\d+)\s*m²/);
    if (surfaceMatch && surfaceMatch[1]) {
      const surface = parseInt(surfaceMatch[1]);
      if (!isNaN(surface)) {
        updateFormData({ surface });
      }
    }

    // Process for project type
    if (content.toLowerCase().includes('maison') || content.toLowerCase().includes('construction')) {
      updateFormData({ projectType: 'construction' });
    } else if (content.toLowerCase().includes('rénov') || content.toLowerCase().includes('renovation')) {
      updateFormData({ projectType: 'renovation' });
    } else if (content.toLowerCase().includes('extension')) {
      updateFormData({ projectType: 'extension' });
    }

    // For now, just pass the content through
    setProcessedContent(content);
    
    // Call onProcessed with the result
    onProcessed(content);
  }, [content, onProcessed, updateFormData]);

  return null; // This component doesn't render anything
};

// Export utility functions for use in other components
export const analyzeUserIntent = (message: string): string => {
  // Simple intent analyzer - can be expanded later
  if (message.toLowerCase().includes('prix') || message.toLowerCase().includes('coût')) {
    return 'price_inquiry';
  }
  if (message.toLowerCase().includes('durée') || message.toLowerCase().includes('temps')) {
    return 'timeline_inquiry';
  }
  return 'general_information';
};

export const extractFormDataFromMessage = (message: string): Partial<FormData> => {
  const data: Partial<FormData> = {};
  
  // Extract surface
  const surfaceMatch = message.match(/(\d+)\s*m²/);
  if (surfaceMatch && surfaceMatch[1]) {
    data.surface = parseInt(surfaceMatch[1]);
  }
  
  // Extract project type
  if (message.toLowerCase().includes('maison') || message.toLowerCase().includes('construction')) {
    data.projectType = 'construction';
  } else if (message.toLowerCase().includes('rénov') || message.toLowerCase().includes('renovation')) {
    data.projectType = 'renovation';
  } else if (message.toLowerCase().includes('extension')) {
    data.projectType = 'extension';
  }
  
  return data;
};

export default MessageProcessor;
