
import React from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Zap, Bolt, Lightbulb, BatteryMedium } from 'lucide-react';
import { calculateElectricalCost, ensureNumber } from '../utils/montantUtils';

const ElectriciteForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [electricalType, setElectricalType] = React.useState<string>(
    formData.electricalType || 'base'
  );

  const handleSubmit = () => {
    // Get the surface area
    const surface = ensureNumber(formData.surface, 0);
    
    // Calculate the cost based on electrical type and surface
    const additionalCost = calculateElectricalCost(electricalType, surface);

    // Update form data with electrical type and additional cost
    updateFormData({
      electricalType,
      montantT: (formData.montantT || 0) + additionalCost
    });
    
    // Move to the next step
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-4">Électricité</h3>
        
        <div>
          <Label className="mb-2 block">Niveau de prestation électrique</Label>
          <RadioGroup 
            value={electricalType} 
            onValueChange={setElectricalType}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${electricalType === 'base' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setElectricalType('base')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Zap className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="base" id="electrical-base" className="sr-only" />
                <Label htmlFor="electrical-base" className="font-medium">Prestations de base</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Installation électrique standard
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${electricalType === 'advanced' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setElectricalType('advanced')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Bolt className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="advanced" id="electrical-advanced" className="sr-only" />
                <Label htmlFor="electrical-advanced" className="font-medium">Prestations avancées</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Installation électrique améliorée
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${electricalType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setElectricalType('premium')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Lightbulb className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="premium" id="electrical-premium" className="sr-only" />
                <Label htmlFor="electrical-premium" className="font-medium">Prestations haut de gamme</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Installation électrique de qualité supérieure
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${electricalType === 'domotique' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setElectricalType('domotique')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <BatteryMedium className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="domotique" id="electrical-domotique" className="sr-only" />
                <Label htmlFor="electrical-domotique" className="font-medium">Prestations HG + domotique</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Installation électrique intelligente
                </p>
              </CardContent>
            </Card>
          </RadioGroup>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={goToPreviousStep}>
            Précédent
          </Button>
          <Button onClick={handleSubmit}>
            Continuer
          </Button>
        </div>
        
        {formData.montantT && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="text-sm font-medium">Total estimé: {formData.montantT.toLocaleString()} €</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ElectriciteForm;
