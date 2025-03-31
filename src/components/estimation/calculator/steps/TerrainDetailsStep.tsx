
import React from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRightIcon, ArrowLeftIcon, Globe } from 'lucide-react';
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
  const [landIncluded, setLandIncluded] = React.useState<boolean>(
    typeof formData.landIncluded === 'boolean' ? formData.landIncluded : 
    formData.landIncluded === 'true'
  );
  const [landPrice, setLandPrice] = React.useState<string | number>(formData.landPrice || '');
  const [terrainType, setTerrainType] = React.useState<string>(formData.terrainType || 'flat');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateFormData({
      landIncluded,
      landPrice: landIncluded ? (typeof landPrice === 'string' ? parseFloat(landPrice) || 0 : landPrice) : 0,
      terrainType: landIncluded ? terrainType : ''
    });
    
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-4">Détails du terrain</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Land Included */}
          <div className="space-y-2">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="landIncluded" 
                checked={landIncluded}
                onCheckedChange={(checked) => setLandIncluded(!!checked)}
              />
              <div>
                <Label htmlFor="landIncluded" className="text-base font-medium">
                  Terrain inclus dans le projet
                </Label>
                <p className="text-sm text-gray-500 mt-1">
                  Cochez si vous avez déjà un terrain ou si vous souhaitez inclure le prix du terrain dans l'estimation
                </p>
              </div>
            </div>
          </div>
          
          {landIncluded && (
            <>
              {/* Land Price */}
              <div className="space-y-2">
                <Label htmlFor="landPrice" className="text-base font-medium">Prix du terrain (€)</Label>
                <Input
                  id="landPrice"
                  type="number"
                  min="0"
                  value={landPrice}
                  onChange={(e) => setLandPrice(e.target.value)}
                  placeholder="Ex: 120000"
                  className="w-full"
                />
              </div>
              
              {/* Terrain Type */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Type de terrain</Label>
                <RadioGroup 
                  value={terrainType} 
                  onValueChange={setTerrainType}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <RadioGroupItem value="flat" id="flat" />
                    <Label htmlFor="flat" className="flex flex-1 items-center gap-2 cursor-pointer">
                      <Globe className="h-4 w-4 text-green-500" />
                      <div>
                        <p>Terrain plat</p>
                        <p className="text-sm text-gray-500">Sans différence de niveau significative</p>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <RadioGroupItem value="sloped" id="sloped" />
                    <Label htmlFor="sloped" className="flex flex-1 items-center gap-2 cursor-pointer">
                      <Globe className="h-4 w-4 text-amber-500" />
                      <div>
                        <p>Terrain en pente</p>
                        <p className="text-sm text-gray-500">Avec différence de niveau significative</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </>
          )}
          
          {/* Navigation buttons */}
          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={goToPreviousStep}
              className="flex items-center gap-2"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Précédent
            </Button>
            
            <Button 
              type="submit"
              className="flex items-center gap-2"
            >
              Suivant
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TerrainDetailsStep;
