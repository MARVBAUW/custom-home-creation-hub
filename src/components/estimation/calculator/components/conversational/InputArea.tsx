
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from 'lucide-react';

interface InputAreaProps {
  userInput: string;
  setUserInput: (input: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

const InputArea: React.FC<InputAreaProps> = ({ 
  userInput, 
  setUserInput, 
  handleSendMessage, 
  handleKeyPress 
}) => {
  return (
    <div className="p-3 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex space-x-2">
        <Textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Tapez votre message..."
          className="flex-1 resize-none h-10 min-h-[40px] py-2"
        />
        <Button 
          onClick={handleSendMessage} 
          size="icon"
          className="h-10 w-10 rounded-full bg-progineer-gold hover:bg-progineer-gold/90"
        >
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default InputArea;
