
import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ensureNumber } from '../utils/typeConversions';

const FacadeForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [stonePercentage, setStonePercentage] = useState<number>(
    ensureNumber(formData.stonePercentage || 0)
  );
  const [plasterPercentage, setPlasterPercentage] = useState<number>(
    ensureNumber(formData.plasterPercentage || 0)
  );
  const [brickPercentage, setBrickPercentage] = useState<number>(
    ensureNumber(formData.brickPercentage || 0)
  );
  const [metalCladdingPercentage, setMetalCladdingPercentage] = useState<number>(
    ensureNumber(formData.metalCladdingPercentage || 0)
  );
  const [woodCladdingPercentage, setWoodCladdingPercentage] = useState<number>(
    ensureNumber(formData.woodCladdingPercentage || 0)
  );
  const [stoneCladdingPercentage, setStoneCladdingPercentage] = useState<number>(
    ensureNumber(formData.stoneCladdingPercentage || 0)
  );

  // Calculate the total percentage
  const totalPercentage = stonePercentage + plasterPercentage + brickPercentage + 
    metalCladdingPercentage + woodCladdingPercentage + stoneCladdingPercentage;

  // Handle form submission
  const handleSubmit = () => {
    updateFormData({
      stonePercentage,
      plasterPercentage,
      brickPercentage,
      metalCladdingPercentage,
      woodCladdingPercentage,
      stoneCladdingPercentage
    });
    goToNextStep();
  };

  return (
    <Card className="bg-white/50 backdrop-blur transition-all duration-500">
      <CardHeader>
        <CardTitle className="text-xl text-center">Façade</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="stone-slider">Pierre</Label>
              <span className="w-16 text-right">{stonePercentage}%</span>
            </div>
            <Slider
              id="stone-slider"
              min={0}
              max={100}
              step={5}
              value={[stonePercentage]}
              onValueChange={(value) => setStonePercentage(value[0])}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="plaster-slider">Enduit</Label>
              <span className="w-16 text-right">{plasterPercentage}%</span>
            </div>
            <Slider
              id="plaster-slider"
              min={0}
              max={100}
              step={5}
              value={[plasterPercentage]}
              onValueChange={(value) => setPlasterPercentage(value[0])}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="brick-slider">Brique</Label>
              <span className="w-16 text-right">{brickPercentage}%</span>
            </div>
            <Slider
              id="brick-slider"
              min={0}
              max={100}
              step={5}
              value={[brickPercentage]}
              onValueChange={(value) => setBrickPercentage(value[0])}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="metal-cladding-slider">Bardage métallique</Label>
              <span className="w-16 text-right">{metalCladdingPercentage}%</span>
            </div>
            <Slider
              id="metal-cladding-slider"
              min={0}
              max={100}
              step={5}
              value={[metalCladdingPercentage]}
              onValueChange={(value) => setMetalCladdingPercentage(value[0])}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="wood-cladding-slider">Bardage bois</Label>
              <span className="w-16 text-right">{woodCladdingPercentage}%</span>
            </div>
            <Slider
              id="wood-cladding-slider"
              min={0}
              max={100}
              step={5}
              value={[woodCladdingPercentage]}
              onValueChange={(value) => setWoodCladdingPercentage(value[0])}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="stone-cladding-slider">Parement pierre</Label>
              <span className="w-16 text-right">{stoneCladdingPercentage}%</span>
            </div>
            <Slider
              id="stone-cladding-slider"
              min={0}
              max={100}
              step={5}
              value={[stoneCladdingPercentage]}
              onValueChange={(value) => setStoneCladdingPercentage(value[0])}
            />
          </div>

          <div className="mt-6 pt-4 border-t">
            <div className="flex items-center justify-between font-medium">
              <span>Total</span>
              <span className={`${totalPercentage === 100 ? 'text-green-600' : 'text-red-600'}`}>
                {totalPercentage}%
              </span>
            </div>
            {totalPercentage !== 100 && (
              <p className="text-sm text-red-600 mt-2">
                Le total doit être égal à 100%. Veuillez ajuster les pourcentages.
              </p>
            )}
          </div>

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
              disabled={totalPercentage !== 100}
            >
              Continuer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FacadeForm;
