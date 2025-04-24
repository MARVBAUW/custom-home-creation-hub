
import React from 'react';
import { BaseFormProps } from '../types';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon, Window } from 'lucide-react';
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
  const [windowArea, setWindowArea] = React.useState<string>(formData.windowArea ? String(formData.windowArea) : '');
  const [doorType, setDoorType] = React.useState<string>(formData.doorType || '');
  const [doorCount, setDoorCount] = React.useState<string>(formData.doorCount ? String(formData.doorCount) : '');
  
  const handleSubmit = () => {
    // Calculate window costs
    let windowCost = 0;
    if (windowType && windowType !== 'non_concerne' && windowArea) {
      const area = ensureNumber(windowArea);
      
      switch (windowType) {
        case 'bois':
          windowCost = area * 850;
          break;
        case 'pvc':
          windowCost = area * 550;
          break;
        case 'alu':
          windowCost = area * 750;
          break;
        case 'mixte':
          windowCost = area * 900;
          break;
        case 'pvc_colore':
          windowCost = area * 650;
          break;
      }
    }
    
    // Calculate door costs
    let doorCost = 0;
    if (doorType && doorType !== 'non_concerne' && doorCount) {
      const count = ensureNumber(doorCount);
      
      switch (doorType) {
        case 'standard':
          doorCost = count * 800;
          break;
        case 'security':
          doorCost = count * 1200;
          break;
        case 'premium':
          doorCost = count * 1800;
          break;
      }
    }
    
    // Update form data with costs
    const currentMontantT = ensureNumber(formData.montantT, 0);
    
    updateFormData({
      windowType,
      windowArea: ensureNumber(windowArea),
      doorType,
      doorCount: ensureNumber(doorCount),
      windowCost,
      doorCost,
      montantT: currentMontantT + windowCost + doorCost
    });
    
    goToNextStep();
  };
  
  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-6">Menuiseries Extérieures</h2>
      
      <div className="space-y-6">
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
                <Label htmlFor="bois" className="cursor-pointer">Fenêtres en bois</Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${windowType === 'pvc' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setWindowType('pvc')}
            >
              <CardContent className="flex items-center p-4">
                <RadioGroupItem value="pvc" id="pvc" className="mr-2" />
                <Label htmlFor="pvc" className="cursor-pointer">Fenêtres en PVC</Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${windowType === 'alu' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setWindowType('alu')}
            >
              <CardContent className="flex items-center p-4">
                <RadioGroupItem value="alu" id="alu" className="mr-2" />
                <Label htmlFor="alu" className="cursor-pointer">Fenêtres en aluminium</Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${windowType === 'mixte' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setWindowType('mixte')}
            >
              <CardContent className="flex items-center p-4">
                <RadioGroupItem value="mixte" id="mixte" className="mr-2" />
                <Label htmlFor="mixte" className="cursor-pointer">Fenêtres mixtes (bois/alu)</Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${windowType === 'pvc_colore' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setWindowType('pvc_colore')}
            >
              <CardContent className="flex items-center p-4">
                <RadioGroupItem value="pvc_colore" id="pvc_colore" className="mr-2" />
                <Label htmlFor="pvc_colore" className="cursor-pointer">PVC coloré</Label>
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
          
          {windowType && windowType !== 'non_concerne' && (
            <div className="mt-4">
              <Label htmlFor="window-area" className="block mb-2">Surface totale des fenêtres (m²)</Label>
              <Input
                id="window-area"
                type="number"
                value={windowArea}
                onChange={(e) => setWindowArea(e.target.value)}
                placeholder="Surface en m²"
                className="max-w-xs"
                min="0"
              />
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <Label className="text-base font-medium">
            Type de porte d'entrée
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
                <RadioGroupItem value="standard" id="door-standard" className="mr-2" />
                <Label htmlFor="door-standard" className="cursor-pointer">Porte standard</Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${doorType === 'security' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setDoorType('security')}
            >
              <CardContent className="flex items-center p-4">
                <RadioGroupItem value="security" id="door-security" className="mr-2" />
                <Label htmlFor="door-security" className="cursor-pointer">Porte sécurisée</Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${doorType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setDoorType('premium')}
            >
              <CardContent className="flex items-center p-4">
                <RadioGroupItem value="premium" id="door-premium" className="mr-2" />
                <Label htmlFor="door-premium" className="cursor-pointer">Porte premium</Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${doorType === 'non_concerne' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setDoorType('non_concerne')}
            >
              <CardContent className="flex items-center p-4">
                <RadioGroupItem value="non_concerne" id="door-non_concerne" className="mr-2" />
                <Label htmlFor="door-non_concerne" className="cursor-pointer">Non concerné</Label>
              </CardContent>
            </Card>
          </RadioGroup>
          
          {doorType && doorType !== 'non_concerne' && (
            <div className="mt-4">
              <Label htmlFor="door-count" className="block mb-2">Nombre de portes</Label>
              <Input
                id="door-count"
                type="number"
                value={doorCount}
                onChange={(e) => setDoorCount(e.target.value)}
                placeholder="Nombre de portes"
                className="max-w-xs"
                min="1"
              />
            </div>
          )}
        </div>
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
          disabled={(!windowType || (windowType !== 'non_concerne' && !windowArea))}
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
