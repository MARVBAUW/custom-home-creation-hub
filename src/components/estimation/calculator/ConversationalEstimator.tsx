
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { ConversationalProps, Message } from './types/conversationalTypes';
import { EstimationFormData } from './types/estimationFormData';
import { analyzeUserIntent, extractInformation, generateResponse } from './utils/conversationalUtils';

const ConversationalEstimator: React.FC<ConversationalProps> = ({
  onUserInput,
  formData,
  updateFormData,
  onClientTypeSubmit,
  goToStep
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      type: 'assistant',
      content: "Bonjour ! Je suis l'assistant d'estimation Progineer. Comment puis-je vous aider avec votre projet de construction ou rénovation ?",
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Add suggested questions after initial greeting
  useEffect(() => {
    if (messages.length === 1) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: uuidv4(),
            type: 'assistant',
            content: "Vous pouvez me poser des questions sur votre projet ou répondre aux suggestions ci-dessous :",
            options: [
              "Je veux construire une maison",
              "Je veux rénover mon appartement",
              "Je cherche à faire une extension",
              "Quel est le prix moyen au m² pour construire ?"
            ]
          }
        ]);
      }, 1000);
    }
  }, []);

  const handleUserMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      type: 'user',
      content,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setUserInput("");
    
    // Start loading
    setLoading(true);
    
    // Process message to extract data and get response
    setTimeout(() => {
      processUserMessage(content);
    }, 1000);
  };

  const processUserMessage = (content: string) => {
    // Call the onUserInput callback
    onUserInput(content);
    
    // Extract data from user message
    const extractedData = extractInformation(content);
    
    // Update form data if we extracted something
    if (Object.keys(extractedData).length > 0) {
      updateFormData(extractedData as Partial<EstimationFormData>);
    }
    
    // Check for clientType in the message
    if (content.toLowerCase().includes('particulier')) {
      updateFormData({ clientType: 'individual' });
      onClientTypeSubmit({ clientType: 'individual' });
    } else if (content.toLowerCase().includes('professionnel') || content.toLowerCase().includes('entreprise')) {
      updateFormData({ clientType: 'professional' });
      onClientTypeSubmit({ clientType: 'professional' });
    }
    
    // Generate assistant response
    const response = generateResponse({...formData, ...extractedData} as EstimationFormData);
    
    // Add assistant message
    const assistantMessage: Message = {
      id: uuidv4(),
      type: 'assistant',
      content: response,
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    setLoading(false);
  };

  const handleOptionClick = (option: string) => {
    handleUserMessage(option);
  };

  const handleSendMessage = () => {
    if (userInput.trim() === "") return;
    handleUserMessage(userInput);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="rounded-lg border">
      <CardContent className="p-0">
        <div className="flex flex-col h-[400px]">
          {/* Messages display area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p>{message.content}</p>
                  
                  {/* Clickable options if available */}
                  {message.options && (
                    <div className="mt-2 space-y-2">
                      {message.options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs bg-white text-gray-700 hover:bg-gray-100 border-gray-300 w-full text-left justify-start"
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
            
            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800 flex items-center">
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  <span>L'assistant réfléchit...</span>
                </div>
              </div>
            )}
            
            {/* Invisible element for auto-scrolling */}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <div className="border-t p-3 flex items-end">
            <textarea
              className="flex-1 bg-transparent focus:outline-none resize-none px-2 py-1 min-h-[60px] max-h-[150px] overflow-auto"
              placeholder="Posez une question ou décrivez votre projet..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={userInput.trim() === ""}
              className="ml-2 rounded-full h-10 w-10 flex items-center justify-center"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationalEstimator;
