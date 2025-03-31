
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Bot, User } from 'lucide-react';
import { Message, FormData } from './types';
import { useConversationalEstimator } from './hooks/useConversationalEstimator';

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
  const [userInput, setUserInput] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: "Bonjour ! Je suis l'assistant d'estimation Progineer. Comment puis-je vous aider avec votre projet de construction ou rénovation ?",
      options: [
        "J'ai un projet de construction neuve",
        "Je souhaite rénover ma maison",
        "J'ai besoin d'une extension",
        "Quelle est la surface constructible de mon terrain ?",
        "Quel budget prévoir pour mon projet ?"
      ]
    }
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  const { 
    conversation,
    processUserInput,
    addMessage,
    simulateTyping,
    getSuggestions
  } = useConversationalEstimator(formData, updateFormData);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle sending message
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: userInput
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input and show loading
    setUserInput('');
    setLoading(true);
    
    // Process user input and get response
    onUserInput(userInput);
    
    // Add loading message
    const loadingMsgId = Date.now().toString();
    setMessages(prev => [...prev, {
      id: loadingMsgId,
      type: 'loading',
      content: 'Réflexion en cours...'
    }]);
    
    try {
      // Process user input and get response (simulate delay)
      await simulateTyping();
      
      // Remove loading message
      setMessages(prev => prev.filter(msg => msg.id !== loadingMsgId));
      
      // Process user input and get response
      await processUserInput(userInput);
      
      // Get suggestions for next steps
      const suggestions = getSuggestions();
      
      // Add assistant response
      const assistantMsg: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: `Voici ce que j'ai compris de votre projet: ${extractProjectDetails()}`,
        options: suggestions
      };
      
      setMessages(prev => [...prev, assistantMsg]);
      
      // Check for client type selection to possibly submit it
      if (userInput.toLowerCase().includes('particulier') || userInput.toLowerCase().includes('professionnel')) {
        const clientType = userInput.toLowerCase().includes('particulier') ? 'individual' : 'professional';
        onClientTypeSubmit({ clientType });
      }
      
    } catch (error) {
      console.error('Error processing message:', error);
      
      // Add error message
      setMessages(prev => [...prev.filter(msg => msg.id !== loadingMsgId), {
        id: Date.now().toString(),
        type: 'assistant',
        content: "Je suis désolé, j'ai rencontré un problème lors du traitement de votre demande. Pourriez-vous reformuler ?"
      }]);
    }
    
    setLoading(false);
  };

  // Extract project details from form data for summary
  const extractProjectDetails = () => {
    const details: string[] = [];
    
    if (formData.projectType) details.push(`Type: ${formData.projectType}`);
    if (formData.surface) details.push(`Surface: ${formData.surface} m²`);
    if (formData.city) details.push(`Ville: ${formData.city}`);
    if (formData.constructionType) details.push(`Construction: ${formData.constructionType}`);
    
    return details.length > 0 ? details.join(', ') : "Je n'ai pas encore assez d'informations sur votre projet.";
  };

  // Handle option click
  const handleOptionClick = (option: string) => {
    setUserInput(option);
    handleSendMessage();
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[500px] flex flex-col">
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
                    ? 'bg-blue-500 text-white rounded-tr-none' 
                    : message.type === 'loading'
                    ? 'bg-gray-200 text-gray-700 animate-pulse'
                    : 'bg-gray-200 text-gray-700 rounded-tl-none'
                }`}
              >
                {message.type !== 'user' && message.type !== 'loading' && (
                  <div className="flex items-center mb-1">
                    <Bot size={16} className="mr-1" />
                    <span className="text-xs font-semibold">Assistant Progineer</span>
                  </div>
                )}
                
                {message.type === 'user' && (
                  <div className="flex items-center justify-end mb-1">
                    <span className="text-xs font-semibold">Vous</span>
                    <User size={16} className="ml-1" />
                  </div>
                )}
                
                <div className="whitespace-pre-wrap">
                  {message.content}
                </div>
                
                {message.options && message.options.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.options.map((option, index) => (
                      <Button 
                        key={index} 
                        variant="outline" 
                        size="sm" 
                        className="bg-white hover:bg-gray-100 text-gray-800"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex items-end gap-2">
          <Textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Décrivez votre projet de construction ou rénovation..."
            className="resize-none min-h-12"
            disabled={loading}
          />
          <Button 
            type="button" 
            size="icon" 
            className="h-12 w-12 rounded-full flex-shrink-0"
            onClick={handleSendMessage}
            disabled={loading || !userInput.trim()}
          >
            <Send size={20} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationalEstimator;
