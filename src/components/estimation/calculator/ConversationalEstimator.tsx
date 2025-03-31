
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, ArrowRight } from 'lucide-react';
import { useConversationalEstimator } from './hooks/useConversationalEstimator';
import { FormData, Message } from './types';

interface ConversationalEstimatorProps {
  onUserInput: (input: string) => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onClientTypeSubmit?: (data: { clientType: string }) => void;
  goToStep?: (step: number) => void;
}

const ConversationalEstimator: React.FC<ConversationalEstimatorProps> = ({
  onUserInput,
  formData,
  updateFormData,
  onClientTypeSubmit,
  goToStep
}) => {
  const { 
    conversation,
    processUserInput,
    addMessage,
    simulateTyping,
    getSuggestions
  } = useConversationalEstimator(formData, updateFormData);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize the conversation with a welcome message
  useEffect(() => {
    if (conversation.messages.length > 0) {
      setMessages(conversation.messages as Message[]);
    } else {
      // Add initial bot message
      addMessage(
        "Bonjour ! Je suis votre assistant d'estimation. Pour commencer, quel type de projet avez-vous ? (construction, rénovation, extension...)",
        false
      );
    }
  }, [conversation]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Update internal messages when conversation updates
  useEffect(() => {
    setMessages(conversation.messages as Message[]);
  }, [conversation]);

  // Handle user message submission
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    
    const message = userInput;
    setUserInput('');
    setLoading(true);
    
    // Add user message to the conversation
    addMessage(message, true);
    
    // Process the message and get response
    try {
      await processUserInput(message);
      onUserInput(message);
    } catch (error) {
      console.error('Error processing user input:', error);
      addMessage("Désolé, j'ai rencontré une erreur. Veuillez réessayer.", false);
    } finally {
      setLoading(false);
    }
  };

  // Handle click on suggestion
  const handleOptionClick = async (option: string) => {
    setUserInput('');
    setLoading(true);
    
    // Add user selection to the conversation
    addMessage(option, true);
    
    // Process the selection and get response
    try {
      await processUserInput(option);
      onUserInput(option);
      
      // If the option is a client type and we have a handler
      if ((option === 'Particulier' || option === 'Professionnel') && onClientTypeSubmit) {
        onClientTypeSubmit({ clientType: option === 'Particulier' ? 'individual' : 'professional' });
      }
    } catch (error) {
      console.error('Error processing option:', error);
      addMessage("Désolé, j'ai rencontré une erreur. Veuillez réessayer.", false);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press in input
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Generate suggestion buttons based on the current conversation state
  const conversationState = conversation;
  const suggestions = getSuggestions();

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col h-[400px] sm:h-[500px]">
          {/* Messages container */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  msg.isUser 
                    ? 'bg-progineer-gold text-white rounded-tr-none' 
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 text-gray-800 rounded-tl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef}></div>
          </div>
          
          {/* Suggestion buttons */}
          {suggestions.length > 0 && !loading && (
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestions.map((option, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleOptionClick(option)}
                  className="flex items-center whitespace-nowrap"
                >
                  {option}
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              ))}
            </div>
          )}
          
          {/* Input box */}
          <div className="flex gap-2">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Posez votre question ou décrivez votre projet..."
              className="flex-grow"
              disabled={loading}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={loading || !userInput.trim()}
              className="bg-progineer-gold hover:bg-progineer-gold/90 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationalEstimator;
