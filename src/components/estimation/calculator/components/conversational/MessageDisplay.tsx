
import React, { useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Message } from './types';

interface MessageDisplayProps {
  messages: Message[];
  loading: boolean;
  onOptionClick: (option: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ 
  messages, 
  loading, 
  onOptionClick, 
  messagesEndRef 
}) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
      {messages.map(message => (
        <div key={message.id} className={`mb-4 ${message.type === 'user' ? 'flex justify-end' : ''}`}>
          <div className={`
            max-w-[80%] p-3 rounded-lg 
            ${message.type === 'user' 
              ? 'bg-progineer-gold/80 text-white ml-auto' 
              : 'bg-white dark:bg-gray-800 shadow-sm'
            }
          `}>
            <p className="text-sm">{message.content}</p>
            
            {message.options && message.options.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {message.options.map(option => (
                  <Button
                    key={option}
                    variant="outline"
                    size="sm"
                    className="text-xs bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                    onClick={() => onOptionClick(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
      
      {loading && (
        <div className="mb-4">
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm inline-block">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageDisplay;
