
import React from 'react';
import { FormData } from '../types';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TerrainDetailsStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

const TerrainDetailsStep: React.FC<TerrainDetailsStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep 
}) => {
  const [terrainType, setTerrainType] = React.useState<string>(formData.terrainType || 'flat');
  const [terrainSurface, setTerrainSurface] = React.useState<string>(
    formData.terrainSurface?.toString() || ''
  );
  const [landPrice, setLandPrice] = React.useState<string>(
    formData.landPrice?.toString() || ''
  );

  const handleContinue = () => {
    updateFormData({ 
      terrainType, 
      terrainSurface,
      landPrice
    });
    goToNextStep();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Détails du terrain</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="terrain-type">Type de terrain</Label>
            <RadioGroup 
              value={terrainType} 
              onValueChange={setTerrainType}
              className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3"
            >
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${terrainType === 'flat' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setTerrainType('flat')}
              >
                <CardContent className="pt-4 pb-4 text-center">
                  <RadioGroupItem value="flat" id="terrain-flat" className="mx-auto mb-2" />
                  <Label htmlFor="terrain-flat">Terrain plat</Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${terrainType === 'sloping' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setTerrainType('sloping')}
              >
                <CardContent className="pt-4 pb-4 text-center">
                  <RadioGroupItem value="sloping" id="terrain-sloping" className="mx-auto mb-2" />
                  <Label htmlFor="terrain-sloping">Terrain en pente</Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${terrainType === 'wooded' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setTerrainType('wooded')}
              >
                <CardContent className="pt-4 pb-4 text-center">
                  <RadioGroupItem value="wooded" id="terrain-wooded" className="mx-auto mb-2" />
                  <Label htmlFor="terrain-wooded">Terrain boisé</Label>
                </CardContent>
              </Card>
            </RadioGroup>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="terrain-surface">Surface du terrain (m²)</Label>
              <Input
                id="terrain-surface"
                type="number"
                placeholder="Ex: 500"
                value={terrainSurface}
                onChange={(e) => setTerrainSurface(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="land-price">Prix du terrain (€)</Label>
              <Input
                id="land-price"
                type="number"
                placeholder="Ex: 100000"
                value={landPrice}
                onChange={(e) => setLandPrice(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-4">
        <Button 
          onClick={handleContinue}
          className="w-full"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default TerrainDetailsStep;
