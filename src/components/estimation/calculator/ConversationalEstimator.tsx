
import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card } from "@/components/ui/card";
import MessageDisplay from './components/conversational/MessageDisplay';
import InputArea from './components/conversational/InputArea';
import MessageProcessor from './components/conversational/MessageProcessor';
import { FormData } from './types/formTypes';
import { Message } from './types/conversationalTypes';
import { useToast } from '@/hooks/use-toast';

interface ConversationalEstimatorProps {
  onUserInput: (input: string) => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onClientTypeSubmit?: (data: {clientType: string}) => void;
  goToStep?: (step: number) => void;
}

const ConversationalEstimator: React.FC<ConversationalEstimatorProps> = ({
  onUserInput,
  formData,
  updateFormData,
  onClientTypeSubmit,
  goToStep
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: uuidv4(),
          type: 'system',
          content: "Bonjour ! Je suis votre assistant virtuel pour l'estimation de votre projet. Décrivez-moi votre projet (type, surface, localisation) et je pourrai vous aider à l'estimer.",
          options: ['Construction neuve', 'Rénovation', 'Extension', 'Aménagement intérieur']
        }
      ]);
    }
  }, [messages]);

  // Handle user message submission
  const handleSendMessage = () => {
    if (userInput.trim() === '') return;
    
    // Add user message to chat
    const newUserMessage: Message = {
      id: uuidv4(),
      type: 'user',
      content: userInput
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    
    // Process user input
    processUserInput(userInput);
    
    // Clear input field
    setUserInput('');
    
    // Show assistant is typing
    setLoading(true);
    
    // Simulate AI response time
    setTimeout(() => {
      generateResponse(userInput);
      setLoading(false);
    }, 1500);
  };
  
  // Process user input and update form data
  const processUserInput = (input: string) => {
    // Pass to parent component
    onUserInput(input);
    
    // Process for form data extraction
    const lowerInput = input.toLowerCase();
    
    // Extract project type
    if (lowerInput.includes('maison') || lowerInput.includes('construction')) {
      updateFormData({ projectType: 'construction' });
    } else if (lowerInput.includes('rénovation') || lowerInput.includes('renovation')) {
      updateFormData({ projectType: 'renovation' });
    } else if (lowerInput.includes('extension')) {
      updateFormData({ projectType: 'extension' });
    } else if (lowerInput.includes('aménag') || lowerInput.includes('amenag')) {
      updateFormData({ projectType: 'amenagement' });
    }
    
    // Extract surface
    const surfaceMatch = lowerInput.match(/(\d+)\s*(?:m²|m2|mètres carrés|metres carres)/);
    if (surfaceMatch && surfaceMatch[1]) {
      updateFormData({ surface: parseInt(surfaceMatch[1]) });
    }
    
    // Extract location
    if (lowerInput.includes('à ') || lowerInput.includes('a ')) {
      const locationMatch = lowerInput.match(/(?:à|a)\s+([A-Za-zÀ-ÿ-]+)/);
      if (locationMatch && locationMatch[1]) {
        const city = locationMatch[1].charAt(0).toUpperCase() + locationMatch[1].slice(1).toLowerCase();
        updateFormData({ city: city });
      }
    }
  };
  
  // Generate assistant response based on user input
  const generateResponse = (input: string) => {
    let responseContent = '';
    let responseOptions: string[] = [];
    
    // Checks if project type is mentioned
    const hasProjectType = formData.projectType !== undefined && formData.projectType !== '';
    // Checks if surface is mentioned
    const hasSurface = formData.surface !== undefined && formData.surface !== 0;
    // Checks if location is mentioned
    const hasLocation = formData.city !== undefined && formData.city !== '';
    
    // Response based on collected information
    if (!hasProjectType) {
      responseContent = "Pour commencer, pourriez-vous me préciser le type de projet que vous envisagez ? (construction neuve, rénovation, extension...)";
      responseOptions = ['Construction neuve', 'Rénovation', 'Extension', 'Aménagement intérieur'];
    } else if (!hasSurface) {
      responseContent = `Je vois que vous envisagez un projet de ${formData.projectType}. Quelle est la surface approximative en m² ?`;
      responseOptions = ['Moins de 50m²', '50-100m²', '100-150m²', '150-200m²', 'Plus de 200m²'];
    } else if (!hasLocation) {
      responseContent = `Merci ! Un projet de ${formData.projectType} de ${formData.surface}m². Où ce projet sera-t-il situé ?`;
      responseOptions = ['Région PACA', 'Région Île-de-France', 'Autre région'];
    } else {
      // Calculate preliminary estimation
      const estimationPerM2 = getEstimationBasePrice(formData.projectType || '');
      const totalEstimation = (formData.surface || 0) * estimationPerM2;
      
      // Format the estimation with thousand separators
      const formattedEstimation = new Intl.NumberFormat('fr-FR').format(totalEstimation);
      
      responseContent = `D'après les informations que vous m'avez fournies (${formData.projectType} de ${formData.surface}m² à ${formData.city}), j'estime votre projet à environ ${formattedEstimation}€. Cette estimation de base inclut les travaux principaux. Souhaitez-vous affiner cette estimation avec plus de détails ?`;
      responseOptions = ['Oui, affiner l\'estimation', 'Quelles prestations sont incluses ?', 'Quels sont les délais habituels ?'];
      
      // Update formData with the preliminary estimation
      updateFormData({ montantT: totalEstimation });
      
      // Move to step 4 if goToStep is provided
      if (goToStep) {
        goToStep(4);
      }
    }
    
    // Add assistant message to chat
    const newAssistantMessage: Message = {
      id: uuidv4(),
      type: 'assistant',
      content: responseContent,
      options: responseOptions
    };
    
    setMessages(prev => [...prev, newAssistantMessage]);
  };
  
  // Get base price per m² based on project type
  const getEstimationBasePrice = (projectType: string): number => {
    switch (projectType.toLowerCase()) {
      case 'construction':
        return 1800; // 1800€/m² for new construction
      case 'renovation':
        return 1200; // 1200€/m² for renovation
      case 'extension':
        return 1600; // 1600€/m² for extension
      case 'amenagement':
        return 800;  // 800€/m² for interior design
      default:
        return 1500; // Default value
    }
  };
  
  // Handle suggested option click
  const handleOptionClick = (option: string) => {
    setUserInput(option);
    
    // Auto-submit certain options
    if (['Construction neuve', 'Rénovation', 'Extension', 'Aménagement intérieur'].includes(option)) {
      setTimeout(() => {
        handleSendMessage();
      }, 300);
    }
  };
  
  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Function to handle message processing
  const handleProcessMessage = (processed: React.ReactNode) => {
    // Handle the processed message
    console.log("Message processed:", processed);
  };

  return (
    <Card className="border rounded-lg overflow-hidden h-[500px] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <MessageDisplay
            key={msg.id || index}
            message={msg}
            messages={messages}
            loading={loading}
            onOptionClick={handleOptionClick}
            messagesEndRef={messagesEndRef}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <InputArea 
        userInput={userInput}
        setUserInput={setUserInput}
        handleSendMessage={handleSendMessage}
        handleKeyPress={handleKeyPress}
      />
      
      {/* Component to process user inputs - no visual rendering */}
      <MessageProcessor 
        content={userInput}
        onProcessed={handleProcessMessage}
        onUserInput={onUserInput}
        formData={formData}
        updateFormData={updateFormData}
      />
    </Card>
  );
};

export default ConversationalEstimator;
