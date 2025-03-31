
import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { calculateInteriorCarpenteryCost } from '../utils/montantUtils';
import { ensureNumber } from '../utils/typeConversions';
import { DoorClosed, Columns, BookMarked } from 'lucide-react';

const MenuiseriesIntForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [doorType, setDoorType] = useState<string>(
    formData.doorType || 'base'
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
    
    // Calculate the cost based on interior carpentry options and surface
    const additionalCost = calculateInteriorCarpenteryCost(
      doorType,
      hasMoldings,
      hasCustomFurniture,
      surface
    );

    // Update form data with carpentry options and additional cost
    updateFormData({
      doorType,
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
        <h3 className="text-lg font-medium mb-4">Menuiseries Intérieures</h3>
        
        <div className="mb-8">
          <Label className="mb-2 block">Type de portes intérieures</Label>
          <RadioGroup 
            value={doorType} 
            onValueChange={setDoorType}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${doorType === 'base' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setDoorType('base')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <DoorClosed className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="base" id="door-base" className="sr-only" />
                <Label htmlFor="door-base" className="font-medium">Basique</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Portes intérieures standard
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${doorType === 'standing' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setDoorType('standing')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <DoorClosed className="h-8 w-8 text-blue-700 mb-2" />
                <RadioGroupItem value="standing" id="door-standing" className="sr-only" />
                <Label htmlFor="door-standing" className="font-medium">Standing</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Portes intérieures de qualité intermédiaire
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${doorType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setDoorType('premium')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <DoorClosed className="h-8 w-8 text-blue-900 mb-2" />
                <RadioGroupItem value="premium" id="door-premium" className="sr-only" />
                <Label htmlFor="door-premium" className="font-medium">Haut de gamme</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Portes intérieures premium
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${doorType === 'non_concerne' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setDoorType('non_concerne')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <RadioGroupItem value="non_concerne" id="door-non_concerne" className="sr-only" />
                <Label htmlFor="door-non_concerne" className="font-medium">Non concerné</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Pas de portes intérieures à installer
                </p>
              </CardContent>
            </Card>
          </RadioGroup>
        </div>
        
        {doorType !== 'non_concerne' && (
          <div className="mb-8">
            <Label className="mb-4 block">Options supplémentaires</Label>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="moldings" 
                  checked={hasMoldings}
                  onCheckedChange={(checked) => setHasMoldings(checked === true)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="moldings" className="text-sm font-medium flex items-center">
                    <Columns className="h-4 w-4 mr-2 text-blue-500" />
                    Moulures
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Ajout de moulures décoratives
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="custom-furniture" 
                  checked={hasCustomFurniture}
                  onCheckedChange={(checked) => setHasCustomFurniture(checked === true)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="custom-furniture" className="text-sm font-medium flex items-center">
                    <BookMarked className="h-4 w-4 mr-2 text-blue-500" />
                    Ameublements spécifiques
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Installation de meubles sur mesure ou encastrés
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
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
