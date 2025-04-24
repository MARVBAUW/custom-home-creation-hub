
import React from 'react';
import { BaseFormProps } from '../types';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { ensureNumber } from '../utils/typeConversions';

const MenuiseriesExtStep: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [windowType, setWindowType] = React.useState<string>(formData.windowType || '');
  const [windowArea, setWindowArea] = React.useState<string>(
    formData.windowNewArea ? String(formData.windowNewArea) : ''
  );
  
  const handleSubmit = () => {
    updateFormData({
      windowType,
      windowNewArea: ensureNumber(windowArea)
    });
    
    goToNextStep();
  };
  
  const showAreaInput = windowType !== 'non_concerne' && windowType !== '';
  
  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-6">Menuiseries extérieures</h2>
      
      <div className="space-y-4">
        <Label className="text-base font-medium">
          Type de fenêtres <span className="text-red-500">*</span>
        </Label>
        
        <RadioGroup 
          value={windowType} 
          onValueChange={setWindowType}
          className="grid grid-cols-1 gap-4 mt-2"
        >
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${windowType === 'bois' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setWindowType('bois')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="bois" id="bois" className="mr-2" />
              <Label htmlFor="bois" className="cursor-pointer">Bois</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${windowType === 'pvc' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setWindowType('pvc')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="pvc" id="pvc" className="mr-2" />
              <Label htmlFor="pvc" className="cursor-pointer">PVC</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${windowType === 'alu' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setWindowType('alu')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="alu" id="alu" className="mr-2" />
              <Label htmlFor="alu" className="cursor-pointer">Aluminium</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${windowType === 'non_concerne' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setWindowType('non_concerne')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="non_concerne" id="non_concerne" className="mr-2" />
              <Label htmlFor="non_concerne" className="cursor-pointer">Non concerné</Label>
            </CardContent>
          </Card>
        </RadioGroup>
        
        {showAreaInput && (
          <div className="mt-4">
            <Label htmlFor="window-area" className="block mb-2">Surface en m²</Label>
            <Input
              id="window-area"
              type="number"
              value={windowArea}
              onChange={(e) => setWindowArea(e.target.value)}
              placeholder="Surface en m²"
              className="max-w-xs"
            />
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
          disabled={!windowType}
          className="flex items-center gap-2"
        >
          Suivant
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MenuiseriesExtStep;
