
import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { calculatePlasteringCost } from '../utils/montantUtils';
import { ensureNumber } from '../utils/typeConversions';
import { Square, Layers, LayoutDashboard } from 'lucide-react';

const PlatrerieForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [plasteringType, setPlasteringType] = useState<string>(
    formData.plasteringType || 'base'
  );

  const handleSubmit = () => {
    // Get the surface area
    const surface = ensureNumber(formData.surface, 0);
    
    // Calculate the cost based on plastering type and surface
    const additionalCost = calculatePlasteringCost(surface, plasteringType);

    // Update form data with plastering type and additional cost
    updateFormData({
      plasteringType,
      montantT: ensureNumber(formData.montantT, 0) + additionalCost
    });
    
    // Move to the next step
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-4">Plâtrerie</h3>
        
        <div>
          <Label className="mb-2 block">Niveau de prestation en plâtrerie</Label>
          <RadioGroup 
            value={plasteringType} 
            onValueChange={setPlasteringType}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${plasteringType === 'base' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setPlasteringType('base')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Square className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="base" id="plastering-base" className="sr-only" />
                <Label htmlFor="plastering-base" className="font-medium">Prestation de base</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Plâtrerie standard, sans finitions spécifiques
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${plasteringType === 'specific' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setPlasteringType('specific')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Layers className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="specific" id="plastering-specific" className="sr-only" />
                <Label htmlFor="plastering-specific" className="font-medium">Prestation avec spécificités</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Plâtrerie avec quelques finitions particulières
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${plasteringType === 'advanced' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setPlasteringType('advanced')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <LayoutDashboard className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="advanced" id="plastering-advanced" className="sr-only" />
                <Label htmlFor="plastering-advanced" className="font-medium">Prestations avancées</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Arches, niches, rangements cachés, etc.
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${plasteringType === 'non_concerne' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setPlasteringType('non_concerne')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <RadioGroupItem value="non_concerne" id="plastering-non_concerne" className="sr-only" />
                <Label htmlFor="plastering-non_concerne" className="font-medium">Non concerné</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Pas de travaux de plâtrerie requis
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

export default PlatrerieForm;
