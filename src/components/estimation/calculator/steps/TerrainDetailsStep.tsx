
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TerrainDetailsStepProps } from '../types/formTypes';
import { ensureNumber } from '../utils/typeConversions';

const TerrainDetailsStep: React.FC<TerrainDetailsStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep
}) => {
  const [terrainType, setTerrainType] = React.useState(formData.terrainType || '');
  const [terrainSurface, setTerrainSurface] = React.useState(formData.terrainSurface?.toString() || '');
  const [landPrice, setLandPrice] = React.useState(formData.landPrice?.toString() || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateFormData({
      terrainType,
      terrainSurface: ensureNumber(terrainSurface),
      landPrice: ensureNumber(landPrice),
    });
    
    goToNextStep();
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="terrainType">Type de terrain</Label>
            <Select
              value={terrainType}
              onValueChange={setTerrainType}
            >
              <SelectTrigger id="terrainType">
                <SelectValue placeholder="Sélectionnez un type de terrain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flat">Terrain plat</SelectItem>
                <SelectItem value="slope">Terrain en pente</SelectItem>
                <SelectItem value="rocky">Terrain rocheux</SelectItem>
                <SelectItem value="wetland">Zone humide</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="terrainSurface">Surface du terrain (m²)</Label>
            <Input
              id="terrainSurface"
              type="number"
              value={terrainSurface}
              onChange={(e) => setTerrainSurface(e.target.value)}
              placeholder="Ex: 600"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="landPrice">Prix du terrain (€)</Label>
            <Input
              id="landPrice"
              type="number"
              value={landPrice}
              onChange={(e) => setLandPrice(e.target.value)}
              placeholder="Ex: 150000"
            />
          </div>
          
          <div className="flex justify-between pt-4">
            {goToPreviousStep && (
              <Button type="button" variant="outline" onClick={goToPreviousStep}>
                Précédent
              </Button>
            )}
            <Button type="submit">
              Suivant
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TerrainDetailsStep;
