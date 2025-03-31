
import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Check, MapPin, Ruler, ArrowLeft, ArrowRight } from 'lucide-react';
import { ensureNumber, toFormValue } from '../utils/typeConversions';

const TerrainForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  // Initialize local state from formData
  const [landOwnership, setLandOwnership] = useState<string>(formData.landOwnership || 'owned');
  const [landType, setLandType] = useState<string>(formData.landType || 'flat');
  const [landArea, setLandArea] = useState<string>(toFormValue(formData.landArea));
  const [landPrice, setLandPrice] = useState<string>(toFormValue(formData.landPrice));
  
  // Handle form submission
  const handleSubmit = () => {
    // Update form data with terrain information
    updateFormData({
      landOwnership,
      landType,
      landArea: ensureNumber(landArea),
      landPrice: ensureNumber(landPrice)
    });
    
    // Move to next step
    goToNextStep();
  };
  
  // Validate form before submission
  const isValid = () => {
    if (landOwnership === 'to-purchase' && !landPrice) {
      return false;
    }
    
    return landArea !== '';
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-500" />
          Caractéristiques du terrain
        </h3>
        
        <div className="mb-6">
          <Label className="text-base mb-2 block">Possession du terrain</Label>
          <RadioGroup
            value={landOwnership}
            onValueChange={setLandOwnership}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <Card
              className={`cursor-pointer transition-all ${
                landOwnership === 'owned' ? 'border-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setLandOwnership('owned')}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <RadioGroupItem value="owned" id="owned" className="sr-only" />
                  <Label htmlFor="owned" className="font-medium cursor-pointer">
                    Déjà acquis
                  </Label>
                  <p className="text-sm text-gray-500">Vous êtes déjà propriétaire du terrain</p>
                </div>
                {landOwnership === 'owned' && <Check className="h-5 w-5 text-blue-500" />}
              </CardContent>
            </Card>
            
            <Card
              className={`cursor-pointer transition-all ${
                landOwnership === 'to-purchase' ? 'border-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setLandOwnership('to-purchase')}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <RadioGroupItem value="to-purchase" id="to-purchase" className="sr-only" />
                  <Label htmlFor="to-purchase" className="font-medium cursor-pointer">
                    À acquérir
                  </Label>
                  <p className="text-sm text-gray-500">Vous n'avez pas encore acquis le terrain</p>
                </div>
                {landOwnership === 'to-purchase' && <Check className="h-5 w-5 text-blue-500" />}
              </CardContent>
            </Card>
          </RadioGroup>
        </div>
        
        <div className="mb-6">
          <Label className="text-base mb-2 block">Type de terrain</Label>
          <RadioGroup
            value={landType}
            onValueChange={setLandType}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <Card
              className={`cursor-pointer transition-all ${
                landType === 'flat' ? 'border-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setLandType('flat')}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <RadioGroupItem value="flat" id="flat" className="sr-only" />
                  <Label htmlFor="flat" className="font-medium cursor-pointer">
                    Terrain plat
                  </Label>
                </div>
                {landType === 'flat' && <Check className="h-5 w-5 text-blue-500" />}
              </CardContent>
            </Card>
            
            <Card
              className={`cursor-pointer transition-all ${
                landType === 'sloped' ? 'border-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setLandType('sloped')}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <RadioGroupItem value="sloped" id="sloped" className="sr-only" />
                  <Label htmlFor="sloped" className="font-medium cursor-pointer">
                    Terrain en pente
                  </Label>
                </div>
                {landType === 'sloped' && <Check className="h-5 w-5 text-blue-500" />}
              </CardContent>
            </Card>
          </RadioGroup>
        </div>
        
        <div className="mb-6">
          <Label htmlFor="landArea" className="text-base mb-2 block">
            <Ruler className="h-4 w-4 inline-block mr-1" /> 
            Surface du terrain (m²)
          </Label>
          <Input
            id="landArea"
            type="number"
            value={landArea}
            onChange={(e) => setLandArea(e.target.value)}
            placeholder="Surface en m²"
            min="0"
          />
        </div>
        
        {landOwnership === 'to-purchase' && (
          <div className="mb-6">
            <Label htmlFor="landPrice" className="text-base mb-2 block">
              Prix d'achat du terrain (€)
            </Label>
            <Input
              id="landPrice"
              type="number"
              value={landPrice}
              onChange={(e) => setLandPrice(e.target.value)}
              placeholder="Prix en euros"
              min="0"
            />
          </div>
        )}
        
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={goToPreviousStep}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Précédent
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isValid()}
            className="flex items-center gap-2"
          >
            Suivant
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TerrainForm;
