
import React from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Square, Layers, BookOpen } from 'lucide-react';

const MenuiseriesIntForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  defaultValues,
  onSubmit
}) => {
  const [doorType, setDoorType] = React.useState<string>(
    defaultValues?.doorType || formData.doorType || 'standard'
  );

  const handleContinue = () => {
    const data = { doorType };
    
    if (onSubmit) {
      onSubmit(data);
    } else {
      updateFormData(data);
      goToNextStep();
    }
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Type de menuiseries intérieures</h3>
          
          <RadioGroup 
            value={doorType} 
            onValueChange={setDoorType}
            className="grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${doorType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setDoorType('standard')}
            >
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <Square className="h-10 w-10 text-blue-500 mb-3" />
                <RadioGroupItem value="standard" id="door-standard" className="mx-auto mb-2" />
                <Label htmlFor="door-standard" className="font-medium">Standard</Label>
                <p className="text-xs text-gray-500 mt-2">
                  Portes intérieures standard en bois aggloméré
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${doorType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setDoorType('premium')}
            >
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <Layers className="h-10 w-10 text-blue-500 mb-3" />
                <RadioGroupItem value="premium" id="door-premium" className="mx-auto mb-2" />
                <Label htmlFor="door-premium" className="font-medium">Premium</Label>
                <p className="text-xs text-gray-500 mt-2">
                  Portes intérieures en bois massif de qualité supérieure
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${doorType === 'custom' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setDoorType('custom')}
            >
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <BookOpen className="h-10 w-10 text-blue-500 mb-3" />
                <RadioGroupItem value="custom" id="door-custom" className="mx-auto mb-2" />
                <Label htmlFor="door-custom" className="font-medium">Sur mesure</Label>
                <p className="text-xs text-gray-500 mt-2">
                  Portes intérieures personnalisées et sur mesure
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

export default MenuiseriesIntForm;
