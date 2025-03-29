
import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Zap, Battery, Smartphone } from 'lucide-react';

const ElectriciteForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  defaultValues,
  onSubmit
}) => {
  // Initialize state with the default value or the current formData value
  const [electricalType, setElectricalType] = useState<string>(
    defaultValues?.electricalType || formData.electricalType || 'standard'
  );

  const handleSubmit = () => {
    // Create the data object to pass to the submit handler
    const data = { electricalType };
    
    // Use the provided onSubmit handler or fall back to default behavior
    if (onSubmit) {
      onSubmit(data);
    } else {
      updateFormData({ electricalType });
      goToNextStep();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Type d'installation électrique</h2>
      <p className="text-muted-foreground">Sélectionnez le type d'installation électrique que vous souhaitez pour votre projet.</p>
      
      <RadioGroup value={electricalType} onValueChange={setElectricalType} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className={`cursor-pointer transition-all hover:shadow-md ${electricalType === 'basic' ? 'border-blue-500 bg-blue-50' : ''}`}>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Zap className="h-12 w-12 text-blue-500 mb-4" />
            <div className="space-x-2">
              <RadioGroupItem value="basic" id="electrical-basic" />
              <Label htmlFor="electrical-basic">Basique</Label>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Installation standard avec le minimum requis</p>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer transition-all hover:shadow-md ${electricalType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Zap className="h-12 w-12 text-blue-500 mb-4" />
            <div className="space-x-2">
              <RadioGroupItem value="standard" id="electrical-standard" />
              <Label htmlFor="electrical-standard">Standard</Label>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Installation confortable avec plus de prises</p>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer transition-all hover:shadow-md ${electricalType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Battery className="h-12 w-12 text-blue-500 mb-4" />
            <div className="space-x-2">
              <RadioGroupItem value="premium" id="electrical-premium" />
              <Label htmlFor="electrical-premium">Premium</Label>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Installation haut de gamme avec éclairage optimisé</p>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer transition-all hover:shadow-md ${electricalType === 'smart_home' ? 'border-blue-500 bg-blue-50' : ''}`}>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Smartphone className="h-12 w-12 text-blue-500 mb-4" />
            <div className="space-x-2">
              <RadioGroupItem value="smart_home" id="electrical-smart" />
              <Label htmlFor="electrical-smart">Domotique</Label>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Système connecté avec contrôle intelligent</p>
          </CardContent>
        </Card>
      </RadioGroup>
      
      <div className="flex justify-between mt-8">
        <Button type="button" variant="outline" onClick={goToPreviousStep}>
          Précédent
        </Button>
        <Button type="button" onClick={handleSubmit}>
          Suivant
        </Button>
      </div>
    </div>
  );
};

export default ElectriciteForm;
