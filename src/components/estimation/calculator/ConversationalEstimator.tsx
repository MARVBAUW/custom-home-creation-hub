
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Send } from 'lucide-react';
import { EstimationFormData as FormData } from './types';
import { Message } from './types/conversationalTypes';

interface ConversationalEstimatorProps {
  onUserInput: (input: string) => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onClientTypeSubmit: (data: {clientType: string}) => void;
  goToStep: (step: number) => void;
}

const ConversationalEstimator: React.FC<ConversationalEstimatorProps> = ({
  onUserInput,
  formData,
  updateFormData,
  onClientTypeSubmit,
  goToStep
}) => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'Bonjour ! Je suis votre assistant virtuel pour vous aider à estimer votre projet. Quel type de projet souhaitez-vous réaliser ?',
      options: ['Construction neuve', 'Rénovation', 'Extension']
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOptionClick = (option: string) => {
    addMessage({
      id: Date.now().toString(),
      type: 'user',
      content: option
    });

    // Process selection
    if (option === 'Construction neuve' || option === 'Rénovation' || option === 'Extension') {
      // Map to projectType
      if (option === 'Construction neuve') {
        updateFormData({ projectType: 'construction' });
        onClientTypeSubmit({ clientType: 'individual' });
      } else if (option === 'Rénovation') {
        updateFormData({ projectType: 'renovation' });
        onClientTypeSubmit({ clientType: 'individual' });
      } else if (option === 'Extension') {
        updateFormData({ projectType: 'extension' });
        onClientTypeSubmit({ clientType: 'individual' });
      }

      // Simulate assistant typing
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage({
          id: Date.now().toString(),
          type: 'assistant',
          content: `Parfait ! Pouvez-vous me donner plus de détails sur la surface approximative de votre ${option.toLowerCase()} ?`,
        });
      }, 1000);
    }
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    // Add user message
    addMessage({
      id: Date.now().toString(),
      type: 'user',
      content: userInput
    });

    // Process user input
    onUserInput(userInput);

    // Clear input
    setUserInput('');

    // Simulate assistant typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage({
        id: Date.now().toString(),
        type: 'assistant',
        content: `Merci pour ces informations. J'ai bien noté votre demande concernant "${userInput}". Quelles autres caractéristiques souhaitez-vous pour votre projet ?`,
        options: ['Surface', 'Budget', 'Localisation', 'Délai']
      });
    }, 1500);
  };

  const addMessage = (message: Message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full h-[600px] relative">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white rounded-tr-none' 
                    : message.type === 'system' 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'bg-gray-200 text-gray-800 rounded-tl-none'
                }`}
              >
                {message.content}
                
                {message.options && message.options.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {message.options.map((option) => (
                      <Button
                        key={option}
                        variant="secondary"
                        size="sm"
                        onClick={() => handleOptionClick(option)}
                        className="text-xs"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg bg-gray-200 text-gray-800">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex items-center gap-2">
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Écrivez votre message..."
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
