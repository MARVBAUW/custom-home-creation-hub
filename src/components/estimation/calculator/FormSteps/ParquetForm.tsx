
import React, { useState } from 'react';
import { BaseFormProps } from '../types';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ensureNumber } from '../utils/typeConversions';

const ParquetForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  // Initialize state with formData values or defaults
  const [parquetType, setParquetType] = useState(formData.parquetType || '');
  const [softFloorType, setSoftFloorType] = useState(formData.softFloorType || '');
  const [parquetPercentage, setParquetPercentage] = useState<number>(
    ensureNumber(formData.parquetPercentage || 0)
  );
  const [softFloorPercentage, setSoftFloorPercentage] = useState<number>(
    ensureNumber(formData.softFloorPercentage || 0)
  );

  // Calculate the total percentage (should be 100%)
  const totalPercentage = parquetPercentage + softFloorPercentage;
  
  // Flooring surface is the remaining percentage after tiles (coming from previous form)
  const tileSurface = ensureNumber(formData.floorTilePercentage || 0);
  const remainingSurface = 100 - tileSurface;

  // Handle form submission
  const handleSubmit = () => {
    updateFormData({
      parquetType,
      softFloorType,
      parquetPercentage,
      softFloorPercentage
    });
    goToNextStep();
  };

  return (
    <Card className="bg-white/50 backdrop-blur transition-all duration-500">
      <CardHeader>
        <CardTitle className="text-xl text-center">Parquet et sols souples</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {tileSurface < 100 ? (
            <>
              <div className="mb-6">
                <p className="text-sm">Surface restante à couvrir: {remainingSurface}%</p>
                <p className="text-sm text-muted-foreground">(Le carrelage représente déjà {tileSurface}% de la surface)</p>
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="parquet-type">Type de parquet</Label>
                <Select value={parquetType} onValueChange={setParquetType}>
                  <SelectTrigger id="parquet-type">
                    <SelectValue placeholder="Sélectionnez un type de parquet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contrecolle">Parquet contrecollé</SelectItem>
                    <SelectItem value="massif">Parquet massif</SelectItem>
                    <SelectItem value="stratifie">Parquet stratifié</SelectItem>
                    <SelectItem value="bambou">Parquet en bambou</SelectItem>
                    <SelectItem value="design">Parquet design</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="parquet-slider">Pourcentage parquet</Label>
                  <span className="w-16 text-right">{parquetPercentage}%</span>
                </div>
                <Slider
                  id="parquet-slider"
                  min={0}
                  max={remainingSurface}
                  step={5}
                  value={[parquetPercentage]}
                  onValueChange={(value) => {
                    setParquetPercentage(value[0]);
                    setSoftFloorPercentage(remainingSurface - value[0]);
                  }}
                />
              </div>

              <div className="space-y-4">
                <Label htmlFor="soft-floor-type">Type de sol souple</Label>
                <Select value={softFloorType} onValueChange={setSoftFloorType}>
                  <SelectTrigger id="soft-floor-type">
                    <SelectValue placeholder="Sélectionnez un type de sol souple" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="moquette">Moquette</SelectItem>
                    <SelectItem value="lino">Linoléum</SelectItem>
                    <SelectItem value="pvc">Sol PVC</SelectItem>
                    <SelectItem value="vinyle">Sol vinyle</SelectItem>
                    <SelectItem value="caoutchouc">Sol caoutchouc</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="soft-floor-slider">Pourcentage sol souple</Label>
                  <span className="w-16 text-right">{softFloorPercentage}%</span>
                </div>
                <Slider
                  id="soft-floor-slider"
                  min={0}
                  max={remainingSurface}
                  step={5}
                  value={[softFloorPercentage]}
                  onValueChange={(value) => {
                    setSoftFloorPercentage(value[0]);
                    setParquetPercentage(remainingSurface - value[0]);
                  }}
                />
              </div>

              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center justify-between font-medium">
                  <span>Total (avec carrelage)</span>
                  <span className={`${(tileSurface + parquetPercentage + softFloorPercentage) === 100 ? 'text-green-600' : 'text-red-600'}`}>
                    {tileSurface + parquetPercentage + softFloorPercentage}%
                  </span>
                </div>
                {(tileSurface + parquetPercentage + softFloorPercentage) !== 100 && (
                  <p className="text-sm text-red-600 mt-2">
                    Le total doit être égal à 100%. Veuillez ajuster les pourcentages.
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-40">
              <p className="text-center text-muted-foreground">
                Vous avez déjà alloué 100% de la surface au carrelage. Aucun parquet ou sol souple n'est nécessaire.
              </p>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={goToPreviousStep}
            >
              Précédent
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={tileSurface < 100 && (parquetPercentage + softFloorPercentage) !== remainingSurface}
            >
              Continuer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ParquetForm;
