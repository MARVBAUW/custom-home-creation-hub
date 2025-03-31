
import React from 'react';
import { MessageDisplayProps } from '../../types/conversationalTypes';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MessageDisplay: React.FC<MessageDisplayProps> = ({
  messages,
  loading,
  onOptionClick,
  messagesEndRef
}) => {
  return (
    <div className="flex-grow overflow-auto p-4 bg-gray-50">
      <AnimatePresence>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`mb-4 ${message.type === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
          >
            {message.type === 'system' || message.type === 'assistant' ? (
              <div className="flex max-w-[80%]">
                <div className="bg-khaki-600 text-white h-8 w-8 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                  <Bot size={18} />
                </div>
                <div className="flex flex-col">
                  <Card className="p-3 bg-white shadow-sm border-gray-200">
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </Card>
                  
                  {message.options && message.options.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => onOptionClick(option)}
                          className="text-xs bg-white hover:bg-gray-100"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : message.type === 'user' ? (
              <div className="flex max-w-[80%]">
                <Card className="p-3 bg-khaki-100 shadow-sm border-gray-200 mr-2">
                  <p className="text-sm">{message.content}</p>
                </Card>
                <div className="bg-gray-500 text-white h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={18} />
                </div>
              </div>
            ) : null}
          </motion.div>
        ))}
        
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start mb-4"
          >
            <div className="flex max-w-[80%]">
              <div className="bg-khaki-600 text-white h-8 w-8 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                <Bot size={18} />
              </div>
              <Card className="p-3 bg-white shadow-sm border-gray-200">
                <div className="flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <p className="text-sm text-gray-500">En train d'écrire...</p>
                </div>
              </Card>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </AnimatePresence>
    </div>
  );
};

export default MessageDisplay;
