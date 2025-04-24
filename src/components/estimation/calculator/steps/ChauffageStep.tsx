import React from 'react';
import { BaseFormProps } from '../types/baseFormProps';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon, Thermometer, Snowflake } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

const ChauffageStep: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [heatingType, setHeatingType] = React.useState<string>(formData.heatingType || '');
  const [hasAirConditioning, setHasAirConditioning] = React.useState<boolean>(formData.hasAirConditioning || false);
  
  const handleSubmit = () => {
    updateFormData({
      heatingType,
      hasAirConditioning
    });
    
    goToNextStep();
  };
  
  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-6">Chauffage et climatisation</h2>
      
      <div className="space-y-4">
        <Label className="text-base font-medium">
          Type de chauffage <span className="text-red-500">*</span>
        </Label>
        
        <RadioGroup 
          value={heatingType} 
          onValueChange={setHeatingType}
          className="grid grid-cols-1 gap-4 mt-2"
        >
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'electrique' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setHeatingType('electrique')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="electrique" id="electrique" className="mr-2" />
              <Label htmlFor="electrique" className="cursor-pointer flex items-center">
                <Thermometer className="h-5 w-5 text-blue-500 mr-2" />
                <span>Chauffage électrique</span>
              </Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'gaz' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setHeatingType('gaz')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="gaz" id="gaz" className="mr-2" />
              <Label htmlFor="gaz" className="cursor-pointer flex items-center">
                <Thermometer className="h-5 w-5 text-amber-500 mr-2" />
                <span>Chauffage au gaz</span>
              </Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'pompe_chaleur' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setHeatingType('pompe_chaleur')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="pompe_chaleur" id="pompe_chaleur" className="mr-2" />
              <Label htmlFor="pompe_chaleur" className="cursor-pointer flex items-center">
                <Thermometer className="h-5 w-5 text-green-500 mr-2" />
                <span>Pompe à chaleur</span>
              </Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'non_concerne' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setHeatingType('non_concerne')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="non_concerne" id="non_concerne" className="mr-2" />
              <Label htmlFor="non_concerne" className="cursor-pointer">Non concerné</Label>
            </CardContent>
          </Card>
        </RadioGroup>
        
        <div className="mt-6 flex items-center space-x-2">
          <Switch
            id="air-conditioning"
            checked={hasAirConditioning}
            onCheckedChange={setHasAirConditioning}
          />
          <Label htmlFor="air-conditioning" className="cursor-pointer flex items-center">
            <Snowflake className="h-5 w-5 text-blue-500 mr-2" />
            Installer la climatisation
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
          disabled={!heatingType}
          className="flex items-center gap-2"
        >
          Suivant
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChauffageStep;
