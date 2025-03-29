import React from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Paintbrush, Droplet, FileText, AlignLeft } from 'lucide-react';

const PeintureForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [paintType, setPaintType] = React.useState<string>(formData.paintType || 'standard');
  const [basicPaintPercentage, setBasicPaintPercentage] = React.useState<number>(
    formData.basicPaintPercentage !== undefined ? Number(formData.basicPaintPercentage) : 70
  );
  const [decorativePaintPercentage, setDecorativePaintPercentage] = React.useState<number>(
    formData.decorativePaintPercentage !== undefined ? Number(formData.decorativePaintPercentage) : 20
  );
  const [wallpaperPercentage, setWallpaperPercentage] = React.useState<number>(
    formData.wallpaperPercentage !== undefined ? Number(formData.wallpaperPercentage) : 10
  );

  const handleSubmit = () => {
    updateFormData({
      paintType,
      basicPaintPercentage,
      decorativePaintPercentage,
      wallpaperPercentage
    });
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Peinture et revêtements muraux</h3>
          
          <div className="space-y-4">
            <div>
              <Label>Type de peinture</Label>
              <RadioGroup 
                value={paintType} 
                onValueChange={setPaintType}
                className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3"
              >
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${paintType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => setPaintType('standard')}
                >
                  <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                    <Paintbrush className="h-8 w-8 text-blue-500 mb-2" />
                    <RadioGroupItem value="standard" id="paint-standard" className="mx-auto mb-1" />
                    <Label htmlFor="paint-standard" className="font-medium">Standard</Label>
                    <p className="text-xs text-gray-500 mt-1">
                      Peinture acrylique classique
                    </p>
                  </CardContent>
                </Card>
                
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${paintType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => setPaintType('premium')}
                >
                  <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                    <Droplet className="h-8 w-8 text-blue-500 mb-2" />
                    <RadioGroupItem value="premium" id="paint-premium" className="mx-auto mb-1" />
                    <Label htmlFor="paint-premium" className="font-medium">Premium</Label>
                    <p className="text-xs text-gray-500 mt-1">
                      Peinture haute qualité, lessivable
                    </p>
                  </CardContent>
                </Card>
                
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${paintType === 'eco' ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => setPaintType('eco')}
                >
                  <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                    <AlignLeft className="h-8 w-8 text-blue-500 mb-2" />
                    <RadioGroupItem value="eco" id="paint-eco" className="mx-auto mb-1" />
                    <Label htmlFor="paint-eco" className="font-medium">Écologique</Label>
                    <p className="text-xs text-gray-500 mt-1">
                      Peinture naturelle, sans COV
                    </p>
                  </CardContent>
                </Card>
              </RadioGroup>
            </div>
            
            <div className="space-y-6 mt-6">
              <h4 className="text-md font-medium">Répartition des revêtements muraux</h4>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="basic-paint">Peinture standard</Label>
                    <span className="text-sm text-gray-500">{basicPaintPercentage}%</span>
                  </div>
                  <Slider
                    id="basic-paint"
                    min={0}
                    max={100}
                    step={5}
                    value={[basicPaintPercentage]}
                    onValueChange={(value) => {
                      const newValue = value[0];
                      setBasicPaintPercentage(newValue);
                      // Adjust other percentages to maintain total of 100%
                      const remaining = 100 - newValue;
                      const ratio = remaining / (decorativePaintPercentage + wallpaperPercentage);
                      setDecorativePaintPercentage(Math.round(decorativePaintPercentage * ratio));
                      setWallpaperPercentage(Math.round(wallpaperPercentage * ratio));
                    }}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="decorative-paint">Peinture décorative</Label>
                    <span className="text-sm text-gray-500">{decorativePaintPercentage}%</span>
                  </div>
                  <Slider
                    id="decorative-paint"
                    min={0}
                    max={100}
                    step={5}
                    value={[decorativePaintPercentage]}
                    onValueChange={(value) => {
                      const newValue = value[0];
                      setDecorativePaintPercentage(newValue);
                      // Adjust other percentages to maintain total of 100%
                      const remaining = 100 - newValue;
                      const ratio = remaining / (basicPaintPercentage + wallpaperPercentage);
                      setBasicPaintPercentage(Math.round(basicPaintPercentage * ratio));
                      setWallpaperPercentage(Math.round(wallpaperPercentage * ratio));
                    }}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="wallpaper">Papier peint</Label>
                    <span className="text-sm text-gray-500">{wallpaperPercentage}%</span>
                  </div>
                  <Slider
                    id="wallpaper"
                    min={0}
                    max={100}
                    step={5}
                    value={[wallpaperPercentage]}
                    onValueChange={(value) => {
                      const newValue = value[0];
                      setWallpaperPercentage(newValue);
                      // Adjust other percentages to maintain total of 100%
                      const remaining = 100 - newValue;
                      const ratio = remaining / (basicPaintPercentage + decorativePaintPercentage);
                      setBasicPaintPercentage(Math.round(basicPaintPercentage * ratio));
                      setDecorativePaintPercentage(Math.round(decorativePaintPercentage * ratio));
                    }}
                  />
                </div>
              </div>
              
              <div className="text-sm text-gray-500 mt-2">
                Total: {basicPaintPercentage + decorativePaintPercentage + wallpaperPercentage}%
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={goToPreviousStep}>
            Précédent
          </Button>
          <Button onClick={handleSubmit}>
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PeintureForm;
