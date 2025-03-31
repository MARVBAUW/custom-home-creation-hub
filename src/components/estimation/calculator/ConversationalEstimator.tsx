
import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageDisplay } from './components/conversational/MessageDisplay';
import { ConversationalProps, Message } from './components/conversational/types';
import { v4 as uuidv4 } from 'uuid';
import { Send } from 'lucide-react';
import { useConversationalEstimator } from './hooks/useConversationalEstimator';
import { createTypeAdaptingUpdater } from './utils/dataAdapter';

const ConversationalEstimator: React.FC<ConversationalProps> = ({
  onUserInput,
  formData,
  updateFormData,
  onClientTypeSubmit,
  goToStep
}) => {
  const [userInput, setUserInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Create a type-adapting updater function
  const adaptedUpdateFormData = createTypeAdaptingUpdater(updateFormData);
  
  // Use the conversation processor hook
  const { processMessage, getInitialMessages, isProcessing } = useConversationalEstimator({
    formData,
    updateFormData: adaptedUpdateFormData,
    onClientTypeSubmit,
    goToStep
  });
  
  // Initialize with welcome message
  useEffect(() => {
    const initialMessages = getInitialMessages();
    setMessages(initialMessages);
  }, []);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle sending a message
  const handleSendMessage = async () => {
    if (!userInput.trim() || loading) return;
    
    // Add user message to chat
    const userMessage: Message = {
      id: uuidv4(),
      type: 'user',
      content: userInput
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Show loading indicator
    const loadingMessage: Message = {
      id: uuidv4(),
      type: 'loading',
      content: 'Réflexion en cours...'
    };
    
    setMessages(prev => [...prev, loadingMessage]);
    setLoading(true);
    
    // Process user input (for form data extraction)
    if (onUserInput) {
      onUserInput(userInput);
    }
    
    // Clear input
    setUserInput('');
    
    try {
      // Process message for chat response
      const response = await processMessage(userInput);
      
      // Remove loading message
      setMessages(prev => prev.filter(msg => msg.id !== loadingMessage.id));
      
      // Add response message(s)
      if (Array.isArray(response)) {
        setMessages(prev => [...prev, ...response]);
      } else {
        setMessages(prev => [...prev, response]);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      
      // Remove loading message
      setMessages(prev => prev.filter(msg => msg.id !== loadingMessage.id));
      
      // Add error message
      setMessages(prev => [
        ...prev,
        {
          id: uuidv4(),
          type: 'assistant',
          content: "Désolé, je n'ai pas pu traiter votre message. Veuillez réessayer."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Handle clicking on a suggested option
  const handleOptionClick = (option: string) => {
    setUserInput(option);
    handleSendMessage();
  };

  return (
    <Card className="border shadow-sm">
      <div className="flex flex-col h-[500px]">
        <div className="flex-grow overflow-y-auto p-4">
          <MessageDisplay 
            messages={messages}
            loading={isProcessing}
            onOptionClick={handleOptionClick}
            messagesEndRef={messagesEndRef}
          />
        </div>
        
        <div className="border-t p-4">
          <div className="flex items-center space-x-2">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Décrivez votre projet..."
              disabled={loading}
              className="flex-grow"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={loading || !userInput.trim()}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ConversationalEstimator;
