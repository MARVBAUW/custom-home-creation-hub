
import React from 'react';
import { InputAreaProps } from './types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

const InputArea: React.FC<InputAreaProps> = ({
  userInput,
  setUserInput,
  handleSendMessage,
  handleKeyPress
}) => {
  return (
    <div className="p-4 border-t bg-white">
      <div className="flex space-x-2">
        <Input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Décrivez votre projet de construction ou rénovation..."
          className="flex-grow border-gray-300"
        />
        <Button 
          onClick={handleSendMessage}
          className="bg-khaki-600 hover:bg-khaki-700"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Exemple: "Je souhaite construire une maison de 120m² sur 2 niveaux à Marseille"
      </p>
    </div>
  );
};

export default InputArea;
