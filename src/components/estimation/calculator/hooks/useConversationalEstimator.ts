
import { useState, useEffect } from 'react';
import { FormData, Message, ConversationState } from '../types';

export const useConversationalEstimator = (
  formData: FormData,
  updateFormData: (data: Partial<FormData>) => void
) => {
  // Initialize conversation state
  const [conversation, setConversation] = useState<ConversationState>({
    currentStep: 'greeting',
    askedQuestions: [],
    completedFields: [],
    formProgress: 0
  });

  // Detect project information from user input
  const extractProjectInfo = (input: string): Partial<FormData> => {
    const data: Partial<FormData> = {};
    
    // Extract project type
    if (input.toLowerCase().includes('neuve') || input.toLowerCase().includes('construction')) {
      data.projectType = 'construction';
    } else if (input.toLowerCase().includes('rénovation') || input.toLowerCase().includes('renovation')) {
      data.projectType = 'renovation';
    } else if (input.toLowerCase().includes('extension')) {
      data.projectType = 'extension';
    }
    
    // Extract surface information
    const surfaceMatch = input.match(/(\d+)\s*m²|(\d+)\s*m2|(\d+)\s*mètres?(\s*carrés?)?/i);
    if (surfaceMatch) {
      const surfaceValue = surfaceMatch[1] || surfaceMatch[2] || surfaceMatch[3];
      data.surface = parseInt(surfaceValue);
    }
    
    // Extract location information
    const cities = ['paris', 'marseille', 'lyon', 'toulouse', 'nice', 'nantes', 'strasbourg', 'montpellier', 'bordeaux', 'lille'];
    const inputLower = input.toLowerCase();
    for (const city of cities) {
      if (inputLower.includes(city)) {
        data.city = city.charAt(0).toUpperCase() + city.slice(1);
        break;
      }
    }
    
    // Extract budget information
    const budgetMatch = input.match(/(\d+)\s*(?:k€|k euros|mille euros|mille €|k)/i);
    if (budgetMatch) {
      data.budget = parseInt(budgetMatch[1]) * 1000;
    } else {
      const budgetEuroMatch = input.match(/(\d+)\s*(?:€|euros)/i);
      if (budgetEuroMatch) {
        data.budget = parseInt(budgetEuroMatch[1]);
      }
    }
    
    return data;
  };

  // Process user input and update form data
  const processUserInput = async (input: string): Promise<void> => {
    // Extract project information from user input
    const extractedData = extractProjectInfo(input);
    
    // Update form data if we extracted any information
    if (Object.keys(extractedData).length > 0) {
      updateFormData(extractedData);
    }
    
    // Update conversation state
    setConversation(prev => {
      // Track which fields have been filled
      const newCompletedFields = [...prev.completedFields];
      Object.keys(extractedData).forEach(key => {
        if (!newCompletedFields.includes(key)) {
          newCompletedFields.push(key);
        }
      });
      
      // Determine the next step based on conversation progress
      let nextStep = prev.currentStep;
      if (prev.currentStep === 'greeting') {
        if (input.toLowerCase().includes('particulier')) {
          nextStep = 'client_type';
          updateFormData({ clientType: 'individual' });
        } else if (input.toLowerCase().includes('professionnel')) {
          nextStep = 'client_type';
          updateFormData({ clientType: 'professional' });
        } else if (extractedData.projectType) {
          nextStep = 'project_type';
        }
      } else if (prev.currentStep === 'client_type' && extractedData.projectType) {
        nextStep = 'project_type';
      } else if (prev.currentStep === 'project_type' && extractedData.surface) {
        nextStep = 'surface';
      } else if (prev.currentStep === 'surface' && extractedData.city) {
        nextStep = 'location';
      }
      
      // Calculate progress
      const totalFields = 10; // Total number of key fields to fill
      const progress = Math.min(100, Math.round((newCompletedFields.length / totalFields) * 100));
      
      return {
        ...prev,
        currentStep: nextStep,
        askedQuestions: [...prev.askedQuestions, input],
        completedFields: newCompletedFields,
        formProgress: progress
      };
    });
  };

  // Add a message to the conversation
  const addMessage = (text: string, isUser: boolean): Message => {
    const message = {
      id: Date.now().toString(),
      text,
      isUser,
      createdAt: new Date()
    };
    
    return message;
  };

  // Simulate typing delay for a more natural conversation
  const simulateTyping = async (duration: number = 1000): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, duration));
  };

  // Get suggested next questions based on current conversation state
  const getSuggestions = (): string[] => {
    const { currentStep, completedFields } = conversation;
    
    if (!completedFields.includes('projectType')) {
      return [
        "Je souhaite construire une maison neuve",
        "Je veux rénover mon appartement",
        "J'ai besoin d'une extension pour ma maison"
      ];
    }
    
    if (!completedFields.includes('surface')) {
      return [
        "La surface est d'environ 100 m²",
        "Je prévois une surface de 150 m²",
        "Quelle surface recommandez-vous pour une famille de 4 personnes ?"
      ];
    }
    
    if (!completedFields.includes('city')) {
      return [
        "Mon projet est situé à Marseille",
        "Je suis dans la région de Lyon",
        "Quelles sont les particularités de construction dans le Sud ?"
      ];
    }
    
    if (!completedFields.includes('budget')) {
      return [
        "J'ai un budget d'environ 200 000 €",
        "Quel budget prévoir pour ce type de projet ?",
        "Quels sont les coûts moyens au m² dans ma région ?"
      ];
    }
    
    return [
      "Quelles sont les prochaines étapes ?",
      "Pouvez-vous me faire une estimation plus précise ?",
      "Quels documents faut-il prévoir pour démarrer le projet ?"
    ];
  };

  return {
    conversation,
    processUserInput,
    addMessage,
    simulateTyping,
    getSuggestions
  };
};

export type { ConversationState, Message };
