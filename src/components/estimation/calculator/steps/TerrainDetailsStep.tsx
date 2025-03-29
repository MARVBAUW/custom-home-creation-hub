
import React from 'react';
import { FormData } from '../types';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shapes, MapPin } from 'lucide-react';
import { ensureNumber } from '../utils/typeConversions';

interface TerrainDetailsStepProps {
  formData: FormData;
  updateFormData: (data: any) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const TerrainDetailsStep: React.FC<TerrainDetailsStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep
}) => {
  const [terrainType, setTerrainType] = React.useState<string>(formData.terrainType || 'flat');
  const [terrainSurface, setTerrainSurface] = React.useState<string>(
    formData.terrainSurface ? formData.terrainSurface.toString() : ''
  );
  const [landPrice, setLandPrice] = React.useState<string>(
    formData.landPrice ? formData.landPrice.toString() : ''
  );

  const handleSubmit = () => {
    updateFormData({
      terrainType,
      terrainSurface: ensureNumber(terrainSurface),
      landPrice: ensureNumber(landPrice)
    });
    goToNextStep();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Détails du terrain</h3>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="terrain-type" className="text-base mb-3 block">Type de terrain</Label>
            <RadioGroup 
              value={terrainType} 
              onValueChange={setTerrainType}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${terrainType === 'flat' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setTerrainType('flat')}
              >
                <CardContent className="pt-6 pb-6 flex items-center">
                  <RadioGroupItem value="flat" id="terrain-flat" className="mr-2" />
                  <Label htmlFor="terrain-flat" className="cursor-pointer">Terrain plat</Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${terrainType === 'sloped' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setTerrainType('sloped')}
              >
                <CardContent className="pt-6 pb-6 flex items-center">
                  <RadioGroupItem value="sloped" id="terrain-sloped" className="mr-2" />
                  <Label htmlFor="terrain-sloped" className="cursor-pointer">Terrain en pente</Label>
                </CardContent>
              </Card>
            </RadioGroup>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="terrain-surface" className="text-base block mb-2">
                <Shapes className="h-4 w-4 inline-block mr-2" />
                Surface du terrain (m²)
              </Label>
              <Input
                id="terrain-surface"
                type="number"
                value={terrainSurface}
                onChange={(e) => setTerrainSurface(e.target.value)}
                placeholder="Ex: 500"
              />
            </div>
            
            <div>
              <Label htmlFor="land-price" className="text-base block mb-2">
                <MapPin className="h-4 w-4 inline-block mr-2" />
                Prix du terrain (€)
              </Label>
              <Input
                id="land-price"
                type="number"
                value={landPrice}
                onChange={(e) => setLandPrice(e.target.value)}
                placeholder="Ex: 100000"
              />
            </div>
          </div>
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
  );
};

export default TerrainDetailsStep;
