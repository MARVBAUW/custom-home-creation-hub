import React from 'react';
import { BaseFormProps } from '../types/baseFormProps';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { ensureNumber } from '../utils/typeConversions';

const PeintureStep: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [paintType, setPaintType] = React.useState<string>(formData.paintType || '');
  const [basicPaintPercentage, setBasicPaintPercentage] = React.useState<string>(
    formData.basicPaintPercentage ? String(formData.basicPaintPercentage) : ''
  );
  const [decorativePaintPercentage, setDecorativePaintPercentage] = React.useState<string>(
    formData.decorativePaintPercentage ? String(formData.decorativePaintPercentage) : ''
  );
  const [wallpaperPercentage, setWallpaperPercentage] = React.useState<string>(
    formData.wallpaperPercentage ? String(formData.wallpaperPercentage) : ''
  );
  
  // Calculate total percentage
  const totalPercentage = 
    ensureNumber(basicPaintPercentage, 0) + 
    ensureNumber(decorativePaintPercentage, 0) + 
    ensureNumber(wallpaperPercentage, 0);
  
  const handleSubmit = () => {
    updateFormData({
      paintType,
      basicPaintPercentage: ensureNumber(basicPaintPercentage),
      decorativePaintPercentage: ensureNumber(decorativePaintPercentage),
      wallpaperPercentage: ensureNumber(wallpaperPercentage)
    });
    
    goToNextStep();
  };
  
  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-6">Peinture et revêtements muraux</h2>
      
      <div className="space-y-4">
        <Label className="text-base font-medium">
          Type de finition <span className="text-red-500">*</span>
        </Label>
        
        <RadioGroup 
          value={paintType} 
          onValueChange={setPaintType}
          className="grid grid-cols-1 gap-4 mt-2"
        >
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${paintType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setPaintType('standard')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="standard" id="standard" className="mr-2" />
              <Label htmlFor="standard" className="cursor-pointer">Peinture standard</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${paintType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setPaintType('premium')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="premium" id="premium" className="mr-2" />
              <Label htmlFor="premium" className="cursor-pointer">Peinture premium</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${paintType === 'non_concerne' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setPaintType('non_concerne')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="non_concerne" id="non_concerne" className="mr-2" />
              <Label htmlFor="non_concerne" className="cursor-pointer">Non concerné</Label>
            </CardContent>
          </Card>
        </RadioGroup>
        
        {paintType && paintType !== 'non_concerne' && (
          <div className="mt-6 space-y-4">
            <p className="text-sm text-gray-600">
              Répartissez les surfaces murales selon les finitions souhaitées (total doit être égal à 100%)
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="basic-paint" className="block">Peinture basique (%)</Label>
              <Input
                id="basic-paint"
                type="number"
                value={basicPaintPercentage}
                onChange={(e) => setBasicPaintPercentage(e.target.value)}
                placeholder="Pourcentage (ex: 70)"
                className="max-w-xs"
                min="0"
                max="100"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="decorative-paint" className="block">Peinture décorative (%)</Label>
              <Input
                id="decorative-paint"
                type="number"
                value={decorativePaintPercentage}
                onChange={(e) => setDecorativePaintPercentage(e.target.value)}
                placeholder="Pourcentage (ex: 20)"
                className="max-w-xs"
                min="0"
                max="100"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="wallpaper" className="block">Papier peint (%)</Label>
              <Input
                id="wallpaper"
                type="number"
                value={wallpaperPercentage}
                onChange={(e) => setWallpaperPercentage(e.target.value)}
                placeholder="Pourcentage (ex: 10)"
                className="max-w-xs"
                min="0"
                max="100"
              />
            </div>
            
            <div className={`text-sm ${totalPercentage !== 100 ? 'text-red-500 font-medium' : 'text-green-600'}`}>
              {totalPercentage !== 100 
                ? `Total : ${totalPercentage}% (doit être égal à 100%)`
                : `Total : ${totalPercentage}% ✓`
              }
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-between pt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={goToPreviousStep}
          className="flex items-center gap-2"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Retour
        </Button>
        
        <Button 
          onClick={handleSubmit}
          disabled={!paintType || (paintType !== 'non_concerne' && totalPercentage !== 100)}
          className="flex items-center gap-2"
        >
          Suivant
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PeintureStep;
