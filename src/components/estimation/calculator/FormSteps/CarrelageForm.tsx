import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { calculateFloorTilingCost, calculateWallTilingCost } from '../utils/montantUtils';
import { ensureNumber } from '../utils/typeConversions';
import { Square, Grid2X2, CheckSquare, Ban } from 'lucide-react';

const CarrelageForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [floorTileType, setFloorTileType] = useState<string>(
    formData.floorTileType?.toString() || 'standard'
  );
  
  const [floorTilePercentage, setFloorTilePercentage] = useState<number>(
    Number(formData.floorTilePercentage || 50)
  );
  
  const [wallTileType, setWallTileType] = useState<string>(
    formData.wallTileType?.toString() || 'standard'
  );

  const handleSubmit = () => {
    // Get the surface area
    const surface = ensureNumber(formData.surface);
    
    // Calculate floor tiling cost based on selected options
    const floorTilingCost = floorTileType !== 'non_concerne' 
      ? calculateFloorTilingCost(floorTileType, floorTilePercentage, surface)
      : 0;
    
    // Calculate wall tiling cost
    const wallTilingCost = calculateWallTilingCost(wallTileType, surface);
    
    // Calculate total additional cost
    const additionalCost = floorTilingCost + wallTilingCost;

    // Update form data with tiling options and additional cost
    updateFormData({
      floorTileType,
      floorTilePercentage,
      wallTileType,
      montantT: ensureNumber(formData.montantT) + additionalCost
    });
    
    // Move to the next step
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-4">Carrelage et Faïence</h3>
        
        <div className="mb-8">
          <Label className="mb-2 block">Type de carrelage sol</Label>
          <RadioGroup 
            value={floorTileType} 
            onValueChange={setFloorTileType}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${floorTileType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setFloorTileType('standard')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Square className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="standard" id="floor-standard" className="sr-only" />
                <Label htmlFor="floor-standard" className="font-medium">Carrelage base</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Carrelage standard
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${floorTileType === 'medium' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setFloorTileType('medium')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Grid2X2 className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="medium" id="floor-medium" className="sr-only" />
                <Label htmlFor="floor-medium" className="font-medium">Carrelage medium</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Carrelage milieu de gamme
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${floorTileType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setFloorTileType('premium')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <CheckSquare className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="premium" id="floor-premium" className="sr-only" />
                <Label htmlFor="floor-premium" className="font-medium">Carrelage premium</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Carrelage haut de gamme
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${floorTileType === 'non_concerne' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setFloorTileType('non_concerne')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Ban className="h-8 w-8 text-gray-500 mb-2" />
                <RadioGroupItem value="non_concerne" id="floor-non_concerne" className="sr-only" />
                <Label htmlFor="floor-non_concerne" className="font-medium">Non concerné</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Pas de carrelage au sol
                </p>
              </CardContent>
            </Card>
          </RadioGroup>
        </div>
        
        {floorTileType !== 'non_concerne' && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <Label>Pourcentage de la surface à carreler</Label>
              <span className="text-sm font-medium">{floorTilePercentage}%</span>
            </div>
            <Slider
              value={[floorTilePercentage]}
              onValueChange={(values) => setFloorTilePercentage(values[0])}
              min={0}
              max={100}
              step={5}
            />
          </div>
        )}
        
        <div className="mb-8">
          <Label className="mb-2 block">Type de faïence murale</Label>
          <RadioGroup 
            value={wallTileType} 
            onValueChange={setWallTileType}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${wallTileType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setWallTileType('standard')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Square className="h-8 w-8 text-green-500 mb-2" />
                <RadioGroupItem value="standard" id="wall-standard" className="sr-only" />
                <Label htmlFor="wall-standard" className="font-medium">Faïence base</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Faïence standard
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${wallTileType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setWallTileType('premium')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Grid2X2 className="h-8 w-8 text-green-500 mb-2" />
                <RadioGroupItem value="premium" id="wall-premium" className="sr-only" />
                <Label htmlFor="wall-premium" className="font-medium">Faïence premium</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Faïence haut de gamme
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${wallTileType === 'luxury' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setWallTileType('luxury')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <CheckSquare className="h-8 w-8 text-green-500 mb-2" />
                <RadioGroupItem value="luxury" id="wall-luxury" className="sr-only" />
                <Label htmlFor="wall-luxury" className="font-medium">Faïence luxe</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Faïence très haut de gamme
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${wallTileType === 'non_concerne' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setWallTileType('non_concerne')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Ban className="h-8 w-8 text-gray-500 mb-2" />
                <RadioGroupItem value="non_concerne" id="wall-non_concerne" className="sr-only" />
                <Label htmlFor="wall-non_concerne" className="font-medium">Non concerné</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Pas de faïence murale
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
      </div>
    </div>
  );
};

export default CarrelageForm;
