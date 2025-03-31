
import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DoorClosed, Columns, CheckSquare, Ruler } from 'lucide-react';
import { calculateInteriorCarpenteryCost } from '../utils/montantUtils';
import { ensureNumber } from '../utils/typeConversions';

const MenuiseriesIntForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  // State for door type selection
  const [doorType, setDoorType] = useState<string>(formData.doorType || 'standard');
  
  // State for additional options
  const [hasMoldings, setHasMoldings] = useState<boolean>(formData.hasMoldings || false);
  const [hasCustomFurniture, setHasCustomFurniture] = useState<boolean>(formData.hasCustomFurniture || false);
  
  // Handle submission and continue to next step
  const handleContinue = () => {
    const data = {
      doorType,
      hasMoldings,
      hasCustomFurniture
    };
    
    // Calculate the carpentry cost and add it to the total
    const surface = ensureNumber(formData.surface, 0);
    const carpenteryCost = calculateInteriorCarpenteryCost(doorType, hasMoldings, hasCustomFurniture, surface);
    
    // Update the montantT (total amount) with the carpentry cost
    const currentTotal = ensureNumber(formData.montantT, 0);
    const newTotal = currentTotal + carpenteryCost;
    
    // Include the calculated cost in the update
    const updatedData = {
      ...data,
      montantT: newTotal
    };
    
    updateFormData(updatedData);
    goToNextStep();
  };
  
  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Menuiseries intérieures</h3>
          <p className="text-sm text-gray-500 mb-4">
            Sélectionnez le type de portes intérieures et options pour votre projet
          </p>
          
          <RadioGroup 
            value={doorType} 
            onValueChange={setDoorType}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${doorType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setDoorType('standard')}
            >
              <CardContent className="pt-4 pb-4 flex items-center">
                <RadioGroupItem value="standard" id="door-standard" className="mr-2" />
                <Label htmlFor="door-standard" className="cursor-pointer flex-1">
                  <div className="flex items-center">
                    <DoorClosed className="h-5 w-5 mr-2 text-gray-600" />
                    <span className="font-medium">Portes standard</span>
                  </div>
                  <p className="text-xs text-gray-500 ml-7">
                    Portes intérieures de qualité standard
                  </p>
                </Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${doorType === 'standing' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setDoorType('standing')}
            >
              <CardContent className="pt-4 pb-4 flex items-center">
                <RadioGroupItem value="standing" id="door-standing" className="mr-2" />
                <Label htmlFor="door-standing" className="cursor-pointer flex-1">
                  <div className="flex items-center">
                    <DoorClosed className="h-5 w-5 mr-2 text-gray-600" />
                    <span className="font-medium">Portes standing</span>
                  </div>
                  <p className="text-xs text-gray-500 ml-7">
                    Portes intérieures de meilleure qualité
                  </p>
                </Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${doorType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setDoorType('premium')}
            >
              <CardContent className="pt-4 pb-4 flex items-center">
                <RadioGroupItem value="premium" id="door-premium" className="mr-2" />
                <Label htmlFor="door-premium" className="cursor-pointer flex-1">
                  <div className="flex items-center">
                    <DoorClosed className="h-5 w-5 mr-2 text-gray-600" />
                    <span className="font-medium">Portes premium</span>
                  </div>
                  <p className="text-xs text-gray-500 ml-7">
                    Portes intérieures haut de gamme
                  </p>
                </Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${doorType === 'none' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setDoorType('none')}
            >
              <CardContent className="pt-4 pb-4 flex items-center">
                <RadioGroupItem value="none" id="door-none" className="mr-2" />
                <Label htmlFor="door-none" className="cursor-pointer flex-1">
                  <div className="flex items-center">
                    <Columns className="h-5 w-5 mr-2 text-gray-600" />
                    <span className="font-medium">Non concerné</span>
                  </div>
                  <p className="text-xs text-gray-500 ml-7">
                    Pas de portes intérieures dans ce projet
                  </p>
                </Label>
              </CardContent>
            </Card>
          </RadioGroup>
        </div>
        
        {doorType !== 'none' && (
          <div className="space-y-4 border rounded-md p-4 bg-gray-50">
            <h4 className="text-md font-medium">Options supplémentaires</h4>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="moldings" 
                checked={hasMoldings}
                onCheckedChange={(checked) => setHasMoldings(checked as boolean)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="moldings"
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  <div className="flex items-center">
                    <Ruler className="h-4 w-4 mr-1 text-gray-600" />
                    Moulures
                  </div>
                </Label>
                <p className="text-xs text-gray-500">
                  Ajouter des moulures décoratives, plinthes, cimaises
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="custom-furniture" 
                checked={hasCustomFurniture}
                onCheckedChange={(checked) => setHasCustomFurniture(checked as boolean)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="custom-furniture"
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  <div className="flex items-center">
                    <CheckSquare className="h-4 w-4 mr-1 text-gray-600" />
                    Meubles sur mesure
                  </div>
                </Label>
                <p className="text-xs text-gray-500">
                  Placards intégrés, dressings, étagères sur mesure
                </p>
              </div>
            </div>
          </div>
        )}
        
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
            onClick={handleContinue}
          >
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuiseriesIntForm;
