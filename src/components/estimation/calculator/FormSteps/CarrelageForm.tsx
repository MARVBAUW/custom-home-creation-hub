import React from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Grid, Square, CheckSquare, Award, Circle } from 'lucide-react';
import { FormData } from '../types';

const CarrelageForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  defaultValues,
  onSubmit
}) => {
  const [floorTileType, setFloorTileType] = React.useState<string>(
    defaultValues?.floorTileType || formData.floorTileType || 'standard'
  );
  
  const [wallTileType, setWallTileType] = React.useState<string>(
    defaultValues?.wallTileType || formData.wallTileType || 'standard'
  );
  
  const [floorTilePercentage, setFloorTilePercentage] = React.useState<number>(
    defaultValues?.floorTilePercentage || formData.floorTilePercentage || 50
  );

  // Inside the handleSubmit function, ensure data is compatible with FormData
  const handleSubmit = () => {
    const data: Partial<FormData> = {
      floorTileType,
      wallTileType,
      floorTilePercentage
    };
    
    if (onSubmit) {
      onSubmit(data);
    } else {
      updateFormData(data);
      goToNextStep();
    }
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Carrelage sol</h3>
          
          <RadioGroup 
            value={floorTileType} 
            onValueChange={setFloorTileType}
            className="grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${floorTileType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setFloorTileType('standard')}
            >
              <CardContent className="pt-6 pb-6 text-center">
                <Square className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <RadioGroupItem value="standard" id="tile-standard" className="mx-auto mb-2" />
                <Label htmlFor="tile-standard" className="font-medium">Standard</Label>
                <p className="text-xs text-gray-500 mt-2">
                  Carrelage de qualité standard
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${floorTileType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setFloorTileType('premium')}
            >
              <CardContent className="pt-6 pb-6 text-center">
                <CheckSquare className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <RadioGroupItem value="premium" id="tile-premium" className="mx-auto mb-2" />
                <Label htmlFor="tile-premium" className="font-medium">Premium</Label>
                <p className="text-xs text-gray-500 mt-2">
                  Carrelage de qualité supérieure
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${floorTileType === 'luxury' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setFloorTileType('luxury')}
            >
              <CardContent className="pt-6 pb-6 text-center">
                <Award className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <RadioGroupItem value="luxury" id="tile-luxury" className="mx-auto mb-2" />
                <Label htmlFor="tile-luxury" className="font-medium">Luxe</Label>
                <p className="text-xs text-gray-500 mt-2">
                  Carrelage haut de gamme
                </p>
              </CardContent>
            </Card>
          </RadioGroup>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Carrelage mural</h3>
          
          <RadioGroup 
            value={wallTileType} 
            onValueChange={setWallTileType}
            className="grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${wallTileType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setWallTileType('standard')}
            >
              <CardContent className="pt-6 pb-6 text-center">
                <Square className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <RadioGroupItem value="standard" id="wall-standard" className="mx-auto mb-2" />
                <Label htmlFor="wall-standard" className="font-medium">Standard</Label>
                <p className="text-xs text-gray-500 mt-2">
                  Faïence standard
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${wallTileType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setWallTileType('premium')}
            >
              <CardContent className="pt-6 pb-6 text-center">
                <CheckSquare className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <RadioGroupItem value="premium" id="wall-premium" className="mx-auto mb-2" />
                <Label htmlFor="wall-premium" className="font-medium">Premium</Label>
                <p className="text-xs text-gray-500 mt-2">
                  Faïence de qualité supérieure
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${wallTileType === 'mosaic' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setWallTileType('mosaic')}
            >
              <CardContent className="pt-6 pb-6 text-center">
                <Grid className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <RadioGroupItem value="mosaic" id="wall-mosaic" className="mx-auto mb-2" />
                <Label htmlFor="wall-mosaic" className="font-medium">Mosaïque</Label>
                <p className="text-xs text-gray-500 mt-2">
                  Mosaïque décorative
                </p>
              </CardContent>
            </Card>
          </RadioGroup>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="floor-tile-percentage" className="font-medium">
              Pourcentage de surface carrelée au sol
            </Label>
            <span className="text-sm font-medium">{floorTilePercentage}%</span>
          </div>
          
          <Slider
            id="floor-tile-percentage"
            min={0}
            max={100}
            step={5}
            value={[floorTilePercentage]}
            onValueChange={(value) => setFloorTilePercentage(value[0])}
            className="py-4"
          />
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
        
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
            onClick={handleSubmit}
          >
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarrelageForm;
