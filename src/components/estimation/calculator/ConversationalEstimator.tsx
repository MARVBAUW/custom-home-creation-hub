
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, Loader2 } from 'lucide-react';
import { FormData } from './types/formTypes';
import { Message } from './types/conversationalTypes';
import MessageDisplay from './components/conversational/MessageDisplay';
import InputArea from './components/conversational/InputArea';
import MessageProcessor from './components/conversational/MessageProcessor';
import { v4 as uuidv4 } from 'uuid';

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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: "Bonjour ! Je suis votre assistant d'estimation. Comment puis-je vous aider avec votre projet de construction ou rénovation ?",
      options: ['Construction neuve', 'Rénovation', 'Extension']
    }
  ]);
  
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [processedContent, setProcessedContent] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Handle user message submission
  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      type: 'user',
      content: userInput.trim(),
      time: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    onUserInput(userInput);
    
    // Clear input and show loading
    setUserInput('');
    setLoading(true);
    
    // Process the response
    setTimeout(() => {
      processMessage(userInput);
    }, 800);
  };
  
  // Process message and generate response
  const processMessage = (input: string) => {
    // Analyze input for project information
    let projectType = '';
    let surface = 0;
    
    if (input.toLowerCase().includes('maison') || 
        input.toLowerCase().includes('construction')) {
      projectType = 'construction';
    } else if (input.toLowerCase().includes('renov') || 
               input.toLowerCase().includes('rénov')) {
      projectType = 'renovation';
    } else if (input.toLowerCase().includes('extension') || 
               input.toLowerCase().includes('agrandir')) {
      projectType = 'extension';
    }
    
    // Extract surface information
    const surfaceMatch = input.match(/(\d+)\s*m²/);
    if (surfaceMatch && surfaceMatch[1]) {
      surface = parseInt(surfaceMatch[1], 10);
    }
    
    // Update form data if we found anything
    if (projectType || surface) {
      const updates: Partial<FormData> = {};
      if (projectType) updates.projectType = projectType;
      if (surface) updates.surface = surface;
      updateFormData(updates);
    }
    
    // Generate assistant response
    let responseContent = '';
    let responseOptions: string[] = [];
    
    if (projectType === 'construction') {
      responseContent = "Super ! Vous souhaitez construire une maison neuve. Quelle superficie approximative envisagez-vous ?";
      responseOptions = ['Moins de 100m²', 'Entre 100m² et 150m²', 'Plus de 150m²'];
    } else if (projectType === 'renovation') {
      responseContent = "Très bien ! Pour votre projet de rénovation, pouvez-vous m'indiquer la superficie concernée ?";
      responseOptions = ['Moins de 80m²', 'Entre 80m² et 120m²', 'Plus de 120m²'];
    } else if (projectType === 'extension') {
      responseContent = "Une extension ! Quelle superficie souhaitez-vous ajouter à votre habitation ?";
      responseOptions = ['Moins de 40m²', 'Entre 40m² et 60m²', 'Plus de 60m²'];
    } else if (surface > 0) {
      responseContent = `D'accord pour une surface de ${surface}m². Quel type de prestation recherchez-vous ?`;
      responseOptions = ['Maîtrise d\'œuvre complète', 'Permis de construire uniquement', 'Étude préliminaire'];
    } else {
      responseContent = "Pourriez-vous me préciser le type de projet (construction neuve, rénovation, extension) et la superficie approximative ?";
      responseOptions = ['Construction neuve', 'Rénovation', 'Extension'];
    }
    
    // Add assistant response message
    const assistantMessage: Message = {
      id: uuidv4(),
      type: 'assistant',
      content: responseContent,
      options: responseOptions,
      time: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    setLoading(false);
  };
  
  // Handle option click
  const handleOptionClick = (option: string) => {
    // Treat the option as a user message
    setUserInput(option);
    
    // Simulate a user clicking send
    const userMessage: Message = {
      id: uuidv4(),
      type: 'user',
      content: option,
      time: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    onUserInput(option);
    
    // Process the response
    setLoading(true);
    setTimeout(() => {
      processMessage(option);
    }, 800);
  };
  
  // Handle key press for enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Process message content
  const handleProcessed = (content: string) => {
    setProcessedContent(content);
  };
  
  return (
    <div className="flex flex-col h-full">
      <Card className="flex-grow overflow-y-auto mb-4 max-h-[500px]">
        <div className="p-4 space-y-4">
          <MessageDisplay 
            messages={messages}
            loading={loading}
            onOptionClick={handleOptionClick}
            messagesEndRef={messagesEndRef}
            message="" // Empty string to satisfy type requirement
          />
          
          {/* Invisible component to process messages */}
          <MessageProcessor
            onUserInput={onUserInput}
            formData={formData}
            updateFormData={updateFormData}
            content={userInput}
            onProcessed={handleProcessed}
          />
        </div>
      </Card>
      
      <InputArea
        userInput={userInput}
        setUserInput={setUserInput}
        handleSendMessage={handleSendMessage}
        handleKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default ConversationalEstimator;
