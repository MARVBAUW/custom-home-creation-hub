
import React from 'react';
import { MessageProcessorProps } from '../../types';

const MessageProcessor: React.FC<MessageProcessorProps> = (props) => {
  const { onUserInput, formData, updateFormData } = props;

  const processUserInput = (input: string) => {
    // This function would contain the logic for processing user input
    // and determining how to update the form data based on the natural language input
    
    console.log('Processing input:', input);
    
    // Example simple processing - extract surface value if mentioned
    const surfaceMatch = input.match(/(\d+)\s*m²/);
    if (surfaceMatch) {
      const surface = parseInt(surfaceMatch[1], 10);
      updateFormData({ surface });
      console.log(`Detected surface: ${surface}m²`);
    }
    
    // Extract project type information
    if (input.toLowerCase().includes('maison')) {
      updateFormData({ projectType: 'Construction maison individuelle' });
    } else if (input.toLowerCase().includes('rénovation')) {
      updateFormData({ projectType: 'Rénovation lourde' });
    }

    // Pass the processed input up to the parent component
    onUserInput(input);
  };

  return (
    <>{/* This component doesn't render anything itself, it just processes logic */}</>
  );
};

export default MessageProcessor;
