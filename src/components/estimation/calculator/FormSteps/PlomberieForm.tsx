import React from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Droplet, Cloud, CloudDrizzle, Tool } from 'lucide-react';

const PlomberieForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  defaultValues,
  onSubmit
}) => {
  const [plumbingType, setPlumbingType] = React.useState<string>(
    defaultValues?.plumbingType || formData.plumbingType || 'standard'
  );

  const handleContinue = () => {
    const data = { plumbingType };
    
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
          <h3 className="text-lg font-medium mb-4">Type d'installation de plomberie</h3>
          
          <RadioGroup 
            value={plumbingType} 
            onValueChange={setPlumbingType}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${plumbingType === 'basic' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setPlumbingType('basic')}
            >
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <Droplet className="h-10 w-10 text-blue-500 mb-3" />
                <RadioGroupItem value="basic" id="plumbing-basic" className="mx-auto mb-2" />
                <Label htmlFor="plumbing-basic" className="font-medium">Basique</Label>
                <p className="text-xs text-gray-500 mt-2">
                  Installation simple avec équipements standards
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${plumbingType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setPlumbingType('standard')}
            >
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <Cloud className="h-10 w-10 text-blue-500 mb-3" />
                <RadioGroupItem value="standard" id="plumbing-standard" className="mx-auto mb-2" />
                <Label htmlFor="plumbing-standard" className="font-medium">Standard</Label>
                <p className="text-xs text-gray-500 mt-2">
                  Installation de qualité avec équipements modernes
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${plumbingType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setPlumbingType('premium')}
            >
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <CloudDrizzle className="h-10 w-10 text-blue-500 mb-3" />
                <RadioGroupItem value="premium" id="plumbing-premium" className="mx-auto mb-2" />
                <Label htmlFor="plumbing-premium" className="font-medium">Premium</Label>
                <p className="text-xs text-gray-500 mt-2">
                  Installation haut de gamme avec équipements de qualité supérieure
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${plumbingType === 'renovation' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setPlumbingType('renovation')}
            >
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <Tool className="h-10 w-10 text-blue-500 mb-3" />
                <RadioGroupItem value="renovation" id="plumbing-renovation" className="mx-auto mb-2" />
                <Label htmlFor="plumbing-renovation" className="font-medium">Rénovation</Label>
                <p className="text-xs text-gray-500 mt-2">
                  Mise à niveau d'une installation existante
                </p>
              </CardContent>
            </Card>
          </RadioGroup>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={goToPreviousStep}>
            Précédent
          </Button>
          <Button onClick={handleContinue}>
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlomberieForm;
