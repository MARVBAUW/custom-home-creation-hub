import React from 'react';
import { BaseFormProps } from '../types/baseFormProps';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

const MenuiseriesIntStep: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [doorType, setDoorType] = React.useState<string>(formData.doorType || '');
  const [hasMoldings, setHasMoldings] = React.useState<boolean>(formData.hasMoldings || false);
  const [hasCustomFurniture, setHasCustomFurniture] = React.useState<boolean>(formData.hasCustomFurniture || false);
  
  const handleSubmit = () => {
    updateFormData({
      doorType,
      hasMoldings,
      hasCustomFurniture
    });
    
    goToNextStep();
  };
  
  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-6">Menuiseries intérieures</h2>
      
      <div className="space-y-4">
        <Label className="text-base font-medium">
          Type de portes intérieures <span className="text-red-500">*</span>
        </Label>
        
        <RadioGroup 
          value={doorType} 
          onValueChange={setDoorType}
          className="grid grid-cols-1 gap-4 mt-2"
        >
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${doorType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setDoorType('standard')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="standard" id="standard" className="mr-2" />
              <Label htmlFor="standard" className="cursor-pointer">Portes standard (isoplane)</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${doorType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setDoorType('premium')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="premium" id="premium" className="mr-2" />
              <Label htmlFor="premium" className="cursor-pointer">Portes premium (postformées)</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${doorType === 'sur_mesure' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setDoorType('sur_mesure')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="sur_mesure" id="sur_mesure" className="mr-2" />
              <Label htmlFor="sur_mesure" className="cursor-pointer">Portes sur mesure</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${doorType === 'non_concerne' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setDoorType('non_concerne')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="non_concerne" id="non_concerne" className="mr-2" />
              <Label htmlFor="non_concerne" className="cursor-pointer">Non concerné</Label>
            </CardContent>
          </Card>
        </RadioGroup>
        
        {doorType && doorType !== 'non_concerne' && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="moldings" 
                checked={hasMoldings} 
                onCheckedChange={(checked) => setHasMoldings(!!checked)} 
              />
              <Label htmlFor="moldings" className="cursor-pointer">
                Ajouter des moulures (plinthes, cimaises, etc.)
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="custom-furniture" 
                checked={hasCustomFurniture} 
                onCheckedChange={(checked) => setHasCustomFurniture(!!checked)} 
              />
              <Label htmlFor="custom-furniture" className="cursor-pointer">
                Inclure des meubles sur mesure (placards, dressings, etc.)
              </Label>
            </div>
          </div>
        )}
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
          disabled={!doorType}
          className="flex items-center gap-2"
        >
          Suivant
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MenuiseriesIntStep;
