
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SimpleCaptchaProps {
  onVerify: (isValid: boolean) => void;
}

const SimpleCaptcha: React.FC<SimpleCaptchaProps> = ({ onVerify }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    generateNewProblem();
  }, []);

  const generateNewProblem = () => {
    setNum1(Math.floor(Math.random() * 10));
    setNum2(Math.floor(Math.random() * 10));
    setUserAnswer('');
    setError(false);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserAnswer(value);
    
    if (value !== '') {
      const isCorrect = parseInt(value) === (num1 + num2);
      setError(!isCorrect);
      onVerify(isCorrect);
    }
  };

  return (
    <div className="w-full space-y-2">
      <Label>Vérification de sécurité</Label>
      <div className="flex items-center gap-2">
        <span className="text-sm">Combien font {num1} + {num2} = </span>
        <Input
          type="number"
          value={userAnswer}
          onChange={handleAnswerChange}
          className={`w-20 ${error ? 'border-red-500' : ''}`}
          placeholder="?"
        />
      </div>
      {error && (
        <p className="text-sm text-red-500">Réponse incorrecte, essayez à nouveau</p>
      )}
    </div>
  );
};

export default SimpleCaptcha;
