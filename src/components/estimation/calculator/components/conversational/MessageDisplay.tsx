
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { MessageDisplayProps } from './types';

const MessageDisplay: React.FC<MessageDisplayProps> = ({
  messages,
  loading,
  onOptionClick,
  messagesEndRef,
  message
}) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.type === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-[80%] rounded-lg p-3 ${
              message.type === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            <div className="flex items-start">
              {message.type !== 'user' && (
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarFallback>AI</AvatarFallback>
                  <AvatarImage src="/images/bot-avatar.png" alt="AI Assistant" />
                </Avatar>
              )}
              <div>
                <p>{message.content}</p>
                {message.options && message.options.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="bg-white hover:bg-gray-100 text-gray-800"
                        onClick={() => onOptionClick(option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {loading && (
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-lg p-3 bg-gray-100">
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback>AI</AvatarFallback>
                <AvatarImage src="/images/bot-avatar.png" alt="AI Assistant" />
              </Avatar>
              <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageDisplay;
