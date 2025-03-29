import React from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Zap, ZapOff, Battery, Smartphone } from 'lucide-react';

const ElectriciteForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  defaultValues,
  onSubmit
}) => {
  const [electricalType, setElectricalType] = React.useState<string>(
    defaultValues?.electricalType || formData.electricalType || 'standard'
  );

  const handleContinue = () => {
    const data = { electricalType };
    
    if (onSubmit) {
      onSubmit(data);
    } else {
      updateFormData(data);
    }
    
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Installation électrique</h3>
          
          <RadioGroup 
            value={electricalType} 
            onValueChange={setElectricalType}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${electricalType === 'basic' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setElectricalType('basic')}
            >
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <Zap className="h-10 w-10 text-amber-500 mb-3" />
                <RadioGroupItem value="basic" id="electrical-basic" className="mx-auto mb-2" />
                <Label htmlFor="electrical-basic" className="font-medium">Basique</Label>
                <p className="text-xs text-gray-500 mt-2">
                  Installation électrique simple et fonctionnelle
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${electricalType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setElectricalType('standard')}
            >
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <ZapOff className="h-10 w-10 text-blue-500 mb-3" />
                <RadioGroupItem value="standard" id="electrical-standard" className="mx-auto mb-2" />
                <Label htmlFor="electrical-standard" className="font-medium">Standard</Label>
                <p className="text-xs text-gray-500 mt-2">
                  Installation électrique de qualité standard avec plus de prises
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${electricalType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setElectricalType('premium')}
            >
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <Battery className="h-10 w-10 text-green-500 mb-3" />
                <RadioGroupItem value="premium" id="electrical-premium" className="mx-auto mb-2" />
                <Label htmlFor="electrical-premium" className="font-medium">Premium</Label>
                <p className="text-xs text-gray-500 mt-2">
                  Installation électrique de haute qualité avec options avancées
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${electricalType === 'smart_home' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setElectricalType('smart_home')}
            >
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <Smartphone className="h-10 w-10 text-purple-500 mb-3" />
                <RadioGroupItem value="smart_home" id="electrical-smart" className="mx-auto mb-2" />
                <Label htmlFor="electrical-smart" className="font-medium">Domotique</Label>
                <p className="text-xs text-gray-500 mt-2">
                  Installation électrique connectée avec système domotique
                </p>
              </CardContent>
            </Card>
          </RadioGroup>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={goToPreviousStep}
          >
            Précédent
          </Button>
          
          <Button
            type="button"
            onClick={handleContinue}
          >
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ElectriciteForm;
