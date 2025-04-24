
import React from 'react';
import { BaseFormProps } from '../types';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon, Shower } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { ensureNumber } from '../utils/typeConversions';

const SalleDeBainStep: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [bathroomType, setBathroomType] = React.useState<string>(formData.bathroomType || '');
  const [bathroomCount, setBathroomCount] = React.useState<string>(
    formData.bathroomCount ? String(formData.bathroomCount) : ''
  );
  
  const handleSubmit = () => {
    // Calculate bathroom cost based on type, count and number of units
    let bathroomCost = 0;
    const units = ensureNumber(formData.units, 1);
    const count = ensureNumber(bathroomCount, 1);
    
    if (bathroomType !== 'none') {
      switch (bathroomType) {
        case 'standard':
          bathroomCost = 3500 * count * units;
          break;
        case 'mid-range':
          bathroomCost = 5500 * count * units;
          break;
        case 'premium':
          bathroomCost = 8500 * count * units;
          break;
        default:
          bathroomCost = 0;
      }
    }
    
    // Update form data with bathroom details and cost
    const currentMontantT = ensureNumber(formData.montantT, 0);
    
    updateFormData({
      bathroomType: bathroomType as 'standard' | 'mid-range' | 'premium',
      bathroomCount: ensureNumber(bathroomCount),
      includeBathroom: bathroomType !== 'none',
      montantT: currentMontantT + bathroomCost
    });
    
    goToNextStep();
  };
  
  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-2">Salle de bain / Douche</h2>
      <p className="text-gray-600 mb-6">Sélectionnez le type de salle de bain que vous souhaitez inclure</p>
      
      <div className="space-y-4">
        <Label className="text-base font-medium">
          Type de salle de bain <span className="text-red-500">*</span>
        </Label>
        
        <RadioGroup 
          value={bathroomType} 
          onValueChange={setBathroomType}
          className="grid grid-cols-1 gap-4 mt-2"
        >
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${bathroomType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setBathroomType('standard')}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <RadioGroupItem value="standard" id="standard" className="mr-2" />
                <Label htmlFor="standard" className="cursor-pointer flex items-center">
                  <Shower className="h-5 w-5 text-blue-500 mr-2" />
                  <div>
                    <span className="font-medium">Salle de bain standard</span>
                    <p className="text-sm text-gray-600 mt-1">Équipements et finitions de base</p>
                  </div>
                </Label>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${bathroomType === 'mid-range' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setBathroomType('mid-range')}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <RadioGroupItem value="mid-range" id="mid-range" className="mr-2" />
                <Label htmlFor="mid-range" className="cursor-pointer flex items-center">
                  <Shower className="h-5 w-5 text-amber-500 mr-2" />
                  <div>
                    <span className="font-medium">Salle de bain milieu de gamme</span>
                    <p className="text-sm text-gray-600 mt-1">Équipements et finitions de qualité moyenne</p>
                  </div>
                </Label>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${bathroomType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setBathroomType('premium')}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <RadioGroupItem value="premium" id="premium" className="mr-2" />
                <Label htmlFor="premium" className="cursor-pointer flex items-center">
                  <Shower className="h-5 w-5 text-purple-500 mr-2" />
                  <div>
                    <span className="font-medium">Salle de bain premium</span>
                    <p className="text-sm text-gray-600 mt-1">Équipements et finitions haut de gamme</p>
                  </div>
                </Label>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${bathroomType === 'none' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setBathroomType('none')}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <RadioGroupItem value="none" id="none" className="mr-2" />
                <Label htmlFor="none" className="cursor-pointer">Sans salle de bain supplémentaire</Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>
        
        {bathroomType && bathroomType !== 'none' && (
          <div className="mt-4">
            <Label htmlFor="bathroom-count" className="block mb-2">
              Nombre de salles de bain <span className="text-red-500">*</span>
            </Label>
            <Input
              id="bathroom-count"
              type="number"
              value={bathroomCount}
              onChange={(e) => setBathroomCount(e.target.value)}
              placeholder="Nombre de salles de bain"
              className="max-w-xs"
              min="1"
            />
          </div>
        )}
      </div>
      
      {formData.units && formData.units > 1 && bathroomType && bathroomType !== 'none' && (
        <div className="bg-gray-100 p-3 rounded-md">
          <p className="text-sm font-medium">
            Note : Le coût calculé sera proportionnel au nombre de logements ({formData.units}) dans votre projet.
          </p>
        </div>
      )}
      
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
          disabled={!bathroomType || (bathroomType !== 'none' && !bathroomCount)}
          className="flex items-center gap-2"
        >
          Suivant
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SalleDeBainStep;
