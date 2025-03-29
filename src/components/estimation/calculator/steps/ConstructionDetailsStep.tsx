
import React from 'react';
import { FormData } from '../types';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Home, Scaling, Bed, Bath, Warehouse, Landmark } from 'lucide-react';
import { ensureNumber } from '../utils/typeConversions';

interface ConstructionDetailsStepProps {
  formData: FormData;
  updateFormData: (data: any) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const ConstructionDetailsStep: React.FC<ConstructionDetailsStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep
}) => {
  const [constructionType, setConstructionType] = React.useState<string>(
    formData.constructionType || 'traditional'
  );
  
  const [constructionStyle, setConstructionStyle] = React.useState<string>(
    formData.constructionStyle || 'standard'
  );
  
  const [surface, setSurface] = React.useState<string>(
    formData.surface ? formData.surface.toString() : ''
  );
  
  const [levels, setLevels] = React.useState<string>(
    typeof formData.levels === 'number' ? formData.levels.toString() : formData.levels || '1'
  );
  
  const [bedrooms, setBedrooms] = React.useState<string>(
    formData.bedrooms ? formData.bedrooms.toString() : ''
  );
  
  const [bathrooms, setBathrooms] = React.useState<string>(
    formData.bathrooms ? formData.bathrooms.toString() : ''
  );
  
  const [basement, setBasement] = React.useState<boolean>(
    formData.basement || false
  );
  
  const [garage, setGarage] = React.useState<boolean>(
    formData.garage || false
  );

  const handleSubmit = () => {
    updateFormData({
      constructionType,
      constructionStyle,
      surface: ensureNumber(surface),
      levels,
      bedrooms: ensureNumber(bedrooms),
      bathrooms: ensureNumber(bathrooms),
      basement,
      garage
    });
    goToNextStep();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Détails de la construction</h3>
        
        <div className="space-y-6">
          <div>
            <Label className="text-base mb-3 block">Type de construction</Label>
            <RadioGroup 
              value={constructionType} 
              onValueChange={setConstructionType}
              className="grid grid-cols-1 gap-3 sm:grid-cols-3"
            >
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${constructionType === 'traditional' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setConstructionType('traditional')}
              >
                <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                  <Landmark className="h-8 w-8 text-blue-500 mb-3" />
                  <RadioGroupItem value="traditional" id="construction-traditional" className="sr-only" />
                  <Label htmlFor="construction-traditional" className="font-medium">Traditionnelle</Label>
                  <p className="text-xs text-gray-500 mt-2">
                    Construction en maçonnerie traditionnelle
                  </p>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${constructionType === 'contemporary' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setConstructionType('contemporary')}
              >
                <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                  <Home className="h-8 w-8 text-blue-500 mb-3" />
                  <RadioGroupItem value="contemporary" id="construction-contemporary" className="sr-only" />
                  <Label htmlFor="construction-contemporary" className="font-medium">Contemporaine</Label>
                  <p className="text-xs text-gray-500 mt-2">
                    Design moderne avec matériaux actuels
                  </p>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${constructionType === 'environmentally_friendly' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setConstructionType('environmentally_friendly')}
              >
                <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                  <Scaling className="h-8 w-8 text-green-500 mb-3" />
                  <RadioGroupItem value="environmentally_friendly" id="construction-eco" className="sr-only" />
                  <Label htmlFor="construction-eco" className="font-medium">Écologique</Label>
                  <p className="text-xs text-gray-500 mt-2">
                    Construction avec matériaux écologiques
                  </p>
                </CardContent>
              </Card>
            </RadioGroup>
          </div>
          
          <div>
            <Label className="text-base mb-3 block">Gamme de construction</Label>
            <RadioGroup 
              value={constructionStyle} 
              onValueChange={setConstructionStyle}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${constructionStyle === 'luxury' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setConstructionStyle('luxury')}
              >
                <CardContent className="pt-4 pb-4 flex items-center">
                  <RadioGroupItem value="luxury" id="style-luxury" className="mr-2" />
                  <Label htmlFor="style-luxury" className="cursor-pointer">Haut de gamme</Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${constructionStyle === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setConstructionStyle('premium')}
              >
                <CardContent className="pt-4 pb-4 flex items-center">
                  <RadioGroupItem value="premium" id="style-premium" className="mr-2" />
                  <Label htmlFor="style-premium" className="cursor-pointer">Premium</Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${constructionStyle === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setConstructionStyle('standard')}
              >
                <CardContent className="pt-4 pb-4 flex items-center">
                  <RadioGroupItem value="standard" id="style-standard" className="mr-2" />
                  <Label htmlFor="style-standard" className="cursor-pointer">Standard</Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${constructionStyle === 'budget' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setConstructionStyle('budget')}
              >
                <CardContent className="pt-4 pb-4 flex items-center">
                  <RadioGroupItem value="budget" id="style-budget" className="mr-2" />
                  <Label htmlFor="style-budget" className="cursor-pointer">Entrée de gamme</Label>
                </CardContent>
              </Card>
            </RadioGroup>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="surface" className="text-base block mb-2">
                <Scaling className="h-4 w-4 inline-block mr-2" />
                Surface habitable (m²)
              </Label>
              <Input
                id="surface"
                type="number"
                value={surface}
                onChange={(e) => setSurface(e.target.value)}
                placeholder="Ex: 120"
              />
            </div>
            
            <div>
              <Label htmlFor="levels" className="text-base block mb-2">
                <Home className="h-4 w-4 inline-block mr-2" />
                Nombre de niveaux
              </Label>
              <RadioGroup 
                id="levels" 
                value={levels} 
                onValueChange={setLevels}
                className="grid grid-cols-2 gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="level-1" />
                  <Label htmlFor="level-1">1 (plain-pied)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="level-2" />
                  <Label htmlFor="level-2">2 (R+1)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="level-3" />
                  <Label htmlFor="level-3">3 (R+2)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="4" id="level-4" />
                  <Label htmlFor="level-4">4 ou plus</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="bedrooms" className="text-base block mb-2">
                <Bed className="h-4 w-4 inline-block mr-2" />
                Nombre de chambres
              </Label>
              <Input
                id="bedrooms"
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                placeholder="Ex: 3"
              />
            </div>
            
            <div>
              <Label htmlFor="bathrooms" className="text-base block mb-2">
                <Bath className="h-4 w-4 inline-block mr-2" />
                Nombre de salles de bain
              </Label>
              <Input
                id="bathrooms"
                type="number"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                placeholder="Ex: 2"
              />
            </div>
          </div>
          
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 sm:items-center">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="basement" 
                checked={basement}
                onCheckedChange={(checked) => setBasement(checked as boolean)}
              />
              <Label htmlFor="basement" className="cursor-pointer">
                Sous-sol
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="garage" 
                checked={garage}
                onCheckedChange={(checked) => setGarage(checked as boolean)}
              />
              <Label htmlFor="garage" className="cursor-pointer">
                Garage
              </Label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={goToPreviousStep}
        >
          Précédent
        </Button>
        
        <Button
          type="button"
          onClick={handleSubmit}
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default ConstructionDetailsStep;
