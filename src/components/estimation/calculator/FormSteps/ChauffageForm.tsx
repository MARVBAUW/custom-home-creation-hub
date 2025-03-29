import React from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Flame, Wind, Sun, Thermometer, Snowflake } from 'lucide-react';

const ChauffageForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  defaultValues,
  onSubmit
}) => {
  const [heatingType, setHeatingType] = React.useState<string>(
    defaultValues?.heatingType || formData.heatingType || 'pompe'
  );
  
  const [hasAirConditioning, setHasAirConditioning] = React.useState<boolean>(
    defaultValues?.hasAirConditioning !== undefined 
      ? defaultValues.hasAirConditioning 
      : formData.hasAirConditioning || false
  );

  const handleSubmit = () => {
    const data: Partial<FormData> = {
      heatingType,
      hasAirConditioning
    };
    
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
          <h3 className="text-lg font-medium mb-4">Système de chauffage</h3>
          
          <RadioGroup 
            value={heatingType} 
            onValueChange={setHeatingType}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'pompe' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setHeatingType('pompe')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Wind className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="pompe" id="heating-pompe" className="mx-auto mb-1" />
                <Label htmlFor="heating-pompe" className="font-medium">Pompe à chaleur</Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'gaz' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setHeatingType('gaz')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Flame className="h-8 w-8 text-orange-500 mb-2" />
                <RadioGroupItem value="gaz" id="heating-gaz" className="mx-auto mb-1" />
                <Label htmlFor="heating-gaz" className="font-medium">Chaudière gaz</Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'electrique' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setHeatingType('electrique')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Thermometer className="h-8 w-8 text-red-500 mb-2" />
                <RadioGroupItem value="electrique" id="heating-electrique" className="mx-auto mb-1" />
                <Label htmlFor="heating-electrique" className="font-medium">Chauffage électrique</Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'solaire' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setHeatingType('solaire')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Sun className="h-8 w-8 text-yellow-500 mb-2" />
                <RadioGroupItem value="solaire" id="heating-solaire" className="mx-auto mb-1" />
                <Label htmlFor="heating-solaire" className="font-medium">Chauffage solaire</Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'bois' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setHeatingType('bois')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Flame className="h-8 w-8 text-amber-700 mb-2" />
                <RadioGroupItem value="bois" id="heating-bois" className="mx-auto mb-1" />
                <Label htmlFor="heating-bois" className="font-medium">Poêle à bois/granulés</Label>
              </CardContent>
            </Card>
          </RadioGroup>
        </div>
        
        <div className="mt-6">
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="air-conditioning" 
              checked={hasAirConditioning}
              onCheckedChange={(checked) => setHasAirConditioning(checked as boolean)}
            />
            <div>
              <Label htmlFor="air-conditioning" className="text-base font-medium flex items-center">
                <Snowflake className="h-4 w-4 text-blue-400 mr-2" />
                Climatisation
              </Label>
              <p className="text-sm text-gray-500 mt-1">
                Inclure un système de climatisation
              </p>
            </div>
          </div>
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
            onClick={handleSubmit}
          >
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChauffageForm;
