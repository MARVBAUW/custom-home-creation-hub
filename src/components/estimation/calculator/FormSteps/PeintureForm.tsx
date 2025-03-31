
import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { ensureNumber } from '../utils/montantUtils';
import { PaintBucket, Wallpaper, Palette, Ban } from 'lucide-react';

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

  const handleSubmit = () => {
    // For now, we'll just store the selections
    // Update form data with paint options
    updateFormData({
      paintType
    });
    
    // Move to the next step
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-4">Peinture et Revêtements Muraux</h3>
        
        <div className="mb-8">
          <Label className="mb-2 block">Type de finition murale</Label>
          <RadioGroup 
            value={paintType} 
            onValueChange={setPaintType}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${paintType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setPaintType('standard')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <PaintBucket className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="standard" id="paint-standard" className="sr-only" />
                <Label htmlFor="paint-standard" className="font-medium">Peinture standard</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Peinture mate ou satinée
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${paintType === 'decorative' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setPaintType('decorative')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Palette className="h-8 w-8 text-purple-500 mb-2" />
                <RadioGroupItem value="decorative" id="paint-decorative" className="sr-only" />
                <Label htmlFor="paint-decorative" className="font-medium">Peinture décorative</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Effets spéciaux, finitions particulières
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${paintType === 'wallpaper' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setPaintType('wallpaper')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Wallpaper className="h-8 w-8 text-amber-500 mb-2" />
                <RadioGroupItem value="wallpaper" id="paint-wallpaper" className="sr-only" />
                <Label htmlFor="paint-wallpaper" className="font-medium">Papier peint</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Papier peint ou toile de verre
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${paintType === 'non_concerne' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setPaintType('non_concerne')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Ban className="h-8 w-8 text-gray-500 mb-2" />
                <RadioGroupItem value="non_concerne" id="paint-none" className="sr-only" />
                <Label htmlFor="paint-none" className="font-medium">Non concerné</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Pas de travaux de peinture
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
