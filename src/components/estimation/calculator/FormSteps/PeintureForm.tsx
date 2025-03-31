
import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ensureNumber } from '../utils/montantUtils';
import { Paintbrush, Ban } from 'lucide-react';

const PeintureForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [paintType, setPaintType] = useState<string>(
    formData.paintType || 'standard'
  );
  
  const [basicPaintPercentage, setBasicPaintPercentage] = useState<number>(
    Number(formData.basicPaintPercentage || 80)
  );

  const [decorativePaintPercentage, setDecorativePaintPercentage] = useState<number>(
    Number(formData.decorativePaintPercentage || 10)
  );

  const [wallpaperPercentage, setWallpaperPercentage] = useState<number>(
    Number(formData.wallpaperPercentage || 10)
  );

  // Calculate the total percentage
  const totalPercentage = basicPaintPercentage + decorativePaintPercentage + wallpaperPercentage;

  const handleSubmit = () => {
    if (totalPercentage !== 100) {
      return; // Prevent submission if percentages don't add up to 100%
    }

    // Calculate paint costs based on surface and percentages
    const surface = ensureNumber(formData.surface, 0);
    
    // Paint costs per m² (basic, decorative, wallpaper)
    const basicPaintRate = paintType === 'premium' ? 25 : paintType === 'medium' ? 18 : 12;
    const decorativePaintRate = 35;
    const wallpaperRate = 45;
    
    // Calculate costs for each surface type
    const basicPaintCost = (basicPaintRate * surface * (basicPaintPercentage / 100));
    const decorativePaintCost = (decorativePaintRate * surface * (decorativePaintPercentage / 100));
    const wallpaperCost = (wallpaperRate * surface * (wallpaperPercentage / 100));
    
    // Total paint cost
    const totalPaintCost = basicPaintCost + decorativePaintCost + wallpaperCost;

    // Update form data with paint options and cost
    updateFormData({
      paintType,
      basicPaintPercentage,
      decorativePaintPercentage,
      wallpaperPercentage,
      montantT: (formData.montantT || 0) + totalPaintCost
    });
    
    // Move to the next step
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-4">Peinture & revêtements muraux</h3>
        
        <div className="mb-8">
          <Label className="mb-2 block">Type de peinture</Label>
          <RadioGroup 
            value={paintType} 
            onValueChange={setPaintType}
            className="grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${paintType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setPaintType('standard')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Paintbrush className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="standard" id="paint-standard" className="sr-only" />
                <Label htmlFor="paint-standard" className="font-medium">Peinture standard</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Peinture de base
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${paintType === 'medium' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setPaintType('medium')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Paintbrush className="h-8 w-8 text-blue-600 mb-2" />
                <RadioGroupItem value="medium" id="paint-medium" className="sr-only" />
                <Label htmlFor="paint-medium" className="font-medium">Peinture milieu de gamme</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Peinture lavable
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${paintType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setPaintType('premium')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Paintbrush className="h-8 w-8 text-blue-700 mb-2" />
                <RadioGroupItem value="premium" id="paint-premium" className="sr-only" />
                <Label htmlFor="paint-premium" className="font-medium">Peinture haut de gamme</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Peinture premium
                </p>
              </CardContent>
            </Card>
          </RadioGroup>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between">
            <Label className="text-base font-medium">Peinture basique (%)</Label>
            <span className="text-sm font-medium">{basicPaintPercentage}%</span>
          </div>
          <Slider
            value={[basicPaintPercentage]}
            max={100}
            step={5}
            onValueChange={(value) => {
              setBasicPaintPercentage(value[0]);
              // Adjust other percentages proportionally to maintain 100% total
              const remaining = 100 - value[0];
              const currentOthers = decorativePaintPercentage + wallpaperPercentage;
              if (currentOthers > 0) {
                const ratio = remaining / currentOthers;
                setDecorativePaintPercentage(Math.round(decorativePaintPercentage * ratio));
                setWallpaperPercentage(Math.round(wallpaperPercentage * ratio));
              } else {
                setDecorativePaintPercentage(Math.round(remaining / 2));
                setWallpaperPercentage(Math.round(remaining / 2));
              }
            }}
            className="mt-2"
          />
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between">
            <Label className="text-base font-medium">Peinture décorative (%)</Label>
            <span className="text-sm font-medium">{decorativePaintPercentage}%</span>
          </div>
          <Slider
            value={[decorativePaintPercentage]}
            max={100}
            step={5}
            onValueChange={(value) => {
              setDecorativePaintPercentage(value[0]);
              // Adjust other percentages
              const remaining = 100 - value[0] - wallpaperPercentage;
              setBasicPaintPercentage(Math.max(0, remaining));
            }}
            className="mt-2"
          />
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between">
            <Label className="text-base font-medium">Papier peint (%)</Label>
            <span className="text-sm font-medium">{wallpaperPercentage}%</span>
          </div>
          <Slider
            value={[wallpaperPercentage]}
            max={100}
            step={5}
            onValueChange={(value) => {
              setWallpaperPercentage(value[0]);
              // Adjust other percentages
              const remaining = 100 - value[0] - decorativePaintPercentage;
              setBasicPaintPercentage(Math.max(0, remaining));
            }}
            className="mt-2"
          />
        </div>
        
        {/* Total percentage indicator */}
        <div className="mb-4">
          <div className="flex justify-between">
            <Label className="text-base font-medium">Surface totale</Label>
            <span className={`text-sm font-medium ${totalPercentage !== 100 ? 'text-red-500' : 'text-green-500'}`}>
              {totalPercentage}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div 
              className={`h-2.5 rounded-full ${totalPercentage > 100 ? 'bg-red-500' : totalPercentage === 100 ? 'bg-green-500' : 'bg-yellow-500'}`} 
              style={{ width: `${Math.min(totalPercentage, 100)}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={goToPreviousStep}>
            Précédent
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={totalPercentage !== 100}
          >
            Continuer
          </Button>
        </div>
        
        {formData.montantT && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="text-sm font-medium">Total estimé: {formData.montantT.toLocaleString()} €</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeintureForm;
