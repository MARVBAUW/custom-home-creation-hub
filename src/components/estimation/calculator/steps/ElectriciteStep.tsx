import React from 'react';
import { BaseFormProps } from '../types/baseFormProps';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon, Zap } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

const ElectriciteStep: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [electricalType, setElectricalType] = React.useState<string>(formData.electricalType || '');
  const [smartHome, setSmartHome] = React.useState<boolean>(formData.smartHome || false);
  
  const handleSubmit = () => {
    updateFormData({
      electricalType,
      smartHome
    });
    
    goToNextStep();
  };
  
  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-6">Électricité</h2>
      
      <div className="space-y-4">
        <Label className="text-base font-medium">
          Type d'installation électrique <span className="text-red-500">*</span>
        </Label>
        
        <RadioGroup 
          value={electricalType} 
          onValueChange={setElectricalType}
          className="grid grid-cols-1 gap-4 mt-2"
        >
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${electricalType === 'basic' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setElectricalType('basic')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="basic" id="basic" className="mr-2" />
              <Label htmlFor="basic" className="cursor-pointer flex items-center">
                <Zap className="h-5 w-5 text-blue-500 mr-2" />
                <span>Installation standard</span>
              </Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${electricalType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setElectricalType('premium')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="premium" id="premium" className="mr-2" />
              <Label htmlFor="premium" className="cursor-pointer flex items-center">
                <Zap className="h-5 w-5 text-amber-500 mr-2" />
                <span>Installation premium</span>
              </Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${electricalType === 'non_concerne' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setElectricalType('non_concerne')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="non_concerne" id="non_concerne" className="mr-2" />
              <Label htmlFor="non_concerne" className="cursor-pointer">Non concerné</Label>
            </CardContent>
          </Card>
        </RadioGroup>
        
        <div className="mt-6 flex items-center space-x-2">
          <Switch
            id="smart-home"
            checked={smartHome}
            onCheckedChange={setSmartHome}
          />
          <Label htmlFor="smart-home" className="cursor-pointer">
            Installer une solution domotique
          </Label>
        </div>
      </div>
      
      <div className="flex justify-between pt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={goToPreviousStep}
          className="flex items-center gap-2"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Retour
        </Button>
        
        <Button 
          onClick={handleSubmit}
          disabled={!electricalType}
          className="flex items-center gap-2"
        >
          Suivant
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ElectriciteStep;
