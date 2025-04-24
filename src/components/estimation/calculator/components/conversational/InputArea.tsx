
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from 'lucide-react';
import { InputAreaProps } from './types';

const InputArea: React.FC<InputAreaProps> = ({
  userInput,
  setUserInput,
  handleSendMessage,
  handleKeyPress
}) => {
  return (
    <div className="bg-gray-100 p-4">
      <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="relative">
        <Input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Entrez votre message..."
          className="pr-12"
          onKeyDown={handleKeyPress}
        />
        <Button
          type="submit"
          className="absolute right-1.5 top-1.5 rounded-full"
          aria-label="Envoyer"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default InputArea;
