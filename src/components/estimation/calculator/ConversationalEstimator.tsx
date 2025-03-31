
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { Message } from './types/conversationalTypes';
import { EstimationFormData as FormData } from './types';

interface ConversationalProps {
  onUserInput: (input: string) => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onClientTypeSubmit: (data: {clientType: string}) => void;
  goToStep: (step: number) => void;
}

const ConversationalEstimator: React.FC<ConversationalProps> = ({
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
      content: 'Bonjour ! Je suis votre assistant d\'estimation Progineer. Comment puis-je vous aider avec votre projet de construction ou rénovation ?',
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: userInput
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);
    
    // Process the user input
    onUserInput(userInput);
    
    // Clear input
    setUserInput('');
    
    // Simulate assistant response
    setTimeout(() => {
      handleAssistantResponse(userInput);
      setIsLoading(false);
    }, 1000);
  };

  const handleAssistantResponse = (input: string) => {
    // This is a simplified response logic
    let responseContent = '';
    
    // Detect client type selection
    if (input.toLowerCase().includes('particulier')) {
      responseContent = 'Je note que vous êtes un particulier. Quel type de projet souhaitez-vous réaliser ?';
      onClientTypeSubmit({ clientType: 'individual' });
    } 
    else if (input.toLowerCase().includes('professionnel')) {
      responseContent = 'Je note que vous êtes un professionnel. Quel type de projet souhaitez-vous réaliser ?';
      onClientTypeSubmit({ clientType: 'professional' });
    }
    // Detect project type
    else if (input.toLowerCase().includes('construction')) {
      responseContent = 'Parfait, pour votre construction neuve, pouvez-vous m\'indiquer la surface approximative souhaitée ?';
      updateFormData({ projectType: 'construction' });
    }
    else if (input.toLowerCase().includes('renovation') || input.toLowerCase().includes('rénovation')) {
      responseContent = 'Pour votre projet de rénovation, quelle est la surface concernée ?';
      updateFormData({ projectType: 'renovation' });
    }
    else if (input.toLowerCase().includes('extension')) {
      responseContent = 'Pour votre extension, quelle surface additionnelle envisagez-vous ?';
      updateFormData({ projectType: 'extension' });
    }
    // Default response
    else {
      responseContent = 'Pourriez-vous me donner plus de détails sur votre projet ? Par exemple, s\'agit-il d\'une construction neuve, rénovation ou extension ?';
    }
    
    // Add assistant response
    const newAssistantMessage: Message = {
      id: Date.now().toString(),
      type: 'assistant',
      content: responseContent
    };
    
    setMessages(prev => [...prev, newAssistantMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleOptionClick = (option: string) => {
    setUserInput(option);
    handleSendMessage();
  };

  return (
    <Card className="h-[550px] border shadow-md flex flex-col">
      <CardContent className="flex flex-col h-full p-4">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-muted flex items-center space-x-2">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex items-center space-x-2">
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Posez une question sur votre projet..."
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationalEstimator;
