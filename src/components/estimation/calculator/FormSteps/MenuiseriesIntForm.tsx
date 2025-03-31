
import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { calculateInteriorCarpenteryCost, ensureNumber } from '../utils/montantUtils';
import { DoorClosed, PanelTop, PanelBottomClose } from 'lucide-react';

const MenuiseriesIntForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [doorType, setDoorType] = useState<string>(
    formData.interiorDoorsType || 'base'
  );
  
  const [hasMoldings, setHasMoldings] = useState<boolean>(
    formData.hasMoldings || false
  );
  
  const [hasCustomFurniture, setHasCustomFurniture] = useState<boolean>(
    formData.hasCustomFurniture || false
  );

  const handleSubmit = () => {
    // Get the surface area
    const surface = ensureNumber(formData.surface, 0);
    
    // Calculate the cost based on chosen options and surface
    const additionalCost = calculateInteriorCarpenteryCost(
      doorType,
      hasMoldings,
      hasCustomFurniture,
      surface
    );

    // Update form data with interior carpentry options and additional cost
    updateFormData({
      interiorDoorsType: doorType,
      hasMoldings,
      hasCustomFurniture,
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
        <h3 className="text-lg font-medium mb-4">Menuiseries intérieures</h3>
        
        <div className="mb-6">
          <Label className="mb-2 block">Portes intérieures</Label>
          <RadioGroup 
            value={doorType} 
            onValueChange={setDoorType}
            className="grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${doorType === 'base' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setDoorType('base')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <DoorClosed className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="base" id="door-base" className="sr-only" />
                <Label htmlFor="door-base" className="font-medium">Base</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Portes standard
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${doorType === 'standing' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setDoorType('standing')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <DoorClosed className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="standing" id="door-standing" className="sr-only" />
                <Label htmlFor="door-standing" className="font-medium">Standing</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Portes de qualité supérieure
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${doorType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setDoorType('premium')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <DoorClosed className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="premium" id="door-premium" className="sr-only" />
                <Label htmlFor="door-premium" className="font-medium">Haut de gamme</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Portes haut de gamme
                </p>
              </CardContent>
            </Card>
          </RadioGroup>
        </div>
        
        <div className="mb-6">
          <Label className="mb-2 block">Aménagements</Label>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="moldings" 
                checked={hasMoldings}
                onCheckedChange={(checked) => setHasMoldings(checked as boolean)}
              />
              <div className="grid gap-1">
                <Label htmlFor="moldings" className="flex items-center gap-2">
                  <PanelTop className="h-4 w-4 text-blue-500" />
                  Moulures
                </Label>
                <p className="text-sm text-gray-500">
                  Ajouter des moulures décoratives
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="custom-furniture" 
                checked={hasCustomFurniture}
                onCheckedChange={(checked) => setHasCustomFurniture(checked as boolean)}
              />
              <div className="grid gap-1">
                <Label htmlFor="custom-furniture" className="flex items-center gap-2">
                  <PanelBottomClose className="h-4 w-4 text-blue-500" />
                  Ameublements spécifiques
                </Label>
                <p className="text-sm text-gray-500">
                  Intégrer des meubles sur mesure
                </p>
              </div>
            </div>
          </div>
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

export default MenuiseriesIntForm;
