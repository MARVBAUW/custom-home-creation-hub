import React from 'react';
import { BaseFormProps } from '../types/baseFormProps';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { ensureNumber } from '../utils/typeConversions';

const CarrelageStep: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [floorTileType, setFloorTileType] = React.useState<string>(formData.floorTileType || '');
  const [floorTilePercentage, setFloorTilePercentage] = React.useState<string>(
    formData.floorTilePercentage ? String(formData.floorTilePercentage) : ''
  );
  const [wallTileType, setWallTileType] = React.useState<string>(formData.wallTileType || '');
  
  const handleSubmit = () => {
    updateFormData({
      floorTileType,
      floorTilePercentage: ensureNumber(floorTilePercentage),
      wallTileType
    });
    
    goToNextStep();
  };
  
  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-6">Carrelage</h2>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-base font-medium">
            Type de carrelage au sol <span className="text-red-500">*</span>
          </Label>
          
          <RadioGroup 
            value={floorTileType} 
            onValueChange={setFloorTileType}
            className="grid grid-cols-1 gap-4 mt-2"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${floorTileType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setFloorTileType('standard')}
            >
              <CardContent className="flex items-center p-4">
                <RadioGroupItem value="standard" id="floor-standard" className="mr-2" />
                <Label htmlFor="floor-standard" className="cursor-pointer">Carrelage standard</Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${floorTileType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setFloorTileType('premium')}
            >
              <CardContent className="flex items-center p-4">
                <RadioGroupItem value="premium" id="floor-premium" className="mr-2" />
                <Label htmlFor="floor-premium" className="cursor-pointer">Carrelage premium</Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${floorTileType === 'non_concerne' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setFloorTileType('non_concerne')}
            >
              <CardContent className="flex items-center p-4">
                <RadioGroupItem value="non_concerne" id="floor-non_concerne" className="mr-2" />
                <Label htmlFor="floor-non_concerne" className="cursor-pointer">Non concerné</Label>
              </CardContent>
            </Card>
          </RadioGroup>
          
          {floorTileType && floorTileType !== 'non_concerne' && (
            <div className="mt-4">
              <Label htmlFor="floor-tile-percentage" className="block mb-2">Pourcentage de la surface à carreler (%)</Label>
              <Input
                id="floor-tile-percentage"
                type="number"
                value={floorTilePercentage}
                onChange={(e) => setFloorTilePercentage(e.target.value)}
                placeholder="Pourcentage (ex: 50)"
                className="max-w-xs"
                min="1"
                max="100"
              />
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <Label className="text-base font-medium">
            Type de carrelage mural
          </Label>
          
          <RadioGroup 
            value={wallTileType} 
            onValueChange={setWallTileType}
            className="grid grid-cols-1 gap-4 mt-2"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${wallTileType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setWallTileType('standard')}
            >
              <CardContent className="flex items-center p-4">
                <RadioGroupItem value="standard" id="wall-standard" className="mr-2" />
                <Label htmlFor="wall-standard" className="cursor-pointer">Carrelage mural standard</Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${wallTileType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setWallTileType('premium')}
            >
              <CardContent className="flex items-center p-4">
                <RadioGroupItem value="premium" id="wall-premium" className="mr-2" />
                <Label htmlFor="wall-premium" className="cursor-pointer">Carrelage mural premium</Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${wallTileType === 'non_concerne' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setWallTileType('non_concerne')}
            >
              <CardContent className="flex items-center p-4">
                <RadioGroupItem value="non_concerne" id="wall-non_concerne" className="mr-2" />
                <Label htmlFor="wall-non_concerne" className="cursor-pointer">Non concerné</Label>
              </CardContent>
            </Card>
          </RadioGroup>
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
          disabled={!floorTileType || (floorTileType !== 'non_concerne' && !floorTilePercentage)}
          className="flex items-center gap-2"
        >
          Suivant
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CarrelageStep;
