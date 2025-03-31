
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FormData } from '../types';

interface TerrainDetailsStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
}

const TerrainDetailsStep: React.FC<TerrainDetailsStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [landIncluded, setLandIncluded] = React.useState<string>(formData.landIncluded ? formData.landIncluded.toString() : 'true');
  const [landPrice, setLandPrice] = React.useState<string>(formData.landPrice ? formData.landPrice.toString() : '');
  const [terrainType, setTerrainType] = React.useState<string>(formData.terrainType || '');

  const handleSubmit = () => {
    updateFormData({
      landIncluded,
      landPrice,
      terrainType
    });
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Détails du terrain</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="landIncluded">Terrain inclus ?</Label>
            <Select value={landIncluded} onValueChange={(value) => setLandIncluded(value)}>
              <SelectTrigger id="landIncluded">
                <SelectValue placeholder="Sélectionnez une option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Oui</SelectItem>
                <SelectItem value="false">Non</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {landIncluded === 'false' && (
            <div className="space-y-2">
              <Label htmlFor="landPrice">Prix du terrain (€)</Label>
              <Input
                id="landPrice"
                placeholder="Ex: 150000"
                value={landPrice}
                onChange={(e) => setLandPrice(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="terrainType">Type de terrain</Label>
            <Select value={terrainType} onValueChange={setTerrainType}>
              <SelectTrigger id="terrainType">
                <SelectValue placeholder="Sélectionnez un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flat">Plat</SelectItem>
                <SelectItem value="slight_slope">Légère pente</SelectItem>
                <SelectItem value="steep_slope">Forte pente</SelectItem>
                <SelectItem value="uneven">Irrégulier</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <div className="flex justify-between p-6">
          <Button variant="outline" onClick={goToPreviousStep}>
            Précédent
          </Button>
          <Button onClick={handleSubmit}>
            Suivant
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TerrainDetailsStep;
