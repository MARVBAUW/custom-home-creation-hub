
import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MessageDisplay from './components/conversational/MessageDisplay';
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
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Create a type-adapting updater function
  const adaptedUpdateFormData = createTypeAdaptingUpdater(updateFormData);
  
  // Use the conversation processor hook
  const {
    formData: conversationFormData,
    messages,
    isLoading,
    sendMessage,
    handleOptionClick,
    updateFormData: updateConversationData,
    resetConversation,
    messagesEndRef: conversationEndRef
  } = useConversationalEstimator();
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle sending a message
  const handleSendMessage = async () => {
    if (!userInput.trim() || loading) return;
    
    // Process user input (for form data extraction)
    if (onUserInput) {
      onUserInput(userInput);
    }
    
    // Send message to conversation processor
    sendMessage(userInput);
    
    // Clear input
    setUserInput('');
  };
  
  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="border shadow-sm">
      <div className="flex flex-col h-[500px]">
        <div className="flex-grow overflow-y-auto p-4">
          <MessageDisplay 
            messages={messages}
            loading={isLoading}
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
              disabled={isLoading}
              className="flex-grow"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={isLoading || !userInput.trim()}
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
