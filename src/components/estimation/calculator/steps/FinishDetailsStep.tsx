
import React from 'react';
import { FormData } from '../types';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Star, Stars, Sparkles } from 'lucide-react';

interface FinishDetailsStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

const FinishDetailsStep: React.FC<FinishDetailsStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep 
}) => {
  const [finishLevel, setFinishLevel] = React.useState<string>(
    formData.finishLevel || 'standard'
  );

  const handleContinue = () => {
    updateFormData({ 
      finishLevel
    });
    goToNextStep();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Niveau de finition</h3>
        
        <RadioGroup 
          value={finishLevel} 
          onValueChange={setFinishLevel}
          className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${finishLevel === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setFinishLevel('standard')}
          >
            <CardContent className="pt-6 pb-6 text-center">
              <Star className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <RadioGroupItem value="standard" id="finish-standard" className="mx-auto mb-2" />
              <Label htmlFor="finish-standard" className="font-medium">Standard</Label>
              <p className="text-xs text-gray-500 mt-2">
                Matériaux et finitions de qualité standard et fonctionnels.
              </p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${finishLevel === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setFinishLevel('premium')}
          >
            <CardContent className="pt-6 pb-6 text-center">
              <Stars className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <RadioGroupItem value="premium" id="finish-premium" className="mx-auto mb-2" />
              <Label htmlFor="finish-premium" className="font-medium">Premium</Label>
              <p className="text-xs text-gray-500 mt-2">
                Matériaux de qualité supérieure et finitions plus détaillées.
              </p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${finishLevel === 'luxe' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setFinishLevel('luxe')}
          >
            <CardContent className="pt-6 pb-6 text-center">
              <Sparkles className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <RadioGroupItem value="luxe" id="finish-luxe" className="mx-auto mb-2" />
              <Label htmlFor="finish-luxe" className="font-medium">Luxe</Label>
              <p className="text-xs text-gray-500 mt-2">
                Matériaux haut de gamme et finitions personnalisées de luxe.
              </p>
            </CardContent>
          </Card>
        </RadioGroup>
      </div>
      
      <div className="pt-4">
        <Button 
          onClick={handleContinue}
          className="w-full"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default FinishDetailsStep;
