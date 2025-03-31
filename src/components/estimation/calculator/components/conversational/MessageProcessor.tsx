
import React, { useState, useEffect } from 'react';
import { FormData } from '../../types/formTypes';

interface MessageProcessorProps {
  content: string;
  onProcessed: (processedContent: React.ReactNode) => void;
  onUserInput: (input: string) => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

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

export default MessageProcessor;
