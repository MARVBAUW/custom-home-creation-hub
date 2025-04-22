import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { calculateInteriorCarpenteryCost } from '../utils/montantUtils';
import { ensureNumber } from '../utils/typeConversions';
import { Door, Separator, CheckCircle } from 'lucide-react';

const MenuiseriesIntForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [carpentryType, setCarpentryType] = useState<string>(
    formData.interiorCarpentryType || 'standard'
  );
  
  const [doorCount, setDoorCount] = useState<number>(
    Number(formData.interiorDoorCount || 5)
  );

  const handleSubmit = () => {
    // Calculate the cost based on selected options
    const carpentryTotalCost = calculateInteriorCarpenteryCost(carpentryType, doorCount);
    
    // Update form data with selections and calculated cost
    updateFormData({
      interiorCarpentryType: carpentryType,
      interiorDoorCount: doorCount,
      interiorCarpentryTotalCost: carpentryTotalCost,
      montantT: ensureNumber(formData.montantT) + carpentryTotalCost
    });
    
    // Move to the next step
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-2xl font-semibold text-primary">
          <Door className="h-6 w-6" />
          <h2>Menuiseries Intérieures</h2>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label className="text-base">Type de menuiseries intérieures</Label>
                <RadioGroup
                  defaultValue={carpentryType}
                  onValueChange={setCarpentryType}
                  className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                >
                  <Card
                    className={`border-2 p-4 rounded-lg transition-colors cursor-pointer ${
                      carpentryType === 'standard'
                        ? 'border-primary ring-2 ring-primary'
                        : 'border-muted'
                    }`}
                  >
                    <RadioGroupItem value="standard" id="carpentry-standard" className="sr-only" />
                    <Label
                      htmlFor="carpentry-standard"
                      className="font-semibold text-lg leading-none peer-data-[state=checked]:text-primary"
                    >
                      Standard
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Menuiseries fonctionnelles et économiques
                    </p>
                  </Card>
                  
                  <Card
                    className={`border-2 p-4 rounded-lg transition-colors cursor-pointer ${
                      carpentryType === 'premium'
                        ? 'border-primary ring-2 ring-primary'
                        : 'border-muted'
                    }`}
                  >
                    <RadioGroupItem value="premium" id="carpentry-premium" className="sr-only" />
                    <Label
                      htmlFor="carpentry-premium"
                      className="font-semibold text-lg leading-none peer-data-[state=checked]:text-primary"
                    >
                      Premium
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Menuiseries de qualité supérieure avec finitions soignées
                    </p>
                  </Card>
                  
                  <Card
                    className={`border-2 p-4 rounded-lg transition-colors cursor-pointer ${
                      carpentryType === 'luxury'
                        ? 'border-primary ring-2 ring-primary'
                        : 'border-muted'
                    }`}
                  >
                    <RadioGroupItem value="luxury" id="carpentry-luxury" className="sr-only" />
                    <Label
                      htmlFor="carpentry-luxury"
                      className="font-semibold text-lg leading-none peer-data-[state=checked]:text-primary"
                    >
                      Luxe
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Menuiseries haut de gamme avec matériaux nobles et design personnalisé
                    </p>
                  </Card>
                </RadioGroup>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <Label className="text-base">Nombre de portes intérieures</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {doorCount} portes
                  </span>
                </div>
                <Slider
                  defaultValue={[5]}
                  max={15}
                  min={1}
                  step={1}
                  onValueChange={(value) => setDoorCount(value[0])}
                />
              </div>
              
              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={goToPreviousStep}>
                  Précédent
                </Button>
                <Button onClick={handleSubmit}>
                  Continuer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MenuiseriesIntForm;
