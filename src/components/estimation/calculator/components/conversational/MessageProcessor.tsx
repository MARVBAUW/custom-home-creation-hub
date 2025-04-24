
import React, { useEffect } from 'react';
import { MessageProcessorProps } from './types';

const MessageProcessor: React.FC<MessageProcessorProps> = ({
  onUserInput,
  formData,
  updateFormData,
  content,
  onProcessed
}) => {
  useEffect(() => {
    // Process the message content here
    // For example, extract project details, surfaces, etc.
    
    // Simple example of processing: if the message contains a number, it might be a surface
    const numbers = content.match(/\d+/g);
    if (numbers && numbers.length > 0) {
      const potentialSurface = parseInt(numbers[0], 10);
      if (!isNaN(potentialSurface) && potentialSurface > 0) {
        // If this appears to be a surface measurement
        if (content.toLowerCase().includes('surface') || content.toLowerCase().includes('m²')) {
          updateFormData({ surface: potentialSurface });
        }
      }
    }
    
    // Check for location information
    const locationKeywords = ['situé', 'situe', 'location', 'ville', 'region'];
    if (locationKeywords.some(keyword => content.toLowerCase().includes(keyword))) {
      // Extract potential location information
      // This is a simplified example
      const words = content.split(' ');
      const locationIndex = words.findIndex(word => 
        locationKeywords.some(keyword => word.toLowerCase().includes(keyword))
      );
      
      if (locationIndex >= 0 && locationIndex < words.length - 1) {
        const potentialLocation = words[locationIndex + 1].replace(/[.,!?]/g, '');
        updateFormData({ location: potentialLocation });
      }
    }
    
    // This is a simplified processing example
    // A real implementation would use NLP or more sophisticated text processing
    
    // Notify that processing is complete
    onProcessed(content);
    
  }, [content, onProcessed, updateFormData]);

  return null; // This is a logic component, it doesn't render anything
};

export default MessageProcessor;
