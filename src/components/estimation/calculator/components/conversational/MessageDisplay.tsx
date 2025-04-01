
import React from 'react';
import { Message, MessageDisplayProps } from '../../types/conversationalTypes';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const MessageDisplay: React.FC<MessageDisplayProps> = ({
  message,
  messages,
  loading,
  onOptionClick,
  messagesEndRef
}) => {
  // Determine message styling based on sender
  const isAssistant = message.type === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div
        className={`px-4 py-3 rounded-lg max-w-[80%] ${
          isAssistant
            ? 'bg-gray-100 text-gray-800 rounded-tl-none'
            : 'bg-blue-600 text-white rounded-tr-none'
        }`}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>
        
        {/* Display options buttons if available */}
        {isAssistant && message.options && message.options.length > 0 && (
          <div className="mt-3 space-y-2">
            {message.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="w-full justify-start text-left border-gray-300 hover:bg-gray-200"
                onClick={() => onOptionClick(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MessageDisplay;
